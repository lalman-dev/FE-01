export type SeniorityLevel = 
  | "entry" 
  | "mid" 
  | "senior" 
  | "lead_staff" 
  | "principal" 
  | "manager";

export type EmploymentType = 
  | "full_time" 
  | "contract" 
  | "part_time" 
  | "internship";

export type WorkMode = 
  | "remote" 
  | "hybrid" 
  | "onsite";

export type RelocationWillingness = 
  | "willing" 
  | "not_willing" 
  | "with_assistance";

export type VisaSponsorship = 
  | "required" 
  | "not_required" 
  | "authorized_locally";

export type PayFrequency = 
  | "annual" 
  | "monthly" 
  | "hourly";

export type EquityPreference = 
  | "essential" 
  | "preferred" 
  | "neutral" 
  | "not_important";

export type CompanyStage = 
  | "early_seed_a" 
  | "growth_b_d" 
  | "late_pre_ipo" 
  | "enterprise_public";

export type AiTone = 
  | "high_impact" 
  | "clear_concise" 
  | "technical_deep" 
  | "storytelling";

export type TailoringIntensity = 
  | "conservative" 
  | "balanced" 
  | "aggressive";

export interface SalaryPreferences {
  currency: string;
  frequency: PayFrequency;
  minBase: number;
  targetBase: number;
  equityPreference: EquityPreference;
}

export interface AiCopilotPreferences {
  tone: AiTone;
  tailoringIntensity: TailoringIntensity;
  customInstructions: string;
  emphasizedThemes: string[];
}

export interface JobPreferences {
  // Roles & Seniority
  roleTitles: string[];
  seniorityLevels: SeniorityLevel[];
  employmentTypes: EmploymentType[];
  
  // Location & Work Arrangement
  workModes: WorkMode[];
  preferredLocations: string[];
  relocation: RelocationWillingness;
  visaSponsorship: VisaSponsorship;
  
  // Compensation
  salary: SalaryPreferences;
  
  // Technical Skills & Stack
  primarySkills: string[];
  secondarySkills: string[];
  excludedSkills: string[];
  
  // Company & Industry
  companyStages: CompanyStage[];
  targetIndustries: string[];
  excludedCompanies: string[];
  dealbreakers: string[];
  
  // AI Tailoring & Copilot
  aiCopilot: AiCopilotPreferences;
  
  // Metadata
  meta: {
    lastSavedAt: string | null;
    version: number;
  };
}

export type PreferenceSectionId = 
  | "roles" 
  | "location" 
  | "compensation" 
  | "skills" 
  | "companies" 
  | "ai_copilot";

export interface PresetProfile {
  id: string;
  name: string;
  roleDescription: string;
  preferences: Omit<JobPreferences, "meta">;
}

export interface ValidationWarning {
  field: string;
  message: string;
  section: PreferenceSectionId;
}
