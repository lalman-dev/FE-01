"use client";

import * as React from "react";
import { Bot, Sliders, MessageSquareCode, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleGroup } from "@/components/ui/toggle-pill";
import { AiCopilotPreferences, AiTone, TailoringIntensity } from "@/types/preferences";
import {
  AI_TONE_OPTIONS,
  TAILORING_INTENSITY_OPTIONS,
  POPULAR_THEME_SUGGESTIONS,
} from "@/lib/constants";

interface AiCopilotSettingsSectionProps {
  aiCopilot: AiCopilotPreferences;
  onUpdateAiField: <K extends keyof AiCopilotPreferences>(key: K, value: AiCopilotPreferences[K]) => void;
}

export function AiCopilotSettingsSection({
  aiCopilot,
  onUpdateAiField,
}: AiCopilotSettingsSectionProps) {
  const toneToggleOptions = React.useMemo(
    () =>
      AI_TONE_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        description: opt.description,
      })),
    []
  );

  const intensityToggleOptions = React.useMemo(
    () =>
      TAILORING_INTENSITY_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        description: opt.description,
      })),
    []
  );

  return (
    <Card id="section-ai">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>AI Application Copilot & Tailoring</CardTitle>
            <CardDescription>
              Fine-tune how ApplyPilot AI drafts tailored resumes, cover letters, and application responses.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* AI Writing Tone */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <MessageSquareCode className="h-4 w-4 text-neutral-500" />
              Generated Writing Tone & Narrative Voice
            </label>
            <span className="text-xs text-neutral-400">Single select</span>
          </div>

          <ToggleGroup<AiTone>
            options={toneToggleOptions}
            value={[aiCopilot.tone]}
            onChange={(newVals) => {
              if (newVals.length > 0) {
                onUpdateAiField("tone", newVals[0]);
              }
            }}
            multiple={false}
            layout="grid"
            columns={2}
          />
        </div>

        {/* ATS Tailoring Intensity */}
        <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Sliders className="h-4 w-4 text-neutral-500" />
              Resume Tailoring Intensity
            </label>
            <span className="text-xs text-neutral-400">Controls degree of AI paraphrasing</span>
          </div>

          <ToggleGroup<TailoringIntensity>
            options={intensityToggleOptions}
            value={[aiCopilot.tailoringIntensity]}
            onChange={(newVals) => {
              if (newVals.length > 0) {
                onUpdateAiField("tailoringIntensity", newVals[0]);
              }
            }}
            multiple={false}
            layout="grid"
            columns={3}
          />
        </div>

        {/* Emphasized Career Themes */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-900 dark:text-neutral-100">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" />
            <span>Key Themes & Angles to Emphasize</span>
          </div>
          <TagInput
            id="emphasized-themes-input"
            helperText="ApplyPilot will weave these specific strengths across generated cover letters and interview talking points."
            tags={aiCopilot.emphasizedThemes}
            onChange={(newThemes) => onUpdateAiField("emphasizedThemes", newThemes)}
            placeholder="e.g. 0-to-1 Product Craftsmanship, Performance Optimization..."
            suggestions={POPULAR_THEME_SUGGESTIONS}
            badgeVariant="brand"
          />
        </div>

        {/* Custom Instructions Prompt */}
        <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <label htmlFor="custom-instructions" className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Custom AI Copilot System Directives
            </label>
            <span className="text-xs text-neutral-400">
              {aiCopilot.customInstructions.length} characters
            </span>
          </div>
          <textarea
            id="custom-instructions"
            rows={4}
            value={aiCopilot.customInstructions}
            onChange={(e) => onUpdateAiField("customInstructions", e.target.value)}
            placeholder="e.g. Always emphasize my experience leading 0-to-1 frontend initiatives, quantify metrics, and avoid buzzwords like 'synergy' or 'ninja'..."
            className="w-full rounded-lg border border-neutral-300 bg-white p-3 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 leading-relaxed placeholder:text-neutral-400 dark:placeholder:text-neutral-500"
          />
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            These instructions act as high-priority constraints injected into all downstream resume generation and application Q&A prompt chains.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
