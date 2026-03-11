import { Suspense } from "react";
import Link from "next/link";
import { getProjects, getProjectPlots } from "@/utils/data/projects";
import {
  ArrowLeft,
  Search,
  Filter,
  Map as MapIcon,
  CheckCircle2,
  XCircle,
  Clock,
  CircleDollarSign,
  Maximize2,
  Navigation,
  ExternalLink,
} from "lucide-react";
import PlotStatusToggle from "@/components/admin/PlotStatusToggle";
import PlotActions from "@/components/admin/PlotActions";
import PlotSearch from "@/components/admin/PlotSearch";
import ProjectSelector from "@/components/admin/ProjectSelector";

async function PlotsInventory({ slug, q }) {
  let plots = slug ? await getProjectPlots(slug) : [];

  // Filter plots if search query exists
  if (q) {
    const search = q.toLowerCase();
    plots = plots.filter((plot) =>
      plot.plotNumber?.toString().toLowerCase().includes(search) ||
      plot.status?.toLowerCase().includes(search) ||
      plot.facing?.toLowerCase().includes(search) ||
      (Array.isArray(plot.customer) && plot.customer.some(c => c.name?.toLowerCase().includes(search)))
    );
  }

  return (
    <>
      {/* Stats Summary */}
      {/* Stats Summary */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-4">
        <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm col-span-2 lg:col-span-1">
          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter border-l-4 border-gray-300 pl-2">
            Total
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 font-inter ml-2">
              {plots.length}
            </span>
            <MapIcon size={14} className="text-gray-300 md:w-4 md:h-4 ml-auto" />
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm transition-all hover:shadow-md">
          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter border-l-4 border-green-500 pl-2">
            Available
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 font-inter ml-2">
              {plots.filter((p) => p.status === "available").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter border-l-4 border-orange-500 pl-2">
            Booked
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 font-inter ml-2">
              {plots.filter((p) => p.status === "booked").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter border-l-4 border-purple-500 pl-2">
            Mortgaged
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 font-inter ml-2">
              {plots.filter((p) => p.status === "mortgaged").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[9px] md:text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1 font-inter border-l-4 border-amber-600 pl-2">
            Registered
          </p>
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold text-gray-900 font-inter ml-2">
              {plots.filter((p) => p.status === "registered").length}
            </span>
          </div>
        </div>
      </div>

      {/* Plots Table/List */}
      {/* Plots Table (Desktop) / Cards (Mobile) */}
      <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Mobile View: Cards */}
        <div className="md:hidden divide-y divide-gray-50">
          {plots && plots.length > 0 ? (
            plots.map((plot) => (
              <div key={plot._id?.toString() || plot.plotId} className="p-5 space-y-5">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1B4332]/5 rounded-xl flex items-center justify-center font-bold text-[#1B4332] font-inter">
                      {plot.plotNumber}
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-mono">
                        {plot.plotId?.split('-').pop()}
                      </p>
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Plot {plot.plotNumber}</span>
                    </div>
                  </div>
                  <PlotActions plot={plot} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Specifications</p>
                    <p className="text-xs font-bold text-gray-900">{plot.areaSqFt} Sq.Ft</p>
                    <p className="text-[10px] text-gray-500 italic">{plot.facing} Facing</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Pricing</p>
                    <p className="text-sm font-bold text-[#1B4332]">₹{(plot.price / 100000).toFixed(2)} Lac</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                   <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Status Control</p>
                   <PlotStatusToggle plot={plot} />
                </div>
              </div>
            ))
          ) : (
             <div className="py-20 text-center">
                <MapIcon size={48} className="mx-auto text-gray-200 mb-4" />
                <p className="text-gray-500 font-inter text-sm">No plots found.</p>
             </div>
          )}
        </div>

        {/* Desktop View: Table */}
        <table className="hidden md:table w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
                Plot No
              </th>
              <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
                Area & Facing
              </th>
              <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
                Pricing
              </th>
              <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
                Status Control
              </th>
              <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter text-right">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {plots && plots.length > 0 ? (
              plots.map((plot) => (
                <tr
                  key={plot._id?.toString() || plot.plotId}
                  className="hover:bg-gray-50/30 transition-colors group"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#1B4332]/5 rounded-xl flex items-center justify-center font-bold text-[#1B4332] font-inter">
                        {plot.plotNumber}
                      </div>
                      <span className="text-xs text-gray-400 font-mono hidden md:block">
                        {plot.plotId}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="space-y-1">
                      <p className="text-sm font-bold text-gray-900 flex items-center gap-1.5 font-inter">
                        <Maximize2 size={14} className="text-gray-300" />
                        {plot.areaSqFt} Sq.Ft / {plot.areaCents} Cents
                      </p>
                      <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                        <span>E: {plot.east || 0}</span>
                        <span>W: {plot.west || 0}</span>
                        <span>N: {plot.north || 0}</span>
                        <span>S: {plot.south || 0}</span>
                      </div>
                      <p className="text-xs text-gray-500 flex items-center gap-1.5 font-inter">
                        <Navigation size={14} className="text-gray-300" />
                        {plot.facing}
                      </p>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <CircleDollarSign
                        size={18}
                        className="text-[#1B4332]/30"
                      />
                      <span className="text-lg font-bold text-gray-900 font-inter">
                        ₹{(plot.price / 100000).toFixed(2)} Lac
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <PlotStatusToggle plot={plot} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <PlotActions plot={plot} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-20">
                  <div className="flex flex-col items-center justify-center text-center">
                    <MapIcon size={48} className="text-gray-200 mb-4" />
                    <p className="text-gray-500 font-inter">
                      No plots found for this project.
                    </p>
                    <button className="mt-4 text-[#1B4332] font-bold text-sm hover:underline font-inter">
                      Run Sync API
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

function PlotsInventorySkeleton() {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-3">
            <div className="h-3 bg-gray-50 rounded w-16" />
            <div className="h-8 bg-gray-100 rounded-lg w-20" />
          </div>
        ))}
      </div>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden p-8 animate-pulse">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-xl">
              <div className="h-5 bg-gray-200 rounded w-12" />
              <div className="h-5 bg-gray-200 rounded flex-1" />
              <div className="h-5 bg-gray-200 rounded w-24" />
              <div className="h-5 bg-gray-200 rounded w-20" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default async function AdminPlots({ searchParams }) {
  const { project: slug, q } = await searchParams; // searchParams is a Promise in Next.js 15
  const projects = await getProjects();

  // Default to first project if none selected
  const activeSlug = slug || (projects.length > 0 ? projects[0].slug : "");
  const activeProject = projects.find((p) => p.slug === activeSlug);

  return (
    <div className="space-y-10">
      {/* Header & Project Selector */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Link
              href="/admin/projects"
              className="hover:text-gray-600 transition-colors"
            >
              Projects
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">
              {activeProject?.name || "Inventory"}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900">
            Plot Management
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <PlotSearch />
          <ProjectSelector projects={projects} currentSlug={activeSlug} />
        </div>
      </div>

      <Suspense fallback={<PlotsInventorySkeleton />}>
        <PlotsInventory slug={activeSlug} q={q} activeProject={activeProject} />
      </Suspense>
    </div>
  );
}
