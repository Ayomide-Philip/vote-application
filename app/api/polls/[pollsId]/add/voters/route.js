import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import { auth } from "@/auth";
import mongoose from "mongoose";

export const PUT = auth(async function PUT(req, { params }) {
  const { pollsId } = await params;
  const { voters, departmentCodeComplusory } = await req.json();
  if (!req?.auth || !req?.auth?.user) {
    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      },
    );
  }
  const userId = req?.auth?.user?.id;
  // if polls id is not defined
  if (!pollsId) {
    return NextResponse.json(
      {
        error: "No poll id was specified",
      },
      {
        status: 400,
      },
    );
  }
  // if no voters is specified
  if (!voters) {
    return NextResponse.json(
      {
        error: "Voters are not specified",
      },
      {
        status: 400,
      },
    );
  }
  // if the array is empty
  if (Array.isArray(voters) && voters?.length === 0) {
    return NextResponse.json(
      { error: "Empty list of voters" },
      {
        status: 400,
      },
    );
  }
  // check if user id is not defined
  if (!userId) {
    return NextResponse.json(
      {
        error: "User id is not specified",
      },
      {
        status: 400,
      },
    );
  }

  try {
    //connect to database
    await connectDatabase();
    // check if the poll exist
    const authorizationUserId = await User.findById(userId);
    if (!authorizationUserId) {
      return NextResponse.json(
        {
          error: "User does not exist",
        },
        {
          status: 400,
        },
      );
    }
    // check if the user has access to the poll
    const authorizationUserVoteInfo = authorizationUserId?.voteInformation.find(
      (info) => {
        return info.pollId.toString() === pollsId.toString();
      },
    );
    // if user doesnt have access to the poll
    if (!authorizationUserVoteInfo) {
      return NextResponse.json(
        {
          error: "User doesnt have access to this poll",
        },
        {
          status: 400,
        },
      );
    }
    // if user is not the owner of the poll
    if (
      authorizationUserVoteInfo?.role !== "Owner" &&
      authorizationUserVoteInfo?.role !== "Admin"
    ) {
      return NextResponse.json(
        {
          error: "You don't have permission to add voters to this poll",
        },
        {
          status: 403,
        },
      );
    }
    const poll = await Polls.findById(pollsId)
      .populate("voters", "email")
      .lean();
    // if poll does not exist
    if (!poll) {
      return NextResponse.json(
        {
          error: "Poll does not exist",
        },
        {
          status: 400,
        },
      );
    }
    // get all the voters in the poll
    const currentVoters = poll?.voters || [];
    const pollRule = poll?.rule || {
      emailPrefix: "@gmail.com",
      departmentCodes: [],
    };
    // check through the email that was passed and check if they have the email prefix
    const voterWhoPassedEmailCheck = voters?.filter((v) => {
      return v.includes(pollRule?.emailPrefix);
    });
    // check if the voters email which passed the email check are not already a voters
    const votersNotInPollCurrentVoters = voterWhoPassedEmailCheck?.filter(
      (v) => {
        return !currentVoters.some((a) => a.email === v);
      },
    );
    // check if the department code to check exist
    let voterWhoPassedDepartmentCodeCheck = [];
    if (
      departmentCodeComplusory &&
      pollRule?.departmentCodes?.length > 0 &&
      pollRule?.emailPrefix.trim()
    ) {
      voterWhoPassedDepartmentCodeCheck = votersNotInPollCurrentVoters?.filter(
        (v) => {
          return pollRule?.departmentCodes?.some((cv) => {
            const emailRegex = new RegExp(
              `^[a-zA-Z0-9_.]+\\.${cv}\\d+${pollRule?.emailPrefix.replace(/\./g, "\\.")}$`,
            );
            return emailRegex.test(v) ? v : null;
          });
        },
      );
    }
    // if voter who passed departement code check is empty then do this
    if (
      voterWhoPassedDepartmentCodeCheck?.length === 0 &&
      !departmentCodeComplusory
    ) {
      voterWhoPassedDepartmentCodeCheck = votersNotInPollCurrentVoters;
    }
    // if voter remainig is empty then return an error
    if (voterWhoPassedDepartmentCodeCheck?.length === 0) {
      return NextResponse.json(
        {
          error: "No Voters passed the required citeria",
        },
        {
          status: 400,
        },
      );
    }
    // check if the voters remainig exist as a user in the database
    const users = await User.find({
      email: { $in: voterWhoPassedDepartmentCodeCheck },
    }).select("_id");
    const voterIds = users.map((u) => u._id.toString());
    // check if the voters remainig exist as a user in the database
    if (voterIds?.length === 0) {
      return NextResponse.json(
        {
          error: "Voters dont exist",
        },
        {
          status: 400,
        },
      );
    }
    // add the voters to the poll
    const newVoters = await Polls.findByIdAndUpdate(
      pollsId,
      {
        $addToSet: {
          voters: { $each: voterIds },
        },
      },
      { new: true },
    );
    // create a poll object id to add to the voters information
    const pollObjectId = new mongoose.Types.ObjectId(pollsId);
    // add the poll to the voters information
    const updatedUsersInfo = await User.updateMany(
      {
        _id: { $in: voterIds },
        "voteInformation.pollId": { $ne: pollObjectId }, // prevent duplicates
      },
      {
        $addToSet: {
          voteInformation: {
            pollId: pollObjectId,
            role: "Voters",
          },
        },
      },
    );

    // if success
    return NextResponse.json(
      {
        message: "Users Added Successfully",
        newVoters,
        updatedUsersInfo,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to add voters",
      },
      {
        status: 400,
      },
    );
  }
});
