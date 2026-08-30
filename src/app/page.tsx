import React from "react";
import Link from "next/link";
import { SITE_METADATA, PROJECTS, AI_WORKFLOW_STAGES } from "@/data/portfolioData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { WorkflowVisualizer } from "@/components/ui/WorkflowVisualizer";
import {
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Terminal,
  CheckCircle,
  ExternalLink,
  Code2,
} from "lucide-react";

export default function HomePage() {
  const featuredProjects = PROJECTS;

  return (
    <main id="main-content" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-24 md:space-y-32">
      {/* 1. HERO SECTION */}
      <section className="space-y-8 pt-4 md:pt-8" aria-labelledby="hero-heading">
        {/* Focus indicator pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" aria-hidden="true" />
          <span>{SITE_METADATA.focusArea}</span>
        </div>

        {/* Primary Headline */}
        <div className="space-y-4 max-w-4xl">
          <h1
            id="hero-heading"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.1]"
          >
            {SITE_METADATA.headline}
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl leading-relaxed font-normal">
            {SITE_METADATA.positioning}
          </p>
        </div>

        {/* Supporting text clarifying practical products vs disposable demos */}
        <div className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white/70 max-w-3xl space-y-2 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <Terminal className="w-4 h-4 text-blue-600" aria-hidden="true" />
            <span>Engineering Approach</span>
          </div>
          <p className="text-slate-600 leading-relaxed">
            I believe AI creates the highest value when paired with rigorous frontend engineering—strict type safety, accessible DOM structures, and deterministic state architectures—rather than blindly deploying unverified generated snippets.
          </p>
        </div>

        {/* Hero CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button href="/work" variant="primary" size="lg">
            <span>{SITE_METADATA.primaryCtaText}</span>
            <ArrowRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
          <Button href="/contact" variant="outline" size="lg">
            <span>{SITE_METADATA.secondaryCtaText}</span>
          </Button>
        </div>
      </section>

      {/* 2. SELECTED WORK SECTION */}
      <section className="space-y-10" aria-labelledby="work-heading">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 pb-5">
          <SectionHeader
            eyebrow="Portfolio Case Studies"
            title="Selected Work"
            description="Concrete frontend projects demonstrating component architecture, problem-solving, and disciplined AI integration."
            className="mb-0"
          />
          <Link
            href="/work"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 shrink-0 group"
          >
            <span>Explore all case studies</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="space-y-8">
          {featuredProjects.map((project) => (
            <Card
              as="article"
              key={project.id}
              hoverable
              className={`p-6 sm:p-8 ${
                project.featured
                  ? "border-slate-300 ring-1 ring-slate-200/50 bg-white"
                  : "border-slate-200 bg-slate-50/50"
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <Badge variant={project.featured ? "accent" : "subtle"}>
                      {project.category}
                    </Badge>
                    <Badge
                      variant={
                        project.status === "Active Development"
                          ? "success"
                          : "default"
                      }
                    >
                      {project.status}
                    </Badge>
                    {project.featured && (
                      <span className="text-xs font-semibold text-blue-600 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
                        Featured Case Study
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold tracking-tight text-slate-900">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">
                      {project.subtitle}
                    </p>
                  </div>

                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                    {project.description}
                  </p>

                  {/* Problem & Built Breakdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <strong className="block font-semibold text-slate-900 mb-1">
                        Problem Addressed
                      </strong>
                      <span className="text-slate-600 leading-relaxed">
                        {project.problem}
                      </span>
                    </div>
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs">
                      <strong className="block font-semibold text-slate-900 mb-1">
                        What I Built
                      </strong>
                      <span className="text-slate-600 leading-relaxed">
                        {project.whatIBuilt}
                      </span>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
                      Technologies &amp; Architecture
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-mono font-medium border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Actions column */}
                <div className="lg:w-48 shrink-0 flex flex-col gap-3 pt-2 lg:pt-0 lg:border-l lg:border-slate-100 lg:pl-6">
                  {project.caseStudy ? (
                    <Button
                      href={`/work#${project.slug}`}
                      variant="primary"
                      size="sm"
                      className="w-full justify-center"
                    >
                      <span>Read Case Study</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" aria-hidden="true" />
                    </Button>
                  ) : (
                    <Button
                      href="/work"
                      variant="outline"
                      size="sm"
                      className="w-full justify-center"
                    >
                      <span>View Roadmap</span>
                    </Button>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 py-1.5 transition-colors"
                    >
                      <Code2 className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                      <span>Source Repository</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* 3. HOW I BUILD WITH AI */}
      <section className="space-y-10" aria-labelledby="ai-workflow-heading">
        <SectionHeader
          eyebrow="Disciplined Engineering"
          title="How I Build With AI"
          description="AI is not an autonomous replacement for engineering—it is a collaborator. My workflow balances rapid AI-assisted scaffolding with strict specification, manual testing, and human verification."
        />

        <WorkflowVisualizer stages={AI_WORKFLOW_STAGES} />

        <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/50 text-slate-800 text-sm leading-relaxed flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" aria-hidden="true" />
          <p>
            <strong className="font-semibold text-slate-900">Why this matters:</strong> Prompting an AI model without strict boundaries yields brittle, unmaintainable prototypes. By defining TypeScript schemas and component boundaries first, I leverage AI to accelerate execution while keeping full architectural control.
          </p>
        </div>
      </section>

      {/* 4. ABOUT PREVIEW */}
      <section className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-10 space-y-6" aria-labelledby="about-preview-heading">
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            About the Engineer
          </p>
          <h2
            id="about-preview-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900"
          >
            Engineering usable interfaces with disciplined workflows.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600 text-sm sm:text-base leading-relaxed">
          <p>
            I am a frontend engineer focused on building practical web applications and exploring structured ways to integrate AI into frontend development workflows. I specialize in Next.js, React, TypeScript, and modern component systems.
          </p>
          <p>
            Rather than chasing ephemeral AI demos, my goal is to craft reliable, accessible software that solves concrete user problems—pairing thoughtful design with rigorous engineering standards.
          </p>
        </div>

        <div className="pt-2 flex items-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 group"
          >
            <span>Learn more about my background and approach</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 5. FINAL CTA */}
      <section
        className="rounded-2xl bg-slate-900 text-white p-8 sm:p-12 text-center space-y-6"
        aria-labelledby="cta-heading"
      >
        <div className="space-y-3 max-w-xl mx-auto">
          <h2
            id="cta-heading"
            className="text-2xl sm:text-3xl font-bold tracking-tight text-white"
          >
            Have a product idea, frontend challenge, or opportunity?
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            I am currently open to full-time frontend engineering roles and technical collaborations focused on AI-assisted product development.
          </p>
        </div>

        <div className="pt-2 flex justify-center">
          <Button
            href="/contact"
            variant="outline"
            size="lg"
            className="bg-white text-slate-900 hover:bg-slate-100 border-white"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-4 h-4 ml-1" aria-hidden="true" />
          </Button>
        </div>
      </section>
    </main>
  );
}
