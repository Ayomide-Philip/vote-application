import { auth } from "@/auth";
import { NextResponse } from "next/server";
import {
  compilePartsToRegex,
  EmailPartRule,
  EmailPartType,
} from "@/components/create-election";
import pool from "@/server/config/db";
import { ELECTION_CODE_REGEX } from "@/server/lib/validation";

const VALID_PART_TYPES = new Set<EmailPartType>([
  "wildcard",
  "exact",
  "options",
  "digits",
]);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidEmailParts(parts: unknown): parts is EmailPartRule[] {
  if (!Array.isArray(parts) || parts.length === 0 || parts.length > 20) {
    return false;
  }

  const hasDomainPart = parts.some(
    (p) =>
      p &&
      typeof p === "object" &&
      (p as EmailPartRule).delimiter === "@" &&
      (p as EmailPartRule).type === "exact",
  );
  if (!hasDomainPart) return false;

  return parts.every((p) => {
    if (!p || typeof p !== "object") return false;
    const part = p as EmailPartRule;
    if (
      typeof part.originalText !== "string" ||
      !part.originalText.trim() ||
      part.originalText.length > 100
    ) {
      return false;
    }
    if (!VALID_PART_TYPES.has(part.type)) return false;
    if (typeof part.delimiter !== "string" || part.delimiter.length > 1) {
      return false;
    }
    if (typeof part.isOptional !== "boolean") return false;
    if (part.digitsMode !== "any" && part.digitsMode !== "prefix") {
      return false;
    }
    if (
      part.digitLength !== undefined &&
      part.digitLength !== null &&
      (typeof part.digitLength !== "number" ||
        !Number.isInteger(part.digitLength) ||
        part.digitLength < 1 ||
        part.digitLength > 20)
    ) {
      return false;
    }
    if (
      !Array.isArray(part.options) ||
      part.options.length > 50 ||
      !part.options.every((o) => typeof o === "string" && o.length <= 50)
    ) {
      return false;
    }
    if (
      !Array.isArray(part.digitPrefixes) ||
      part.digitPrefixes.length > 30 ||
      !part.digitPrefixes.every((d) => typeof d === "string" && d.length <= 15)
    ) {
      return false;
    }
    return true;
  });
}

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

  const body = await req.json().catch(() => null);

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      {
        error: "Invalid request payload",
      },
      {
        status: 400,
      },
    );
  }

  const userId = req.auth.user.id;

  const {
    title,
    description,
    election_code,
    email_parts,
    domain_label,
    start_time,
    end_time,
    election_type,
    sample_email,
  } = body as Record<string, unknown>;

  if (
    typeof title !== "string" ||
    typeof description !== "string" ||
    typeof election_code !== "string" ||
    typeof domain_label !== "string" ||
    typeof start_time !== "string" ||
    typeof end_time !== "string" ||
    typeof election_type !== "string" ||
    typeof sample_email !== "string"
  ) {
    return NextResponse.json(
      { error: "All fields are required and must be valid text" },
      { status: 400 },
    );
  }

  const trimmedTitle = title.trim();
  const trimmedDesc = description.trim();
  const trimmedCode = election_code.trim().toUpperCase();
  const trimmedLabel = domain_label.trim();
  const trimmedSample = sample_email.trim().toLowerCase();
  const trimmedType = election_type.trim().toLowerCase();

  if (
    !trimmedTitle ||
    !trimmedDesc ||
    !trimmedCode ||
    !trimmedLabel ||
    !start_time.trim() ||
    !end_time.trim() ||
    !trimmedType ||
    !trimmedSample
  ) {
    return NextResponse.json(
      {
        error: "All fields are required",
      },
      {
        status: 400,
      },
    );
  }

  if (trimmedTitle.length < 5 || trimmedTitle.length > 255) {
    return NextResponse.json(
      {
        error: "Title should be 5 to 255 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (trimmedDesc.length < 10 || trimmedDesc.length > 1000) {
    return NextResponse.json(
      {
        error: "Description should be between 10 to 1000 characters long",
      },
      {
        status: 400,
      },
    );
  }

  if (
    trimmedCode.length < 5 ||
    trimmedCode.length > 30 ||
    !ELECTION_CODE_REGEX.test(trimmedCode)
  ) {
    return NextResponse.json(
      {
        error:
          "Accession code must follow <INSTITUTION>-<DEPARTMENT>-<NUMBER> (3-5 letters, 3-5 letters, 1-10 digits)",
      },
      { status: 400 },
    );
  }

  if (trimmedLabel.length > 100) {
    return NextResponse.json(
      {
        error: "Domain label must be 100 characters or fewer",
      },
      {
        status: 400,
      },
    );
  }

  if (trimmedType !== "private" && trimmedType !== "public") {
    return NextResponse.json(
      {
        error: "Election visibility must be either 'private' or 'public'",
      },
      {
        status: 400,
      },
    );
  }

  if (trimmedSample.length > 255 || !EMAIL_REGEX.test(trimmedSample)) {
    return NextResponse.json(
      {
        error: "Please provide a valid sample email address",
      },
      {
        status: 400,
      },
    );
  }

  const startDate = new Date(start_time);
  const endDate = new Date(end_time);
  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return NextResponse.json(
      {
        error: "Start time and end time must be valid dates",
      },
      {
        status: 400,
      },
    );
  }

  if (endDate.getTime() <= startDate.getTime()) {
    return NextResponse.json(
      {
        error: "End time must be after the start time",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidEmailParts(email_parts)) {
    return NextResponse.json(
      {
        error: "Invalid eligibility rule configuration",
      },
      {
        status: 400,
      },
    );
  }

  const allowed_domain_patterns = compilePartsToRegex(email_parts);
  try {
    new RegExp(allowed_domain_patterns, "i");
  } catch {
    return NextResponse.json(
      { error: "Failed to compile a valid eligibility pattern" },
      { status: 400 },
    );
  }

  try {
    const userExist = await pool.query(
      "SELECT id, is_verified FROM users WHERE id = $1",
      [userId],
    );

    if (userExist?.rowCount === 0) {
      return NextResponse.json(
        {
          error: "Unauthorized Access: User does not exist",
        },
        {
          status: 401,
        },
      );
    }

    if (!userExist?.rows[0]?.is_verified) {
      return NextResponse.json(
        {
          error: "Email is not verified",
        },
        {
          status: 401,
        },
      );
    }

    const existingElection = await pool.query(
      "SELECT id FROM elections WHERE election_code = $1",
      [trimmedCode],
    );

    if (existingElection?.rows.length > 0) {
      return NextResponse.json(
        {
          error: "An election with this code already exist",
        },
        {
          status: 400,
        },
      );
    }

    const newElection = await pool.query(
      "INSERT INTO elections (creator_id, title,description, election_code, allowed_domain_patterns, domain_label, start_time, end_time, election_type ,sample_email) VALUES($1, $2,$3,$4,$5,$6,$7,$8,$9,$10) RETURNING id",
      [
        userId,
        trimmedTitle,
        trimmedDesc,
        trimmedCode,
        allowed_domain_patterns,
        trimmedLabel,
        start_time,
        end_time,
        trimmedType,
        trimmedSample,
      ],
    );

    return NextResponse.json(
      {
        message: "Successfully created new election",
        data: {
          election_id: newElection.rows[0].id,
        },
      },
      {
        status: 201,
      },
    );
  } catch (err) {
    console.error("Error creating election:", err);
    return NextResponse.json(
      {
        error: "Failed to create election",
      },
      {
        status: 500,
      },
    );
  }
});
