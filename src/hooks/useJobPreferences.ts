"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { JobPreferences, ValidationWarning } from "@/types/preferences";
import { DEFAULT_PREFERENCES, LOCAL_STORAGE_KEY, PRESET_PROFILES } from "@/lib/constants";

function getInitialPreferences(): JobPreferences {
  if (typeof window === "undefined") {
    return DEFAULT_PREFERENCES;
  }
  try {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as JobPreferences;
      if (parsed && typeof parsed === "object") {
        return {
          ...DEFAULT_PREFERENCES,
          ...parsed,
          salary: {
            ...DEFAULT_PREFERENCES.salary,
            ...(parsed.salary || {}),
          },
          aiCopilot: {
            ...DEFAULT_PREFERENCES.aiCopilot,
            ...(parsed.aiCopilot || {}),
          },
          meta: {
            ...DEFAULT_PREFERENCES.meta,
            ...(parsed.meta || {}),
          },
        };
      }
    }
  } catch (error) {
    console.warn("Failed to load initial preferences from localStorage", error);
  }
  return DEFAULT_PREFERENCES;
}

export function useJobPreferences() {
  const [preferences, setPreferences] = useState<JobPreferences>(getInitialPreferences);
  const [lastSavedState, setLastSavedState] = useState<JobPreferences>(getInitialPreferences);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState<string | null>(null);

  // Sync state on mount in browser if lazy initializer ran on SSR
  useEffect(() => {
    const initial = getInitialPreferences();
    setPreferences(initial);
    setLastSavedState(initial);
    setLastSavedTimestamp(initial.meta.lastSavedAt || null);
    setIsLoaded(true);
  }, []);

  // Compute dirty state
  const isDirty = useMemo(() => {
    if (!isLoaded) return false;
    const currentComp = { ...preferences, meta: undefined };
    const savedComp = { ...lastSavedState, meta: undefined };
    return JSON.stringify(currentComp) !== JSON.stringify(savedComp);
  }, [preferences, lastSavedState, isLoaded]);

  // Derived save status
  const saveStatus: "saved" | "saving" | "unsaved" = isSaving
    ? "saving"
    : isDirty
    ? "unsaved"
    : "saved";

  // Field updaters
  const updateField = useCallback(<K extends keyof JobPreferences>(key: K, value: JobPreferences[K]) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const updateSalaryField = useCallback(<K extends keyof JobPreferences["salary"]>(key: K, value: JobPreferences["salary"][K]) => {
    setPreferences((prev) => ({
      ...prev,
      salary: {
        ...prev.salary,
        [key]: value,
      },
    }));
  }, []);

  const updateAiField = useCallback(<K extends keyof JobPreferences["aiCopilot"]>(key: K, value: JobPreferences["aiCopilot"][K]) => {
    setPreferences((prev) => ({
      ...prev,
      aiCopilot: {
        ...prev.aiCopilot,
        [key]: value,
      },
    }));
  }, []);

  // Save changes
  const savePreferences = useCallback((): boolean => {
    try {
      setIsSaving(true);
      const timestamp = new Date().toISOString();
      const stateToSave: JobPreferences = {
        ...preferences,
        meta: {
          version: 1,
          lastSavedAt: timestamp,
        },
      };

      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
      setPreferences(stateToSave);
      setLastSavedState(stateToSave);
      setLastSavedTimestamp(timestamp);
      setIsSaving(false);
      return true;
    } catch (error) {
      console.error("Failed to save job preferences", error);
      setIsSaving(false);
      return false;
    }
  }, [preferences]);

  // Reset to defaults
  const resetToDefaults = useCallback(() => {
    const timestamp = new Date().toISOString();
    const resetState: JobPreferences = {
      ...DEFAULT_PREFERENCES,
      meta: {
        version: 1,
        lastSavedAt: timestamp,
      },
    };
    setPreferences(resetState);
    setLastSavedState(resetState);
    setLastSavedTimestamp(timestamp);
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resetState));
    } catch (error) {
      console.error("Failed to reset localStorage", error);
    }
  }, []);

  // Discard unsaved changes
  const discardChanges = useCallback(() => {
    setPreferences(lastSavedState);
  }, [lastSavedState]);

  // Load a preset
  const loadPreset = useCallback((presetId: string): boolean => {
    const preset = PRESET_PROFILES.find((p) => p.id === presetId);
    if (!preset) return false;

    setPreferences((prev) => ({
      ...preset.preferences,
      meta: {
        ...prev.meta,
      },
    }));
    return true;
  }, []);

  // Export JSON
  const exportPreferencesJson = useCallback((): string => {
    return JSON.stringify(preferences, null, 2);
  }, [preferences]);

  // Import JSON
  const importPreferencesJson = useCallback((jsonString: string): { success: boolean; error?: string } => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== "object") {
        return { success: false, error: "Invalid JSON format: root must be an object." };
      }

      const imported: JobPreferences = {
        ...DEFAULT_PREFERENCES,
        ...parsed,
        salary: {
          ...DEFAULT_PREFERENCES.salary,
          ...(parsed.salary || {}),
        },
        aiCopilot: {
          ...DEFAULT_PREFERENCES.aiCopilot,
          ...(parsed.aiCopilot || {}),
        },
        meta: {
          version: 1,
          lastSavedAt: new Date().toISOString(),
        },
      };

      setPreferences(imported);
      setLastSavedState(imported);
      setLastSavedTimestamp(imported.meta.lastSavedAt);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(imported));
      return { success: true };
    } catch (err) {
      return { success: false, error: err instanceof Error ? err.message : "Failed to parse JSON file." };
    }
  }, []);

  // Validation Warnings
  const validationWarnings = useMemo((): ValidationWarning[] => {
    const warnings: ValidationWarning[] = [];

    if (preferences.roleTitles.length === 0) {
      warnings.push({
        field: "roleTitles",
        message: "Add at least one target role title for AI matching.",
        section: "roles",
      });
    }

    if (preferences.seniorityLevels.length === 0) {
      warnings.push({
        field: "seniorityLevels",
        message: "Select at least one preferred seniority level.",
        section: "roles",
      });
    }

    if (preferences.workModes.length === 0) {
      warnings.push({
        field: "workModes",
        message: "Select at least one work arrangement mode (e.g. Remote or Hybrid).",
        section: "location",
      });
    }

    if (preferences.salary.minBase > preferences.salary.targetBase) {
      warnings.push({
        field: "salary",
        message: "Minimum base compensation cannot exceed your target base compensation.",
        section: "compensation",
      });
    }

    if (preferences.primarySkills.length === 0) {
      warnings.push({
        field: "primarySkills",
        message: "Add your primary technical skills to enable smart job matching.",
        section: "skills",
      });
    }

    return warnings;
  }, [preferences]);

  // Fit Readiness / Profile Completeness Calculation (0 - 100%)
  const profileReadiness = useMemo(() => {
    let score = 0;
    if (preferences.roleTitles.length > 0) score += 20;
    if (preferences.seniorityLevels.length > 0) score += 10;
    if (preferences.workModes.length > 0) score += 15;
    if (preferences.preferredLocations.length > 0) score += 10;
    if (preferences.salary.minBase > 0) score += 15;
    if (preferences.primarySkills.length >= 3) score += 15;
    if (preferences.targetIndustries.length > 0) score += 5;
    if (preferences.aiCopilot.customInstructions.trim().length > 10) score += 10;

    return Math.min(100, score);
  }, [preferences]);

  return {
    preferences,
    isLoaded,
    isDirty,
    saveStatus,
    lastSavedTimestamp,
    profileReadiness,
    validationWarnings,
    updateField,
    updateSalaryField,
    updateAiField,
    savePreferences,
    resetToDefaults,
    discardChanges,
    loadPreset,
    exportPreferencesJson,
    importPreferencesJson,
  };
}
