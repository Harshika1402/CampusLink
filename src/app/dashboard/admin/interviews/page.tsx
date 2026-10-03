"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Video,
  UserCheck,
  Search,
  ExternalLink,
} from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { DataTable, Column } from "@/components/ui/DataTable";
import { InterviewSchedule } from "@/types";
import { formatDateTime } from "@/lib/utils";

export default function AdminInterviewsPage() {
  const { interviews } = usePlacementStore();

  const columns: Column<InterviewSchedule & Record<string, unknown>>[] = [
    {
      key: "scheduledAt",
      header: "Scheduled Time",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-primary-ink text-xs whitespace-nowrap">
          {formatDateTime(item.scheduledAt)}
        </span>
      ),
    },
    {
      key: "studentName",
      header: "Candidate",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.studentName}</span>
          <span className="text-[11px] text-muted-sage">{item.companyName}</span>
        </div>
      ),
    },
    {
      key: "roundName",
      header: "Evaluation Round",
      sortable: true,
      render: (item) => (
        <span className="text-xs font-medium text-deep-forest">{item.roundName}</span>
      ),
    },
    {
      key: "interviewerName",
      header: "Interviewer / Panel",
      render: (item) => <span className="text-xs text-ink-muted">{item.interviewerName}</span>,
    },
    {
      key: "mode",
      header: "Mode & Venue",
      render: (item) => (
        <div className="text-[11px]">
          <span className="font-semibold text-primary-ink">{item.mode}</span>
          <div className="text-muted-sage truncate max-w-[200px]">
            {item.locationOrLink.startsWith("http") ? (
              <a
                href={item.locationOrLink}
                target="_blank"
                rel="noreferrer"
                className="text-deep-forest underline inline-flex items-center gap-1"
              >
                Virtual Room <ExternalLink className="w-2.5 h-2.5" />
              </a>
            ) : (
              item.locationOrLink
            )}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      sortable: true,
      render: (item) => (
        <span className="px-2 py-0.5 rounded-[4px] bg-forest-subtle text-deep-forest border border-forest-border text-[11px] font-semibold">
          {item.status}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Institutional Interview Schedules
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Active technical interviews, corporate panel appointments, and campus evaluation rooms
        </p>
      </div>

      <DataTable
        title="Campus Interview Timetable"
        subtitle="Manage virtual video rooms, on-campus interview blocks, and panel allocations"
        data={interviews as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Campus_Interview_Schedules"
      />
    </div>
  );
}
