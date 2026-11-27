"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu01Icon, Notification01Icon } from "hugeicons-react";

interface ElectionHeaderProps {
  electionId: string;
  onOpenSidebar: () => void;
}

const SECTION_LABELS: Record<string, string> = {
  positions: "Positions",
  candidates: "Candidates",
  ballot: "Ballot",
  voters: "Voters",
  results: "Results",
  settings: "Settings",
};

export function ElectionHeader({
  electionId,
  onOpenSidebar,
}: ElectionHeaderProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/elections/${encodeURIComponent(electionId)}`;

  const segment = pathname.startsWith(basePath)
    ? pathname.slice(basePath.length).replace(/^\//, "").split("/")[0]
    : "";

  const currentSection = segment
    ? SECTION_LABELS[segment] || segment
    : "Overview";

  return (
    <header className="h-16 bg-background/95 backdrop-blur-sm border-b-2 border-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 min-w-0">
        <button
          type="button"
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground border border-border cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
          aria-label="Open navigation menu"
        >
          <Menu01Icon size={18} />
        </button>

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-xs font-heading font-medium text-muted-foreground min-w-0"
        >
          <Link
            href="/dashboard"
            className="hidden sm:inline hover:text-foreground transition-colors cursor-pointer"
          >
            Dashboard
          </Link>
          <span className="hidden sm:inline text-border">/</span>
          <Link
            href={basePath}
            className="hidden sm:inline hover:text-foreground transition-colors cursor-pointer"
          >
            Election
          </Link>
          <span className="hidden sm:inline text-border">/</span>
          <span className="text-foreground font-semibold truncate">
            {currentSection}
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground bg-card transition-colors relative cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
          aria-label="Notifications"
        >
          <Notification01Icon size={16} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand" />
        </button>

        <ThemeToggle />
      </div>
    </header>
  );
}
