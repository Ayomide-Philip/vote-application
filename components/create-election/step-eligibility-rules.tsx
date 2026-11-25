"use client";

import { useId, useState } from "react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  SecurityCheckIcon,
} from "hugeicons-react";
import { EmailPartRule } from "./types";

interface StepEligibilityRulesProps {
  sampleEmail: string;
  onSampleEmailChange: (val: string) => void;
  domainLabel: string;
  onDomainLabelChange: (val: string) => void;
  emailParts: EmailPartRule[];
  onEmailPartsChange: (parts: EmailPartRule[]) => void;
  testEmail: string;
  onTestEmailChange: (val: string) => void;
  compiledRegex: string;
  isTestEmailEligible: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function StepEligibilityRules({
  sampleEmail,
  onSampleEmailChange,
  domainLabel,
  onDomainLabelChange,
  emailParts,
  onEmailPartsChange,
  testEmail,
  onTestEmailChange,
  compiledRegex,
  isTestEmailEligible,
  onBack,
  onNext,
}: StepEligibilityRulesProps) {
  const sampleInputId = useId();
  const domainLabelId = useId();
  const testInputId = useId();
  const newOptionId = useId();

  const [selectedPartId, setSelectedPartId] = useState<string>(
    emailParts[0]?.id || "",
  );
  const [newOptionInput, setNewOptionInput] = useState("");
  const [newPrefixInput, setNewPrefixInput] = useState("");

  const activePart =
    emailParts.find((p) => p.id === selectedPartId) || emailParts[0];

  const handleUpdateActivePart = (updates: Partial<EmailPartRule>) => {
    if (!activePart) return;
    onEmailPartsChange(
      emailParts.map((p) =>
        p.id === activePart.id ? { ...p, ...updates } : p,
      ),
    );
  };

  const handleAddOption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOptionInput.trim() || !activePart) return;
    const clean = newOptionInput.trim().toLowerCase();
    if (!activePart.options.includes(clean)) {
      handleUpdateActivePart({
        options: [...activePart.options, clean],
      });
    }
    setNewOptionInput("");
  };

  const handleRemoveOption = (opt: string) => {
    if (!activePart) return;
    handleUpdateActivePart({
      options: activePart.options.filter((o) => o !== opt),
    });
  };

  const handleAddDigitPrefix = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrefixInput.trim() || !activePart) return;
    // Strictly numbers only
    const clean = newPrefixInput.replace(/[^0-9]/g, "");
    if (!clean) return;
    const existing = activePart.digitPrefixes
      .map((p) => p.replace(/[^0-9]/g, ""))
      .filter(Boolean);
    if (!existing.includes(clean)) {
      handleUpdateActivePart({
        digitPrefixes: [...existing, clean],
      });
    }
    setNewPrefixInput("");
  };

  const handleRemoveDigitPrefix = (pfx: string) => {
    if (!activePart) return;
    const clean = pfx.replace(/[^0-9]/g, "");
    handleUpdateActivePart({
      digitPrefixes: activePart.digitPrefixes
        .map((p) => p.replace(/[^0-9]/g, ""))
        .filter((p) => p && p !== clean),
    });
  };

  const getPartTypeBadge = (part: EmailPartRule) => {
    switch (part.type) {
      case "exact":
        return "Must Match";
      case "wildcard":
        return "Any Text";
      case "options":
        return part.options.length > 0
          ? `Options (${part.options.length + 1})`
          : "Option List";
      case "digits": {
        const cleanPrefixes = part.digitPrefixes
          .map((p) => p.replace(/[^0-9]/g, ""))
          .filter(Boolean);
        return part.digitsMode === "prefix" && cleanPrefixes.length > 0
          ? `${cleanPrefixes.map((p) => `${p}*`).join(", ")}`
          : "Numbers";
      }
    }
  };

  const validDigitPrefixes = activePart
    ? activePart.digitPrefixes
        .map((p) => p.replace(/[^0-9]/g, ""))
        .filter(Boolean)
    : [];

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor={sampleInputId}
            className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground"
          >
            Sample Student Email
          </label>
        </div>
        <input
          id={sampleInputId}
          type="email"
          value={sampleEmail}
          onChange={(e) => onSampleEmailChange(e.target.value)}
          placeholder="e.g. jdoe@domain.co"
          className="text-input h-11 w-full text-xs font-sans"
          required
        />
      </div>

      <div>
        <label
          htmlFor={domainLabelId}
          className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
        >
          Domain Label
        </label>
        <input
          id={domainLabelId}
          type="text"
          value={domainLabel}
          onChange={(e) => onDomainLabelChange(e.target.value)}
          placeholder="e.g. @domain.co"
          className="text-input h-11 w-full text-xs font-sans"
        />
      </div>

      {sampleEmail && (
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-1.5">
            <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
              Email Slices
            </span>
            <span className="text-[11px] font-sans text-muted-foreground/70">
              Click a slice to configure its rule
            </span>
          </div>

          <div className="p-3 bg-muted/20 border border-border/80 flex flex-wrap items-center gap-1.5">
            {emailParts.map((part) => {
              const isSelected = activePart?.id === part.id;
              return (
                <div key={part.id} className="flex items-center max-w-full">
                  {part.delimiter && (
                    <span className="font-mono text-xs font-semibold text-muted-foreground/60 px-1 select-none shrink-0">
                      {part.delimiter}
                    </span>
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedPartId(part.id)}
                    className={`px-3 py-2 border text-left transition-all cursor-pointer flex flex-col gap-0.5 max-w-full ${
                      isSelected
                        ? "border-brand bg-brand/10 text-foreground ring-1 ring-brand shadow-[0_0_12px_rgba(245,158,11,0.08)]"
                        : "border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-border"
                    }`}
                  >
                    <span className="font-mono text-xs font-bold text-foreground tracking-tight break-all">
                      {part.originalText}
                    </span>
                    <span
                      className={`text-[9px] font-sans font-semibold uppercase tracking-wider ${
                        isSelected ? "text-brand" : "text-muted-foreground/70"
                      }`}
                    >
                      {getPartTypeBadge(part)}
                      {part.isOptional && " • Opt"}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {activePart && (
        <div className="p-4 sm:p-5 bg-card border border-border space-y-4 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border/70">
            <div className="flex flex-wrap items-center gap-2 min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Configuring Slice:
              </span>
              <span className="px-2.5 py-0.5 bg-brand/10 border border-brand/30 font-mono text-xs font-bold text-brand break-all">
                {activePart.originalText}
              </span>
            </div>

            <label className="flex items-center gap-2 text-xs font-sans text-muted-foreground hover:text-foreground cursor-pointer select-none shrink-0">
              <input
                type="checkbox"
                checked={activePart.isOptional}
                onChange={(e) =>
                  handleUpdateActivePart({ isOptional: e.target.checked })
                }
                className="w-4 h-4 rounded-none accent-brand cursor-pointer"
              />
              <span>Optional slice</span>
            </label>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
              Rule Type
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  type: "wildcard" as const,
                  title: "Any Text / Username",
                  desc: "Any student name, username, or characters allowed.",
                },
                {
                  type: "exact" as const,
                  title: "Exact Match (Compulsory)",
                  desc: `Must strictly match "${activePart.originalText}".`,
                },
                {
                  type: "options" as const,
                  title: "One of Specific Options",
                  desc: "Can be this code or user-specified alternative codes.",
                },
                {
                  type: "digits" as const,
                  title: "Numbers Only (Digits)",
                  desc: "Must be student ID or matriculation digits.",
                },
              ].map((opt) => {
                const isActive = activePart.type === opt.type;
                return (
                  <button
                    key={opt.type}
                    type="button"
                    onClick={() => {
                      if (opt.type === "digits") {
                        // Purge any text that was previously in digitPrefixes
                        const cleanPrefixes = activePart.digitPrefixes
                          .map((p) => p.replace(/[^0-9]/g, ""))
                          .filter(Boolean);

                        // Only extract default prefix if original text contains digits
                        const digitsInOriginal =
                          activePart.originalText.replace(/[^0-9]/g, "");
                        const defaultPrefix =
                          digitsInOriginal.length >= 4
                            ? digitsInOriginal.slice(0, 4)
                            : "";

                        handleUpdateActivePart({
                          type: "digits",
                          digitPrefixes:
                            cleanPrefixes.length > 0
                              ? cleanPrefixes
                              : defaultPrefix
                                ? [defaultPrefix]
                                : [],
                          digitsMode:
                            cleanPrefixes.length > 0 || defaultPrefix
                              ? activePart.digitsMode
                              : "any",
                        });
                      } else {
                        handleUpdateActivePart({ type: opt.type });
                      }
                    }}
                    className={`p-3.5 border text-left transition-all cursor-pointer relative ${
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

          {/* Options List Sub-panel */}
          {activePart.type === "options" && (
            <div className="pt-3.5 border-t border-border/70 space-y-2.5">
              <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Allowed Choices for this Slice
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono bg-brand/10 border border-brand/30 text-brand font-medium break-all">
                  {activePart.originalText} (Base)
                </span>
                {activePart.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleRemoveOption(opt)}
                    className="px-2.5 py-1 text-xs font-mono bg-muted/50 border border-border text-foreground hover:border-status-rejected/60 hover:text-status-rejected transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Remove choice"
                  >
                    <span className="break-all">{opt}</span>
                    <Cancel01Icon size={12} className="shrink-0" />
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleAddOption}
                className="flex items-center gap-2 w-full sm:max-w-xs pt-1"
              >
                <input
                  id={newOptionId}
                  type="text"
                  value={newOptionInput}
                  onChange={(e) => setNewOptionInput(e.target.value)}
                  placeholder="Add alternative (e.g. eee)"
                  className="text-input h-9 text-xs font-mono flex-1 min-w-0"
                />
                <button
                  type="submit"
                  className="btn btn-secondary h-9 px-3 text-xs font-bold cursor-pointer shrink-0"
                >
                  Add
                </button>
              </form>
            </div>
          )}

          {/* Digits Sub-panel */}
          {activePart.type === "digits" && (
            <div className="pt-3.5 border-t border-border/70 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Number Constraint
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleUpdateActivePart({ digitsMode: "any" })}
                  className={`px-3 py-2 sm:py-1.5 text-xs font-sans border transition-colors cursor-pointer text-left sm:text-center ${
                    activePart.digitsMode === "any"
                      ? "bg-foreground text-background font-bold border-foreground"
                      : "bg-muted/40 text-muted-foreground border-border/80 hover:text-foreground hover:border-border"
                  }`}
                >
                  Any Digits (All cohorts)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    // Filter out any non-numeric text
                    const cleanPrefixes = activePart.digitPrefixes
                      .map((p) => p.replace(/[^0-9]/g, ""))
                      .filter(Boolean);

                    const digitsInOriginal = activePart.originalText.replace(
                      /[^0-9]/g,
                      "",
                    );
                    const defaultPrefix =
                      digitsInOriginal.length >= 4
                        ? digitsInOriginal.slice(0, 4)
                        : "";

                    handleUpdateActivePart({
                      digitsMode: "prefix",
                      digitPrefixes:
                        cleanPrefixes.length > 0
                          ? cleanPrefixes
                          : defaultPrefix
                            ? [defaultPrefix]
                            : [],
                    });
                  }}
                  className={`px-3 py-2 sm:py-1.5 text-xs font-sans border transition-colors cursor-pointer text-left sm:text-center ${
                    activePart.digitsMode === "prefix"
                      ? "bg-foreground text-background font-bold border-foreground"
                      : "bg-muted/40 text-muted-foreground border-border/80 hover:text-foreground hover:border-border"
                  }`}
                >
                  Starts with Year Prefix (e.g. 2021*, 2022*)
                </button>
              </div>

              {activePart.digitsMode === "prefix" && (
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {validDigitPrefixes.map((pfx) => (
                      <button
                        key={pfx}
                        type="button"
                        onClick={() => handleRemoveDigitPrefix(pfx)}
                        className="px-2.5 py-1 text-xs font-mono bg-brand/10 border border-brand/30 text-brand hover:border-status-rejected/60 hover:text-status-rejected transition-colors cursor-pointer flex items-center gap-1.5"
                        title="Remove prefix"
                      >
                        <span>{pfx}*</span>
                        <Cancel01Icon size={12} />
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={handleAddDigitPrefix}
                    className="flex items-center gap-2 w-full sm:max-w-xs pt-1"
                  >
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      value={newPrefixInput}
                      onChange={(e) =>
                        setNewPrefixInput(e.target.value.replace(/[^0-9]/g, ""))
                      }
                      placeholder="Add year prefix (e.g. 2022)"
                      className="text-input h-9 text-xs font-mono flex-1 min-w-0"
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary h-9 px-3 text-xs font-bold cursor-pointer shrink-0"
                    >
                      Add
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {sampleEmail?.trim() && (
        <div className="p-4 bg-muted/20 border border-border/80 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wider font-heading text-foreground flex items-center gap-1.5">
              <SecurityCheckIcon size={14} className="text-brand shrink-0" />
              <span>Live Eligibility Tester</span>
            </span>
            <div
              className="flex items-center gap-1.5 text-[11px] font-mono text-muted-foreground/80 max-w-full sm:max-w-sm min-w-0"
              title={compiledRegex}
            >
              <span className="text-[10px] uppercase font-sans font-bold text-muted-foreground/60 tracking-wider shrink-0">
                Pattern:
              </span>
              <span className="px-1.5 py-0.5 bg-background/80 border border-border/60 truncate">
                {compiledRegex}
              </span>
            </div>
          </div>

          <div className="relative">
            <input
              id={testInputId}
              type="email"
              value={testEmail}
              onChange={(e) => onTestEmailChange(e.target.value)}
              placeholder="Type any student email to test..."
              className={`text-input h-10 w-full text-xs font-sans ${
                testEmail.trim() ? "pr-10" : ""
              }`}
            />
            {testEmail.trim() && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center">
                {isTestEmailEligible ? (
                  <span
                    className="inline-flex items-center justify-center text-status-confirmed"
                    title="Eligible"
                    aria-label="Eligible"
                  >
                    <CheckmarkCircle02Icon size={16} />
                  </span>
                ) : (
                  <span
                    className="inline-flex items-center justify-center text-status-rejected"
                    title="Ineligible"
                    aria-label="Ineligible"
                  >
                    <Cancel01Icon size={16} />
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
      )}

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
          onClick={onNext}
          className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Continue to Launch</span>
          <ArrowRight01Icon size={16} />
        </button>
      </div>
    </div>
  );
}
