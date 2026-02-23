import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";

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
    // check if the voter exist in the database
    const existingUser = poll?.voters?.find(
      (v) => v.toString() === userId.toString(),
    );
    console.log(existingUser);
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
