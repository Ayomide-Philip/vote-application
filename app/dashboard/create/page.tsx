"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import {
  Add01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  Delete02Icon,
  InformationCircleIcon,
  LockKeyIcon,
  SecurityCheckIcon,
  Ticket01Icon,
  UserAdd01Icon,
} from "hugeicons-react";

interface InitialCandidate {
  id: string;
  name: string;
  position: string;
  department: string;
  manifesto: string;
}

const COMMON_DEPTS = [
  { code: "csc", label: "Computer Science" },
  { code: "eee", label: "Electrical & Electronics" },
  { code: "mee", label: "Mechanical Engineering" },
  { code: "cve", label: "Civil Engineering" },
  { code: "che", label: "Chemical Engineering" },
  { code: "fse", label: "Food Science" },
];

export default function CreateElectionPage() {
  const router = useRouter();
  const titleInputId = useId();
  const descInputId = useId();
  const codeInputId = useId();
  const domainInputId = useId();
  const labelInputId = useId();
  const startInputId = useId();
  const endInputId = useId();
  const customTagInputId = useId();
  const customPatternInputId = useId();
  const testEmailInputId = useId();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accessionCode, setAccessionCode] = useState("OAU-TECH-26");
  const [startTime, setStartTime] = useState(() => {
    const d = new Date();
    d.setHours(d.getHours() + 1, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });
  const [endTime, setEndTime] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    d.setHours(18, 0, 0, 0);
    return d.toISOString().slice(0, 16);
  });

  const [domain, setDomain] = useState("oauife.edu.ng");
  const [domainLabel, setDomainLabel] = useState(
    "Faculty of Technology (@oauife.edu.ng)",
  );
  const [eligibilityScope, setEligibilityScope] = useState<
    "institution" | "departmental" | "custom"
  >("departmental");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([
    "csc",
    "eee",
    "mee",
  ]);
  const [customDeptInput, setCustomDeptInput] = useState("");
  const [allYears, setAllYears] = useState(true);
  const [selectedYears, setSelectedYears] = useState<string[]>([
    "2021",
    "2022",
  ]);
  const [customPattern, setCustomPattern] = useState("");

  const [testEmail, setTestEmail] = useState("a.areo.csc2021104@oauife.edu.ng");

  const [candidates, setCandidates] = useState<InitialCandidate[]>([
    {
      id: "c-1",
      name: "Toluwani Adeleke",
      position: "President",
      department: "Computer Science & Engineering",
      manifesto:
        "Transparent departmental budgeting and digital lab expansion.",
    },
    {
      id: "c-2",
      name: "Chukwudi Nnamdi",
      position: "President",
      department: "Mechanical Engineering",
      manifesto:
        "Industry internship partnerships and student welfare advocacy.",
    },
  ]);
  const [candName, setCandName] = useState("");
  const [candPos, setCandPos] = useState("President");
  const [candDept, setCandDept] = useState("");
  const [candManifesto, setCandManifesto] = useState("");
  const [isAddCandOpen, setIsAddCandOpen] = useState(false);

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const cleanDomain = domain.replace(/^@/, "").trim().toLowerCase();

  const compiledRegex = (() => {
    if (eligibilityScope === "custom" && customPattern.trim()) {
      return customPattern.trim();
    }
    if (eligibilityScope === "institution") {
      return `.*@${cleanDomain.replace(/\./g, "\\.")}$`;
    }

    const deptPart =
      selectedDepts.length > 0
        ? `\\.(${selectedDepts.join("|")})`
        : "\\.[a-z]+";
    const yearPart =
      allYears || selectedYears.length === 0
        ? "[0-9]*"
        : `(${selectedYears.join("|")})[0-9]*`;

    return `.*${deptPart}${yearPart}@${cleanDomain.replace(/\./g, "\\.")}$`;
  })();

  const isTestEmailEligible = (() => {
    try {
      const reg = new RegExp(compiledRegex, "i");
      return reg.test(testEmail.trim());
    } catch {
      return false;
    }
  })();

  const handleGenerateCode = () => {
    const prefixes = ["OAU", "TECH", "ENG", "SUG", "NACOS", "VOTE"];
    const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(100 + Math.random() * 900);
    setAccessionCode(`${randomPrefix}-${randomNum}-26`);
  };

  const handleAddDept = (code: string) => {
    const trimmed = code.trim().toLowerCase();
    if (!trimmed || selectedDepts.includes(trimmed)) return;
    setSelectedDepts((prev) => [...prev, trimmed]);
  };

  const handleRemoveDept = (code: string) => {
    setSelectedDepts((prev) => prev.filter((d) => d !== code));
  };

  const handleAddCustomDept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDeptInput.trim()) return;
    handleAddDept(customDeptInput);
    setCustomDeptInput("");
  };

  const handleToggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const handleAddCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candName.trim() || !candDept.trim()) return;
    const newCand: InitialCandidate = {
      id: `c-${Date.now()}`,
      name: candName.trim(),
      position: candPos,
      department: candDept.trim(),
      manifesto:
        candManifesto.trim() ||
        "Dedicated to transparent student leadership and representation.",
    };
    setCandidates((prev) => [...prev, newCand]);
    setCandName("");
    setCandDept("");
    setCandManifesto("");
    setIsAddCandOpen(false);
  };

  const handleRemoveCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleNextStep = () => {
    setStepError(null);
    if (currentStep === 1) {
      if (!title.trim()) {
        setStepError("Please provide an election title.");
        return;
      }
      if (!accessionCode.trim()) {
        setStepError("Please provide an accession code.");
        return;
      }
      if (new Date(endTime) <= new Date(startTime)) {
        setStepError("End time must be after the start time.");
        return;
      }
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!domain.trim()) {
        setStepError("Please specify the institutional domain.");
        return;
      }
      if (eligibilityScope === "departmental" && selectedDepts.length === 0) {
        setStepError("Please select at least one department code.");
        return;
      }
      setCurrentStep(3);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    setStepError(null);

    await new Promise((r) => setTimeout(r, 1200));

    setIsPublishing(false);
    setPublishSuccess(true);

    setTimeout(() => {
      router.push(`/dashboard/elections/${accessionCode}`);
    }, 1400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left pb-16">
      <div className="bg-card border border-border p-6 sm:p-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
            Create Institutional Election Ballot
          </h1>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Configure your election parameters, automate domain-level voter
            eligibility, and initialize contestants.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 border-y border-border py-4">
          {[
            { step: 1, label: "1. Ballot Details" },
            { step: 2, label: "2. Eligibility Rules" },
            { step: 3, label: "3. Candidates & Launch" },
          ].map((item) => (
            <button
              key={item.step}
              type="button"
              onClick={() => {
                if (item.step < currentStep) {
                  setCurrentStep(item.step as 1 | 2 | 3);
                }
              }}
              className={`text-left p-2 transition-all cursor-pointer ${
                currentStep === item.step
                  ? "border-b-2 border-brand text-foreground font-semibold"
                  : currentStep > item.step
                    ? "text-muted-foreground hover:text-foreground border-b-2 border-status-confirmed"
                    : "text-muted-foreground/40 border-b-2 border-transparent cursor-not-allowed"
              }`}
            >
              <span className="block text-[11px] font-heading uppercase tracking-wider">
                {item.label}
              </span>
            </button>
          ))}
        </div>

        {stepError && (
          <div className="p-3.5 bg-status-rejected/10 border border-status-rejected/30 text-xs font-sans text-status-rejected flex items-center gap-2">
            <Cancel01Icon size={16} className="shrink-0" />
            <span>{stepError}</span>
          </div>
        )}

        {publishSuccess && (
          <div className="p-4 bg-status-confirmed/10 border border-status-confirmed/30 text-xs font-sans text-status-confirmed flex items-center gap-2.5">
            <CheckmarkCircle02Icon size={18} className="shrink-0" />
            <div>
              <p className="font-semibold">
                Election Ballot Certified &amp; Published!
              </p>
              <p className="text-[11px] opacity-90">
                Redirecting to your new live election dashboard...
              </p>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <label
                htmlFor={titleInputId}
                className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
              >
                Election Title
              </label>
              <input
                id={titleInputId}
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Faculty of Technology Executive Council Election"
                className="text-input h-11 w-full text-xs font-sans"
                required
                autoFocus
              />
            </div>

            <div>
              <label
                htmlFor={descInputId}
                className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
              >
                Description &amp; Agenda
              </label>
              <textarea
                id={descInputId}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the offices being contested, representation guidelines, and voting objectives..."
                rows={3}
                className="text-input w-full p-3 text-xs font-sans resize-none"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label
                    htmlFor={codeInputId}
                    className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground"
                  >
                    Accession Code
                  </label>
                  <button
                    type="button"
                    onClick={handleGenerateCode}
                    className="text-[11px] font-sans text-brand hover:underline cursor-pointer"
                  >
                    Generate Random
                  </button>
                </div>
                <div className="relative">
                  <input
                    id={codeInputId}
                    type="text"
                    value={accessionCode}
                    onChange={(e) =>
                      setAccessionCode(e.target.value.toUpperCase())
                    }
                    placeholder="e.g. OAU-TECH-26"
                    className="text-input h-11 w-full text-xs font-mono tracking-wider font-medium uppercase pr-9"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Ticket01Icon size={16} />
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground font-sans mt-1">
                  Voters can enter this unique accession code to find and join
                  this ballot.
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor={startInputId}
                      className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
                    >
                      Start Time
                    </label>
                    <input
                      id={startInputId}
                      type="datetime-local"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      className="text-input h-11 w-full text-xs font-sans"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor={endInputId}
                      className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
                    >
                      End Time
                    </label>
                    <input
                      id={endInputId}
                      type="datetime-local"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      className="text-input h-11 w-full text-xs font-sans"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-muted/30 border border-border/80 text-[11px] font-sans text-muted-foreground flex items-center gap-2">
                  <InformationCircleIcon
                    size={14}
                    className="text-brand shrink-0"
                  />
                  <span>
                    Status dynamically switches from <strong>Upcoming</strong>{" "}
                    to <strong>Active</strong>, and then{" "}
                    <strong>Concluded</strong> at the scheduled timestamps.
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Eligibility Rules</span>
                <ArrowRight01Icon size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-4 bg-muted/20 border border-border flex items-start gap-3">
              <LockKeyIcon size={18} className="text-brand mt-0.5 shrink-0" />
              <div>
                <h3 className="text-xs font-heading font-semibold uppercase tracking-wider text-foreground">
                  Automated Eligibility &amp; Regex Compiler
                </h3>
                <p className="text-xs font-sans text-muted-foreground mt-0.5 leading-relaxed">
                  You do not need to write regular expressions. Configure the
                  parameters below or select from presets, and the system
                  compiles the cryptographic validation pattern automatically.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor={domainInputId}
                  className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
                >
                  Institutional Domain
                </label>
                <input
                  id={domainInputId}
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. oauife.edu.ng"
                  className="text-input h-11 w-full text-xs font-sans"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor={labelInputId}
                  className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
                >
                  Friendly Domain Label
                </label>
                <input
                  id={labelInputId}
                  type="text"
                  value={domainLabel}
                  onChange={(e) => setDomainLabel(e.target.value)}
                  placeholder="e.g. Faculty of Technology (@oauife.edu.ng)"
                  className="text-input h-11 w-full text-xs font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground">
                Voter Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "institution",
                    title: "Whole Institution",
                    desc: "Open to any student/staff with an institutional email.",
                  },
                  {
                    id: "departmental",
                    title: "Department / Faculty",
                    desc: "Filter by academic departments or matric prefixes.",
                  },
                  {
                    id: "custom",
                    title: "Custom Regex",
                    desc: "Manually specify an advanced regular expression.",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() =>
                      setEligibilityScope(
                        item.id as "institution" | "departmental" | "custom",
                      )
                    }
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
                              handleRemoveDept(dept.code);
                            } else {
                              handleAddDept(dept.code);
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
                      id={customTagInputId}
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
                      onClick={() => setAllYears(!allYears)}
                      className="text-xs font-sans text-brand hover:underline cursor-pointer"
                    >
                      {allYears
                        ? "Restrict to specific years"
                        : "Allow all years"}
                    </button>
                  </div>

                  {allYears ? (
                    <p className="text-xs font-sans text-muted-foreground">
                      All academic levels (100L through 500L+) are eligible to
                      vote.
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {["2020", "2021", "2022", "2023", "2024", "2025"].map(
                        (year) => {
                          const isSel = selectedYears.includes(year);
                          return (
                            <button
                              key={year}
                              type="button"
                              onClick={() => handleToggleYear(year)}
                              className={`px-3 py-1 text-xs font-sans border cursor-pointer ${
                                isSel
                                  ? "bg-brand text-black font-bold border-brand"
                                  : "bg-muted border-border text-muted-foreground"
                              }`}
                            >
                              {year} Entry
                            </button>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {eligibilityScope === "custom" && (
              <div>
                <label
                  htmlFor={customPatternInputId}
                  className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5"
                >
                  Raw Regex Pattern
                </label>
                <input
                  id={customPatternInputId}
                  type="text"
                  value={customPattern}
                  onChange={(e) => setCustomPattern(e.target.value)}
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
                    id={testEmailInputId}
                    type="email"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
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

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn btn-secondary h-11 px-5 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft01Icon size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary h-11 px-6 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <span>Continue to Candidates &amp; Review</span>
                <ArrowRight01Icon size={16} />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
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
                onClick={() => setIsAddCandOpen(true)}
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
                    onClick={() => handleRemoveCandidate(cand.id)}
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
                  <span className="text-muted-foreground block">
                    Election Title:
                  </span>
                  <strong className="text-foreground">{title}</strong>
                </div>

                <div>
                  <span className="text-muted-foreground block">
                    Accession Code:
                  </span>
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

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setCurrentStep(2)}
                className="btn btn-secondary h-11 px-5 text-xs font-bold tracking-wider flex items-center gap-2 cursor-pointer"
              >
                <ArrowLeft01Icon size={16} />
                <span>Back</span>
              </button>

              <button
                type="button"
                disabled={isPublishing || publishSuccess}
                onClick={handlePublish}
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
        )}
      </div>

      {isAddCandOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => setIsAddCandOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-md bg-card border-2 border-border p-6 sm:p-8 relative text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsAddCandOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <Cancel01Icon size={18} />
            </button>

            <div className="mb-6 pb-4 border-b-2 border-dashed border-border">
              <div className="w-9 h-9 bg-brand/10 border border-brand/30 text-brand flex items-center justify-center mb-3">
                <Add01Icon size={18} />
              </div>
              <h2 className="text-xl font-medium font-heading text-foreground">
                Add Contestant
              </h2>
              <p className="text-muted-foreground text-xs font-sans mt-1">
                Register a qualified candidate for this election.
              </p>
            </div>

            <form onSubmit={handleAddCandidate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Full Legal Name
                </label>
                <input
                  type="text"
                  value={candName}
                  onChange={(e) => setCandName(e.target.value)}
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
                  value={candPos}
                  onChange={(e) => setCandPos(e.target.value)}
                  className="text-input h-11 w-full text-xs font-sans bg-card cursor-pointer"
                >
                  <option value="President">President</option>
                  <option value="Vice President">Vice President</option>
                  <option value="General Secretary">General Secretary</option>
                  <option value="Financial Secretary">
                    Financial Secretary
                  </option>
                  <option value="Public Relations Officer">
                    Public Relations Officer
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Academic Department
                </label>
                <input
                  type="text"
                  value={candDept}
                  onChange={(e) => setCandDept(e.target.value)}
                  placeholder="e.g. Computer Science & Engineering"
                  required
                  className="text-input h-11 w-full text-xs font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider font-heading text-muted-foreground mb-1.5">
                  Campaign Manifesto
                </label>
                <textarea
                  value={candManifesto}
                  onChange={(e) => setCandManifesto(e.target.value)}
                  placeholder="Key campaign promises or agenda..."
                  rows={3}
                  className="text-input w-full p-2.5 text-xs font-sans resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCandOpen(false)}
                  className="btn btn-secondary h-10 px-4 text-xs font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary h-10 px-5 text-xs font-bold cursor-pointer"
                >
                  Register Candidate
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
