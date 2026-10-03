import React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  trend?: {
    value: string;
    positive?: boolean;
  };
  icon?: React.ReactNode;
  accent?: boolean;
  className?: string;
}

export function StatCard({
  label,
  value,
  subtext,
  trend,
  icon,
  accent = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "bg-white border border-stone-border/80 rounded-[8px] p-5 transition-all shadow-2xs hover:border-muted-sage/60",
        accent && "border-l-4 border-l-antique-brass",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
          {label}
        </span>
        {icon && (
          <div className="text-deep-forest/70 p-1.5 rounded-[4px] bg-stone-light/60">
            {icon}
          </div>
        )}
      </div>

      <div className="mt-2.5 flex items-baseline gap-2">
        <div className="text-2xl sm:text-3xl font-semibold tracking-tight text-primary-ink font-sans">
          {value}
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium inline-flex items-center",
              trend.positive ? "text-brand-success" : "text-brand-error"
            )}
          >
            {trend.positive ? "↑" : "↓"} {trend.value}
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-ink-muted/80 line-clamp-1">
          {subtext}
        </p>
      )}
    </div>
  );
}
