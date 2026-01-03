import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import User from "@/libs/models/user.models";

export async function GET(req, { params }) {
  const { contestantId, pollsId } = await params;
  // if there is no poll id
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll Id is not defined" },
      {
        status: 400,
      }
    );
  }
  // if there is no contestantId
  if (!contestantId) {
    return NextResponse.json(
      { error: "Contestant Id is not defined" },
      {
        status: 400,
      }
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
        }
      );
    }
    // if voting hasnt started
    if (new Date() < new Date(poll?.startDate)) {
      return NextResponse.json(
        { error: "Voting has not started" },
        {
          status: 400,
        }
      );
    }
    // if voting has ended
    if (new Date() > new Date(poll?.endDate)) {
      return NextResponse.json(
        { error: "Voting has ended" },
        {
          status: 400,
        }
      );
    }
    // check if the contestant exist
    const contestants = await Contestant.findOne({
      _id: contestantId,
      pollId: pollsId,
    })
      .populate("candidates.userId", "name image department faculty")
      .populate("pollId", "startDate endDate title description");
    return NextResponse.json(
      { contestant: contestants },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Network Error" },
      {
        status: 400,
      }
    );
  }
}
