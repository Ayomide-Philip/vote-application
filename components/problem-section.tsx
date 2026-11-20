import { Alert01Icon, Clock01Icon, Invoice01Icon } from "hugeicons-react";

interface ProblemItem {
  category: string;
  title: string;
  description: string;
  realityLabel: string;
  realityValue: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const PROBLEMS: ProblemItem[] = [
  {
    category: "Voter Participation",
    title: "Long queues and lost time",
    description:
      "Students spend hours waiting at polling booths between classes. Turnout drops when voting takes more than five minutes.",
    realityLabel: "Physical voting",
    realityValue: "Class schedule conflicts",
    icon: Clock01Icon,
  },
  {
    category: "Tally Verification",
    title: "Disputed counts and accusations",
    description:
      "Hand-counted paper slips invite allegations of box stuffing and spoiled ballots. Arguments often delay results for days.",
    realityLabel: "Physical voting",
    realityValue: "Unverified paper boxes",
    icon: Alert01Icon,
  },
  {
    category: "Union Resources",
    title: "Printing and logistics costs",
    description:
      "Printing thousands of serialized ballots, securing physical boxes, and staffing tables drains union budgets.",
    realityLabel: "Physical voting",
    realityValue: "Budget spent on paper reams",
    icon: Invoice01Icon,
  },
];

export function ProblemSection() {
  return (
    <section className="relative w-full border-t-2 border-border py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centralized */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium font-heading tracking-tight text-foreground leading-[1.15]">
            Why paper elections fail on campus
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed mt-4 max-w-xl text-center">
            Paper ballots create friction for election committees and distrust among voters.
          </p>
        </div>

        {/* 3-Column Editorial Comparison Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-border bg-card divide-y-2 md:divide-y-0 md:divide-x-2 divide-border">
          {PROBLEMS.map((problem) => {
            const Icon = problem.icon;
            return (
              <div
                key={problem.category}
                className="p-6 sm:p-8 flex flex-col justify-between transition-colors hover:bg-muted/30"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60">
                    <span className="text-xs font-medium font-heading tracking-wider uppercase text-subtle">
                      {problem.category}
                    </span>
                    <Icon size={18} className="text-brand shrink-0" />
                  </div>

                  {/* Title: 2 lines max, Satoshi font-medium */}
                  <h3 className="text-lg sm:text-xl font-medium font-heading text-foreground mb-3 leading-snug">
                    {problem.title}
                  </h3>

                  {/* Description: DM Sans regular */}
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {problem.description}
                  </p>
                </div>

                {/* Grounded Comparison Strip (No fake numbers) */}
                <div className="mt-8 pt-4 border-t border-dashed border-border flex items-center justify-between text-xs">
                  <span className="text-subtle font-normal">{problem.realityLabel}:</span>
                  <span className="text-status-rejected font-medium">{problem.realityValue}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
