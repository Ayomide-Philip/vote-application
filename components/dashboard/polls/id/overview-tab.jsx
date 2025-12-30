import { Mail, Building } from "lucide-react";

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

export default function OverviewTab({ pollData }) {
  return (
    <div className="space-y-6">
      {/* Poll Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Poll Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
              Start Date
            </p>
            <p className="text-base text-gray-900 dark:text-white font-medium">
              {formatDate(pollData.startDate)}
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
              End Date
            </p>
            <p className="text-base text-gray-900 dark:text-white font-medium">
              {formatDate(pollData.endDate)}
            </p>
          </div>
        </div>
      </div>

      {/* Voting Rules */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Voting Rules
        </h2>
        <div className="space-y-4">
          {pollData.rules.emailPrefix && (
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  Email Domain
                </p>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {pollData.rules.emailPrefix}
                </p>
              </div>
            </div>
          )}
          {pollData.rules.departmentCodes.length > 0 && (
            <div className="flex items-start gap-3">
              <Building className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                  Allowed Departments
                </p>
                <div className="flex flex-wrap gap-2">
                  {pollData.rules.departmentCodes.map((dept) => (
                    <span
                      key={dept}
                      className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full uppercase"
                    >
                      {dept}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Preview */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
          Current Results
        </h2>
        <div className="space-y-4">
          {pollData.candidates.map((candidate, index) => (
            <div key={candidate.id}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-gray-400 dark:text-slate-600">
                    #{index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {candidate.name}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-slate-400">
                      {candidate.role}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                    {candidate.votes}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">
                    {candidate.percentage}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-linear-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${candidate.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
