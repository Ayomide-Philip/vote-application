import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { fullname, email, password } = await req.json().catch(() => ({}));
}
