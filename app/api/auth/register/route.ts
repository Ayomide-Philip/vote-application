import pool from "@/server/config/db";
import encryptPassword from "@/server/lib/encrypt";
import { NextRequest, NextResponse } from "next/server";

export const emailRegex =
  /^[a-zA-Z0-9_%-]+(?:\.[a-zA-Z0-9_%-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/;

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json().catch(() => ({}));

  const domain = email?.split("@")[1] || "";

  if (!fullname?.trim() || !email?.trim() || !password) {
    return NextResponse.json(
      {
        error: "Full name, email, and password are required.",
      },
      {
        status: 400,
      },
    );
  }

  if (
    fullname?.trim() &&
    (fullname.split(" ").length < 2 ||
      fullname.split(" ").some((name: string) => name.length < 2))
  ) {
    return NextResponse.json(
      {
        error: "Full name must include both first and last name.",
      },
      {
        status: 400,
      },
    );
  }

  if (fullname?.trim()?.length < 5) {
    return NextResponse.json(
      {
        error: "Full name must be at least 5 characters long.",
      },
      {
        status: 400,
      },
    );
  }

  if (!emailRegex.test(email?.trim())) {
    return NextResponse.json(
      {
        error: "Invalid email address",
      },
      {
        status: 400,
      },
    );
  }

  if (password?.trim() && password.trim().length < 8) {
    return NextResponse.json(
      {
        error: "Password must be at least 8 characters long.",
      },
      {
        status: 400,
      },
    );
  }

  try {
    const existingUser = await pool.query(
      "SELECT id FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return NextResponse.json(
        {
          error: "Email already exists.",
        },
        {
          status: 400,
        },
      );
    }

    const newUser = await pool.query(
      "INSERT INTO users (fullname, email, password,domain) VALUES ($1, $2,$3,$4) RETURNING id",
      [
        fullname?.trim(),
        email?.trim(),
        await encryptPassword(password?.trim()),
        domain,
      ],
    );

    return NextResponse.json({
      success: true,
      message: "Sucessfully created an account",
      id: newUser.rows[0].id,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      {
        error: "An error occurred while creating an account",
      },
      {
        status: 500,
      },
    );
  }
}
