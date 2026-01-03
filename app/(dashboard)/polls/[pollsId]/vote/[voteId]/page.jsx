import VoteCandidate from "@/components/dashboard/polls/vote/votecandidate";
import { Clock, Info, User } from "lucide-react";
import { BASE_URL } from "@/libs/config/configuration";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function VotingPage({ params }) {
  const { pollsId, voteId } = await params;
  const request = await fetch(
    `${BASE_URL}/api/polls/${pollsId}/contestant/${voteId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Cookie: (await cookies()).toString(),
      },
    }
  );
  const response = await request.json();
  if (!request?.ok || response?.error) return redirect(`/polls/${pollsId}`);
  const { contestant } = response;

  const pollInfo = {
    startDate: contestant?.pollId?.startDate,
    endDate: contestant?.pollId?.endDate,
    title: contestant?.position || "",
    description: contestant?.description || "",
  };

  const candidates = contestant?.candidates || [];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatus = () => {
    const now = new Date();
    const start = pollInfo.startDate ? new Date(pollInfo.startDate) : null;
    const end = pollInfo.endDate ? new Date(pollInfo.endDate) : null;

    if (start && now < start)
      return { label: "Upcoming", color: "bg-amber-500" };
    if (end && now > end) return { label: "Closed", color: "bg-rose-500" };
    return { label: "Active", color: "bg-emerald-500" };
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-full mb-4">
              <span
                className={`h-2 w-2 rounded-full animate-pulse ${
                  getStatus().color
                }`}
              ></span>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                {getStatus().label}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl capitalize font-bold text-gray-900 dark:text-white mb-3">
              {`Vote for ${pollInfo.title}` || "Voting"}
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
              {pollInfo.description || "No description provided."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-500">
                  Voting Closes
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(pollInfo.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-500">
                  Candidates
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {candidates.length} Running
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Confidential Voting
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your vote is anonymous and confidential. Integrate your own vote
              logic and eligibility checks here.
            </p>
          </div>
        </div>
      </div>

      {/* Candidates */}
      <VoteCandidate candidates={candidates} contestant={contestant} />
    </main>
  );
}
