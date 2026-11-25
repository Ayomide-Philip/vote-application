import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight01Icon,
  CheckListIcon,
  LockKeyIcon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";

interface OverviewPageProps {
  params: Promise<{
    electionId: string;
  }>;
}

async function OverviewContent({ params }: OverviewPageProps) {
  const { electionId } = await params;
  const decodedId = decodeURIComponent(electionId);
  const basePath = `/dashboard/elections/${encodeURIComponent(decodedId)}`;

  return (
    <div className="space-y-8 text-left">
      {/* Hero Summary */}
      <div className="bg-card border border-border p-6 sm:p-8 flex flex-col lg:flex-row lg:items-start justify-between gap-6">
        <div className="space-y-3 min-w-0">
          <div className="flex flex-wrap items-center gap-2 text-xs font-sans text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-status-confirmed/30 bg-status-confirmed/10 text-status-confirmed text-[11px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed animate-pulse" />
              <span>Active</span>
            </span>
            <span className="px-2 py-0.5 border border-border bg-muted/40 text-[10px] font-mono uppercase tracking-wider text-foreground">
              Private Ballot
            </span>
            <span className="inline-flex items-center gap-1">
              <LockKeyIcon size={12} className="text-brand" />
              <span>@oauife.edu.ng</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-heading font-semibold tracking-tight text-foreground leading-tight">
            Faculty of Technology Executive Council Election
          </h1>

          <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed max-w-2xl">
            Executive leadership and departmental representative elections
            across engineering programs.
          </p>
        </div>

        <div className="border border-border bg-muted/20 px-4 py-3 space-y-1 shrink-0 lg:min-w-[200px]">
          <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
            Voting Window
          </span>
          <span className="block text-xs font-mono font-medium text-foreground">
            Nov 25 – Nov 28
          </span>
        </div>
      </div>

      {/* Navigation Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href={`${basePath}/positions`}
          className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-sans text-muted-foreground">
              Contested Positions
            </span>
            <CheckListIcon size={17} className="text-brand shrink-0" />
          </div>
          <div className="flex items-end justify-between w-full">
            <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              5
            </span>
            <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
              <span>Manage</span>
              <ArrowRight01Icon size={12} />
            </span>
          </div>
        </Link>

        <Link
          href={`${basePath}/candidates`}
          className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-sans text-muted-foreground">
              Registered Candidates
            </span>
            <UserIcon size={17} className="text-brand shrink-0" />
          </div>
          <div className="flex items-end justify-between w-full">
            <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              3
            </span>
            <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
              <span>View</span>
              <ArrowRight01Icon size={12} />
            </span>
          </div>
        </Link>

        <Link
          href={`${basePath}/voters`}
          className="group bg-card border border-border hover:border-brand/50 p-5 text-left transition-colors cursor-pointer flex flex-col justify-between gap-4"
        >
          <div className="flex items-center justify-between w-full">
            <span className="text-xs font-sans text-muted-foreground">
              Joined Voters
            </span>
            <UserGroupIcon size={17} className="text-brand shrink-0" />
          </div>
          <div className="flex items-end justify-between w-full">
            <span className="text-2xl sm:text-3xl font-heading font-semibold tabular-nums text-foreground">
              2
            </span>
            <span className="text-[11px] font-sans text-muted-foreground group-hover:text-brand transition-colors inline-flex items-center gap-1">
              <span>Roster</span>
              <ArrowRight01Icon size={12} />
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default function ElectionOverviewPage({ params }: OverviewPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-64 bg-card border border-border/60 animate-pulse" />
      }
    >
      <OverviewContent params={params} />
    </Suspense>
  );
}
