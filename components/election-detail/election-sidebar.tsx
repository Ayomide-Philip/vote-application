"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Analytics01Icon,
  ArrowLeft01Icon,
  Cancel01Icon,
  CheckListIcon,
  Copy01Icon,
  GridViewIcon,
  Settings02Icon,
  UserGroupIcon,
  UserIcon,
} from "hugeicons-react";

interface ElectionSidebarProps {
  electionId: string;
  isOpen?: boolean;
  onClose?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function ElectionSidebar({
  electionId,
  isOpen = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
}: ElectionSidebarProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const basePath = `/dashboard/elections/${encodeURIComponent(electionId)}`;
  const displayCode =
    electionId.length <= 25 ? electionId.toUpperCase() : "ELECTION";

  const navItems = [
    { label: "Overview", href: basePath, icon: GridViewIcon, exact: true },
    {
      label: "Positions",
      href: `${basePath}/positions`,
      icon: CheckListIcon,
    },
    {
      label: "Candidates",
      href: `${basePath}/candidates`,
      icon: UserIcon,
    },
    {
      label: "Voters",
      href: `${basePath}/voters`,
      icon: UserGroupIcon,
    },
    {
      label: "Results",
      href: `${basePath}/results`,
      icon: Analytics01Icon,
    },
    {
      label: "Settings",
      href: `${basePath}/settings`,
      icon: Settings02Icon,
    },
  ];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(displayCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden animate-in fade-in duration-150"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-card border-r-2 border-border flex flex-col justify-between transition-all duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isCollapsed ? "lg:w-18" : "lg:w-64"} w-64`}
      >
        <div className="flex flex-col min-h-0">
          {/* Brand & Collapse Header */}
          <div
            className={`h-16 border-b-2 border-border flex items-center ${
              isCollapsed ? "px-0 justify-center" : "px-5 justify-between"
            }`}
          >
            {isCollapsed ? (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="w-10 h-10 flex items-center justify-center cursor-pointer text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors font-heading font-bold text-xl"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                B<span className="text-brand">.</span>
              </button>
            ) : (
              <>
                <Link
                  href="/dashboard"
                  className="font-heading font-bold text-xl tracking-tight text-foreground hover:opacity-90 transition-opacity flex items-center"
                >
                  ballot<span className="text-brand">.</span>
                </Link>

                <div className="flex items-center gap-1">
                  {onToggleCollapse && (
                    <button
                      type="button"
                      onClick={onToggleCollapse}
                      className="hidden lg:flex p-1.5 cursor-pointer text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors"
                      aria-label="Collapse sidebar"
                      title="Collapse sidebar"
                    >
                      <ArrowLeft01Icon size={16} />
                    </button>
                  )}

                  {onClose && (
                    <button
                      type="button"
                      onClick={onClose}
                      className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground cursor-pointer"
                      aria-label="Close sidebar"
                    >
                      <Cancel01Icon size={18} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Election Context Pill */}
          {isCollapsed ? (
            <div className="py-3 border-b border-border/70 flex justify-center">
              <button
                type="button"
                onClick={handleCopyCode}
                className="w-10 h-10 flex items-center justify-center bg-muted/30 hover:bg-muted border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer relative"
                title={`Copy ${displayCode}`}
                aria-label="Copy election code"
              >
                <Copy01Icon size={15} />
                {copied && (
                  <span className="absolute left-full ml-2 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold whitespace-nowrap z-50">
                    Copied
                  </span>
                )}
              </button>
            </div>
          ) : (
            <div className="px-4 py-3.5 border-b border-border/70 bg-muted/15 space-y-2 text-left">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground">
                  Election Code
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-sans font-medium text-status-confirmed">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-confirmed animate-pulse" />
                  <span>Active</span>
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="w-full flex items-center justify-between gap-2 px-2.5 py-1.5 bg-background/80 hover:bg-muted border border-border text-[11px] font-mono text-foreground transition-colors cursor-pointer relative"
                title="Copy election code"
              >
                <span className="truncate">{displayCode}</span>
                <Copy01Icon
                  size={12}
                  className="text-muted-foreground shrink-0"
                />
                {copied && (
                  <span className="absolute -top-7 right-0 px-2 py-0.5 bg-foreground text-background font-sans text-[10px] font-bold">
                    Copied
                  </span>
                )}
              </button>
            </div>
          )}

          {/* Route Navigation */}
          <div className="p-3 space-y-2 overflow-y-auto">
            {!isCollapsed && (
              <span className="block px-3.5 pt-1 text-[10px] font-heading font-bold uppercase tracking-wider text-muted-foreground/60 text-left">
                Ballot Menu
              </span>
            )}
            <nav
              className={`space-y-1.5 ${
                isCollapsed ? "flex flex-col items-center" : "text-left"
              }`}
            >
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = item.exact
                  ? pathname === item.href
                  : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    title={isCollapsed ? item.label : undefined}
                    className={`flex items-center text-xs font-heading uppercase tracking-wider font-semibold transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
                      isCollapsed
                        ? "w-10 h-10 justify-center"
                        : "w-full gap-3 px-3.5 py-2.5"
                    } ${
                      isActive
                        ? "bg-brand text-black border border-brand font-bold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        isActive
                          ? "text-black shrink-0"
                          : "text-muted-foreground shrink-0"
                      }
                    />
                    {!isCollapsed && (
                      <span className="truncate">{item.label}</span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Back to Dashboard Footer */}
        <div className="p-3 border-t-2 border-border">
          <Link
            href="/dashboard"
            onClick={onClose}
            title={isCollapsed ? "Back to Dashboard" : undefined}
            className={`flex items-center text-xs font-heading uppercase tracking-wider font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent hover:border-border transition-colors cursor-pointer ${
              isCollapsed
                ? "w-10 h-10 justify-center mx-auto"
                : "w-full gap-2.5 px-3 py-2.5"
            }`}
          >
            <ArrowLeft01Icon size={16} className="shrink-0" />
            {!isCollapsed && <span>Back to Dashboard</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
