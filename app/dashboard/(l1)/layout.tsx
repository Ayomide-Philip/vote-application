import { DashboardShell } from "@/components/dashboard-shell";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // You can perform server-side calls here directly (e.g., auth check, database query):
  // const session = await auth();
  // const user = await db.query("SELECT * FROM users WHERE id = $1", [session?.user?.id]);

  const user = {
    name: "Katherine Adeyemi",
    email: "@oauife.edu.ng",
    initials: "KA",
  };

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
