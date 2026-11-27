"use client";

import { useState } from "react";
import { UserAdd01Icon } from "hugeicons-react";
import {
  AddCandidateModal,
  CandidateItem,
  useElectionRole,
} from "@/components/election-detail";

const INITIAL_CANDIDATES: CandidateItem[] = [
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

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function ElectionCandidatesPage() {
  const { role } = useElectionRole();
  const [candidates, setCandidates] =
    useState<CandidateItem[]>(INITIAL_CANDIDATES);
  const [selectedPosition, setSelectedPosition] = useState("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (role !== "admin") {
    return (
      <div className="border border-border bg-card p-8 text-center text-xs font-sans text-muted-foreground">
        Only election administrators can manage candidates.
      </div>
    );
  }

  const positions = [
    "President",
    "Vice President",
    "General Secretary",
    "Financial Secretary",
    "Public Relations Officer",
  ];

  const positionTabs = [
    "All",
    ...Array.from(new Set(candidates.map((c) => c.position))),
  ];

  const filtered =
    selectedPosition === "All"
      ? candidates
      : candidates.filter((c) => c.position === selectedPosition);

  const votesByPosition = candidates.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.position] = (acc[c.position] || 0) + c.votes;
      return acc;
    },
    {},
  );

  const handleAddCandidate = (
    data: Omit<CandidateItem, "id" | "votes">,
  ) => {
    setCandidates((prev) => [
      { id: `cand-${Date.now()}`, ...data, votes: 0 },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-border">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            Candidates
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Registered contestants across positions.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="btn btn-primary h-10 px-4 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <UserAdd01Icon size={16} />
          <span>Add Candidate</span>
        </button>
      </div>

      <div className="flex justify-end">
        <div className="flex flex-wrap items-center gap-1 border border-border bg-muted/40 p-1 w-fit text-xs font-sans">
          {positionTabs.map((pos) => (
            <button
              key={pos}
              type="button"
              onClick={() => setSelectedPosition(pos)}
              className={`px-3 py-1.5 transition-colors cursor-pointer ${
                selectedPosition === pos
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {pos}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((candidate) => {
          const posTotal = votesByPosition[candidate.position] || 0;
          const votePct =
            posTotal > 0 ? Math.round((candidate.votes / posTotal) * 100) : 0;

          return (
            <div
              key={candidate.id}
              className="bg-card border border-border/80 hover:border-border overflow-hidden flex flex-col justify-between transition-all text-left"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 border bg-muted border-border text-foreground flex items-center justify-center font-heading font-bold text-xs shrink-0">
                    {getInitials(candidate.name)}
                  </div>

                  <span className="px-2.5 py-0.5 bg-muted/60 border border-border text-[10px] font-sans font-semibold uppercase tracking-wider text-foreground">
                    {candidate.position}
                  </span>
                </div>

                <div>
                  <h3 className="text-base sm:text-lg font-heading font-semibold text-foreground">
                    {candidate.name}
                  </h3>
                  <p className="text-xs text-muted-foreground font-sans mt-0.5">
                    {candidate.department}
                  </p>
                </div>

                <p className="text-xs text-muted-foreground font-sans line-clamp-3 leading-relaxed">
                  &ldquo;{candidate.manifesto}&rdquo;
                </p>
              </div>

              <div>
                <div className="px-6 py-3.5 border-t border-border/60 flex items-center justify-between text-xs font-sans bg-muted/10">
                  <span className="text-muted-foreground font-mono text-[11px]">
                    <strong className="text-foreground font-semibold">
                      {candidate.votes.toLocaleString()}
                    </strong>{" "}
                    votes ({votePct}%)
                  </span>
                </div>
                <div className="h-0.5 bg-muted w-full">
                  <div
                    className="h-full bg-brand/70 transition-all"
                    style={{ width: `${votePct}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        positions={positions}
        onAdd={handleAddCandidate}
      />
    </div>
  );
}
