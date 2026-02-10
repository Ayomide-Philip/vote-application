import { Users, UserPlus, CheckCircle, Clock, Share2 } from "lucide-react";
import { useState } from "react";
import { ShareOverLay } from "../create/form";
import { toast } from "react-toastify";
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateDaysUntil = (targetDate) => {
  return Math.ceil((new Date(targetDate) - new Date()) / (1000 * 60 * 60 * 24));
};

const getPollTimingStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start) {
    return {
      label: "Starts In",
      value: calculateDaysUntil(startDate),
      status: "upcoming",
    };
  } else if (now < end) {
    return {
      label: "Days Left",
      value: calculateDaysUntil(endDate),
      status: "active",
    };
  } else {
    return {
      label: "Status",
      value: "Ended",
      status: "ended",
    };
  }
};

export default function PollsIdHeader({ pollData }) {
  const {
    title,
    description,
    status,
    voters,
    contestants,
    createdAt,
    completedVoters,
    startDate,
    endDate,
    _id,
  } = pollData;
  const [overlay, setOverlay] = useState(false);
  const timingStatus = getPollTimingStatus(startDate, endDate);

  function calculateCandidate(contestants) {
    let totalCandidate = 0;
    if (contestants.length <= 0) return totalCandidate;
    // get the contestant
    for (let i = 0; i < contestants.length; i++) {
      totalCandidate += contestants[i].candidates.length;
    }

    return totalCandidate;
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/polls/invite/${pollData?._id}`,
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy link");
    }
  };
  return (
    <div className="bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  status === "Active"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                }`}
              >
                {status}
              </span>
              <span className="text-sm text-gray-600 dark:text-slate-400">
                Created {formatDate(createdAt)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {title}
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
              {description}
            </p>
          </div>

          <button
            onClick={() => setOverlay(true)}
            className="inline-flex cursor-pointer items-center justify-center h-10 w-10 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg transition-colors shadow-sm"
            title="Share Poll"
          >
            <Share2 className="h-5 w-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Total Voters
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {voters?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Votes Cast
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {completedVoters?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <UserPlus className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Candidates
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {calculateCandidate(contestants) || 0}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`bg-white dark:bg-slate-800 rounded-xl p-4 border ${"border-gray-200 dark:border-slate-700 "}`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-lg flex items-center justify-center ${
                  timingStatus.status === "upcoming"
                    ? "bg-amber-100 dark:bg-amber-900/30"
                    : timingStatus.status === "active"
                      ? "bg-green-100 dark:bg-green-900/30"
                      : "bg-red-100 dark:bg-red-900/30"
                }`}
              >
                <Clock
                  className={`h-5 w-5 ${
                    timingStatus.status === "upcoming"
                      ? "text-amber-600 dark:text-amber-400"
                      : timingStatus.status === "active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  {timingStatus.label}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {timingStatus.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {overlay && (
        <ShareOverLay
          handleCloseModal={() => setOverlay(false)}
          handleCopyLink={handleCopyLink}
          redirectUrl={`/polls/invite/${pollData?._id}`}
          shareLink={`${window.location.origin}/polls/invite/${pollData?._id}`}
        />
      )}
    </div>
  );
}
