import React from "react";
import type { Metadata } from "next";
import { ABOUT_WORKFLOW_STEPS } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";
import {
  ArrowRight,
  Terminal,
  Layers,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn about Lalman Chaudhary's engineering background, philosophy on AI-assisted frontend development, and approach to building reliable software.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      {/* Page Header */}
      <section className="space-y-4 border-b border-slate-200 pb-10" aria-labelledby="about-heading">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Background &amp; Philosophy
        </p>
        <h1
          id="about-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          About Me
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Frontend engineer focused on building practical, accessible web applications and refining disciplined AI-assisted engineering workflows.
        </p>
      </section>

      {/* 1. WHO I AM */}
      <section className="space-y-6" aria-labelledby="who-i-am-heading">
        <div className="flex items-center gap-2">
          <Terminal className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <h2
            id="who-i-am-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Who I Am
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
            <p>
              I am <strong>Lalman Chaudhary</strong>, a frontend engineer who approaches software development with a focus on clarity, maintainability, and user utility. My work sits at the intersection of modern frontend architecture and deliberate AI workflows.
            </p>
            <p>
              I believe modern frontend engineering requires more than just knowing framework APIs—it demands clear thinking around data modeling, accessibility, component lifecycle, and state predictability. When applying AI to this process, I treat AI as a high-speed drafting partner while maintaining strict human ownership over code quality and architecture.
            </p>
            <p>
              I am particularly drawn to products that solve tangible problems for real users, rather than building proof-of-concepts that lack depth or durability.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-4 shadow-xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Core Technical Focus
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Next.js (App Router &amp; RSC)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>React 19 &amp; TypeScript (Strict)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Tailwind CSS &amp; Design Systems</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>WCAG 2.1 AA Accessibility</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                <span>Disciplined AI Engineering Workflows</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. WHAT I BUILD */}
      <section className="space-y-6" aria-labelledby="what-i-build-heading">
        <div className="flex items-center gap-2">
          <Layers className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <h2
            id="what-i-build-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            What I Build
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              Practical Frontend Products
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Applications engineered around user workflows, focusing on low latency, responsive layouts, clear error recovery states, and deterministic rendering.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              AI-Assisted Workflow Tools
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Interfaces that turn unstructured text and complex domain context (such as job matching in ApplyPilot) into clear, actionable, structured user feedback.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              Accessible Component Systems
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Modular UI primitives designed with semantic HTML, appropriate ARIA roles, visible keyboard focus rings, and high-contrast color pairings.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
            <h3 className="text-base font-bold text-slate-900">
              Deterministic Software
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Codebases that leverage strict TypeScript compiler options, automated lint suites, and pure functions to minimize runtime errors and hydration glitches.
            </p>
          </div>
        </div>
      </section>

      {/* 3. HOW I WORK */}
      <section className="space-y-8" aria-labelledby="how-i-work-heading">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-blue-600" aria-hidden="true" />
            <h2
              id="how-i-work-heading"
              className="text-2xl font-bold tracking-tight text-slate-900"
            >
              How I Work: The Engineering Cycle
            </h2>
          </div>
          <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
            I do not practice &ldquo;vibe coding&rdquo; or paste unexamined code snippets. Every feature undergoes a structured 7-stage engineering lifecycle.
          </p>
        </div>

        {/* 7-step sequence */}
        <div className="space-y-3">
          {ABOUT_WORKFLOW_STEPS.map((step, index) => (
            <div
              key={step.title}
              className="flex items-start gap-4 p-4 rounded-xl border border-slate-200 bg-white shadow-xs"
            >
              <span className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                0{index + 1}
              </span>
              <div className="space-y-0.5">
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Why this matters card */}
        <div className="p-6 rounded-xl border border-blue-200 bg-blue-50/60 space-y-2">
          <h3 className="text-sm font-bold text-blue-950 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-700" aria-hidden="true" />
            <span>Why This Discipline Matters</span>
          </h3>
          <p className="text-sm text-slate-700 leading-relaxed">
            AI language models generate code based on statistical likelihood, not system architecture awareness. Without upfront specifications and downstream verification, AI code degrades into fragile technical debt. By strictly separating specification, scaffolding, and verification, I ensure that velocity gains never compromise code quality or reliability.
          </p>
        </div>
      </section>

      {/* 4. CURRENT DIRECTION */}
      <section className="space-y-6" aria-labelledby="direction-heading">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <h2
            id="direction-heading"
            className="text-2xl font-bold tracking-tight text-slate-900"
          >
            Current Direction &amp; Goals
          </h2>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-4 shadow-xs">
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            I am continually refining my craft across four key growth areas:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                1. Deep Frontend Fundamentals
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Mastering React Server Components internals, streaming data architectures, browser rendering performance, and edge routing.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                2. AI-Assisted Engineering Tooling
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Building automated specification pipelines and test harness generators that integrate AI seamlessly into CI/CD workflows.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                3. Product Thinking
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Understanding user mental models, reducing cognitive load in complex workflows, and validating problem assumptions early.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 space-y-1">
              <h4 className="font-bold text-slate-900 text-sm">
                4. End-to-End Delivery
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Taking complete frontend products from initial whiteboard scoping to verified production deployments with zero fluff.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About CTA */}
      <section className="rounded-xl bg-slate-900 text-white p-8 sm:p-10 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">
          Looking for a disciplined frontend engineer?
        </h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto leading-relaxed">
          I am eager to contribute to teams building ambitious, useful products with modern web technologies.
        </p>
        <div className="pt-2 flex justify-center">
          <Button href="/contact" variant="outline" size="md" className="bg-white text-slate-900 hover:bg-slate-100 border-white">
            <span>Start a conversation</span>
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
