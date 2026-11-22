export interface InitialCandidate {
  id: string;
  name: string;
  position: string;
  department: string;
  manifesto: string;
}

export type EligibilityScope = "institution" | "departmental" | "custom";

export interface DepartmentPreset {
  code: string;
  label: string;
}
