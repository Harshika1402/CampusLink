"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Search,
  User,
  ChevronDown,
  Layers,
  LogOut,
  ExternalLink,
  RotateCcw,
} from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { usePlacementStore } from "@/lib/store";
import { RoleSwitcherModal } from "./RoleSwitcherModal";
import { formatDateTime, cn } from "@/lib/utils";

interface NavbarProps {
  onToggleSidebar?: () => void;
  showSidebarToggle?: boolean;
}

export function Navbar({ onToggleSidebar, showSidebarToggle = true }: NavbarProps) {
  const pathname = usePathname();
  const {
    currentUser,
    currentRole,
    notifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    resetToDefaultData,
  } = usePlacementStore();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const roleLabels: Record<string, string> = {
    STUDENT: "Student",
    PLACEMENT_ADMIN: "Admin",
    PLACEMENT_OFFICER: "Officer",
    RECRUITER: "Recruiter",
    ALUMNI: "Alumni",
    INTERNSHIP_COORDINATOR: "Coordinator",
  };

  return (
    <>
      <header className="h-16 shrink-0 bg-white border-b border-stone-border sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
        {/* Left Section: Logo & Toggle */}
        <div className="flex items-center gap-4">
          {showSidebarToggle && onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-[4px] border border-stone-border text-ink-muted hover:bg-stone-light focus:outline-hidden"
              aria-label="Toggle Navigation"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          )}

          <Logo href="/dashboard" />

          {/* Quick Institutional Breadcrumb or Section indicator */}
          <div className="hidden md:flex items-center gap-2 pl-4 border-l border-stone-border/80 text-xs">
            <span className="font-semibold text-deep-forest uppercase tracking-wider text-[11px]">
              {roleLabels[currentRole] || "Portal"}
            </span>
            <span className="text-stone-border">•</span>
            <span className="text-muted-sage truncate max-w-[200px]">
              {pathname === "/dashboard"
                ? "Overview"
                : pathname.split("/").filter(Boolean).slice(-1)[0]?.replace("-", " ") || "Portal"}
            </span>
          </div>
        </div>

        {/* Center: Global Search Bar */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-sage" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search placement drives, companies, roles, roll numbers..."
              className="w-full pl-8.5 pr-4 py-1.5 text-xs bg-stone-light/40 border border-stone-border rounded-[6px] focus:outline-hidden focus:border-deep-forest focus:bg-white text-primary-ink placeholder:text-muted-sage/70 transition-all"
            />
          </div>
        </div>

        {/* Right Section: Persona Switcher, Notifications & Profile */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Role Switcher Pill */}
          <button
            onClick={() => setIsRoleModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-[5px] bg-forest-subtle text-deep-forest border border-forest-border hover:bg-forest-border/40 transition-colors cursor-pointer"
            title="Switch Persona / Role"
          >
            <Layers className="w-3.5 h-3.5 text-deep-forest" />
            <span className="hidden sm:inline">Role:</span>
            <span className="underline decoration-dotted underline-offset-2">
              {roleLabels[currentRole]}
            </span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {/* Notifications Center */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-[5px] text-ink-muted hover:text-primary-ink hover:bg-stone-light/60 transition-colors relative cursor-pointer"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-antique-brass text-white text-[10px] font-bold flex items-center justify-center leading-none">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown Panel */}
            {isNotifOpen && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-stone-border rounded-[8px] shadow-lg z-50 overflow-hidden text-primary-ink animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="p-3 bg-ivory-light border-b border-stone-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-primary-ink">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="text-[10px] font-bold px-1.5 py-0.2 rounded-full bg-antique-brass text-white">
                        {unreadCount} new
                      </span>
                    )}
                  </div>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllNotificationsAsRead}
                      className="text-[11px] text-deep-forest hover:underline cursor-pointer"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-stone-border/60">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-muted-sage">
                      No notifications at this time
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={cn(
                          "p-3 text-xs hover:bg-stone-light/30 transition-colors cursor-pointer",
                          !n.isRead && "bg-forest-subtle/30"
                        )}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span
                            className={cn(
                              "font-semibold text-xs",
                              !n.isRead ? "text-deep-forest" : "text-primary-ink"
                            )}
                          >
                            {n.title}
                          </span>
                          {!n.isRead && (
                            <span className="w-1.5 h-1.5 rounded-full bg-antique-brass shrink-0 mt-1" />
                          )}
                        </div>
                        <p className="text-[11px] text-ink-muted mt-1 leading-snug">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-muted-sage block mt-1.5">
                          {formatDateTime(n.createdAt)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 pl-2 pr-1.5 py-1 rounded-[5px] hover:bg-stone-light/60 transition-colors border border-transparent hover:border-stone-border cursor-pointer"
            >
              <div className="w-7 h-7 rounded-[4px] bg-deep-forest text-warm-ivory flex items-center justify-center text-xs font-semibold">
                {currentUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)}
              </div>
              <div className="hidden sm:flex flex-col items-start leading-none">
                <span className="text-xs font-semibold text-primary-ink line-clamp-1">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-muted-sage mt-0.5">
                  {roleLabels[currentRole]}
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted-sage" />
            </button>

            {/* Profile Dropdown */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-stone-border rounded-[8px] shadow-lg z-50 py-1 text-xs">
                <div className="px-3.5 py-2.5 border-b border-stone-border/80">
                  <div className="font-semibold text-primary-ink">{currentUser.name}</div>
                  <div className="text-[11px] text-muted-sage truncate">{currentUser.email}</div>
                  <div className="text-[10px] text-deep-forest font-semibold mt-1 uppercase tracking-wider">
                    {currentUser.department || "Placement Department"}
                  </div>
                </div>

                <div className="py-1">
                  <Link
                    href="/dashboard/student/profile"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-3.5 py-2 text-ink-muted hover:text-primary-ink hover:bg-stone-light/50 flex items-center gap-2"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>My Profile</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      setIsRoleModalOpen(true);
                    }}
                    className="w-full text-left px-3.5 py-2 text-ink-muted hover:text-primary-ink hover:bg-stone-light/50 flex items-center gap-2 cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Switch Role / Persona</span>
                  </button>
                  <Link
                    href="/"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-3.5 py-2 text-ink-muted hover:text-primary-ink hover:bg-stone-light/50 flex items-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Public Landing Page</span>
                  </Link>
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      if (confirm("Reset portal to default enterprise dataset?")) {
                        resetToDefaultData();
                      }
                    }}
                    className="w-full text-left px-3.5 py-2 text-antique-brass hover:bg-brass-subtle/50 flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Demo Data</span>
                  </button>
                </div>

                <div className="border-t border-stone-border/80 pt-1">
                  <Link
                    href="/"
                    onClick={() => setIsUserMenuOpen(false)}
                    className="px-3.5 py-2 text-brand-error hover:bg-error-subtle/50 flex items-center gap-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Global Role Switcher Modal */}
      <RoleSwitcherModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </>
  );
}
