"use client";

import { useState, useEffect } from "react";
import {
  DashboardHero,
  DashboardStats,
  ElectionsSection,
  ElectionInspectModal,
  JoinElectionModal,
  ElectionCardItem,
  ElectionFilter,
  ElectionRoleFilter,
  useElections,
} from "@/components/dashboard";

export default function DashboardPage() {
  const { elections, isLoading, reload } = useElections("all");
  const [filter, setFilter] = useState<ElectionFilter>("All");
  const [roleFilter, setRoleFilter] = useState<ElectionRoleFilter>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [inspectingElection, setInspectingElection] =
    useState<ElectionCardItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setInspectingElection(null);
        setIsJoinModalOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-8">
      <DashboardHero onOpenJoinModal={() => setIsJoinModalOpen(true)} />
      <DashboardStats />
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[0, 1].map((idx) => (
            <div
              key={idx}
              className="h-64 bg-card border border-border/60 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <ElectionsSection
          elections={elections}
          filter={filter}
          onFilterChange={setFilter}
          roleFilter={roleFilter}
          onRoleFilterChange={setRoleFilter}
          onCopyCode={handleCopyCode}
          copiedCode={copiedCode}
        />
      )}
      <ElectionInspectModal
        election={inspectingElection}
        onClose={() => setInspectingElection(null)}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />
      <JoinElectionModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
        onJoined={reload}
      />
    </div>
  );
}
