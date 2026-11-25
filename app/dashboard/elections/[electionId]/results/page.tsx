"use client";

import { CandidateItem, ResultsPanel } from "@/components/election-detail";

const CANDIDATES: CandidateItem[] = [
  {
    id: "cand-1",
    name: "Toluwani Adeleke",
    position: "President",
    department: "Computer Science & Engineering",
    manifesto: "Transparent departmental budgeting and digital lab expansion.",
    votes: 412,
  },
  {
    id: "cand-2",
    name: "Chukwudi Nnamdi",
    position: "President",
    department: "Mechanical Engineering",
    manifesto: "Industry internship partnerships and student welfare advocacy.",
    votes: 388,
  },
  {
    id: "cand-3",
    name: "Zainab Balogun",
    position: "Vice President",
    department: "Chemical Engineering",
    manifesto: "Academic mentorship networks and faculty symposiums.",
    votes: 520,
  },
];

export default function ElectionResultsPage() {
  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
          Results &amp; Tallies
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
          Live vote counts by contested position.
        </p>
      </div>

      <ResultsPanel
        positions={["President", "Vice President"]}
        candidates={CANDIDATES}
      />
    </div>
  );
}
