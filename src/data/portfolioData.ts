export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  category: string;
  featured: boolean;
  status: "Active Development" | "Planned" | "Completed" | "Prototype";
  problem: string;
  whatIBuilt: string;
  githubUrl?: string;
  liveUrl?: string;
  caseStudy?: {
    overview: string;
    problem: string;
    productConcept: string;
    role: string;
    technicalApproach: {
      title: string;
      description: string;
      stack: { name: string; purpose: string }[];
    };
    aiWorkflow: {
      title: string;
      description: string;
      stages: { stage: string; action: string; outcome: string }[];
    };
    engineeringDecisions: {
      decision: string;
      rationale: string;
      tradeoff: string;
    }[];
    verificationAndTesting: {
      strategy: string;
      methods: string[];
    };
    learnings: string[];
    currentStatus: {
      state: string;
      nextSteps: string[];
    };
  };
}

export interface WorkflowStage {
  step: number;
  title: string;
  label: string;
  description: string;
  role: "Human Lead" | "AI Assisted" | "Collaborative" | "Human Verification";
  deliverable: string;
}

export const SITE_METADATA = {
  author: "Lalman Chaudhary",
  role: "Frontend Engineer & AI Workflows",
  positioning:
    "I build practical, AI-assisted frontend products that turn real problems into clear, usable experiences — combining modern frontend engineering with disciplined AI workflows.",
  headline: "Building useful products with frontend engineering and AI.",
  supportingText:
    "I focus on turning real, ambiguous problems into clear, production-grade web interfaces. Rather than generating disposable code, I integrate disciplined AI workflows with rigorous frontend engineering, deterministic architecture, and human review.",
  focusArea: "Frontend Engineering · AI-assisted Product Development",
  primaryCtaText: "View my work",
  secondaryCtaText: "Let's talk",
  contactHeadline: "Let's build something useful.",
  contactSubtext:
    "I'm open to discussing frontend engineering opportunities, AI-assisted product development, and practical collaborations.",
  socials: {
    email: "contact@lalman.dev", // Realistic placeholder
    github: "https://github.com/lalman-dev",
    linkedin: "https://linkedin.com/in/lalmanchaudhary", // Realistic placeholder
  },
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Work", href: "/work" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export const AI_WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: 1,
    title: "Understand",
    label: "Problem Exploration",
    description:
      "Deeply analyze user friction, domain constraints, and accessibility requirements before writing prompts or code.",
    role: "Human Lead",
    deliverable: "Problem breakdown & user friction map",
  },
  {
    step: 2,
    title: "Specify",
    label: "Interface & State Contracts",
    description:
      "Define strict TypeScript data schemas, component boundaries, and UX state matrices to eliminate ambiguity.",
    role: "Human Lead",
    deliverable: "TypeScript interfaces & component contracts",
  },
  {
    step: 3,
    title: "Plan",
    label: "Step-by-Step Architecture",
    description:
      "Structure modular implementation phases, isolating client-side state from server components.",
    role: "Collaborative",
    deliverable: "Modular execution plan & route tree",
  },
  {
    step: 4,
    title: "Build",
    label: "Collaborative Implementation",
    description:
      "Leverage AI code generation for rapid scaffolding and boilerplate while maintaining strict design system adherence.",
    role: "AI Assisted",
    deliverable: "Clean, componentized code diffs",
  },
  {
    step: 5,
    title: "Verify",
    label: "Deterministic Testing",
    description:
      "Run TypeScript type checks, lint suites, keyboard navigation tests, and responsive layout audits.",
    role: "Collaborative",
    deliverable: "Passing test suite & zero build errors",
  },
  {
    step: 6,
    title: "Review",
    label: "Human Judgment & Polish",
    description:
      "Critically inspect edge cases, accessibility semantics, performance overhead, and real-world ergonomics.",
    role: "Human Verification",
    deliverable: "Production-ready, maintainable code",
  },
];

export const ABOUT_WORKFLOW_STEPS = [
  {
    title: "Problem",
    description: "Identify real user pain points and define clear objectives.",
  },
  {
    title: "Research",
    description: "Evaluate user behavior, technical constraints, and domain patterns.",
  },
  {
    title: "Specification",
    description: "Draft explicit component contracts, state transitions, and data models.",
  },
  {
    title: "AI Collaboration",
    description: "Prompt models with structured context for targeted code generation.",
  },
  {
    title: "Implementation",
    description: "Integrate generated modules into clean, server-first component trees.",
  },
  {
    title: "Verification",
    description: "Execute strict linting, type checking, accessibility audits, and tests.",
  },
  {
    title: "Human Review",
    description: "Apply engineering judgment to verify ergonomics, maintainability, and UX.",
  },
];

export const PROJECTS: Project[] = [
  {
    id: "apply-pilot",
    slug: "applypilot",
    title: "ApplyPilot",
    subtitle: "AI-Powered Job Application Copilot",
    category: "AI Product / Web Application",
    featured: true,
    status: "Active Development",
    description:
      "An intelligent workflow assistant designed to help candidates parse job descriptions, evaluate profile match criteria, tailor application materials, and track applications with structured context.",
    problem:
      "Job seekers face fragmented, repetitive application processes and struggle to identify how well their specific experience aligns with nuanced job requirements.",
    whatIBuilt:
      "Engineered the full responsive frontend architecture featuring an interactive job matcher, dynamic requirement extraction preview, resume section customizer, and application status kanban.",
    technologies: ["Next.js (App Router)", "React", "TypeScript", "Tailwind CSS", "Lucide Icons"],
    githubUrl: "https://github.com/lalman-dev/applypilot",
    caseStudy: {
      overview:
        "ApplyPilot is a frontend application designed to eliminate friction in technical job hunting. Rather than acting as an uncontrolled auto-apply bot, ApplyPilot functions as a disciplined copilot that gives users granular control over job analysis, resume tailoring, and submission tracking.",
      problem:
        "Applying for specialized technical roles requires analyzing lengthy, unstructured job descriptions, comparing them against specific skill sets, and tailoring resumes thoughtfully. Existing tools either generate low-quality generic cover letters or rely on black-box automation that reduces candidate credibility.",
      productConcept:
        "A modular, workspace-style web app where candidates can paste or import job descriptions, inspect automated skill extractions, compare them against structured profile records, adjust tailored bullet points in real-time, and log application outcomes.",
      role:
        "Lead Frontend Engineer — responsible for product scoping, component architecture, TypeScript schema modeling, UI design system execution, and AI workflow integration.",
      technicalApproach: {
        title: "Deterministic Frontend Architecture",
        description:
          "Built using Next.js App Router with React Server Components by default to optimize initial load times and deliver fast, static shell rendering. Client components were strictly isolated to interactive form inputs, drag-and-drop workflow columns, and real-time diff previews.",
        stack: [
          { name: "Next.js 16 (App Router)", purpose: "Server-side rendering, routing, and asset optimization" },
          { name: "React 19 & TypeScript", purpose: "Strictly typed UI components and predictable state machines" },
          { name: "Tailwind CSS v4", purpose: "Utility-first design system with zero runtime CSS overhead" },
          { name: "Custom Accessible Components", purpose: "High-contrast, keyboard-navigable interface primitives" },
        ],
      },
      aiWorkflow: {
        title: "Disciplined AI-Assisted Implementation",
        description:
          "AI was integrated as an active development collaborator following a structured specification protocol rather than ad-hoc prompting.",
        stages: [
          {
            stage: "1. Data Modeling & Types",
            action: "Crafted strict TypeScript interfaces defining job posting schemas, parsed skills, and match scoring metrics.",
            outcome: "Provided the AI with deterministic boundary constraints for all component props.",
          },
          {
            stage: "2. Prompt-Driven Scaffolding",
            action: "Fed component specs and accessibility requirements into the AI model for initial UI scaffolding.",
            outcome: "Reduced repetitive boilerplate development time by ~60%.",
          },
          {
            stage: "3. Verification & Refactoring",
            action: "Audited generated components for semantic HTML, missing ARIA tags, redundant re-renders, and edge cases.",
            outcome: "Transformed AI output into production-grade, maintainable frontend code.",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Server Components by Default for Dashboard Views",
          rationale: "Ensures instant initial page paint and reduces client JavaScript bundle sizes for static job lists.",
          tradeoff: "Required clean serialization boundaries between static layouts and interactive editing modals.",
        },
        {
          decision: "Local State-Driven Preview with Optimistic UI",
          rationale: "Users need instant feedback when modifying resume sections without waiting for network round-trips.",
          tradeoff: "Increased client-side state synchronization logic across sidebar tabs.",
        },
        {
          decision: "Zero Heavy External UI Frameworks",
          rationale: "Engineered lean, purpose-built components with Tailwind CSS instead of bulky generic component kits.",
          tradeoff: "Required manual implementation of focus traps, modal dialogs, and keyboard navigation.",
        },
      ],
      verificationAndTesting: {
        strategy:
          "Applied a multi-layered verification strategy combining TypeScript strict compiler checks, automated linting, keyboard navigation walkthroughs, and screen reader testing.",
        methods: [
          "TypeScript Strict Mode with zero 'any' escapes in core application state",
          "ESLint with strict accessibility (jsx-a11y) rules enabled",
          "Manual keyboard navigation testing (Tab, Enter, Space, Escape on all interactive elements)",
          "Responsive breakpoint stress testing across 320px to 2560px viewports",
        ],
      },
      learnings: [
        "Structured specifications are critical: Clear TypeScript interfaces dramatically improve AI code generation quality.",
        "AI output requires human engineering judgment: AI frequently misses subtle accessibility semantics and focus management.",
        "Simplicity beats cleverness: A clean, predictable component tree is far easier to maintain and extend than over-abstracted patterns.",
      ],
      currentStatus: {
        state: "Core architecture implemented; active iteration on resume diffing engine and match visualization modules.",
        nextSteps: [
          "Implement fine-grained PDF export preview for tailored resumes",
          "Refine match breakdown visualizations for skill gap analysis",
          "Integrate structured local storage caching for offline workflow resilience",
        ],
      },
    },
  },
  {
    id: "project-pulse",
    slug: "project-pulse",
    title: "AI Spec & Issue Generator (Placeholder)",
    subtitle: "Frontend Architecture & Prompt-to-Task Pipeline",
    category: "Developer Tool / Architecture",
    featured: false,
    status: "Planned",
    description:
      "A developer productivity tool designed to convert product requirement docs into strictly typed task specifications and implementation checklists.",
    problem:
      "Product managers and engineers often spend hours decomposing vague feature ideas into actionable, testable frontend tickets.",
    whatIBuilt:
      "[Placeholder Project — Architecture and design specification in planning phase. Content will be updated as implementation progresses.]",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zod"],
    githubUrl: "https://github.com/lalman-dev",
  },
  {
    id: "design-system-core",
    slug: "design-system-core",
    title: "Accessible UI Primitives Library (Placeholder)",
    subtitle: "High-Contrast, Keyboard-First Component Set",
    category: "Design Systems & UI Engineering",
    featured: false,
    status: "Planned",
    description:
      "A collection of lightweight, zero-dependency React components built with strict WCAG 2.1 AA compliance and customizable tokens.",
    problem:
      "Many open-source component libraries carry heavy JavaScript bundles and complex styling overrides that hinder performance.",
    whatIBuilt:
      "[Placeholder Project — Component token specification and accessibility testing framework in planning phase.]",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Radix UI Primitives"],
    githubUrl: "https://github.com/lalman-dev",
  },
];
