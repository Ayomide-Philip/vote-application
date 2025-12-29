import CreatePollForm from "@/components/dashboard/polls/create/form";
import { Plus, Calendar, FileText, Settings } from "lucide-react";

export default function CreatePollPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 dark:bg-blue-700 text-white">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Create a New Poll
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-base leading-relaxed max-w-2xl">
            Set up your poll by providing a clear title, detailed description,
            defining the voting timeline, and configuring access rules to
            control participation.
          </p>
        </div>
      </div>

      <div className="px-6 py-12 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-3xl mx-auto">
          <CreatePollForm />
        </div>
      </div>
    </main>
  );
}
