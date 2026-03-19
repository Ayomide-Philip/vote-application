"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";

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
    if (agreed) {
      setError("");
      setIsLoading(true);
      signIn("google", {
        callbackUrl: "/polls",
      });
    }
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsLoading(false);
  };

  return (
    <main className="relative min-h-screen px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.12),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.12),transparent_45%)]" />

      <section className="relative mx-auto grid w-full max-w-6xl items-center gap-10 lg:min-h-[calc(100vh-14rem)] lg:grid-cols-12 lg:gap-14">
        <div className="hidden lg:col-span-7 lg:block">
          <div className="max-w-xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Ballot Right
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-100">
              Secure, Transparent, and Easy Voting
            </h1>
            <p className="mt-5 text-base leading-7 text-zinc-600 dark:text-zinc-300">
              A professional voting platform that helps teams and institutions
              create polls, manage elections, vote securely, and print trusted
              results.
            </p>

            <ul className="mt-8 space-y-3 text-sm text-zinc-700 dark:text-zinc-300 sm:text-base">
              {[
                "Create and publish polls in minutes",
                "Manage positions, candidates, and voters",
                "Enable secure and transparent voting",
                "Export and print clear election results",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="mx-auto w-full max-w-md">
            <section className="rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-xl shadow-zinc-900/5 transition-all duration-300 sm:p-8 dark:border-zinc-700 dark:bg-zinc-900">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                Sign in to Ballot Right
              </h2>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Continue with your Google account to access your dashboard.
              </p>

              <div className="mt-6 space-y-4">
                <div className="relative">
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    aria-disabled={!agreed || isLoading}
                    disabled={!agreed || isLoading}
                    className={`inline-flex w-full items-center justify-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium shadow-sm outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 active:scale-[0.99] dark:focus-visible:ring-offset-zinc-900 ${
                      !agreed || isLoading
                        ? "cursor-not-allowed border-zinc-300 bg-zinc-100 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400"
                        : "border-zinc-300 cursor-pointer bg-white text-zinc-900 hover:bg-zinc-50 hover:shadow-md dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
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

                  {!agreed && !isLoading ? (
                    <button
                      type="button"
                      aria-label="Agree to terms before continuing"
                      onClick={() =>
                        setError(
                          "Please agree to the Terms and Conditions before continuing.",
                        )
                      }
                      className="absolute inset-0 rounded-xl"
                    />
                  ) : null}
                </div>

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
                        href="/terms-and-conditions"
                        className="font-medium text-blue-600 underline underline-offset-4 transition-colors hover:text-blue-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Terms and Conditions
                      </Link>{" "}
                      and{" "}
                      <Link
                        href="/privacy-policy"
                        className="font-medium text-blue-600 underline underline-offset-4 transition-colors hover:text-blue-700 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        Privacy Policy
                      </Link>
                      .
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

              <p className="mt-6 text-center text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                By continuing, you agree to our{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-medium text-zinc-700 underline underline-offset-4 transition-colors hover:text-zinc-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-200 dark:hover:text-white"
                >
                  Terms and Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy-policy"
                  className="font-medium text-zinc-700 underline underline-offset-4 transition-colors hover:text-zinc-900 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-zinc-200 dark:hover:text-white"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </section>
          </div>
        </div>
      </section>
    </main>
  );
}
