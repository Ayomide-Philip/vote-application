/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function InvitationDetails({ pollData }) {
  const [loading, setLoading] = useState(false);
  async function handleAcceptInvitation() {
    setLoading(true);
    try {
      const request = await fetch(
        `/api/polls/${pollData._id.toString()}/join`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const response = await request.json();
      console.log(response);
      if (!request.ok || response?.error) {
        setLoading(false);
        return toast.error(response?.error || "An error occurred.");
      }
      toast.success(response?.message);
      window.location.href = "/polls";
    } catch (err) {
      console.log(err);
      setLoading(false);
      return toast.error("Unstable internet connection");
    }
  }
  return (
    <div className="px-8 sm:px-12 py-10">
      <p className="text-gray-700 dark:text-slate-300 text-center mb-8 leading-relaxed">
        {pollData?.description}
      </p>

      {(pollData?.rule?.emailPrefix ||
        pollData?.rule?.departmentCodes.length > 0) && (
        <>
          <div className="relative mb-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-400 font-medium">
                Voting Eligibility
              </span>
            </div>
          </div>{" "}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800/50 rounded-xl p-5 mb-10">
            <p className="text-xs font-bold text-purple-900 dark:text-purple-300 uppercase tracking-wider mb-4">
              Who Can Vote
            </p>
            <div className="space-y-3">
              {pollData?.rule?.emailPrefix && (
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
                  <div className="h-5 w-5 rounded-full bg-purple-600 dark:bg-purple-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
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
        </>
      )}

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-5 mb-10">
        <p className="text-xs font-bold text-blue-900 dark:text-blue-300 uppercase tracking-wider mb-3">
          Created By
        </p>
        <div className="flex items-center gap-3">
          <img
            src={pollData?.userId?.image}
            alt={pollData?.userId?.name}
            className="h-10 w-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-sm shrink-0"
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
      <div className="space-y-3">
        <button
          onClick={handleAcceptInvitation}
          disabled={loading}
          type="button"
          className="w-full px-6 py-4 bg-linear-to-r cursor-pointer from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {loading && (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          )}
          {loading ? "Joining..." : "Accept & Vote"}
        </button>
        <button className="w-full px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200">
          Decline
        </button>
      </div>
    </div>
  );
}
