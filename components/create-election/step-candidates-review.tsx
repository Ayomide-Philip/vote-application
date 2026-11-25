"use client";

import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Delete02Icon,
  UserAdd01Icon,
} from "hugeicons-react";
import { InitialCandidate } from "./types";

interface StepCandidatesReviewProps {
  candidates: InitialCandidate[];
  onOpenAddModal: () => void;
  onRemoveCandidate: (id: string) => void;
  title: string;
  accessionCode: string;
  domainLabel: string;
  startTime: string;
  endTime: string;
  isPublishing: boolean;
  publishSuccess: boolean;
  onBack: () => void;
  onPublish: () => void;
}

export function StepCandidatesReview({
  candidates,
  onOpenAddModal,
  onRemoveCandidate,
  title,
  accessionCode,
  domainLabel,
  startTime,
  endTime,
  isPublishing,
  publishSuccess,
  onBack,
  onPublish,
}: StepCandidatesReviewProps) {
  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex items-center justify-between pb-2 border-b border-border">
        <div>
          <h3 className="text-base font-heading font-medium text-foreground">
            Initial Candidates ({candidates.length})
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            You can register contestants now or manage them later from the
            election dashboard.
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="btn btn-secondary h-9 px-3 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
        >
          <UserAdd01Icon size={14} />
          <span>Add Candidate</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {candidates.map((cand) => (
          <div
            key={cand.id}
            className="bg-card border border-border p-4 flex items-start justify-between gap-3 text-left shadow-2xs"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-heading font-medium text-sm text-foreground">
                  {cand.name}
                </span>
                <span className="px-1.5 py-0.5 bg-muted text-[10px] font-sans font-medium text-muted-foreground border border-border">
                  {cand.position}
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-sans">
                {cand.department}
              </p>
              <p className="text-xs text-muted-foreground/80 font-sans line-clamp-2 italic">
                &ldquo;{cand.manifesto}&rdquo;
              </p>
            </div>

            <button
              type="button"
              onClick={() => onRemoveCandidate(cand.id)}
              className="p-1.5 text-muted-foreground hover:text-status-rejected transition-colors cursor-pointer"
              title="Remove candidate"
              aria-label={`Remove ${cand.name}`}
            >
              <Delete02Icon size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="border border-border/80 bg-muted/20 p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider font-heading text-foreground">
          Election Summary &amp; Verification Slip
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="text-muted-foreground block">Election Title:</span>
            <strong className="text-foreground">{title}</strong>
          </div>

          <div>
            <span className="text-muted-foreground block">Accession Code:</span>
            <span className="font-mono font-medium text-foreground">
              {accessionCode}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">
              Eligibility Scope:
            </span>
            <span className="text-foreground">{domainLabel}</span>
          </div>

          <div>
            <span className="text-muted-foreground block">Timeline:</span>
            <span className="text-foreground">
              {new Date(startTime).toLocaleString()} &rarr;{" "}
              {new Date(endTime).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="btn btn-secondary h-11 px-5 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <ArrowLeft01Icon size={16} />
          <span>Back</span>
        </button>

        <button
          type="button"
          disabled={isPublishing || publishSuccess}
          onClick={onPublish}
          className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isPublishing ? (
            <span>Publishing &amp; Certifying...</span>
          ) : (
            <>
              <span>Publish Institutional Election</span>
              <ArrowUpRight01Icon size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
