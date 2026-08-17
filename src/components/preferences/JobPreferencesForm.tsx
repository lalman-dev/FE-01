"use client";

import React, { useState, useId, useRef } from "react";
import {
  JobPreferences,
  WorkMode,
  Technology,
  FormErrors,
  WORK_MODES,
  TECHNOLOGIES,
} from "@/types/preferences";
import { Check, X, Plus, AlertCircle, CheckCircle2 } from "lucide-react";

export function JobPreferencesForm() {
  const [preferences, setPreferences] = useState<JobPreferences>({
    jobTitles: ["Frontend Engineer", "Full Stack Developer"],
    workModes: ["remote", "hybrid"],
    minSalary: 120000,
    technologies: ["React", "TypeScript", "Next.js"],
  });

  const [currentTitleInput, setCurrentTitleInput] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const jobTitleInputId = useId();
  const jobTitleErrorId = useId();
  const minSalaryInputId = useId();
  const minSalaryErrorId = useId();
  const statusMessageId = useId();

  const titleInputRef = useRef<HTMLInputElement>(null);

  // --- Handlers for Job Titles ---
  const handleAddJobTitle = () => {
    const trimmed = currentTitleInput.trim();
    if (!trimmed) {
      return;
    }

    const isDuplicate = preferences.jobTitles.some(
      (t) => t.toLowerCase() === trimmed.toLowerCase()
    );

    if (isDuplicate) {
      setErrors((prev) => ({
        ...prev,
        jobTitleInput: `"${trimmed}" is already added to your target job titles.`,
      }));
      return;
    }

    setPreferences((prev) => ({
      ...prev,
      jobTitles: [...prev.jobTitles, trimmed],
    }));
    setCurrentTitleInput("");
    setErrors((prev) => ({ ...prev, jobTitleInput: undefined }));
    setSuccessMessage(null);

    // Keep focus in input for smooth keyboard entry
    titleInputRef.current?.focus();
  };

  const handleRemoveJobTitle = (titleToRemove: string) => {
    setPreferences((prev) => ({
      ...prev,
      jobTitles: prev.jobTitles.filter((t) => t !== titleToRemove),
    }));
    setSuccessMessage(null);
  };

  const handleJobTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent accidental form submission
      handleAddJobTitle();
    }
  };

  // --- Handlers for Work Modes ---
  const handleWorkModeToggle = (mode: WorkMode) => {
    setPreferences((prev) => {
      const exists = prev.workModes.includes(mode);
      const updated = exists
        ? prev.workModes.filter((m) => m !== mode)
        : [...prev.workModes, mode];
      return { ...prev, workModes: updated };
    });
    setSuccessMessage(null);
  };

  // --- Handlers for Minimum Salary ---
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSuccessMessage(null);

    if (val === "") {
      setPreferences((prev) => ({ ...prev, minSalary: "" }));
      setErrors((prev) => ({ ...prev, minSalary: undefined }));
      return;
    }

    const num = Number(val);
    if (isNaN(num)) {
      setPreferences((prev) => ({ ...prev, minSalary: "" }));
      setErrors((prev) => ({
        ...prev,
        minSalary: "Please enter a valid numeric salary.",
      }));
      return;
    }

    if (num < 0) {
      setPreferences((prev) => ({ ...prev, minSalary: num }));
      setErrors((prev) => ({
        ...prev,
        minSalary: "Minimum salary must be 0 or greater.",
      }));
      return;
    }

    setPreferences((prev) => ({ ...prev, minSalary: num }));
    setErrors((prev) => ({ ...prev, minSalary: undefined }));
  };

  // --- Handlers for Technologies ---
  const handleTechToggle = (tech: Technology) => {
    setPreferences((prev) => {
      const exists = prev.technologies.includes(tech);
      const updated = exists
        ? prev.technologies.filter((t) => t !== tech)
        : [...prev.technologies, tech];
      return { ...prev, technologies: updated };
    });
    setSuccessMessage(null);
  };

  // --- Form Validation & Submission ---
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccessMessage(null);

    const validationErrors: FormErrors = {};

    // Validate salary
    if (preferences.minSalary !== "" && preferences.minSalary < 0) {
      validationErrors.minSalary = "Minimum salary must be 0 or greater.";
    }

    // Check if user entered text in job title input without pressing Add
    const updatedJobTitles = [...preferences.jobTitles];
    const pendingTitle = currentTitleInput.trim();
    if (pendingTitle) {
      const isDuplicate = updatedJobTitles.some(
        (t) => t.toLowerCase() === pendingTitle.toLowerCase()
      );
      if (!isDuplicate) {
        updatedJobTitles.push(pendingTitle);
        setPreferences((prev) => ({ ...prev, jobTitles: updatedJobTitles }));
        setCurrentTitleInput("");
      }
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Clear all errors and simulate save
    setErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage("Job preferences saved successfully!");
    }, 200);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header section */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Job Preferences
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Configure your target roles, work styles, salary expectations, and core tech stack to personalize your job search recommendations.
        </p>
      </header>

      {/* Success Notification Banner */}
      {successMessage && (
        <div
          id={statusMessageId}
          role="status"
          aria-live="polite"
          className="mb-6 flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-900 text-sm shadow-xs"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
          <div className="flex-1">
            <p className="font-medium">{successMessage}</p>
            <p className="text-emerald-700 text-xs mt-0.5">
              Your preferences will be used across match scoring and tailored generation.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSuccessMessage(null)}
            className="text-emerald-700 hover:text-emerald-900 p-1 rounded hover:bg-emerald-100 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            aria-label="Dismiss notification"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Main Settings Form */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-white border border-slate-200 rounded-xl shadow-xs p-6 space-y-8"
      >
        {/* SECTION 1: Target Job Titles */}
        <section aria-labelledby="job-titles-heading" className="space-y-3">
          <div>
            <h2 id="job-titles-heading" className="text-base font-semibold text-slate-900">
              Target Job Titles
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Add the specific job titles you are actively targeting.
            </p>
          </div>

          <div>
            <label
              htmlFor={jobTitleInputId}
              className="block text-xs font-medium text-slate-700 mb-1.5"
            >
              Job Title
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <input
                  ref={titleInputRef}
                  id={jobTitleInputId}
                  type="text"
                  value={currentTitleInput}
                  onChange={(e) => {
                    setCurrentTitleInput(e.target.value);
                    if (errors.jobTitleInput) {
                      setErrors((prev) => ({ ...prev, jobTitleInput: undefined }));
                    }
                  }}
                  onKeyDown={handleJobTitleKeyDown}
                  placeholder="e.g. Senior Frontend Engineer"
                  aria-describedby={errors.jobTitleInput ? jobTitleErrorId : undefined}
                  aria-invalid={!!errors.jobTitleInput}
                  className="w-full px-3.5 py-2 text-sm border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 bg-slate-50/50 focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600 focus:outline-none transition-colors"
                />
              </div>
              <button
                type="button"
                onClick={handleAddJobTitle}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 border border-slate-300 rounded-lg transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none"
                aria-label="Add job title to target list"
              >
                <Plus className="w-4 h-4" aria-hidden="true" />
                <span>Add Title</span>
              </button>
            </div>
          </div>

          {/* Validation error for job title input */}
          {errors.jobTitleInput && (
            <p
              id={jobTitleErrorId}
              role="alert"
              className="flex items-center gap-1.5 text-xs font-medium text-red-600 mt-1"
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
              <span>{errors.jobTitleInput}</span>
            </p>
          )}

          {/* Removable Tags List */}
          <div className="pt-1">
            <span className="block text-xs font-medium text-slate-600 mb-1.5">
              Selected Titles ({preferences.jobTitles.length})
            </span>
            {preferences.jobTitles.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No target job titles added yet.</p>
            ) : (
              <ul
                className="flex flex-wrap gap-2"
                aria-label="Selected target job titles"
              >
                {preferences.jobTitles.map((title) => (
                  <li key={title} className="inline-flex">
                    <span className="inline-flex items-center gap-1.5 pl-3 pr-1.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                      <span>{title}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveJobTitle(title)}
                        aria-label={`Remove job title: ${title}`}
                        className="p-0.5 rounded-full text-blue-600 hover:text-blue-900 hover:bg-blue-200 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:outline-none transition-colors"
                      >
                        <X className="w-3.5 h-3.5" aria-hidden="true" />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* SECTION 2: Preferred Work Modes */}
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-slate-900">
            Preferred Work Modes
          </legend>
          <p className="text-xs text-slate-500">
            Select all workplace arrangements you are open to considering.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            {WORK_MODES.map((mode) => {
              const isChecked = preferences.workModes.includes(mode.id);
              const checkboxId = `workmode-${mode.id}`;

              return (
                <label
                  key={mode.id}
                  htmlFor={checkboxId}
                  className={`relative flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer select-none transition-all focus-within:ring-2 focus-within:ring-blue-600 ${
                    isChecked
                      ? "bg-blue-50/70 border-blue-500 text-blue-950 ring-1 ring-blue-500/20"
                      : "bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center h-5">
                    <input
                      id={checkboxId}
                      name="workModes"
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleWorkModeToggle(mode.id)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div className="text-xs">
                    <span className="font-semibold text-slate-900 block">
                      {mode.label}
                    </span>
                    <span className="text-slate-500 mt-0.5 block">
                      {mode.description}
                    </span>
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>

        <hr className="border-slate-200" />

        {/* SECTION 3: Minimum Salary */}
        <section aria-labelledby="salary-heading" className="space-y-3">
          <div>
            <h2 id="salary-heading" className="text-base font-semibold text-slate-900">
              Minimum Annual Salary
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Specify your baseline compensation threshold in USD.
            </p>
          </div>

          <div className="max-w-xs space-y-1">
            <label
              htmlFor={minSalaryInputId}
              className="block text-xs font-medium text-slate-700"
            >
              Salary Amount ($ USD)
            </label>
            <div className="relative rounded-lg shadow-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500 text-sm font-medium">
                $
              </div>
              <input
                id={minSalaryInputId}
                type="number"
                min="0"
                step="1000"
                value={preferences.minSalary}
                onChange={handleSalaryChange}
                placeholder="100000"
                aria-describedby={errors.minSalary ? minSalaryErrorId : undefined}
                aria-invalid={!!errors.minSalary}
                className={`w-full pl-7 pr-3.5 py-2 text-sm border rounded-lg text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none transition-colors ${
                  errors.minSalary
                    ? "border-red-500 focus:border-red-600 focus:ring-2 focus:ring-red-600 bg-red-50/20"
                    : "border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-600"
                }`}
              />
            </div>

            {/* Validation error for minimum salary */}
            {errors.minSalary && (
              <p
                id={minSalaryErrorId}
                role="alert"
                className="flex items-center gap-1.5 text-xs font-medium text-red-600 pt-1"
              >
                <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span>{errors.minSalary}</span>
              </p>
            )}
          </div>
        </section>

        <hr className="border-slate-200" />

        {/* SECTION 4: Preferred Technologies */}
        <fieldset className="space-y-3">
          <legend className="text-base font-semibold text-slate-900">
            Preferred Technologies
          </legend>
          <p className="text-xs text-slate-500">
            Choose the core frontend technologies and frameworks you prefer working with.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-1">
            {TECHNOLOGIES.map((tech) => {
              const isChecked = preferences.technologies.includes(tech);
              const techId = `tech-${tech.toLowerCase().replace(/[^a-z0-9]/g, "-")}`;

              return (
                <label
                  key={tech}
                  htmlFor={techId}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium border cursor-pointer select-none transition-all focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-1 ${
                    isChecked
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  <input
                    id={techId}
                    name="technologies"
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleTechToggle(tech)}
                    className="sr-only"
                  />
                  {isChecked && <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />}
                  <span>{tech}</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* SECTION 5: Form Action / Submit Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
          <p className="text-xs text-slate-500 order-2 sm:order-1 text-center sm:text-left">
            Preferences will be stored locally in this session.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold rounded-lg shadow-xs hover:shadow transition-all disabled:opacity-50 disabled:cursor-not-allowed order-1 sm:order-2 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {isSubmitting ? "Saving..." : "Save Preferences"}
          </button>
        </div>
      </form>
    </div>
  );
}
