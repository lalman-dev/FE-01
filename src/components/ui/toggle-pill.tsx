"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ToggleOption<T extends string> {
  id: T;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[];
  value: T[];
  onChange: (value: T[]) => void;
  multiple?: boolean;
  layout?: "grid" | "stack" | "wrap";
  columns?: 2 | 3 | 4;
  className?: string;
}

export function ToggleGroup<T extends string>({
  options,
  value,
  onChange,
  multiple = true,
  layout = "wrap",
  columns = 2,
  className,
}: ToggleGroupProps<T>) {
  const handleToggle = (id: T) => {
    if (multiple) {
      if (value.includes(id)) {
        onChange(value.filter((v) => v !== id));
      } else {
        onChange([...value, id]);
      }
    } else {
      onChange([id]);
    }
  };

  const gridColsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  const layoutClass = {
    grid: `grid gap-2.5 ${gridColsClass}`,
    stack: "flex flex-col gap-2",
    wrap: "flex flex-wrap gap-2",
  }[layout];

  return (
    <div className={cn(layoutClass, className)}>
      {options.map((option) => {
        const isSelected = value.includes(option.id);

        return (
          <button
            key={option.id}
            type="button"
            onClick={() => handleToggle(option.id)}
            aria-pressed={isSelected}
            className={cn(
              "group relative flex items-start text-left rounded-lg border p-3 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100",
              isSelected
                ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-neutral-900 shadow-xs"
                : "border-neutral-200 bg-white text-neutral-800 hover:border-neutral-300 hover:bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:border-neutral-700 dark:hover:bg-neutral-800/80"
            )}
          >
            <div className="flex w-full items-start justify-between gap-2">
              <div className="flex items-start gap-2.5">
                {option.icon && (
                  <span
                    className={cn(
                      "mt-0.5 shrink-0 transition-colors",
                      isSelected
                        ? "text-white dark:text-neutral-900"
                        : "text-neutral-500 dark:text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200"
                    )}
                  >
                    {option.icon}
                  </span>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium leading-none">{option.label}</span>
                    {option.badge && (
                      <span
                        className={cn(
                          "text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded",
                          isSelected
                            ? "bg-white/20 text-white dark:bg-black/10 dark:text-neutral-900"
                            : "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300"
                        )}
                      >
                        {option.badge}
                      </span>
                    )}
                  </div>
                  {option.description && (
                    <p
                      className={cn(
                        "mt-1 text-xs leading-relaxed",
                        isSelected
                          ? "text-neutral-200 dark:text-neutral-700"
                          : "text-neutral-500 dark:text-neutral-400"
                      )}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border transition-colors",
                  isSelected
                    ? "border-white bg-white text-neutral-900 dark:border-neutral-900 dark:bg-neutral-900 dark:text-white"
                    : "border-neutral-300 dark:border-neutral-700 opacity-0 group-hover:opacity-40"
                )}
              >
                {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
