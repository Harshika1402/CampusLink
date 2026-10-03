"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileCheck2,
  Calendar,
  Building2,
  ExternalLink,
  Clock,
  Briefcase,
  AlertCircle,
  FileText,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { ApplicationTimeline } from "@/components/applications/ApplicationTimeline";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function StudentApplicationsPage() {
  const { applications, currentStudent } = usePlacementStore();
  const [selectedAppId, setSelectedAppId] = useState<string | null>(
    applications[0]?.id || null
  );

  const selectedApp = applications.find((a) => a.id === selectedAppId);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            My Placement Applications
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Active candidate lifecycle pipelines, stage transitions, and interviewer feedback
          </p>
        </div>

        <Link href="/dashboard/student/drives">
          <Button variant="outline" size="sm" icon={<Briefcase className="w-3.5 h-3.5" />}>
            Browse More Drives
          </Button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <div className="p-12 text-center bg-white border border-stone-border rounded-[8px]">
          <FileCheck2 className="w-8 h-8 text-muted-sage mx-auto mb-2" />
          <h3 className="text-sm font-semibold text-primary-ink">No applications submitted yet</h3>
          <p className="text-xs text-muted-sage mt-1 max-w-sm mx-auto mb-4">
            You haven&apos;t applied to any active campus recruitment drives yet. Browse eligible drives to submit your candidacy.
          </p>
          <Link href="/dashboard/student/drives">
            <Button size="sm">Explore Eligible Drives</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Application Cards List */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-sage">
              Active Submissions ({applications.length})
            </h3>

            {applications.map((app) => {
              const isSelected = app.id === selectedAppId;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedAppId(app.id)}
                  className={`p-4 bg-white border rounded-[8px] transition-all cursor-pointer shadow-2xs ${
                    isSelected
                      ? "border-deep-forest ring-1 ring-deep-forest/40 bg-forest-subtle/20"
                      : "border-stone-border hover:border-muted-sage hover:bg-stone-light/30"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-primary-ink font-sans">
                        {app.drive?.companyName}
                      </h4>
                      <p className="text-xs text-ink-muted mt-0.5">{app.drive?.jobTitle}</p>
                    </div>
                    <StatusBadge status={app.status} size="sm" />
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-stone-border/60 flex items-center justify-between text-[11px] text-muted-sage">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-deep-forest" /> Current:{" "}
                      <strong className="text-primary-ink">{app.currentRound}</strong>
                    </span>
                    <span>Applied: {formatDate(app.appliedAt)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Interactive Timeline */}
          <div className="lg:col-span-7">
            {selectedApp ? (
              <div className="space-y-4">
                <ApplicationTimeline application={selectedApp} />

                {/* Candidate Credentials Verified with Application */}
                <div className="bg-white border border-stone-border rounded-[8px] p-4 text-xs space-y-2">
                  <h4 className="font-semibold text-primary-ink uppercase tracking-wider text-[11px] text-muted-sage">
                    Verified Application Credentials
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-ink-muted">
                    <div>
                      <span className="text-muted-sage block text-[10px]">Academic Record</span>
                      <strong className="text-primary-ink">{currentStudent.cgpa} CGPA (0 Backlogs)</strong>
                    </div>
                    <div>
                      <span className="text-muted-sage block text-[10px]">Degree Discipline</span>
                      <strong className="text-primary-ink">{currentStudent.branch}</strong>
                    </div>
                    <div>
                      <span className="text-muted-sage block text-[10px]">Verified Resume</span>
                      <a
                        href={currentStudent.resumeUrl || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="text-deep-forest underline inline-flex items-center gap-1 font-medium"
                      >
                        PDF Resume <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 text-center text-xs text-muted-sage bg-white border border-stone-border rounded-[8px]">
                Select an application to view lifecycle stages
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
