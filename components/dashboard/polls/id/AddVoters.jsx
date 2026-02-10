import { useState } from "react";
import { UserPlus, Upload, X } from "lucide-react";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { toast } from "react-toastify";

export default function AddVoters({ voters }) {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVoterEmail, setNewVoterEmail] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [parsedData, setParsedData] = useState(null);

  const processFile = (file) => {
    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("CSV Data:", results.data);
          setParsedData(results.data);
        },
        error: (error) => {
          toast.error("Error parsing CSV:", error);
        },
      });
    } else if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.name.toLowerCase().endsWith(".xlsx")
    ) {
      // Handle Excel file and convert to CSV-like data
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];

          if (!worksheet) {
            toast.error("No worksheet found in the Excel file.");
            return;
          }

          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            defval: "",
          });

          if (!jsonData.length) {
            toast.error("Excel file is empty.");
            return;
          }

          console.log("Excel Data:", jsonData);
          setParsedData(jsonData);
        } catch (error) {
          console.error("Error processing Excel:", error);
          toast.error("Error processing Excel file.");
          setParsedData(null);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      console.warn("Unsupported file type");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setUploadedFile(file);
      processFile(file);
    }
  };

  function removeFile() {
    setUploadedFile(null);
    setParsedData(null);
  }

  function resetModal() {
    setShowAddModal(false);
    setNewVoterEmail("");
    setUploadedFile(null);
    setParsedData(null);
  }

  function handleAddVoters() {
    const emailData = parsedData
      .filter((e) => {
        if (e?.email) return e.email;
      })
      .map((e) => e.email);
    console.log("Extracted Emails:", emailData);
    // setShowAddModal(false);
    // setNewVoterEmail("");
  }

  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
      >
        <UserPlus className="h-4 w-4" />
        Add User
      </button>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Voter
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newVoterEmail}
                  onChange={(e) => setNewVoterEmail(e.target.value)}
                  placeholder="voter@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
              <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Upload CSV(Optional)
                </label>
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
                    dragActive
                      ? "border-indigo-500 dark:border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
                      : "border-gray-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400"
                  }`}
                >
                  {uploadedFile ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                        <svg
                          className="w-6 h-6 text-green-600 dark:text-green-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">
                          {uploadedFile.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">
                          {(uploadedFile.size / 1024).toFixed(2)} KB
                        </p>
                      </div>
                      <button
                        onClick={removeFile}
                        className="mt-2 inline-flex items-center gap-1 px-3 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors text-xs font-semibold"
                      >
                        <X className="w-3 h-3" />
                        Remove File
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-700 dark:text-slate-300">
                            Drag and drop your file
                          </p>
                          <p className="text-xs text-gray-500 dark:text-slate-400">
                            or click to browse
                          </p>
                        </div>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                          CSV
                        </p>
                      </div>
                    </label>
                  )}
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    className="hidden"
                    id="file-upload"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex gap-3 justify-end">
              <button
                onClick={resetModal}
                className="px-4 cursor-pointer py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleAddVoters}
                className="px-4 cursor-pointer py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Add Voter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
