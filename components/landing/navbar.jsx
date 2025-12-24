"use client";
import { signIn } from "next-auth/react";
import Toggle from "../toggle";
import { BsGoogle } from "react-icons/bs";
export default function Navbar() {
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 ">
      <div className="border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl shadow-lg max-w-5xl mx-auto px-6 sm:px-8 py-3.5 flex items-center justify-between w-full">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-9 w-9 items-center justify-center shrink-0 rounded-lg bg-linear-to-br from-blue-600 to-blue-700 text-base font-bold text-white">
            V
          </div>
          <div className="hidden sm:block leading-tight">
            <p className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
              Votely
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Decisions made clear
            </p>
          </div>
        </div>
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-zinc-600 dark:text-zinc-400">
          <a
            href="#features"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Features
          </a>
          <a
            href="#process"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Process
          </a>
          <a
            href="#faq"
            className="hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            FAQ
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Toggle />
          <button
            onClick={() => {
              signIn("google", {
                callbackUrl: "/dashboard",
              });
            }}
            className="rounded-lg cursor-pointer bg-zinc-900 dark:bg-white dark:text-black  px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:hover:bg-zinc-600 transition shadow-md hover:shadow-lg shrink-0 flex items-center gap-2"
          >
            <BsGoogle />
            <span className="hidden md:block">Sign in</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
