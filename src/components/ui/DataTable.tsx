"use client";

import React, { useState, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowUpDown,
  Search,
} from "lucide-react";
import { Button } from "./Button";
import { exportToCSV, cn } from "@/lib/utils";

export interface Column<T> {
  key: string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

interface DataTableProps<T extends Record<string, unknown>> {
  data: T[];
  columns: Column<T>[];
  keyField: keyof T;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  bulkActions?: (selectedIds: string[]) => React.ReactNode;
  exportFilename?: string;
  pageSize?: number;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  keyField,
  searchPlaceholder = "Search records...",
  searchFields,
  title,
  subtitle,
  actions,
  bulkActions,
  exportFilename = "placement_export",
  pageSize = 10,
  emptyTitle = "No records found",
  emptyDescription = "Try adjusting your filters or search terms.",
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Filter by search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();

    return data.filter((item) => {
      if (searchFields && searchFields.length > 0) {
        return searchFields.some((field) => {
          const val = item[field];
          return val !== undefined && val !== null && String(val).toLowerCase().includes(term);
        });
      }
      return Object.values(item).some((val) =>
        val !== undefined && val !== null && String(val).toLowerCase().includes(term)
      );
    });
  }, [data, searchTerm, searchFields]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];

      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;

      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }

      const aStr = String(aVal).toLowerCase();
      const bStr = String(bVal).toLowerCase();
      if (aStr < bStr) return sortDirection === "asc" ? -1 : 1;
      if (aStr > bStr) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") setSortDirection("desc");
      else {
        setSortKey(null);
        setSortDirection("asc");
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allIds = paginatedData.map((d) => String(d[keyField]));
      setSelectedIds(allIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    exportToCSV(data, exportFilename);
  };

  return (
    <div className="bg-white border border-stone-border rounded-[8px] overflow-hidden shadow-2xs">
      {/* Table Header Controls */}
      <div className="p-4 border-b border-stone-border/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-ivory-light/40">
        <div>
          {title && (
            <h3 className="text-sm font-semibold tracking-tight text-primary-ink font-sans">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-xs text-muted-sage font-normal mt-0.5">{subtitle}</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Search Input */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-sage" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-white border border-stone-border rounded-[5px] focus:outline-hidden focus:border-deep-forest text-primary-ink placeholder:text-muted-sage/70"
            />
          </div>

          {/* Export to CSV */}
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            icon={<Download className="w-3.5 h-3.5" />}
          >
            Export
          </Button>

          {/* Additional Action Buttons */}
          {actions}
        </div>
      </div>

      {/* Bulk Action Bar (when rows are selected) */}
      {selectedIds.length > 0 && bulkActions && (
        <div className="px-4 py-2 bg-brass-subtle/60 border-b border-antique-brass/30 flex items-center justify-between text-xs text-primary-ink">
          <span className="font-medium text-antique-brass">
            {selectedIds.length} row{selectedIds.length === 1 ? "" : "s"} selected
          </span>
          <div className="flex items-center gap-2">{bulkActions(selectedIds)}</div>
        </div>
      )}

      {/* Table Element */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-light/50 border-b border-stone-border text-ink-muted">
              {bulkActions && (
                <th className="py-2.5 px-4 w-10">
                  <input
                    type="checkbox"
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((d) => selectedIds.includes(String(d[keyField])))
                    }
                    onChange={handleSelectAll}
                    className="rounded-xs border-stone-border accent-deep-forest cursor-pointer"
                  />
                </th>
              )}
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => col.sortable && handleSort(col.key)}
                  className={cn(
                    "py-2.5 px-4 font-semibold uppercase tracking-wider text-[11px] text-muted-sage select-none whitespace-nowrap",
                    col.sortable && "cursor-pointer hover:text-primary-ink",
                    col.className
                  )}
                >
                  <div className="inline-flex items-center gap-1.5">
                    <span>{col.header}</span>
                    {col.sortable && (
                      <ArrowUpDown
                        className={cn(
                          "w-3 h-3 transition-opacity",
                          sortKey === col.key ? "opacity-100 text-deep-forest" : "opacity-30"
                        )}
                      />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-border/60">
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (bulkActions ? 1 : 0)}
                  className="py-12 text-center text-muted-sage"
                >
                  <div className="flex flex-col items-center">
                    <p className="font-medium text-primary-ink text-sm">{emptyTitle}</p>
                    <p className="text-xs text-muted-sage mt-1">{emptyDescription}</p>
                  </div>
                </td>
              </tr>
            ) : (
              paginatedData.map((item) => {
                const id = String(item[keyField]);
                const isSelected = selectedIds.includes(id);

                return (
                  <tr
                    key={id}
                    className={cn(
                      "hover:bg-ivory-light/70 transition-colors",
                      isSelected && "bg-brass-subtle/30"
                    )}
                  >
                    {bulkActions && (
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleSelectRow(id)}
                          className="rounded-xs border-stone-border accent-deep-forest cursor-pointer"
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={cn("py-3 px-4 text-primary-ink font-normal", col.className)}
                      >
                        {col.render ? col.render(item) : String(item[col.key] ?? "—")}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      <div className="p-3 border-t border-stone-border/80 flex items-center justify-between text-xs text-muted-sage bg-ivory-light/30">
        <div>
          Showing{" "}
          <span className="font-semibold text-primary-ink">
            {sortedData.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}
          </span>{" "}
          to{" "}
          <span className="font-semibold text-primary-ink">
            {Math.min(currentPage * pageSize, sortedData.length)}
          </span>{" "}
          of <span className="font-semibold text-primary-ink">{sortedData.length}</span> entries
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1 rounded-[4px] border border-stone-border disabled:opacity-40 disabled:pointer-events-none hover:bg-white text-primary-ink transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="font-medium text-primary-ink">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1 rounded-[4px] border border-stone-border disabled:opacity-40 disabled:pointer-events-none hover:bg-white text-primary-ink transition-colors cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
