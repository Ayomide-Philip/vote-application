"use client";

import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  BarChart3,
  Settings,
  LogOut,
  Search,
  Bell,
  Mail,
  Menu,
  X,
} from "lucide-react";
import Toggle from "@/components/toggle";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", active: true },
    { icon: FileText, label: "My Polls", active: false },
    { icon: PlusCircle, label: "Create Poll", active: false },
    { icon: BarChart3, label: "Results", active: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 h-screen w-64 bg-white dark:bg-gray-800 shadow-lg transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 px-6 py-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600 dark:bg-indigo-500">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">
              VoteApp
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-4 py-6">
            <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Overview
            </div>
            {menuItems.map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                  item.active
                    ? "bg-indigo-50 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Settings & Logout */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
              Settings
            </div>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
              <Settings className="h-5 w-5" />
              <span>Setting</span>
            </button>
            <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Navbar */}
        <header className="sticky top-0 z-20 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="flex items-center justify-end px-4 py-4 sm:px-6 lg:px-8">
            {/* Mobile menu button */}
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

            <div className="flex gap-3">
              <Toggle />

              {/* Notifications */}
              <button className="relative rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Mail className="h-5 w-5" />
              </button>
              <button className="relative rounded-lg p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                <Bell className="h-5 w-5" />
                <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500"></span>
              </button>

              {/* User Profile */}
              <div className="flex items-center gap-3 rounded-lg border border-gray-200 dark:border-gray-600 py-1.5 pl-1.5 pr-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600"></div>
                <span className="hidden text-sm font-medium text-gray-700 dark:text-gray-200 sm:block">
                  Jason Ranti
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Welcome back! Here's an overview of your voting activity.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Polls
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                    24
                  </p>
                </div>
                <div className="rounded-lg bg-indigo-50 dark:bg-indigo-900/30 p-3">
                  <FileText className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Active Polls
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                    8
                  </p>
                </div>
                <div className="rounded-lg bg-green-50 dark:bg-green-900/30 p-3">
                  <PlusCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Total Votes
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                    1,247
                  </p>
                </div>
                <div className="rounded-lg bg-purple-50 dark:bg-purple-900/30 p-3">
                  <BarChart3 className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    Completed
                  </p>
                  <p className="mt-2 text-3xl font-bold text-gray-800 dark:text-white">
                    16
                  </p>
                </div>
                <div className="rounded-lg bg-orange-50 dark:bg-orange-900/30 p-3">
                  <BarChart3 className="h-6 w-6 text-orange-600 dark:text-orange-400" />
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 rounded-xl bg-white dark:bg-gray-800 p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white">
              Recent Polls
            </h2>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                >
                  <div>
                    <h3 className="font-medium text-gray-800 dark:text-white">
                      Poll Title {item}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Created 2 days ago • 45 votes
                    </p>
                  </div>
                  <button className="rounded-lg bg-indigo-600 dark:bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 dark:hover:bg-indigo-600">
                    View Results
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
