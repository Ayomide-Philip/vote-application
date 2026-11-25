export type ElectionStatus = "Active" | "Upcoming" | "Concluded";

export interface CandidateItem {
  id: string;
  name: string;
  position: string;
  department: string;
  manifesto: string;
  votes: number;
}

export interface VoterMember {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  joinedAt: string;
}

export interface ElectionDetailMeta {
  id: string;
  code: string;
  title: string;
  description: string;
  status: ElectionStatus;
  role: "admin" | "voter";
  visibility: "private" | "public";
  domain: string;
  schedule: string;
}
