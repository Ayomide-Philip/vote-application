"use client";

import { useState, useSyncExternalStore } from "react";
import { ElectionHeader } from "./election-header";
import { ElectionSidebar } from "./election-sidebar";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("ballot-election-sidebar-toggle", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("ballot-election-sidebar-toggle", callback);
  };
}

function getSnapshot(): boolean {
  try {
    return localStorage.getItem("ballot_election_sidebar_collapsed") === "true";
  } catch {
    return false;
  }
}

function getServerSnapshot(): boolean {
  return false;
}

interface ElectionShellProps {
  electionId: string;
  children: React.ReactNode;
}

export function ElectionShell({ electionId, children }: ElectionShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const isCollapsed = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const handleToggleCollapse = () => {
    const next = !isCollapsed;
    try {
      localStorage.setItem("ballot_election_sidebar_collapsed", String(next));
    } catch {
      // Safe fallback
    }
    window.dispatchEvent(new Event("ballot-election-sidebar-toggle"));
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-200 site-grid-bg">
      <ElectionSidebar
        electionId={electionId}
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
      />

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isCollapsed ? "lg:pl-18" : "lg:pl-64"
        }`}
      >
        <ElectionHeader
          electionId={electionId}
          onOpenSidebar={() => setMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
