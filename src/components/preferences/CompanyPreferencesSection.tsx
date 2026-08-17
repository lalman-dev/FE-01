"use client";

import * as React from "react";
import { Building, Factory, ShieldAlert, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleGroup } from "@/components/ui/toggle-pill";
import { JobPreferences, CompanyStage } from "@/types/preferences";
import { COMPANY_STAGE_OPTIONS, POPULAR_INDUSTRY_SUGGESTIONS } from "@/lib/constants";

interface CompanyPreferencesSectionProps {
  preferences: JobPreferences;
  onUpdateField: <K extends keyof JobPreferences>(key: K, value: JobPreferences[K]) => void;
}

export function CompanyPreferencesSection({
  preferences,
  onUpdateField,
}: CompanyPreferencesSectionProps) {
  const companyStageToggleOptions = React.useMemo(
    () =>
      COMPANY_STAGE_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        description: opt.stageRange,
      })),
    []
  );

  const sampleDealbreakers = [
    "Mandatory 5-day on-site requirement",
    "Unpaid trial project > 4 hours",
    "On-call 24/7 with no compensation",
    "No health insurance or benefits",
    "Rigid punch-clock tracking software",
  ];

  return (
    <Card id="section-companies">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <Building className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Company Stage, Industries & Dealbreakers</CardTitle>
            <CardDescription>
              Filter target organizations by maturity stage, industry sector, and strict dealbreaker conditions.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Company Stage */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-neutral-500" />
              Target Company Stages
            </label>
            <span className="text-xs text-neutral-400">Multi-select</span>
          </div>

          <ToggleGroup<CompanyStage>
            options={companyStageToggleOptions}
            value={preferences.companyStages}
            onChange={(newStages) => onUpdateField("companyStages", newStages)}
            multiple={true}
            layout="grid"
            columns={2}
          />
        </div>

        {/* Target Industries */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            <Factory className="h-3.5 w-3.5 text-neutral-500" />
            <span>Target Industries & Domains</span>
          </div>
          <TagInput
            id="target-industries-input"
            helperText="Prioritize job openings in these sectors during AI scoring."
            tags={preferences.targetIndustries}
            onChange={(newIndustries) => onUpdateField("targetIndustries", newIndustries)}
            placeholder="e.g. AI & Machine Learning, Developer Tools, SaaS..."
            suggestions={POPULAR_INDUSTRY_SUGGESTIONS}
            badgeVariant="secondary"
          />
        </div>

        {/* Excluded Companies & Dealbreakers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          {/* Excluded Companies / Blacklist */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
              <ShieldAlert className="h-3.5 w-3.5" />
              <span>Excluded Companies (Blacklist)</span>
            </div>
            <TagInput
              id="excluded-companies-input"
              helperText="Never recommend or submit applications to these employers."
              tags={preferences.excludedCompanies}
              onChange={(newCos) => onUpdateField("excludedCompanies", newCos)}
              placeholder="Type company name and press Enter..."
              badgeVariant="danger"
            />
          </div>

          {/* Hard Dealbreakers */}
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 dark:text-amber-400">
              <ShieldAlert className="h-3.5 w-3.5 text-amber-500" />
              <span>Hard Dealbreakers & Red Flags</span>
            </div>
            <TagInput
              id="dealbreakers-input"
              helperText="Conditions that immediately disqualify a job opportunity."
              tags={preferences.dealbreakers}
              onChange={(newDeals) => onUpdateField("dealbreakers", newDeals)}
              placeholder="e.g. 5-day on-site, unpaid test..."
              suggestions={sampleDealbreakers}
              badgeVariant="warning"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
