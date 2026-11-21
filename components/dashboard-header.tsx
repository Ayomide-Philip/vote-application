"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu01Icon, Notification01Icon, Search01Icon } from "hugeicons-react";

interface DashboardHeaderProps {
  onOpenSidebar: () => void;
}

export function DashboardHeader({ onOpenSidebar }: DashboardHeaderProps) {
  const pathname = usePathname();
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic contextual breadcrumb
  let breadcrumb = "Dashboard";
  if (pathname.startsWith("/dashboard/elections")) {
    breadcrumb = "Dashboard / Elections";
  } else if (pathname.startsWith("/dashboard/history")) {
    breadcrumb = "Dashboard / Voting History";
  } else if (pathname.startsWith("/dashboard/analytics")) {
    breadcrumb = "Dashboard / Analytics & Tallies";
  } else if (pathname.startsWith("/dashboard/settings")) {
    breadcrumb = "Dashboard / Settings & Access";
  }

  return (
    <header className="h-16 bg-background/95 backdrop-blur-sm border-b-2 border-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
      {/* Left: Mobile Sidebar Trigger & Dynamic Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 text-muted-foreground hover:text-foreground border border-border focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
          aria-label="Open navigation menu"
        >
          <Menu01Icon size={18} />
        </button>

        <span className="text-xs font-heading font-medium text-muted-foreground hidden sm:inline">
          {breadcrumb}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block w-64 lg:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search elections, codes..."
            className="text-input h-9 w-full text-xs pl-9! pr-3! font-mono focus-visible:border-brand"
          />
          <Search01Icon
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
          />
        </div>

        <button
          type="button"
          className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground bg-card transition-colors relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
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
