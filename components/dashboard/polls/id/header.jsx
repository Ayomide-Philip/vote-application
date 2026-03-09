import { Users, UserPlus, CheckCircle, Clock } from "lucide-react";
import { useState, useEffect } from "react";

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
  const now = new Date();
  const target = new Date(targetDate);
  const diffMs = target - now;

  if (diffMs <= 0) {
    return "0d 0h 0m 0s";
  }

  const totalSeconds = Math.floor(diffMs / 1000);
  const days = Math.floor(totalSeconds / (24 * 3600));
  const hours = Math.floor((totalSeconds % (24 * 3600)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
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
    voters,
    contestants,
    createdAt,
    completedVoters,
    startDate,
    endDate,
    _id,
  } = pollData;
  const [timingStatus, setTimingStatus] = useState({
    label: "",
    value: "Loading...",
    status: "upcoming",
  });

  useEffect(() => {
    // Defer state update to avoid hydration mismatch
    const timer = setTimeout(() => {
      setTimingStatus(getPollTimingStatus(startDate, endDate));
    }, 0);

    const interval = setInterval(() => {
      setTimingStatus(getPollTimingStatus(startDate, endDate));
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [startDate, endDate]);

  function calculateCandidate(contestants) {
    let totalCandidate = 0;
    if (contestants.length <= 0) return totalCandidate;
    // get the contestant
    for (let i = 0; i < contestants.length; i++) {
      totalCandidate += contestants[i].candidates.length;
    }

    return totalCandidate;
  }

  // const handleCopyLink = async () => {
  //   try {
  //     await navigator.clipboard.writeText(
  //       `${window.location.origin}/polls/invite/${pollData?._id}`,
  //     );
  //     toast.success("Link copied to clipboard");
  //   } catch (error) {
  //     toast.error("Unable to copy link");
  //   }
  // };

  return (
    <div className="bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  new Date(endDate) > new Date()
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                }`}
              >
                {new Date(startDate) > new Date()
                  ? "Not Started"
                  : new Date(endDate) < new Date()
                    ? "Closed"
                    : "Active"}
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-6">
          <div className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 group-hover:scale-110 transition-all duration-300">
                <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Total Voters
                </p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {voters?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center group-hover:bg-green-200 dark:group-hover:bg-green-800/40 group-hover:scale-110 transition-all duration-300">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Votes Cast
                </p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {completedVoters?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 group-hover:scale-110 transition-all duration-300">
                <UserPlus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  Candidates
                </p>
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {calculateCandidate(contestants) || 0}
                </p>
              </div>
            </div>
          </div>
          <div
            className={`group bg-white dark:bg-slate-900 rounded-xl p-5 border transition-all duration-300 hover:-translate-y-1 cursor-pointer hover:shadow-lg ${
              timingStatus.status === "upcoming"
                ? "border-gray-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700"
                : timingStatus.status === "active"
                  ? "border-gray-200 dark:border-slate-700 hover:border-green-300 dark:hover:border-green-700"
                  : "border-gray-200 dark:border-slate-700 hover:border-red-300 dark:hover:border-red-700"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-12 w-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 ${
                  timingStatus.status === "upcoming"
                    ? "bg-amber-100 dark:bg-amber-900/30 group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40"
                    : timingStatus.status === "active"
                      ? "bg-green-100 dark:bg-green-900/30 group-hover:bg-green-200 dark:group-hover:bg-green-800/40"
                      : "bg-red-100 dark:bg-red-900/30 group-hover:bg-red-200 dark:group-hover:bg-red-800/40"
                }`}
              >
                <Clock
                  className={`h-6 w-6 ${
                    timingStatus.status === "upcoming"
                      ? "text-amber-600 dark:text-amber-400"
                      : timingStatus.status === "active"
                        ? "text-green-600 dark:text-green-400"
                        : "text-red-600 dark:text-red-400"
                  }`}
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">
                  {timingStatus.label}
                </p>
                <p
                  className={`text-sm font-bold transition-colors ${
                    timingStatus.status === "upcoming"
                      ? "text-gray-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400"
                      : timingStatus.status === "active"
                        ? "text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400"
                        : "text-gray-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400"
                  }`}
                >
                  {timingStatus.value}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
