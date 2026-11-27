import { cacheLife, cacheTag } from "next/cache";
import { UUID_REGEX } from "../lib/validation";

export const getCachedUserElection = async (
  electionId: string,
  userId: string,
) => {
  "use cache";
  if (
    !userId ||
    !electionId ||
    !UUID_REGEX.test(electionId?.trim()) ||
    !UUID_REGEX.test(userId?.trim())
  )
    return null;

  cacheLife("minutes");
  cacheTag(`user-election-${userId}-${electionId}`);
};
