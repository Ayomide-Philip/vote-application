import PollIdContainer from "@/components/dashboard/polls/id/pollContainer";
import { BASE_URL } from "@/libs/config/configuration";
import getUserInformation from "@/libs/userInformation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PollDetailsPage({ params }) {
  const { pollsId } = await params;
  const request = await fetch(`${BASE_URL}/api/polls/${pollsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request.ok || response?.error) return redirect("/polls");
  const { poll } = response;

  const getUserInfo = await getUserInformation(pollsId);
  if (!getUserInfo) return redirect("/polls");
  return (
    <main className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <PollIdContainer user={getUserInfo} polls={poll} pollsId={pollsId} />
    </main>
  );
}
