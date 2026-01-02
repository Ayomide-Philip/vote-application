import { Plus, Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function VotersTab({ pollData, poll, pollId }) {
  const [voters, setVoters] = useState([]);
  useEffect(() => {
    async function fetchVoters() {
      try {
        const request = await fetch(`/api/polls/${pollId}/voters/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred");
          return setVoters([]);
        }
        setVoters(response?.voters);
      } catch (err) {
        console.log(err);
        setVoters([]);
        return toast.error("Network Error");
      }
    }
    fetchVoters();
  }, [pollId]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Voters
        </h2>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
          <Plus className="h-4 w-4" />
          Add Voter
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                    Voter
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                {pollData.voters.map((voter) => (
                  <tr
                    key={voter.id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {voter.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {voter.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full uppercase">
                        {voter.department}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {voter.voted ? (
                        <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle className="h-3 w-3" />
                          Voted
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 text-xs font-semibold rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <Trash2 className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
