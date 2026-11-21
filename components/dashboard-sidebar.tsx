"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Analytics01Icon,
  Cancel01Icon,
  CheckListIcon,
  GridViewIcon,
  Logout01Icon,
  Settings02Icon,
  Shield01Icon,
} from "hugeicons-react";

export interface DashboardUserProps {
  name?: string;
  email?: string;
  initials?: string;
}

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const SIDEBAR_NAV: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: GridViewIcon },
  { label: "Elections", href: "/dashboard/elections", icon: CheckListIcon },
  { label: "Voting History", href: "/dashboard/history", icon: Shield01Icon },
  {
    label: "Analytics & Tallies",
    href: "/dashboard/analytics",
    icon: Analytics01Icon,
  },
  {
    label: "Settings & Access",
    href: "/dashboard/settings",
    icon: Settings02Icon,
  },
];

interface DashboardSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  user?: DashboardUserProps;
}

export function DashboardSidebar({
  isOpen = false,
  onClose,
  user = {
    name: "Katherine Adeyemi",
    email: "@oauife.edu.ng",
    initials: "KA",
  },
}: DashboardSidebarProps) {
  const pathname = usePathname();

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
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-card border-r-2 border-border flex flex-col justify-between transition-transform duration-200 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col">
          <div className="h-16 px-6 border-b-2 border-border flex items-center justify-between">
            <Link
              href="/dashboard"
              className="font-heading capitalize font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span>ballot</span>
              <span className="text-brand">.</span>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground border border-transparent hover:border-border transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
                aria-label="Close sidebar"
              >
                <Cancel01Icon size={18} />
              </button>
            )}
          </div>

          <nav className="p-4 space-y-1.5 text-left">
            {SIDEBAR_NAV.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`group flex items-center gap-3 px-3.5 py-2.5 text-xs font-heading uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
                    isActive
                      ? "bg-brand text-black border border-brand shadow-sm font-bold"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40 border border-transparent"
                  }`}
                >
                  <Icon
                    size={16}
                    className={
                      isActive
                        ? "text-black"
                        : "text-muted-foreground group-hover:text-foreground transition-colors"
                    }
                  />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t-2 border-border bg-muted/20">
          <div className="flex items-center justify-between gap-3 p-2.5 bg-card border border-border">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 shrink-0 bg-brand text-black font-heading font-bold text-xs flex items-center justify-center">
                {user.initials || "KA"}
              </div>
              <div className="flex flex-col min-w-0 text-left">
                <span className="text-xs font-heading font-bold text-foreground truncate">
                  {user.name || "Katherine Adeyemi"}
                </span>
                <span className="text-[10px] font-mono text-muted-foreground truncate">
                  {user.email || "@oauife.edu.ng"}
                </span>
              </div>
            </div>

            <Link
              href="/login"
              title="Sign Out"
              className="p-1.5 text-muted-foreground hover:text-brand transition-colors shrink-0 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand"
              aria-label="Sign Out"
            >
              <Logout01Icon size={16} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
