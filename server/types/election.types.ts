export interface CachedUserElection {
  election_id: string;
  admin_fullname: string;
  admin_profile_picture: string | null;
  election_title: string;
  election_description: string | null;
  election_code: string;
  election_type: "private" | "public";
  election_domain_label: string | null;
  created_at: string;
  voter_status: "pending" | "approved" | "rejected" | null;
  role: "admin" | "voter" | null;
  start_time: string;
  end_time: string;
}
