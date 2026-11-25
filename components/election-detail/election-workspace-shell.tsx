"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Analytics01Icon,
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckListIcon,
  Copy01Icon,
  GridViewIcon,
  Menu01Icon,
  Settings02Icon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";
import { ElectionDetailMeta } from "./types";

export type ElectionSectionKey =
  | "overview"
  | "positions"
  | "candidates"
  | "voters"
  | "results"
  | "settings";

interface NavItem {
  key: ElectionSectionKey;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  adminOnly?: boolean;
  badge?: number;
}

interface ElectionWorkspaceShellProps {
  meta: ElectionDetailMeta;
  activeSection: ElectionSectionKey;
  onSelectSection: (section: ElectionSectionKey) => void;
  onToggleRole: (role: "admin" | "voter") => void;
  copiedCode: boolean;
  onCopyCode: () => void;
  pendingVotersCount: number;
  headerAction?: React.ReactNode;
  children: React.ReactNode;
}

export function ElectionWorkspaceShell({
  meta,
  activeSection,
  onSelectSection,
  onToggleRole,
  copiedCode,
  onCopyCode,
  pendingVotersCount,
  headerAction,
  children,
}: ElectionWorkspaceShellProps) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const isAdmin = meta.role === "admin";

  const allNavItems: NavItem[] = [
    { key: "overview", label: "Overview", icon: GridViewIcon },
    {
      key: "positions",
      label: "Positions",
      icon: CheckListIcon,
      adminOnly: true,
    },
    {
      key: "candidates",
      label: isAdmin ? "Candidates" : "Ballot & Candidates",
      icon: UserIcon,
    },
    {
      key: "voters",
      label: "Voters",
      icon: UserGroupIcon,
      adminOnly: true,
      badge: pendingVotersCount > 0 ? pendingVotersCount : undefined,
    },
    { key: "results", label: "Results & Tallies", icon: Analytics01Icon },
    {
      key: "settings",
      label: "Settings",
      icon: Settings02Icon,
      adminOnly: true,
    },
  ];

  const navItems = allNavItems.filter((item) => !item.adminOnly || isAdmin);

  const activeLabel =
    navItems.find((i) => i.key === activeSection)?.label || "Overview";

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {isMobileNavOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-in fade-in duration-150"
          onClick={() => setIsMobileNavOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Election Sidebar */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r-2 border-border flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col min-h-0">
          <div className="h-16 px-5 border-b-2 border-border flex items-center justify-between gap-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              <ArrowLeft01Icon size={15} />
              <span>Back to Dashboard</span>
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileNavOpen(false)}
              className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Close sidebar"
            >
              <Cancel01Icon size={18} />
            </button>
          </div>

          {/* Compact Election Code & Visibility Bar */}
          <div className="px-4 py-3.5 border-b border-border/70 space-y-2 bg-muted/15 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
                Accession Code
              </span>
              <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">
                {meta.visibility}
              </span>
            </div>
            <button
              type="button"
              onClick={onCopyCode}
              className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 bg-background/80 hover:bg-muted border border-border text-[11px] font-mono text-foreground transition-colors cursor-pointer relative"
              title="Copy accession code"
            >
              <span className="truncate">{meta.code}</span>
              <Copy01Icon size={12} className="text-muted-foreground shrink-0" />
              {copiedCode && (
                <span className="absolute -top-7 right-0 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold">
                  Copied
                </span>
              )}
            </button>
          </div>

          {/* Section Navigation */}
          <div className="p-3.5 space-y-2 text-left overflow-y-auto">
            <span className="block px-3 text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/70">
              {isAdmin ? "Administration" : "Voter Portal"}
            </span>
            <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.key;

              return (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.key);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 px-3.5 py-2.5 text-xs font-heading uppercase tracking-wider font-semibold transition-all cursor-pointer ${
                    isActive
                      ? "bg-brand text-black border border-brand font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                  }`}
                >
                  <span className="flex items-center gap-3 min-w-0">
                    <Icon
                      size={17}
                      className={
                        isActive
                          ? "text-black shrink-0"
                          : "text-muted-foreground shrink-0"
                      }
                    />
                    <span className="truncate">{item.label}</span>
                  </span>

                  {item.badge !== undefined && (
                    <span
                      className={`px-1.5 py-0.5 text-[10px] font-mono font-bold ${
                        isActive
                          ? "bg-black/20 text-black"
                          : "bg-brand/15 text-brand border border-brand/30"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            </nav>
          </div>
        </div>

        {/* Role Preview Switcher Footer */}
        <div className="p-3.5 border-t-2 border-border space-y-1.5 text-left">
          <span className="block text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/70">
            View Mode
          </span>
          <div className="grid grid-cols-2 border border-border bg-muted/40 p-0.5 text-[11px] font-sans">
            <button
              type="button"
              onClick={() => onToggleRole("admin")}
              className={`py-1.5 transition-colors cursor-pointer ${
                isAdmin
                  ? "bg-card text-brand font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Admin
            </button>
            <button
              type="button"
              onClick={() => {
                onToggleRole("voter");
                if (
                  activeSection === "positions" ||
                  activeSection === "voters" ||
                  activeSection === "settings"
                ) {
                  onSelectSection("candidates");
                }
              }}
              className={`py-1.5 transition-colors cursor-pointer ${
                !isAdmin
                  ? "bg-card text-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Voter
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        <header className="h-16 border-b-2 border-border bg-card/80 backdrop-blur-md sticky top-0 z-30 px-4 sm:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-2 text-muted-foreground hover:text-foreground cursor-pointer"
              aria-label="Open menu"
            >
              <Menu01Icon size={20} />
            </button>
            <h1 className="text-sm sm:text-base font-heading font-semibold uppercase tracking-wider text-foreground truncate">
              {activeLabel}
            </h1>
            <span
              className={`hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 border text-[11px] font-sans font-medium ${
                meta.status === "Active"
                  ? "bg-status-confirmed/10 text-status-confirmed border-status-confirmed/30"
                  : meta.status === "Upcoming"
                    ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                    : "bg-muted text-muted-foreground border-border"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  meta.status === "Active"
                    ? "bg-status-confirmed animate-pulse"
                    : meta.status === "Upcoming"
                      ? "bg-amber-400"
                      : "bg-muted-foreground"
                }`}
              />
              <span>{meta.status}</span>
            </span>
          </div>

          {headerAction && <div className="shrink-0">{headerAction}</div>}
        </header>

        <main className="flex-1 p-5 sm:p-8 lg:p-10">
          <div className="max-w-6xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
