export type WorkMode = "remote" | "hybrid" | "onsite";

export const WORK_MODES: { id: WorkMode; label: string; description: string }[] = [
  { id: "remote", label: "Remote", description: "Work from anywhere" },
  { id: "hybrid", label: "Hybrid", description: "Mix of in-office and remote" },
  { id: "onsite", label: "On-site", description: "Work on location" },
];

export type Technology = "React" | "Next.js" | "TypeScript" | "JavaScript";

export const TECHNOLOGIES: Technology[] = [
  "React",
  "Next.js",
  "TypeScript",
  "JavaScript",
];

export interface JobPreferences {
  jobTitles: string[];
  workModes: WorkMode[];
  minSalary: number | "";
  technologies: Technology[];
}

export interface FormErrors {
  jobTitleInput?: string;
  minSalary?: string;
  general?: string;
}
