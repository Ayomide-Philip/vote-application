"use client";
import { BarChart3, FileText, PlusCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const pollData = [
  { day: "Mon", active: 120, completed: 85 },
  { day: "Tue", active: 150, completed: 110 },
  { day: "Wed", active: 98, completed: 75 },
  { day: "Thu", active: 140, completed: 105 },
  { day: "Fri", active: 165, completed: 130 },
  { day: "Sat", active: 95, completed: 60 },
  { day: "Sun", active: 125, completed: 90 },
];

export default function Page() {
  const [period, setPeriod] = useState("Week");
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Welcome back! Here&apos;s an overview of your voting activity.
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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Activity Statistics
          </h2>
        </div>

        {/* Bar Chart - Responsive */}
        <div className="overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <ResponsiveContainer width="100%" height={350} minWidth={300}>
            <BarChart
              data={pollData}
              margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                opacity={0.5}
              />
              <XAxis
                dataKey="day"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "0.75rem",
                  color: "#fff",
                  padding: "12px",
                }}
                cursor={{ fill: "rgba(79, 70, 229, 0.1)" }}
              />
              <Legend
                wrapperStyle={{
                  paddingTop: "20px",
                  fontSize: "12px",
                }}
                iconType="square"
              />
              <Bar
                dataKey="active"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
                name="Active Polls"
              />
              <Bar
                dataKey="completed"
                fill="#60a5fa"
                radius={[8, 8, 0, 0]}
                name="Completed Polls"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}
