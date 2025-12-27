import { BarChart3, Settings, LogOut } from "lucide-react";
import { LayoutDashboard, FileText, PlusCircle } from "lucide-react";
const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: FileText, label: "My Polls", active: false },
  { icon: PlusCircle, label: "Create Poll", active: false },
  { icon: BarChart3, label: "Results", active: false },
];
export default function SideBar({ sidebarOpen, sidebarCollapsed }) {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen bg-white dark:bg-gray-800 shadow-lg transition-all duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 ${sidebarCollapsed ? "lg:w-20" : "w-64"}`}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500 shrink-0">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <span className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              VoteApp
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-4 py-6">
          {!sidebarCollapsed && (
            <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Overview
            </div>
          )}
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                item.active
                  ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              } ${sidebarCollapsed ? "justify-center" : ""}`}
              title={sidebarCollapsed ? item.label : ""}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!sidebarCollapsed && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Settings & Logout */}
        <div className="border-t border-gray-200 dark:border-gray-700 p-4">
          {!sidebarCollapsed && (
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Settings
            </div>
          )}
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Setting" : ""}
          >
            <Settings className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Setting</span>}
          </button>
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 ${
              sidebarCollapsed ? "justify-center" : ""
            }`}
            title={sidebarCollapsed ? "Logout" : ""}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>

        {/* Collapse Toggle Button - Desktop Only */}
      </div>
    </aside>
  );
}
