import { cacheLife, cacheTag } from "next/cache";
import { UUID_REGEX } from "../lib/validation";
import pool from "../config/db";
import { GET_ELECTION_BY_ID_QUERY } from "../query/election";
import { CachedUserElection } from "../types/election.types";

export const getCachedUserElection = async (
  electionId: string,
  userId: string,
): Promise<CachedUserElection | null> => {
  "use cache";
  if (
    !userId ||
    !electionId ||
    !UUID_REGEX.test(electionId?.trim()) ||
    !UUID_REGEX.test(userId?.trim())
  )
    return null;

  cacheLife({
    stale: 60 * 20, // 20 minutes
    revalidate: 60 * 20, // 20 minutes
    expire: 60 * 60, // 1 hour
  });

  cacheTag(`user-election-${userId?.trim()}-${electionId?.trim()}`);

  const { rows, rowCount } = await pool.query(GET_ELECTION_BY_ID_QUERY, [
    electionId?.trim(),
    userId?.trim(),
  ]);

  if (rowCount === 0) return null;

  const election = rows[0];

  return {
    ...election,
    start_time: new Date(election.start_time).toISOString(),
    end_time: new Date(election.end_time).toISOString(),
    created_at: new Date(election.created_at).toISOString(),
  };
};
