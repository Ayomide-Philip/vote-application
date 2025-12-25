"use client";

import { useMemo, useState } from "react";

export default function DesktopSideBar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const navItems = useMemo(
    () => [
      {
        label: "Dashboard",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        ),
        active: true,
      },
      {
        label: "My Polls",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
          />
        ),
      },
      {
        label: "Create Poll",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
        ),
      },
      {
        label: "Analytics",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        ),
      },
      {
        label: "Participants",
        icon: (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        ),
      },
      {
        label: "Settings",
        icon: (
          <>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </>
        ),
      },
    ],
    []
  );

  const widthClass = isCollapsed ? "lg:w-20" : "lg:w-64";
  const textVisibility = isCollapsed
    ? "opacity-0 pointer-events-none"
    : "opacity-100";
  const justifyLogo = isCollapsed ? "justify-center" : "justify-between";

  return (
    <aside
      className={`hidden lg:flex lg:flex-col ${widthClass} bg-white dark:bg-slate-950 border-r border-gray-200 dark:border-slate-800 fixed h-full transition-all duration-200`}
    >
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-slate-800">
        <div className={`flex items-center gap-3 ${justifyLogo}`}>
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <div
            className={`flex items-center gap-2 transition-opacity duration-150 ${textVisibility}`}
          >
            <h1 className="text-xl font-bold text-gray-900 dark:text-slate-100">
              VoteApp
            </h1>
          </div>
          <button
            type="button"
            onClick={() => setIsCollapsed((prev) => !prev)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-200"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isCollapsed ? "M9 5l7 7-7 7" : "M15 5l-7 7 7 7"}
              />
            </svg>
          </button>
        </div>
      </div>
      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`group flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-colors border border-transparent ${
              item.active
                ? "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-100 border-blue-100 dark:border-blue-500/30"
                : "text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
            }`}
          >
            <svg
              className={`w-5 h-5 ${
                item.active
                  ? "text-blue-700 dark:text-blue-200"
                  : "text-gray-600 dark:text-slate-300"
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {item.icon}
            </svg>
            <span
              className={`transition-opacity duration-150 ${textVisibility}`}
            >
              {item.label}
            </span>
            {item.active && !isCollapsed && (
              <span
                className="ml-auto h-6 w-1 rounded-full bg-blue-600 dark:bg-blue-400"
                aria-hidden
              />
            )}
          </a>
        ))}
      </nav>
      {/* User Profile */}
      <div className="p-4 border-t border-gray-200 dark:border-slate-800">
        <div className="flex items-center gap-3 px-3 py-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm">
            JD
          </div>
          <div
            className={`flex-1 min-w-0 transition-opacity duration-150 ${textVisibility}`}
          >
            <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 truncate">
              John Doe
            </p>
            <p className="text-xs text-gray-500 dark:text-slate-400 truncate">
              john@example.com
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
