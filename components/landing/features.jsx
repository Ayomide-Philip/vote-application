import {
  BarChart3,
  Calendar,
  Globe,
  Shield,
  TrendingUp,
  Users,
} from "lucide-react";
import { motion } from "motion/react";

export default function FeatureSection() {
  return (
    <section id="features" className="py-5">
      <motion.div
        className="text-center mb-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px", amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <span className="inline-block text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-4">
          → Features
        </span>
        <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6 text-zinc-900 dark:text-zinc-100">
          Everything you need
        </h2>
        <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          Powerful, intuitive tools built for teams that value clarity and trust
          in their decision-making process.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            icon: Shield,
            title: "Google Sign-In Security",
            description:
              "Authenticate with Google and protect every voting board with verified user sessions and role checks.",
          },
          {
            icon: Calendar,
            title: "Scheduled Voting Windows",
            description:
              "Set start and end times with guardrails so polls only run during the exact election window you define.",
          },
          {
            icon: Users,
            title: "Smart Voter Enrollment",
            description:
              "Add voters manually or via CSV, prevent duplicates, and keep poll voter lists synchronized automatically.",
          },
          {
            icon: Globe,
            title: "Rule-Based Eligibility",
            description:
              "Restrict participation by email domain and department code, then let eligible users join with a secure invite link.",
          },
          {
            icon: TrendingUp,
            title: "Position-Based Ballots",
            description:
              "Create positions, assign candidates, and support one vote per position with clear not-started and closed states.",
          },
          {
            icon: BarChart3,
            title: "Live Results and Reports",
            description:
              "Track outcomes with live board updates, turnout stats, and printable result reports for transparent decisions.",
          },
        ].map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={idx}
              className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-7 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg transition group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-11 h-11 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
                <Icon className="w-5 h-5 text-blue-600 dark:text-blue-300 group-hover:text-white transition" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-zinc-900 dark:text-zinc-100">
                {feature.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-300 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
