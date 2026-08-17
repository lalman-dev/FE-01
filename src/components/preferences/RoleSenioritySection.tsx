"use client";

import * as React from "react";
import { Briefcase, Layers, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleGroup } from "@/components/ui/toggle-pill";
import { JobPreferences, SeniorityLevel, EmploymentType } from "@/types/preferences";
import {
  SENIORITY_OPTIONS,
  EMPLOYMENT_TYPE_OPTIONS,
  POPULAR_ROLE_SUGGESTIONS,
} from "@/lib/constants";

interface RoleSenioritySectionProps {
  preferences: JobPreferences;
  onUpdateField: <K extends keyof JobPreferences>(key: K, value: JobPreferences[K]) => void;
}

export function RoleSenioritySection({ preferences, onUpdateField }: RoleSenioritySectionProps) {
  const seniorityToggleOptions = React.useMemo(
    () =>
      SENIORITY_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        description: opt.description,
      })),
    []
  );

  const employmentTypeToggleOptions = React.useMemo(
    () =>
      EMPLOYMENT_TYPE_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
      })),
    []
  );

  return (
    <Card id="section-roles">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Target Roles & Seniority</CardTitle>
            <CardDescription>
              Define the specific job titles, seniority levels, and contract arrangements you are targeting.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Desired Job Titles */}
        <div className="space-y-2">
          <TagInput
            id="role-titles-input"
            label="Target Job Titles (Exact & Related)"
            helperText="Press Enter or comma to add titles. ApplyPilot uses these to match relevant postings."
            tags={preferences.roleTitles}
            onChange={(newTags) => onUpdateField("roleTitles", newTags)}
            placeholder="e.g. Senior Frontend Engineer, Full Stack AI Developer..."
            suggestions={POPULAR_ROLE_SUGGESTIONS}
            badgeVariant="default"
            error={preferences.roleTitles.length === 0 ? "At least one target job title is required." : undefined}
          />
        </div>

        {/* Seniority Levels */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Layers className="h-4 w-4 text-neutral-500" />
              Target Seniority Levels
            </label>
            <span className="text-xs text-neutral-400">Select all that apply</span>
          </div>

          <ToggleGroup<SeniorityLevel>
            options={seniorityToggleOptions}
            value={preferences.seniorityLevels}
            onChange={(newLevels) => onUpdateField("seniorityLevels", newLevels)}
            multiple={true}
            layout="grid"
            columns={2}
          />
          {preferences.seniorityLevels.length === 0 && (
            <p className="text-xs text-red-600 dark:text-red-400">
              Please select at least one target seniority level.
            </p>
          )}
        </div>

        {/* Employment Types */}
        <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Clock className="h-4 w-4 text-neutral-500" />
              Employment Arrangement Types
            </label>
            <span className="text-xs text-neutral-400">Multi-select</span>
          </div>

          <ToggleGroup<EmploymentType>
            options={employmentTypeToggleOptions}
            value={preferences.employmentTypes}
            onChange={(newTypes) => onUpdateField("employmentTypes", newTypes)}
            multiple={true}
            layout="grid"
            columns={4}
          />
        </div>
      </CardContent>
    </Card>
  );
}
