import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingspinner";

export default function VoteTab({ poll, pollId }) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalCandidates = positions.reduce(
    (sum, pos) => sum + (pos.candidates?.length || 0),
    0
  );
  useEffect(() => {
    async function fetchPositions() {
      setLoading(true);
      try {
        const request = await fetch(`/api/polls/${pollId}/contestant/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred.");
          setLoading(false);
          return setPositions([]);
        }
        setPositions(response?.contestant || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error("Network Error");
      }
    }
    fetchPositions();
  }, [pollId]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] font-semibold text-gray-500 dark:text-slate-400 mb-2">
              Voting
            </p>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Cast your votes
            </h2>
            <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
              Choose a position to view candidates and submit your vote.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200">
            <Clock className="h-4 w-4" />
            <span>
              {poll?.endDate
                ? `Closes ${new Date(poll.endDate).toLocaleString()}`
                : "Ongoing"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-750 px-4 py-3">
            <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-200 flex items-center justify-center font-bold">
              {positions.length}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                Positions
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Available to vote
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-750 px-4 py-3">
            <div className="h-10 w-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-200 flex items-center justify-center font-bold">
              {totalCandidates}
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                Candidates
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                Across all positions
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-750 px-4 py-3">
            <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-200 flex items-center justify-center font-bold">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                Status
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {poll?.endDate
                  ? `Closes ${new Date(poll.endDate).toLocaleDateString()}`
                  : "Ongoing"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No positions available yet
          </p>
          <p className="text-gray-600 dark:text-slate-400">
            Once positions are added, you can cast your vote here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {positions.map((position) => {
            const candidateCount = position.candidates?.length || 0;
            const href = `/polls/${position?.pollId || ""}/vote/${
              position._id
            }`;

            const CardFooter = () => (
              <div className="mt-auto pt-4 flex items-center justify-between text-sm text-gray-600 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  {candidateCount} candidate{candidateCount !== 1 ? "s" : ""}
                </span>
                <span className="text-gray-500 dark:text-slate-500">
                  ID · {position._id.slice(-6)}
                </span>
              </div>
            );

            return (
              <div key={position._id} className="group h-full">
                <div className="h-full bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="p-5 sm:p-6 h-full flex flex-col gap-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200">
                          <span className="capitalize">
                            {position.position}
                          </span>
                        </div>
                        {position.description ? (
                          <p className="text-sm text-gray-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                            {position.description}
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500 dark:text-slate-500 italic">
                            No description provided
                          </p>
                        )}
                      </div>
                      <span className="px-3 py-2 rounded-xl bg-gray-50 dark:bg-slate-700/60 text-xs font-semibold text-gray-800 dark:text-slate-100 border border-gray-200 dark:border-slate-600 shrink-0">
                        {candidateCount}{" "}
                        {candidateCount === 1 ? "candidate" : "candidates"}
                      </span>
                    </div>

                    {candidateCount === 0 ? (
                      <div className="flex items-center gap-2 text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-3 py-2">
                        <Clock className="h-4 w-4" />
                        <span>No candidates yet</span>
                      </div>
                    ) : (
                      <div className="text-sm text-gray-600 dark:text-slate-400">
                        {candidateCount} available for this position.
                      </div>
                    )}

                    {candidateCount === 0 ? (
                      <div className="mt-auto w-full px-4 py-3 bg-gray-200 dark:bg-slate-700 text-gray-600 dark:text-slate-300 font-semibold rounded-lg flex items-center justify-center gap-2 cursor-not-allowed">
                        No candidates
                      </div>
                    ) : (
                      <Link
                        href={href}
                        className="mt-auto w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                      >
                        Vote now
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    )}

                    <CardFooter />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Message */}
      <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
        <p className="text-sm text-gray-700 dark:text-slate-300">
          You can vote once per position. Select a position to see its
          candidates.
        </p>
      </div>
    </div>
  );
}
