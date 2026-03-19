"use client";

import { useState } from "react";
import Link from "next/link";

function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M21.35 12.23c0-.76-.07-1.49-.2-2.18H12v4.13h5.23a4.47 4.47 0 0 1-1.94 2.93v2.43h3.14c1.84-1.7 2.92-4.2 2.92-7.31Z"
        fill="#4285F4"
      />
      <path
        d="M12 21.73c2.63 0 4.84-.87 6.45-2.36l-3.14-2.43c-.87.58-1.98.92-3.31.92-2.54 0-4.69-1.71-5.46-4h-3.24v2.5A9.73 9.73 0 0 0 12 21.73Z"
        fill="#34A853"
      />
      <path
        d="M6.54 13.86a5.84 5.84 0 0 1 0-3.72v-2.5H3.3a9.73 9.73 0 0 0 0 8.72l3.24-2.5Z"
        fill="#FBBC04"
      />
      <path
        d="M12 6.14c1.43 0 2.71.49 3.72 1.46l2.79-2.79A9.34 9.34 0 0 0 12 2.27a9.73 9.73 0 0 0-8.7 5.37l3.24 2.5c.77-2.29 2.92-4 5.46-4Z"
        fill="#EA4335"
      />
    </svg>
  );
}

function LoadingSpinner() {
  return (
    <span
      className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-900"
      aria-hidden="true"
    />
  );
}

export default function LoginPage() {
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLoginClick = async () => {
    if (!agreed) {
      setError("Please agree to the Terms and Conditions before continuing.");
      return;
    }

    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1200));

    setIsLoading(false);
  };

  return (
    <main className="relative min-h-[calc(100vh-8rem)] px-4 py-12 sm:px-6 sm:py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_48%),radial-gradient(circle_at_bottom,rgba(99,102,241,0.1),transparent_44%)]" />

      <div className="relative mx-auto w-full max-w-md">
        <section className="rounded-2xl border border-zinc-200/70 bg-white/90 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 sm:p-8 dark:border-zinc-700 dark:bg-zinc-900/80">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              Ballot Right
            </h1>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Secure and Transparent Voting Platform
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <button
              type="button"
              onClick={handleLoginClick}
              aria-disabled={!agreed || isLoading}
              disabled={isLoading}
              className={`group inline-flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm font-medium text-zinc-900 shadow-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.99] dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-offset-zinc-900 ${
                !agreed
                  ? "cursor-not-allowed opacity-65"
                  : "hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-700"
              }`}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  <span>Preparing secure sign-in...</span>
                </>
              ) : (
                <>
                  <GoogleIcon />
                  <span>Continue with Google</span>
                </>
              )}
            </button>

            <div className="rounded-lg border border-transparent p-2 transition-colors duration-200 has-checked:border-blue-200/80 has-checked:bg-blue-50/60 dark:has-checked:border-blue-800 dark:has-checked:bg-blue-950/30">
              <div className="flex items-start gap-3">
                <input
                  id="terms-consent"
                  type="checkbox"
                  checked={agreed}
                  onChange={(event) => {
                    setAgreed(event.target.checked);
                    if (event.target.checked) {
                      setError("");
                    }
                  }}
                  className="mt-0.5 h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:border-zinc-600 dark:bg-zinc-800 dark:focus:ring-offset-zinc-900"
                />

                <label
                  htmlFor="terms-consent"
                  className="text-sm leading-6 text-zinc-700 dark:text-zinc-300"
                >
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-blue-600 underline-offset-4 transition-colors hover:text-blue-700 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    Terms and Conditions
                  </Link>
                </label>
              </div>
            </div>

            {error ? (
              <p
                role="alert"
                aria-live="polite"
                className="text-sm text-red-600 dark:text-red-400"
              >
                {error}
              </p>
            ) : null}
          </div>

          <p className="mt-8 text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
            By continuing, you agree to our{" "}
            <Link
              href="/terms"
              className="font-medium text-zinc-700 underline underline-offset-4 transition-colors hover:text-zinc-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-200 dark:hover:text-white"
            >
              Terms
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="font-medium text-zinc-700 underline underline-offset-4 transition-colors hover:text-zinc-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-200 dark:hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
