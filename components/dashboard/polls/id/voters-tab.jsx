import LoadingSpinner from "@/components/loadingspinner";
import { CheckCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AddVoters from "./AddVoters";

export default function VotersTab({ poll, pollId, user }) {
  const [voters, setVoters] = useState([]);
  const [loading, setLoading] = useState(false);
  const completedVoters = poll?.completedVoters;
  function checkIfUserHasVoted(userId) {
    return completedVoters.find((user) => user === userId);
  }

  useEffect(() => {
    if (user?.poll?.role !== "Owner" && user?.poll?.role !== "Admin") {
      window.location.href = `/polls/${pollId}`;
    }
    async function fetchVoters() {
      try {
        setLoading(true);
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
          setLoading(false);
          return setVoters([]);
        }
        setVoters(response?.voters);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setVoters([]);
        setLoading(false);
        return toast.error("Network Error");
      }
    }
    fetchVoters();
  }, [pollId, user]);

  if (loading) return <LoadingSpinner />;

  async function handleRemoveVoter(voterId) {
    try {
      const request = await fetch(`/api/polls/${pollId}/voters/${voterId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(response?.error || "An error occurred");
      }
      toast.success(response?.message || "User Successfully Removed from Poll");
      window.location.reload();
    } catch (err) {
      console.log(err);
      return toast.error("Network Error");
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
          Manage Voters
        </h2>
        <AddVoters voters={voters} pollId={pollId} />
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
                {voters.map((voter) => (
                  <tr
                    key={voter._id}
                    className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-semibold capitalize text-gray-900 dark:text-white">
                          {voter?.name}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {voter.email}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full uppercase">
                        {voter?.department || "No Department Yet"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {checkIfUserHasVoted(voter._id) ? (
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
                        <button
                          onClick={() => handleRemoveVoter(voter._id)}
                          className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-700 rounded-lg transition-colors"
                        >
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
