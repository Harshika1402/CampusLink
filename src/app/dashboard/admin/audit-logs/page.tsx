"use client";

import React, { useState } from "react";
import { History, ShieldCheck, Search, Download } from "lucide-react";
import { usePlacementStore } from "@/lib/store";
import { AuditLogEntry } from "@/types";
import { DataTable, Column } from "@/components/ui/DataTable";
import { formatDateTime } from "@/lib/utils";

export default function AdminAuditLogsPage() {
  const { auditLogs } = usePlacementStore();

  const columns: Column<AuditLogEntry & Record<string, unknown>>[] = [
    {
      key: "timestamp",
      header: "Timestamp",
      sortable: true,
      render: (item) => (
        <span className="font-mono text-[11px] text-muted-sage whitespace-nowrap">
          {formatDateTime(item.timestamp)}
        </span>
      ),
    },
    {
      key: "actorName",
      header: "Institutional Actor",
      sortable: true,
      render: (item) => (
        <div>
          <span className="font-semibold text-primary-ink block">{item.actorName}</span>
          <span className="text-[10px] text-deep-forest font-bold tracking-wider uppercase">
            {item.actorRole}
          </span>
        </div>
      ),
    },
    {
      key: "action",
      header: "Event Operation",
      sortable: true,
      render: (item) => (
        <span className="px-2 py-0.5 rounded-[4px] bg-stone-light text-primary-ink font-mono text-[10px] font-semibold border border-stone-border">
          {item.action}
        </span>
      ),
    },
    {
      key: "target",
      header: "Target Entity",
      render: (item) => (
        <div>
          <span className="text-[10px] uppercase font-bold text-muted-sage">{item.targetType}</span>
          <div className="font-medium text-primary-ink line-clamp-1">{item.targetTitle}</div>
        </div>
      ),
    },
    {
      key: "details",
      header: "Modification Details",
      render: (item) => (
        <p className="text-xs text-ink-muted leading-relaxed line-clamp-2">{item.details}</p>
      ),
    },
    {
      key: "ipAddress",
      header: "Network IP",
      render: (item) => (
        <span className="font-mono text-[10px] text-muted-sage">{item.ipAddress}</span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary-ink font-sans">
          Institutional Security &amp; Audit Logs
        </h1>
        <p className="text-xs text-muted-sage mt-0.5">
          Tamper-evident administrative event registry for placement operations, round updates, and credential audits
        </p>
      </div>

      <DataTable
        title="Administrative Event Audit Trail"
        subtitle="Chronological record of status mutations, drive publications, and security access"
        data={auditLogs as any}
        columns={columns as any}
        keyField="id"
        exportFilename="Placement_Security_Audit_Log"
        pageSize={12}
      />
    </div>
  );
}
