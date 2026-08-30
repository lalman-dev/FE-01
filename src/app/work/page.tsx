import React from "react";
import type { Metadata } from "next";
import { PROJECTS } from "@/data/portfolioData";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  ExternalLink,
  Bot,
  UserCheck,
  CheckCircle2,
  Cpu,
  ArrowRight,
  GitBranch,
  ShieldCheck,
  BookOpen,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Work & Case Studies",
  description:
    "In-depth case studies and frontend engineering breakdowns by Lalman Chaudhary, focusing on Next.js, React, TypeScript, and AI-assisted workflows.",
};

export default function WorkPage() {
  const featuredProject = PROJECTS.find((p) => p.slug === "applypilot") || PROJECTS[0];
  const secondaryProjects = PROJECTS.filter((p) => p.id !== featuredProject.id);
  const cs = featuredProject.caseStudy;

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-20">
      {/* Page Header */}
      <section className="space-y-4 border-b border-slate-200 pb-10" aria-labelledby="work-page-heading">
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          Case Studies &amp; Projects
        </p>
        <h1
          id="work-page-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          Engineering Case Studies
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          Detailed technical breakdowns showing architecture decisions, problem modeling, AI workflow integration, and honest engineering trade-offs.
        </p>
      </section>

      {/* FEATURED CASE STUDY: APPLYPILOT */}
      {cs && (
        <article
          id={featuredProject.slug}
          className="space-y-12 scroll-mt-24"
          aria-labelledby="applypilot-title"
        >
          {/* Header & Meta */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge variant="accent">Featured Case Study</Badge>
              <Badge variant="success">{featuredProject.status}</Badge>
              <span className="text-xs font-mono text-slate-500">
                Next.js · React 19 · TypeScript · Tailwind CSS
              </span>
            </div>

            <div>
              <h2
                id="applypilot-title"
                className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900"
              >
                {featuredProject.title} — {featuredProject.subtitle}
              </h2>
              <p className="mt-2 text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
                {cs.overview}
              </p>
            </div>

            {featuredProject.githubUrl && (
              <div className="pt-2 flex items-center gap-4">
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 text-white text-xs font-medium hover:bg-slate-800 transition-colors shadow-xs"
                >
                  <Code2 className="w-4 h-4" aria-hidden="true" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>

          {/* Section 1 & 2: Overview & Problem */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs">
                  01
                </span>
                <h3>1. Problem Statement</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {cs.problem}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 text-slate-900 font-semibold text-sm">
                <span className="w-6 h-6 rounded-md bg-blue-50 text-blue-700 flex items-center justify-center font-mono text-xs">
                  02
                </span>
                <h3>2. Product Concept</h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {cs.productConcept}
              </p>
            </div>
          </div>

          {/* Section 3: Role & Ownership */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-slate-900 font-semibold text-base">
              <UserCheck className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <h3>3. My Role &amp; Scope</h3>
            </div>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              {cs.role}
            </p>
          </div>

          {/* Section 4: Technical Approach */}
          <div className="space-y-6">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <span>4. Technical Approach &amp; Stack</span>
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {cs.technicalApproach.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {cs.technicalApproach.stack.map((item) => (
                <div
                  key={item.name}
                  className="rounded-lg border border-slate-200 bg-white p-4 space-y-1.5 shadow-xs"
                >
                  <p className="font-mono text-xs font-bold text-slate-900">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {item.purpose}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: AI-Assisted Workflow */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <h3 className="text-xl font-bold text-slate-900">
                  5. AI-Assisted Workflow in Practice
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">
                {cs.aiWorkflow.description}
              </p>
            </div>

            <div className="space-y-4">
              {cs.aiWorkflow.stages.map((stage, idx) => (
                <div
                  key={stage.stage}
                  className="rounded-lg border border-slate-200 bg-white p-5 space-y-2 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm text-slate-900">
                      {stage.stage}
                    </span>
                    <Badge variant="subtle">Phase 0{idx + 1}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
                    <div className="p-3 bg-slate-50 rounded border border-slate-100">
                      <strong className="block text-slate-800 font-semibold mb-0.5">
                        Action &amp; Prompting:
                      </strong>
                      <span className="text-slate-600 leading-relaxed">
                        {stage.action}
                      </span>
                    </div>
                    <div className="p-3 bg-blue-50/40 rounded border border-blue-100">
                      <strong className="block text-blue-900 font-semibold mb-0.5">
                        Verification &amp; Result:
                      </strong>
                      <span className="text-slate-600 leading-relaxed">
                        {stage.outcome}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 6: Key Engineering Decisions & Tradeoffs */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <GitBranch className="w-5 h-5 text-blue-600" aria-hidden="true" />
              <span>6. Key Engineering Decisions &amp; Trade-offs</span>
            </h3>

            <div className="space-y-4">
              {cs.engineeringDecisions.map((dec) => (
                <div
                  key={dec.decision}
                  className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3 shadow-xs"
                >
                  <h4 className="text-base font-bold text-slate-900">
                    {dec.decision}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-100">
                      <strong className="block text-emerald-900 font-semibold mb-1">
                        Rationale
                      </strong>
                      <p className="text-slate-600 leading-relaxed">{dec.rationale}</p>
                    </div>
                    <div className="p-3.5 bg-amber-50/50 rounded-lg border border-amber-100">
                      <strong className="block text-amber-900 font-semibold mb-1">
                        Considered Trade-off
                      </strong>
                      <p className="text-slate-600 leading-relaxed">{dec.tradeoff}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 7 & 8: Verification, Testing & Learnings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Verification */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-slate-900">
                  7. Verification &amp; Testing
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {cs.verificationAndTesting.strategy}
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                {cs.verificationAndTesting.methods.map((method) => (
                  <li key={method} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{method}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Learnings */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 shadow-xs">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" aria-hidden="true" />
                <h3 className="text-lg font-bold text-slate-900">
                  8. What I Learned
                </h3>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                {cs.learnings.map((learning) => (
                  <li key={learning} className="p-3 bg-slate-50 rounded-lg border border-slate-100 leading-relaxed">
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Section 9: Current Status & Next Steps */}
          <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="text-lg font-bold text-white">
                  9. Current Project Status
                </h3>
              </div>
              <Badge variant="accent">Active Development</Badge>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {cs.currentStatus.state}
            </p>
            <div className="pt-2">
              <span className="text-xs font-mono uppercase text-slate-400 block mb-2 font-semibold">
                Upcoming Roadmap Items
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-200 font-mono">
                {cs.currentStatus.nextSteps.map((step) => (
                  <li
                    key={step}
                    className="p-3 bg-slate-800/80 rounded border border-slate-700 leading-relaxed"
                  >
                    → {step}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>
      )}

      {/* ADDITIONAL PROJECTS & ROADMAP PLACEHOLDERS */}
      <section className="space-y-8 pt-10 border-t border-slate-200" aria-labelledby="upcoming-projects-heading">
        <SectionHeader
          eyebrow="Planned Work &amp; Concepts"
          title="Additional Projects"
          description="Projects currently in architecture planning or prototype stages. These are structured placeholders representing ongoing engineering initiatives."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {secondaryProjects.map((project) => (
            <Card
              as="article"
              key={project.id}
              className="p-6 space-y-4 bg-slate-50/50 border-dashed border-slate-300 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="subtle">{project.category}</Badge>
                  <Badge variant="outline">{project.status}</Badge>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs font-medium text-slate-500 mt-0.5">
                    {project.subtitle}
                  </p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {project.description}
                </p>
                <div className="p-3 rounded bg-white border border-slate-200 text-xs text-slate-500 italic">
                  {project.whatIBuilt}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[11px] font-mono text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Work Page Footer CTA */}
      <section className="rounded-xl border border-slate-200 bg-white p-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-900">
          Interested in the code or architecture behind these projects?
        </h2>
        <p className="text-slate-600 text-sm max-w-lg mx-auto leading-relaxed">
          I am happy to discuss component design decisions, state management trade-offs, or walk through repositories.
        </p>
        <div className="pt-2 flex justify-center">
          <Button href="/contact" variant="primary" size="md">
            <span>Contact me about opportunities</span>
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
