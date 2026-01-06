import SettingsAccessAndRolePage from "@/components/dashboard/settings/accessandrole";
import SettingsContactPage from "@/components/dashboard/settings/contact";
import SettingsProfilePage from "@/components/dashboard/settings/profile";
import { BASE_URL } from "@/libs/config/configuration";
import {
  BadgeCheck,
  Bell,
  Fingerprint,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatRelative = (dateString) => {
  if (!dateString) return "Unknown";
  const diff = Date.now() - new Date(dateString).getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days <= 0) return "Today";
  if (days === 1) return "1 day ago";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months === 1) return "1 month ago";
  return `${months} months ago`;
};

const toInitials = (name) => {
  if (!name) return "--";
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
};

export default async function Page() {
  // send a request to the backend to get the user data
  const request = await fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  // get the user data from the response
  const response = await request.json();
  if (!request.ok || response.error) return redirect("/");
  const { user } = response;
  console.log("User data response:", user);

  const fallbackUser = {
    _id: "69541172141b7f27d67277d6",
    name: "areo ayomide",
    email: "areoayomide2008@gmail.com",
    image:
      "https://lh3.googleusercontent.com/a/ACg8ocKcF1ME3HsMJ_gDZeLPz7225HnBnzVY-p_DWJIaDEdWWSS11TQ=s96-c",
    googleId: "111361482668372854457",
    department: null,
    faculty: null,
    voteInformation: [
      {
        pollId: "695c0ce80183e6f7f7ae0456",
        role: "Owner",
        _id: "695c0ce80183e6f7f7ae045a",
      },
    ],
    createdAt: "2025-12-30T17:52:50.635Z",
    updatedAt: "2026-01-05T19:11:36.965Z",
  };

  const profile = fallbackUser;
  const roles = Array.isArray(profile.voteInformation)
    ? profile.voteInformation
    : [];
  const primaryRole = roles[0]?.role ?? "Member";
  const pollsCount = roles.length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-slate-900 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 dark:bg-slate-950 dark:text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-5 sm:gap-6">
        <header className="rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-md sm:px-6 sm:py-5 dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-500 dark:text-slate-400">
            User settings
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
            <h1 className="text-2xl font-semibold text-slate-900 sm:text-3xl dark:text-white">
              Account overview
            </h1>
          </div>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Keep your profile, contact, and security details aligned with what
            you share across polls. All values below render from the data passed
            into this page.
          </p>
        </header>

        <section className="grid gap-4 sm:gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4 sm:space-y-5">
            <SettingsProfilePage user={user} />

            <SettingsContactPage user={user} />

            <SettingsAccessAndRolePage user={user} />

            {/* <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
                    <Lock className="h-4 w-4" />
                  </div>
                  <span>Security</span>
                </div>
                <button className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-600">
                  Manage security
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  {
                    label: "Sign-in",
                    value: profile.googleId ? "Google OAuth" : "Email/password",
                  },
                  { label: "Two-factor", value: "Not configured" },
                  { label: "Created", value: formatDate(profile.createdAt) },
                  {
                    label: "Last updated",
                    value: formatRelative(profile.updatedAt),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {item.value || "Not set"}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Enable 2FA to protect access to polls you own or manage.
              </p>
            </div> */}
          </div>

          {/* <aside className="space-y-4 sm:space-y-5">
            <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                At a glance
              </h2>
              <div className="mt-3 space-y-3">
                {[
                  {
                    label: "Status",
                    value: profile.googleId
                      ? "Verified via Google"
                      : "Email only",
                    icon: (
                      <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
                    ),
                  },
                  {
                    label: "Poll roles",
                    value: pollsCount > 0 ? `${pollsCount} assigned` : "None",
                    icon: (
                      <Bell className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                    ),
                  },
                  {
                    label: "Recovery",
                    value: profile.googleId ? "Google account" : "Add phone",
                    icon: (
                      <Phone className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
                    ),
                  },
                  {
                    label: "Member since",
                    value: formatDate(profile.createdAt),
                    icon: (
                      <ShieldCheck className="h-4 w-4 text-amber-700 dark:text-amber-300" />
                    ),
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
                  >
                    <div className="flex items-center gap-2 text-slate-600 min-w-0 dark:text-slate-300">
                      {item.icon}
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span className="truncate font-semibold text-slate-900 max-w-[60%] sm:max-w-none dark:text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside> */}
        </section>
      </div>
    </main>
  );
}
