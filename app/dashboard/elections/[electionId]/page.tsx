import { Suspense } from "react";
import { OverviewClient } from "@/components/election-detail/overview-client";

interface OverviewPageProps {
  params: Promise<{
    electionId: string;
  }>;
}

async function OverviewContent({ params }: OverviewPageProps) {
  const { electionId } = await params;
  return <OverviewClient electionId={decodeURIComponent(electionId)} />;
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
