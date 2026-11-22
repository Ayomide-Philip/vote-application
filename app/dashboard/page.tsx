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
} from "@/components/dashboard";

const ELECTIONS_DATA: ElectionCardItem[] = [
  {
    id: "elec-1",
    code: "OAU-TECH-26",
    title: "Faculty of Technology Executive Council Election",
    description:
      "Executive leadership and departmental representative elections across engineering programs.",
    status: "Active",
    role: "admin",
    ballotsCast: 879,
    turnoutRate: "78.1%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-2",
    code: "OAU-SUG-26",
    title: "Student Union Government Presidential Ballot",
    description:
      "General campus election for the 2026/2027 academic session executive body.",
    status: "Active",
    role: "voter",
    ballotsCast: 1420,
    turnoutRate: "82.4%",
    allowedDomain: "@oauife.edu.ng",
  },
  {
    id: "elec-3",
    code: "SCI-DEAN-26",
    title: "Faculty of Science Dean & Advisory Board Ballot",
    description:
      "Academic advisory representatives and departmental student delegates.",
    status: "Upcoming",
    role: "admin",
    ballotsCast: 0,
    turnoutRate: "0.0%",
    allowedDomain: "@oauife.edu.ng",
    startDate: "Starts in 2 days",
  },
  {
    id: "elec-4",
    code: "NACOS-2026",
    title: "National Association of Computing Students (NACOS) Poll",
    description:
      "Departmental executive committee voting across all academic levels and computer labs.",
    status: "Upcoming",
    role: "voter",
    ballotsCast: 0,
    turnoutRate: "0.0%",
    allowedDomain: "@oauife.edu.ng",
    startDate: "Starts tomorrow",
  },
  {
    id: "elec-5",
    code: "PG-HALL-26",
    title: "Postgraduate Hall of Residence Executive Representative",
    description:
      "Hall committee representative and floor delegate voting for postgraduate residents.",
    status: "Concluded",
    role: "voter",
    ballotsCast: 532,
    turnoutRate: "68.2%",
    allowedDomain: "@oauife.edu.ng",
  },
];

export default function DashboardPage() {
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
      <ElectionsSection
        elections={ELECTIONS_DATA}
        filter={filter}
        onFilterChange={setFilter}
        roleFilter={roleFilter}
        onRoleFilterChange={setRoleFilter}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />
      <ElectionInspectModal
        election={inspectingElection}
        onClose={() => setInspectingElection(null)}
        onCopyCode={handleCopyCode}
        copiedCode={copiedCode}
      />
      <JoinElectionModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />
    </div>
  );
}
