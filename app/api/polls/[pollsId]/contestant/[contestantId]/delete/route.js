import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";

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

    // return success
    return NextResponse.json(
      {
        message: "DELETING my contestant",
        pollsId,
        contestantId,
        authorizationUser,
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
