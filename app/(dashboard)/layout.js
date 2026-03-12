import { auth } from "@/auth";
import DashboardNavigations from "@/components/dashboard/dashboardNavigations";
// import { BASE_URL } from "@/libs/config/configuration";
// import { cookies } from "next/headers";
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
