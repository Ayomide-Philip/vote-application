import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

async function AuthGuard({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session || !session.user) {
    redirect("/login");
  }

  return <>{children}</>;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={<div className="min-h-screen bg-background site-grid-bg" />}
    >
      <AuthGuard>{children}</AuthGuard>
    </Suspense>
  );
}
