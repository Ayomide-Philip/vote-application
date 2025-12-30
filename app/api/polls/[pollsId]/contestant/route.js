import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import User from "@/libs/models/user.models";

export async function GET(req, { params }) {
  const { pollsId } = await params;
  //if polls id is not present
  if (!pollsId) {
    return NextResponse.json(
      { error: "No poll found." },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the poll even exist in the database
    const poll = await Polls.findById(pollsId);
    // if post does not exist return an error
    if (!poll) {
      return NextResponse.json(
        { error: "No poll found." },
        {
          status: 400,
        }
      );
    }
    // check if the contestant has any one with this poll id
    const contestant = await Contestant.find({ pollId: pollsId });
    return NextResponse.json(
      { contestant },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while getting all contestants." },
      {
        status: 400,
      }
    );
  }
}

export async function POST(req, { params }) {
  const { userId, position } = await req.json();
  const { pollsId } = await params;
  // check if the user id exist
  if (!userId) {
    return NextResponse.json(
      { error: "User is unauthorized" },
      {
        status: 400,
      }
    );
  }
  // check if the polls id exist
  if (!pollsId) {
    return NextResponse.json(
      { error: "Invalid Parameter" },
      {
        status: 400,
      }
    );
  }

  // check the position
  if (!position || !position.trim()) {
    return NextResponse.json(
      { error: "Position is missing" },
      {
        status: 400,
      }
    );
  }
  // checking position length
  if (position.trim().length < 5) {
    return NextResponse.json(
      { error: "Position cant be less than 5 characters" },
      {
        status: 400,
      }
    );
  }

  try {
    await connectDatabase();
    // check if the user exist
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if user belong to the poll
    const userBelongs = user?.voteInformation.find((info) => {
      return info?.pollId?.toString() === pollsId.toString();
    });
    // if user does not belong
    if (!userBelongs) {
      return NextResponse.json(
        { error: "User doesnt belong to this poll" },
        {
          status: 400,
        }
      );
    }
    // check if the user has the correct authorization to create a contestant
    if (userBelongs?.role !== "Owner" && userBelongs?.role !== "Admin") {
      return NextResponse.json(
        { error: "You dont have permission to perform this action" },
        {
          status: 400,
        }
      );
    }
    //after verifying all process then create a contestant
    const contestant = await Contestant.create({
      pollId: pollsId,
      userId: userId,
      position: position.toLowerCase(),
    });
    // success message
    return NextResponse.json(
      { message: "Successfully Created.", contestant: contestant },
      {
        status: 200,
      }
    );
  } catch (err) {
    if (err?.code === 11000) {
      return NextResponse.json(
        { error: "You have created this position before" },
        {
          status: 400,
        }
      );
    }
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while creating new contestant." },
      {
        status: 400,
      }
    );
  }
}
