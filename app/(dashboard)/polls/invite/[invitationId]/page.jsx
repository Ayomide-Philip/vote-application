import InvitationDetails from "@/components/dashboard/polls/invite/details";
import InvitationFooter from "@/components/dashboard/polls/invite/footer";
import InvitationHeader from "@/components/dashboard/polls/invite/header";
import InvitationError from "@/components/dashboard/polls/invite/error";
import { cookies } from "next/headers";
import { BASE_URL } from "@/libs/config/configuration";

export default async function Page({ params }) {
  const { invitationId } = await params;
  const request = await fetch(`${BASE_URL}/api/polls/${invitationId}/join`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request.ok || response?.error) {
    return <InvitationError errorType="not_found" />;
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-2xl">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl dark:shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700">
            <div className="h-2 bg-linear-to-r from-blue-600 via-blue-500 to-purple-600"></div>
            <InvitationHeader pollData={response?.poll} />

            <InvitationDetails pollData={response?.poll} />

            <InvitationFooter pollData={response?.poll} />
          </div>

          <div className="mt-8 bg-white dark:bg-slate-800 rounded-xl shadow-lg dark:shadow-xl p-6 border border-gray-100 dark:border-slate-700 max-w-md mx-auto">
            <h3 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold">
                ℹ
              </span>
              Important Information
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-slate-400">
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  •
                </span>
                <span>Your vote is confidential and anonymous</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  •
                </span>
                <span>You can only vote once per person</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 dark:text-blue-400 font-bold">
                  •
                </span>
                <span>Results will be announced after voting closes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
