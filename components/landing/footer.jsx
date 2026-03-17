import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative text-zinc-500 bg-zinc-50 dark:bg-zinc-800 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-700">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row justify-between flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-zinc-900 dark:text-zinc-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full shrink-0"
            viewBox="0 0 24 24"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="ml-3 text-xl">Tailblocks</span>
        </a>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-zinc-200 dark:sm:border-zinc-700 sm:py-2 sm:mt-0 mt-4">
          © 2020 Tailblocks —
          <a
            href="https://twitter.com/knyttneve"
            className="text-zinc-600 dark:text-zinc-300 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            @knyttneve
          </a>
        </p>
        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-zinc-500 dark:text-zinc-400">
            <Facebook className="w-5 h-5" />
          </a>
          <a className="ml-3 text-zinc-500 dark:text-zinc-400">
            <Twitter className="w-5 h-5" />
          </a>
          <a className="ml-3 text-zinc-500 dark:text-zinc-400">
            <Instagram className="w-5 h-5" />
          </a>
          <a className="ml-3 text-zinc-500 dark:text-zinc-400">
            <Linkedin className="w-5 h-5" />
          </a>
        </span>
      </div>
    </footer>
  );
}
