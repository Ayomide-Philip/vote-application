import { Clock, Users, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const request = await fetch("http://localhost:3000/api/polls", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
    cache: "no-store",
  });
  const response = await request.json();
  if (!request.ok || response.error) return redirect("/dashboard");
  console.log(response);
  const { polls } = response;
  //   {
  //     id: 1,
  //     title: "Q1 Product Roadmap",
  //     description: "Vote on the features for our Q1 release",
  //     createdAt: "Dec 1, 2025",
  //     creatorName: "Alice Johnson",
  //     participants: 23,
  //     status: "Active",
  //     progress: 65,
  //     category: "Product",
  //   },
  //   {
  //     id: 2,
  //     title: "Team Offsite Location",
  //     description: "Where should we hold our next team gathering?",
  //     createdAt: "Dec 5, 2025",
  //     creatorName: "Bob Smith",
  //     participants: 15,
  //     status: "Active",
  //     progress: 78,
  //     category: "People",
  //   },
  //   {
  //     id: 3,
  //     title: "Support Response Target",
  //     description: "What response time goal should we aim for?",
  //     createdAt: "Dec 10, 2025",
  //     creatorName: "Charlie Brown",
  //     participants: 18,
  //     status: "Closing Soon",
  //     progress: 42,
  //     category: "Customer",
  //   },
  // ];

  const hasPolls = Array.isArray(response?.polls) && response.polls.length > 0;
  const list = hasPolls ? response.polls : polls;

  return (
    <main className="min-h-screen  px-6 py-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
            Your Joined Polls
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mt-2">
            Participate and vote on decisions that matter
          </p>
        </header>

        {!list.length && (
          <div className="border border-dashed border-gray-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 px-6 py-12 text-center shadow-sm">
            <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No polls yet
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              You haven’t joined any polls. When you’re invited or create a
              poll, it will show up here so you can vote and track progress.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/polls/create"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg transition"
              >
                Create a Poll
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-300 dark:border-slate-700 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 font-semibold transition"
              >
                Back to Dashboard
              </a>
            </div>
          </div>
        )}

        {!!list.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((poll) => (
              <div
                key={poll.id}
                className="border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all hover:border-gray-300 dark:hover:border-slate-600"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300">
                    {poll.category}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      poll.status === "Active"
                        ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
                        : "bg-yellow-100 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300"
                    }`}
                  >
                    {poll.status}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {poll.title}
                </h3>
                <p className="text-gray-600 dark:text-slate-400 text-sm mb-4">
                  {poll.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{poll.createdAt}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-slate-400">
                    <Users className="h-4 w-4" />
                    <span>{poll.participants} voting</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-slate-500">
                    By {poll.creatorName}
                  </p>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-xs mb-1 text-gray-600 dark:text-slate-400">
                    <span>Participation</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {poll.progress}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500 dark:bg-blue-600 rounded-full transition-all"
                      style={{ width: `${poll.progress}%` }}
                    />
                  </div>
                </div>

                <button className="w-full rounded-lg border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center justify-center gap-2 transition">
                  View Poll
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
