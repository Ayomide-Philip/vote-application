"use client";

import { useState, use } from "react";
import Link from "next/link";
import {
  Add01Icon,
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  HourglassIcon,
  LockKeyIcon,
  SecurityCheckIcon,
  Shield01Icon,
  UserAdd01Icon,
  UserIcon,
} from "hugeicons-react";

interface Candidate {
  id: string;
  name: string;
  position: string;
  department: string;
  manifesto: string;
  votes: number;
}

const DEFAULT_CANDIDATES: Record<string, Candidate[]> = {
  default: [
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
  ],
};

const ELECTIONS_META: Record<
  string,
  {
    title: string;
    description: string;
    status: "Active" | "Upcoming" | "Concluded";
    defaultRole: "admin" | "voter";
    domain: string;
  }
> = {
  "elec-1": {
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections across engineering programs.",
    status: "Active",
    defaultRole: "admin",
    domain: "@oauife.edu.ng",
  },
  "OAU-TECH-26": {
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections across engineering programs.",
    status: "Active",
    defaultRole: "admin",
    domain: "@oauife.edu.ng",
  },
  "elec-2": {
    title: "Student Union Government Presidential Ballot",
    description:
      "General campus election for the 2026/2027 academic session executive body.",
    status: "Active",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
  "OAU-SUG-26": {
    title: "Student Union Government Presidential Ballot",
    description:
      "General campus election for the 2026/2027 academic session executive body.",
    status: "Active",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
  "elec-3": {
    title: "Faculty of Science Dean & Advisory Board Ballot",
    description:
      "Academic advisory representatives and departmental student delegates.",
    status: "Upcoming",
    defaultRole: "admin",
    domain: "@oauife.edu.ng",
  },
  "SCI-DEAN-26": {
    title: "Faculty of Science Dean & Advisory Board Ballot",
    description:
      "Academic advisory representatives and departmental student delegates.",
    status: "Upcoming",
    defaultRole: "admin",
    domain: "@oauife.edu.ng",
  },
  "elec-4": {
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels.",
    status: "Upcoming",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
  "NACOS-2026": {
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels.",
    status: "Upcoming",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
  "elec-5": {
    title: "Postgraduate Hall of Residence Executive Representative",
    description:
      "Hall committee representative and floor delegate voting for postgraduate residents.",
    status: "Concluded",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
  "PG-HALL-26": {
    title: "Postgraduate Hall of Residence Executive Representative",
    description:
      "Hall committee representative and floor delegate voting for postgraduate residents.",
    status: "Concluded",
    defaultRole: "voter",
    domain: "@oauife.edu.ng",
  },
};

interface ElectionPageProps {
  params: Promise<{
    electionId: string;
  }>;
}

export default function DashboardElectionDetailPage({
  params,
}: ElectionPageProps) {
  const resolvedParams = use(params);
  const electionId = decodeURIComponent(resolvedParams.electionId);

  const meta = ELECTIONS_META[electionId] || {
    title: `Election Ballot #${electionId}`,
    description:
      "Institutional ballot with verified voter eligibility and tamper-evident audit records.",
    status: "Active" as const,
    defaultRole: "admin" as const,
    domain: "@oauife.edu.ng",
  };

  const [userRole, setUserRole] = useState<"admin" | "voter">(
    meta.defaultRole,
  );
  const [candidates, setCandidates] = useState<Candidate[]>(
    DEFAULT_CANDIDATES.default,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidatePosition, setCandidatePosition] = useState("President");
  const [candidateDept, setCandidateDept] = useState("");
  const [candidateManifesto, setCandidateManifesto] = useState("");
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(
    null,
  );
  const [hasVoted, setHasVoted] = useState(false);
  const [voteReceipt, setVoteReceipt] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const isAdmin = userRole === "admin";
  const isUpcoming = meta.status === "Upcoming";
  const isConcluded = meta.status === "Concluded";

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName.trim() || !candidateDept.trim()) {
      setFormError("Please provide candidate name and department.");
      return;
    }

    const newCandidate: Candidate = {
      id: `cand-${Date.now()}`,
      name: candidateName.trim(),
      position: candidatePosition,
      department: candidateDept.trim(),
      manifesto:
        candidateManifesto.trim() ||
        "Committed to institutional excellence and transparent representation.",
      votes: 0,
    };

    setCandidates((prev) => [newCandidate, ...prev]);
    setCandidateName("");
    setCandidateDept("");
    setCandidateManifesto("");
    setFormError(null);
    setIsAddModalOpen(false);
  };

  const handleCastVote = () => {
    if (!selectedCandidateId || hasVoted) return;
    setCandidates((prev) =>
      prev.map((c) =>
        c.id === selectedCandidateId ? { ...c, votes: c.votes + 1 } : c,
      ),
    );
    setHasVoted(true);
    setVoteReceipt(
      `REC-${Math.random().toString(36).substring(2, 9).toUpperCase()}-${Date.now().toString().slice(-4)}`,
    );
  };

  return (
    <div className="space-y-6 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-xs font-heading uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          <ArrowLeft01Icon size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-border bg-muted/40 p-0.5 text-xs font-sans">
            <span className="px-2 text-[11px] text-muted-foreground font-medium">
              View as:
            </span>
            <button
              type="button"
              onClick={() => setUserRole("admin")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                isAdmin
                  ? "bg-card text-brand font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Organizer (Admin)
            </button>
            <button
              type="button"
              onClick={() => setUserRole("voter")}
              className={`px-2.5 py-1 transition-colors cursor-pointer ${
                !isAdmin
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Voter
            </button>
          </div>

          <span className="font-mono text-xs text-muted-foreground px-2 py-0.5 bg-muted border border-border">
            {electionId}
          </span>
        </div>
      </div>

      <div className="bg-card border border-border/80 p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-2xs">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`px-2.5 py-0.5 border text-xs font-sans font-medium flex items-center gap-1.5 ${
                meta.status === "Active"
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : meta.status === "Upcoming"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  meta.status === "Active"
                    ? "bg-status-confirmed animate-pulse"
                    : meta.status === "Upcoming"
                      ? "bg-amber-400"
                      : "bg-muted-foreground"
                }`}
              />
              {meta.status} Ballot
            </span>

            <span
              className={`px-2 py-0.5 text-xs font-sans font-semibold uppercase tracking-wider border ${
                isAdmin
                  ? "bg-brand/10 text-brand border-brand/30"
                  : "bg-muted text-muted-foreground border-border"
              }`}
            >
              {isAdmin ? "Admin / Organizer View" : "Voter View"}
            </span>

            <span className="inline-flex items-center gap-1 text-xs font-sans text-muted-foreground">
              <LockKeyIcon size={12} className="text-brand" />
              Gated to {meta.domain}
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            {meta.title}
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground font-sans max-w-2xl leading-relaxed">
            {meta.description}
          </p>
        </div>

        {isAdmin ? (
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <UserAdd01Icon size={16} />
            <span>Add Candidate</span>
          </button>
        ) : (
          <div className="p-3 bg-muted/40 border border-border text-xs font-sans shrink-0 max-w-xs space-y-1">
            <div className="flex items-center gap-1.5 text-foreground font-medium">
              <SecurityCheckIcon size={14} className="text-brand" />
              <span>Verified Voter</span>
            </div>
            <p className="text-[11px] text-muted-foreground leading-tight">
              One secret ballot per institutional account. Auditable upon casting.
            </p>
          </div>
        )}
      </div>

      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border border-border bg-muted/20 p-4">
          <div className="space-y-1">
            <span className="block text-xs font-sans text-muted-foreground">
              Contest Candidates
            </span>
            <span className="text-xl font-heading font-semibold text-foreground">
              {candidates.length} Registered
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-xs font-sans text-muted-foreground">
              Total Ballots Cast
            </span>
            <span className="text-xl font-heading font-semibold text-foreground">
              {candidates.reduce((sum, c) => sum + c.votes, 0).toLocaleString()}
            </span>
          </div>
          <div className="space-y-1">
            <span className="block text-xs font-sans text-muted-foreground">
              Audit Status
            </span>
            <span className="text-sm font-sans font-medium text-status-confirmed flex items-center gap-1.5 mt-1">
              <Shield01Icon size={14} />
              Merkle Tree Certified
            </span>
          </div>
        </div>
      )}

      {isUpcoming && !isAdmin && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/30 text-xs font-sans text-amber-300 flex items-center gap-2.5">
          <HourglassIcon size={18} className="shrink-0 text-amber-400" />
          <span>
            This election has not started yet. Candidate profiles are listed below for your review. Voting will open when the official session starts.
          </span>
        </div>
      )}

      {hasVoted && (
        <div className="p-4 bg-status-confirmed/10 border border-status-confirmed/30 text-xs font-sans text-status-confirmed space-y-1.5">
          <div className="flex items-center gap-2 font-medium">
            <CheckmarkCircle02Icon size={16} className="shrink-0" />
            <span>Your secret ballot has been cast and added to the certified tally.</span>
          </div>
          {voteReceipt && (
            <div className="text-[11px] text-foreground font-mono pl-6">
              Receipt Audit Hash: {voteReceipt}
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b-2 border-border">
          <h2 className="text-lg font-heading font-medium text-foreground">
            {isAdmin
              ? `Registered Candidates (${candidates.length})`
              : `Select Candidate to Vote (${candidates.length})`}
          </h2>

          {!isAdmin && !hasVoted && !isUpcoming && !isConcluded && (
            <button
              type="button"
              onClick={handleCastVote}
              disabled={!selectedCandidateId}
              className="btn btn-primary h-9 px-4 text-xs font-bold disabled:opacity-50 cursor-pointer"
            >
              Cast Secret Vote
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {candidates.map((candidate) => {
            const isSelected = selectedCandidateId === candidate.id;

            return (
              <div
                key={candidate.id}
                onClick={() => {
                  if (!isAdmin && !hasVoted && !isUpcoming && !isConcluded) {
                    setSelectedCandidateId(candidate.id);
                  }
                }}
                className={`bg-card border p-5 flex flex-col justify-between transition-all ${
                  !isAdmin && !hasVoted && !isUpcoming && !isConcluded
                    ? "cursor-pointer"
                    : ""
                } ${
                  isSelected
                    ? "border-brand ring-1 ring-brand bg-brand/5"
                    : "border-border/80 hover:border-border"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="w-10 h-10 bg-muted border border-border flex items-center justify-center text-foreground font-heading font-bold text-sm shrink-0">
                      <UserIcon size={18} />
                    </div>

                    <span className="px-2 py-0.5 bg-muted border border-border text-[11px] font-sans font-medium text-foreground">
                      {candidate.position}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-heading font-medium text-foreground">
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

                <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between text-xs font-sans">
                  <span className="text-muted-foreground">
                    Tally: <strong className="text-foreground">{candidate.votes}</strong>
                  </span>

                  {!isAdmin && !hasVoted && !isUpcoming && !isConcluded && (
                    <span
                      className={`text-xs font-sans font-medium ${
                        isSelected ? "text-brand" : "text-muted-foreground"
                      }`}
                    >
                      {isSelected ? "Selected" : "Click to select"}
                    </span>
                  )}

                  {isAdmin && (
                    <span className="text-[11px] font-sans text-brand font-medium">
                      Admin Verified
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsAddModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <Cancel01Icon size={18} />
            </button>

            <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
              <div className="w-9 h-9 bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mb-3">
                <Add01Icon size={18} />
              </div>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
                Add Candidate to Contest
              </h2>
              <p className="text-muted-foreground text-xs font-sans mt-1">
                Register a qualified contestant for this institutional election ballot.
              </p>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-status-rejected/10 border border-status-rejected/30 text-xs font-sans text-status-rejected">
                {formError}
              </div>
            )}

            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={candidateName}
                  onChange={(e) => setCandidateName(e.target.value)}
                  placeholder="e.g. Olamide Bakare"
                  required
                  className="text-input h-11 w-full text-xs font-sans"
                  autoFocus
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Contested Position
                </label>
                <select
                  value={candidatePosition}
                  onChange={(e) => setCandidatePosition(e.target.value)}
                  className="text-input h-11 w-full text-xs font-sans bg-card cursor-pointer"
                >
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="General Secretary">General Secretary</option>
                  <option value="Financial Secretary">Financial Secretary</option>
                  <option value="Public Relations Officer">Public Relations Officer</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Academic Department
                </label>
                <input
                  type="text"
                  value={candidateDept}
                  onChange={(e) => setCandidateDept(e.target.value)}
                  placeholder="e.g. Civil Engineering"
                  required
                  className="text-input h-11 w-full text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Campaign Manifesto
                </label>
                <textarea
                  value={candidateManifesto}
                  onChange={(e) => setCandidateManifesto(e.target.value)}
                  placeholder="Key campaign promises or agenda..."
                  rows={3}
                  className="text-input w-full p-2.5 text-xs font-sans resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-secondary h-10 px-4 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary h-10 px-5 text-xs font-bold flex items-center gap-2 cursor-pointer"
                >
                  <span>Register Candidate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
