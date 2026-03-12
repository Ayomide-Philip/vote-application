import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
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
  if (!pollsId || !userId) {
    return NextResponse.json(
      { error: "Invalid Parameters" },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    // check if the poll  exist
    const poll = await Polls.findById(pollsId)
      .select("voters role")
      .populate("voters", "name voteInformation image email department")
      .lean();
    // if no poll return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll doesn't exist" },
        {
          status: 404,
        },
      );
    }
    // check if the user is an admin or owner of the poll
    const userExist = poll?.role?.find(
      (r) => r?.userId.toString() === userId.toString(),
    );
    // if user is not an admin or owner return an error
    if (
      !userExist ||
      (userExist?.userRole !== "Admin" && userExist?.userRole !== "Owner")
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

    return NextResponse.json(
      { voters: poll?.voters },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while fetching voters" },
      {
        status: 400,
      },
    );
  }
});
