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
    const clean = newPrefixInput.trim().replace(/\*$/, "");
    if (!activePart.digitPrefixes.includes(clean)) {
      handleUpdateActivePart({
        digitPrefixes: [...activePart.digitPrefixes, clean],
      });
    }
    setNewPrefixInput("");
  };

  const handleRemoveDigitPrefix = (pfx: string) => {
    if (!activePart) return;
    const clean = pfx.replace(/\*$/, "");
    handleUpdateActivePart({
      digitPrefixes: activePart.digitPrefixes.filter((p) => p !== clean),
    });
  };

  const getPartTypeBadge = (part: EmailPartRule) => {
    switch (part.type) {
      case "exact":
        return "Must Match";
      case "wildcard":
        return "Any Text";
      case "options":
        return "Option List";
      case "digits":
        return part.digitsMode === "prefix" && part.digitPrefixes.length > 0
          ? `${part.digitPrefixes.map((p) => `${p}*`).join(", ")}`
          : "Numbers Only";
    }
  };

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
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onSampleEmailChange("a.areo.csc2021104@oauife.edu.ng")
              }
              className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
            >
              OAU Format
            </button>
            <span className="text-muted-foreground/40">•</span>
            <button
              type="button"
              onClick={() => onSampleEmailChange("jdoe@lautech.edu.ng")}
              className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
            >
              LAUTECH Format
            </button>
          </div>
        </div>
        <input
          id={sampleInputId}
          type="email"
          value={sampleEmail}
          onChange={(e) => onSampleEmailChange(e.target.value)}
          placeholder="e.g. jdoe@lautech.edu.ng or a.areo.csc2021104@oauife.edu.ng"
          className="text-input h-11 w-full text-xs font-sans"
          required
        />
      </div>

      <div className="space-y-3">
        <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
          Email Parts — Click a part to configure its rule
        </span>

        <div className="flex flex-wrap items-center gap-2 p-3 bg-muted/30 border border-border">
          {emailParts.map((part) => {
            const isSelected = activePart?.id === part.id;
            return (
              <div key={part.id} className="flex items-center">
                {part.delimiter && (
                  <span className="font-mono text-sm text-muted-foreground mx-1">
                    {part.delimiter}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSelectedPartId(part.id)}
                  className={`px-3 py-2 border text-left transition-all cursor-pointer flex flex-col gap-0.5 ${
                    isSelected
                      ? "border-brand bg-brand/10 text-foreground ring-1 ring-brand"
                      : "border-border bg-card text-muted-foreground hover:text-foreground hover:border-border/80"
                  }`}
                >
                  <span className="font-mono text-xs font-bold text-foreground">
                    {part.originalText}
                  </span>
                  <span
                    className={`text-[10px] font-sans font-medium ${
                      isSelected ? "text-brand" : "text-muted-foreground"
                    }`}
                  >
                    {getPartTypeBadge(part)}
                    {part.isOptional && " (Optional)"}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {activePart && (
        <div className="p-5 bg-card border border-border space-y-4 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-border/80">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider font-heading text-foreground">
                Configuring Part:
              </span>
              <span className="px-2 py-0.5 bg-muted border border-border font-mono text-xs font-bold text-foreground">
                {activePart.originalText}
              </span>
            </div>

            <label className="flex items-center gap-2 text-xs font-sans text-muted-foreground cursor-pointer select-none">
              <input
                type="checkbox"
                checked={activePart.isOptional}
                onChange={(e) =>
                  handleUpdateActivePart({ isOptional: e.target.checked })
                }
                className="w-4 h-4 rounded-none accent-brand cursor-pointer"
              />
              <span>Optional part</span>
            </label>
          </div>

          <div className="space-y-2">
            <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
              What should happen to this part?
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  type: "wildcard" as const,
                  title: "Any Text / Username (Wildcard)",
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
              ].map((opt) => (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => handleUpdateActivePart({ type: opt.type })}
                  className={`p-3.5 border text-left transition-all cursor-pointer ${
                    activePart.type === opt.type
                      ? "border-brand bg-brand/5 ring-1 ring-brand"
                      : "border-border/80 bg-muted/20 hover:border-border"
                  }`}
                >
                  <span className="block text-xs font-heading font-medium text-foreground">
                    {opt.title}
                  </span>
                  <span className="block text-[11px] font-sans text-muted-foreground mt-0.5 leading-snug">
                    {opt.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {activePart.type === "options" && (
            <div className="pt-3 border-t border-border/60 space-y-2">
              <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Allowed Options for this Part
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 text-xs font-mono bg-brand/10 border border-brand/30 text-brand font-medium">
                  {activePart.originalText} (Default)
                </span>
                {activePart.options.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleRemoveOption(opt)}
                    className="px-2.5 py-1 text-xs font-mono bg-muted border border-border hover:border-status-rejected hover:text-status-rejected transition-colors cursor-pointer flex items-center gap-1.5"
                    title="Click to remove"
                  >
                    <span>{opt}</span>
                    <Cancel01Icon size={12} />
                  </button>
                ))}
              </div>

              <form
                onSubmit={handleAddOption}
                className="flex items-center gap-2 max-w-xs pt-1"
              >
                <input
                  id={newOptionId}
                  type="text"
                  value={newOptionInput}
                  onChange={(e) => setNewOptionInput(e.target.value)}
                  placeholder="Add alternative (e.g. eee)"
                  className="text-input h-9 text-xs font-mono flex-1"
                />
                <button
                  type="submit"
                  className="btn btn-secondary h-9 px-3 text-xs font-bold cursor-pointer"
                >
                  Add
                </button>
              </form>
            </div>
          )}

          {activePart.type === "digits" && (
            <div className="pt-3 border-t border-border/60 space-y-3">
              <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Number / Matric Rule
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleUpdateActivePart({ digitsMode: "any" })}
                  className={`px-3 py-1.5 text-xs font-sans border cursor-pointer ${
                    activePart.digitsMode === "any"
                      ? "bg-foreground text-background font-bold border-foreground"
                      : "bg-muted text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Any Numbers (All levels)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const defaultPrefix = activePart.originalText.slice(0, 4);
                    handleUpdateActivePart({
                      digitsMode: "prefix",
                      digitPrefixes:
                        activePart.digitPrefixes.length > 0
                          ? activePart.digitPrefixes
                          : defaultPrefix
                            ? [defaultPrefix]
                            : [],
                    });
                  }}
                  className={`px-3 py-1.5 text-xs font-sans border cursor-pointer ${
                    activePart.digitsMode === "prefix"
                      ? "bg-foreground text-background font-bold border-foreground"
                      : "bg-muted text-muted-foreground border-border hover:text-foreground"
                  }`}
                >
                  Starts with Year / Prefix (e.g. 2021*, 2022*)
                </button>
              </div>

              {activePart.digitsMode === "prefix" && (
                <div className="space-y-2 pt-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {activePart.digitPrefixes.map((pfx) => (
                      <button
                        key={pfx}
                        type="button"
                        onClick={() => handleRemoveDigitPrefix(pfx)}
                        className="px-2.5 py-1 text-xs font-mono bg-brand/10 border border-brand/30 text-brand hover:border-status-rejected hover:text-status-rejected transition-colors cursor-pointer flex items-center gap-1.5"
                        title="Click to remove"
                      >
                        <span>{pfx.endsWith("*") ? pfx : `${pfx}*`}</span>
                        <Cancel01Icon size={12} />
                      </button>
                    ))}
                  </div>

                  <form
                    onSubmit={handleAddDigitPrefix}
                    className="flex items-center gap-2 max-w-xs pt-1"
                  >
                    <input
                      type="text"
                      value={newPrefixInput}
                      onChange={(e) => setNewPrefixInput(e.target.value)}
                      placeholder="Add prefix (e.g. 2022*)"
                      className="text-input h-9 text-xs font-mono flex-1"
                    />
                    <button
                      type="submit"
                      className="btn btn-secondary h-9 px-3 text-xs font-bold cursor-pointer"
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

      <div className="p-4 bg-muted/30 border border-border/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider font-heading text-foreground flex items-center gap-1.5">
            <SecurityCheckIcon size={14} className="text-brand" />
            <span>Interactive Email Eligibility Tester</span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Pattern: {compiledRegex}
          </span>
        </div>

        <div className="relative">
          <input
            id={testInputId}
            type="email"
            value={testEmail}
            onChange={(e) => onTestEmailChange(e.target.value)}
            placeholder="Type any student email to test against your configured rules..."
            className="text-input h-10 w-full text-xs font-sans pr-24"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-sans font-medium border ${
                isTestEmailEligible
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : "bg-status-rejected/10 text-status-rejected border-status-rejected/30"
              }`}
            >
              {isTestEmailEligible ? (
                <>
                  <CheckmarkCircle02Icon size={12} />
                  <span>Eligible</span>
                </>
              ) : (
                <>
                  <Cancel01Icon size={12} />
                  <span>Ineligible</span>
                </>
              )}
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
          onClick={onNext}
          className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
        >
          <span>Continue to Candidates &amp; Review</span>
          <ArrowRight01Icon size={16} />
        </button>
      </div>
    </div>
  );
}
