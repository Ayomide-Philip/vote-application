import ResultCard from "@/components/dashboard/results/resultcard";
import { TrendingUp } from "lucide-react";

export default function ResultsPage() {
  // Static sample data
  const polls = [
    {
      _id: "1",
      title: "Student President Election 2025",
      description: "Vote for the next student president of our institution",
      status: "Completed",
      voters: Array(150).fill(null),
      completedVoters: Array(145).fill(null),
      contestants: [
        {
          _id: "pos1",
          position: "President",
          candidates: [
            { _id: "c1", name: "Alice Johnson", votes: 62 },
            { _id: "c2", name: "Bob Smith", votes: 55 },
            { _id: "c3", name: "Charlie Davis", votes: 28 },
          ],
        },
        {
          _id: "pos2",
          position: "Vice President",
          candidates: [
            { _id: "c4", name: "Diana Wilson", votes: 71 },
            { _id: "c5", name: "Eve Martinez", votes: 48 },
            { _id: "c6", name: "Frank Brown", votes: 26 },
          ],
        },
        {
          _id: "pos3",
          position: "Treasurer",
          candidates: [
            { _id: "c7", name: "Grace Lee", votes: 83 },
            { _id: "c8", name: "Henry Garcia", votes: 40 },
            { _id: "c9", name: "Ivy Rodriguez", votes: 22 },
          ],
        },
      ],
    },
    {
      _id: "2",
      title: "Faculty Award Voting",
      description: "Select the best faculty member of the year",
      status: "Active",
      voters: Array(200).fill(null),
      completedVoters: Array(87).fill(null),
      contestants: [
        {
          _id: "pos4",
          position: "Best Professor Award",
          candidates: [
            { _id: "c10", name: "Dr. Michael Anderson", votes: 45 },
            { _id: "c11", name: "Prof. Sarah Taylor", votes: 32 },
            { _id: "c12", name: "Dr. James Wilson", votes: 10 },
          ],
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen px-6 mb-10 py-8 transition-colors">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Results
            </h1>
          </div>
          <p className="text-gray-600 dark:text-slate-400">
            View detailed results for each poll you joined
          </p>
        </header>

        {!polls.length && (
          <div className="border border-dashed border-gray-300 dark:border-slate-700 rounded-2xl bg-white dark:bg-slate-900 px-6 py-12 text-center shadow-sm">
            <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800/60 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No results yet
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-xl mx-auto">
              Join a poll to see voting results and analytics.
            </p>
          </div>
        )}

        {!!polls.length && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {polls.map((poll) => (
              <ResultCard key={poll._id} poll={poll} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
