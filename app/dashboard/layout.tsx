import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Logout01Icon,
  Shield01Icon,
} from "hugeicons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col transition-colors duration-200 site-grid-bg">
      {/* Top Authenticated Header */}
      <header className="w-full bg-background border-b-2 border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 h-16 flex items-center justify-between">
          {/* Left: Brand & Section Identity */}
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="font-heading capitalize font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity"
            >
              ballot<span className="text-brand">.</span>
            </Link>
            <div className="hidden sm:flex items-center gap-2 pl-4 border-l border-border text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
              <Shield01Icon size={14} className="text-brand" />
              <span>Voter &amp; Organizer Ledger</span>
            </div>
          </div>

          {/* Right: User Status, ThemeToggle & Actions */}
          <div className="flex items-center gap-3">
            {/* User Campus Badge */}
            <div className="hidden md:flex items-center gap-2 px-2.5 py-1 bg-muted/60 border border-border text-left">
              <div className="w-2 h-2 rounded-full bg-status-confirmed" />
              <div className="flex flex-col">
                <span className="text-xs font-heading font-medium text-foreground leading-none">
                  Katherine Adeyemi
                </span>
                <span className="text-[10px] font-mono text-muted-foreground leading-tight">
                  @oauife.edu.ng
                </span>
              </div>
            </div>

            <ThemeToggle />

            {/* Sign Out Action */}
            <Link
              href="/login"
              className="btn btn-secondary h-8 px-3 text-[11px] flex items-center gap-1.5"
              title="Sign Out of Session"
            >
              <Logout01Icon size={14} />
              <span className="hidden sm:inline">Sign Out</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 md:px-10 py-8 sm:py-10">
        {children}
      </main>

      {/* Institutional Audit Footer */}
      <footer className="w-full border-t-2 border-border bg-card py-6 text-xs font-mono text-muted-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Ballot Platform. Cryptographically certified election infrastructure.</p>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-status-confirmed animate-pulse" />
            <span>Node Network: Synchronized &amp; Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
