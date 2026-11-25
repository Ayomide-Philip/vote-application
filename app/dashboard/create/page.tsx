"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cancel01Icon, CheckmarkCircle02Icon } from "hugeicons-react";
import {
  CreateStepNav,
  StepBallotDetails,
  StepEligibilityRules,
  StepCandidatesReview,
  EmailPartRule,
  parseEmailToParts,
  compilePartsToRegex,
} from "@/components/create-election";

export default function CreateElectionPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [accessionCode, setAccessionCode] = useState("");
  const [electionType, setElectionType] = useState<"private" | "public">(
    "private",
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const [sampleEmail, setSampleEmail] = useState("");
  const [emailParts, setEmailParts] = useState<EmailPartRule[]>(() =>
    parseEmailToParts(""),
  );

  const [domainLabel, setDomainLabel] = useState("");
  const [testEmail, setTestEmail] = useState("");

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);

  const compiledRegex = compilePartsToRegex(emailParts);

  const isTestEmailEligible = (() => {
    try {
      const reg = new RegExp(compiledRegex, "i");
      return reg.test(testEmail.trim().toLowerCase());
    } catch {
      return false;
    }
  })();

  const handleSampleEmailChange = (newSample: string) => {
    setSampleEmail(newSample);
    const newParts = parseEmailToParts(newSample);
    setEmailParts(newParts);

    if (newSample.includes("@")) {
      const parts = newSample.split("@");
      setDomainLabel(parts[1] ? `@${parts[1]}` : "");
    }
  };

  const handleStep1Next = () => {
    setStepError(null);
    if (!title.trim()) {
      setStepError("Please provide an election title.");
      return;
    }
    if (!description.trim()) {
      setStepError("Please provide a description.");
      return;
    }
    if (!startTime || !endTime) {
      setStepError("Please provide both start and end times.");
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
    if (!sampleEmail.trim()) {
      setStepError("Please provide a sample email.");
      return;
    }
    setCurrentStep(3);
  };

  const handlePublish = async () => {
    setStepError(null);
    if (!accessionCode.trim()) {
      setStepError("Please provide an accession code.");
      return;
    }
    if (!startTime || !endTime) {
      setStepError("Please provide both start and end times.");
      return;
    }
    setIsPublishing(true);

    try {
      const res = await fetch("/api/election", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          election_code: accessionCode.trim(),
          email_parts: emailParts,
          domain_label:
            domainLabel.trim() || sampleEmail.split("@")[1] || "Institutional",
          start_time: new Date(startTime).toISOString(),
          end_time: new Date(endTime).toISOString(),
          election_type: electionType,
          sample_email: sampleEmail.trim().toLowerCase(),
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStepError(data.error || "Failed to publish election.");
        setIsPublishing(false);
        return;
      }

      setIsPublishing(false);
      setPublishSuccess(true);

      setTimeout(() => {
        router.push(`/dashboard/elections/${data.data.election_id}`);
      }, 1400);
    } catch {
      setStepError("Network error while publishing election.");
      setIsPublishing(false);
    }
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
            startTime={startTime}
            onStartTimeChange={setStartTime}
            endTime={endTime}
            onEndTimeChange={setEndTime}
            onNext={handleStep1Next}
          />
        )}

        {currentStep === 2 && (
          <StepEligibilityRules
            sampleEmail={sampleEmail}
            onSampleEmailChange={handleSampleEmailChange}
            domainLabel={domainLabel}
            onDomainLabelChange={setDomainLabel}
            emailParts={emailParts}
            onEmailPartsChange={setEmailParts}
            testEmail={testEmail}
            onTestEmailChange={setTestEmail}
            isTestEmailEligible={isTestEmailEligible}
            onBack={() => setCurrentStep(1)}
            onNext={handleStep2Next}
          />
        )}

        {currentStep === 3 && (
          <StepCandidatesReview
            title={title}
            accessionCode={accessionCode}
            onAccessionCodeChange={setAccessionCode}
            electionType={electionType}
            onElectionTypeChange={setElectionType}
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
    </div>
  );
}
