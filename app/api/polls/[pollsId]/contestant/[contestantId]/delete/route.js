import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  const { pollsId, contestantId } = await params;
  return NextResponse.json(
    { message: "DELETING my contestant", pollsId, contestantId },
    {
      status: 200,
    },
  );
}
