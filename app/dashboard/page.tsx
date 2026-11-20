"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Copy01Icon,
  EyeIcon,
  Key01Icon,
  PlusSignIcon,
  Share01Icon,
  Shield01Icon,
  Ticket01Icon,
  Time02Icon,
} from "hugeicons-react";

interface CreatedElection {
  id: string;
  code: string;
  title: string;
  status: "LIVE" | "UPCOMING" | "CONCLUDED";
  allowedDomain: string;
  timeRemaining: string;
  turnoutVotes: number;
  totalEligible: number;
  contestsCount: number;
}

interface VotingRecord {
  id: string;
  electionTitle: string;
  electionCode: string;
  votedAt: string;
  receiptHash: string;
  merkleRoot: string;
  status: "CONCLUDED" | "LIVE_SEALED";
}

const MOCK_CREATED_ELECTIONS: CreatedElection[] = [
  {
    id: "elec-1",
    code: "OAU-TECH-26",
    title: "Faculty of Technology Executive Council Election 2026",
    status: "LIVE",
    allowedDomain: "@oauife.edu.ng",
    timeRemaining: "Closes in 4h 32m",
    turnoutVotes: 742,
    totalEligible: 950,
    contestsCount: 4,
  },
  {
    id: "elec-2",
    code: "NACOS-OAU-26",
    title:
      "National Association of Computing Students (NACOS) Presidential Poll",
    status: "UPCOMING",
    allowedDomain: "@oauife.edu.ng",
    timeRemaining: "Starts tomorrow at 08:00 UTC",
    turnoutVotes: 0,
    totalEligible: 420,
    contestsCount: 2,
  },
];

const MOCK_VOTING_HISTORY: VotingRecord[] = [
  {
    id: "rec-1",
    electionTitle: "Student Union Government General Presidential Ballot",
    electionCode: "OAU-SUG-26",
    votedAt: "2026-11-20 14:22:08 UTC",
    receiptHash: "0x7f4e91ba0482cf19028a38c019d5b",
    merkleRoot: "0x892a01ce9411ff2308bb",
    status: "LIVE_SEALED",
  },
  {
    id: "rec-2",
    electionTitle: "Postgraduate Hall of Residence Executive Representative",
    electionCode: "PG-HALL-25",
    votedAt: "2026-11-12 09:15:33 UTC",
    receiptHash: "0x3a19c8d55198ef01bc8900fa27b4",
    merkleRoot: "0x1174cd998b22fa40590a",
    status: "CONCLUDED",
  },
];

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"created" | "history">("created");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [joinCodeInput, setJoinCodeInput] = useState("");
  const [joinError, setJoinError] = useState<string | null>(null);
  const [selectedReceipt, setSelectedReceipt] = useState<VotingRecord | null>(
    null,
  );

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleJoinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formatted = joinCodeInput.trim().toUpperCase();
    if (!formatted) {
      setJoinError("Please enter an election code.");
      return;
    }
    setJoinError(null);
    router.push("/#how-it-works");
  };

  return (
    <div className="space-y-8">
      {/* 1. Header Overview & Primary Actions */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b-2 border-border">
        <div>
          <h1 className="text-3xl sm:text-4xl font-medium font-heading tracking-tight text-foreground">
            Institutional Dashboard
          </h1>
          <p className="text-muted-foreground text-sm mt-1.5 max-w-xl leading-relaxed">
            Monitor your created elections, track real-time voter turnout, or
            review your cryptographically certified voting receipts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => {
              const el = document.getElementById("quick-join-card");
              el?.scrollIntoView({ behavior: "smooth" });
              document.getElementById("join-input")?.focus();
            }}
            className="btn btn-secondary h-11 px-4 text-xs font-bold tracking-wider flex items-center gap-2"
          >
            <Ticket01Icon size={16} />
            <span>Join by Code</span>
          </button>

          <Link
            href="/#how-it-works"
            className="btn btn-primary h-11 px-4 text-xs font-bold tracking-wider flex items-center gap-2"
          >
            <PlusSignIcon size={16} />
            <span>Create Election</span>
          </Link>
        </div>
      </div>

      {/* 2. KPI Summary Ledger Strip (Contiguous 4-Column Grid) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 border-2 border-border bg-card divide-y lg:divide-y-0 divide-x-0 sm:divide-x divide-border">
        {/* Cell 1: Managed Elections */}
        <div className="p-5 text-left">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
            Created Elections
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
              {MOCK_CREATED_ELECTIONS.length}
            </span>
            <span className="text-[11px] font-mono text-status-confirmed font-semibold">
              1 Active Live
            </span>
          </div>
        </div>

        {/* Cell 2: Average Turnout */}
        <div className="p-5 text-left">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
            Average Turnout
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
              78.1%
            </span>
            <span className="text-[11px] font-mono text-muted-foreground">
              742 of 950 votes
            </span>
          </div>
        </div>

        {/* Cell 3: Total Ballots Audited */}
        <div className="p-5 text-left">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
            Audited Ballots Cast
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
              1,428
            </span>
            <span className="text-[11px] font-mono text-brand font-medium">
              100% Verified
            </span>
          </div>
        </div>

        {/* Cell 4: Personal Participation */}
        <div className="p-5 text-left">
          <span className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground mb-1">
            Your Ballots Cast
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-heading font-medium text-foreground">
              {MOCK_VOTING_HISTORY.length}
            </span>
            <span className="text-[11px] font-mono text-status-confirmed flex items-center gap-1">
              <CheckmarkCircle02Icon size={12} />
              All Receipts Sealed
            </span>
          </div>
        </div>
      </div>

      {/* 3. Quick-Join Card */}
      <div
        id="quick-join-card"
        className="p-6 bg-card border-2 border-border flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="text-left max-w-lg">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand mb-1">
            <Key01Icon size={14} />
            <span>Instant Eligibility Check</span>
          </div>
          <h2 className="text-lg sm:text-xl font-medium font-heading text-foreground">
            Have an election code?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Enter your 6-12 character institutional election code to verify your
            campus email domain and open your ballot slip.
          </p>
        </div>

        <form
          onSubmit={handleJoinSubmit}
          className="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
        >
          <div className="relative">
            <input
              id="join-input"
              type="text"
              value={joinCodeInput}
              onChange={(e) => {
                setJoinCodeInput(e.target.value.toUpperCase());
                if (joinError) setJoinError(null);
              }}
              placeholder="e.g. OAU-TECH-26"
              className="text-input h-11 w-full sm:w-56 font-mono text-xs uppercase !pl-10 !pr-4"
              maxLength={16}
            />
            <Ticket01Icon
              size={16}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary h-11 px-5 text-xs font-bold tracking-wider shrink-0"
          >
            <span>Verify &amp; Join</span>
            <ArrowRight01Icon size={14} className="btn-arrow-icon" />
          </button>
        </form>
      </div>
      {joinError && (
        <div className="p-3 bg-status-rejected/10 border border-status-rejected/30 text-xs font-mono text-status-rejected">
          {joinError}
        </div>
      )}

      {/* 4. Tabbed Ledger System */}
      <div className="space-y-6">
        {/* Symmetrical Ledger Tab Switcher */}
        <div className="flex items-center border-b-2 border-border gap-2 text-left">
          <button
            onClick={() => setActiveTab("created")}
            className={`pb-3 px-4 text-xs font-heading font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "created"
                ? "text-foreground border-b-2 border-brand -mb-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Created Elections ({MOCK_CREATED_ELECTIONS.length})
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`pb-3 px-4 text-xs font-heading font-bold uppercase tracking-wider transition-colors relative ${
              activeTab === "history"
                ? "text-foreground border-b-2 border-brand -mb-0.5"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            My Voting History &amp; Receipts ({MOCK_VOTING_HISTORY.length})
          </button>
        </div>

        {/* Tab 1: Created Elections Ledger */}
        {activeTab === "created" && (
          <div className="space-y-4">
            {MOCK_CREATED_ELECTIONS.map((election) => {
              const turnoutPct = Math.round(
                (election.turnoutVotes / election.totalEligible) * 100,
              );

              return (
                <div
                  key={election.id}
                  className="bg-card border-2 border-border p-6 text-left relative transition-all"
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Election Information */}
                    <div className="space-y-2 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="font-mono text-xs px-2 py-0.5 bg-muted border border-border text-foreground font-semibold uppercase">
                          {election.code}
                        </span>

                        {election.status === "LIVE" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[10px] uppercase font-medium">
                            <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed animate-pulse" />
                            Live Election
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-brand/10 border border-brand/30 text-brand font-mono text-[10px] uppercase font-medium">
                            Upcoming
                          </span>
                        )}

                        <span className="text-[11px] font-mono text-muted-foreground">
                          Gated to {election.allowedDomain}
                        </span>
                      </div>

                      <h3 className="text-xl font-heading font-medium text-foreground">
                        {election.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                          <Time02Icon size={14} className="text-subtle" />
                          {election.timeRemaining}
                        </span>
                        <span>•</span>
                        <span>
                          {election.contestsCount} Contests Configured
                        </span>
                      </div>
                    </div>

                    {/* Middle: Turnout Progress */}
                    <div className="lg:w-64 space-y-1.5 bg-muted/40 p-3.5 border border-border/80">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-muted-foreground">
                          Voter Turnout
                        </span>
                        <span className="font-bold text-foreground">
                          {turnoutPct}%
                        </span>
                      </div>

                      <div className="w-full h-2 bg-muted border border-border overflow-hidden">
                        <div
                          className="h-full bg-brand transition-all duration-500"
                          style={{ width: `${turnoutPct}%` }}
                        />
                      </div>

                      <div className="text-[10px] font-mono text-muted-foreground text-right">
                        {election.turnoutVotes} of {election.totalEligible}{" "}
                        votes cast
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                      <button
                        onClick={() => handleCopy(election.code)}
                        className="btn btn-secondary h-9 px-3 text-xs flex items-center gap-1.5"
                        title="Copy Election Join Code"
                      >
                        {copiedCode === election.code ? (
                          <>
                            <CheckmarkCircle02Icon
                              size={14}
                              className="text-status-confirmed"
                            />
                            <span className="text-status-confirmed font-mono text-[11px]">
                              Copied!
                            </span>
                          </>
                        ) : (
                          <>
                            <Copy01Icon size={14} />
                            <span className="font-mono text-[11px]">
                              Copy Code
                            </span>
                          </>
                        )}
                      </button>

                      <Link
                        href="/#guarantees"
                        className="btn btn-primary h-9 px-3.5 text-xs flex items-center gap-1.5 font-bold"
                      >
                        <EyeIcon size={14} />
                        <span>Live Tally</span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tab 2: Voting History & Certified Receipts */}
        {activeTab === "history" && (
          <div className="space-y-4">
            {MOCK_VOTING_HISTORY.map((record) => (
              <div
                key={record.id}
                className="bg-card border-2 border-border p-6 text-left flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs px-2 py-0.5 bg-muted border border-border text-foreground font-semibold uppercase">
                      {record.electionCode}
                    </span>

                    {record.status === "LIVE_SEALED" ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-brand/10 border border-brand/30 text-brand font-mono text-[10px] uppercase font-medium">
                        <Shield01Icon size={11} />
                        Ballot Sealed &amp; Counted
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-status-confirmed/10 border border-status-confirmed/30 text-status-confirmed font-mono text-[10px] uppercase font-medium">
                        <CheckmarkCircle02Icon size={11} />
                        Election Concluded
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-medium text-foreground">
                    {record.electionTitle}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                    <span>Voted: {record.votedAt}</span>
                    <span>•</span>
                    <span className="text-brand">
                      Receipt: {record.receiptHash}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    onClick={() => setSelectedReceipt(record)}
                    className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-2"
                  >
                    <Share01Icon size={14} />
                    <span>View Certified Slip</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Cryptographic Receipt Slip Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl">
            {/* Close Control */}
            <button
              onClick={() => setSelectedReceipt(null)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors"
              aria-label="Close Receipt Modal"
            >
              <Cancel01Icon size={18} />
            </button>

            {/* Official Slip Header */}
            <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-widest text-brand uppercase mb-1">
                <Shield01Icon size={14} />
                <span>OFFICIAL AUDITED BALLOT RECEIPT</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-medium font-heading text-foreground">
                Proof of Submission
              </h2>
              <p className="text-muted-foreground text-xs font-mono mt-1">
                Receipt Serial: {selectedReceipt.receiptHash}
              </p>
            </div>

            {/* Slip Data Rows */}
            <div className="space-y-3 font-mono text-xs border-b-2 border-dashed border-border pb-6">
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Election Code:</span>
                <span className="font-bold text-foreground">
                  {selectedReceipt.electionCode}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Timestamp:</span>
                <span className="text-foreground">
                  {selectedReceipt.votedAt}
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">
                  Voter Affiliation:
                </span>
                <span className="text-status-confirmed font-semibold">
                  @oauife.edu.ng (Verified)
                </span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/40">
                <span className="text-muted-foreground">Merkle Root:</span>
                <span className="text-foreground">
                  {selectedReceipt.merkleRoot}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-muted-foreground">Audit Status:</span>
                <span className="text-status-confirmed font-semibold">
                  VERIFIED &amp; INCLUDED IN TALLY
                </span>
              </div>
            </div>

            {/* Cryptographic Anonymity Guarantee Note */}
            <div className="mt-4 p-3 bg-muted/40 border border-border text-[11px] font-mono text-muted-foreground leading-relaxed">
              <strong>Cryptographic Decoupling:</strong> This receipt proves
              your ballot was committed into the immutable tally without
              revealing your individual candidate selections.
            </div>

            {/* Modal Actions */}
            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => handleCopy(selectedReceipt.receiptHash)}
                className="btn btn-secondary h-10 px-4 text-xs font-bold flex items-center gap-1.5"
              >
                <Copy01Icon size={14} />
                <span>
                  {copiedCode === selectedReceipt.receiptHash
                    ? "Hash Copied!"
                    : "Copy Receipt Hash"}
                </span>
              </button>

              <button
                onClick={() => setSelectedReceipt(null)}
                className="btn btn-primary h-10 px-5 text-xs font-bold"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
