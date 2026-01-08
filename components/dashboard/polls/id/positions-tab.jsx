import { useEffect, useState } from "react";
import { Plus, Trash2, Award, Users, BarChart3, Edit, X } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingspinner";

export default function PositionsTab({ pollId, user }) {
  const [positions, setPositions] = useState([]);
  const [newPositionName, setNewPositionName] = useState("");
  const [newPositionDescription, setNewPositionDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user?.poll?.role !== "Owner" && user?.poll?.role !== "Admin") {
      window.location.href = `/polls/${pollId}`;
    }
    async function fetchPositions() {
      setLoading(true);
      try {
        const request = await fetch(`/api/polls/${pollId}/contestant/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred.");
          setLoading(false);
          return setPositions([]);
        }
        setPositions(response?.contestant || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error("Network Error");
      }
    }
    fetchPositions();
  }, [pollId, user]);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewPositionName("");
    setNewPositionDescription("");
  };

  if (loading) return <LoadingSpinner />;

  async function handleCreatePosition() {
    // Validate input title
    if (!newPositionName.trim()) {
      return toast.error("Position is required.");
    }
    if (newPositionName.trim().length < 5) {
      return toast.error("Positon cant be less than 5 character");
    }
    // validate description
    if (!newPositionDescription.trim()) {
      return toast.error("Description is required.");
    }
    if (newPositionDescription.trim().length < 10) {
      return toast.error("Description cant be less than 10 character");
    }
    // create it in the backend
    try {
      const request = await fetch(`/api/polls/${pollId}/contestant/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          position: newPositionName,
          description: newPositionDescription,
        }),
      });
      const response = await request.json();
      if (!request.ok || response?.error) {
        return toast.error(response?.error || "An error occurred.");
      }
      toast.success(response?.message || "Position Successfully created!");
      handleCloseModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
      return toast.error("Network Error");
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-4 sm:p-6 border border-blue-100 dark:border-slate-600">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Manage Positions
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
              Create and manage positions for your election
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-6 py-3 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl shrink-0"
          >
            <Plus className="h-5 w-5" />
            <span>New Position</span>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-40 cursor-pointer backdrop-blur-sm bg-black/30 dark:bg-black/50 transition-opacity h-screen overflow-y-auto"
          onClick={handleCloseModal}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center sm:items-center justify-center z-50 px-0 sm:px-4 py-0 sm:py-0">
          <div
            className="bg-white dark:bg-slate-800 rounded-t-2xl sm:rounded-2xl border border-gray-200 dark:border-slate-700 shadow-2xl w-full sm:w-full sm:max-w-md max-h-[95vh] sm:max-h-[90vh] overflow-y-auto flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-800 px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between shrink-0">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                Create Position
              </h3>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-slate-700 rounded-lg transition-colors text-gray-600 dark:text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 flex-1 overflow-y-auto">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Position Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newPositionName}
                  onChange={(e) => setNewPositionName(e.target.value)}
                  placeholder="e.g., President, Vice President..."
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={newPositionDescription}
                  onChange={(e) => setNewPositionDescription(e.target.value)}
                  placeholder="Add details about this position..."
                  rows="3"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex gap-3 shrink-0 bg-white dark:bg-slate-800">
              <button
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2.5 sm:py-3 border cursor-pointer border-gray-300 dark:border-slate-600 rounded-lg font-medium text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handleCreatePosition}
                className="flex-1 px-4 py-2.5 cursor-pointer sm:py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
            <Award className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Positions
            </h3>
            <p className="text-sm text-gray-600 dark:text-slate-400">
              {positions.length} position{positions.length !== 1 ? "s" : ""}{" "}
              created
            </p>
          </div>
        </div>

        {positions.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-gray-300 dark:border-slate-600 p-12 text-center">
            <Award className="h-16 w-16 text-gray-400 dark:text-slate-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Positions Yet
            </h3>
            <p className="text-gray-600 dark:text-slate-400">
              Create your first position to get started
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {positions.map((position) => (
              <div
                key={position._id}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white capitalize">
                    {position.position}
                  </h4>
                  {position.description && (
                    <p className="text-sm text-gray-600 dark:text-slate-400 mt-1">
                      {position.description}
                    </p>
                  )}
                </div>

                <div className="px-6 py-4 space-y-3 flex-1">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Candidates
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {position.candidates?.length || 0}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-4 w-4 text-gray-500 dark:text-slate-400" />
                      <span className="text-sm text-gray-600 dark:text-slate-400">
                        Voters
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {position.voters?.length || 0}
                    </span>
                  </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-200 dark:border-slate-700 flex gap-3">
                  <button className="flex-1 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-300 dark:border-slate-600">
                    <Edit className="h-4 w-4" />
                    Edit
                  </button>
                  <button className="flex-1 px-3 py-2 rounded-lg font-medium text-sm flex items-center justify-center gap-2 text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-300 dark:border-slate-600">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
