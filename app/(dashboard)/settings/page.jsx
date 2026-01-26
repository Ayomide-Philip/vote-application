import SettingsAccessAndRolePage from "@/components/dashboard/settings/accessandrole";
import SettingsContactPage from "@/components/dashboard/settings/contact";
import SettingsGlance from "@/components/dashboard/settings/glance";
import SettingsProfilePage from "@/components/dashboard/settings/profile";
import { BASE_URL } from "@/libs/config/configuration";
import { redirect } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export default async function Page() {
  const request = await fetch(`${BASE_URL}/api/user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request.ok || response.error) return redirect("/");
  const { user } = response;

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
          </div>

          <SettingsGlance user={user} />
        </section>
      </div>
    </main>
  );
}
