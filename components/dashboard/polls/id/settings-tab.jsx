export default function SettingsTab({ pollData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
        Poll Settings
      </h2>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
          General Settings
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Poll Title
            </label>
            <input
              type="text"
              value={pollData.title}
              readOnly
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Description
            </label>
            <textarea
              value={pollData.description}
              readOnly
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white resize-none"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
              Status
            </label>
            <select className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white">
              <option value="Active">Active</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 sm:p-6">
        <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">
          Danger Zone
        </h3>
        <p className="text-sm text-red-800 dark:text-red-200 mb-4">
          These actions are permanent and cannot be undone.
        </p>
        <button className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold rounded-lg transition-colors">
          Delete Poll
        </button>
      </div>
    </div>
  );
}
