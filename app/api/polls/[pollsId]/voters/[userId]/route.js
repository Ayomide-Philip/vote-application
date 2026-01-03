import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import Polls from "@/libs/models/polls.models";
import Contestant from "@/libs/models/contestant.models";
import mongoose from "mongoose";
import { auth } from "@/auth";

export const DELETE = auth(async function DELETE(req, { params }) {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      }
    );
  }
  const authorizingUser = req?.auth?.user?.id;
  const { pollsId, userId } = await params;

  // if pollsId is not defined
  if (!pollsId) {
    return NextResponse.json(
      { error: "Poll id not found" },
      {
        status: 400,
      }
    );
  }
  // if userId is not defined
  if (!userId) {
    return NextResponse.json(
      { error: "User id is missing" },
      {
        status: 400,
      }
    );
  }
  // if authorizingUser is not defined
  if (!authorizingUser) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 401,
      }
    );
  }
  try {
    // connect to database
    await connectDatabase();
    // check if the user exist in the database
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        }
      );
    }
    // check if the person who want to authorize exist in the database
    const authorizedUser = await User.findById(authorizingUser);
    if (!authorizedUser) {
      return NextResponse.json(
        { error: "You dont exist" },
        {
          status: 400,
        }
      );
    }
    // check if the poll exist
    const poll = await Polls.findById(pollsId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll not found" },
        {
          status: 400,
        }
      );
    }
    // check if the user and authorizingUser exist
    const userExistInPoll = poll?.voters.find(
      (voter) => voter.toString() === userId.toString()
    );
    if (!userExistInPoll) {
      return NextResponse.json(
        { error: "User does not belong to this poll" },
        {
          status: 400,
        }
      );
    }
    // check if the person authorizing exist
    const authorizingUserExistInPoll = poll?.voters.find(
      (voter) => voter.toString() === authorizingUser.toString()
    );
    if (!authorizingUserExistInPoll) {
      return NextResponse.json(
        { error: "Admin does not belong to this poll" },
        {
          status: 400,
        }
      );
    }
    // check if the authorizing user has a role in the poll
    const authorizingUserRole = poll?.role.find((user) => {
      return user?.userId.toString() === authorizingUser.toString();
    });
    if (!authorizingUserRole) {
      return NextResponse.json(
        { error: "User does not have permission to edit this poll" },
        {
          status: 400,
        }
      );
    }
    // if the user role is not admin or owner return unauthorized access
    if (
      authorizingUserRole?.userRole !== "Admin" &&
      authorizingUserRole?.userRole !== "Owner"
    ) {
      return NextResponse.json(
        { error: "You dont have the right to edit this group settings" },
        {
          status: 400,
        }
      );
    }
    // check if the user is a candidate
    const userIsCandidate = user?.voteInformation?.find(
      (info) => info?.pollId?.toString() === pollsId.toString()
    );
    // get userIsCandidate
    if (!userIsCandidate) {
      return NextResponse.json(
        { error: "Invalid Parameters" },
        {
          status: 400,
        }
      );
    }

    if (
      userIsCandidate?.role === "Owner" ||
      userIsCandidate?.role === "Admin"
    ) {
      return NextResponse.json(
        {
          error: "You can remove yourself from the board",
        },
        {
          status: 400,
        }
      );
    }
    // check if the user exist in a contestant
    const contestant = await Contestant.findOne({
      pollId: pollsId,
      "candidates.userId": new mongoose.Types.ObjectId(userId),
    });

    if (contestant) {
      await Contestant.findOneAndUpdate(
        { pollId: pollsId },
        {
          $pull: {
            candidates: { userId: userId },
          },
        },
        { new: true }
      );
    }
    //remove the user from the polls
    poll.voters = poll.voters.filter((p) => p.toString() !== userId.toString());
    await poll.save();
    // remove the poll from the user's voteInformation
    user.voteInformation = user.voteInformation.filter(
      (info) => info.pollId.toString() !== pollsId.toString()
    );
    await user.save();
    //success
    return NextResponse.json(
      {
        message: "Successfully deleted user from poll",
        voter: poll.voters,
      },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An error occurred while removing user for the poll" },
      {
        status: 400,
      }
    );
  }
});
