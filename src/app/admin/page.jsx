import { Suspense } from "react";
import { getAdminStats } from "@/utils/actions/admin";
import { getEnquiries } from "@/utils/data/enquiries";
import {
  Building2,
  Map,
  MessageSquare,
  TrendingUp,
  Users,
  CheckCircle2,
  Clock,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";

async function DashboardStats() {
  const statsRes = await getAdminStats();
  const stats = statsRes.success
    ? statsRes.data
    : {
      totalProjects: 0,
      totalPlots: 0,
      soldPlots: 0,
      pendingEnquiries: 0,
      availablePlots: 0,
    };

  const statCards = [
    {
      name: "Total Projects",
      value: stats.totalProjects,
      icon: Building2,
      color: "bg-teal-50 text-teal-600",
      trend: "+2 this month",
    },
    {
      name: "Total Plots",
      value: stats.totalPlots,
      icon: Map,
      color: "bg-purple-50 text-purple-600",
      trend: "Across all ventures",
    },
    {
      name: "Available Plots",
      value: stats.availablePlots,
      icon: CheckCircle2,
      color: "bg-green-50 text-green-600",
      trend: `${((stats.availablePlots / stats.totalPlots) * 100).toFixed(1)}% Capacity`,
    },
    {
      name: "Pending Enquiries",
      value: stats.pendingEnquiries,
      icon: MessageSquare,
      color: "bg-orange-50 text-orange-600",
      trend: "Requires attention",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((card, index) => (
        <div
          key={index}
          className="bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
        >
          <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-2xl ${card.color}`}>
              <card.icon size={24} />
            </div>
            <ArrowUpRight size={20} className="text-gray-300" />
          </div>
          <p className="text-gray-500 text-sm font-medium mb-1 font-inter uppercase tracking-wider">
            {card.name}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 font-inter mb-2">
            {card.value}
          </h3>
          <p className="text-xs text-gray-400 font-medium font-inter">
            {card.trend}
          </p>
        </div>
      ))}
    </div>
  );
}

function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm animate-pulse">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl" />
            <div className="w-5 h-5 bg-gray-50 rounded-md" />
          </div>
          <div className="h-3 bg-gray-50 rounded w-24 mb-3" />
          <div className="h-8 bg-gray-100 rounded-lg w-16 mb-2" />
          <div className="h-3 bg-gray-50 rounded w-20" />
        </div>
      ))}
    </div>
  );
}

async function RecentEnquiriesList() {
  const enquiries = (await getEnquiries()).slice(0, 3);

  return (
    <div className="divide-y divide-gray-50">
      {enquiries.length === 0 ? (
        <div className="p-10 text-center text-gray-400 text-sm">
          No recent enquiries
        </div>
      ) : (
        enquiries.map((enquiry) => (
          <div
            key={enquiry._id}
            className="p-6 flex items-center justify-between hover:bg-gray-50/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#1B4332]/5 rounded-2xl flex items-center justify-center font-bold text-[#1B4332]">
                {enquiry.name?.charAt(0) || "U"}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 text-sm">
                  {enquiry.name}
                </h4>
                <p className="text-xs text-gray-500">
                  {enquiry.projectId?.name || "General Inquiry"}
                  {enquiry.plotId &&
                    ` • Plot ${enquiry.plotId.replace("plot-", "#")}`}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider ${enquiry.status === "pending" || !enquiry.status
                  ? "bg-orange-50 text-orange-600"
                  : "bg-green-50 text-green-600"
                  }`}
              >
                {enquiry.status || "New"}
              </span>
              <p className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-tighter">
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

function RecentEnquiriesSkeleton() {
  return (
    <div className="divide-y divide-gray-50 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-50 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-100 rounded w-32" />
              <div className="h-3 bg-gray-50 rounded w-20" />
            </div>
          </div>
          <div className="space-y-2 text-right">
            <div className="h-4 bg-gray-50 rounded w-16 ml-auto" />
            <div className="h-2 bg-gray-50 rounded w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-1 md:mb-2">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-inter">
            Business performance and operational overview.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-white border border-gray-200 rounded-xl text-[10px] sm:text-xs md:text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all font-inter">
            Export Report
          </button>
          <Link
            href="/admin/projects"
            className="flex-1 sm:flex-none px-4 sm:px-5 py-2 sm:py-2.5 bg-[#1B4332] text-white rounded-xl text-[10px] sm:text-xs md:text-sm font-bold hover:bg-[#133024] transition-all flex items-center justify-center gap-1.5 sm:gap-2 font-inter shadow-lg shadow-[#1B4332]/20"
          >
            <Building2 size={16} className="hidden sm:block" />
            Add Project
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats />
      </Suspense>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
        {/* Recent Enquiries Section */}
        <div className="lg:col-span-2 bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 sm:p-6 md:p-8 border-b border-gray-50 flex justify-between items-center">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 font-playfair">
              Recent Enquiries
            </h3>
            <Link
              href="/admin/enquiries"
              className="text-[#1B4332] text-sm font-bold hover:underline"
            >
              View All
            </Link>
          </div>
          <div className="p-0 flex-1">
            <Suspense fallback={<RecentEnquiriesSkeleton />}>
              <RecentEnquiriesList />
            </Suspense>
          </div>
        </div>

        {/* Quick Actions / Status */}
        <div className="space-y-4 md:space-y-6">
          <div className="bg-[#1B4332] rounded-2xl md:rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-xl shadow-[#1B4332]/30">
            <div className="relative z-10">
              <h3 className="text-lg md:text-xl font-playfair font-bold mb-3 md:mb-4">
                Quick Update
              </h3>
              <p className="text-white/60 text-sm mb-6 leading-relaxed">
                Instantly update plot availability or prices for any registered
                venture.
              </p>
              <Link
                href="/admin/plots"
                className="inline-flex items-center gap-2 bg-white text-[#1B4332] px-6 py-3 rounded-2xl font-bold text-sm tracking-wide hover:bg-gray-100 transition-all"
              >
                Inventory Manager
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <Map className="absolute -bottom-10 -right-10 w-48 h-48 text-white/5 rotate-12" />
          </div>

          <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <h3 className="text-lg md:text-xl font-playfair font-bold text-gray-900 mb-4 md:mb-6 flex items-center gap-2">
              <Clock size={20} className="text-[#1B4332]" />
              Activity Log
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-1 bg-[#1B4332] rounded-full" />
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    Plot 12 Sold
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Updated status for Ugadi Ventures
                  </p>
                  <p className="text-[10px] text-gray-300 mt-1 uppercase font-bold tracking-tighter">
                    Yesterday, 4:30 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
