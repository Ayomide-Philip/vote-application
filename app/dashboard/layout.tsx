"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Analytics01Icon,
  Cancel01Icon,
  CheckListIcon,
  GridViewIcon,
  Logout01Icon,
  Menu01Icon,
  Notification01Icon,
  Search01Icon,
  Settings02Icon,
  Shield01Icon,
} from "hugeicons-react";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SIDEBAR_NAV: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: GridViewIcon },
  { label: "Elections", href: "/dashboard", icon: CheckListIcon },
  { label: "Voting History", href: "/dashboard#history", icon: Shield01Icon },
  { label: "Analytics & Tallies", href: "/dashboard#analytics", icon: Analytics01Icon },
  { label: "Settings & Access", href: "/dashboard#settings", icon: Settings02Icon },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-background text-foreground flex transition-colors duration-200 site-grid-bg">
      {/* 1. Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-in fade-in duration-150"
          onClick={() => setMobileSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 2. Left Sidebar Navigation (Matching Layout Structure) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r-2 border-border flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          {/* Sidebar Brand Header */}
          <div className="h-16 px-6 border-b-2 border-border flex items-center justify-between">
            <Link
              href="/dashboard"
              className="font-heading capitalize font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>ballot</span>
              <span className="text-brand">.</span>
            </Link>

            {/* Mobile close button */}
            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="lg:hidden p-1 text-muted-foreground hover:text-foreground"
              aria-label="Close sidebar"
            >
              <Cancel01Icon size={18} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1 text-left">
            {SIDEBAR_NAV.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-heading uppercase tracking-wider font-semibold transition-all ${
                    isActive
                      ? "bg-brand text-black border border-brand"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                  }`}
                >
                  <Icon size={16} className={isActive ? "text-black" : "text-subtle"} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer: User Profile Card (Matching Image Structure) */}
        <div className="p-4 border-t-2 border-border bg-muted/20">
          <div className="flex items-center justify-between gap-3 p-2 bg-card border border-border">
            <div className="flex items-center gap-2.5 min-w-0">
              {/* User Avatar Initial */}
              <div className="w-8 h-8 shrink-0 bg-brand text-black font-heading font-bold text-xs flex items-center justify-center">
                KA
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-xs font-heading font-bold text-foreground truncate">
                  Katherine Adeyemi
                </span>
                <span className="text-[10px] font-mono text-muted-foreground truncate">
                  @oauife.edu.ng
                </span>
              </div>
            </div>

            <Link
              href="/login"
              title="Sign Out"
              className="p-1.5 text-muted-foreground hover:text-brand transition-colors shrink-0"
              aria-label="Sign Out"
            >
              <Logout01Icon size={16} />
            </Link>
          </div>
        </div>
      </aside>

      {/* 3. Main Workspace Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header Bar (Matching Image Layout) */}
        <header className="h-16 bg-background/95 backdrop-blur-sm border-b-2 border-border sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
          {/* Left: Mobile Toggle & Breadcrumb / Section Context */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground border border-border"
              aria-label="Open navigation menu"
            >
              <Menu01Icon size={18} />
            </button>

            <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground hidden sm:inline">
              Institutional Ledger // Elections
            </span>
          </div>

          {/* Right: Search Bar, Notifications, Node Status & ThemeToggle */}
          <div className="flex items-center gap-3">
            {/* Search Input (Matching Search in reference image) */}
            <div className="relative hidden md:block w-64 lg:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search elections, codes..."
                className="text-input h-9 w-full text-xs !pl-9 !pr-3 font-mono"
              />
              <Search01Icon
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              />
            </div>

            {/* Notification Bell Button */}
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center border border-border text-muted-foreground hover:text-foreground bg-card transition-colors relative"
              aria-label="Notifications"
            >
              <Notification01Icon size={16} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-brand" />
            </button>

            {/* System Status Node Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-card border border-border text-[10px] font-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed animate-pulse" />
              <span>Nodes Active</span>
            </div>

            <ThemeToggle />
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
