import { ShieldCheck, Fingerprint } from "lucide-react";
export default function SettingsAccessAndRolePage({ user }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
            <ShieldCheck className="h-4 w-4" />
          </div>
          <span>Access & roles</span>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Primary role
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {user?.voteInformation[0]?.role || "Member"}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
            Poll assignments
          </p>
          <p className="text-sm font-semibold text-slate-900 dark:text-white">
            {user?.voteInformation.length > 0
              ? `${user?.voteInformation.length} active`
              : "None"}
          </p>
        </div>
      </div>
      <div className="mt-3 space-y-2">
        {user?.voteInformation?.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-3 py-3 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
            No poll roles assigned yet.
          </div>
        ) : (
          user?.voteInformation.map((info) => (
            <div
              key={info?._id}
              className="flex flex-col gap-1 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-center gap-2 text-slate-800 min-w-0 dark:text-slate-200">
                <Fingerprint className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                <span className="font-semibold truncate">{info?.role}</span>
              </div>
              <span className="break-all text-xs text-slate-500 sm:truncate sm:break-normal dark:text-slate-400">
                Poll ID: {info?.pollId}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
