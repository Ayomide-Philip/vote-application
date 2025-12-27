import { BarChart3, FileText, PlusCircle } from "lucide-react";
export default function Page() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s an overview of your voting activity.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Polls
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                24
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/30 p-3">
              <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Active Polls
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                8
              </p>
            </div>
            <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-3">
              <PlusCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Total Votes
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                1,247
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-3">
              <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Completed
              </p>
              <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                16
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 dark:bg-orange-900/30 p-3">
              <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
          Recent Polls
        </h2>
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
            >
              <div>
                <h3 className="font-medium text-gray-800 dark:text-white">
                  Poll Title {item}
                </h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Created 2 days ago • 45 votes
                </p>
              </div>
              <button className="rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600">
                View Results
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
