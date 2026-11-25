import { useState, useEffect, useCallback } from "react";
import { gooeyToast } from "goey-toast";
import { ElectionCardItem, ElectionStatus } from "./types";

export interface ApiElectionRow {
  id: string;
  admin_fullname: string;
  admin_profile_picture: string | null;
  election_title: string;
  election_description: string;
  election_code: string;
  start_time: string;
  end_time: string;
  election_type: "private" | "public";
  role: "admin" | "voter";
  voter_status: "pending" | "approved" | "rejected" | null;
  voter_joined_at: string | null;
  total_voters: number;
  created_at: string;
}

function getElectionStatus(startTime: string, endTime: string): ElectionStatus {
  const now = Date.now();
  const start = new Date(startTime).getTime();
  const end = new Date(endTime).getTime();

  if (now < start) return "Upcoming";
  if (now > end) return "Concluded";
  return "Active";
}

export function mapApiElectionToCardItem(
  row: ApiElectionRow,
): ElectionCardItem {
  return {
    ...row,
    status: getElectionStatus(row.start_time, row.end_time),
  };
}

export async function fetchElectionsByRole(
  role: "all" | "admin" | "voter",
): Promise<ElectionCardItem[]> {
  const res = await fetch(`/api/election?role=${role}`, {
    method: "GET",
    cache: "no-store",
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch elections.");
  }

  const rows: ApiElectionRow[] = Array.isArray(data.elections)
    ? data.elections
    : [];

  return rows.map(mapApiElectionToCardItem);
}

export function useElections(role: "all" | "admin" | "voter") {
  const [elections, setElections] = useState<ElectionCardItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  const reload = useCallback(() => {
    setIsLoading(true);
    setRefreshKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchElectionsByRole(role)
      .then((items) => {
        if (!cancelled) setElections(items);
      })
      .catch((err) => {
        if (!cancelled) {
          gooeyToast.error(
            err instanceof Error ? err.message : "Failed to load elections.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [role, refreshKey]);

  return { elections, isLoading, reload };
}
