import { FileValidationIcon, LockKeyIcon, Shield01Icon } from "hugeicons-react";

interface StepItem {
  step: string;
  category: string;
  title: string;
  description: string;
  ledgerLabel: string;
  ledgerValue: string;
  valueColorClass: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const STEPS: StepItem[] = [
  {
    step: "01",
    category: "DOMAIN ACCESS",
    title: "Verify your school email domain",
    description:
      "Enter the election code and sign in with your official school email. The platform checks whether your domain matches the election rules, such as @oauife.edu.ng, to grant access to the ballot.",
    ledgerLabel: "Domain Check",
    ledgerValue: "@oauife.edu.ng (Authorized)",
    valueColorClass: "text-brand font-mono font-medium",
    icon: Shield01Icon,
  },
  {
    step: "02",
    category: "SECRET BALLOT",
    title: "Cast an anonymous vote",
    description:
      "Review candidate profiles, manifestos, and contest questions. When you submit, the platform logs that you voted, then separates your identity from your candidate choices before storing the ballot.",
    ledgerLabel: "Voter Privacy",
    ledgerValue: "Identity Unlinked",
    valueColorClass: "text-brand font-mono font-medium",
    icon: LockKeyIcon,
  },
  {
    step: "03",
    category: "AUDIT RECEIPT",
    title: "Download your voting receipt",
    description:
      "You receive a cryptographic receipt code. You can use this code on the public verification tool to confirm your ballot sits in the final tally, without showing anyone who you voted for.",
    ledgerLabel: "Audit Hash",
    ledgerValue: "8f94a2b1...c78e",
    valueColorClass: "text-brand font-mono font-bold",
    icon: FileValidationIcon,
  },
];

export function HowItWorksSection() {
  return (
    <section className="relative w-full border-t-2 border-border py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centralized */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium font-heading tracking-tight text-foreground leading-[1.15]">
            Three steps from sign-in to verified result
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed mt-4 max-w-xl text-center">
            How Ballot enforces domain security, voter privacy, and auditable
            counting.
          </p>
        </div>

        {/* 3-Step Contiguous Stepped Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-border bg-card divide-y-2 md:divide-y-0 md:divide-x-2 divide-border">
          {STEPS.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                className="p-6 sm:p-8 flex flex-col justify-between transition-colors hover:bg-muted/30"
              >
                <div>
                  {/* Step Header with Chronological Numbering */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60">
                    <span className="font-mono text-xs font-bold text-brand tracking-wider">
                      STEP {step.step} · {step.category}
                    </span>
                    <Icon size={18} className="text-brand shrink-0" />
                  </div>

                  {/* Step Title: 2 lines max, Satoshi font-medium */}
                  <h3 className="text-lg sm:text-xl font-medium font-heading text-foreground mb-3 leading-snug">
                    {step.title}
                  </h3>

                  {/* Step Description: DM Sans regular */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Grounded Technical Ledger Anchor */}
                <div className="mt-8 pt-4 border-t border-dashed border-border flex items-center justify-between text-xs">
                  <span className="text-subtle font-mono">
                    {step.ledgerLabel}:
                  </span>
                  <span className={step.valueColorClass}>
                    {step.ledgerValue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
