"use client";

import * as React from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu01Icon, Cancel01Icon } from "hugeicons-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="w-full bg-background border-b-2 border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="font-heading font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          ballot<span className="text-brand">.</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-heading font-bold uppercase tracking-widest">
          <Link
            href="/#elections"
            className="text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Elections
          </Link>
          <Link
            href="/#verify"
            className="text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Verify Ballot
          </Link>
          <Link
            href="/#about"
            className="text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            Protocol
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />

          <button type="button" className="btn btn-primary h-9 px-4 text-xs">
            Sign In
          </button>
        </div>

        {/* Mobile Header Controls */}
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

      {/* Mobile Overlay Menu (Floats over the page, zero layout shift) */}
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
            <nav className="flex flex-col gap-2 text-xs font-heading font-bold uppercase tracking-widest">
              <Link
                href="/#elections"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
              >
                Elections
              </Link>
              <Link
                href="/#verify"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
              >
                Verify Ballot
              </Link>
              <Link
                href="/#about"
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 text-muted-foreground hover:text-foreground border-b border-border/40 transition-colors"
              >
                Protocol
              </Link>
            </nav>

            <div className="pt-2">
              <button
                type="button"
                className="btn btn-primary w-full justify-center h-10 text-xs"
              >
                Sign In
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
