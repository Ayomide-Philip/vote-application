import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Alert02Icon, ArrowLeft01Icon, Home01Icon } from "hugeicons-react";

interface ElectionNotFoundProps {
  electionId?: string;
  title?: string;
  message?: string;
}

export function ElectionNotFound({
  electionId,
  title = "Election not found",
  message = "This election does not exist, may have been removed, or your account does not have permission to access it.",
}: ElectionNotFoundProps) {
  return (
    <div className="min-h-screen bg-background text-foreground site-grid-bg flex flex-col">
      <header className="h-16 border-b-2 border-border bg-background/95 px-4 sm:px-8 flex items-center justify-between">
        <Link
          href="/dashboard"
          className="font-mono text-sm font-bold tracking-widest uppercase text-foreground hover:text-amber-500 transition-colors"
        >
          Ballot
        </Link>
        <ThemeToggle />
      </header>

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-lg bg-card border-2 border-border p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between gap-4 border-b border-border pb-4">
            <span className="inline-flex items-center gap-2 px-2.5 py-1 border border-rose-500/40 bg-rose-500/10 text-rose-500 font-mono text-xs font-semibold tracking-wider uppercase">
              <Alert02Icon className="w-3.5 h-3.5" />
              Error 404 • Not Found
            </span>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              HTTP 404
            </span>
          </div>

          <div className="space-y-3">
            <div className="font-mono text-5xl sm:text-6xl font-bold tracking-tight text-foreground">
              404
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {message}
            </p>
          </div>

          {electionId && (
            <div className="bg-muted/60 border border-border px-3.5 py-2.5 space-y-1">
              <div className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                Requested Election ID
              </div>
              <div className="font-mono text-xs text-foreground break-all">
                {electionId}
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link
              href="/dashboard"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-semibold text-sm transition-colors"
            >
              <ArrowLeft01Icon className="w-4 h-4" />
              Back to Dashboard
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-border bg-background hover:bg-muted text-foreground font-semibold text-sm transition-colors"
            >
              <Home01Icon className="w-4 h-4" />
              Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
