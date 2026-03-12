import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import User from "@/libs/models/user.models";
import { auth } from "@/auth";

export const GET = auth(async function GET(req, { params }) {
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
  const { pollsId } = await params;
  const userId = req?.auth?.user?.id;
  //if polls id is not present
  if (!pollsId || !userId) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    // check if the poll even exist in the database
    const poll = await Polls.findById(pollsId);
    // if post does not exist return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Polls not found." },
        {
          status: 400,
        },
      );
    }
    // check if he user is an admin or owner of the poll
    const currentUserRole = poll?.role?.find(
      (r) => r?.userId?.toString() === userId?.toString(),
    );
    if (
      !currentUserRole ||
      (currentUserRole?.userRole !== "Admin" &&
        currentUserRole?.userRole !== "Owner")
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }
    // check if the contestant has any one with this poll id
    const contestant = await Contestant.find({ pollId: pollsId })
      .populate("candidates", "userId votes position")
      .populate("candidates.userId", "name email image");
    // get all the total candidate in the Contestant
    const candidate = [];
    // if there is no contestant
    if (contestant.length <= 0) {
      return NextResponse.json(
        { candidate },
        {
          status: 200,
        },
      );
    }
    // get all candidate if they exist
    for (let i = 0; i < contestant.length; i++) {
      candidate.push(
        ...contestant[i].candidates.map((c) => ({
          ...c.toObject(),
          position: contestant[i].position,
        })),
      );
    }
    return NextResponse.json(
      { candidate },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while getting all contestants." },
      {
        status: 400,
      },
    );
  }
});
