/* eslint-disable @next/next/no-img-element */
import { UserRound } from "lucide-react";
export default function SettingsProfilePage({ user }) {
  const toInitials = (name) => {
    if (!name) return "--";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  };
  const initials = toInitials(user?.name);

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
            <UserRound className="h-4 w-4" />
          </div>
          <span>Profile</span>
        </div>
        <button className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-600">
          Edit profile
        </button>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-slate-200 text-lg font-semibold text-slate-800 dark:bg-slate-700 dark:text-white">
          {user.image ? (
            <img
              src={user?.image}
              alt={user?.name ?? "User avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Display name
          </p>
          <p className="truncate capitalize text-base font-semibold text-slate-900 dark:text-white">
            {user?.name || "Not provided"}
          </p>
          <p className="text-xs text-slate-500">Shown on your public votes</p>
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Full name", value: user?.name },
          { label: "Email", value: user?.email },
          { label: "Department", value: user?.department || "Not set" },
          { label: "Faculty", value: user?.faculty || "Not set" },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.value
                ? item.value.length > 20
                  ? `${item.value.slice(0, 20)}...`
                  : item.value
                : "Not set"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
