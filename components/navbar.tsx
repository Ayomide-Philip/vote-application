"use client";

import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { PlusSignIcon } from "hugeicons-react";

export function Navbar() {
  return (
    <header className="w-full bg-background border-b-2 border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
        {/* Left: Standalone Brand Logo */}
        <Link
          href="/"
          className="font-heading font-bold text-2xl tracking-tight text-foreground hover:opacity-90 transition-opacity"
        >
          ballot<span className="text-brand">.</span>
        </Link>

        {/* Center: Navigation Links */}
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

        {/* Right: Actions & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          <button
            type="button"
            className="btn btn-secondary h-9 px-4 text-xs hidden sm:inline-flex"
          >
            Sign In
          </button>
        </div>
      </div>
    </header>
  );
}
