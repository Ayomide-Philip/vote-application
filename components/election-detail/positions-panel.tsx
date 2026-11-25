"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import { Add01Icon, Delete02Icon } from "hugeicons-react";

interface PositionsPanelProps {
  positions: string[];
  candidateCounts: Record<string, number>;
  onAddPosition: (title: string) => void;
  onRemovePosition: (title: string) => void;
}

export function PositionsPanel({
  positions,
  candidateCounts,
  onAddPosition,
  onRemovePosition,
}: PositionsPanelProps) {
  const [newTitle, setNewTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newTitle.trim();
    if (!clean) return;
    if (positions.some((p) => p.toLowerCase() === clean.toLowerCase())) {
      gooeyToast.error("Position already exists.");
      return;
    }
    onAddPosition(clean);
    setNewTitle("");
    gooeyToast.success(`Added "${clean}" position.`);
  };

  return (
    <div className="space-y-6 text-left">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 max-w-md"
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="New position (e.g. Treasurer)"
          className="text-input h-10 text-xs font-sans flex-1 min-w-0"
        />
        <button
          type="submit"
          className="btn btn-primary h-10 px-4 text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
        >
          <Add01Icon size={14} />
          <span>Add Position</span>
        </button>
      </form>

      <div className="border border-border bg-card divide-y divide-border/60">
        {positions.length === 0 ? (
          <div className="p-8 text-center text-xs font-sans text-muted-foreground">
            No positions configured yet.
          </div>
        ) : (
          positions.map((pos) => (
            <div
              key={pos}
              className="px-4 sm:px-5 py-3.5 flex items-center justify-between gap-3 text-xs font-sans"
            >
              <div className="min-w-0">
                <p className="font-heading font-semibold text-sm text-foreground truncate">
                  {pos}
                </p>
                <p className="text-[11px] text-muted-foreground mt-0.5">
                  {candidateCounts[pos] || 0} candidates
                </p>
              </div>

              <button
                type="button"
                onClick={() => onRemovePosition(pos)}
                className="p-1.5 text-muted-foreground hover:text-status-rejected transition-colors cursor-pointer"
                title="Remove position"
                aria-label={`Remove ${pos}`}
              >
                <Delete02Icon size={16} />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
