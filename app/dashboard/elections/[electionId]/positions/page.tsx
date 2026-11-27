"use client";

import { useState } from "react";
import { PositionsPanel, useElectionRole } from "@/components/election-detail";

export default function ElectionPositionsPage() {
  const { role } = useElectionRole();
  const [positions, setPositions] = useState<string[]>([
    "President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Public Relations Officer",
  ]);

  if (role !== "admin") {
    return (
      <div className="border border-border bg-card p-8 text-center text-xs font-sans text-muted-foreground">
        Only election administrators can manage positions.
      </div>
    );
  }

  const candidateCounts: Record<string, number> = {
    President: 2,
    "Vice President": 1,
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
          Positions
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
          Configure contested offices for this ballot.
        </p>
      </div>

      <PositionsPanel
        positions={positions}
        candidateCounts={candidateCounts}
        onAddPosition={(title) => setPositions((prev) => [...prev, title])}
        onRemovePosition={(title) =>
          setPositions((prev) => prev.filter((p) => p !== title))
        }
      />
    </div>
  );
}
