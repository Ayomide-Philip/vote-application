"use client";

export default function Home() {
  const steps = [
    {
      title: "Set your poll",
      description:
        "Create a poll with a clear question and options in seconds. Keep it simple and focused.",
    },
    {
      title: "Share instantly",
      description:
        "Send your poll link to teammates or the community. Works great on mobile and desktop.",
    },
    {
      title: "See results live",
      description:
        "Watch votes roll in with clean visuals that make decisions obvious and fast.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-100 text-zinc-900">
      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 py-16 sm:py-20 lg:py-24">
        <header className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Vote application
            </p>
            <div className="space-y-4">
              <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Make decisions fast with effortless voting.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 sm:text-xl">
                A minimal, modern voting experience built for teams who value
                clarity. Set up a poll, share, and collect results without
                friction.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-black/10 transition-transform transition-shadow duration-200 hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 ring-1 ring-white/10">
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-white"
                  >
                    <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.34-1.3-1.7-1.3-1.7-1.07-.73.08-.72.08-.72 1.19.08 1.82 1.22 1.82 1.22 1.05 1.81 2.75 1.29 3.42.99.11-.77.41-1.29.74-1.59-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.2-3.1-.12-.3-.52-1.5.11-3.12 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.96.13 2.88.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.62.23 2.82.11 3.12.75.81 1.2 1.84 1.2 3.1 0 4.44-2.68 5.41-5.24 5.7.42.36.79 1.07.79 2.16 0 1.56-.02 2.82-.02 3.2 0 .31.21.67.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                  </svg>
                </span>
                <span className="text-base">Sign in with GitHub</span>
              </button>
              <p className="text-sm text-zinc-500">
                UI only — wire up your auth later.
              </p>
            </div>
            <div className="grid gap-4 text-sm text-zinc-600 sm:grid-cols-2 sm:text-base">
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-zinc-200 backdrop-blur">
                <p className="font-semibold text-zinc-900">Focused by design</p>
                <p className="mt-1 leading-relaxed">
                  A single place to gather opinions without clutter or
                  distractions.
                </p>
              </div>
              <div className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm shadow-zinc-200 backdrop-blur">
                <p className="font-semibold text-zinc-900">Built for clarity</p>
                <p className="mt-1 leading-relaxed">
                  Readable typography, sensible spacing, and a layout that
                  scales on any screen.
                </p>
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-white/60 bg-white/90 p-8 shadow-2xl shadow-zinc-300/40 backdrop-blur lg:p-10">
            <div
              className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-white to-zinc-100"
              aria-hidden="true"
            />
            <div className="relative space-y-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-zinc-500">
                Preview
              </p>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-sm font-medium text-zinc-800">
                    What should we build next?
                  </p>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    Live
                  </span>
                </div>
                <div className="space-y-2 rounded-2xl border border-zinc-100 bg-white px-4 py-4 shadow-sm">
                  <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-3">
                    <span className="text-sm font-medium text-zinc-800">
                      Feature A
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      42%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-3">
                    <span className="text-sm font-medium text-zinc-800">
                      Feature B
                    </span>
                    <span className="text-sm font-semibold text-indigo-600">
                      33%
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-zinc-50 px-3 py-3">
                    <span className="text-sm font-medium text-zinc-800">
                      Feature C
                    </span>
                    <span className="text-sm font-semibold text-amber-600">
                      25%
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    Share
                  </p>
                  <p className="mt-1 text-sm text-zinc-800">
                    Copy a link and invite your team in one click.
                  </p>
                </div>
                <div className="rounded-2xl border border-zinc-100 bg-white px-4 py-3 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                    Transparent
                  </p>
                  <p className="mt-1 text-sm text-zinc-800">
                    Everyone sees the same real-time results.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-zinc-500">
              How it works
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              Simple steps to launch a poll
            </h2>
            <p className="max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg">
              From idea to decision in minutes. The flow stays lightweight so
              everyone can participate without friction.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.title}
                className="group rounded-2xl border border-zinc-200 bg-white/90 p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-sm font-semibold text-white shadow-sm shadow-zinc-900/10">
                  {step.title.slice(0, 1)}
                </div>
                <h3 className="mt-4 text-lg font-semibold text-zinc-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
