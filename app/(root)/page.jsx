"use client";
import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import FeatureSection from "@/components/landing/features";
import HeroSection from "@/components/landing/hero";

export default function Home() {
  return (
    <>
      <HeroSection />
      <main className="mx-auto max-w-7xl px-4 sm:px-6 w-full overflow-x-hidden pt-5">
        <motion.div
          className="grid grid-cols-3 gap-8 py-16 border-t border-b border-zinc-200 dark:border-zinc-700"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              100k+
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Active Users
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              5M+
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Votes Cast
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600 dark:text-blue-400">
              99.9%
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-2 font-medium">
              Uptime SLA
            </p>
          </div>
        </motion.div>

        <FeatureSection />

        <section id="process" className="py-5">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              → Process
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Three simple steps
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Setup Your Poll",
                desc: "Define title, dates, and eligibility rules like email domain and department restrictions",
                icon: "⚙️",
              },
              {
                num: "02",
                title: "Enroll & Organize",
                desc: "Add voters via CSV or manually, create positions, and assign candidates to the ballot",
                icon: "👥",
              },
              {
                num: "03",
                title: "Vote & Report",
                desc: "Track live vote counts during the window, then export detailed printable results",
                icon: "📊",
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
              >
                <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-8 text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <p className="text-5xl font-black text-blue-600 dark:text-blue-400 mb-4 opacity-20">
                    {step.num}
                  </p>
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="faq" className="py-5">
          <motion.div
            className="text-center mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
              → Support
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
              Frequently asked questions
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Is voting truly anonymous?",
                a: "Yes. We separate voter identity from vote data. Only aggregate results are visible.",
              },
              {
                q: "Can I edit results after voting?",
                a: "No. Once you vote, results are locked and immutable. You can view historical data anytime.",
              },
              {
                q: "What happens to my data?",
                a: "Your data is encrypted end-to-end and stored securely. We never sell or share your information with third parties.",
              },
              {
                q: "Does Ballot Right work offline?",
                a: "No. An internet connection is required to create polls, cast votes, and view results in real-time.",
              },
              {
                q: "How many people can vote?",
                a: "For now, each poll can accommodate up to 10,000 voters. We're working on increasing this limit in future updates.",
              },
            ].map((item, idx) => (
              <motion.details
                key={idx}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-6 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-md transition cursor-pointer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-zinc-900 dark:text-zinc-100">
                  <span className="text-lg">{item.q}</span>
                  <span className="text-2xl cursor-pointer text-blue-600 dark:text-blue-400 group-open:rotate-45 transition shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-zinc-600 dark:text-zinc-300 leading-relaxed text-base">
                  {item.a}
                </p>
              </motion.details>
            ))}
          </div>
        </section>

        <motion.section
          className="rounded-2xl border border-blue-700 dark:border-blue-600 bg-linear-to-br from-blue-600 to-blue-700 dark:from-blue-800 dark:to-blue-700 px-6 sm:px-12 py-20 text-center text-white mb-20 mx-auto max-w-6xl"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-5xl sm:text-6xl font-black mb-4">
            Ready to decide better?
          </h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams making faster, smarter decisions with Ballot
            Right.
          </p>
          <button className="rounded-lg bg-white dark:bg-zinc-100 text-blue-600 dark:text-blue-600 px-10 py-4 text-lg font-bold hover:bg-blue-50 dark:hover:bg-white transition shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Start Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.section>
      </main>
    </>
  );
}
