import { Users } from "lucide-react";
export default function ResultPosition({ poll }) {
  return (
    <>
      {poll.contestants?.map((position) => {
        const sortedCandidates = position?.candidates?.sort((a, b) => {
          return (b.votes || 0) - (a.votes || 0);
        });
        function getUserInfo(userId) {
          return poll.voters.find((voter) => voter._id === userId);
        }
        const candidate = sortedCandidates?.map((c) => {
          return { ...c, user: getUserInfo(c.userId) };
        });

        // Handle empty candidate list
        const hasCandidates = candidate && candidate.length > 0;

        return (
          <div
            key={position._id}
            className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700"
          >
            <div className="bg-gray-50 dark:bg-slate-900 px-6 py-5 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 capitalize">
                    {position.position}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-slate-400">
                    {position.description}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 bg-white dark:bg-slate-800 px-3 py-2 rounded-md border border-gray-200 dark:border-slate-700">
                    <Users className="h-4 w-4" />
                    <span className="font-semibold">
                      {position?.voters.length}
                    </span>
                    <span className="text-gray-500 dark:text-slate-400">
                      voted
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-slate-300 bg-gray-100 dark:bg-slate-900 px-3 py-2 rounded-md border border-gray-300 dark:border-slate-600">
                    <Users className="h-4 w-4" />
                    <span className="font-semibold">
                      {poll?.voters.length - position?.voters.length || 0}
                    </span>
                    <span className="text-gray-500 dark:text-slate-400">
                      didn&apos;t vote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Candidate
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Votes
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Percentage
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                      Progress
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                  {!hasCandidates ? (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500 dark:text-slate-400"
                      >
                        <div className="flex flex-col items-center gap-2">
                          <Users className="h-12 w-12 text-gray-300 dark:text-slate-600" />
                          <p className="text-sm font-medium">
                            No candidates for this position
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    candidate.map((candidate, index) => {
                      const percentage =
                        position?.voters?.length > 0
                          ? ((candidate.votes || 0) /
                              position?.voters?.length) *
                            100
                          : 0;
                      const isWinner = index === 0;

                      return (
                        <tr
                          key={candidate._id}
                          className={
                            "bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                          }
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              {isWinner ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-2xl">🏆</span>
                                  <span className="text-sm font-bold text-amber-600 dark:text-amber-400">
                                    #1
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                                  #{index + 1}
                                </span>
                              )}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-semibold text-gray-900 dark:text-white">
                              {candidate?.user?.name}
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="text-sm text-gray-600 dark:text-slate-400 truncate max-w-xs">
                              {candidate?.user?.email}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="text-lg font-bold text-gray-900 dark:text-white">
                              {candidate?.votes}
                            </div>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div
                              className={`text-sm font-semibold ${
                                isWinner
                                  ? "text-amber-600 dark:text-amber-400"
                                  : "text-gray-600 dark:text-slate-400"
                              }`}
                            >
                              {percentage?.toFixed(1)}%
                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <div className="w-32">
                              <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-sm overflow-hidden">
                                <div
                                  className={`h-full bg-indigo-600 dark:bg-indigo-500"
                                }`}
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </>
  );
}
