"use client";

import { useState } from "react";
import { CheckCircle, Clock, Info, ArrowRight, User } from "lucide-react";

export default function VotingPage({ params }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [voted, setVoted] = useState(false);

  // Sample poll data
  const pollData = {
    id: 1,
    title: "Election for Company Leadership Team",
    description:
      "Vote for your preferred candidate for the Chief Technology Officer position. Your vote is confidential and will help shape our organization's future.",
    position: "Chief Technology Officer",
    status: "Active",
    endDate: "2025-01-22T18:00:00",
    candidates: [
      {
        id: 1,
        name: "Michael Chen",
        role: "Senior Engineering Manager",
        email: "michael.chen@company.com",
        department: "Engineering",
        experience: "12 years in tech leadership",
        bio: "Passionate about building scalable systems and mentoring teams. Led multiple successful product launches and established engineering best practices across the organization.",
        achievements: [
          "Scaled platform to handle 10M+ users",
          "Reduced infrastructure costs by 40%",
          "Mentored 15+ engineers to senior roles",
        ],
      },
      {
        id: 2,
        name: "Alexandra Rodriguez",
        role: "Director of Product",
        email: "alex.rodriguez@company.com",
        department: "Product",
        experience: "10 years in product development",
        bio: "Focused on user-centric innovation and market strategy. Expert in translating customer needs into successful product roadmaps with proven track record of market success.",
        achievements: [
          "Launched 5 successful products",
          "Increased user engagement by 150%",
          "Built product team from 3 to 20 members",
        ],
      },
      {
        id: 3,
        name: "James Williams",
        role: "VP of Engineering",
        email: "james.williams@company.com",
        department: "Engineering",
        experience: "15 years in enterprise software",
        bio: "Expert in cloud architecture and team management. Known for building high-performing teams and delivering complex technical solutions on time and under budget.",
        achievements: [
          "Migrated entire infrastructure to cloud",
          "Managed teams of 50+ engineers",
          "Achieved 99.99% system uptime",
        ],
      },
    ],
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleVote = () => {
    if (selectedCandidate) {
      setShowConfirmation(true);
    }
  };

  const confirmVote = () => {
    // API call would go here
    setVoted(true);
    setShowConfirmation(false);
  };

  if (voted) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 transition-colors flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-lg">
          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-700 text-center p-12">
            <div className="flex justify-center mb-6">
              <div className="h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Vote Submitted!
            </h1>
            <p className="text-gray-600 dark:text-slate-400 mb-8">
              Thank you for participating in this poll. Your vote has been
              recorded successfully.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-xl p-4 mb-8">
              <p className="text-sm text-green-800 dark:text-green-200">
                Results will be announced after the voting period ends on{" "}
                <span className="font-semibold">
                  {formatDate(pollData.endDate)}
                </span>
              </p>
            </div>
            <a
              href="/dashboard/polls"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors"
            >
              Back to Polls
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-800">
        <div className="max-w-5xl mx-auto px-6 py-8 sm:py-12">
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-full mb-4">
              <span className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700 dark:text-blue-400">
                Voting Open
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {pollData.title}
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
              {pollData.description}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-500">
                  Voting Closes
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {formatDate(pollData.endDate)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <User className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500 dark:text-slate-500">
                  Candidates
                </p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {pollData.candidates.length} Running
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notice */}
      <div className="max-w-5xl mx-auto px-6 py-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              Confidential Voting
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              Your vote is anonymous and confidential. You can only vote once.
              Please review all candidates carefully before making your
              selection.
            </p>
          </div>
        </div>
      </div>

      {/* Candidates */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Select Your Candidate
        </h2>

        <div className="space-y-6">
          {pollData.candidates.map((candidate) => (
            <div
              key={candidate.id}
              onClick={() => setSelectedCandidate(candidate.id)}
              className={`bg-white dark:bg-slate-800 rounded-2xl border-2 transition-all cursor-pointer ${
                selectedCandidate === candidate.id
                  ? "border-blue-600 dark:border-blue-500 shadow-lg scale-[1.02]"
                  : "border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 hover:shadow-md"
              }`}
            >
              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-6">
                  {/* Avatar */}
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl flex-shrink-0">
                    {candidate.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400">
                          {candidate.role}
                        </p>
                      </div>
                      {selectedCandidate === candidate.id && (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="h-5 w-5 text-white" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
                          Department
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {candidate.department}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
                          Experience
                        </p>
                        <p className="text-sm text-gray-900 dark:text-white">
                          {candidate.experience}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-700 dark:text-slate-300 mb-4 leading-relaxed">
                      {candidate.bio}
                    </p>

                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-2 uppercase tracking-wider">
                        Key Achievements
                      </p>
                      <ul className="space-y-1.5">
                        {candidate.achievements.map((achievement, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700 dark:text-slate-300"
                          >
                            <span className="text-blue-600 dark:text-blue-400 font-bold mt-1">
                              •
                            </span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Vote Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={handleVote}
            disabled={!selectedCandidate}
            className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-3 ${
              selectedCandidate
                ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl"
                : "bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
            }`}
          >
            Submit Your Vote
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 flex items-center justify-center px-4 z-50">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <User className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
              Confirm Your Vote
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 text-center">
              You are about to vote for:
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 rounded-xl p-4 mb-6">
              <p className="font-bold text-gray-900 dark:text-white text-lg text-center">
                {
                  pollData.candidates.find((c) => c.id === selectedCandidate)
                    ?.name
                }
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400 text-center">
                {
                  pollData.candidates.find((c) => c.id === selectedCandidate)
                    ?.role
                }
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-slate-400 mb-8 text-center">
              This action cannot be undone. Your vote is final and confidential.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl transition-colors shadow-lg"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
