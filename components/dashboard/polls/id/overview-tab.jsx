/* eslint-disable @next/next/no-img-element */
import { Award, Crown, Users } from "lucide-react";

export default function OverviewTab({ poll }) {
  const userMap = (poll?.voters || []).reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});

  const positionsData = (poll?.contestants || []).map((contestant) => {
    const enrichedCandidates = (contestant.candidates || [])
      .map((candidate) => ({
        ...candidate,
        name: userMap[candidate.userId]?.name || "Unknown",
        email: userMap[candidate.userId]?.email || "N/A",
        image: userMap[candidate.userId]?.image || null,
        department: userMap[candidate.userId]?.department || null,
        faculty: userMap[candidate.userId]?.faculty || null,
      }))
      .sort((a, b) => b.votes - a.votes);

    return {
      ...contestant,
      candidates: enrichedCandidates,
      totalVotes: enrichedCandidates.reduce((sum, c) => sum + c.votes, 0),
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
        Poll Overview
      </h2>

      <div className="space-y-6">
        {positionsData.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-12 sm:px-8 sm:py-14">
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700">
                <Award className="h-6 w-6 text-gray-500 dark:text-slate-300" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">
                No positions yet
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                Create positions for this poll to start adding candidates and
                collecting votes.
              </p>
            </div>
          </div>
        ) : (
          positionsData.map((position) => {
            const topThree = position.candidates.slice(0, 3);

            return (
              <div
                key={position._id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-slate-800 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3 mb-2 capitalize">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                          <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className="truncate">{position.position}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 ml-10 sm:ml-13 line-clamp-2">
                        {position.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50/50 dark:bg-slate-900/30 space-y-4">
                  {position.candidates.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-6 py-10 sm:px-8 sm:py-12">
                      <div className="mx-auto max-w-md text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700">
                          <Users className="h-6 w-6 text-gray-500 dark:text-slate-300" />
                        </div>
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                          No candidates yet
                        </h4>
                        <p className="mt-2 text-sm text-gray-600 dark:text-slate-400 leading-relaxed">
                          This position is ready, but no candidates have been
                          added. Add candidates to start tracking votes here.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topThree.map((candidate, idx) => (
                          <div
                            key={candidate._id}
                            className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs"
                          >
                            {candidate.image ? (
                              <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover border border-gray-200 dark:border-slate-600"
                              />
                            ) : (
                              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg sm:text-xl">
                                {candidate.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                                  {candidate.name}
                                </span>
                              </div>
                              <div className="space-y-1 text-xs text-gray-600 dark:text-slate-300">
                                <div className="flex gap-1">
                                  <span className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400">
                                    Email:
                                  </span>
                                  <span
                                    className="truncate font-medium text-gray-900 dark:text-white"
                                    title={candidate.email}
                                  >
                                    {candidate.email}
                                  </span>
                                </div>
                                <div className="flex gap-2 flex-wrap"></div>
                                {(candidate.department ||
                                  candidate.faculty) && (
                                  <div className="flex gap-2 flex-wrap text-[11px] font-semibold">
                                    {candidate.department && (
                                      <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 text-emerald-700 dark:text-emerald-100">
                                        {candidate.department}
                                      </span>
                                    )}
                                    {candidate.faculty && (
                                      <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-indigo-700 dark:text-indigo-100">
                                        {candidate.faculty}
                                      </span>
                                    )}
                                  </div>
                                )}
                                <p className="text-[11px] font-semibold text-gray-700 dark:text-slate-200">
                                  Votes: {candidate.votes}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {position.candidates.length > 3 && (
                        <div className="space-y-2 border border-gray-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 bg-white dark:bg-slate-800">
                          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                            Other candidates
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {position.candidates.slice(3).map((candidate) => (
                              <div
                                key={candidate._id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800"
                              >
                                <span className="text-sm text-gray-800 dark:text-slate-200 truncate">
                                  {candidate.name}
                                </span>
                                <div className="text-right">
                                  <p
                                    className="text-xs text-gray-500 dark:text-slate-400 truncate"
                                    title={candidate.email}
                                  >
                                    {candidate.email}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {candidate.votes}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
