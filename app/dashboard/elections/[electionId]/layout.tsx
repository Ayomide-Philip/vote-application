import { Suspense } from "react";
import { ElectionShell } from "@/components/election-detail";

interface ElectionLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    electionId: string;
  }>;
}

async function ElectionShellWrapper({ children, params }: ElectionLayoutProps) {
  const { electionId } = await params;
  return (
    <ElectionShell electionId={decodeURIComponent(electionId)}>
      {children}
    </ElectionShell>
  );
}

export default function ElectionDetailLayout({
  children,
  params,
}: ElectionLayoutProps) {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading election workspace...
        </div>
      }
    >
      <ElectionShellWrapper params={params}>{children}</ElectionShellWrapper>
    </Suspense>
  );
}
