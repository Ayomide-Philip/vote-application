"use client";

import { useState } from "react";
import { Bell, Mail, Menu, X, ChevronLeft, ChevronRight } from "lucide-react";
import Toggle from "@/components/toggle";
import SideBar from "@/components/dashboard/sideBar";
export default function DashboardNavigations({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SideBar sidebarOpen={sidebarOpen} sidebarCollapsed={sidebarCollapsed} />
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div
        className={`transition-all duration-300 ${
          sidebarCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-2">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex items-center gap-2 rounded-lg px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {sidebarCollapsed ? (
                  <>
                    <ChevronRight className="h-5 w-5" />
                  </>
                ) : (
                  <>
                    <ChevronLeft className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>

            <div className="flex gap-3">
              <Toggle />

              <button className="relative rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Mail className="h-5 w-5" />
              </button>
              <button className="relative rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-600 py-1.5 pl-1.5 pr-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="h-8 w-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600"></div>
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:block">
                  Jason Ranti
                </span>
              </div>
            </div>
          </div>
        </header>

        {children}
      </div>
    </div>
  );
}
