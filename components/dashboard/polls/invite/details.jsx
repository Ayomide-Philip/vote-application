/* eslint-disable @next/next/no-img-element */
"use client";

export default function InvitationDetails({ pollData }) {
  return (
    <div className="px-8 sm:px-12 py-10">
      <p className="text-gray-700 dark:text-slate-300 text-center mb-8 leading-relaxed">
        {pollData?.description}
      </p>

      {/* Divider */}
      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-medium">
            Voting Eligibility
          </span>
        </div>
      </div>

      {/* Voting Criteria */}
      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-5 mb-10">
        <p className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-4">
          Who Can Vote
        </p>
        <div className="space-y-3">
          {pollData?.rule?.emailPrefix && (
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Email Domain Required
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400">
                  Must have a {pollData?.rule?.emailPrefix} email address
                </p>
              </div>
            </div>
          )}
          {pollData?.rule?.departmentCodes.length > 0 && (
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                ✓
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Department Membership
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400 mb-2">
                  Must be part of one of these departments:
                </p>
                <div className="flex flex-wrap gap-2">
                  {pollData?.rule?.departmentCodes.map((dept) => (
                    <span
                      key={dept}
                      className="inline-block px-2.5 py-1 bg-purple-200 dark:bg-purple-800/50 text-purple-900 dark:text-purple-300 text-xs font-semibold rounded-full uppercase"
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

      {/* Divider */}
      <div className="relative mb-10">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-medium">
            Meet the Candidates
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-10">
        {pollData?.candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 border border-gray-200 dark:border-slate-600 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
                {candidate.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  {candidate.name}
                </h4>
                <p className="text-xs text-blue-600 dark:text-blue-400">
                  {candidate.role}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* From Section */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mb-10">
        <p className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-3">
          Created By
        </p>
        <div className="flex items-center gap-3">
          <img
            src={pollData?.userId?.image}
            alt={pollData?.userId?.name}
            className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          />

          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              {pollData?.userId?.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-slate-400">
              {pollData?.userId?.email}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg">
          Accept & Vote
        </button>
        <button className="w-full px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200">
          Decline
        </button>
      </div>
    </div>
  );
}
