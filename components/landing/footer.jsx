/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
      <div className="container px-5 py-8 mx-auto flex items-center flex-col md:flex-row md:justify-between">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-zinc-900 dark:text-zinc-100">
          <img
            src="/logo.png"
            alt="Ballot Right Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="ml-1 text-xl">Ballot Right</span>
        </a>
        <div className="text-center mt-4 md:mt-0 md:ml-4 md:pl-4 md:border-l-2 md:border-zinc-200 dark:md:border-zinc-700 md:py-2">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 inline-flex flex-wrap items-center justify-center gap-2">
            <span>
              © {new Date().getFullYear()} Ballot Right. All rights reserved.
              Made with precision.
            </span>
            <Link
              href="/terms-and-conditions"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              Terms & Conditions
            </Link>
            <span className="text-zinc-400 dark:text-zinc-500">|</span>
            <Link
              href="/privacy-policy"
              className="text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100"
            >
              Privacy Policy
            </Link>
          </p>
        </div>
        <span className="inline-flex gap-5 mt-4 md:mt-0 md:ml-auto justify-center md:justify-start">
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
