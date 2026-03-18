/* eslint-disable @next/next/no-img-element */
import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row justify-between flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-zinc-900 dark:text-zinc-100">
          <img
            src="/logo.png"
            alt="Ballot Right Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-1 text-xl">Ballot Right</span>
        </a>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-zinc-200 dark:sm:border-zinc-700 sm:py-2 sm:mt-0 mt-4">
          © {new Date().getFullYear()} Ballot Right. All rights reserved. Made
          with precision.
        </p>
        <span className="inline-flex gap-5 sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a
            href="https://x.com/ballot_right"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 dark:text-zinc-400"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/ballotright/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 dark:text-zinc-400"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="https://github.com/Ayomide-Philip"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 dark:text-zinc-400"
          >
            <Github className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
}
