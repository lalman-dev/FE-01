"use client";

import * as React from "react";
import { Sparkles, Save, RotateCcw, Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PRESET_PROFILES } from "@/lib/constants";
import { useToast } from "@/components/ui/toast";

interface PreferencesHeaderProps {
  isDirty: boolean;
  saveStatus: "saved" | "saving" | "unsaved";
  lastSavedTimestamp: string | null;
  onSave: () => void;
  onReset: () => void;
  onLoadPreset: (presetId: string) => void;
  onOpenImportExport: () => void;
}

export function PreferencesHeader({
  isDirty,
  saveStatus,
  lastSavedTimestamp,
  onSave,
  onReset,
  onLoadPreset,
  onOpenImportExport,
}: PreferencesHeaderProps) {
  const { toast } = useToast();
  const [selectedPreset, setSelectedPreset] = React.useState<string>("");

  const handlePresetSelect = (presetId: string) => {
    if (!presetId) return;
    setSelectedPreset(presetId);
    onLoadPreset(presetId);
    const preset = PRESET_PROFILES.find((p) => p.id === presetId);
    toast({
      type: "info",
      title: "Preset Profile Loaded",
      description: `Loaded template settings for "${preset?.name || presetId}". Review and click Save when ready.`,
    });
  };

  const handleSaveClick = () => {
    onSave();
    toast({
      type: "success",
      title: "Preferences Saved",
      description: "Your job targeting criteria and AI copilot settings have been synced.",
    });
  };

  const handleResetClick = () => {
    if (window.confirm("Are you sure you want to reset all preferences to default values?")) {
      onReset();
      setSelectedPreset("");
      toast({
        type: "warning",
        title: "Preferences Reset",
        description: "All job preferences have been restored to default values.",
      });
    }
  };

  const formattedSavedTime = React.useMemo(() => {
    if (!lastSavedTimestamp) return null;
    try {
      return new Date(lastSavedTimestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return null;
    }
  }, [lastSavedTimestamp]);

  return (
    <header className="border-b border-neutral-200 bg-white/95 backdrop-blur-sm dark:border-neutral-800 dark:bg-neutral-950/95 sticky top-0 z-30 transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Title & Metadata */}
          <div>
            <div className="flex items-center gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              <span>ApplyPilot Settings</span>
              <span>/</span>
              <span className="text-neutral-900 dark:text-neutral-200 font-semibold">Job Search Preferences</span>
            </div>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
                Job Preferences & AI Alignment
              </h1>

              {/* Status Badge */}
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors ${
                  isDirty
                    ? "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800"
                }`}
              >
                {isDirty ? (
                  <>
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    <span>Unsaved Changes</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    <span>Saved {formattedSavedTime ? `at ${formattedSavedTime}` : ""}</span>
                  </>
                )}
              </span>
            </div>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Configure your target roles, salary bands, tech stack, and AI copilot tailoring behavior.
            </p>
          </div>

          {/* Quick Presets & Primary Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick Presets Dropdown */}
            <div className="flex items-center gap-1.5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg px-2.5 py-1 text-xs">
              <Sparkles className="h-3.5 w-3.5 text-amber-500" />
              <label htmlFor="preset-select" className="text-neutral-500 dark:text-neutral-400 font-medium">
                Preset:
              </label>
              <select
                id="preset-select"
                value={selectedPreset}
                onChange={(e) => handlePresetSelect(e.target.value)}
                className="bg-transparent text-neutral-900 dark:text-neutral-100 font-medium focus:outline-none cursor-pointer pr-1"
              >
                <option value="" disabled>Choose role preset...</option>
                {PRESET_PROFILES.map((p) => (
                  <option key={p.id} value={p.id} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100">
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Import / Export JSON */}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onOpenImportExport}
              title="Import or Export Preferences JSON"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Sync / JSON</span>
            </Button>

            {/* Reset Defaults */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleResetClick}
              title="Reset all fields to standard defaults"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </Button>

            {/* Save Button */}
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={handleSaveClick}
              isLoading={saveStatus === "saving"}
              className="gap-2 font-semibold"
            >
              <Save className="h-3.5 w-3.5" />
              <span>Save Preferences</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
