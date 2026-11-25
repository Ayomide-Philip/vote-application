import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { ELECTION_CODE_REGEX } from "@/server/lib/validation";
import pool from "@/server/config/db";

export const POST = auth(async (req) => {
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

  const userId = req.auth.user.id;
  const body = await req.json().catch(() => null);
  const rawCode =
    body && typeof body === "object"
      ? (body as Record<string, unknown>).election_code
      : undefined;

  const normalizedCode =
    typeof rawCode === "string" ? rawCode.trim().toUpperCase() : "";

  if (!normalizedCode || !ELECTION_CODE_REGEX.test(normalizedCode)) {
    return NextResponse.json(
      {
        error: "Invalid election code format.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const existingUser = await pool.query(
      "SELECT id, is_verified, email FROM users WHERE id = $1",
      [userId],
    );

    if (existingUser.rows.length === 0) {
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
          error: "User is not verified.",
        },
        {
          status: 403,
        },
      );
    }

    const { rows, rowCount } = await pool.query(
      "SELECT id, start_time, end_time, allowed_domain_patterns, election_type, creator_id FROM elections WHERE election_code = $1",
      [normalizedCode],
    );

    if (rowCount === 0) {
      return NextResponse.json(
        {
          error: "Election with this code does not exist.",
        },
        {
          status: 404,
        },
      );
    }

    const election = rows[0];

    if (election.creator_id === userId) {
      return NextResponse.json(
        {
          error: "You are the creator of this election.",
        },
        {
          status: 400,
        },
      );
    }

    const now = new Date();

    if (now > new Date(election.end_time)) {
      return NextResponse.json(
        {
          error: "Election has already ended.",
        },
        {
          status: 400,
        },
      );
    }

    if (now > new Date(election.start_time)) {
      return NextResponse.json(
        {
          error: "Election has already started. You cannot join it now.",
        },
        {
          status: 400,
        },
      );
    }

    // Verify user's email against the election's eligibility regex (both public & private)
    const userEmail = String(existingUser.rows[0].email ?? "")
      .trim()
      .toLowerCase();
    const domainRegex = new RegExp(election.allowed_domain_patterns, "i");

    if (!domainRegex.test(userEmail)) {
      return NextResponse.json(
        {
          error:
            "Your institutional email is not eligible to join this election.",
        },
        {
          status: 403,
        },
      );
    }

    // Prevent duplicate joins
    const existingVoter = await pool.query(
      "SELECT id, status FROM voters WHERE election_id = $1 AND user_id = $2",
      [election.id, userId],
    );

    if (existingVoter.rows.length > 0) {
      const currentStatus = existingVoter.rows[0].status;
      return NextResponse.json(
        {
          error:
            currentStatus === "pending"
              ? "Your request to join this election is already pending approval."
              : currentStatus === "rejected"
                ? "Your request to join this election was rejected."
                : "You have already joined this election.",
        },
        {
          status: 409,
        },
      );
    }

    const voterStatus =
      election.election_type === "public" ? "approved" : "pending";

    const insertedVoter = await pool.query(
      `INSERT INTO voters (election_id, user_id, status)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [election.id, userId, voterStatus],
    );

    return NextResponse.json(
      {
        message:
          voterStatus === "approved"
            ? "Successfully joined election."
            : "Join request submitted and pending admin approval.",
        data: insertedVoter.rows[0],
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      {
        error: "Unable to join the election.",
      },
      {
        status: 500,
      },
    );
  }
});
