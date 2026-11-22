"use client";

import { useState, useEffect } from "react";
import {
  DashboardHero,
  DashboardStats,
  ElectionsSection,
  ElectionInspectModal,
  ElectionCardItem,
  ElectionFilter,
} from "@/components/dashboard";

const ELECTIONS_DATA: ElectionCardItem[] = [
  {
    id: "elec-1",
    code: "OAU-TECH-26",
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections.",
    status: "Active",
    lastActivity: "Last ballot cast: 5 mins ago",
    ballotsCast: 879,
    turnoutRate: "78.1%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-2",
    code: "OAU-SUG-26",
    title: "Student Union Government Presidential Ballot",
    description: "General campus election for the 2026/2027 academic session.",
    status: "Concluded",
    lastActivity: "Concluded: 1 day ago",
    ballotsCast: 1420,
    turnoutRate: "82.4%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-3",
    code: "PG-HALL-26",
    title: "Postgraduate Hall of Residence Executive Representative",
    description: "Hall committee representative and floor delegate voting.",
    status: "Concluded",
    lastActivity: "Concluded: 3 days ago",
    ballotsCast: 532,
    turnoutRate: "68.2%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-4",
    code: "NACOS-2026",
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels.",
    status: "Active",
    lastActivity: "Last ballot cast: 3 mins ago",
    ballotsCast: 1015,
    turnoutRate: "84.6%",
    allowedDomain: "@oauife.edu.ng",
  },
];

export default function DashboardPage() {
  const [filter, setFilter] = useState<ElectionFilter>("All");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [inspectingElection, setInspectingElection] =
    useState<ElectionCardItem | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setInspectingElection(null);
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
      <DashboardHero />
      <DashboardStats />
      <ElectionsSection
        elections={ELECTIONS_DATA}
        filter={filter}
        onFilterChange={setFilter}
        onInspect={setInspectingElection}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />
      <ElectionInspectModal
        election={inspectingElection}
        onClose={() => setInspectingElection(null)}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />
    </div>
  );
}
