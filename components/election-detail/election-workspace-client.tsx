"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  CheckListIcon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  HourglassIcon,
  LockKeyIcon,
  UserAdd01Icon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";
import { AddCandidateModal } from "./add-candidate-modal";
import {
  ElectionSectionKey,
  ElectionWorkspaceShell,
} from "./election-workspace-shell";
import { PositionsPanel } from "./positions-panel";
import { ResultsPanel } from "./results-panel";
import { CandidateItem, ElectionDetailMeta, VoterMember } from "./types";
import { VoterApprovalsPanel } from "./voter-approvals-panel";

const INITIAL_POSITIONS = [
  "President",
  "Vice President",
  "General Secretary",
  "Financial Secretary",
  "Public Relations Officer",
];

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

const INITIAL_VOTERS: VoterMember[] = [
  {
    id: "v-1",
    name: "Adebayo Areo",
    email: "a.areo.csc2021104@oauife.edu.ng",
    status: "pending",
    joinedAt: "2 mins ago",
  },
  {
    id: "v-2",
    name: "Ifeoma Okafor",
    email: "i.okafor.csc2021042@oauife.edu.ng",
    status: "approved",
    joinedAt: "1 hr ago",
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

export function ElectionWorkspaceClient({
  electionId,
}: {
  electionId: string;
}) {
  const [role, setRole] = useState<"admin" | "voter">("admin");
  const [activeSection, setActiveSection] =
    useState<ElectionSectionKey>("overview");
  const [positions, setPositions] = useState<string[]>(INITIAL_POSITIONS);
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const [candidates, setCandidates] =
    useState<CandidateItem[]>(INITIAL_CANDIDATES);
  const [voters, setVoters] = useState<VoterMember[]>(INITIAL_VOTERS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const meta: ElectionDetailMeta = {
    id: electionId,
    code: electionId.length <= 25 ? electionId.toUpperCase() : "OAU-CSC-2026",
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections across engineering programs.",
    status: "Active",
    role,
    visibility: "private",
    domain: "@oauife.edu.ng",
    schedule: "Nov 25 – Nov 28",
  };

  const isAdmin = role === "admin";
  const isUpcoming = meta.status !== "Active";
  const pendingVotersCount = voters.filter((v) => v.status === "pending").length;
  const selectedCandidate =
    candidates.find((c) => c.id === selectedCandidateId) ?? null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(meta.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleAddCandidate = (
    candidateData: Omit<CandidateItem, "id" | "votes">,
  ) => {
    const newCandidate: CandidateItem = {
      id: `cand-${Date.now()}`,
      ...candidateData,
      votes: 0,
    };
    setCandidates((prev) => [newCandidate, ...prev]);
  };

  const handleCastVote = () => {
    if (!selectedCandidateId || hasVoted) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateId ? { ...c, votes: c.votes + 1 } : c,
      ),
    );
    setHasVoted(true);
    gooeyToast.success("Vote recorded", {
      description: "Your ballot has been added to the tally.",
    });
  };

  const handleUpdateVoterStatus = (
    voterId: string,
    status: "approved" | "rejected",
  ) => {
    setVoters((prev) =>
      prev.map((v) => (v.id === voterId ? { ...v, status } : v)),
    );
    gooeyToast.success(`Voter ${status}.`);
  };

  const candidateCountsByPos = candidates.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.position] = (acc[c.position] || 0) + 1;
      return acc;
    },
    {},
  );

  const votesByPosition = candidates.reduce<Record<string, number>>(
    (acc, c) => {
      acc[c.position] = (acc[c.position] || 0) + c.votes;
      return acc;
    },
    {},
  );

  const filteredCandidates =
    selectedPosition === "All"
      ? candidates
      : candidates.filter((c) => c.position === selectedPosition);

  const positionTabs = [
    "All",
    ...Array.from(new Set(candidates.map((c) => c.position))),
  ];

  const headerAction = isAdmin ? (
    <button
      type="button"
      onClick={() => setIsAddModalOpen(true)}
      className="btn btn-primary h-9 px-3.5 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
    >
      <UserAdd01Icon size={14} />
      <span className="hidden sm:inline">Add Candidate</span>
    </button>
  ) : !hasVoted && !isUpcoming ? (
    <button
      type="button"
      onClick={handleCastVote}
      disabled={!selectedCandidateId}
      className="btn btn-primary h-9 px-4 text-xs font-bold disabled:opacity-50 cursor-pointer"
    >
      Cast Vote
    </button>
  ) : undefined;

  return (
    <ElectionWorkspaceShell
      meta={meta}
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      onToggleRole={setRole}
      copiedCode={copiedCode}
      onCopyCode={handleCopyCode}
      pendingVotersCount={pendingVotersCount}
      headerAction={headerAction}
    >
      {activeSection === "overview" && (
        <div className="space-y-8 text-left">
          <div className="bg-card border border-border p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
            <div className="space-y-3 min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-muted-foreground">
                <span className="px-2 py-0.5 border border-border bg-muted/40 text-[10px] font-mono uppercase tracking-wider text-foreground">
                  {meta.visibility} Ballot
                </span>
                <span className="inline-flex items-center gap-1">
                  <LockKeyIcon size={12} className="text-brand" />
                  <span>{meta.domain}</span>
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-foreground leading-tight">
                {meta.title}
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed max-w-2xl">
                {meta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 lg:min-w-[200px]">
              <div className="border border-border bg-muted/20 px-4 py-3 space-y-1">
                <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
                  Voting Window
                </span>
                <span className="block text-xs font-mono font-medium text-foreground">
                  {meta.schedule}
                </span>
              </div>

              {!isAdmin && (
                <button
                  type="button"
                  onClick={() => setActiveSection("candidates")}
                  className="btn btn-primary h-10 px-5 text-xs font-bold cursor-pointer w-full"
                >
                  {hasVoted ? "View Ballot" : "Open Ballot"}
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              type="button"
              onClick={() =>
                setActiveSection(isAdmin ? "positions" : "candidates")
              }
              className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-sans text-muted-foreground">
                  Contested Positions
                </span>
                <CheckListIcon size={17} className="text-brand shrink-0" />
              </div>
              <div className="flex items-end justify-between w-full">
                <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
                  {positions.length}
                </span>
                <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
                  <span>{isAdmin ? "Manage" : "Browse"}</span>
                  <ArrowRight01Icon size={12} />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("candidates")}
              className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-sans text-muted-foreground">
                  Registered Candidates
                </span>
                <UserIcon size={17} className="text-brand shrink-0" />
              </div>
              <div className="flex items-end justify-between w-full">
                <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
                  {candidates.length}
                </span>
                <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
                  <span>View</span>
                  <ArrowRight01Icon size={12} />
                </span>
              </div>
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveSection(isAdmin ? "voters" : "results")
              }
              className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-xs font-sans text-muted-foreground">
                  Joined Voters
                </span>
                <UserGroupIcon size={17} className="text-brand shrink-0" />
              </div>
              <div className="flex items-end justify-between w-full">
                <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
                  {voters.length}
                </span>
                <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
                  <span>{isAdmin ? "Roster" : "Tallies"}</span>
                  <ArrowRight01Icon size={12} />
                </span>
              </div>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="border border-border bg-card">
              <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-muted/20">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  Contested Positions
                </h3>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setActiveSection("positions")}
                    className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
                  >
                    Manage
                  </button>
                )}
              </div>
              <div className="divide-y divide-border/60">
                {positions.slice(0, 4).map((pos) => {
                  const count = candidateCountsByPos[pos] || 0;
                  return (
                    <div
                      key={pos}
                      className="px-5 py-3.5 flex items-center justify-between gap-2 text-xs font-sans"
                    >
                      <span className="font-medium text-foreground truncate">
                        {pos}
                      </span>
                      <span
                        className={`px-2 py-0.5 text-[11px] font-mono border shrink-0 ${
                          count === 0
                            ? "border-amber-500/30 bg-amber-500/10 text-amber-400"
                            : "border-border bg-muted/40 text-muted-foreground"
                        }`}
                      >
                        {count} {count === 1 ? "candidate" : "candidates"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="border border-border bg-card">
              <div className="px-5 py-3.5 border-b border-border flex items-center justify-between bg-muted/20">
                <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
                  {isAdmin ? "Voter Roster" : "Your Ballot"}
                </h3>
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setActiveSection("voters")}
                    className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
                  >
                    View all
                  </button>
                )}
              </div>
              {isAdmin ? (
                <div className="divide-y divide-border/60">
                  {voters.slice(0, 4).map((v) => (
                    <div
                      key={v.id}
                      className="px-5 py-3 flex items-center justify-between gap-3 text-xs font-sans"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-8 h-8 bg-muted border border-border flex items-center justify-center text-[10px] font-heading font-bold text-foreground shrink-0">
                          {getInitials(v.name)}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-foreground font-medium">
                            {v.name}
                          </p>
                          <p className="truncate text-[11px] font-mono text-muted-foreground">
                            {v.email}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span
                          className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider border ${
                            v.status === "approved"
                              ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                              : v.status === "pending"
                                ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                                : "bg-status-rejected/10 text-status-rejected border-status-rejected/30"
                          }`}
                        >
                          {v.status}
                        </span>
                        {v.status === "pending" && (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateVoterStatus(v.id, "approved")
                              }
                              className="p-1 border border-border hover:border-status-confirmed hover:text-status-confirmed text-muted-foreground cursor-pointer"
                              title="Approve"
                            >
                              <CheckmarkCircle02Icon size={13} />
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                handleUpdateVoterStatus(v.id, "rejected")
                              }
                              className="p-1 border border-border hover:border-status-rejected hover:text-status-rejected text-muted-foreground cursor-pointer"
                              title="Reject"
                            >
                              <Cancel01Icon size={13} />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-5 text-xs font-sans text-muted-foreground space-y-3">
                  <p>
                    {hasVoted
                      ? "Your vote has been recorded."
                      : "Select your preferred candidates across active positions."}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveSection("candidates")}
                    className="btn btn-primary h-9 px-4 text-xs font-bold cursor-pointer"
                  >
                    {hasVoted ? "View Candidates" : "Go to Ballot"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSection === "positions" && isAdmin && (
        <PositionsPanel
          positions={positions}
          candidateCounts={candidateCountsByPos}
          onAddPosition={(title) => setPositions((prev) => [...prev, title])}
          onRemovePosition={(title) =>
            setPositions((prev) => prev.filter((p) => p !== title))
          }
        />
      )}

      {activeSection === "candidates" && (
        <div className="space-y-6">
          {isUpcoming && !isAdmin && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-xs font-sans text-amber-300 flex items-center gap-2.5">
              <HourglassIcon size={18} className="shrink-0 text-amber-400" />
              <span>
                Voting has not opened yet. Candidate profiles are listed below
                for review.
              </span>
            </div>
          )}

          {hasVoted && !isAdmin && (
            <div className="p-4 bg-status-confirmed/10 border border-status-confirmed/30 text-xs font-sans text-status-confirmed flex items-center gap-2">
              <CheckmarkCircle02Icon size={16} className="shrink-0" />
              <span>Your vote has been recorded.</span>
            </div>
          )}

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
            {filteredCandidates.map((candidate) => {
              const isSelected = selectedCandidateId === candidate.id;
              const canSelect = !isAdmin && !hasVoted && !isUpcoming;
              const posTotal = votesByPosition[candidate.position] || 0;
              const votePct =
                posTotal > 0
                  ? Math.round((candidate.votes / posTotal) * 100)
                  : 0;

              return (
                <div
                  key={candidate.id}
                  onClick={() => {
                    if (canSelect) setSelectedCandidateId(candidate.id);
                  }}
                  className={`bg-card border relative overflow-hidden flex flex-col justify-between transition-all text-left ${
                    canSelect ? "cursor-pointer" : ""
                  } ${
                    isSelected
                      ? "border-brand ring-1 ring-brand bg-brand/5"
                      : "border-border/80 hover:border-border"
                  }`}
                >
                  <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-11 h-11 border flex items-center justify-center font-heading font-bold text-xs shrink-0 ${
                          isSelected
                            ? "bg-brand/15 border-brand/50 text-brand"
                            : "bg-muted border-border text-foreground"
                        }`}
                      >
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

                      {canSelect && (
                        <span
                          className={`text-xs font-medium ${
                            isSelected ? "text-brand" : "text-muted-foreground"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select"}
                        </span>
                      )}
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

          {!isAdmin && !hasVoted && !isUpcoming && selectedCandidate && (
            <div className="p-4 bg-card border border-brand/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-sans">
              <div>
                <span className="text-muted-foreground">Selected: </span>
                <strong className="text-foreground">
                  {selectedCandidate.name}
                </strong>
                <span className="text-muted-foreground">
                  {" "}
                  ({selectedCandidate.position})
                </span>
              </div>
              <button
                type="button"
                onClick={handleCastVote}
                className="btn btn-primary h-9 px-5 text-xs font-bold cursor-pointer shrink-0"
              >
                Cast Secret Vote
              </button>
            </div>
          )}
        </div>
      )}

      {activeSection === "voters" && isAdmin && (
        <VoterApprovalsPanel
          voters={voters}
          onUpdateStatus={handleUpdateVoterStatus}
        />
      )}

      {activeSection === "results" && (
        <ResultsPanel positions={positions} candidates={candidates} />
      )}

      {activeSection === "settings" && isAdmin && (
        <div className="border border-border bg-card text-xs font-sans text-left">
          <div className="px-5 py-3.5 border-b border-border bg-muted/20">
            <h3 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
              Configuration &amp; Access Rules
            </h3>
          </div>
          <div className="divide-y divide-border/60">
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-muted-foreground">Accession Code</span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-2 font-mono text-foreground hover:text-brand transition-colors cursor-pointer w-fit"
              >
                <span>{meta.code}</span>
                <Copy01Icon size={13} className="text-muted-foreground" />
              </button>
            </div>
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Visibility</span>
              <span className="capitalize text-foreground">
                {meta.visibility}
              </span>
            </div>
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Domain Scope</span>
              <span className="font-mono text-foreground">{meta.domain}</span>
            </div>
            <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-muted-foreground">Schedule</span>
              <span className="text-foreground">{meta.schedule}</span>
            </div>
          </div>
        </div>
      )}

      <AddCandidateModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        positions={positions}
        onAdd={handleAddCandidate}
      />
    </ElectionWorkspaceShell>
  );
}
