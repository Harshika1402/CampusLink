"use client";

import React, { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { PlacementStoreProvider, usePlacementStore } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

function RoleRouteSync() {
  const router = useRouter();
  const pathname = usePathname();
  const { currentRole } = usePlacementStore();

  useEffect(() => {
    // If student attempts to view admin pages, auto-route to student
    if (currentRole === "STUDENT" && pathname.startsWith("/dashboard/admin")) {
      router.replace("/dashboard/student");
    }
    // If admin attempts to view student root, auto-route to admin
    else if (
      (currentRole === "PLACEMENT_ADMIN" || currentRole === "PLACEMENT_OFFICER") &&
      pathname === "/dashboard/student"
    ) {
      router.replace("/dashboard/admin");
    }
  }, [currentRole, pathname, router]);

  return null;
}

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PlacementStoreProvider>
      <RoleRouteSync />
      <div className="h-screen h-dvh bg-warm-ivory flex flex-col overflow-hidden font-sans">
        <Navbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <div className="flex-1 flex min-h-0 min-w-0 overflow-hidden">
          <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main className="flex-1 min-w-0 min-h-0 h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6 pb-12">{children}</div>
          </main>
        </div>
      </div>
    </PlacementStoreProvider>
  );
}
