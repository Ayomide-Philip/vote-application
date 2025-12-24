"use client";

import {
  ArrowRight,
  Check,
  Globe,
  Lock,
  Zap,
  Users,
  BarChart3,
  Shield,
  Sparkles,
  TrendingUp,
  Heart,
  Sun,
} from "lucide-react";
import Toggle from "./components/toggle";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 overflow-x-hidden">
      {/* Fixed Floating Navigation */}
      <nav className="fixed top-4 left-4 right-4 z-50 border border-zinc-200 bg-white/80 backdrop-blur-md rounded-2xl shadow-lg">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-3.5 flex items-center justify-between w-full">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-9 w-9 items-center justify-center shrink-0 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-base font-bold text-white">
              V
            </div>
            <div className="hidden sm:block leading-tight">
              <p className="text-sm font-bold text-zinc-900">Votely</p>
              <p className="text-xs text-zinc-500">Decisions made clear</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-10 text-sm font-medium text-zinc-600">
            <a href="#features" className="hover:text-blue-600 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-blue-600 transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-blue-600 transition">
              FAQ
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Toggle />
            <button className="rounded-lg bg-zinc-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800 transition shadow-md hover:shadow-lg shrink-0 flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Sign in
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 w-full overflow-x-hidden pt-20">
        {/* Hero Section */}
        <section className="grid gap-16 lg:grid-cols-2 lg:items-center py-24 sm:py-32">
          <div className="space-y-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 border border-blue-200">
                <Sparkles className="w-3.5 h-3.5" />
                Smart voting platform
              </div>
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
                Make Better
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500">
                  Decisions
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-lg">
                Real-time polls with instant results. Create, share, and decide
                together with complete transparency and security.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button className="rounded-lg bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-700 transition shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                Start Creating Polls
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="rounded-lg bg-zinc-100 px-8 py-3.5 text-base font-semibold text-zinc-900 hover:bg-zinc-200 transition">
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-8 text-sm text-zinc-600 border-t border-zinc-200 pt-8">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Lock className="w-4 h-4 text-blue-600" />
                </div>
                <span>256-bit encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                  <Zap className="w-4 h-4 text-blue-600" />
                </div>
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Hero Mockup */}
          <div className="relative">
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10"></div>
            <div className="relative rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden">
              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-semibold text-zinc-700">
                      Team Meeting Poll
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-500 bg-zinc-100 px-2.5 py-1 rounded-full">
                    5 mins ago
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-800">
                    Best time for weekly standup?
                  </p>
                  <p className="text-xs text-zinc-500">342 responses</p>
                </div>
                <div className="space-y-4">
                  {[
                    { label: "9:00 AM", votes: 58 },
                    { label: "10:30 AM", votes: 28 },
                    { label: "2:00 PM", votes: 14 },
                  ].map((option) => (
                    <div key={option.label} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium text-zinc-700">
                          {option.label}
                        </span>
                        <span className="font-semibold text-zinc-900">
                          {option.votes}%
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-600 to-blue-500 rounded-full"
                          style={{ width: `${option.votes}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-200">
                  <div className="rounded-lg bg-zinc-50 p-3">
                    <p className="text-xs text-zinc-600 font-medium">
                      Participation
                    </p>
                    <p className="text-lg font-bold text-blue-600 mt-1">94%</p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-3">
                    <p className="text-xs text-zinc-600 font-medium">Status</p>
                    <p className="text-lg font-bold text-green-600 mt-1">
                      Live
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <div className="grid grid-cols-3 gap-8 py-16 border-t border-b border-zinc-200">
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600">
              100k+
            </p>
            <p className="text-sm text-zinc-600 mt-2 font-medium">
              Active Users
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600">5M+</p>
            <p className="text-sm text-zinc-600 mt-2 font-medium">Votes Cast</p>
          </div>
          <div className="text-center">
            <p className="text-4xl sm:text-5xl font-bold text-blue-600">
              99.9%
            </p>
            <p className="text-sm text-zinc-600 mt-2 font-medium">Uptime SLA</p>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="py-32">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              → Features
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
              Everything you need
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto leading-relaxed">
              Powerful, intuitive tools built for teams that value clarity and
              trust in their decision-making process.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: TrendingUp,
                title: "Real-time Analytics",
                description:
                  "Watch votes update live with beautiful, interactive charts and detailed breakdowns",
              },
              {
                icon: Shield,
                title: "Bank-level Security",
                description:
                  "Enterprise-grade encryption ensures every vote stays private and authentic",
              },
              {
                icon: Users,
                title: "Easy Collaboration",
                description:
                  "Share polls instantly via link, QR code, or email to get responses fast",
              },
              {
                icon: BarChart3,
                title: "Advanced Insights",
                description:
                  "Export detailed reports and understand voting patterns with smart analytics",
              },
              {
                icon: Globe,
                title: "Mobile First",
                description:
                  "Responsive design works perfectly on desktop, tablet, and smartphone",
              },
              {
                icon: Heart,
                title: "User Friendly",
                description:
                  "Intuitive interface that anyone can use with zero learning curve",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-xl border border-zinc-200 bg-white p-7 hover:border-blue-300 hover:shadow-lg transition group"
                >
                  <div className="w-11 h-11 rounded-lg bg-blue-100 flex items-center justify-center mb-4 group-hover:bg-blue-600 transition">
                    <Icon className="w-5 h-5 text-blue-600 group-hover:text-white transition" />
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed text-sm">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="py-32">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              → Process
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
              Three simple steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "01",
                title: "Create",
                desc: "Write your question and add options in seconds",
                icon: "✏️",
              },
              {
                num: "02",
                title: "Share",
                desc: "Invite participants via link, QR, or email",
                icon: "🔗",
              },
              {
                num: "03",
                title: "Analyze",
                desc: "Get instant results and export comprehensive reports",
                icon: "📊",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center hover:shadow-lg transition">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <p className="text-5xl font-black text-blue-600 mb-4 opacity-20">
                    {step.num}
                  </p>
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:flex absolute top-1/2 -right-4 transform -translate-y-1/2 text-zinc-300">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-32">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              → Pricing
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
              Plans for every team
            </h2>
            <p className="text-lg text-zinc-600">
              Start free, scale as you grow. No credit card required.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "Up to 100 voters",
                  "Unlimited polls",
                  "Basic charts",
                  "Email support",
                ],
              },
              {
                name: "Professional",
                price: "$39",
                period: "/month",
                features: [
                  "Up to 10,000 voters",
                  "Advanced analytics",
                  "Custom branding",
                  "Priority support",
                  "API access",
                ],
                popular: true,
              },
              {
                name: "Enterprise",
                price: "Custom",
                features: [
                  "Unlimited voters",
                  "Custom features",
                  "Dedicated support",
                  "SLA guarantee",
                  "On-premise option",
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-xl border p-8 transition ${
                  plan.popular
                    ? "border-blue-600 bg-gradient-to-br from-blue-50 to-white shadow-2xl scale-105"
                    : "border-zinc-200 bg-white hover:shadow-lg"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-blue-600 text-white px-3.5 py-1 rounded-full text-xs font-bold mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2 text-zinc-900">
                  {plan.name}
                </h3>
                <div className="mb-8">
                  <span className="text-5xl font-black text-zinc-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-zinc-600 ml-1">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8 border-t border-zinc-200 pt-8">
                  {plan.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className="flex items-center gap-3 text-zinc-700"
                    >
                      <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full rounded-lg py-3 font-semibold transition ${
                    plan.popular
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-zinc-100 text-zinc-900 hover:bg-zinc-200"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="py-32">
          <div className="text-center mb-20">
            <span className="inline-block text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              → Support
            </span>
            <h2 className="text-5xl sm:text-6xl font-black tracking-tight mb-6">
              Frequently asked questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {[
              {
                q: "Is voting truly anonymous?",
                a: "Yes. We separate voter identity from vote data using industry-standard encryption. Only aggregate results are visible.",
              },
              {
                q: "Can I edit results after voting closes?",
                a: "No. Once a poll closes, results are locked and immutable. You can view historical data anytime.",
              },
              {
                q: "What happens to my data?",
                a: "Your data is encrypted end-to-end and stored securely. We never sell or share your information with third parties.",
              },
              {
                q: "Does Votely work offline?",
                a: "Polls must be created and voted on with an internet connection, but results sync automatically once reconnected.",
              },
              {
                q: "How many people can vote?",
                a: "Starter plan supports 100 voters, Pro supports 10k, and Enterprise supports unlimited participants.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-zinc-200 bg-white p-6 hover:border-blue-300 hover:shadow-md transition cursor-pointer"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-zinc-900">
                  <span className="text-lg">{item.q}</span>
                  <span className="text-2xl text-blue-600 group-open:rotate-45 transition flex-shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-zinc-600 leading-relaxed text-base">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-blue-600 to-blue-700 px-6 sm:px-12 py-20 text-center text-white mb-20 mx-auto max-w-6xl">
          <h2 className="text-5xl sm:text-6xl font-black mb-4">
            Ready to decide better?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams making faster, smarter decisions with
            Votely.
          </p>
          <button className="rounded-lg bg-white text-blue-600 px-10 py-4 text-lg font-bold hover:bg-blue-50 transition shadow-lg hover:shadow-xl inline-flex items-center gap-2">
            Start Free Now
            <ArrowRight className="w-5 h-5" />
          </button>
          <p className="text-blue-100 text-sm mt-6">
            No credit card required. Start with 100 voters free.
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-zinc-50 py-16 overflow-x-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 w-full">
          <div className="grid sm:grid-cols-5 gap-8 mb-12">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  V
                </div>
                <span className="font-bold text-zinc-900">Votely</span>
              </div>
              <p className="text-sm text-zinc-600 leading-relaxed">
                The modern way to make decisions together.
              </p>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">
                Product
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a
                    href="#features"
                    className="hover:text-blue-600 transition"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-blue-600 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Roadmap
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">
                Company
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold text-zinc-900 mb-4 uppercase tracking-wider">
                Legal
              </p>
              <ul className="space-y-2.5 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-blue-600 transition">
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-zinc-200 pt-8">
            <p className="text-sm text-zinc-600 text-center">
              &copy; 2025 Votely. All rights reserved. Made with precision.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
