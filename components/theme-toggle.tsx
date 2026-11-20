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
        className={`theme-toggle-btn ${className ?? ""}`}
      >
        <span className="w-[18px] h-[18px] opacity-0" />
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
      className={`theme-toggle-btn ${className ?? ""}`}
    >
      {isDark ? (
        <Moon02Icon size={18} />
      ) : (
        <Sun01Icon size={18} />
      )}
    </button>
  );
}
