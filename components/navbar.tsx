"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu01Icon, Cancel01Icon, ArrowUpRight01Icon } from "hugeicons-react";

/**
 * Centralized Navigation Configuration
 * Add, remove, or reorder navigation links here.
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Guarantees", href: "/#guarantees" },
  { label: "FAQ", href: "/#faq" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="w-full bg-background border-b-2 border-border sticky top-0 z-50">
      <div className="relative max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <Link
          href="/"
          className="font-heading capitalize font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity z-10"
        >
          ballot<span className="text-brand">.</span>
        </Link>

        {/* Center: True Symmetrical Center Navigation */}
        <nav className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map((item) => {
            const isExternal = item.external || item.href.startsWith("http");
            if (isExternal) {
              return (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                >
                  {item.label}
                </a>
              );
            }
            return (
              <Link key={item.href} href={item.href} className="nav-link">
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 z-10">
          <ThemeToggle />

          <Link href="/login" className="btn btn-primary h-8 px-3.5 text-[11px]">
            Sign In
          </Link>
        </div>

        {/* Mobile Header Controls: ThemeToggle + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={
              mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={mobileMenuOpen}
            className="w-9 h-9 flex items-center justify-center border-1.5 border-border text-muted-foreground hover:text-brand hover:border-brand transition-colors cursor-pointer"
            style={{ backgroundColor: "transparent" }}
          >
            {mobileMenuOpen ? (
              <Cancel01Icon size={18} />
            ) : (
              <Menu01Icon size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop Overlay - Tap outside to close */}
          <div
            className="fixed inset-0 top-16 bg-black/60 z-40 md:hidden animate-in fade-in duration-150"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Overlay Dropdown Sheet */}
          <div className="absolute top-full left-0 w-full bg-background border-b-2 border-border px-6 py-6 flex flex-col gap-5 shadow-2xl z-50 md:hidden animate-in fade-in slide-in-from-top-2 duration-150">
            <nav className="flex flex-col gap-1 text-[11px] font-heading font-semibold uppercase tracking-wider">
              {NAV_ITEMS.map((item) => {
                const isExternal =
                  item.external || item.href.startsWith("http");
                if (isExternal) {
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                      className="py-3 px-1 text-muted-foreground hover:text-brand hover:bg-muted/40 border-b border-border/40 transition-colors flex items-center justify-between cursor-pointer"
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight01Icon
                        size={12}
                        className="text-subtle shrink-0"
                      />
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="py-3 px-1 text-muted-foreground hover:text-brand hover:bg-muted/40 border-b border-border/40 transition-colors flex items-center justify-between"
                  >
                    <span>{item.label}</span>
                    <span className="text-subtle text-[10px] font-mono">→</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary w-full justify-center h-9 text-[11px]"
              >
                Sign In
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
