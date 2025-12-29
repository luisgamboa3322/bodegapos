"use client";

import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Sidebar } from "@/components/layout/sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { sidebarOpen } = useAppStore();

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main
        className={cn(
          "min-h-screen transition-all duration-300",
          sidebarOpen ? "lg:pl-64" : "lg:pl-20"
        )}
      >
        {/* Padding top para el botón hamburguesa en móvil */}
        <div className="container mx-auto p-4 lg:p-6 pt-16 lg:pt-6">
          {children}
        </div>
      </main>
    </div>
  );
}
