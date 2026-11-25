"use client";

import { useState } from "react";
import { gooeyToast } from "goey-toast";
import { VoterApprovalsPanel, VoterMember } from "@/components/election-detail";

const INITIAL_VOTERS: VoterMember[] = [
  {
    id: "v-1",
    name: "Adebayo Areo",
    email: "a.areo.csc2021104@oauife.edu.ng",
    status: "pending",
    joinedAt: "2 mins ago",
  },
  {
    id: "v-2",
    name: "Ifeoma Okafor",
    email: "i.okafor.csc2021042@oauife.edu.ng",
    status: "approved",
    joinedAt: "1 hr ago",
  },
];

export default function ElectionVotersPage() {
  const [voters, setVoters] = useState<VoterMember[]>(INITIAL_VOTERS);

  const handleUpdateStatus = (
    voterId: string,
    status: "approved" | "rejected",
  ) => {
    setVoters((prev) =>
      prev.map((v) => (v.id === voterId ? { ...v, status } : v)),
    );
    gooeyToast.success(`Voter ${status}.`);
  };

  return (
    <div className="space-y-6 text-left">
      <div className="pb-4 border-b-2 border-border">
        <h1 className="text-2xl sm:text-3xl font-heading font-medium tracking-tight text-foreground">
          Voters
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
          Manage joined voters and approval requests.
        </p>
      </div>

      <VoterApprovalsPanel voters={voters} onUpdateStatus={handleUpdateStatus} />
    </div>
  );
}
