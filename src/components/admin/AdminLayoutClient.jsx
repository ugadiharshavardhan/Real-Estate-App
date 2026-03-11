"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import PageWrapper from "@/components/PageWrapper";
import { Menu } from "lucide-react";

export default function AdminLayoutClient({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Sidebar - Fixed on desktop, Drawer on mobile */}
      <AdminSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 lg:pl-64">
        {/* Top Header */}
        <header className="h-16 md:h-20 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 md:px-10 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-[#1B4332] hover:bg-gray-50 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-gray-400 text-[10px] sm:text-xs md:text-sm font-inter truncate max-w-[150px] sm:max-w-none">
                Welcome back, Administrator
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-6">
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[9px] sm:text-xs font-bold text-[#1B4332] uppercase tracking-tighter">
                Live Monitor
              </span>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] sm:text-[10px] text-gray-400 font-medium">
                  Online
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-4 sm:p-6 md:p-10">
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
      </main>
    </div>
  );
}
