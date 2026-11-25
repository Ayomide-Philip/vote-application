"use client";

import { useId } from "react";
import { ArrowLeft01Icon, ArrowUpRight01Icon } from "hugeicons-react";

interface StepCandidatesReviewProps {
  title: string;
  accessionCode: string;
  onAccessionCodeChange: (val: string) => void;
  electionType: "public" | "private";
  onElectionTypeChange: (val: "private" | "public") => void;
  domainLabel: string;
  startTime: string;
  endTime: string;
  isPublishing: boolean;
  publishSuccess: boolean;
  onBack: () => void;
  onPublish: () => void;
}

export function StepCandidatesReview({
  title,
  accessionCode,
  onAccessionCodeChange,
  electionType,
  onElectionTypeChange,
  domainLabel,
  startTime,
  endTime,
  isPublishing,
  publishSuccess,
  onBack,
  onPublish,
}: StepCandidatesReviewProps) {
  const codeId = useId();

  const formatDate = (val: string) => {
    if (!val) return "Not set";
    const d = new Date(val);
    if (Number.isNaN(d.getTime())) return "Not set";
    return d.toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <label
          htmlFor={codeId}
          className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
        >
          Accession Code
        </label>
        <input
          id={codeId}
          type="text"
          value={accessionCode}
          onChange={(e) => onAccessionCodeChange(e.target.value.toUpperCase())}
          placeholder="e.g. OAU-CSC-1024"
          className="text-input h-11 w-full text-xs font-mono uppercase"
          required
        />
      </div>

      <div className="space-y-2">
        <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
          Ballot Visibility
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              value: "public" as const,
              title: "Public Ballot",
              desc: "Auto-verifies eligible voters with no approval needed.",
            },
            {
              value: "private" as const,
              title: "Private Ballot",
              desc: "Admin approves each voter joining the ballot.",
            },
          ].map((opt) => {
            const isActive = electionType === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => onElectionTypeChange(opt.value)}
                className={`p-3.5 border text-left transition-all cursor-pointer ${
                  isActive
                    ? "border-brand bg-brand/5 ring-1 ring-brand shadow-[0_0_12px_rgba(245,158,11,0.06)]"
                    : "border-border/70 bg-muted/10 hover:border-border hover:bg-muted/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="block text-xs font-heading font-medium text-foreground">
                    {opt.title}
                  </span>
                  <span
                    className={`w-3.5 h-3.5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                      isActive
                        ? "border-brand bg-brand"
                        : "border-border/80 bg-background"
                    }`}
                  >
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-background" />
                    )}
                  </span>
                </div>
                <span className="block text-[11px] font-sans text-muted-foreground mt-1 leading-snug">
                  {opt.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-border bg-muted/15">
        <div className="px-4 py-3 border-b border-border/80 flex items-center justify-between gap-2 bg-muted/25">
          <h4 className="text-[11px] font-bold uppercase tracking-wider font-heading text-foreground">
            Verification Slip
          </h4>
          <span
            className={`px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider border ${
              electionType === "private"
                ? "border-brand/40 bg-brand/10 text-brand"
                : "border-border bg-card text-muted-foreground"
            }`}
          >
            {electionType}
          </span>
        </div>

        <div className="divide-y divide-border/60 text-xs font-sans">
          <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-muted-foreground shrink-0">Ballot Title</span>
            <span className="font-medium text-foreground sm:text-right wrap-break-word">
              {title || "Not set"}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-muted-foreground shrink-0">
              Accession Code
            </span>
            <span className="font-mono text-foreground sm:text-right break-all">
              {accessionCode || "Not set"}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-muted-foreground shrink-0">
              Eligibility Scope
            </span>
            <span className="text-foreground sm:text-right wrap-break-word">
              {domainLabel || "Not set"}
            </span>
          </div>

          <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <span className="text-muted-foreground shrink-0">
              Voting Window
            </span>
            <span className="text-foreground sm:text-right">
              {startTime && endTime
                ? `${formatDate(startTime)} — ${formatDate(endTime)}`
                : "Not set"}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary h-11 px-5 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft01Icon size={16} />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={isPublishing || publishSuccess}
          onClick={onPublish}
          className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isPublishing ? (
            <span>Publishing &amp; Certifying...</span>
          ) : (
            <>
              <span>Publish Election</span>
              <ArrowUpRight01Icon size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
