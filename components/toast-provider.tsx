"use client";

import { GooeyToaster } from "goey-toast";
import { useTheme } from "next-themes";
import "goey-toast/styles.css";

export function ToastProvider() {
  const { resolvedTheme } = useTheme();

  return (
    <GooeyToaster
      position="top-right"
      theme={resolvedTheme === "light" ? "light" : "dark"}
      closeButton="top-right"
      sound={false}
    />
  );
}
