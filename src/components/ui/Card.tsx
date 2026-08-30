import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: "div" | "article" | "section";
  hoverable?: boolean;
}

export function Card({
  as: Component = "div",
  children,
  className,
  hoverable = false,
  ...props
}: CardProps) {
  return (
    <Component
      className={cn(
        "rounded-xl border border-slate-200 bg-white p-6 shadow-xs",
        hoverable &&
          "transition-all duration-200 hover:border-slate-300 hover:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("space-y-1.5 mb-4", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
  as: Heading = "h3",
  ...props
}: React.HTMLAttributes<HTMLHeadingElement> & {
  as?: "h2" | "h3" | "h4";
}) {
  return (
    <Heading
      className={cn("text-xl font-semibold tracking-tight text-slate-900", className)}
      {...props}
    >
      {children}
    </Heading>
  );
}

export function CardDescription({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-slate-600 leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("text-slate-700", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("mt-6 pt-4 border-t border-slate-100 flex items-center gap-3", className)} {...props}>
      {children}
    </div>
  );
}
