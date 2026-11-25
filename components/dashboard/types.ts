import React from "react";

export type ElectionStatus = "Active" | "Upcoming" | "Concluded";
export type ElectionFilter = "All" | "Active" | "Upcoming" | "Concluded";
export type ElectionRoleFilter = "All" | "Admin" | "Voter";

export interface ElectionCardItem {
  id: string;
  admin_fullname: string;
  admin_profile_picture: string | null;
  election_title: string;
  election_description: string;
  election_code: string;
  start_time: string;
  end_time: string;
  election_type: "private" | "public";
  role: "admin" | "voter";
  voter_status: "pending" | "approved" | "rejected" | null;
  voter_joined_at: string | null;
  total_voters: number;
  created_at: string;
  status: ElectionStatus;
}

export interface StatCardItem {
  label: string;
  value: string;
  pill: string;
  isPositive: boolean;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}
