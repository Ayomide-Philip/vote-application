import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";

export const GET = auth(async function GET(req) {
  if (!req?.auth?.user || !req?.auth?.user?.id) {
    return NextResponse.json(
      { error: "User is not Authorized" },
      {
        status: 400,
      }
    );
  }
  try {
    await connectDatabase();
    // check if the user exist in the database
    const user = await User.findById(req?.auth?.user.id);
    // if no user exist
    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      { user },
      {
        status: 200,
      }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "An error occurred while getting user information" },
      {
        status: 400,
      }
    );
  }
});

export const PUT = async function PUT(){
  return NextResponse.json({message:"Successfully updated user profile"});
}