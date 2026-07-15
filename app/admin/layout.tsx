"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Topbar } from "@/components/admin/Topbar";
import { AdminProvider } from "@/components/admin/AdminProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();



  return (
    <AdminProvider>
      <div className="min-h-screen bg-background flex flex-col lg:flex-row">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        
        <div className="flex-1 flex flex-col min-w-0 lg:ml-20 transition-all duration-300">
          <Topbar onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
            {children}
          </main>
        </div>
      </div>
    </AdminProvider>
  );
}
