import { auth } from "@/auth";
import pool from "@/server/config/db";
import { GET_ELECTION_BY_ID_QUERY } from "@/server/query/election";
import { NextResponse } from "next/server";

export const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export const GET = auth(async (req, { params }) => {
  if (!req.auth || !req.auth.user) {
    return NextResponse.json(
      {
        error: "Unauthorized Access",
      },
      {
        status: 401,
      },
    );
  }

  const { electionId } = await params;
  const userId = req.auth.user.id;

  if (!electionId?.trim() || !UUID_REGEX.test(electionId?.trim())) {
    return NextResponse.json(
      {
        error: "Invalid Parameters",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const existingUser = await pool.query(
      "SELECT id, is_verified FROM users WHERE id = $1",
      [userId],
    );

    if (existingUser.rowCount === 0) {
      return NextResponse.json(
        {
          error: "Unauthorized Access",
        },
        {
          status: 401,
        },
      );
    }

    if (!existingUser.rows[0].is_verified) {
      return NextResponse.json(
        {
          error:
            "Email address not verified. Please verify your email address to access this resource.",
        },
        {
          status: 403,
        },
      );
    }

    const electionData = await pool.query(GET_ELECTION_BY_ID_QUERY, [
      electionId,
      userId,
    ]);

    if (electionData.rowCount === 0) {
      return NextResponse.json(
        {
          error: "Election not found or access denied",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        election: electionData.rows[0],
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "Unable to fetch election data",
      },
      {
        status: 500,
      },
    );
  }
});
