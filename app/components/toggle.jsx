"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
export default function Toggle() {
  const { setTheme, resolvedTheme } = useTheme();
  return (
    <button
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
      }}
      className="p-2 hover:bg-zinc-100 rounded-lg transition cursor-pointer"
    >
      {resolvedTheme === "dark" ? (
        <Sun className="w-5 h-5 text-zinc-600 hover:text-zinc-900 transition" />
      ) : (
        <Moon className="w-5 h-5 text-zinc-600 hover:text-zinc-900 transition" />
      )}
    </button>
  );
}
