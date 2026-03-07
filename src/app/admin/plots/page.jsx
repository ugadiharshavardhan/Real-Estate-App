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

import ProjectSelector from "@/components/admin/ProjectSelector";

export default async function AdminPlots({ searchParams }) {
  const { project: slug } = await searchParams;
  const projects = await getProjects();

  // Default to first project if none selected
  const activeSlug = slug || (projects.length > 0 ? projects[0].slug : "");
  const activeProject = projects.find((p) => p.slug === activeSlug);
  const plots = activeSlug ? await getProjectPlots(activeSlug) : [];

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
          <h1 className="text-4xl font-playfair font-bold text-gray-900">
            Plot Management
          </h1>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search plot number..."
              className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-inter w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 shadow-sm"
            />
          </div>
          <ProjectSelector projects={projects} currentSlug={activeSlug} />
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 font-inter">
            Total
          </p>
          <div className="flex items-center gap-2">
            <MapIcon size={16} className="text-gray-300" />
            <span className="text-xl font-bold text-gray-900 font-inter">
              {plots.length}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 font-inter border-l-4 border-green-500 pl-2">
            Available
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 font-inter">
              {plots.filter((p) => p.status === "available").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 font-inter border-l-4 border-orange-500 pl-2">
            Booked
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 font-inter">
              {plots.filter((p) => p.status === "booked").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 font-inter border-l-4 border-purple-500 pl-2">
            Mortgaged
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 font-inter">
              {plots.filter((p) => p.status === "mortgaged").length}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1 font-inter border-l-4 border-blue-500 pl-2">
            Registered
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-900 font-inter">
              {plots.filter((p) => p.status === "registered").length}
            </span>
          </div>
        </div>
      </div>

      {/* Plots Table/List */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
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
                        {plot.areaSqFt} Sq.Ft
                      </p>
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
    </div>
  );
}
