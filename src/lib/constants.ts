import { JobPreferences, PresetProfile, SeniorityLevel, EmploymentType, WorkMode, CompanyStage, AiTone, TailoringIntensity, EquityPreference, PayFrequency } from "@/types/preferences";

export const LOCAL_STORAGE_KEY = "applypilot_job_preferences_v1";

export const DEFAULT_PREFERENCES: JobPreferences = {
  roleTitles: ["Senior Frontend Engineer", "AI Frontend Developer"],
  seniorityLevels: ["senior", "lead_staff"],
  employmentTypes: ["full_time", "contract"],
  workModes: ["remote", "hybrid"],
  preferredLocations: ["Remote - US / Global", "San Francisco, CA", "New York, NY"],
  relocation: "not_willing",
  visaSponsorship: "authorized_locally",
  salary: {
    currency: "USD",
    frequency: "annual",
    minBase: 145000,
    targetBase: 185000,
    equityPreference: "preferred",
  },
  primarySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "JavaScript (ES6+)"],
  secondarySkills: ["GraphQL", "Node.js", "AI Prompts / LLM APIs", "State Management", "Vite"],
  excludedSkills: ["Legacy jQuery", "AngularJS (1.x)", "PHP 5", "Perl"],
  companyStages: ["early_seed_a", "growth_b_d"],
  targetIndustries: ["AI & Machine Learning", "Developer Tools & Infrastructure", "SaaS & Productivity"],
  excludedCompanies: ["Crypto Scam Ventures", "Gambling / Online Casinos"],
  dealbreakers: ["Unpaid trial projects > 4 hours", "Mandatory 5-day on-site requirement"],
  aiCopilot: {
    tone: "high_impact",
    tailoringIntensity: "balanced",
    customInstructions: "Emphasize frontend performance optimization (Core Web Vitals), accessible React architectures, and hands-on integration with streaming LLM interfaces.",
    emphasizedThemes: ["0-to-1 Product Craftsmanship", "Performance & Core Web Vitals", "AI UX & Streaming Systems", "Design Systems Architecture"],
  },
  meta: {
    lastSavedAt: null,
    version: 1,
  },
};

export const PRESET_PROFILES: PresetProfile[] = [
  {
    id: "senior_frontend_ai",
    name: "Senior Frontend AI Engineer",
    roleDescription: "Specializes in modern Next.js/React applications with AI Copilot and LLM streaming integrations.",
    preferences: {
      roleTitles: ["Senior Frontend Engineer", "Staff UI Engineer", "AI Application Developer"],
      seniorityLevels: ["senior", "lead_staff"],
      employmentTypes: ["full_time"],
      workModes: ["remote", "hybrid"],
      preferredLocations: ["Remote - US", "San Francisco, CA", "Seattle, WA", "New York, NY"],
      relocation: "with_assistance",
      visaSponsorship: "authorized_locally",
      salary: {
        currency: "USD",
        frequency: "annual",
        minBase: 160000,
        targetBase: 210000,
        equityPreference: "preferred",
      },
      primarySkills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "LLM APIs", "WebSockets"],
      secondarySkills: ["Python", "LangChain", "Vector DBs", "Docker", "Radix UI"],
      excludedSkills: ["AngularJS", "WordPress", "Flash", "PHP 5"],
      companyStages: ["growth_b_d", "late_pre_ipo"],
      targetIndustries: ["AI & Machine Learning", "Developer Tools & Infrastructure", "B2B SaaS"],
      excludedCompanies: ["Defense / Military Weapons", "Gambling / Betting"],
      dealbreakers: ["On-call 24/7 without compensation", "Outdated monolithic frontend without modernization roadmap"],
      aiCopilot: {
        tone: "high_impact",
        tailoringIntensity: "balanced",
        customInstructions: "Quantify metrics whenever possible (e.g. latency reductions, conversion improvements, design token scale). Focus on frontend craftsmanship and AI developer tooling.",
        emphasizedThemes: ["AI Copilot UX", "TypeScript Design Systems", "Web Performance & Lighthouse 95+", "State Machines"],
      },
    },
  },
  {
    id: "fullstack_product_lead",
    name: "Full-Stack Product Engineering Lead",
    roleDescription: "Experienced leader building 0-to-1 fullstack web products across TypeScript, Node, and cloud infra.",
    preferences: {
      roleTitles: ["Full Stack Lead", "Product Engineer (Staff)", "Principal Web Developer"],
      seniorityLevels: ["lead_staff", "principal"],
      employmentTypes: ["full_time", "contract"],
      workModes: ["remote"],
      preferredLocations: ["Remote - Global", "London, UK", "Berlin, DE", "New York, NY"],
      relocation: "not_willing",
      visaSponsorship: "not_required",
      salary: {
        currency: "USD",
        frequency: "annual",
        minBase: 175000,
        targetBase: 230000,
        equityPreference: "essential",
      },
      primarySkills: ["TypeScript", "Next.js", "Node.js", "PostgreSQL", "React", "GraphQL"],
      secondarySkills: ["Prisma", "AWS / GCP", "Redis", "CI/CD Pipelines", "Docker"],
      excludedSkills: ["Ruby on Rails (legacy)", "JSP / Servlets", "ColdFusion"],
      companyStages: ["early_seed_a", "growth_b_d"],
      targetIndustries: ["FinTech", "HealthTech", "AI & Machine Learning", "Developer Tools & Infrastructure"],
      excludedCompanies: ["Predatory Payday Lending"],
      dealbreakers: ["Rigid waterfall hierarchy", "No engineering input into product roadmap"],
      aiCopilot: {
        tone: "clear_concise",
        tailoringIntensity: "aggressive",
        customInstructions: "Focus on cross-functional technical leadership, scalable architecture decisions, and business revenue impact.",
        emphasizedThemes: ["Full Lifecycle Product Ownership", "Database & API Scalability", "Team Mentorship & RFC Reviews"],
      },
    },
  },
  {
    id: "design_systems_staff",
    name: "Design Systems & UI Architect",
    roleDescription: "Focuses on high-scale component libraries, accessibility compliance (WCAG AAA), and Figma token pipelines.",
    preferences: {
      roleTitles: ["Staff Design Systems Engineer", "Lead UI Architect", "Frontend Platform Engineer"],
      seniorityLevels: ["senior", "lead_staff", "principal"],
      employmentTypes: ["full_time"],
      workModes: ["remote", "hybrid"],
      preferredLocations: ["Remote - US / Canada", "Austin, TX", "Toronto, ON"],
      relocation: "willing",
      visaSponsorship: "authorized_locally",
      salary: {
        currency: "USD",
        frequency: "annual",
        minBase: 155000,
        targetBase: 195000,
        equityPreference: "preferred",
      },
      primarySkills: ["React", "TypeScript", "Tailwind CSS", "Storybook", "Accessibility (WCAG)", "CSS Architecture"],
      secondarySkills: ["Figma Tokens", "Radix UI", "Web Components", "Turborepo", "Motion / Animations"],
      excludedSkills: ["Bootstrap 3", "ExtJS", "jQuery UI"],
      companyStages: ["growth_b_d", "enterprise_public"],
      targetIndustries: ["Design Tools & Creative Tech", "SaaS & Productivity", "E-Commerce & Retail"],
      excludedCompanies: [],
      dealbreakers: ["Disregard for accessibility standards", "Lack of designer-developer collaboration"],
      aiCopilot: {
        tone: "storytelling",
        tailoringIntensity: "conservative",
        customInstructions: "Highlight comprehensive UI accessibility, design token tokenization workflows, and component adoption metrics across multiple product teams.",
        emphasizedThemes: ["WCAG 2.2 AA/AAA Compliance", "Design-to-Code Tooling", "Micro-interactions & UX Polish"],
      },
    },
  },
];

export const SENIORITY_OPTIONS: { id: SeniorityLevel; label: string; description: string }[] = [
  { id: "entry", label: "Entry / Associate", description: "0-2 years of professional experience" },
  { id: "mid", label: "Mid-Level", description: "2-5 years of hands-on delivery" },
  { id: "senior", label: "Senior Engineer", description: "5-8+ years of technical ownership & architecture" },
  { id: "lead_staff", label: "Lead / Staff", description: "Strategic technical direction & multi-team impact" },
  { id: "principal", label: "Principal / Architect", description: "Organization-wide architectural leadership" },
  { id: "manager", label: "Engineering Manager", description: "People leadership, hiring, & delivery execution" },
];

export const EMPLOYMENT_TYPE_OPTIONS: { id: EmploymentType; label: string }[] = [
  { id: "full_time", label: "Full-Time" },
  { id: "contract", label: "Contract / C2C" },
  { id: "part_time", label: "Part-Time" },
  { id: "internship", label: "Internship" },
];

export const WORK_MODE_OPTIONS: { id: WorkMode; label: string; description: string; icon: string }[] = [
  { id: "remote", label: "Remote", description: "Work anywhere within specified regions", icon: "laptop" },
  { id: "hybrid", label: "Hybrid", description: "Partial in-office & partial remote flexibility", icon: "building-2" },
  { id: "onsite", label: "On-Site", description: "Full in-office presence at company HQ", icon: "map-pin" },
];

export const RELOCATION_OPTIONS: { id: JobPreferences["relocation"]; label: string }[] = [
  { id: "not_willing", label: "No Relocation (Current location only)" },
  { id: "with_assistance", label: "Willing with Relocation Package / Stipend" },
  { id: "willing", label: "Open to Relocate Independently" },
];

export const VISA_OPTIONS: { id: JobPreferences["visaSponsorship"]; label: string }[] = [
  { id: "authorized_locally", label: "Authorized to work (No sponsorship needed)" },
  { id: "required", label: "Requires Visa Sponsorship (H-1B, O-1, etc.)" },
  { id: "not_required", label: "Citizen / Permanent Resident" },
];

export const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "US Dollar ($)" },
  { code: "EUR", symbol: "€", name: "Euro (€)" },
  { code: "GBP", symbol: "£", name: "British Pound (£)" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar (C$)" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar (A$)" },
  { code: "INR", symbol: "₹", name: "Indian Rupee (₹)" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar (S$)" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc (CHF)" },
];

export const PAY_FREQUENCY_OPTIONS: { id: PayFrequency; label: string }[] = [
  { id: "annual", label: "Per Year (Annual)" },
  { id: "monthly", label: "Per Month" },
  { id: "hourly", label: "Per Hour" },
];

export const EQUITY_OPTIONS: { id: EquityPreference; label: string; description: string }[] = [
  { id: "essential", label: "Must-Have", description: "High equity allocation or meaningful stock grants required" },
  { id: "preferred", label: "Preferred", description: "Competitive equity package desired alongside base" },
  { id: "neutral", label: "Neutral", description: "Open to cash-heavy or equity-balanced offers" },
  { id: "not_important", label: "Base Cash Focused", description: "Maximize liquid base compensation over equity" },
];

export const COMPANY_STAGE_OPTIONS: { id: CompanyStage; label: string; stageRange: string }[] = [
  { id: "early_seed_a", label: "Early-Stage Startup", stageRange: "Pre-Seed to Series A (1-30 employees)" },
  { id: "growth_b_d", label: "Growth Stage", stageRange: "Series B to Series D (30-300 employees)" },
  { id: "late_pre_ipo", label: "Late Stage / Pre-IPO", stageRange: "Series E+, Unicorns (300-1500 employees)" },
  { id: "enterprise_public", label: "Enterprise / Public", stageRange: "Established public corporations (1500+ employees)" },
];

export const AI_TONE_OPTIONS: { id: AiTone; label: string; description: string }[] = [
  { id: "high_impact", label: "High-Impact & Metric-Driven", description: "Emphasizes quantifiable outcomes, business metrics, and leadership scale" },
  { id: "clear_concise", label: "Direct & Concise", description: "Sharp, straight-to-the-point language with zero fluff or hyperbole" },
  { id: "technical_deep", label: "Technical Deep-Dive", description: "Focuses deeply on architectural rigor, algorithms, and engineering craft" },
  { id: "storytelling", label: "Narrative & Visionary", description: "Connects technical expertise with user experience and product mission" },
];

export const TAILORING_INTENSITY_OPTIONS: { id: TailoringIntensity; label: string; description: string }[] = [
  { id: "conservative", label: "Conservative", description: "Keeps 90% original wording with subtle keyword alignment" },
  { id: "balanced", label: "Balanced (Recommended)", description: "Smartly rephrases bullet points to highlight relevant job requirements" },
  { id: "aggressive", label: "Aggressive Optimization", description: "Maximum keyword tailoring and ATS scoring alignment" },
];

export const POPULAR_ROLE_SUGGESTIONS = [
  "Senior Frontend Engineer",
  "Staff Software Engineer",
  "AI Frontend Developer",
  "Full Stack Engineer",
  "Lead React Developer",
  "Frontend Architect",
  "Product Engineer",
  "UI/UX Systems Engineer",
  "Next.js Specialist",
  "Principal Frontend Developer",
];

export const POPULAR_SKILL_SUGGESTIONS = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "JavaScript (ES6+)",
  "Node.js",
  "GraphQL",
  "REST APIs",
  "State Management",
  "Redux Toolkit",
  "Zustand",
  "TanStack Query",
  "HTML5 / Semantic Web",
  "CSS3 / PostCSS",
  "Web Performance / Core Web Vitals",
  "Accessibility (WCAG)",
  "Jest / Vitest",
  "Cypress / Playwright",
  "Git & GitHub Actions",
  "Docker",
  "AWS",
  "Vercel",
  "Python",
  "LLM Prompting",
  "LangChain",
  "Vector Embeddings",
  "WebSockets",
];

export const POPULAR_LOCATION_SUGGESTIONS = [
  "Remote - US",
  "Remote - Worldwide",
  "Remote - Europe",
  "San Francisco, CA",
  "New York, NY",
  "Seattle, WA",
  "Austin, TX",
  "Boston, MA",
  "London, UK",
  "Berlin, DE",
  "Toronto, ON",
  "Bengaluru, India",
  "Singapore",
  "Tokyo, Japan",
];

export const POPULAR_INDUSTRY_SUGGESTIONS = [
  "AI & Machine Learning",
  "Developer Tools & Infrastructure",
  "SaaS & Productivity",
  "FinTech & Decentralized Finance",
  "HealthTech & Life Sciences",
  "ClimateTech & Sustainability",
  "Design Tools & Creative Tech",
  "E-Commerce & Retail Tech",
  "Cybersecurity & Privacy",
  "EdTech & Future of Learning",
];

export const POPULAR_THEME_SUGGESTIONS = [
  "0-to-1 Product Craftsmanship",
  "Performance & Core Web Vitals",
  "AI UX & Streaming Systems",
  "Design Systems Architecture",
  "Scalable Component Libraries",
  "Team Mentorship & Tech RFCs",
  "Micro-frontend Architecture",
  "Accessibility & WCAG Compliance",
  "CI/CD Automated Testing",
];
