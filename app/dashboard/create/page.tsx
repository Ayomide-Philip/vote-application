"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { gooeyToast } from "goey-toast";
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
    "public",
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
    if (!title.trim()) {
      gooeyToast.error("Please provide an election title.");
      return;
    }
    if (!description.trim()) {
      gooeyToast.error("Please provide a description.");
      return;
    }
    if (!startTime || !endTime) {
      gooeyToast.error("Please provide both start and end times.");
      return;
    }
    if (new Date(endTime) <= new Date(startTime)) {
      gooeyToast.error("End time must be after the start time.");
      return;
    }
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!sampleEmail.trim()) {
      gooeyToast.error("Please provide a sample email.");
      return;
    }
    setCurrentStep(3);
  };

  const handlePublish = async () => {
    if (!accessionCode.trim()) {
      gooeyToast.error("Please provide an accession code.");
      return;
    }
    if (!startTime || !endTime) {
      gooeyToast.error("Please provide both start and end times.");
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
        gooeyToast.error(data.error || "Failed to publish election.");
        setIsPublishing(false);
        return;
      }

      setIsPublishing(false);
      setPublishSuccess(true);
      gooeyToast.success("Election Ballot Certified & Published!", {
        description: "Redirecting to your new live election dashboard...",
      });

      setTimeout(() => {
        router.push(`/dashboard/elections/${data.data.election_id}`);
      }, 1400);
    } catch {
      gooeyToast.error("Network error while publishing election.");
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
