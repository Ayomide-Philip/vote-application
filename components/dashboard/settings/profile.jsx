/* eslint-disable @next/next/no-img-element */
"use client";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function SettingsProfilePage({ user }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    department: user?.department || "",
    faculty: user?.faculty || "",
  });

  const toInitials = (name) => {
    if (!name) return "--";
    return name
      .split(" ")
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0]?.toUpperCase())
      .join("");
  };
  const initials = toInitials(user?.name);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  async function handleSave() {
    if (formData?.department && formData?.department < 5) {
      return toast.error("Department should not be less than 5 characters!");
    }

    if (formData?.faculty && formData?.faculty < 5) {
      return toast.error("Department should not be less than 5 characters!");
    }

    try {
      const request = await fetch(`/api/user`, {
        method: "PUT",
        body: JSON.stringify({
          department: formData?.department,
          faculty: formData?.faculty,
        }),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await request.json();
      if (!request?.ok || response?.error)
        return toast.error(
          response?.error || "An Unexpected error has occurred.",
        );
      toast.success(response?.message || "User data updated successfully.");
      window.location.reload();
    } catch (error) {
      toast.error("An error occurred.");
      setIsEditing(false);
    }
  }

  const handleCancel = () => {
    setFormData({
      department: user?.department || "",
      faculty: user?.faculty || "",
    });
    setIsEditing(false);
  };

  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
            <UserRound className="h-4 w-4" />
          </div>
          <span>Profile</span>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-600"
        >
          {isEditing ? "Cancel" : "Edit profile"}
        </button>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="grid h-16 w-16 place-items-center overflow-hidden rounded-full bg-slate-200 text-lg font-semibold text-slate-800 dark:bg-slate-700 dark:text-white">
          {user.image ? (
            <img
              src={user?.image}
              alt={user?.name ?? "User avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            initials
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Display name
          </p>
          <p className="truncate capitalize text-base font-semibold text-slate-900 dark:text-white">
            {user?.name || "Not provided"}
          </p>
          <p className="text-xs text-slate-500">Shown on your public votes</p>
        </div>
      </div>

      {!isEditing ? (
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            { label: "Full name", value: user?.name },
            { label: "Email", value: user?.email },
            { label: "Department", value: user?.department || "Not set" },
            { label: "Faculty", value: user?.faculty || "Not set" },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
            >
              <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                {item.label}
              </p>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">
                {item.value
                  ? item.value.length > 20
                    ? `${item.value.slice(0, 20)}...`
                    : item.value
                  : "Not set"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
                <label className="block text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-2">
                  Full name
                </label>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.name || "Not provided"}
                </p>
              </div>
            </div>
            <div>
              <div className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900">
                <label className="block text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-2">
                  Email
                </label>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  {user?.email || "Not set"}
                </p>
              </div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-2">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                placeholder="Enter department"
              />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400 mb-2">
                Faculty
              </label>
              <input
                type="text"
                name="faculty"
                value={formData.faculty}
                onChange={handleInputChange}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-slate-900 placeholder-slate-400 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500"
                placeholder="Enter faculty"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={handleSave}
              className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
