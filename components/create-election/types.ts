export interface InitialCandidate {
  id: string;
  name: string;
  position: string;
  department: string;
  manifesto: string;
}

export type EmailPartType = "wildcard" | "exact" | "options" | "digits";

export interface EmailPartRule {
  id: string;
  originalText: string;
  type: EmailPartType;
  options: string[];
  digitPrefixes: string[];
  digitsMode: "any" | "prefix";
  digitLength?: number | null;
  isOptional: boolean;
  delimiter: string;
}
