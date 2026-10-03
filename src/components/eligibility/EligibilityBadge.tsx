import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface EligibilityBadgeProps {
  isEligible: boolean;
  score?: number;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
}

export function EligibilityBadge({
  isEligible,
  score,
  size = "md",
  onClick,
  className,
}: EligibilityBadgeProps) {
  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3.5 py-1.5 text-sm gap-2 font-semibold",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={cn(
        "inline-flex items-center font-medium rounded-[4px] border transition-colors select-none",
        isEligible
          ? "bg-success-subtle text-brand-success border-success-border hover:bg-success-subtle/80"
          : "bg-error-subtle text-brand-error border-error-border hover:bg-error-subtle/80",
        sizeStyles[size],
        onClick && "cursor-pointer focus:outline-hidden hover:shadow-2xs",
        className
      )}
    >
      {isEligible ? (
        <CheckCircle2 className={cn("shrink-0", iconSizes[size])} />
      ) : (
        <XCircle className={cn("shrink-0", iconSizes[size])} />
      )}
      <span>{isEligible ? "ELIGIBLE" : "NOT ELIGIBLE"}</span>
      {typeof score === "number" && (
        <span
          className={cn(
            "ml-0.5 px-1 py-0.2 rounded-xs text-[10px] font-bold",
            isEligible ? "bg-brand-success/15" : "bg-brand-error/15"
          )}
        >
          {score}% FIT
        </span>
      )}
    </button>
  );
}
