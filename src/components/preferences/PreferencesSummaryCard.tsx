"use client";

import * as React from "react";
import { AlertTriangle, Layers, DollarSign, Globe, Code2, Bot, ChevronRight } from "lucide-react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { JobPreferences, ValidationWarning } from "@/types/preferences";
import { formatCurrency } from "@/lib/utils";

interface PreferencesSummaryCardProps {
  preferences: JobPreferences;
  readinessScore: number;
  warnings: ValidationWarning[];
  onNavigateSection: (sectionId: string) => void;
}

export function PreferencesSummaryCard({
  preferences,
  readinessScore,
  warnings,
  onNavigateSection,
}: PreferencesSummaryCardProps) {
  const [showJsonPreview, setShowJsonPreview] = React.useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600 dark:text-emerald-400";
    if (score >= 60) return "text-sky-600 dark:text-sky-400";
    return "text-amber-600 dark:text-amber-400";
  };

  const getProgressBg = (score: number) => {
    if (score >= 85) return "bg-emerald-500";
    if (score >= 60) return "bg-sky-500";
    return "bg-amber-500";
  };

  return (
    <aside aria-label="Preferences Overview & Summary" className="space-y-4">
      {/* Profile Readiness Score Card */}
      <Card className="overflow-hidden border-neutral-200 dark:border-neutral-800">
        <CardHeader className="bg-neutral-50/70 dark:bg-neutral-900/50 pb-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              AI Matching Readiness
            </span>
            <span className={`text-xl font-bold ${getScoreColor(readinessScore)}`}>
              {readinessScore}%
            </span>
          </div>

          {/* Progress Bar */}
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
            <div
              className={`h-full transition-all duration-500 ${getProgressBg(readinessScore)}`}
              style={{ width: `${readinessScore}%` }}
            />
          </div>

          <p className="mt-2 text-xs text-neutral-500 dark:text-neutral-400">
            {readinessScore >= 85
              ? "Optimal for automated job scraping, fit scoring, and high-impact AI tailoring."
              : readinessScore >= 60
              ? "Good foundation. Complete remaining criteria to maximize match accuracy."
              : "Incomplete preferences may reduce job alignment precision."}
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-4">
          {/* Validation Warnings if any */}
          {warnings.length > 0 && (
            <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3 dark:border-amber-900/50 dark:bg-amber-950/30">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-800 dark:text-amber-300">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>{warnings.length} Recommended Action{warnings.length > 1 ? "s" : ""}</span>
              </div>
              <ul className="mt-2 space-y-1.5 text-xs text-amber-700 dark:text-amber-400">
                {warnings.map((w, idx) => (
                  <li key={idx} className="flex items-start justify-between gap-1">
                    <span>• {w.message}</span>
                    <button
                      type="button"
                      onClick={() => onNavigateSection(`section-${w.section}`)}
                      className="shrink-0 font-medium underline hover:text-amber-900 dark:hover:text-amber-200 cursor-pointer"
                    >
                      Fix
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Live Snapshot Breakdown */}
          <div className="space-y-3 text-xs">
            {/* Roles */}
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-2.5">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                <Layers className="h-3.5 w-3.5 text-neutral-400" />
                <span>Roles ({preferences.roleTitles.length})</span>
              </div>
              <div className="text-right max-w-[160px] truncate font-medium text-neutral-900 dark:text-neutral-100">
                {preferences.roleTitles.length > 0
                  ? preferences.roleTitles[0] + (preferences.roleTitles.length > 1 ? ` +${preferences.roleTitles.length - 1}` : "")
                  : "None configured"}
              </div>
            </div>

            {/* Compensation */}
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-2.5">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                <DollarSign className="h-3.5 w-3.5 text-neutral-400" />
                <span>Target Band</span>
              </div>
              <div className="text-right font-medium text-neutral-900 dark:text-neutral-100">
                {formatCurrency(salaryFormat(preferences.salary.minBase), preferences.salary.currency)} -{" "}
                {formatCurrency(salaryFormat(preferences.salary.targetBase), preferences.salary.currency)}
              </div>
            </div>

            {/* Work Mode */}
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-2.5">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                <Globe className="h-3.5 w-3.5 text-neutral-400" />
                <span>Work Modes</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[170px]">
                {preferences.workModes.map((m) => (
                  <Badge key={m} variant="secondary" size="sm" className="capitalize">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Top Primary Skills */}
            <div className="flex items-start justify-between gap-2 border-b border-neutral-100 dark:border-neutral-800/60 pb-2.5">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                <Code2 className="h-3.5 w-3.5 text-neutral-400" />
                <span>Primary Skills</span>
              </div>
              <div className="flex flex-wrap gap-1 justify-end max-w-[170px]">
                {preferences.primarySkills.slice(0, 3).map((s) => (
                  <Badge key={s} variant="default" size="sm">
                    {s}
                  </Badge>
                ))}
                {preferences.primarySkills.length > 3 && (
                  <Badge variant="outline" size="sm">
                    +{preferences.primarySkills.length - 3}
                  </Badge>
                )}
              </div>
            </div>

            {/* AI Narrative Style */}
            <div className="flex items-start justify-between gap-2 pb-1">
              <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 font-medium">
                <Bot className="h-3.5 w-3.5 text-neutral-400" />
                <span>AI Tone</span>
              </div>
              <span className="font-medium text-neutral-900 dark:text-neutral-100 capitalize">
                {preferences.aiCopilot.tone.replace("_", " ")}
              </span>
            </div>
          </div>

          {/* Raw JSON Debug / Inspector Toggle */}
          <div className="pt-2 border-t border-neutral-100 dark:border-neutral-800">
            <button
              type="button"
              onClick={() => setShowJsonPreview(!showJsonPreview)}
              className="flex w-full items-center justify-between text-xs font-medium text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 transition-colors cursor-pointer"
            >
              <span>{showJsonPreview ? "Hide Configuration Schema" : "Inspect JSON Schema"}</span>
              <ChevronRight
                className={`h-3.5 w-3.5 transition-transform ${showJsonPreview ? "rotate-90" : ""}`}
              />
            </button>

            {showJsonPreview && (
              <pre className="mt-2.5 max-h-60 overflow-auto rounded-lg bg-neutral-950 p-3 text-[10px] text-emerald-400 font-mono leading-tight">
                {JSON.stringify(preferences, null, 2)}
              </pre>
            )}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}

function salaryFormat(val: number): number {
  return typeof val === "number" ? val : 0;
}
