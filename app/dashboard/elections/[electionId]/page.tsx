import { Suspense } from "react";
import { ElectionWorkspaceClient } from "@/components/election-detail/election-workspace-client";

interface ElectionPageProps {
  params: Promise<{
    electionId: string;
  }>;
}

async function ElectionContent({ params }: ElectionPageProps) {
  const { electionId } = await params;
  return (
    <ElectionWorkspaceClient electionId={decodeURIComponent(electionId)} />
  );
}

export default function DashboardElectionDetailPage({
  params,
}: ElectionPageProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading election workspace...
        </div>
      }
    >
      <ElectionContent params={params} />
    </Suspense>
  );
}
