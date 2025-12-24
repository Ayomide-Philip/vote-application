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
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50/30 to-white text-zinc-900">
      {/* Sticky Navigation */}
      <nav className="sticky top-0 z-50 mx-auto max-w-6xl px-6 py-4">
        <div className="flex items-center justify-between rounded-2xl border border-white/70 bg-white/80 px-6 py-3 shadow-lg shadow-indigo-100/40 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-700 text-lg font-bold text-white">
              V
            </div>
            <div className="leading-tight hidden sm:block">
              <p className="text-base font-semibold text-zinc-900">Votely</p>
              <p className="text-xs text-zinc-600">
                Smart voting, clear decisions
              </p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-zinc-700">
            <a href="#features" className="hover:text-indigo-600 transition">
              Features
            </a>
            <a href="#pricing" className="hover:text-indigo-600 transition">
              Pricing
            </a>
            <a href="#faq" className="hover:text-indigo-600 transition">
              FAQ
            </a>
          </div>
          <button className="rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition">
            Get Started
          </button>
        </div>
      </nav>

      <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
        {/* Hero Section */}
        <section className="grid gap-12 lg:grid-cols-2 lg:items-center mb-32">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block">
                <span className="rounded-full bg-indigo-50 px-4 py-1.5 text-sm font-semibold text-indigo-700 border border-indigo-100">
                  ✨ Fast decisions, verified results
                </span>
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                Voting That
                <span className="block bg-gradient-to-r from-indigo-600 to-indigo-500 bg-clip-text text-transparent">
                  Actually Works
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-zinc-600 leading-relaxed max-w-xl">
                Create secure polls, gather instant feedback, and make decisions
                together. No complexity, no friction—just clear results everyone
                can trust.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="rounded-full bg-indigo-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-indigo-200 hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2">
                Start Voting Free
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="rounded-full bg-white px-8 py-4 text-base font-semibold text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50 transition">
                Watch Demo
              </button>
            </div>

            <div className="flex items-center gap-6 text-sm text-zinc-600">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-indigo-600" />
                <span>End-to-end encrypted</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-indigo-600" />
                <span>Instant results</span>
              </div>
            </div>
          </div>

          {/* Hero Mockup */}
          <div className="relative">
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl -z-10"></div>
            <div className="relative rounded-3xl border border-white/70 bg-white/90 shadow-2xl shadow-indigo-200/50 backdrop-blur-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-white" />
              <div className="relative p-6 sm:p-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-800">
                    Company Meeting Poll
                  </span>
                  <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold">
                    <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                    Live
                  </span>
                </div>
                <p className="text-sm font-semibold text-zinc-700">
                  When should we have our next team lunch?
                </p>
                <div className="space-y-3">
                  {[
                    { label: "This Friday", votes: 48 },
                    { label: "Next Monday", votes: 32 },
                    { label: "Following Week", votes: 20 },
                  ].map((option) => (
                    <div key={option.label} className="space-y-2">
                      <div className="flex justify-between text-xs font-semibold text-zinc-700">
                        <span>{option.label}</span>
                        <span>{option.votes}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-full"
                          style={{ width: `${option.votes}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                    <p className="text-xs text-zinc-600 font-medium">
                      Total Votes
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">
                      342
                    </p>
                  </div>
                  <div className="rounded-lg bg-indigo-50 border border-indigo-100 p-3">
                    <p className="text-xs text-zinc-600 font-medium">
                      Participation
                    </p>
                    <p className="text-lg font-bold text-indigo-600 mt-1">
                      89%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 mb-32 py-12 border-y border-indigo-100/50">
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-indigo-600">
              50k+
            </p>
            <p className="text-sm text-zinc-600 mt-2">Polls Created</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-indigo-600">
              2M+
            </p>
            <p className="text-sm text-zinc-600 mt-2">Total Votes</p>
          </div>
          <div className="text-center">
            <p className="text-3xl sm:text-4xl font-bold text-indigo-600">
              99.9%
            </p>
            <p className="text-sm text-zinc-600 mt-2">Uptime SLA</p>
          </div>
        </div>

        {/* Features Section */}
        <section id="features" className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-100">
              Features
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Everything you need
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Powerful features designed to make voting simple, secure, and
              trustworthy for everyone.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Real-time Results",
                description:
                  "See votes come in live with beautiful charts and instant updates",
              },
              {
                icon: Shield,
                title: "Fully Secure",
                description:
                  "End-to-end encryption keeps every vote safe and anonymous",
              },
              {
                icon: Users,
                title: "Easy to Share",
                description:
                  "One-click sharing makes it simple to invite participants",
              },
              {
                icon: BarChart3,
                title: "Smart Analytics",
                description:
                  "Detailed insights help you understand voting patterns",
              },
              {
                icon: Globe,
                title: "Works Anywhere",
                description: "Mobile-optimized interface works on all devices",
              },
              {
                icon: Lock,
                title: "Verified",
                description:
                  "Blockchain-backed verification for complete transparency",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-indigo-100/50 bg-white/70 p-8 hover:shadow-lg hover:-translate-y-1 transition"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-500 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-zinc-900">
                    {feature.title}
                  </h3>
                  <p className="text-zinc-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-100">
              How It Works
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Three simple steps
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                num: "1",
                title: "Create",
                desc: "Write your question and add options in seconds",
              },
              {
                num: "2",
                title: "Share",
                desc: "Invite people via link, email, or QR code",
              },
              {
                num: "3",
                title: "Decide",
                desc: "Get instant results and export for records",
              },
            ].map((step, idx) => (
              <div key={idx} className="relative">
                <div className="rounded-2xl border border-indigo-100/50 bg-gradient-to-br from-indigo-50 to-white p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-lg shadow-indigo-200">
                    {step.num}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-zinc-900">
                    {step.title}
                  </h3>
                  <p className="text-zinc-600">{step.desc}</p>
                </div>
                {idx < 2 && (
                  <div className="hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-indigo-300">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-100">
              Pricing
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-lg text-zinc-600">
              Start free, scale as you grow.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "Free",
                features: [
                  "Up to 100 voters",
                  "Unlimited polls",
                  "Basic analytics",
                  "Email support",
                ],
              },
              {
                name: "Pro",
                price: "$29",
                period: "/month",
                features: [
                  "Up to 5,000 voters",
                  "Advanced analytics",
                  "Custom branding",
                  "Priority support",
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
                ],
              },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-8 transition ${
                  plan.popular
                    ? "border-2 border-indigo-600 bg-gradient-to-br from-indigo-50 to-white shadow-xl shadow-indigo-200/50"
                    : "border border-indigo-100/50 bg-white/70"
                }`}
              >
                {plan.popular && (
                  <span className="inline-block bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-2xl font-bold mb-2 text-zinc-900">
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-indigo-600">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-zinc-600">{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, fidx) => (
                    <li
                      key={fidx}
                      className="flex items-center gap-3 text-zinc-700"
                    >
                      <Check className="w-5 h-5 text-indigo-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full rounded-lg py-3 font-semibold transition ${
                    plan.popular
                      ? "bg-indigo-600 text-white hover:shadow-lg hover:-translate-y-0.5"
                      : "bg-white text-indigo-600 border-2 border-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="mb-32">
          <div className="text-center mb-16">
            <span className="inline-block bg-indigo-50 text-indigo-700 px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border border-indigo-100">
              FAQ
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold">Common questions</h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "Is my vote anonymous?",
                a: "Yes, your identity is kept separate from your vote. Only the results are public.",
              },
              {
                q: "Can I close a poll early?",
                a: "Absolutely. You can end a poll anytime and still share results with participants.",
              },
              {
                q: "What devices are supported?",
                a: "Votely works on all modern browsers and devices—desktop, tablet, and mobile.",
              },
              {
                q: "How do I export results?",
                a: "Download results as CSV, PDF, or share via link. All formats include full voting data.",
              },
            ].map((item, idx) => (
              <details
                key={idx}
                className="group rounded-lg border border-indigo-100/50 bg-white/70 p-6 hover:shadow-md transition"
              >
                <summary className="flex cursor-pointer items-center justify-between font-semibold text-zinc-900">
                  <span>{item.q}</span>
                  <span className="text-indigo-600 group-open:rotate-45 transition">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-zinc-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Footer */}
        <section className="rounded-3xl border border-indigo-200 bg-gradient-to-br from-indigo-600 to-indigo-700 px-8 sm:px-12 py-16 text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Ready to make better decisions?
          </h2>
          <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of teams using Votely for faster, transparent
            decision-making.
          </p>
          <button className="rounded-full bg-white text-indigo-600 px-8 py-4 text-base font-semibold hover:shadow-xl hover:-translate-y-0.5 transition flex items-center justify-center gap-2 mx-auto">
            Start Your Free Poll Today
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-indigo-100/50 bg-white/80 backdrop-blur mt-20 py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-lg font-bold">
                  V
                </div>
                <span className="font-bold text-zinc-900">Votely</span>
              </div>
              <p className="text-sm text-zinc-600">
                Smart voting for better decisions.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 mb-4">
                Product
              </p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>
                  <a href="#features" className="hover:text-indigo-600">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-indigo-600">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 mb-4">
                Company
              </p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-zinc-900 mb-4">Legal</p>
              <ul className="space-y-2 text-sm text-zinc-600">
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-indigo-600">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-indigo-100/50 pt-8 text-center text-sm text-zinc-600">
            <p>&copy; 2025 Votely. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
