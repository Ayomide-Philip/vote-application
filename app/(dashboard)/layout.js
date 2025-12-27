import DashboardNavigations from "@/components/dashboard/dashboardNavigations";

export default function Layout({ children }) {
  return (
    <>
      <DashboardNavigations> {children} </DashboardNavigations>
    </>
  );
}
