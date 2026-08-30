import React from "react";
import { WorkflowStage } from "@/data/portfolioData";
import { Badge } from "./Badge";
import { ArrowRight, CheckCircle2, UserCheck, Bot, Sparkles, ShieldCheck } from "lucide-react";

interface WorkflowVisualizerProps {
  stages: WorkflowStage[];
}

export function WorkflowVisualizer({ stages }: WorkflowVisualizerProps) {
  const getRoleBadgeVariant = (role: WorkflowStage["role"]) => {
    switch (role) {
      case "Human Lead":
        return "accent";
      case "AI Assisted":
        return "default";
      case "Collaborative":
        return "subtle";
      case "Human Verification":
        return "success";
      default:
        return "default";
    }
  };

  const getRoleIcon = (role: WorkflowStage["role"]) => {
    switch (role) {
      case "Human Lead":
        return <UserCheck className="w-3.5 h-3.5 mr-1" aria-hidden="true" />;
      case "AI Assisted":
        return <Bot className="w-3.5 h-3.5 mr-1" aria-hidden="true" />;
      case "Collaborative":
        return <Sparkles className="w-3.5 h-3.5 mr-1" aria-hidden="true" />;
      case "Human Verification":
        return <ShieldCheck className="w-3.5 h-3.5 mr-1" aria-hidden="true" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Flow summary bar */}
      <div className="hidden lg:flex items-center justify-between p-4 bg-slate-900 text-white rounded-xl text-xs font-mono">
        {stages.map((stage, idx) => (
          <React.Fragment key={stage.title}>
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 flex items-center justify-center font-bold text-[11px]">
                {stage.step}
              </span>
              <span className="font-semibold">{stage.title}</span>
            </div>
            {idx < stages.length - 1 && (
              <ArrowRight className="w-4 h-4 text-slate-500" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Responsive stage cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stages.map((stage) => (
          <article
            key={stage.title}
            className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors shadow-xs"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-400">
                  STAGE 0{stage.step}
                </span>
                <Badge variant={getRoleBadgeVariant(stage.role)}>
                  {getRoleIcon(stage.role)}
                  {stage.role}
                </Badge>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  {stage.title}
                  <span className="text-xs font-normal text-slate-500 font-sans">
                    — {stage.label}
                  </span>
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  {stage.description}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100">
              <div className="flex items-start gap-1.5 text-xs text-slate-500">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" aria-hidden="true" />
                <span>
                  <strong className="font-medium text-slate-700">Outcome:</strong>{" "}
                  {stage.deliverable}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
