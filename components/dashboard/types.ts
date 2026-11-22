import React from "react";

export type ElectionStatus = "Active" | "Concluded" | "Upcoming";
export type ElectionFilter = "All" | "Active" | "Concluded";

export interface ElectionCardItem {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ElectionStatus;
  lastActivity: string;
  ballotsCast: number;
  turnoutRate: string;
  allowedDomain: string;
  eligibleVoters?: number;
}

export interface StatCardItem {
  label: string;
  value: string;
  pill: string;
  isPositive: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
