import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import User from "@/libs/models/user.models";
import Contestant from "@/libs/models/contestant.models";
import { auth } from "@/auth";

export const GET = auth(async function GET(req, { params }) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      }
    );
  }
  const userId = req?.auth?.user?.id;
  const { pollsId } = await params;
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the poll  exist
    const poll = await Polls.findById(pollsId)
      .populate("userId", "name email image")
      .populate("contestants");
    // if no poll return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found" },
        {
          status: 404,
        }
      );
    }

    const userExist = poll?.voters.find(
      (v) => v.toString() === userId.toString()
    );

    if (!userExist) {
      return NextResponse.json(
        { error: "User Does not belong to this board" },
        {
          status: 400,
        }
      );
    }

    return NextResponse.json(
      { poll: poll },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to get Poll" },
      {
        status: 400,
      }
    );
  }
});
