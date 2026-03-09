/* eslint-disable @next/next/no-img-element */
import LoadingSpinner from "@/components/loadingspinner";
import { CheckCircle, Trash2, Shield, ShieldOff } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
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

  function checkIfUserIsAdmin(voterId) {
    const voter = voters
      ?.find((voter) => voter._id === voterId)
      ?.voteInformation.find((info) => info.pollId === pollId);

    if (voter?.role === "Admin" || voter?.role === "Owner") {
      return true;
    }
    return false;
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
            <table className="w-full table-fixed">
              <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Voter
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 dark:text-slate-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-700 bg-white dark:bg-slate-800">
                {voters.map((voter) => (
                  <tr
                    key={voter?._id}
                    className="hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={
                              voter?.image ||
                              "https://via.placeholder.com/40?text=User"
                            }
                            alt={voter?.name}
                            width={48}
                            height={48}
                            className="rounded-full object-cover ring-2 ring-blue-200 dark:ring-blue-800"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold capitalize text-gray-900 dark:text-white">
                            {voter?.name}
                          </p>
                          <p
                            className="max-w-45 sm:max-w-65 truncate text-sm text-gray-500 dark:text-slate-400"
                            title={voter?.email}
                          >
                            {voter?.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                        {voter?.department || "No Department Yet"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {checkIfUserHasVoted(voter?._id) ? (
                        <span className="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-bold rounded-full flex items-center gap-2 w-fit">
                          <CheckCircle className="h-4 w-4" />
                          Voted
                        </span>
                      ) : (
                        <span className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700/50 text-gray-700 dark:text-slate-300 text-xs font-bold rounded-full">
                          Pending
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-3">
                        {!checkIfUserIsAdmin(voter?._id) ? (
                          <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors cursor-pointer">
                            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        ) : (
                          <div className="p-2.5 rounded-lg bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-800/30 transition-colors cursor-pointer">
                            <ShieldOff className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                        )}
                        <button
                          onClick={() => handleRemoveVoter(voter._id)}
                          className="p-2.5 hover:bg-red-100 dark:hover:bg-red-900/30 cursor-pointer rounded-lg transition-colors group"
                        >
                          <Trash2 className="h-5 w-5 text-gray-600 dark:text-slate-400 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors" />
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
