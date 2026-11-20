import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json().catch(() => ({}));

  if (!fullname || !email || !password) {
    return NextResponse.json(
      { error: "Full name, email, and password are required." },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    message: "Registration endpoint initialized.",
  });
}
