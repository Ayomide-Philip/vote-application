import {
  Analytics01Icon,
  LockKeyIcon,
  Shield01Icon,
  UserCheck01Icon,
} from "hugeicons-react";

interface GuaranteeItem {
  category: string;
  title: string;
  description: string;
  technicalAnchor: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const GUARANTEES: GuaranteeItem[] = [
  {
    category: "DOMAIN ACCESS",
    title: "Strict domain gating",
    description:
      "Election creators decide exactly which email domains can participate. Personal addresses like @gmail.com or @yahoo.com are rejected automatically.",
    technicalAnchor: "Enforced at API gateway",
    icon: Shield01Icon,
  },
  {
    category: "DUPLICATE PREVENTION",
    title: "Exactly one vote per person",
    description:
      "The database tracks which accounts have cast a vote. Once your ballot is recorded, your voting token is retired immediately.",
    technicalAnchor: "ACID unique database constraints",
    icon: UserCheck01Icon,
  },
  {
    category: "VOTER PRIVACY",
    title: "Secret ballots by design",
    description:
      "Your name is never attached to your choices. Administrators can see who voted and the final totals, but they cannot connect a voter to a candidate.",
    technicalAnchor: "Decoupled cryptographic records",
    icon: LockKeyIcon,
  },
  {
    category: "TALLY AUTOMATION",
    title: "Live tallies when polls close",
    description:
      "Results compute automatically the second voting ends. No manual recounts, no midnight tally sessions.",
    technicalAnchor: "Instant automated aggregation",
    icon: Analytics01Icon,
  },
];

export function GuaranteesSection() {
  return (
    <section id="guarantees" className="relative w-full border-t-2 border-border py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header: Centralized as requested */}
        <div className="max-w-2xl mx-auto text-center mb-12 sm:mb-14 flex flex-col items-center">
          <h2 className="text-3xl sm:text-4xl lg:text-[2.6rem] font-medium font-heading tracking-tight text-foreground leading-[1.15]">
            Built for impartial elections
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg font-normal leading-relaxed mt-4 max-w-xl text-center">
            Four architectural safeguards enforced directly at the database and network level.
          </p>
        </div>

        {/* 2x2 Contiguous Ledger Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-2 border-border bg-card divide-y-2 md:divide-y-0 divide-border">
          {GUARANTEES.map((guarantee, index) => {
            const Icon = guarantee.icon;
            // Border classes for clean 2x2 grid lines on desktop
            const borderClasses =
              index % 2 === 0
                ? "md:border-r-2 md:border-border"
                : "";
            const rowBorderClasses =
              index < 2
                ? "md:border-b-2 md:border-border"
                : "";

            return (
              <div
                key={guarantee.category}
                className={`p-6 sm:p-8 lg:p-10 flex flex-col justify-between transition-colors hover:bg-muted/30 ${borderClasses} ${rowBorderClasses}`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-border/60">
                    <span className="font-mono text-xs font-bold text-subtle tracking-wider uppercase">
                      {guarantee.category}
                    </span>
                    <Icon size={18} className="text-brand shrink-0" />
                  </div>

                  {/* Title: Satoshi font-medium */}
                  <h3 className="text-xl sm:text-2xl font-medium font-heading text-foreground mb-3 leading-snug">
                    {guarantee.title}
                  </h3>

                  {/* Description: DM Sans regular */}
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    {guarantee.description}
                  </p>
                </div>

                {/* Technical Ledger Anchor */}
                <div className="mt-8 pt-4 border-t border-dashed border-border flex items-center justify-between text-xs font-mono">
                  <span className="text-subtle">Security Policy:</span>
                  <span className="text-brand font-medium">
                    {guarantee.technicalAnchor}
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
