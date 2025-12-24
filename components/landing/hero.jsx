"use client";

import { signIn } from "next-auth/react";
import Toggle from "../toggle";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Shield,
  Users,
  Play,
} from "lucide-react";

export default function HeroSection() {
  return (
    <>
      {/* Fixed Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 border border-zinc-200 dark:border-zinc-700 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-3.5 flex items-center justify-between w-full">
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
              href="#pricing"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Pricing
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
              className="rounded-lg cursor-pointer bg-zinc-900  px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 dark:hover:bg-zinc-600 transition shadow-md hover:shadow-lg shrink-0 flex items-center gap-2"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen bg-linear-to-br from-white via-blue-50/30 to-white dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900 pt-32 pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative mx-auto max-w-7xl pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
                <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Trusted by Fortune 500 companies
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                  Make Every Voice{" "}
                  <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                    Count
                  </span>
                </h1>
                <p className="text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                  Build consensus with powerful voting tools. Create polls in
                  seconds, get instant results, and make confident decisions
                  together.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="group relative px-8 py-4 bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white rounded-2xl font-bold text-lg shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                    Start Voting Free
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                  <button className="group px-8 py-4 bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm text-zinc-900 dark:text-zinc-100 rounded-2xl font-bold text-lg border-2 border-zinc-200 dark:border-zinc-700 hover:border-blue-600 dark:hover:border-blue-500 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-3">
                    <Play className="w-5 h-5" />
                    See it in action
                  </button>
                </div>

                <div className="flex items-center gap-8 pt-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      Free forever
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      No credit card
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      2-min setup
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                <div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                    100k+
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Active Users
                  </div>
                </div>
                <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>
                <div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                    5M+
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Votes Cast
                  </div>
                </div>
                <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800"></div>
                <div>
                  <div className="text-3xl font-black text-zinc-900 dark:text-zinc-100">
                    99.9%
                  </div>
                  <div className="text-sm text-zinc-600 dark:text-zinc-400">
                    Uptime
                  </div>
                </div>
              </div>
            </div>

            <div className="relative lg:h-150 flex items-center justify-center">
              <div className="relative w-full max-w-md">
                <div className="relative bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-8 hover:scale-105 transition-transform duration-500">
                  <div className="space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          Team Lunch Choice
                        </h3>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                          8 votes • Live results
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { option: "Pizza", votes: 5, color: "bg-blue-500" },
                        { option: "Sushi", votes: 2, color: "bg-cyan-500" },
                        { option: "Burgers", votes: 1, color: "bg-purple-500" },
                      ].map((item, idx) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="font-medium text-zinc-700 dark:text-zinc-300">
                              {item.option}
                            </span>
                            <span className="font-bold text-zinc-900 dark:text-zinc-100">
                              {item.votes} votes
                            </span>
                          </div>
                          <div className="h-3 bg-zinc-100 dark:bg-zinc-700 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${item.color} rounded-full transition-all duration-1000`}
                              style={{ width: `${(item.votes / 8) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <button className="w-full py-3 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Cast Your Vote
                    </button>
                  </div>
                </div>

                <div
                  className="absolute -top-6 -left-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 animate-bounce"
                  style={{ animationDuration: "3s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Real-time
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        Live updates
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="absolute -bottom-6 -right-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 animate-bounce"
                  style={{ animationDuration: "3s", animationDelay: "1s" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                        Unlimited
                      </div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400">
                        No voter limits
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
