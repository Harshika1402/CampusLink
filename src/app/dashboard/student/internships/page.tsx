"use client";

import React, { useState } from "react";
import {
  Compass,
  MapPin,
  Calendar,
  Clock,
  Briefcase,
  CheckCircle2,
  DollarSign,
  Search,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function StudentInternshipsPage() {
  const { internships, applyToInternship } = usePlacementStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedIds, setAppliedIds] = useState<string[]>([]);

  const filtered = internships.filter(
    (item) =>
      item.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.roleTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleApply = (id: string) => {
    applyToInternship(id);
    setAppliedIds([...appliedIds, id]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Campus Internship Cell
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Pre-final and final-year institutional industry internships with stipend benchmarking
          </p>
        </div>

        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-sage" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search internships..."
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink placeholder:text-muted-sage"
          />
        </div>
      </div>

      {/* Internships Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isApplied = appliedIds.includes(item.id);

          return (
            <div
              key={item.id}
              className="bg-white border border-stone-border rounded-[8px] p-5 flex flex-col justify-between hover:border-muted-sage transition-all shadow-2xs"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-muted-sage">
                      {item.companyName}
                    </span>
                    <h3 className="text-sm font-semibold text-primary-ink font-sans mt-0.5">
                      {item.roleTitle}
                    </h3>
                  </div>

                  <span className="text-xs font-bold text-deep-forest font-sans">
                    ₹{item.stipendMonthly.toLocaleString("en-IN")}/mo
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2 text-[11px] text-muted-sage">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-deep-forest" /> {item.duration}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-deep-forest" /> {item.location} ({item.type})
                  </span>
                </div>

                <p className="text-xs text-ink-muted mt-3 line-clamp-3 leading-relaxed">
                  {item.description}
                </p>

                {/* Skills tags */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {item.requiredSkills.map((sk, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-[4px] text-[10px] font-medium bg-stone-light text-ink-muted border border-stone-border"
                    >
                      {sk}
                    </span>
                  ))}
                </div>

                <div className="mt-3 pt-2.5 border-t border-stone-border/60 text-[11px] text-muted-sage">
                  Eligibility: <strong className="text-primary-ink">{item.eligibilitySummary}</strong>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-stone-border/70 flex items-center justify-between">
                <span className="text-[10px] text-brand-error font-medium">
                  Deadline: {formatDate(item.applicationDeadline)}
                </span>

                {isApplied ? (
                  <span className="px-3 py-1 bg-forest-subtle text-deep-forest border border-forest-border rounded-[4px] text-xs font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Applied
                  </span>
                ) : (
                  <Button size="sm" variant="primary" onClick={() => handleApply(item.id)}>
                    Apply for Internship
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
