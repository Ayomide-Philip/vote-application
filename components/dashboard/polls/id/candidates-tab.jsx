/* eslint-disable @next/next/no-img-element */
import LoadingSpinner from "@/components/loadingspinner";
import { Plus, Users, Mail, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function CandidatesTab({ poll, pollId, user }) {
  const voters = poll?.voters || [];
  const [candidates, setCandidate] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedPosition, setSelectedPosition] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Get positions from poll
  const positions = poll?.contestants || [];
  useEffect(() => {
    if (user?.poll?.role !== "Owner" && user?.poll?.role !== "Admin") {
      window.location.href = `/polls/${pollId}`;
    }
    async function fetchCandidates() {
      setLoading(true);
      try {
        const request = await fetch(
          `/api/polls/${pollId}/contestant/candidate`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          },
        );
        const response = await request.json();
        if (!request.ok || response?.error) {
          setLoading(false);
          toast.error(response?.error || "An error occurred");
          return setCandidate([]);
        }
        setCandidate(response?.candidate);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Network Error");
        setLoading(false);
        return setCandidate([]);
      }
    }
    fetchCandidates();
  }, [pollId, user]);

  if (loading) return <LoadingSpinner />;
  async function setupCandidate() {
    if (!selectedUser) {
      return toast.error("No user selected!");
    }
    if (!selectedPosition) {
      return toast.error("No position selected!");
    }
    setSubmitting(true);
    try {
      console.log(selectedPosition, selectedUser);
      const request = await fetch(
        `/api/polls/${pollId}/contestant/${selectedPosition}/add/${selectedUser}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );
      const response = await request.json();
      console.log(response);
      if (!request.ok || response?.error) {
        setSubmitting(false);
        return toast.error(response?.error || "An error occurred");
      }
      toast.success(response?.message);
      window.location.reload();
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      return toast.error("Network Error");
    }
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Candidates
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
            {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}{" "}
            registered
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          <Plus className="h-5 w-5" />
          <span>Add Candidate</span>
        </button>
      </div>
      {candidates.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-4">
            <Users className="h-8 w-8 text-gray-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Candidates Yet
          </h3>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Start adding candidates for your positions
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  {candidate?.userId?.image ? (
                    <img
                      src={candidate?.userId?.image}
                      className="h-14 w-14 rounded-full object-cover border border-gray-300 dark:border-slate-600 shrink-0"
                      alt={candidate?.userId?.name}
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0 text-sm">
                      {candidate?.userId?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "?"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {candidate?.userId?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 capitalize truncate">
                      {candidate?.position}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 space-y-3 flex-1">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-slate-500 uppercase font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-sm text-gray-700 dark:text-slate-300 truncate break-all">
                      {candidate?.userId?.email}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-slate-400 font-semibold uppercase mb-1">
                    Total Votes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {candidate.votes || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-50 flex items-center sm:items-center justify-center p-4 sm:p-0">
          <div className="bg-white dark:bg-slate-800 rounded-xl sm:rounded-2xl w-full sm:w-full sm:max-w-96 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-5 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Add New Candidate
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser("");
                  setSelectedPosition("");
                }}
                className="text-gray-500 cursor-pointer dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-300 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Select User
                </label>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {voters.map((user) => (
                    <button
                      key={user._id}
                      onClick={() => setSelectedUser(user._id)}
                      className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg border transition-all text-left ${
                        selectedUser === user._id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30"
                          : "border-gray-300 dark:border-slate-600 hover:border-gray-400 dark:hover:border-slate-500 bg-white dark:bg-slate-700"
                      }`}
                    >
                      {user?.image ? (
                        <img
                          src={user.image}
                          alt={user.name}
                          className="h-10 w-10 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                          {user.name
                            ?.split(" ")
                            .map((n) => n[0])
                            .join("")
                            .toUpperCase() || "?"}
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 dark:text-white truncate">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-600 dark:text-slate-400 truncate">
                          {user.email}
                        </p>
                      </div>
                      {selectedUser === user._id && (
                        <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                          <span className="text-white font-bold text-xs">
                            ✓
                          </span>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Select Position
                </label>
                <select
                  value={selectedPosition}
                  onChange={(e) => setSelectedPosition(e.target.value)}
                  className="w-full px-4 py-3 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
                >
                  <option value="">Choose a position...</option>
                  {positions.map((position) => (
                    <option key={position._id} value={position._id}>
                      {position.position}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 px-6 py-4 flex gap-3 flex-col-reverse sm:flex-row">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setSelectedUser("");
                  setSelectedPosition("");
                }}
                className="w-full cursor-pointer px-4 py-3 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={setupCandidate}
                disabled={submitting}
                className="w-full px-4 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {submitting && (
                  <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                )}
                {submitting ? "Adding..." : "Add Candidate"}
              </button>
            </div>
          </div>
        </div>
      )}{" "}
    </div>
  );
}
