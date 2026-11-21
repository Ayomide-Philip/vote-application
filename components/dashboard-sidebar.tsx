"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Analytics01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
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
  role?: string;
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
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  user?: DashboardUserProps;
}

export function DashboardSidebar({
  isOpen = false,
  onClose,
  isCollapsed = false,
  onToggleCollapse,
  user = {
    name: "Katherine Adeyemi",
    email: "k.adeyemi@oauife.edu.ng",
    role: "Election Administrator",
    initials: "KA",
  },
}: DashboardSidebarProps) {
  const pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsUserMenuOpen(false);
      }
    }

    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isUserMenuOpen]);

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
        } ${isCollapsed ? "lg:w-[72px]" : "lg:w-64"} w-64`}
      >
        <div className="flex flex-col">
          <div
            className={`h-16 border-b-2 border-border flex items-center ${
              isCollapsed ? "px-0 justify-center" : "px-5 justify-between"
            }`}
          >
            {isCollapsed ? (
              <button
                type="button"
                onClick={onToggleCollapse}
                className="w-10 h-10 flex items-center justify-center text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors font-heading font-bold text-xl"
                aria-label="Expand sidebar"
                title="Expand sidebar"
              >
                b<span className="text-brand">.</span>
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
                      className="hidden lg:flex p-1.5 text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent hover:border-border transition-colors"
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
                      className="lg:hidden p-1.5 text-muted-foreground hover:text-foreground"
                      aria-label="Close sidebar"
                    >
                      <Cancel01Icon size={18} />
                    </button>
                  )}
                </div>
              </>
            )}
          </div>

          <nav
            className={`p-3 space-y-1.5 ${isCollapsed ? "flex flex-col items-center" : "text-left"}`}
          >
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
                  title={isCollapsed ? item.label : undefined}
                  className={`flex items-center text-xs font-heading uppercase tracking-wider font-semibold transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
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

        <div ref={userMenuRef} className="p-3 border-t-2 border-border relative">
          {isUserMenuOpen && (
            <div
              className={`absolute bg-card border-2 border-border p-2 shadow-2xl z-50 ${
                isCollapsed
                  ? "left-full bottom-0 ml-2 w-60"
                  : "left-3 right-3 bottom-full mb-2"
              }`}
            >
              <div className="px-2.5 py-2 border-b border-border text-left">
                <p className="text-xs font-heading font-bold text-foreground truncate">
                  {user.name}
                </p>
                <p className="text-[10px] font-mono text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="mt-1 inline-block px-1.5 py-0.5 bg-brand/10 border border-brand/30 text-[9px] font-mono font-medium text-brand uppercase tracking-wider">
                  {user.role || "Administrator"}
                </div>
              </div>

              <div className="py-1 space-y-0.5 text-left">
                <Link
                  href="/dashboard/settings"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 text-xs font-heading text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                >
                  <Settings02Icon size={14} />
                  <span>Settings &amp; Access</span>
                </Link>

                <Link
                  href="/login"
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-2 px-2.5 py-2 text-xs font-heading text-status-rejected hover:bg-status-rejected/10 transition-colors"
                >
                  <Logout01Icon size={14} />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsUserMenuOpen((prev) => !prev)}
            aria-expanded={isUserMenuOpen}
            aria-label="User menu"
            className={`w-full flex items-center transition-colors border border-transparent hover:border-border hover:bg-muted/30 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand ${
              isCollapsed ? "justify-center p-1.5" : "justify-between px-2 py-2"
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div
                className="w-9 h-9 shrink-0 bg-muted border border-border text-foreground font-heading font-bold text-xs flex items-center justify-center"
                title={`${user.name || "User"} (${user.email || ""})`}
              >
                {user.initials || "KA"}
              </div>

              {!isCollapsed && (
                <div className="flex flex-col min-w-0 text-left">
                  <span className="text-xs font-heading font-medium text-foreground truncate">
                    {user.name || "Katherine Adeyemi"}
                  </span>
                  <span className="text-[10px] font-mono text-muted-foreground truncate">
                    {user.role || "Election Admin"}
                  </span>
                </div>
              )}
            </div>

            {!isCollapsed && (
              <ArrowDown01Icon
                size={14}
                className={`text-muted-foreground shrink-0 transition-transform duration-200 ${
                  isUserMenuOpen ? "rotate-180" : ""
                }`}
              />
            )}
          </button>
        </div>
      </aside>
    </>
  );
}
