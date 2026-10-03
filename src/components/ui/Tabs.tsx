import React from "react";
import { cn } from "@/lib/utils";

interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

interface TabsProps {
  tabs: TabItem[];
  activeTab: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onChange, className }: TabsProps) {
  return (
    <div className={cn("border-b border-stone-border flex gap-1 overflow-x-auto", className)}>
      {tabs.map((tab) => {
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-2.5 text-xs sm:text-sm font-medium tracking-tight whitespace-nowrap transition-colors border-b-2 flex items-center gap-2 cursor-pointer focus:outline-hidden",
              isActive
                ? "border-deep-forest text-deep-forest font-semibold"
                : "border-transparent text-ink-muted hover:text-primary-ink hover:border-stone-border"
            )}
          >
            {tab.icon && <span className="w-4 h-4">{tab.icon}</span>}
            <span>{tab.label}</span>
            {typeof tab.count === "number" && (
              <span
                className={cn(
                  "px-1.5 py-0.2 rounded-full text-[10px] font-semibold",
                  isActive
                    ? "bg-forest-subtle text-deep-forest"
                    : "bg-stone-light text-muted-sage"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
