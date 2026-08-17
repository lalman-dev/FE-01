"use client";

import * as React from "react";
import { Sliders, FileText, CheckSquare, Search } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-neutral-900 dark:text-neutral-100 hover:opacity-90 transition-opacity">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 font-extrabold text-sm shadow-xs">
                AP
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold leading-none tracking-tight">
                  ApplyPilot
                </span>
                <span className="text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                  AI Job Application Copilot
                </span>
              </div>
            </Link>

            <span className="hidden sm:inline-flex items-center rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-semibold text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
              FE-01 Capstone
            </span>
          </div>

          {/* Navigation Links */}
          <nav aria-label="Global" className="hidden md:flex items-center gap-1 text-sm font-medium">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-400 cursor-not-allowed">
              <CheckSquare className="h-4 w-4" />
              <span>Pipeline (FE-04)</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-400 cursor-not-allowed">
              <Search className="h-4 w-4" />
              <span>Matcher (FE-02)</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-neutral-400 cursor-not-allowed">
              <FileText className="h-4 w-4" />
              <span>Collateral (FE-03)</span>
            </span>

            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold">
              <Sliders className="h-4 w-4 text-neutral-700 dark:text-neutral-300" />
              <span>Preferences</span>
            </span>
          </nav>

          {/* User / Status */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs dark:border-neutral-800 dark:bg-neutral-900">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                Copilot Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
