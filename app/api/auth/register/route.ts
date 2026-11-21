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

  return NextResponse.json({
    success: true,
    message: "Registration endpoint initialized.",
    domain,
  });
}
