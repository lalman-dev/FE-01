"use client";

import * as React from "react";
import { Code2, Star, PlusCircle, Ban } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import { JobPreferences } from "@/types/preferences";
import { POPULAR_SKILL_SUGGESTIONS } from "@/lib/constants";

interface SkillsStackSectionProps {
  preferences: JobPreferences;
  onUpdateField: <K extends keyof JobPreferences>(key: K, value: JobPreferences[K]) => void;
}

export function SkillsStackSection({ preferences, onUpdateField }: SkillsStackSectionProps) {
  const popularPrimary = React.useMemo(() => {
    return POPULAR_SKILL_SUGGESTIONS.slice(0, 10);
  }, []);

  const popularSecondary = React.useMemo(() => {
    return POPULAR_SKILL_SUGGESTIONS.slice(10, 22);
  }, []);

  const popularExcluded = [
    "Legacy jQuery",
    "AngularJS (1.x)",
    "PHP 5",
    "Perl",
    "ColdFusion",
    "Flash / ActionScript",
    "COBOL",
    "WordPress Custom Themes",
  ];

  return (
    <Card id="section-skills">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <Code2 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Technical Skills & Tech Stack</CardTitle>
            <CardDescription>
              Specify your primary strengths, technologies you want to work with, and any legacy tools to exclude from matches.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Primary Core Skills */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
            <span>Primary / Core Proficiencies (Must-Have Stack)</span>
          </div>
          <TagInput
            id="primary-skills-input"
            helperText="Technologies you expect to use daily. ApplyPilot weights these highest in ATS alignment scoring."
            tags={preferences.primarySkills}
            onChange={(newSkills) => onUpdateField("primarySkills", newSkills)}
            placeholder="Type skill (e.g. Next.js, React, TypeScript) and press Enter..."
            suggestions={popularPrimary}
            badgeVariant="default"
            error={preferences.primarySkills.length === 0 ? "Please specify at least one core skill." : undefined}
          />
        </div>

        {/* Secondary / Growth Skills */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            <PlusCircle className="h-3.5 w-3.5 text-sky-500" />
            <span>Secondary / Desired Technologies (Nice-to-Have Stack)</span>
          </div>
          <TagInput
            id="secondary-skills-input"
            helperText="Skills you have experience with or want to expand into (e.g. AI Prompting, GraphQL, Docker)."
            tags={preferences.secondarySkills}
            onChange={(newSkills) => onUpdateField("secondarySkills", newSkills)}
            placeholder="Type secondary skill and press Enter..."
            suggestions={popularSecondary}
            badgeVariant="secondary"
          />
        </div>

        {/* Excluded Skills / Dealbreaker Tech */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-red-600 dark:text-red-400">
            <Ban className="h-3.5 w-3.5 text-red-500" />
            <span>Excluded Technologies (Avoid in Job Matching)</span>
          </div>
          <TagInput
            id="excluded-skills-input"
            helperText="ApplyPilot will penalize or flag job descriptions centered around these technologies."
            tags={preferences.excludedSkills}
            onChange={(newSkills) => onUpdateField("excludedSkills", newSkills)}
            placeholder="e.g. Legacy jQuery, PHP 5, AngularJS..."
            suggestions={popularExcluded}
            badgeVariant="danger"
          />
        </div>
      </CardContent>
    </Card>
  );
}
