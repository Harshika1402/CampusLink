"use client";

import React, { useState } from "react";
import { Award, Plus, Users, Clock } from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { MockDrive } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { Button } from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";

export default function AdminMockDrivesPage() {
  const { mockDrives } = usePlacementStore();

  const columns: Column<MockDrive & Record<string, unknown>>[] = [
    {
      key: "title",
      header: "Simulation Drive Title",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.title}</span>
          <span className="text-[11px] text-muted-sage line-clamp-1">{item.description}</span>
        </div>
      ),
    },
    {
      key: "durationMinutes",
      header: "Test Duration",
      render: (item) => (
        <span className="text-xs text-ink-muted">{item.durationMinutes} Minutes ({item.totalMarks} Marks)</span>
      ),
    },
    {
      key: "registeredCount",
      header: "Participation",
      sortable: true,
      render: (item) => (
        <span className="font-semibold text-deep-forest">
          {item.completedCount} / {item.registeredCount} Completed
        </span>
      ),
    },
    {
      key: "scheduledAt",
      header: "Scheduled For",
      sortable: true,
      render: (item) => formatDate(item.scheduledAt),
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
            Mock Placement Drive Administration
          </h1>
          <p className="text-xs text-muted-sage mt-0.5">
            Institutional recruitment simulations, proctored aptitude exams, and diagnostic performance indices
          </p>
        </div>
      </div>

      <DataTable
        title="Mock Recruitment Simulation Drives"
        subtitle="Schedule university-wide mock tests, aptitude batteries, and technical simulations"
        data={mockDrives as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Mock_Drives_Master"
      />
    </div>
  );
}
