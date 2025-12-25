import DesktopSideBar from "@/components/dashboard/desktopSideBar";

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DesktopSideBar />

      {/* Mobile Sidebar Overlay */}

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                  className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                  id="open-sidebar"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                    Dashboard
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 hidden sm:block">
                    Welcome back! Here's your voting overview
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <button className="px-3 py-2 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
                  <span className="hidden sm:inline">Create New Poll</span>
                  <span className="sm:hidden">Create</span>
                </button>
                <div className="hidden sm:flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                    JD
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Votes Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Votes
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    12,847
                  </h3>
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <span className="mr-1">↑</span> 12.5% from last month
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Active Polls Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Active Polls
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">24</h3>
                  <p className="text-sm text-blue-600 mt-2 flex items-center">
                    <span className="mr-1">•</span> 8 ending today
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Participants Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Participants
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    3,421
                  </h3>
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <span className="mr-1">↑</span> 8.2% increase
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Completion Rate Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Completion Rate
                  </p>
                  <h3 className="text-3xl font-bold text-gray-900 mt-2">
                    87.3%
                  </h3>
                  <p className="text-sm text-green-600 mt-2 flex items-center">
                    <span className="mr-1">↑</span> 3.1% improvement
                  </p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Engagement Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Engagement Snapshot */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Engagement Snapshot
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Quick pulse on how polls are performing today
                  </p>
                </div>
                <span className="px-3 py-1.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-full">
                  Live view
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg border border-gray-100 bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-gray-500">
                        Weekly Participation
                      </p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        4,912
                      </h3>
                    </div>
                    <span className="text-sm font-semibold text-green-600">
                      +12%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-700">
                        Completion Rate
                      </p>
                      <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded-full">
                        Stable
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">87%</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Up 3% vs last week
                    </p>
                  </div>

                  <div className="p-4 rounded-lg border border-gray-100 bg-white">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-medium text-gray-700">
                        Avg. Response Time
                      </p>
                      <span className="text-xs px-2 py-1 bg-yellow-50 text-yellow-700 rounded-full">
                        Needs work
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-gray-900">2m 14s</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Goal: under 2 minutes
                    </p>
                    <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{ width: "72%" }}
                      ></div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {["Community", "Product", "Culture"].map((label, idx) => {
                    const fill = [72, 54, 38][idx];
                    const color = [
                      "bg-blue-600",
                      "bg-purple-600",
                      "bg-green-600",
                    ][idx];
                    return (
                      <div
                        key={label}
                        className="p-3 rounded-lg border border-gray-100 bg-white flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-700">
                            {label}
                          </p>
                          <span className="text-xs text-gray-500">{fill}%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${color}`}
                            style={{ width: `${fill}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Actions & Deadlines */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 flex flex-col gap-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Actions & Deadlines
                  </h2>
                  <p className="text-sm text-gray-500">
                    Stay ahead of what matters
                  </p>
                </div>
                <span className="text-xs px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full">
                  3 open
                </span>
              </div>

              <div className="space-y-3">
                {[
                  {
                    title: "Close feedback on community feature",
                    due: "Due in 2 days",
                    tone: "text-orange-700 bg-orange-50",
                  },
                  {
                    title: "Publish Q1 roadmap poll",
                    due: "Scheduled for tomorrow",
                    tone: "text-blue-700 bg-blue-50",
                  },
                  {
                    title: "Remind inactive voters",
                    due: "Auto-send in 6 hours",
                    tone: "text-green-700 bg-green-50",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors"
                  >
                    <p className="text-sm font-semibold text-gray-900">
                      {item.title}
                    </p>
                    <p
                      className={`mt-1 text-xs font-medium ${item.tone} inline-flex px-2 py-0.5 rounded-full`}
                    >
                      {item.due}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mt-auto">
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Health Checklist
                </p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    Reminders sent to inactive voters
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    Mobile-friendly preview reviewed
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    Results summary exported
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Polls */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-gray-900">
                    Recent Polls
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">
                    Your most recent voting activities
                  </p>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium self-start sm:self-auto">
                  View all
                </button>
              </div>
            </div>

            <div className="divide-y divide-gray-200">
              {/* Poll Item 1 */}
              <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        Should we implement a new community feature?
                      </h3>
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full self-start">
                        Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      Community poll to gather feedback on upcoming features
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        1,234 votes
                      </span>
                      <span>Ends in 2 days</span>
                      <span className="hidden sm:inline">
                        Created: Dec 20, 2025
                      </span>
                    </div>
                  </div>
                  <button className="ml-4 px-4 py-2 text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                    View Results
                  </button>
                </div>
              </div>

              {/* Poll Item 2 */}
              <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        Preferred meeting time for quarterly review
                      </h3>
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full self-start">
                        Active
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      Vote for the best time slot that works for everyone
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        856 votes
                      </span>
                      <span>Ends in 5 days</span>
                      <span className="hidden sm:inline">
                        Created: Dec 18, 2025
                      </span>
                    </div>
                  </div>
                  <button className="sm:ml-4 px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto">
                    View Results
                  </button>
                </div>
              </div>

              {/* Poll Item 3 */}
              <div className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-0">
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="text-sm sm:text-base font-semibold text-gray-900">
                        Best programming language for 2026
                      </h3>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full self-start">
                        Closed
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-3">
                      Community vote on trending programming languages
                    </p>
                    <div className="flex flex-wrap items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        2,145 votes
                      </span>
                      <span>Ended 2 days ago</span>
                      <span className="hidden sm:inline">
                        Created: Dec 10, 2025
                      </span>
                    </div>
                  </div>
                  <button className="sm:ml-4 px-4 py-2 text-xs sm:text-sm font-medium text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors w-full sm:w-auto">
                    View Results
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
