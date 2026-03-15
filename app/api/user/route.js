import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import mongoose from "mongoose";

export const GET = auth(async function GET(req) {
  if (!req?.auth?.user || !req?.auth?.user?.id) {
    return NextResponse.json(
      { error: "User is not Authorized" },
      {
        status: 400,
      },
    );
  }
  try {
    await connectDatabase();
    // check if the user exist in the database
    const user = await User.findById(req?.auth?.user.id).lean();
    // if no user exist
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        },
      );
    }
    return NextResponse.json(
      {
        user: {
          _id: user?._id,
          googleId: user?.googleId ? true : false,
          name: user?.name,
          email: user?.email,
          image: user?.image,
          faculty: user?.faculty,
          department: user?.department,
          createdAt: user?.createdAt,
          voteInformation: user?.voteInformation || [],
        },
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while getting user information" },
      {
        status: 400,
      },
    );
  }
});

export const PUT = auth(async function PUT(req) {
  if (!req?.auth?.user || !req?.auth?.user?.id) {
    return NextResponse.json(
      { error: "User is not Authorized" },
      {
        status: 400,
      },
    );
  }
  const userId = req?.auth?.user?.id;
  const { faculty, department } = await req.json();
  // if no user Id
  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized Access" },
      {
        status: 400,
      },
    );
  }
  // faculty is present
  if (faculty && faculty.length < 5) {
    return NextResponse.json(
      { error: "Faculty cant be less than 5 characters long" },
      {
        status: 400,
      },
    );
  }
  // department is present
  if (department && department.length < 5) {
    return NextResponse.json(
      { error: "Department cannot be less than 5 characters long" },
      {
        status: 400,
      },
    );
  }

  try {
    await connectDatabase();
    // check if the user exist
    const user = await User.findById(new mongoose.Types.ObjectId(userId));
    // if the user doesn't exist
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        },
      );
    }
    // edit the user department and faculty
    let editing = false;
    if (faculty?.trim() && faculty?.trim() !== user?.faculty?.trim()) {
      user.faculty = faculty;
      editing = true;
    }
    if (department?.trim() && department?.trim() !== user?.department?.trim()) {
      user.department = department;
      editing = true;
    }
    if (editing) {
      await user.save();
    }
    //success message
    return NextResponse.json(
      {
        message: "Successfully updated user profile",
        user: {
          userId: user._id,
          googleId: user?.googleId ? true : false,
          name: user?.name,
          email: user?.email,
          image: user?.image,
          faculty: user?.faculty,
          department: user?.department,
        },
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while updating user information" },
      {
        status: 400,
      },
    );
  }
});
