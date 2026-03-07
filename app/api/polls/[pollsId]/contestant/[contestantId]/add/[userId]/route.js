import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import { auth } from "@/auth";

export const PUT = auth(async function PUT(req, { params }) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      },
    );
  }
  const authorizationUserId = req?.auth?.user?.id;
  const { pollsId, contestantId, userId } = await params;
  if (!authorizationUserId) {
    return NextResponse.json(
      { error: "User is not Authorized" },
      {
        status: 401,
      },
    );
  }
  // validate pollsId, contestantId, userId
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll ID is required" },
      {
        status: 400,
      },
    );
  }
  if (!contestantId) {
    return NextResponse.json(
      { error: "Contestant ID is required" },
      {
        status: 400,
      },
    );
  }
  if (!userId) {
    return NextResponse.json(
      { error: "User ID is required" },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    // check if the user exist
    const newCandidate = await User.findById(userId);
    // if new candidate does not exist
    if (!newCandidate) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 401,
        },
      );
    }
    // check if the candidate belongs to the poll
    const candidateBelongs = newCandidate.voteInformation.find((info) => {
      return info?.pollId.toString() === pollsId.toString();
    });
    // if user does not belong return error
    if (!candidateBelongs) {
      return NextResponse.json(
        { error: "Candidate does not belong to poll" },
        {
          status: 401,
        },
      );
    }
    // check the role
    if (
      candidateBelongs?.role === "Admin" ||
      candidateBelongs?.role === "Owner"
    ) {
      return NextResponse.json(
        { error: `Poll ${candidateBelongs?.role} cant be a candidate` },
        {
          status: 401,
        },
      );
    }
    // check if the person who wants to authorize the addition of this new candidate exist
    const authorizedUser = await User.findById(authorizationUserId);
    // if not authorize user return an error
    if (!authorizedUser) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 401,
        },
      );
    }
    // check if the poll exist
    const poll = await Polls.findById(pollsId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll does not exist" },
        {
          status: 401,
        },
      );
    }
    // check if this user has the right to authorize
    const userBelongs = authorizedUser?.voteInformation.find((info) => {
      return info?.pollId.toString() === pollsId.toString();
    });
    // if user doesn't belong return an error
    if (!userBelongs) {
      return NextResponse.json(
        { error: "User does not belong to poll" },
        {
          status: 400,
        },
      );
    }
    // check if the user has the right to update the poll
    if (userBelongs?.role !== "Admin" && userBelongs?.role !== "Owner") {
      return NextResponse.json(
        { error: "User does not have the right to authorize this action" },
        { status: 400 },
      );
    }
    //find the contestant
    const contestant = await Contestant.findOne({
      _id: contestantId,
      pollId: pollsId,
    });
    // if contestant doesnt exist
    if (!contestant) {
      return NextResponse.json(
        { error: "Contestant does not exist" },
        {
          status: 400,
        },
      );
    }
    // check if the candidate already exist
    const candidateExist = contestant.candidates.find((candidate) => {
      return candidate?.userId.toString() === userId?.toString();
    });
    if (candidateExist) {
      return NextResponse.json(
        { error: "Candidate already exist" },
        {
          status: 400,
        },
      );
    }

    // Check if user is already a candidate in this poll (any position)
    const alreadyCandidate = await Contestant.findOne({
      pollId: pollsId,
      "candidates.userId": userId,
    });

    if (alreadyCandidate) {
      return NextResponse.json(
        {
          error: `User is already a candidate for a position in this poll`,
        },
        { status: 400 },
      );
    }

    // add the new contestant to the list
    contestant?.candidates.push({
      userId: newCandidate._id,
    });

    candidateBelongs.role = "Candidate";
    await newCandidate.save();
    await contestant.save();

    //success message
    return NextResponse.json(
      {
        message: "User Successfully Updated",
        voteInformation: newCandidate.voteInformation,
        candidate: contestant.candidates,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error was encountered" },
      {
        status: 400,
      },
    );
  }
});
