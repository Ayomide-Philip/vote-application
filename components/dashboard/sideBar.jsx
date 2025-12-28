import { BarChart3, Settings, LogOut } from "lucide-react";
import { LayoutDashboard, FileText, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar({ sidebarOpen, sidebarCollapsed }) {
  const pathname = usePathname();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      active: pathname.includes("dashboard"),
      href: "/dashboard",
    },
    {
      icon: FileText,
      label: "My Polls",
      active: pathname.includes("mypolls"),
      href: "/polls",
    },
    {
      icon: PlusCircle,
      label: "Create Poll",
      active: pathname.includes("createpoll"),
      href: "/createpoll",
    },
    {
      icon: BarChart3,
      label: "Results",
      active: pathname.includes("results"),
      href: "/results",
    },
  ];
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-20" : "lg:w-64"}`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 shrink-0">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <span
            className={`text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap ${
              sidebarCollapsed ? "lg:hidden" : ""
            }`}
          >
            VoteApp
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          <div
            className={`mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${
              sidebarCollapsed ? "lg:hidden" : ""
            }`}
          >
            Overview
          </div>
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item?.href}
              className={`flex w-full cursor-pointer items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              } ${sidebarCollapsed ? "lg:justify-center" : ""}`}
              title={sidebarCollapsed ? item.label : ""}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              <span className={sidebarCollapsed ? "lg:hidden" : ""}>
                {item.label}
              </span>
            </Link>
          ))}
        </nav>

        {/* Settings & Logout */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          <div
            className={`mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500 ${
              sidebarCollapsed ? "lg:hidden" : ""
            }`}
          >
            Settings
          </div>
          <Link
            href="/settings"
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              sidebarCollapsed ? "lg:justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Setting" : ""}
          >
            <Settings className="h-5 w-5 shrink-0" />
            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Setting</span>
          </Link>
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 ${
              sidebarCollapsed ? "lg:justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Logout" : ""}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <span className={sidebarCollapsed ? "lg:hidden" : ""}>Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
