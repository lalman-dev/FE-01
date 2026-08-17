"use client";

import * as React from "react";
import { Globe, MapPin, Laptop, Building2, Plane, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { TagInput } from "@/components/ui/tag-input";
import { ToggleGroup } from "@/components/ui/toggle-pill";
import { JobPreferences, WorkMode, RelocationWillingness, VisaSponsorship } from "@/types/preferences";
import {
  WORK_MODE_OPTIONS,
  RELOCATION_OPTIONS,
  VISA_OPTIONS,
  POPULAR_LOCATION_SUGGESTIONS,
} from "@/lib/constants";

interface WorkLocationSectionProps {
  preferences: JobPreferences;
  onUpdateField: <K extends keyof JobPreferences>(key: K, value: JobPreferences[K]) => void;
}

export function WorkLocationSection({ preferences, onUpdateField }: WorkLocationSectionProps) {
  const workModeToggleOptions = React.useMemo(() => {
    const iconMap: Record<string, React.ReactNode> = {
      laptop: <Laptop className="h-4 w-4" />,
      "building-2": <Building2 className="h-4 w-4" />,
      "map-pin": <MapPin className="h-4 w-4" />,
    };

    return WORK_MODE_OPTIONS.map((opt) => ({
      id: opt.id,
      label: opt.label,
      description: opt.description,
      icon: iconMap[opt.icon],
    }));
  }, []);

  return (
    <Card id="section-location">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <Globe className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Work Arrangement & Locations</CardTitle>
            <CardDescription>
              Specify where and how you want to work, along with relocation and visa preferences.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Work Mode Toggle */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
              Work Mode Preference
            </label>
            <span className="text-xs text-neutral-400">Select acceptable options</span>
          </div>

          <ToggleGroup<WorkMode>
            options={workModeToggleOptions}
            value={preferences.workModes}
            onChange={(newModes) => onUpdateField("workModes", newModes)}
            multiple={true}
            layout="grid"
            columns={3}
          />
          {preferences.workModes.length === 0 && (
            <p className="text-xs text-red-600 dark:text-red-400">
              Select at least one work mode (e.g. Remote or Hybrid).
            </p>
          )}
        </div>

        {/* Preferred Locations */}
        <div className="space-y-2">
          <TagInput
            id="preferred-locations-input"
            label="Target Cities, Regions, or Timezones"
            helperText="Add acceptable locations (e.g. 'Remote - US', 'San Francisco, CA', 'London, UK')."
            tags={preferences.preferredLocations}
            onChange={(newLocations) => onUpdateField("preferredLocations", newLocations)}
            placeholder="Type a city or region and press Enter..."
            suggestions={POPULAR_LOCATION_SUGGESTIONS}
            badgeVariant="secondary"
          />
        </div>

        {/* Relocation & Visa Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          {/* Relocation Preference */}
          <div className="space-y-2">
            <label
              htmlFor="relocation-select"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2"
            >
              <Plane className="h-4 w-4 text-neutral-500" />
              Relocation Willingness
            </label>
            <select
              id="relocation-select"
              value={preferences.relocation}
              onChange={(e) => onUpdateField("relocation", e.target.value as RelocationWillingness)}
              className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
            >
              {RELOCATION_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Visa Sponsorship */}
          <div className="space-y-2">
            <label
              htmlFor="visa-select"
              className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4 text-neutral-500" />
              Visa / Work Authorization Status
            </label>
            <select
              id="visa-select"
              value={preferences.visaSponsorship}
              onChange={(e) => onUpdateField("visaSponsorship", e.target.value as VisaSponsorship)}
              className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
            >
              {VISA_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
