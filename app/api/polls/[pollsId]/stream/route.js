import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import User from "@/libs/models/user.models";
import Contestant from "@/libs/models/contestant.models";
import { auth } from "@/auth";

const channels = new Map();
function getChannel(pollId) {
  let channel = channels.get(pollId);
  if (!channel) {
    channel = {
      clients: new Set(),
      intervalId: null,
      lastPayload: null,
      polling: false,
    };
    channels.set(pollId, channel);
  }
  return channel;
}

function cleanupChannel(pollId, channel) {
  if (channel.clients.size === 0) {
    if (channel.intervalId) clearInterval(channel.intervalId);
    channels.delete(pollsId);
  }
}

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      },
    );
  }
  const userId = req?.auth?.user?.id;
  const { pollsId } = await params;
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      },
    );
  }
  let interval;
  try {
    await connectDatabase();
    // check if the poll  exist
    const poll = await Polls.findById(pollsId)
      .populate("userId", "name email image")
      .populate("contestants", " position description candidates voters")
      .populate("voters", "name email image department faculty");
    // if no poll return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found" },
        {
          status: 404,
        },
      );
    }

    const userExist = poll?.voters.find(
      (v) => v._id.toString() === userId.toString(),
    );

    if (!userExist) {
      return NextResponse.json(
        { error: "User Does not belong to this board" },
        {
          status: 400,
        },
      );
    }

    const stream = new ReadableStream({
      start(controller) {
        // Send initial message
        const initial = JSON.stringify({ poll });
        controller.enqueue(new TextEncoder().encode(`data: ${initial}\n\n`));
        let lastPayload = initial;

        // Send updates every second
        interval = setInterval(async () => {
          try {
            const poll = await Polls.findById(pollsId)
              .populate("userId", "name email image")
              .populate(
                "contestants",
                " position description candidates voters",
              )
              .populate("voters", "name email image department faculty");

            const current = JSON.stringify({ poll });

            if (current !== lastPayload) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${current}\n\n`),
              );
              lastPayload = current;
            }
          } catch (err) {
            // client disconnected, stop interval
            clearInterval(interval);
          }
        }, 10000);
      },
      cancel() {
        // Called when client disconnects
        clearInterval(interval);
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
