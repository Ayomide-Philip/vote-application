import { Suspense } from "react";

interface SettingsPageProps {
  params: Promise<{
    electionId: string;
  }>;
}

async function SettingsContent({ params }: SettingsPageProps) {
  const { electionId } = await params;
  const decodedId = decodeURIComponent(electionId);

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
          Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
          Ballot configuration and eligibility access rules.
        </p>
      </div>

      <div className="border border-border bg-card text-xs font-sans">
        <div className="px-5 py-3.5 border-b border-border bg-muted/20">
          <h2 className="text-xs font-heading font-bold uppercase tracking-wider text-foreground">
            Configuration &amp; Access Rules
          </h2>
        </div>
        <div className="divide-y divide-border/60">
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground">Election ID</span>
            <span className="font-mono text-foreground break-all">
              {decodedId}
            </span>
          </div>
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground">Visibility</span>
            <span className="text-foreground">Private</span>
          </div>
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground">Domain Scope</span>
            <span className="font-mono text-foreground">@oauife.edu.ng</span>
          </div>
          <div className="px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
            <span className="text-muted-foreground">Schedule</span>
            <span className="text-foreground">Nov 25 – Nov 28</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ElectionSettingsPage({ params }: SettingsPageProps) {
  return (
    <Suspense
      fallback={
        <div className="h-48 bg-card border border-border/60 animate-pulse" />
      }
    >
      <SettingsContent params={params} />
    </Suspense>
  );
}
