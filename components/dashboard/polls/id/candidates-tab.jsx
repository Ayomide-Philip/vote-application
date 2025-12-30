import { Plus, Edit, Trash2, Mail, Building } from "lucide-react";

export default function CandidatesTab({ pollData }) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Candidates
        </h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          Add Candidate
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {pollData.candidates.map((candidate) => (
          <div
            key={candidate.id}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                  {candidate.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {candidate.name}
                  </h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {candidate.role}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <Edit className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                </button>
                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                  <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500 dark:text-slate-500" />
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {candidate.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500 dark:text-slate-500" />
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {candidate.department}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-600 dark:text-slate-400">
                  Current Votes
                </span>
                <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                  {candidate.votes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
