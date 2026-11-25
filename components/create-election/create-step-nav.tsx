"use client";

interface CreateStepNavProps {
  currentStep: 1 | 2 | 3;
  onStepClick: (step: 1 | 2 | 3) => void;
}

const STEPS: { step: 1 | 2 | 3; label: string }[] = [
  { step: 1, label: "1. Ballot Details" },
  { step: 2, label: "2. Eligibility Rules" },
  { step: 3, label: "3. Launch" },
];

export function CreateStepNav({ currentStep, onStepClick }: CreateStepNavProps) {
  return (
    <div className="grid grid-cols-3 gap-2 border-y border-border py-4">
      {STEPS.map((item) => {
        const isCurrent = currentStep === item.step;
        const isPassed = currentStep > item.step;

        return (
          <button
            key={item.step}
            type="button"
            onClick={() => {
              if (isPassed) {
                onStepClick(item.step);
              }
            }}
            className={`text-left p-2 transition-all ${
              isCurrent
                ? "border-b-2 border-brand text-foreground font-semibold cursor-pointer"
                : isPassed
                  ? "text-muted-foreground hover:text-foreground border-b-2 border-status-confirmed cursor-pointer"
                  : "text-muted-foreground/40 border-b-2 border-transparent cursor-not-allowed"
            }`}
          >
            <span className="block text-[11px] font-heading uppercase tracking-wider">
              {item.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
