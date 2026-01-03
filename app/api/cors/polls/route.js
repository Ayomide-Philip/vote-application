import { NextResponse } from "next/server";
import { connectDatabase } from "@/libs/connectdatabase";
import Polls from "@/libs/models/polls.models";

// Marks all polls whose endDate is in the past as Closed.
export async function GET() {
  try {
    await connectDatabase();

    const now = new Date();
    const result = await Polls.updateMany(
      { endDate: { $lt: now }, status: { $ne: "Closed" } },
      { $set: { status: "Closed" } }
    );

    return NextResponse.json(
      {
        message: "Poll statuses updated",
        matched: result?.matchedCount ?? result?.n ?? 0,
        updated: result?.modifiedCount ?? result?.nModified ?? 0,
        closedAt: now,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error closing polls", error);
    return NextResponse.json(
      { error: "Failed to update poll statuses" },
      { status: 500 }
    );
  }
}
