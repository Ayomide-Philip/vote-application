import { connectDatabase } from "@/libs/connectdatabase";
import User from "@/libs/models/user.models";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { pollsId } = await params;
  const { newAdminId, authorizationId } = await req.json();
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

    return NextResponse.json(
      { pollsId, newAdminUser },
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
}
