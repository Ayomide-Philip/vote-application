import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  const { userId: authorizationUserId } = await req.json();
  const { pollsId, userId } = await params;
  // check if no user authorizationUserId exist
  if (!authorizationUserId) {
    return NextResponse.json(
      { error: "User is not authorized" },
      {
        status: 401,
      }
    );
  }
  // check if poll id doesnt exist
  if (!pollsId) {
    return NextResponse.json(
      { error: "Polls not found" },
      {
        status: 400,
      }
    );
  }
  // check the user they want to add id
  if (!userId) {
    return NextResponse.json(
      { error: "User does not exist" },
      {
        status: 400,
      }
    );
  }
try{}catch(err){
      console.log(err);
      return NextResponse.json({error:""});
}
}
