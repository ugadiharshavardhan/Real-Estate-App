import { Suspense } from "react";
import { getAdminStats, checkAdminStatus } from "@/utils/actions/admin";
import { getEnquiries } from "@/utils/data/enquiries";
import {
  Building2,
  MessageSquare,
  CheckCircle2,
  ArrowUpRight,
  ChevronRight,
  LayoutDashboard,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import AdminLoading from "@/components/admin/AdminLoading";
import VentureSelector from "@/components/admin/VentureSelector";

async function DashboardContent({ searchParams }) {
  const { isAdmin } = await checkAdminStatus();
  if (!isAdmin) return null;

  const { project: currentSlug } = await searchParams;
  const statsRes = await getAdminStats();
  const enquiries = await getEnquiries();
  
  const { globalStats, projectStats } = statsRes.success 
    ? statsRes.data 
    : { globalStats: { totalProjects: 0, totalPlots: 0, availablePlots: 0, pendingEnquiries: 0 }, projectStats: [] };

  // Determine current context (Specific Project or Global)
  const isGlobal = !currentSlug || currentSlug === "all";
  const selectedProject = projectStats.find(p => p.slug === currentSlug);
  
  // Filter Statistics for the Top Bar
  const displayStats = isGlobal 
    ? globalStats 
    : {
        totalPlots: selectedProject?.totalPlots || 0,
        availablePlots: selectedProject?.availablePlots || 0,
        pendingEnquiries: selectedProject?.pendingEnquiries || 0,
        registeredPlots: selectedProject?.registeredPlots || 0,
        bookedPlots: selectedProject?.bookedPlots || 0,
        reservedPlots: selectedProject?.reservedPlots || 0,
      };

  // Projects to list
  const displayedProjects = isGlobal 
    ? projectStats 
    : (selectedProject ? [selectedProject] : []);

  return (
    <div className="space-y-12">
      {/* Top Level Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {!isGlobal && (
          <div className="bg-[#1B4332] p-4 md:p-6 rounded-[2rem] border border-transparent shadow-xl shadow-[#1B4332]/20 col-span-2 lg:col-span-1">
            <p className="text-[10px] text-white/50 uppercase font-black tracking-widest mb-1 font-inter">Active View</p>
            <p className="text-xl font-bold text-white truncate font-playfair">{selectedProject?.name}</p>
          </div>
        )}
        {isGlobal && (
           <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter">Total Ventures</p>
            <p className="text-2xl font-bold text-gray-900">{globalStats.totalProjects}</p>
          </div>
        )}
        <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter">Available</p>
          <p className="text-2xl font-bold text-green-600 font-inter">{displayStats.availablePlots}</p>
        </div>
        {!isGlobal ? (
          <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter">Booked</p>
            <p className="text-2xl font-bold text-blue-600 font-inter">{displayStats.bookedPlots}</p>
          </div>
        ) : (
          <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter">Pending Leads</p>
            <p className="text-2xl font-bold text-orange-600 font-inter">{displayStats.pendingEnquiries}</p>
          </div>
        )}
        <div className="bg-white p-4 md:p-6 rounded-[2rem] border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter">
            {isGlobal ? "Total Plots" : "Completed"}
          </p>
          <p className={`text-2xl font-bold font-inter ${isGlobal ? 'text-purple-600' : 'text-[#C5A059]'}`}>
            {isGlobal ? displayStats.totalPlots : displayStats.registeredPlots}
          </p>
        </div>
      </div>

      {/* Control Panel: Dropdown & Selection */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 bg-gray-50/50 p-6 md:p-10 rounded-[3rem] border border-gray-100">
        <div>
          <h2 className="text-2xl sm:text-3xl font-playfair font-bold text-gray-900 flex items-center gap-3 mb-2">
            <LayoutDashboard className="text-[#1B4332]" />
            {isGlobal ? "Venture Dashboard" : `Analytics: ${selectedProject?.name}`}
          </h2>
          <p className="text-sm text-gray-500 font-inter max-w-md">
            {isGlobal 
              ? "Comprehensive overview of operational metrics across the entire real estate portfolio." 
              : `Deep-dive analysis of sales, availability, and engagement for ${selectedProject?.name}.`}
          </p>
        </div>
        <VentureSelector projects={projectStats} currentSlug={currentSlug} />
      </div>

      {/* Project Cards Section */}
      <div className="space-y-12">
        {displayedProjects.length === 0 ? (
          <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-sm">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 size={32} className="text-gray-200" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 font-playfair mb-2">No Projects Registered</h3>
            <p className="text-gray-500 max-w-xs mx-auto text-sm font-inter">Add your first real estate project or venture to start tracking performance metrics.</p>
          </div>
        ) : (
          displayedProjects.map((project) => {
            const projectEnquiries = enquiries.filter(enq => 
              enq.projectId?._id?.toString() === project.projectId && 
              enq.status === 'pending'
            );

            return (
              <div key={project.projectId} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group hover:shadow-lg transition-all duration-500">
                {/* Project Banner / Stats Grid */}
                <div className="bg-gray-50/30 p-6 sm:p-10 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-10 border-b border-gray-50/50">
                  <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-[#1B4332] shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                      <Building2 size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-1">{project.name}</h3>
                      <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em]">Operational Overview</p>
                    </div>
                  </div>

                  {/* Comprehensive Status Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full xl:w-auto">
                    {[
                      { label: "Total", val: project.totalPlots, color: "text-gray-900", bg: "bg-white" },
                      { label: "Available", val: project.availablePlots, color: "text-green-600", bg: "bg-green-50" },
                      { label: "Reserved", val: project.reservedPlots, color: "text-orange-600", bg: "bg-orange-50" },
                      { label: "Booked", val: project.bookedPlots, color: "text-blue-600", bg: "bg-blue-50" },
                      { label: "Completed", val: project.registeredPlots, color: "text-[#C5A059]", bg: "bg-[#866d3d]/5" },
                    ].map((m, idx) => (
                      <div key={idx} className={`${m.bg} px-4 py-3 rounded-2xl border border-gray-100 flex flex-col items-center justify-center min-w-[100px]`}>
                        <p className="text-[8px] sm:text-[9px] text-gray-400 uppercase font-black mb-1">{m.label}</p>
                        <p className={`text-base sm:text-lg font-bold font-inter ${m.color}`}>{m.val}</p>
                      </div>
                    ))}
                  </div>

                  <Link 
                    href={`/admin/plots?project=${project.slug}`}
                    className="flex items-center justify-center gap-2 bg-[#1B4332] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/10 w-full xl:w-auto"
                  >
                    Manage Inventory
                    <ArrowUpRight size={18} />
                  </Link>
                </div>

                {/* Enquiry Feed for this project */}
                <div className="p-6 sm:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                      <MessageSquare size={16} className="text-[#1B4332]/40" />
                      Pending Callback Leads {isGlobal && "(Centralized View)"}
                    </h4>
                    {projectEnquiries.length > 0 && (
                      <span className="bg-orange-100 text-orange-800 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                        {projectEnquiries.length} Action Needed
                      </span>
                    )}
                  </div>

                  {projectEnquiries.length === 0 ? (
                    <div className="bg-gray-50/50 rounded-3xl p-12 text-center border border-dashed border-gray-100 lg:py-20">
                      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 size={32} className="text-green-500/40" />
                      </div>
                      <p className="text-sm text-gray-400 font-inter font-medium">All enquiries for {project.name} have been addressed.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {projectEnquiries.map((enquiry) => (
                        <div key={enquiry._id} className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-transparent hover:border-[#1B4332]/10 transition-all hover:bg-white group/card relative">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-bold text-[#1B4332] shadow-sm border border-gray-50">
                                {enquiry.name?.charAt(0) || "U"}
                              </div>
                              <div>
                                <p className="text-base font-bold text-gray-900 leading-none mb-1.5">{enquiry.name}</p>
                                <div className="flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                  <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                                  {!isGlobal && (
                                    <>
                                      <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                      <span className="text-[#C5A059]">{project.name}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                            <Link href="/admin/enquiries" className="text-gray-300 hover:text-[#1B4332] transition-colors">
                               <ArrowUpRight size={20} />
                            </Link>
                          </div>
                          
                          <div className="bg-white/60 rounded-3xl p-5 mb-6 min-h-[80px] border border-gray-50/50">
                            <p className="text-xs text-gray-600 line-clamp-3 font-inter leading-relaxed italic">
                              "{enquiry.message}"
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-5 border-t border-gray-100">
                            <div className="flex flex-col">
                              <p className="text-[9px] text-gray-400 font-black uppercase mb-0.5 tracking-widest">Contact Number</p>
                              <p className="text-xs font-bold text-gray-900">{enquiry.phone}</p>
                            </div>
                            <Link href="/admin/enquiries" className="flex items-center gap-1.5 text-[10px] font-black uppercase text-gray-900 hover:text-[#1B4332] group/link">
                              Process Lead <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

function DashboardSkeleton() {
  return (
    <div className="animate-pulse space-y-12">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="h-32 bg-gray-50 rounded-[2rem]" />
        ))}
      </div>
      <div className="h-40 bg-gray-50 rounded-[3rem]" />
      <div className="space-y-10 pt-10">
        {[1, 2].map(i => (
          <div key={i} className="h-80 bg-white border border-gray-50 rounded-[40px]" />
        ))}
      </div>
    </div>
  );
}

export default async function AdminDashboard({ searchParams }) {
  const { isAdmin } = await checkAdminStatus();
  if (!isAdmin) return null;
  return (
    <div className="space-y-10 pb-20">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 sm:gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-1 md:mb-2">
            Admin Dashboard
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-inter">
            Real-time business performance and enquiry management.
          </p>
        </div>
        <div className="flex gap-2 sm:gap-3 w-full sm:auto">
           <Link
            href="/admin/projects"
            className="flex-1 sm:flex-none px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-[10px] sm:text-xs md:text-sm font-bold hover:bg-[#133024] transition-all flex items-center justify-center gap-2 font-inter shadow-lg shadow-[#1B4332]/20"
          >
            <Building2 size={16} />
            Add Project
          </Link>
        </div>
      </div>

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
