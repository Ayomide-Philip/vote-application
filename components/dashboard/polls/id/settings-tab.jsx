/* eslint-disable @next/next/no-img-element */
import {
  Calendar,
  Lock,
  Users,
  Award,
  Mail,
  Shield,
  Trash2,
} from "lucide-react";

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

export default function SettingsTab({ pollData, user }) {
  const creator = pollData?.userId;
  const creatorRole = pollData?.role?.find(
    (r) => r.userId?.toString() === creator?._id?.toString(),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
          Poll Settings
        </h2>
        <p className="text-sm text-gray-600 dark:text-slate-400 mt-2">
          Manage and review all poll details and configurations
        </p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Award className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Poll Information
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Poll Title
            </label>
            <input
              type="text"
              value={pollData?.title || ""}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Description
            </label>
            <textarea
              value={pollData?.description || ""}
              readOnly
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white resize-none"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                Status
              </label>
              <div className="px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${
                    new Date(pollData?.endDate) > new Date()
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                  }`}
                >
                  {new Date(pollData?.startDate) > new Date()
                    ? "Not Started"
                    : new Date(pollData?.endDate) < new Date()
                      ? "Closed"
                      : "Active"}
                </span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                Poll ID
              </label>
              <input
                type="text"
                value={pollData?._id || ""}
                readOnly
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm font-mono"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Voting Schedule
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Start Date
            </label>
            <input
              type="text"
              value={formatDate(pollData?.startDate)}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              End Date
            </label>
            <input
              type="text"
              value={formatDate(pollData?.endDate)}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Shield className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          Creator & Access
        </h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
            {creator?.image ? (
              <img
                src={creator.image}
                alt={creator.name}
                className="h-12 w-12 rounded-xl object-cover border border-gray-200 dark:border-slate-600"
              />
            ) : (
              <div className="h-12 w-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg">
                {creator?.name?.charAt(0).toUpperCase() || "?"}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {creator?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-600 dark:text-slate-400 truncate flex items-center gap-1 mt-1">
                <Mail className="h-3 w-3" />
                {creator?.email || "N/A"}
              </p>

              {creatorRole?.userRole && (
                <span className="inline-flex items-center gap-1 mt-2 px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300 rounded-md text-[10px] font-semibold">
                  <Lock className="h-3 w-3" />
                  {creatorRole.userRole}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          Voting Rules
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Email Requirement
            </label>
            <input
              type="text"
              value={pollData?.rule?.emailPrefix || "None"}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-gray-50 dark:bg-slate-700/50 text-gray-900 dark:text-white text-sm"
            />
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
              Only emails ending with this suffix can vote
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Allowed Departments
            </label>
            <div className="flex flex-wrap gap-2">
              {pollData?.rule?.departmentCodes?.length > 0 ? (
                pollData.rule.departmentCodes.map((dept, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 text-sm font-semibold uppercase"
                  >
                    {dept}
                  </span>
                ))
              ) : (
                <p className="text-gray-600 dark:text-slate-400 text-sm">
                  No department restrictions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {(user?.role === "Owner" || user?.role === "Admin") && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 sm:p-6">
          <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Danger Zone
          </h3>
          <p className="text-sm text-red-800 dark:text-red-200 mb-4">
            These actions are permanent and cannot be undone. Only poll owners
            can access this.
          </p>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold rounded-lg transition-colors">
            Delete Poll
          </button>
        </div>
      )}
    </div>
  );
}
