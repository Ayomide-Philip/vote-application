import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import { auth } from "@/auth";
import {
  MAX_CONNECTIONS_PER_POLL,
  STREAM_INTERVAL_MS,
} from "@/libs/config/configuration";

const channels = new Map();
const encoder = new TextEncoder();
// const STREAM_INTERVAL_MS = 10000;
// const MAX_CONNECTIONS_PER_POLL = 100;

function getOrCreateChannel(pollsId) {
  let channel = channels.get(pollsId);

  if (!channel) {
    channel = {
      clients: new Set(),
      intervalId: null,
      lastPayload: "",
      polling: false,
    };
    channels.set(pollsId, channel);
  }

  return channel;
}

function cleanupChannelIfEmpty(pollsId, channel) {
  if (channel.clients.size > 0) return;

  if (channel.intervalId) {
    clearInterval(channel.intervalId);
    channel.intervalId = null;
  }

  channels.delete(pollsId);
}

async function buildPayload(pollsId) {
  const poll = await Polls.findById(pollsId)
    .populate("userId", "name email image")
    .populate("contestants", " position description candidates voters")
    .populate("voters", "name email image department faculty");

  if (!poll) return null;

  return JSON.stringify({ poll });
}

function startSharedPoller(pollsId, channel) {
  if (channel.intervalId) return;

  channel.intervalId = setInterval(async () => {
    if (channel.polling) return;

    channel.polling = true;
    try {
      const currentPayload = await buildPayload(pollsId);

      if (!currentPayload) {
        cleanupChannelIfEmpty(pollsId, channel);
        return;
      }

      if (currentPayload !== channel.lastPayload) {
        channel.lastPayload = currentPayload;
        const message = encoder.encode(`data: ${currentPayload}\n\n`);

        for (const client of channel.clients) {
          try {
            client.enqueue(message);
          } catch {
            channel.clients.delete(client);
          }
        }
      }

      cleanupChannelIfEmpty(pollsId, channel);
    } catch (err) {
      console.log(err);
    } finally {
      channel.polling = false;
    }
  }, STREAM_INTERVAL_MS || 10000);
}

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth?.user?.id) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 401,
      },
    );
  }

  const userId = req.auth.user.id;
  const { pollsId } = await params;

  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();

    const poll = await Polls.findById(pollsId)
      .select("voters")
      .populate("voters", "_id");

    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found" },
        {
          status: 404,
        },
      );
    }

    const userExist = poll.voters.find(
      (voter) => voter._id.toString() === userId.toString(),
    );

    if (!userExist) {
      return NextResponse.json(
        { error: "User Does not belong to this board" },
        {
          status: 400,
        },
      );
    }

    const channel = getOrCreateChannel(pollsId);
    console.log(channel);
    if (channel.clients.size >= MAX_CONNECTIONS_PER_POLL || 100) {
      return NextResponse.json(
        {
          error: `Live stream connection limit reached for this poll (${MAX_CONNECTIONS_PER_POLL || 100} connections). Please try again later.`,
        },
        {
          status: 429,
        },
      );
    }

    startSharedPoller(pollsId, channel);

    let streamController;

    const stream = new ReadableStream({
      async start(controller) {
        streamController = controller;
        channel.clients.add(controller);

        const initialPayload = await buildPayload(pollsId);
        if (!initialPayload) {
          channel.clients.delete(controller);
          cleanupChannelIfEmpty(pollsId, channel);
          controller.close();
          return;
        }

        channel.lastPayload = initialPayload;
        controller.enqueue(encoder.encode(`data: ${initialPayload}\n\n`));

        req.signal?.addEventListener(
          "abort",
          () => {
            channel.clients.delete(controller);
            cleanupChannelIfEmpty(pollsId, channel);
          },
          { once: true },
        );
      },
      cancel() {
        if (streamController) {
          channel.clients.delete(streamController);
        }
        cleanupChannelIfEmpty(pollsId, channel);
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to get Poll" },
      {
        status: 400,
      },
    );
  }
});
