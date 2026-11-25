"use client";

import { useId } from "react";
import {
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
  Ticket01Icon,
} from "hugeicons-react";

interface StepCandidatesReviewProps {
  title: string;
  accessionCode: string;
  onAccessionCodeChange: (val: string) => void;
  onGenerateCode: () => void;
  domainLabel: string;
  compiledRegex: string;
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
  onGenerateCode,
  domainLabel,
  compiledRegex,
  startTime,
  endTime,
  isPublishing,
  publishSuccess,
  onBack,
  onPublish,
}: StepCandidatesReviewProps) {
  const codeId = useId();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
          <label
            htmlFor={codeId}
            className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground"
          >
            Accession Code
          </label>
          <button
            type="button"
            onClick={onGenerateCode}
            className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
          >
            Generate Random
          </button>
        </div>
        <div className="relative">
          <input
            id={codeId}
            type="text"
            value={accessionCode}
            onChange={(e) =>
              onAccessionCodeChange(e.target.value.toUpperCase())
            }
            placeholder="e.g. OAU-TECH-26"
            className="text-input h-11 w-full text-xs font-mono tracking-wider font-medium uppercase pr-9"
            required
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            <Ticket01Icon size={16} />
          </div>
        </div>
      </div>

      <div className="border border-border/80 bg-muted/20 p-4 sm:p-5 space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-wider font-heading text-foreground">
          Election Summary &amp; Verification Slip
        </h4>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
          <div>
            <span className="text-muted-foreground block">Election Title:</span>
            <strong className="text-foreground wrap-break-word">
              {title || "Not set"}
            </strong>
          </div>

          <div>
            <span className="text-muted-foreground block">Accession Code:</span>
            <span className="font-mono font-medium text-foreground break-all">
              {accessionCode || "Not set"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">
              Eligibility Scope:
            </span>
            <span className="text-foreground wrap-break-word">
              {domainLabel || "Not set"}
            </span>
          </div>

          <div>
            <span className="text-muted-foreground block">Timeline:</span>
            <span className="text-foreground">
              {startTime && endTime
                ? `${new Date(startTime).toLocaleString()} → ${new Date(endTime).toLocaleString()}`
                : "Not set"}
            </span>
          </div>

          <div className="sm:col-span-2">
            <span className="text-muted-foreground block mb-1">Pattern:</span>
            <code className="block px-2.5 py-1.5 bg-background/80 border border-border/70 font-mono text-[11px] text-foreground break-all">
              {compiledRegex}
            </code>
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
              <span>Publish Institutional Election</span>
              <ArrowUpRight01Icon size={14} />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
