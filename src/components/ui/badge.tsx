import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "danger" | "brand";
  size?: "sm" | "md";
  onRemove?: () => void;
  removeAriaLabel?: string;
}

export function Badge({
  className,
  variant = "default",
  size = "md",
  children,
  onRemove,
  removeAriaLabel = "Remove item",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900",
    secondary: "bg-neutral-100 text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700",
    outline: "border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 bg-transparent",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800",
    danger: "bg-red-50 text-red-800 border border-red-200 dark:bg-red-950/50 dark:text-red-300 dark:border-red-800",
    brand: "bg-sky-50 text-sky-800 border border-sky-200 dark:bg-sky-950/50 dark:text-sky-300 dark:border-sky-800",
  };

  const sizeStyles = {
    sm: "text-xs px-2 py-0.5 rounded-md gap-1",
    md: "text-xs px-2.5 py-1 rounded-md gap-1.5",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center font-medium transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          aria-label={removeAriaLabel}
          className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/20 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-current cursor-pointer"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </span>
  );
}
