"use client";

import React, { useState } from "react";
import { PlacementStoreProvider } from "@/lib/store";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <PlacementStoreProvider>
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
