import React from "react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3 mb-10",
        align === "center" && "text-center max-w-2xl mx-auto",
        className
      )}
      {...props}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
          {eyebrow}
        </p>
      )}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {description && (
        <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
