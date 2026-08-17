"use client";

import * as React from "react";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  suggestions?: string[];
  maxTags?: number;
  badgeVariant?: "default" | "secondary" | "brand" | "danger" | "success" | "warning" | "outline";
  id?: string;
  label?: string;
  helperText?: string;
  error?: string;
}

export function TagInput({
  tags,
  onChange,
  placeholder = "Type and press Enter...",
  suggestions = [],
  maxTags = 25,
  badgeVariant = "secondary",
  id,
  label,
  helperText,
  error,
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const inputRef = React.useRef<HTMLInputElement>(null);

  const addTag = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (tags.some((t) => t.toLowerCase() === trimmed.toLowerCase())) {
      setInputValue("");
      return;
    }
    if (tags.length >= maxTags) return;

    onChange([...tags, trimmed]);
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    onChange(tags.filter((_, idx) => idx !== indexToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "Backspace" && inputValue === "" && tags.length > 0) {
      removeTag(tags.length - 1);
    }
  };

  // Filter suggestions to only those not already selected
  const availableSuggestions = React.useMemo(() => {
    const lowerTags = new Set(tags.map((t) => t.toLowerCase()));
    return suggestions.filter((s) => !lowerTags.has(s.toLowerCase())).slice(0, 6);
  }, [tags, suggestions]);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label htmlFor={id} className="block text-sm font-medium text-neutral-800 dark:text-neutral-200">
            {label}
          </label>
          <span className="text-xs text-neutral-400">
            {tags.length}/{maxTags}
          </span>
        </div>
      )}

      <div
        onClick={() => inputRef.current?.focus()}
        className={cn(
          "min-h-[46px] w-full rounded-lg border border-neutral-300 bg-white p-2 text-sm shadow-xs transition-colors focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:focus-within:border-neutral-100 dark:focus-within:ring-neutral-100 flex flex-wrap items-center gap-1.5 cursor-text",
          error && "border-red-500 focus-within:border-red-500 focus-within:ring-red-500"
        )}
      >
        {tags.map((tag, idx) => (
          <Badge
            key={`${tag}-${idx}`}
            variant={badgeVariant}
            size="md"
            onRemove={() => removeTag(idx)}
            removeAriaLabel={`Remove ${tag}`}
          >
            {tag}
          </Badge>
        ))}

        <input
          ref={inputRef}
          id={id}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (inputValue.trim()) {
              addTag(inputValue);
            }
          }}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500 text-sm py-1 px-1"
          disabled={tags.length >= maxTags}
        />
      </div>

      {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
      {helperText && !error && <p className="text-xs text-neutral-500 dark:text-neutral-400">{helperText}</p>}

      {availableSuggestions.length > 0 && (
        <div className="pt-1 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-neutral-400 font-medium">Suggestions:</span>
          {availableSuggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => addTag(suggestion)}
              className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-md border border-dashed border-neutral-300 hover:border-neutral-400 bg-neutral-50 hover:bg-neutral-100 text-neutral-700 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300 transition-colors cursor-pointer"
            >
              <Plus className="h-2.5 w-2.5 opacity-60" />
              <span>{suggestion}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
