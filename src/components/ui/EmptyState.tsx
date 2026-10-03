import React from "react";
import { FolderSearch } from "lucide-react";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 sm:p-12 text-center border border-dashed border-stone-border rounded-[8px] bg-ivory-light/60",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-stone-light flex items-center justify-center text-muted-sage mb-3">
        {icon || <FolderSearch className="w-6 h-6 stroke-[1.5]" />}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-primary-ink font-sans">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-muted-sage max-w-sm mt-1 mb-5">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="outline" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
