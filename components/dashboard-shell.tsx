"use client";

import { useState } from "react";
import {
  DashboardSidebar,
  DashboardUserProps,
} from "@/components/dashboard-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";

interface DashboardShellProps {
  children: React.ReactNode;
  user?: DashboardUserProps;
}

export function DashboardShell({ children, user }: DashboardShellProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-200 site-grid-bg">
      <DashboardSidebar
        isOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
        user={user}
      />

      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <DashboardHeader onOpenSidebar={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
