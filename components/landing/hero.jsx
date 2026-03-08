"use client";
import { ArrowRight, TrendingUp, Shield, Users } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";

export default function HeroSection() {
  return (
    <>
      <section className="relative min-h-screen bg-linear-to-br from-white via-blue-50/30 to-white dark:from-zinc-900 dark:via-blue-950/20 dark:to-zinc-900 pt-17 sm:pt-20 lg:pt-5 pb-10 sm:pb-16 lg:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 dark:bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 -right-20 w-96 h-96 bg-cyan-500/20 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>

        <div className="relative mx-auto max-w-7xl pt-8 sm:pt-12 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-linear-to-r from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50 border border-blue-200/50 dark:border-blue-800/50 backdrop-blur-sm">
                <Shield className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-xs sm:text-sm font-semibold text-blue-700 dark:text-blue-300">
                  Trusted by Students
                </span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-zinc-900 dark:text-zinc-100 leading-tight">
                  Make Every Voice{" "}
                  <span className="bg-linear-to-r from-blue-600 via-cyan-500 to-blue-600 dark:from-blue-400 dark:via-cyan-300 dark:to-blue-400 bg-clip-text text-transparent">
                    Count
                  </span>
                </h1>
                <p className="text-base sm:text-lg lg:text-xl text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-xl">
                  Build consensus with powerful voting tools. Create polls in
                  seconds, get instant results, and make confident decisions
                  together.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={() => {
                      signIn("google", {
                        callbackUrl: "/polls",
                      });
                    }}
                    className="group cursor-pointer relative px-6 sm:px-8 py-3 sm:py-4 bg-linear-to-r from-blue-600 to-cyan-600 dark:from-blue-500 dark:to-cyan-500 text-white rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/50 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3"
                  >
                    <FcGoogle className="w-5 h-5" />
                    Start Voting
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            <div className="relative mt-12 lg:mt-0 lg:h-150 flex items-center justify-center">
              <div className="relative w-full max-w-md mx-auto">
                <div className="relative bg-white/90 dark:bg-zinc-800/90 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-700 p-6 sm:p-8 hover:scale-105 transition-transform duration-500">
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-zinc-100">
                          President
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                          8 votes • Live results
                        </p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    </div>

                    <div className="space-y-3">
                      {[
                        {
                          option: "Candidate 1",
                          votes: 5,
                          color: "bg-blue-500",
                        },
                        {
                          option: "Candidate 2",
                          votes: 2,
                          color: "bg-cyan-500",
                        },
                        {
                          option: "Candidate 3",
                          votes: 1,
                          color: "bg-purple-500",
                        },
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

                    <button className="w-full py-2.5 sm:py-3 text-sm sm:text-base bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg transition-all">
                      Cast Your Vote
                    </button>
                  </div>
                </div>

                <div
                  className="hidden sm:block absolute -top-6 -left-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 animate-bounce"
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
                  className="hidden sm:block absolute -bottom-6 -right-6 bg-white dark:bg-zinc-800 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-4 animate-bounce"
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
