/* eslint-disable @next/next/no-img-element */
// "use client";

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

export default function SettingsPage({ user }) {
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

  const profile = user ?? fallbackUser;
  const roles = Array.isArray(profile.voteInformation)
    ? profile.voteInformation
    : [];
  const primaryRole = roles[0]?.role ?? "Member";
  const pollsCount = roles.length;
  const department = profile.department ?? "Not set";
  const faculty = profile.faculty ?? "Not set";
  const authProvider = profile.googleId ? "Google" : "Email";
  const initials = toInitials(profile.name);

  return (
    <main className="min-h-screen overflow-x-hidden bg-linear-to-b from-slate-900 via-slate-950 to-black px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <header className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 shadow-xl shadow-black/40 sm:px-6 sm:py-5">
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            User settings
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">
              Account overview
            </h1>
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-200">
              {authProvider} linked
            </span>
            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-slate-200">
              {primaryRole}
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Keep your profile, contact, and security details aligned with what
            you share across polls. All values below render from the data passed
            into this page.
          </p>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                    <UserRound className="h-4 w-4" />
                  </div>
                  <span>Profile</span>
                </div>
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10">
                  Edit profile
                </button>
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-linear-to-br from-indigo-500 to-cyan-500 text-lg font-semibold text-white">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt={profile.name ?? "User avatar"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    initials
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-400">Display name</p>
                  <p className="truncate text-base font-semibold text-white">
                    {profile.name || "Not provided"}
                  </p>
                  <p className="text-xs text-slate-500">
                    Shown on your public votes
                  </p>
                </div>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Full name", value: profile.name },
                  { label: "Email", value: profile.email },
                  { label: "Department", value: department },
                  { label: "Faculty", value: faculty },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {item.value || "Not set"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>Contact</span>
                </div>
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10">
                  Update contact
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {[
                  { label: "Primary email", value: profile.email },
                  { label: "Phone", value: "Not set" },
                  { label: "Account ID", value: profile._id },
                  { label: "Auth provider", value: authProvider },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {item.value || "Not set"}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Contact details drive notifications and recovery; add a phone to
                enable SMS recovery.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  <span>Access & roles</span>
                </div>
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10">
                  Manage access
                </button>
              </div>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    Primary role
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {primaryRole}
                  </p>
                </div>
                <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-3">
                  <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                    Poll assignments
                  </p>
                  <p className="text-sm font-semibold text-white">
                    {pollsCount > 0 ? `${pollsCount} active` : "None"}
                  </p>
                </div>
              </div>
              <div className="mt-3 space-y-2">
                {roles.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 bg-white/5 px-3 py-3 text-sm text-slate-400">
                    No poll roles assigned yet.
                  </div>
                ) : (
                  roles.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex items-center gap-2 text-slate-200 min-w-0">
                        <Fingerprint className="h-4 w-4 text-cyan-300" />
                        <span className="font-semibold truncate">
                          {assignment.role}
                        </span>
                      </div>
                      <span className="break-all text-xs text-slate-400 sm:truncate sm:break-normal">
                        Poll ID: {assignment.pollId}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
                    <Lock className="h-4 w-4" />
                  </div>
                  <span>Security</span>
                </div>
                <button className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-100 transition hover:border-white/20 hover:bg-white/10">
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
                    className="rounded-xl border border-white/10 bg-white/5 px-3 py-3"
                  >
                    <p className="text-xs uppercase tracking-[0.12em] text-slate-400">
                      {item.label}
                    </p>
                    <p className="text-sm font-semibold text-white">
                      {item.value || "Not set"}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Enable 2FA to protect access to polls you own or manage.
              </p>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <h2 className="text-sm font-semibold text-white">At a glance</h2>
              <div className="mt-3 space-y-3">
                {[
                  {
                    label: "Status",
                    value: profile.googleId
                      ? "Verified via Google"
                      : "Email only",
                    icon: <BadgeCheck className="h-4 w-4 text-emerald-300" />,
                  },
                  {
                    label: "Poll roles",
                    value: pollsCount > 0 ? `${pollsCount} assigned` : "None",
                    icon: <Bell className="h-4 w-4 text-cyan-300" />,
                  },
                  {
                    label: "Recovery",
                    value: profile.googleId ? "Google account" : "Add phone",
                    icon: <Phone className="h-4 w-4 text-indigo-300" />,
                  },
                  {
                    label: "Member since",
                    value: formatDate(profile.createdAt),
                    icon: <ShieldCheck className="h-4 w-4 text-amber-300" />,
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    <div className="flex items-center gap-2 text-slate-300">
                      {item.icon}
                      <span>{item.label}</span>
                    </div>
                    <span className="truncate font-semibold text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
