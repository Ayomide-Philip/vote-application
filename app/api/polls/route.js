import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import { auth } from "@/auth";

export const POST = auth(async function POST(req) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      }
    );
  }
  const userId = req?.auth?.user?.id;
  const {
    title,
    description,
    startDate,
    endDate,
    emailPrefix,
    departmentCodes,
  } = await req.json();
  // check if a userId exist
  if (!userId) {
    return NextResponse.json(
      { error: "User id is missing" },
      {
        status: 400,
      }
    );
  }
  // check the title of the poll
  if (!title || !title.trim()) {
    return NextResponse.json(
      { error: "Title is required" },
      {
        status: 400,
      }
    );
  }
  // check if the title is less than 5 characters
  if (title.trim().length < 5) {
    return NextResponse.json(
      { error: "Title should be at least 5 characters!" },
      {
        status: 400,
      }
    );
  }
  // check if the description exist
  if (!description || !description.trim()) {
    return NextResponse.json(
      { error: "Description is required" },
      {
        status: 400,
      }
    );
  }
  // check if the description is less than 10 characters
  if (description.trim().length < 10) {
    return NextResponse.json(
      { error: "Description should be at least 10 characters!" },
      {
        status: 400,
      }
    );
  }
  // check startDate
  if (!startDate) {
    return NextResponse.json(
      { error: "StartDate is required" },
      {
        status: 400,
      }
    );
  }
  // check if start date is less than the current time
  if (new Date(startDate) < new Date()) {
    return NextResponse.json(
      { error: "Start date cant be in the past" },
      {
        status: 400,
      }
    );
  }
  // one-hour difference before a voting session start
  if (new Date(startDate) - new Date() < 60 * 60 * 1000) {
    return NextResponse.json(
      {
        error:
          "There should be one hour difference before the election can start",
      },
      {
        status: 400,
      }
    );
  }
  // check endDate
  if (!endDate) {
    return NextResponse.json(
      { error: "End date is required" },
      {
        status: 400,
      }
    );
  }
  //check if the end date is not in the past
  if (new Date(startDate) >= new Date(endDate)) {
    return NextResponse.json(
      { error: "End date should be in the future" },
      {
        status: 400,
      }
    );
  }
  // check if there is 1hr difference between start date and end date
  if (new Date(endDate) - new Date(startDate) < 60 * 60 * 1000) {
    return NextResponse.json(
      { error: "Poll duration must be at least 1 hour" },
      {
        status: 400,
      }
    );
  }
  // check email prefix
  if (emailPrefix && emailPrefix.length < 10) {
    return NextResponse.json(
      { error: "Invalid syntax for email prefix." },
      {
        status: 400,
      }
    );
  }

  if (emailPrefix && !emailPrefix.startsWith("@")) {
    return NextResponse.json(
      { error: "Start with an @ symbol" },
      {
        status: 400,
      }
    );
  }
  // checking departmental codes
  let departmentalCodeArray;
  if (departmentCodes) {
    departmentalCodeArray = departmentCodes.split(",");
  }
  try {
    await connectDatabase();
    // check if the user really exist in the database
    const user = await User.findById(userId);
    // if no user return an error
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        {
          status: 400,
        }
      );
    }
    // create a new poll
    const poll = await Polls.create({
      userId,
      title,
      description,
      endDate,
      startDate,
      rule: {
        emailPrefix,
        departmentCodes: departmentalCodeArray,
      },
      voters: [userId],
      role: [{ userRole: "Owner", userId: userId }],
    });
    user.voteInformation = { pollId: poll._id, role: "Owner" };
    await user.save();
    return NextResponse.json(
      { message: "Successfully created", poll: poll },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while creating a new Poll" },
      {
        status: 400,
      }
    );
  }
});

export const GET = auth(async function GET(req) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      }
    );
  }
  const userId = req?.auth?.user?.id;
  try {
    await connectDatabase();
    // get all polls from the database
    const polls = await Polls.find({
      voters: { $in: [userId] },
    }).sort({ createdAt: -1 });
    return NextResponse.json(
      { message: "Polls fetched successfully", polls: polls },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while fetching polls" },
      {
        status: 400,
      }
    );
  }
});
