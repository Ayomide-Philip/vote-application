import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import User from "@/libs/models/user.models";

export const GET = async function GET(req, { params }) {
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }
  const { contestantId, pollsId } = await params;
  const userId = req?.auth?.user?.id;
  if (!contestantId || !pollsId || !userId) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }
  // check the database
  try {
    await connectDatabase();
    // check if the poll exist
    const poll = await Polls.findById(pollsId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 400,
        },
      );
    }
    // if voting hasnt started
    if (new Date() < new Date(poll?.startDate)) {
      return NextResponse.json(
        { error: "Voting has not started" },
        {
          status: 400,
        },
      );
    }
    // if voting has ended
    if (new Date() > new Date(poll?.endDate)) {
      return NextResponse.json(
        { error: "Voting has ended" },
        {
          status: 400,
        },
      );
    }
    // check if the contestant exist
    const contestants = await Contestant.findOne({
      _id: contestantId,
      pollId: pollsId,
    })
      .populate("candidates.userId", "name image department faculty email")
      .populate("pollId", "startDate endDate title description");
    return NextResponse.json(
      { contestant: contestants },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Network Error" },
      {
        status: 400,
      },
    );
  }
};
