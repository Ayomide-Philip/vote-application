"use client";

import { useState } from "react";
import { PositionsPanel } from "@/components/election-detail";

export default function ElectionPositionsPage() {
  const [positions, setPositions] = useState<string[]>([
    "President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Public Relations Officer",
  ]);

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
