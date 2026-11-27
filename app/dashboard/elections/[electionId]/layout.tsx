import { Suspense } from "react";
import { ElectionNotFound, ElectionShell } from "@/components/election-detail";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getCachedUserElection } from "@/server/cache/election";

interface ElectionLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    electionId: string;
  }>;
}

function ElectionWorkspaceSkeleton() {
  return (
    <div className="min-h-screen bg-background text-foreground flex site-grid-bg">
      <aside className="hidden lg:flex w-64 shrink-0 bg-card border-r-2 border-border flex-col justify-between">
        <div>
          <div className="h-16 px-5 border-b-2 border-border flex items-center">
            <div className="h-5 w-20 bg-muted animate-pulse" />
          </div>
          <div className="px-4 py-3.5 border-b border-border/70 space-y-2">
            <div className="h-3 w-24 bg-muted animate-pulse" />
            <div className="h-8 w-full bg-muted/60 animate-pulse" />
          </div>
          <div className="p-3 space-y-2">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="h-10 w-full bg-muted/50 animate-pulse" />
            ))}
          </div>
        </div>
        <div className="p-3 border-t-2 border-border">
          <div className="h-9 w-full bg-muted/50 animate-pulse" />
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b-2 border-border bg-background/95 px-4 sm:px-8 flex items-center justify-between">
          <div className="h-4 w-40 bg-muted animate-pulse" />
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-muted animate-pulse" />
            <div className="w-9 h-9 bg-muted animate-pulse" />
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          <div className="h-20 bg-card border border-border animate-pulse" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-28 bg-card border border-border animate-pulse"
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

async function ElectionShellWrapper({ children, params }: ElectionLayoutProps) {
  const [{ electionId }, session] = await Promise.all([params, auth()]);

  if (!electionId || !session || !session.user) return redirect("/login");
  const decodedElectionId = decodeURIComponent(electionId);

  const election = await getCachedUserElection(
    decodedElectionId.trim(),
    session.user.id,
  );
  if (!election || !election.role) {
    return <ElectionNotFound electionId={decodedElectionId} />;
  }

  return (
    <ElectionShell electionId={decodedElectionId} role={election.role}>
      {children}
    </ElectionShell>
  );
}

export default function ElectionDetailLayout({
  children,
  params,
}: ElectionLayoutProps) {
  return (
    <Suspense fallback={<ElectionWorkspaceSkeleton />}>
      <ElectionShellWrapper params={params}>{children}</ElectionShellWrapper>
    </Suspense>
  );
}
