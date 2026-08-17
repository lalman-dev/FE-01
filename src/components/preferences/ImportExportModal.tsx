"use client";

import * as React from "react";
import { Copy, Download, Upload, Check, AlertCircle, X, FileJson } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

interface ImportExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportJson: () => string;
  importJson: (json: string) => { success: boolean; error?: string };
}

export function ImportExportModal({
  isOpen,
  onClose,
  exportJson,
  importJson,
}: ImportExportModalProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = React.useState<"export" | "import">("export");
  const [importInput, setImportInput] = React.useState("");
  const [importError, setImportError] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState(false);

  const jsonString = React.useMemo(() => {
    return isOpen ? exportJson() : "";
  }, [isOpen, exportJson]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      toast({
        type: "success",
        title: "Copied to Clipboard",
        description: "Your job preferences JSON has been copied.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({
        type: "error",
        title: "Failed to copy",
        description: "Clipboard access was denied by your browser.",
      });
    }
  };

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `applypilot-preferences-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      type: "success",
      title: "File Downloaded",
      description: "Saved preferences JSON backup to your downloads folder.",
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setImportInput(content);
      setImportError(null);
    };
    reader.readAsText(file);
  };

  const handleApplyImport = () => {
    if (!importInput.trim()) {
      setImportError("Please paste or upload JSON content to import.");
      return;
    }

    const result = importJson(importInput);
    if (result.success) {
      toast({
        type: "success",
        title: "Preferences Imported",
        description: "Successfully loaded and saved preferences from JSON.",
      });
      onClose();
    } else {
      setImportError(result.error || "Failed to validate JSON configuration.");
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150"
    >
      <div className="relative w-full max-w-2xl rounded-2xl border border-neutral-200 bg-white shadow-2xl dark:border-neutral-800 dark:bg-neutral-900 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-neutral-100 p-5 dark:border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100">
              <FileJson className="h-5 w-5" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                Sync & Backup Preferences
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Export your configuration for portability or import settings from another instance.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-lg p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700 dark:hover:bg-neutral-800 dark:hover:text-neutral-200 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-100 bg-neutral-50/50 px-5 pt-3 dark:border-neutral-800 dark:bg-neutral-900/30">
          <button
            type="button"
            onClick={() => {
              setActiveTab("export");
              setImportError(null);
            }}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "export"
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            Export Configuration
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("import");
              setImportError(null);
            }}
            className={`pb-2.5 px-3 text-xs font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === "import"
                ? "border-neutral-900 text-neutral-900 dark:border-neutral-100 dark:text-neutral-100"
                : "border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
            }`}
          >
            Import JSON
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 flex-1 overflow-y-auto">
          {activeTab === "export" ? (
            <div className="space-y-4">
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Current validated JSON schema representation of your job preferences and AI directives:
              </p>
              <pre className="max-h-72 overflow-auto rounded-lg bg-neutral-950 p-3.5 text-xs text-emerald-400 font-mono leading-relaxed select-all">
                {jsonString}
              </pre>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  Paste JSON schema below or select a file to restore preferences:
                </p>
                <label className="inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white cursor-pointer underline">
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload .json</span>
                  <input type="file" accept=".json" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

              <textarea
                rows={10}
                value={importInput}
                onChange={(e) => {
                  setImportInput(e.target.value);
                  setImportError(null);
                }}
                placeholder='Paste your {"roleTitles": [...], "salary": {...}} JSON here...'
                className="w-full rounded-lg border border-neutral-300 bg-neutral-50 p-3 text-xs font-mono text-neutral-900 shadow-xs focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900 dark:border-neutral-700 dark:bg-neutral-950 dark:text-neutral-100"
              />

              {importError && (
                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{importError}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/50 p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>

          <div className="flex items-center gap-2">
            {activeTab === "export" ? (
              <>
                <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                  <span>{copied ? "Copied" : "Copy JSON"}</span>
                </Button>
                <Button type="button" variant="primary" size="sm" onClick={handleDownload}>
                  <Download className="h-3.5 w-3.5" />
                  <span>Download File</span>
                </Button>
              </>
            ) : (
              <Button type="button" variant="primary" size="sm" onClick={handleApplyImport}>
                <Upload className="h-3.5 w-3.5" />
                <span>Apply & Save</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
