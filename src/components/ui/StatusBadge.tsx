import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

export function StatusBadge({ status, size = "md", className, dot = true }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  let styles = "bg-stone-light text-ink-muted border-stone-border";
  let dotColor = "bg-muted-sage";

  if (
    normalized.includes("open") ||
    normalized.includes("selected") ||
    normalized.includes("eligible") ||
    normalized.includes("published") ||
    normalized.includes("completed") ||
    normalized.includes("active")
  ) {
    styles = "bg-success-subtle text-brand-success border-success-border";
    dotColor = "bg-brand-success";
  } else if (
    normalized.includes("not eligible") ||
    normalized.includes("rejected") ||
    normalized.includes("cancelled") ||
    normalized.includes("closed")
  ) {
    styles = "bg-error-subtle text-brand-error border-error-border";
    dotColor = "bg-brand-error";
  } else if (
    normalized.includes("shortlist") ||
    normalized.includes("interview") ||
    normalized.includes("assessment") ||
    normalized.includes("under review")
  ) {
    styles = "bg-brass-subtle text-antique-brass border-brass-border";
    dotColor = "bg-antique-brass";
  } else if (normalized.includes("draft") || normalized.includes("applied")) {
    styles = "bg-forest-subtle text-deep-forest border-forest-border";
    dotColor = "bg-deep-forest";
  }

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] font-medium tracking-tight",
    md: "px-2.5 py-1 text-xs font-medium tracking-tight",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-[4px] border font-sans select-none whitespace-nowrap",
        styles,
        sizeClasses[size],
        className
      )}
    >
      {dot && <span className={cn("w-1.5 h-1.5 rounded-full shrink-0", dotColor)} />}
      <span>{status}</span>
    </span>
  );
}
