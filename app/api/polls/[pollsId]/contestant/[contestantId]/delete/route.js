import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { pollsId, contestantId } = await params;
  if (!pollsId || !contestantId) {
    return NextResponse.json(
      { error: "Invalid Parameters" },
      {
        status: 400,
      },
    );
  }
  try {
    return NextResponse.json(
      { message: "DELETING my contestant", pollsId, contestantId },
      {
        status: 200,
      },
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Unable to delete contestant position" },
      {
        status: 400,
      },
    );
  }
}
