import { auth } from "@/auth";
import DashboardNavigations from "@/components/dashboard/dashboardNavigations";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();
  if (!session?.user && !session) return redirect("/");
  return (
    <>
      <DashboardNavigations session={session}>{children} </DashboardNavigations>
    </>
  );
}
