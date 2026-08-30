import React from "react";
import Link from "next/link";
import { NAV_LINKS, SITE_METADATA } from "@/data/portfolioData";
import { Mail, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/Icons";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white mt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 & 2: Brand & Proof Statement */}
          <div className="md:col-span-2 space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-bold text-slate-900 tracking-tight"
            >
              <span className="w-6 h-6 rounded bg-slate-900 text-white flex items-center justify-center font-mono text-xs font-semibold">
                LC
              </span>
              <span>{SITE_METADATA.author}</span>
            </Link>
            <p className="text-sm text-slate-600 max-w-md leading-relaxed">
              {SITE_METADATA.positioning}
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-slate-500 font-medium pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Available for Frontend &amp; AI Engineering roles</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Navigation
            </h3>
            <ul className="space-y-2 text-sm">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-slate-600 hover:text-slate-900 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Connect */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
              Connect
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${SITE_METADATA.socials.email}`}
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <Mail className="w-4 h-4 text-slate-500" aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <GithubIcon className="w-4 h-4 text-slate-500" />
                  <span>GitHub</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={SITE_METADATA.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors"
                >
                  <LinkedinIcon className="w-4 h-4 text-slate-500" />
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 {SITE_METADATA.author}. Built with Next.js, React, TypeScript &amp; Tailwind CSS.</p>
          <p className="font-mono text-[11px] text-slate-400">Strict TypeScript · Accessible HTML5 · RSC Architecture</p>
        </div>
      </div>
    </footer>
  );
}
