import { auth } from "@/auth";
import { DashboardShell } from "@/components/dashboard-shell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can perform server-side calls here directly (e.g., auth check, database query):
  // const session = await auth();
  // const user = await db.query("SELECT * FROM users WHERE id = $1", [session?.user?.id]);

  const session = await auth();
  if (!session || !session.user) return redirect("/login");

  return <DashboardShell user={session.user}>{children}</DashboardShell>;
}
