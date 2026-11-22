import React from "react";

export type ElectionStatus = "Active" | "Upcoming" | "Concluded";
export type ElectionFilter = "All" | "Active" | "Upcoming" | "Concluded";
export type ElectionRoleFilter = "All" | "Admin" | "Voter";

export interface ElectionCardItem {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ElectionStatus;
  role: "admin" | "voter";
  ballotsCast: number;
  turnoutRate: string;
  allowedDomain: string;
  eligibleVoters?: number;
  startDate?: string;
  endDate?: string;
  lastActivity?: string;
}

export interface StatCardItem {
  label: string;
  value: string;
  pill: string;
  isPositive: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
