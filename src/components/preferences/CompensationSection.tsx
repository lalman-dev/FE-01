"use client";

import * as React from "react";
import { DollarSign, Coins, TrendingUp, Sparkles } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ToggleGroup } from "@/components/ui/toggle-pill";
import { SalaryPreferences, EquityPreference, PayFrequency } from "@/types/preferences";
import {
  CURRENCY_OPTIONS,
  PAY_FREQUENCY_OPTIONS,
  EQUITY_OPTIONS,
} from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface CompensationSectionProps {
  salary: SalaryPreferences;
  onUpdateSalary: <K extends keyof SalaryPreferences>(key: K, value: SalaryPreferences[K]) => void;
}

export function CompensationSection({ salary, onUpdateSalary }: CompensationSectionProps) {
  const equityToggleOptions = React.useMemo(
    () =>
      EQUITY_OPTIONS.map((opt) => ({
        id: opt.id,
        label: opt.label,
        description: opt.description,
      })),
    []
  );

  const isInvalidRange = salary.minBase > salary.targetBase;

  // Preset step & max based on frequency
  const step = salary.frequency === "hourly" ? 5 : salary.frequency === "monthly" ? 500 : 5000;
  const maxRange = salary.frequency === "hourly" ? 300 : salary.frequency === "monthly" ? 40000 : 500000;

  return (
    <Card id="section-compensation">
      <CardHeader>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <CardTitle>Compensation & Salary Band</CardTitle>
            <CardDescription>
              Set your minimum baseline and target compensation to filter opportunities and empower AI negotiations.
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Currency & Frequency Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="currency-select" className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Coins className="h-4 w-4 text-neutral-500" />
              Currency
            </label>
            <select
              id="currency-select"
              value={salary.currency}
              onChange={(e) => onUpdateSalary("currency", e.target.value)}
              className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
            >
              {CURRENCY_OPTIONS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="frequency-select" className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-neutral-500" />
              Pay Schedule
            </label>
            <select
              id="frequency-select"
              value={salary.frequency}
              onChange={(e) => onUpdateSalary("frequency", e.target.value as PayFrequency)}
              className="w-full rounded-lg border border-neutral-300 bg-white p-2.5 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100 dark:focus:border-neutral-100 dark:focus:ring-neutral-100"
            >
              {PAY_FREQUENCY_OPTIONS.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Salary Band Inputs & Interactive Visualizer */}
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/40">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              Target Compensation Range
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              <span>{formatCurrency(salary.minBase, salary.currency)}</span>
              <span className="text-neutral-400">→</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {formatCurrency(salary.targetBase, salary.currency)}
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                /{salary.frequency === "annual" ? "yr" : salary.frequency === "monthly" ? "mo" : "hr"}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Minimum Base */}
            <div className="space-y-1.5">
              <label htmlFor="min-base-input" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Minimum Acceptable Base
              </label>
              <div className="relative">
                <input
                  id="min-base-input"
                  type="number"
                  min={0}
                  max={maxRange}
                  step={step}
                  value={salary.minBase || ""}
                  onChange={(e) => onUpdateSalary("minBase", Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                />
              </div>
              <input
                type="range"
                min={0}
                max={maxRange}
                step={step}
                value={salary.minBase}
                onChange={(e) => onUpdateSalary("minBase", Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-neutral-900 dark:accent-neutral-100"
                aria-label="Minimum Base Slider"
              />
            </div>

            {/* Target Base */}
            <div className="space-y-1.5">
              <label htmlFor="target-base-input" className="text-xs font-medium text-neutral-700 dark:text-neutral-300">
                Target / Ideal Base
              </label>
              <div className="relative">
                <input
                  id="target-base-input"
                  type="number"
                  min={0}
                  max={maxRange}
                  step={step}
                  value={salary.targetBase || ""}
                  onChange={(e) => onUpdateSalary("targetBase", Number(e.target.value) || 0)}
                  className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
                />
              </div>
              <input
                type="range"
                min={0}
                max={maxRange}
                step={step}
                value={salary.targetBase}
                onChange={(e) => onUpdateSalary("targetBase", Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer dark:bg-neutral-700 accent-neutral-900 dark:accent-neutral-100"
                aria-label="Target Base Slider"
              />
            </div>
          </div>

          {isInvalidRange && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">
              Warning: Your minimum base ({formatCurrency(salary.minBase, salary.currency)}) exceeds your target base ({formatCurrency(salary.targetBase, salary.currency)}).
            </p>
          )}
        </div>

        {/* Equity Preferences */}
        <div className="space-y-3 pt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-neutral-500" />
              Equity & Stock Options Priority
            </label>
            <span className="text-xs text-neutral-400">Single select</span>
          </div>

          <ToggleGroup<EquityPreference>
            options={equityToggleOptions}
            value={[salary.equityPreference]}
            onChange={(newVals) => {
              if (newVals.length > 0) {
                onUpdateSalary("equityPreference", newVals[0]);
              }
            }}
            multiple={false}
            layout="grid"
            columns={2}
          />
        </div>
      </CardContent>
    </Card>
  );
}
