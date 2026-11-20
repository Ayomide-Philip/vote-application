import { LockKeyIcon } from "hugeicons-react";

interface ReceiptRowProps {
  label: string;
  value: React.ReactNode;
}

function ReceiptRow({ label, value }: ReceiptRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-4 sm:py-5 lg:py-5.5 border-b border-border/50 font-mono text-xs">
      <span className="text-muted-foreground uppercase tracking-wider text-[11px] sm:text-xs shrink-0">
        {label}
      </span>
      <span className="text-right truncate">{value}</span>
    </div>
  );
}

export function HeroReceiptPreview() {
  return (
    <div className="w-full max-w-md mx-auto lg:max-w-none">
      {/* Crisp 0px Geometry Editorial Ledger Slip - Stretched Height */}
      <div className="receipt-card bg-card border-2 border-border p-6 sm:p-7 lg:p-8 relative transition-colors">
        {/* Top Ledger Accession Header */}
        <div className="flex items-start sm:items-center justify-between pb-5 mb-6 sm:mb-7 border-b-2 border-dashed border-border gap-2">
          <div>
            <div className="text-[11px] font-mono tracking-widest text-muted-foreground uppercase mb-1">
              OFFICIAL LEDGER SLIP
            </div>
            <h3 className="text-base sm:text-lg font-medium font-heading text-foreground leading-snug">
              Certified Voting Receipt
            </h3>
          </div>
          <span className="badge badge-confirmed text-[10px] sm:text-xs py-0.5 shrink-0">
            <span className="badge-dot" />
            RECORDED
          </span>
        </div>

        {/* Ledger Metadata Rows (Stretched Spacing & High-Contrast) */}
        <div>
          <ReceiptRow
            label="Election Code"
            value={
              <span className="font-semibold text-foreground text-sm">
                OAU-ENG-24
              </span>
            }
          />
          <ReceiptRow
            label="Contest Title"
            value={
              <span className="text-foreground font-medium max-w-45 sm:max-w-55 truncate inline-block align-bottom">
                Faculty Executive Board
              </span>
            }
          />
          <ReceiptRow
            label="Domain Gate"
            value={
              <span className="text-brand font-medium">@oauife.edu.ng</span>
            }
          />
          <ReceiptRow
            label="Voter Privacy"
            value={
              <span className="text-status-confirmed flex items-center gap-1 font-medium justify-end">
                <LockKeyIcon size={13} className="shrink-0" />
                <span>Identity Unlinked</span>
              </span>
            }
          />
          <ReceiptRow
            label="Audit Hash"
            value={
              <span className="text-brand font-semibold tracking-tight">
                8f94a2b1...e78b20
              </span>
            }
          />
        </div>
      </div>
    </div>
  );
}
