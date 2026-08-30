import React from "react";
import type { Metadata } from "next";
import { SITE_METADATA } from "@/data/portfolioData";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";
import {
  Mail,
  ArrowUpRight,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Opportunities",
  description:
    "Get in touch with Lalman Chaudhary regarding frontend engineering roles, AI-assisted product development, and technical collaborations.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 space-y-16">
      {/* Header */}
      <section className="space-y-4 border-b border-slate-200 pb-10" aria-labelledby="contact-heading">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden="true" />
          <span>Available for Frontend &amp; AI Engineering roles</span>
        </div>

        <h1
          id="contact-heading"
          className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900"
        >
          {SITE_METADATA.contactHeadline}
        </h1>

        <p className="text-lg text-slate-600 max-w-2xl leading-relaxed">
          {SITE_METADATA.contactSubtext}
        </p>
      </section>

      {/* Main Direct Channels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6" aria-label="Contact channels">
        {/* Email Direct */}
        <Card
          hoverable
          className="md:col-span-3 p-6 sm:p-8 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-6"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" aria-hidden="true" />
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Direct Email (Preferred)
              </span>
            </div>
            <h2 className="text-2xl font-bold font-mono text-white">
              {SITE_METADATA.socials.email}
            </h2>
            <p className="text-sm text-slate-300">
              Feel free to send a direct note with role descriptions or project details.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={`mailto:${SITE_METADATA.socials.email}?subject=Frontend%20Engineering%20Opportunity`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-slate-900 font-semibold text-sm hover:bg-slate-100 transition-colors shadow-xs"
            >
              <Send className="w-4 h-4 text-slate-900" aria-hidden="true" />
              <span>Get in touch</span>
            </a>
          </div>
        </Card>

        {/* GitHub */}
        <Card
          hoverable
          className="p-6 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <GithubIcon className="w-5 h-5 text-slate-900" />
              <Badge variant="subtle">Code &amp; Repos</Badge>
            </div>
            <h2 className="text-lg font-bold text-slate-900">GitHub</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Explore open-source repositories, experiments, and commit histories.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={SITE_METADATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>View github profile</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </Card>

        {/* LinkedIn */}
        <Card
          hoverable
          className="p-6 space-y-4 flex flex-col justify-between"
        >
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <LinkedinIcon className="w-5 h-5 text-blue-600" />
              <Badge variant="subtle">Network</Badge>
            </div>
            <h2 className="text-lg font-bold text-slate-900">LinkedIn</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Connect professionally, review background updates, or send direct messages.
            </p>
          </div>

          <div className="pt-2">
            <a
              href={SITE_METADATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              <span>Connect on LinkedIn</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </div>
        </Card>

        {/* Response Commitment */}
        <Card className="p-6 space-y-4 flex flex-col justify-between bg-slate-50 border-slate-200">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Clock className="w-5 h-5 text-slate-700" aria-hidden="true" />
              <Badge variant="success">Fast Response</Badge>
            </div>
            <h2 className="text-lg font-bold text-slate-900">Turnaround</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              I typically review and reply to engineering inquiries within 24–48 hours.
            </p>
          </div>
          <p className="text-[11px] font-mono text-slate-500">
            Timezone: UTC+05:30 (Available for remote global async)
          </p>
        </Card>
      </section>

      {/* What You Can Reach Out About */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6" aria-labelledby="topics-heading">
        <h2
          id="topics-heading"
          className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-2"
        >
          <MessageSquare className="w-5 h-5 text-blue-600" aria-hidden="true" />
          <span>What We Can Discuss</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Full-Time Roles</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Frontend Engineer, UI Engineer, or Full-Stack roles emphasizing Next.js, React, and TypeScript.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>AI Product Engineering</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Collaborations on disciplined AI-assisted products, prompt pipelines, and intelligent interfaces.
            </p>
          </div>

          <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 space-y-1.5">
            <div className="flex items-center gap-1.5 text-slate-900 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" aria-hidden="true" />
              <span>Technical Deep-Dives</span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Discussions around frontend architecture, state modeling, accessibility, and AI workflow best practices.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
