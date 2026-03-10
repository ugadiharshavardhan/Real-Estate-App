import AdminSidebar from "@/components/admin/AdminSidebar";
import PageWrapper from "@/components/PageWrapper";

export const metadata = {
  title: "Admin Dashboard | Ventrivo",
  description:
    "Administrative portal for managing Ventrivo projects and plots.",
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar - Fixed on desktop */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-10 sticky top-0 z-10">
          <div>
            <h2 className="text-gray-400 text-sm font-inter">
              Welcome back, Administrator
            </h2>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-[#1B4332] uppercase tracking-tighter">
                Live Monitor
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-gray-400 font-medium">
                  System Online
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-10">
          <PageWrapper>
            {children}
          </PageWrapper>
        </div>
      </main>
    </div>
  );
}
