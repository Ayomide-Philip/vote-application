"use client";

import { useId, useState } from "react";
import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  LockKeyIcon,
  SecurityCheckIcon,
} from "hugeicons-react";
import { DepartmentPreset, EligibilityScope } from "./types";

const COMMON_DEPTS: DepartmentPreset[] = [
  { code: "csc", label: "Computer Science" },
  { code: "eee", label: "Electrical & Electronics" },
  { code: "mee", label: "Mechanical Engineering" },
  { code: "cve", label: "Civil Engineering" },
  { code: "che", label: "Chemical Engineering" },
  { code: "fse", label: "Food Science" },
];

interface StepEligibilityRulesProps {
  domain: string;
  onDomainChange: (val: string) => void;
  domainLabel: string;
  onDomainLabelChange: (val: string) => void;
  eligibilityScope: EligibilityScope;
  onEligibilityScopeChange: (val: EligibilityScope) => void;
  selectedDepts: string[];
  onAddDept: (code: string) => void;
  onRemoveDept: (code: string) => void;
  allYears: boolean;
  onAllYearsChange: (val: boolean) => void;
  selectedYears: string[];
  onToggleYear: (year: string) => void;
  customPattern: string;
  onCustomPatternChange: (val: string) => void;
  compiledRegex: string;
  testEmail: string;
  onTestEmailChange: (val: string) => void;
  isTestEmailEligible: boolean;
  onBack: () => void;
  onNext: () => void;
}

export function StepEligibilityRules({
  domain,
  onDomainChange,
  domainLabel,
  onDomainLabelChange,
  eligibilityScope,
  onEligibilityScopeChange,
  selectedDepts,
  onAddDept,
  onRemoveDept,
  allYears,
  onAllYearsChange,
  selectedYears,
  onToggleYear,
  customPattern,
  onCustomPatternChange,
  compiledRegex,
  testEmail,
  onTestEmailChange,
  isTestEmailEligible,
  onBack,
  onNext,
}: StepEligibilityRulesProps) {
  const domainId = useId();
  const labelId = useId();
  const customTagId = useId();
  const customPatternId = useId();
  const testEmailId = useId();

  const [customDeptInput, setCustomDeptInput] = useState("");

  const handleAddCustomDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDeptInput.trim()) return;
    onAddDept(customDeptInput);
    setCustomDeptInput("");
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="p-4 bg-muted/20 border border-border flex items-start gap-3">
        <LockKeyIcon size={18} className="text-brand mt-0.5 shrink-0" />
        <div>
          <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
            Automated Eligibility &amp; Regex Compiler
          </h3>
          <p className="text-xs font-sans text-muted-foreground mt-0.5 leading-relaxed">
            You do not need to write regular expressions. Configure the
            parameters below or select from presets, and the system compiles the
            validation pattern automatically.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor={domainId}
            className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
          >
            Institutional Domain
          </label>
          <input
            id={domainId}
            type="text"
            value={domain}
            onChange={(e) => onDomainChange(e.target.value)}
            placeholder="e.g. oauife.edu.ng"
            className="text-input h-11 w-full text-xs font-sans"
            required
          />
        </div>

        <div>
          <label
            htmlFor={labelId}
            className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
          >
            Friendly Domain Label
          </label>
          <input
            id={labelId}
            type="text"
            value={domainLabel}
            onChange={(e) => onDomainLabelChange(e.target.value)}
            placeholder="e.g. Faculty of Technology (@oauife.edu.ng)"
            className="text-input h-11 w-full text-xs font-sans"
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
          Voter Scope
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: "institution" as const,
              title: "Whole Institution",
              desc: "Open to any student/staff with an institutional email.",
            },
            {
              id: "departmental" as const,
              title: "Department / Faculty",
              desc: "Filter by academic departments or matric prefixes.",
            },
            {
              id: "custom" as const,
              title: "Custom Regex",
              desc: "Manually specify an advanced regular expression.",
            },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onEligibilityScopeChange(item.id)}
              className={`p-4 border text-left transition-all cursor-pointer ${
                eligibilityScope === item.id
                  ? "border-brand bg-brand/5 ring-1 ring-brand"
                  : "border-border/80 bg-muted/20 hover:border-border"
              }`}
            >
              <span className="block text-xs font-heading font-medium text-foreground">
                {item.title}
              </span>
              <span className="block text-[11px] font-sans text-muted-foreground mt-1 leading-snug">
                {item.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {eligibilityScope === "departmental" && (
        <div className="space-y-4 p-5 bg-card border border-border">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-2">
              Allowed Department Codes
            </span>
            <div className="flex flex-wrap gap-2 mb-3">
              {COMMON_DEPTS.map((dept) => {
                const isSelected = selectedDepts.includes(dept.code);
                return (
                  <button
                    key={dept.code}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        onRemoveDept(dept.code);
                      } else {
                        onAddDept(dept.code);
                      }
                    }}
                    className={`px-3 py-1.5 text-xs font-sans border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-brand/10 border-brand/40 text-brand font-medium"
                        : "bg-muted/40 border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span>{dept.label}</span>
                    <span className="font-mono text-[10px] opacity-75">
                      ({dept.code})
                    </span>
                  </button>
                );
              })}
            </div>

            <form
              onSubmit={handleAddCustomDept}
              className="flex items-center gap-2 max-w-sm"
            >
              <input
                id={customTagId}
                type="text"
                value={customDeptInput}
                onChange={(e) => setCustomDeptInput(e.target.value)}
                placeholder="Add custom code (e.g. chm)"
                className="text-input h-9 text-xs font-sans flex-1"
              />
              <button
                type="submit"
                className="btn btn-secondary h-9 px-3 text-xs font-bold cursor-pointer"
              >
                Add Code
              </button>
            </form>
          </div>

          <div className="pt-2 border-t border-border/60">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Academic Level / Entry Year Filter
              </span>
              <button
                type="button"
                onClick={() => onAllYearsChange(!allYears)}
                className="text-xs font-sans text-brand hover:underline cursor-pointer"
              >
                {allYears ? "Restrict to specific years" : "Allow all years"}
              </button>
            </div>

            {allYears ? (
              <p className="text-xs font-sans text-muted-foreground">
                All academic levels (100L through 500L+) are eligible to vote.
              </p>
            ) : (
              <div className="flex flex-wrap gap-2">
                {["2020", "2021", "2022", "2023", "2024", "2025"].map((year) => {
                  const isSel = selectedYears.includes(year);
                  return (
                    <button
                      key={year}
                      type="button"
                      onClick={() => onToggleYear(year)}
                      className={`px-3 py-1 text-xs font-sans border cursor-pointer ${
                        isSel
                          ? "bg-brand text-black font-bold border-brand"
                          : "bg-muted border-border text-muted-foreground"
                      }`}
                    >
                      {year} Entry
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {eligibilityScope === "custom" && (
        <div>
          <label
            htmlFor={customPatternId}
            className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
          >
            Raw Regex Pattern
          </label>
          <input
            id={customPatternId}
            type="text"
            value={customPattern}
            onChange={(e) => onCustomPatternChange(e.target.value)}
            placeholder="e.g. .*\.(csc|eee)[0-9]+@oauife\.edu\.ng$"
            className="text-input h-11 w-full text-xs font-mono"
            required
          />
        </div>
      )}

      <div className="p-4 bg-muted/30 border border-border/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold uppercase tracking-wider font-heading text-foreground flex items-center gap-1.5">
            <SecurityCheckIcon size={14} className="text-brand" />
            <span>Interactive Email Eligibility Tester</span>
          </span>
          <span className="text-[11px] font-mono text-muted-foreground">
            Compiled Regex: {compiledRegex}
          </span>
        </div>

        <div>
          <div className="relative">
            <input
              id={testEmailId}
              type="email"
              value={testEmail}
              onChange={(e) => onTestEmailChange(e.target.value)}
              placeholder="Enter an email to test (e.g. a.areo.csc2021104@oauife.edu.ng)"
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
          <p className="text-[11px] font-sans text-muted-foreground mt-1">
            Type any test student email above to test your rule before
            launching.
          </p>
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
