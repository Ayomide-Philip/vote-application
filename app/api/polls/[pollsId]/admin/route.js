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
    return NextResponse.json(
      { pollsId },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to update role" },
      {
        status: 500,
      },
    );
  }
}
