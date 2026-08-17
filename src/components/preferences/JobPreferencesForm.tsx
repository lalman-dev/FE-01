"use client";

import * as React from "react";
import {
  Briefcase,
  Globe,
  DollarSign,
  Code2,
  Building,
  Bot,
  LayoutGrid,
  Save,
  RotateCcw,
} from "lucide-react";
import { useJobPreferences } from "@/hooks/useJobPreferences";
import { PreferencesHeader } from "@/components/preferences/PreferencesHeader";
import { RoleSenioritySection } from "@/components/preferences/RoleSenioritySection";
import { WorkLocationSection } from "@/components/preferences/WorkLocationSection";
import { CompensationSection } from "@/components/preferences/CompensationSection";
import { SkillsStackSection } from "@/components/preferences/SkillsStackSection";
import { CompanyPreferencesSection } from "@/components/preferences/CompanyPreferencesSection";
import { AiCopilotSettingsSection } from "@/components/preferences/AiCopilotSettingsSection";
import { PreferencesSummaryCard } from "@/components/preferences/PreferencesSummaryCard";
import { ImportExportModal } from "@/components/preferences/ImportExportModal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TabId = "all" | "roles" | "location" | "compensation" | "skills" | "companies" | "ai";

export function JobPreferencesForm() {
  const {
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
    loadPreset,
    exportPreferencesJson,
    importPreferencesJson,
  } = useJobPreferences();

  const [activeTab, setActiveTab] = React.useState<TabId>("all");
  const [isImportExportOpen, setIsImportExportOpen] = React.useState(false);

  const navigationTabs: { id: TabId; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "all", label: "Overview / All", icon: <LayoutGrid className="h-4 w-4" /> },
    { id: "roles", label: "Roles & Seniority", icon: <Briefcase className="h-4 w-4" />, count: preferences.roleTitles.length },
    { id: "location", label: "Work & Location", icon: <Globe className="h-4 w-4" /> },
    { id: "compensation", label: "Compensation", icon: <DollarSign className="h-4 w-4" /> },
    { id: "skills", label: "Tech Stack", icon: <Code2 className="h-4 w-4" />, count: preferences.primarySkills.length },
    { id: "companies", label: "Company & Culture", icon: <Building className="h-4 w-4" /> },
    { id: "ai", label: "AI Copilot Tuning", icon: <Bot className="h-4 w-4" /> },
  ];

  const handleNavigateSection = (sectionId: string) => {
    setActiveTab("all");
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-neutral-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-neutral-900 border-t-transparent dark:border-neutral-100" />
          <span>Loading your job preferences...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50/50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Sticky Header */}
      <PreferencesHeader
        isDirty={isDirty}
        saveStatus={saveStatus}
        lastSavedTimestamp={lastSavedTimestamp}
        onSave={savePreferences}
        onReset={resetToDefaults}
        onLoadPreset={loadPreset}
        onOpenImportExport={() => setIsImportExportOpen(true)}
      />

      {/* Main Body */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Navigation Sidebar (Desktop) */}
          <nav
            aria-label="Preferences Sections"
            className="hidden lg:block lg:col-span-3 sticky top-24 space-y-1"
          >
            <div className="mb-3 px-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                Form Sections
              </span>
            </div>
            {navigationTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-xs font-medium transition-colors cursor-pointer",
                    isActive
                      ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs"
                      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-200"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && tab.count > 0 && (
                    <span
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        isActive
                          ? "bg-white/20 text-white dark:bg-neutral-900/20 dark:text-neutral-900"
                          : "bg-neutral-200 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                      )}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Form Content Area */}
          <div className="lg:col-span-6 space-y-8">
            {/* Mobile Tab Selector */}
            <div className="lg:hidden flex overflow-x-auto pb-2 gap-1.5 no-scrollbar">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "shrink-0 flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium border transition-colors cursor-pointer",
                    activeTab === tab.id
                      ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900"
                      : "border-neutral-200 bg-white text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  )}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            {/* Form Sections depending on selected tab */}
            {(activeTab === "all" || activeTab === "roles") && (
              <RoleSenioritySection
                preferences={preferences}
                onUpdateField={updateField}
              />
            )}

            {(activeTab === "all" || activeTab === "location") && (
              <WorkLocationSection
                preferences={preferences}
                onUpdateField={updateField}
              />
            )}

            {(activeTab === "all" || activeTab === "compensation") && (
              <CompensationSection
                salary={preferences.salary}
                onUpdateSalary={updateSalaryField}
              />
            )}

            {(activeTab === "all" || activeTab === "skills") && (
              <SkillsStackSection
                preferences={preferences}
                onUpdateField={updateField}
              />
            )}

            {(activeTab === "all" || activeTab === "companies") && (
              <CompanyPreferencesSection
                preferences={preferences}
                onUpdateField={updateField}
              />
            )}

            {(activeTab === "all" || activeTab === "ai") && (
              <AiCopilotSettingsSection
                aiCopilot={preferences.aiCopilot}
                onUpdateAiField={updateAiField}
              />
            )}

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={resetToDefaults}
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset to Defaults</span>
              </Button>

              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={savePreferences}
                isLoading={saveStatus === "saving"}
              >
                <Save className="h-4 w-4" />
                <span>Save All Changes</span>
              </Button>
            </div>
          </div>

          {/* Right Summary & Fit Readiness Sidebar */}
          <div className="lg:col-span-3 sticky top-24 space-y-4">
            <PreferencesSummaryCard
              preferences={preferences}
              readinessScore={profileReadiness}
              warnings={validationWarnings}
              onNavigateSection={handleNavigateSection}
            />
          </div>
        </div>
      </main>

      {/* Import / Export Modal */}
      <ImportExportModal
        isOpen={isImportExportOpen}
        onClose={() => setIsImportExportOpen(false)}
        exportJson={exportPreferencesJson}
        importJson={importPreferencesJson}
      />
    </div>
  );
}
