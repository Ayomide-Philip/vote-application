import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ResultCard({ poll }) {
  const totalVoters = poll.voters?.length || 0;
  const completedVoters = poll.completedVoters?.length || 0;
  const participation =
    totalVoters > 0 ? (completedVoters / totalVoters) * 100 : 0;

  // Get winner from first position
  const firstPosition = poll.contestants?.[0];
  const winner = firstPosition?.candidates?.sort(
    (a, b) => (b.votes || 0) - (a.votes || 0)
  )[0];

  return (
    <div className="border border-gray-200   dark:border-slate-700 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm dark:shadow-lg hover:shadow-md dark:hover:shadow-xl transition-all hover:border-gray-300 dark:hover:border-slate-600 min-h-full flex flex-col">
      <div className="flex items-center gap-2 mb-3">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded-full ${
            poll.status === "Active"
              ? "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300"
              : "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300"
          }`}
        >
          {poll.status}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
        {poll.title}
      </h3>
      <p className="text-gray-600 dark:text-slate-400 text-sm mb-4 grow">
        {poll.description}
      </p>

      <div className="space-y-3 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-slate-400">Voters</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {totalVoters}
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600 dark:text-slate-400">Positions</span>
          <span className="font-semibold text-gray-900 dark:text-white">
            {poll.contestants?.length || 0}
          </span>
        </div>
        {winner && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600 dark:text-slate-400">
              Leading: {winner.name}
            </span>
            <span className="font-semibold text-amber-600 dark:text-amber-400">
              {winner.votes} votes
            </span>
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 space-y-3 border-t border-gray-200 dark:border-slate-700">
        <div>
          <div className="flex items-center justify-between text-xs mb-1 text-gray-600 dark:text-slate-400">
            <span>Participation</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {Math.round(participation)}%
            </span>
          </div>
          <div className="h-2 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-indigo-500 to-blue-500 rounded-full transition-all"
              style={{ width: `${participation}%` }}
            />
          </div>
        </div>

        <Link
          href={`/results/${poll._id}`}
          className="w-full rounded-lg border cursor-pointer border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 px-4 py-2 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-600 flex items-center justify-center gap-2 transition"
        >
          View Results
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
