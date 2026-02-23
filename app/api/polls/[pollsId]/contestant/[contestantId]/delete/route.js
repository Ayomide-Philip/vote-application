import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";

export async function DELETE(req, { params }) {
  const { pollsId, contestantId } = await params;
  const { userId } = await req.json();
  if (!pollsId || !contestantId || !userId) {
    return NextResponse.json(
      { error: "Invalid Parameters" },
      {
        status: 400,
      },
    );
  }
  try {
    // connect to database
    await connectDatabase();
    // check if the userId exist
    const authorizationUser = await User.findById(userId);
    // if auth user does not exist in database return error
    if (!authorizationUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        },
      );
    }
    // check if the poll exist
    const poll = await Polls.findById(pollsId);
    // if the poll does not exist return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 400,
        },
      );
    }
    // check if the voter exist in the poll role
    const existingUser = poll?.role?.find(
      (v) => v?.userId?.toString() === userId.toString(),
    );
    // return unauthorized access if the user does not have an access to edit
    if (
      !existingUser ||
      (existingUser?.userRole !== "Owner" && existingUser?.userRole !== "Admin")
    ) {
      return NextResponse.json(
        { error: "Unauthorized Access" },
        {
          status: 401,
        },
      );
    }
    // check if the contestant exist
    const contestant = await Contestant.findById(contestantId);
    // if it does not exist return an error
    if (!contestant) {
      return NextResponse.json(
        { error: "Contestant Position not Found" },
        {
          status: 400,
        },
      );
    }
    // return success
    return NextResponse.json(
      {
        message: "DELETING my contestant",
        authorizationUser,
        voters: poll?.voters,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to delete contestant position" },
      {
        status: 400,
      },
    );
  }
}
