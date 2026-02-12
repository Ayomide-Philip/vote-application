"use client";

import { useState } from "react";
import { Calendar, Settings, Link2, Copy, X, Loader2 } from "lucide-react";
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
  const [showSuccess, setShowSuccess] = useState(false);
  const [shareLink, setShareLink] = useState("");
  const [redirectUrl, setRedirectUrl] = useState("/polls");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatTimeFirst = (value) => {
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
  };

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
      const targetPath = response?.poll?._id
        ? `/polls/invite/${response.poll._id}`
        : "/polls";
      setShareLink(`${window.location.origin}${targetPath}`);
      setIsSubmitting(false);
      setShowSuccess(true);
      toast.success("Poll created successfully!");
    } catch (error) {
      console.log("Error creating poll:", error);
      setIsSubmitting(false);
      return toast.error("An error occurred while creating the poll.");
    }
  }

  const handleCloseModal = () => {
    window.location.href = redirectUrl;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(
        shareLink || `${window.location.origin}${redirectUrl}`,
      );
      toast.success("Link copied to clipboard");
    } catch (error) {
      toast.error("Unable to copy link");
    }
  };

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
              value={formData.title}
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
              value={formData.description}
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
              value={formData.startDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {formData.startDate && (
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                Preview: {formatTimeFirst(formData.startDate)}
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
              value={formData.endDate}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
            />
            {formData.endDate && (
              <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                Preview: {formatTimeFirst(formData.endDate)}
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
              value={formData.emailPrefix}
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
              value={formData.departmentCodes}
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
          className="flex-1 px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200"
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

      {showSuccess && (
        <ShareOverLay
          handleCloseModal={handleCloseModal}
          shareLink={shareLink}
          redirectUrl={redirectUrl}
          handleCopyLink={handleCopyLink}
        />
      )}
    </form>
  );
}

export function ShareOverLay({
  handleCloseModal,
  shareLink,
  redirectUrl,
  handleCopyLink,
}) {
  return (
    <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center px-4 z-50">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-800 max-w-lg w-full relative overflow-hidden">
        <button
          type="button"
          onClick={handleCloseModal}
          aria-label="Close"
          className="absolute cursor-pointer right-4 top-4 h-10 w-10 rounded-full border border-gray-200 dark:border-slate-700 flex items-center justify-center text-gray-500 hover:text-gray-800 dark:text-slate-400 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="pt-10 pb-8 px-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Share Your Poll
          </h2>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Send this link to participants to let them join and vote.
          </p>

          <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl px-4 py-3 flex items-center gap-3 mb-6 text-left">
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-gray-500 dark:text-slate-500 mb-1">
                Share link
              </p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                {shareLink || `${window.location.origin}${redirectUrl}`}
              </p>
            </div>
            <button
              type="button"
              onClick={handleCopyLink}
              className="h-10 cursor-pointer w-10 rounded-xl bg-white dark:bg-slate-700 border border-gray-200 dark:border-slate-600 flex items-center justify-center text-gray-600 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-500 transition"
            >
              <Copy className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-900 dark:text-white text-left">
              Share to
            </p>
            <div className="flex items-center justify-center gap-4">
              {[
                {
                  label: "Facebook",
                  href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    shareLink || `${window.location.origin}${redirectUrl}`,
                  )}`,
                  bg: "bg-blue-600",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  ),
                },
                {
                  label: "X",
                  href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    shareLink || `${window.location.origin}${redirectUrl}`,
                  )}`,
                  bg: "bg-black dark:bg-white",
                  textColor: "text-white dark:text-black",
                  icon: (
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ),
                },
                {
                  label: "Whatsapp",
                  href: `https://api.whatsapp.com/send?text=${encodeURIComponent(
                    shareLink || `${window.location.origin}${redirectUrl}`,
                  )}`,
                  bg: "bg-green-500",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  ),
                },
                {
                  label: "Telegram",
                  href: `https://t.me/share/url?url=${encodeURIComponent(
                    shareLink || `${window.location.origin}${redirectUrl}`,
                  )}`,
                  bg: "bg-sky-500",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                  ),
                },
                {
                  label: "LinkedIn",
                  href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    shareLink || `${window.location.origin}${redirectUrl}`,
                  )}`,
                  bg: "bg-blue-700",
                  icon: (
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex flex-col items-center gap-2"
                  title={item.label}
                >
                  <div
                    className={`h-14 w-14 rounded-full ${
                      item.bg
                    } flex items-center justify-center text-white ${
                      item.textColor || ""
                    } shadow-lg hover:scale-110 transition-transform`}
                  >
                    {item.icon}
                  </div>
                  <span className="text-xs text-gray-600 dark:text-slate-400">
                    {item.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
