"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun01Icon, Moon02Icon } from "hugeicons-react";

const emptySubscribe = () => () => {};

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className={`w-9 h-9 flex items-center justify-center bg-transparent border-1.5 border-border text-muted-foreground transition-colors ${className ?? ""}`}
        style={{ backgroundColor: "transparent" }}
      >
        <span className="w-4.5 h-4.5 opacity-0" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`w-9 h-9 flex items-center justify-center bg-transparent border-1.5 border-border text-muted-foreground hover:text-brand hover:border-brand hover:bg-transparent transition-colors cursor-pointer active:translate-y-px ${className ?? ""}`}
      style={{ backgroundColor: "transparent" }}
    >
      {isDark ? <Moon02Icon size={18} /> : <Sun01Icon size={18} />}
    </button>
  );
}
