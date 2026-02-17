"use client";

import { useState } from "react";
import { Calendar, Settings, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

export default function CreatePollForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    emailPrefix: "",
    departmentCodes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function formatTimeFirst(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const datePart = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return `${time} • ${datePart}`;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const {
      title,
      description,
      startDate,
      endDate,
      emailPrefix,
      departmentCodes,
    } = formData;

    // check the title of the poll
    if (!title || !title.trim()) {
      return toast.error("Title is required");
    }
    // check if the title is less than 5 characters
    if (title.trim().length < 5) {
      return toast.error("Title should be at least 5 characters!");
    }
    // check if the description exist
    if (!description || !description.trim()) {
      return toast.error("Description is required");
    }

    // check if the description is less than 10 characters
    if (description.trim().length < 10) {
      return toast.error("Description should be at least 10 characters!");
    }
    // check startDate
    if (!startDate) {
      return toast.error("StartDate is required");
    }
    // check if start date is less than the current time
    if (new Date(startDate) < new Date()) {
      return toast.error("Start date cant be in the past");
    }
    // one-hour difference before a voting session start
    if (new Date(startDate) - new Date() < 60 * 60 * 1000) {
      return toast.error(
        "There should be one hour difference before the election can start",
      );
    }

    // check endDate
    if (!endDate) {
      return toast.error("End date is required");
    }
    //check if the end date is not in the past
    if (new Date(startDate) >= new Date(endDate)) {
      return toast.error("End date must be after the start date");
    }
    // check if there is 1hr difference between start date and end date
    if (new Date(endDate) - new Date(startDate) < 60 * 60 * 1000) {
      return toast.error("Poll duration must be at least 1 hour");
    }
    // check email prefix
    if (emailPrefix && emailPrefix.length < 10) {
      return toast.error("Invalid syntax for email prefix.");
    }

    if (emailPrefix && !emailPrefix.startsWith("@")) {
      return toast.error("Start with an @ symbol");
    }

    // sending it to the server
    setIsSubmitting(true);
    try {
      const request = await fetch("/api/polls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const response = await request.json();
      if (!request.ok || response.error) {
        setIsSubmitting(false);
        return toast.error(response.error || "Failed to create poll");
      }
      setIsSubmitting(false);
      toast.success("Poll created successfully!");
      window.location.href = "/polls";
    } catch (error) {
      console.log("Error creating poll:", error);
      setIsSubmitting(false);
      return toast.error("An error occurred while creating the poll.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              Poll Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData?.title}
              onChange={handleChange}
              placeholder="What should be our Q1 priority?"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleChange}
              placeholder="Provide context and details about this poll..."
              rows="5"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none transition-all"
            />
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-7">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
            <Calendar className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              Start Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="startDate"
              value={formData?.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {formData?.startDate && (
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                Preview: {formatTimeFirst(formData?.startDate)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              End Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              name="endDate"
              value={formData?.endDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {formData?.endDate && (
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                Preview: {formatTimeFirst(formData?.endDate)}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-7">
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
            <Settings className="h-5 w-5" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Access & Settings
          </h2>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              Email Prefix{" "}
              <span className="text-gray-500 dark:text-slate-500 font-normal text-xs">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              name="emailPrefix"
              value={formData?.emailPrefix}
              onChange={handleChange}
              placeholder="e.g., @company.com"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
              Restrict voting to specific email domains
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
              Department Codes{" "}
              <span className="text-gray-500 dark:text-slate-500 font-normal text-xs">
                (Optional)
              </span>
            </label>
            <input
              type="text"
              name="departmentCodes"
              value={formData?.departmentCodes}
              onChange={handleChange}
              placeholder="e.g., eng, product, sales"
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
              Comma-separated list of allowed departments
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <button
          type="button"
          className="flex-1 cursor-pointer px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex-1 cursor-pointer px-6 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 ${
            isSubmitting ? "opacity-80 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              <span>Creating...</span>
            </>
          ) : (
            "Create Poll"
          )}
        </button>
      </div>
    </form>
  );
}
