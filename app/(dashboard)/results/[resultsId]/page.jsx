import ResultIdContainer from "@/components/dashboard/results/resultId/resultIdContainer";
import { BASE_URL } from "@/libs/config/configuration";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { resultsId } = await params;
  const request = await fetch(`${BASE_URL}/api/polls/${resultsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request?.ok || response?.error) return redirect("/results");
  const { poll } = response;
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <ResultIdContainer poll={poll} pollId={resultsId} />
    </main>
  );
}
