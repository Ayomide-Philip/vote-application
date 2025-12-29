import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";

export async function PUT(req, { params }) {
  const { userId } = await req.json();
  const { pollsId } = await params;
  try {
    await connectDatabase();
    // get the poll
    const poll = await Polls.findById(pollsId);
    // if no polls return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { message: "Successfully updated poll", userId, pollsId },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to join poll" },
      {
        status: 400,
      }
    );
  }
}
