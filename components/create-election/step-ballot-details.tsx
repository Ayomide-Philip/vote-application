"use client";

import { useId } from "react";
import { ArrowRight01Icon, Ticket01Icon } from "hugeicons-react";

interface StepBallotDetailsProps {
  title: string;
  onTitleChange: (val: string) => void;
  description: string;
  onDescriptionChange: (val: string) => void;
  accessionCode: string;
  onAccessionCodeChange: (val: string) => void;
  onGenerateCode: () => void;
  startTime: string;
  onStartTimeChange: (val: string) => void;
  endTime: string;
  onEndTimeChange: (val: string) => void;
  onNext: () => void;
}

export function StepBallotDetails({
  title,
  onTitleChange,
  description,
  onDescriptionChange,
  accessionCode,
  onAccessionCodeChange,
  onGenerateCode,
  startTime,
  onStartTimeChange,
  endTime,
  onEndTimeChange,
  onNext,
}: StepBallotDetailsProps) {
  const titleId = useId();
  const descId = useId();
  const codeId = useId();
  const startId = useId();
  const endId = useId();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <label
          htmlFor={titleId}
          className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
        >
          Election Title
        </label>
        <input
          id={titleId}
          type="text"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          placeholder="e.g. Faculty of Technology Executive Council Election"
          className="text-input h-11 w-full text-xs font-sans"
          required
          autoFocus
        />
      </div>

      <div>
        <label
          htmlFor={descId}
          className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
        >
          Description &amp; Agenda
        </label>
        <textarea
          id={descId}
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Describe the offices being contested, representation guidelines, and voting objectives..."
          rows={7}
          className="text-input w-full p-3.5 text-xs font-sans min-h-40 resize-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1.5">
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label
              htmlFor={startId}
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              Start Time
            </label>
            <input
              id={startId}
              type="datetime-local"
              value={startTime}
              onChange={(e) => onStartTimeChange(e.target.value)}
              className="text-input h-11 w-full text-xs font-sans"
              required
            />
          </div>

          <div>
            <label
              htmlFor={endId}
              className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
            >
              End Time
            </label>
            <input
              id={endId}
              type="datetime-local"
              value={endTime}
              onChange={(e) => onEndTimeChange(e.target.value)}
              className="text-input h-11 w-full text-xs font-sans"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Eligibility Rules</span>
          <ArrowRight01Icon size={16} />
        </button>
      </div>
    </div>
  );
}
