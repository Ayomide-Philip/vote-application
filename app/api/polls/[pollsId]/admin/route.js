import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";
import User from "@/libs/models/user.models";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { auth } from "@/auth";

export const PUT = auth(async function PUT(req, { params }) {
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
  const { newAdminId } = await req.json();
  const authorizationId = req?.auth?.user?.id;
  // check if pollsId exist and newAdminId exist
  if (!pollsId || !newAdminId) {
    return NextResponse.json(
      { error: "Invalid Parameters" },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    // checking if the user and authorizing user exist
    const newAdminUser = await User.findById(newAdminId);
    if (!newAdminUser) {
      return NextResponse.json({ error: "User doesn't exist" });
    }

    const authorizingUser = await User.findById(authorizationId);
    if (!authorizingUser) {
      return NextResponse.json(
        { error: "Invalid Admin" },
        {
          status: 400,
        },
      );
    }
    // checking if the poll exist
    const poll = await Polls.findById(pollsId);
    if (!poll) {
      return NextResponse.json(
        { error: "Poll doesn't exist" },
        {
          status: 400,
        },
      );
    }
    // check if the admin and user belong to the poll
    // if the new admin does not exist in the poll, we would return an error
    if (
      !poll?.voters?.find(
        (voter) => voter?.toString() === newAdminId?.toString(),
      )
    ) {
      return NextResponse.json(
        { error: "User doesn't belong to the poll" },
        {
          status: 400,
        },
      );
    }
    // check if the authorizing user is an admin or owner of the poll
    const authorizingUserInPoll = poll?.role?.find(
      (r) => r?.userId?.toString() === authorizationId?.toString(),
    );
    // if the authorizing user does not exist in the poll or is not an admin or owner, we would return an error
    if (
      !authorizingUserInPoll?.userRole ||
      authorizingUserInPoll?.userRole !== "Owner"
    ) {
      return NextResponse.json(
        {
          error: "Unauthorized Action, Only Owner can update role",
        },
        {
          status: 400,
        },
      );
    }
    // check if the user that want to be an admin is already an admin
    if (
      poll?.role?.find((r) => r?.userId?.toString() === newAdminId.toString())
    ) {
      return NextResponse.json(
        {
          error: `User is Already an ${poll?.role?.find((r) => r?.userId?.toString() === newAdminId.toString())?.userRole}`,
        },
        {
          status: 400,
        },
      );
    }
    // check if the user is a contestant
    const checkIfNewUserIsAContestant = newAdminUser?.voteInformation?.find(
      (info) => info?.pollId?.toString() === pollsId?.toString(),
    );
    // if the user is a contestant, we would return an error
    if (checkIfNewUserIsAContestant?.role === "Candidate") {
      return NextResponse.json(
        { error: "Contestants cannot be promoted to admin" },
        {
          status: 400,
        },
      );
    }
    // update the role of the user to admin
    const updatingUserToAdmin = await User.updateOne(
      {
        _id: new mongoose.Types.ObjectId(newAdminId),
        "voteInformation.pollId": new mongoose.Types.ObjectId(pollsId),
      },
      { $set: { "voteInformation.$.role": "Admin" } },
    );
    // adding the user to the list of admin of the poll
    const updatingPoll = await Polls.updateOne(
      { _id: new mongoose.Types.ObjectId(pollsId) },
      {
        $push: {
          role: {
            userRole: "Admin",
            userId: new mongoose.Types.ObjectId(newAdminId),
          },
        },
      },
    );
    // success
    return NextResponse.json(
      {
        updatingUserToAdmin,
        updatingPoll,
        message: `User Successfully Updated to Admin`,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to update role" },
      {
        status: 500,
      },
    );
  }
});

export const DELETE = async function DELETE(req, { params }) {
  const { pollsId } = await params;
  const { adminId, authorizationId } = await req.json();
  // check if pollsId exist and adminId exist
  if (!pollsId || !adminId || !authorizationId) {
    return NextResponse.json(
      { error: "Invalid Parameters" },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    // checking if the user and authorizing user exist
    const adminUser = await User.findById(adminId);
    // if user does not exist, we would return an error
    if (!adminUser) {
      return NextResponse.json(
        { error: "User doesn't exist" },
        {
          status: 400,
        },
      );
    }
    const authorizingUser = await User.findById(authorizationId);
    // if authorizing user does not exist, we would return an error
    if (!authorizingUser) {
      return NextResponse.json(
        { error: "Invalid Admin or Owner" },
        {
          status: 400,
        },
      );
    }
    // checking if the poll exist
    const poll = await Polls.findById(pollsId);
    // if poll does not exist, we would return an error
    if (!poll) {
      return NextResponse.json(
        { error: "Poll doesn't exist" },
        { status: 400 },
      );
    }
    // if the admin does not exist in the poll, we would return an error
    const doesAdminBelongToThePoll = poll?.role?.find(
      (r) => r?.userId?.toString() === adminId.toString(),
    );
    // if the admin does not exist in the poll, we would return an error
    if (!doesAdminBelongToThePoll) {
      return NextResponse.json(
        {
          error: "User doesn't belong to the poll",
        },
        {
          status: 400,
        },
      );
    }
    // success
    return NextResponse.json(
      { message: "Successfully Removed Admin Priviledge" },
      { status: 200 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Unable to remove admin priviledge" },
      { status: 500 },
    );
  }
};
