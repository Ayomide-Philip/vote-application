"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cancel01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import {
  CreateStepNav,
  StepBallotDetails,
  StepEligibilityRules,
  StepCandidatesReview,
  AddContestantModal,
  InitialCandidate,
  EligibilityScope,
} from "@/components/create-election";

export default function CreateElectionPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accessionCode, setAccessionCode] = useState("OAU-TECH-26");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [domain, setDomain] = useState("oauife.edu.ng");
  const [domainLabel, setDomainLabel] = useState(
    "Faculty of Technology (@oauife.edu.ng)",
  );
  const [eligibilityScope, setEligibilityScope] =
    useState<EligibilityScope>("departmental");
  const [selectedDepts, setSelectedDepts] = useState<string[]>([
    "csc",
    "eee",
    "mee",
  ]);
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

  const handleToggleYear = (year: string) => {
    setSelectedYears((prev) =>
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year],
    );
  };

  const handleAddCandidate = (candidateData: Omit<InitialCandidate, "id">) => {
    const newCand: InitialCandidate = {
      id: `c-${Date.now()}`,
      ...candidateData,
    };
    setCandidates((prev) => [...prev, newCand]);
  };

  const handleRemoveCandidate = (id: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== id));
  };

  const handleStep1Next = () => {
    setStepError(null);
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
  };

  const handleStep2Next = () => {
    setStepError(null);
    if (!domain.trim()) {
      setStepError("Please specify the institutional domain.");
      return;
    }
    if (eligibilityScope === "departmental" && selectedDepts.length === 0) {
      setStepError("Please select at least one department code.");
      return;
    }
    setCurrentStep(3);
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
    <div className="max-w-4xl mx-auto my-10 space-y-6 text-left">
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

        <CreateStepNav
          currentStep={currentStep}
          onStepClick={(s) => setCurrentStep(s)}
        />

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
          <StepBallotDetails
            title={title}
            onTitleChange={setTitle}
            description={description}
            onDescriptionChange={setDescription}
            accessionCode={accessionCode}
            onAccessionCodeChange={setAccessionCode}
            onGenerateCode={handleGenerateCode}
            startTime={startTime}
            onStartTimeChange={setStartTime}
            endTime={endTime}
            onEndTimeChange={setEndTime}
            onNext={handleStep1Next}
          />
        )}

        {currentStep === 2 && (
          <StepEligibilityRules
            domain={domain}
            onDomainChange={setDomain}
            domainLabel={domainLabel}
            onDomainLabelChange={setDomainLabel}
            eligibilityScope={eligibilityScope}
            onEligibilityScopeChange={setEligibilityScope}
            selectedDepts={selectedDepts}
            onAddDept={handleAddDept}
            onRemoveDept={handleRemoveDept}
            allYears={allYears}
            onAllYearsChange={setAllYears}
            selectedYears={selectedYears}
            onToggleYear={handleToggleYear}
            customPattern={customPattern}
            onCustomPatternChange={setCustomPattern}
            compiledRegex={compiledRegex}
            testEmail={testEmail}
            onTestEmailChange={setTestEmail}
            isTestEmailEligible={isTestEmailEligible}
            onBack={() => setCurrentStep(1)}
            onNext={handleStep2Next}
          />
        )}

        {currentStep === 3 && (
          <StepCandidatesReview
            candidates={candidates}
            onOpenAddModal={() => setIsAddCandOpen(true)}
            onRemoveCandidate={handleRemoveCandidate}
            title={title}
            accessionCode={accessionCode}
            domainLabel={domainLabel}
            startTime={startTime}
            endTime={endTime}
            isPublishing={isPublishing}
            publishSuccess={publishSuccess}
            onBack={() => setCurrentStep(2)}
            onPublish={handlePublish}
          />
        )}
      </div>

      <AddContestantModal
        isOpen={isAddCandOpen}
        onClose={() => setIsAddCandOpen(false)}
        onAddCandidate={handleAddCandidate}
      />
    </div>
  );
}
