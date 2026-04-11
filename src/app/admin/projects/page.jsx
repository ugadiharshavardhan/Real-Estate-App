import { Suspense } from "react";
import { getProjects } from "@/utils/data/projects";
import { checkAdminStatus } from "@/utils/actions/admin";
import {
  Building2,
  MapPin,
  Layers,
  ExternalLink,
  Plus,
  Edit3,
  Trash2,
  ArrowRight,
  Map,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import {
  ProjectHeader,
  ProjectActions,
} from "@/components/admin/ProjectActions";

async function ProjectList() {
  const { isAdmin } = await checkAdminStatus();
  if (!isAdmin) return null;

  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="bg-white rounded-2xl md:rounded-3xl p-10 md:p-20 border border-dashed border-gray-200 flex flex-col items-center text-center">
        <div className="p-4 bg-gray-50 rounded-full mb-6">
          <Building2 size={48} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No projects found
        </h3>
        <p className="text-gray-500 max-w-sm">
          Get started by creating your first real estate venture to manage
          plots and enquiries.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {projects.map((project) => (
        <div
          key={project._id}
          className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row group hover:shadow-md transition-shadow"
        >
          {/* Image Section */}
          <div className="md:w-72 h-48 md:h-auto relative shrink-0 overflow-hidden">
            <Image
              src={
                project.heroImage ||
                "https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000&auto=format&fit=crop"
              }
              alt={project.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-4 left-4">
              <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-[#1B4332] uppercase tracking-wider">
                Active Project
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 p-5 sm:p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl md:text-2xl font-playfair font-bold text-gray-900 mb-1">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm flex items-center gap-1.5">
                    <MapPin size={14} className="text-[#1B4332]" />
                    {project.location}
                  </p>
                </div>
                <ProjectActions project={project} />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 py-4 md:py-6 border-y border-gray-50 mt-4 md:mt-6">
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
                    Total Plots
                  </p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Layers size={16} className="text-purple-500" />
                    {project.totalPlots}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
                    Total Area
                  </p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <Map size={16} className="text-emerald-500" />
                    {project.totalAcres} Acres
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
                    Amenities
                  </p>
                  <p className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-500" />
                    {project.amenities?.length || 0}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1.5">
                    Slug
                  </p>
                  <code className="text-xs bg-gray-50 px-2 py-1 rounded text-gray-600 font-mono">
                    {project.slug}
                  </code>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 md:mt-8 pt-4 gap-4">
              <div className="flex -space-x-2 items-center">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-400 overflow-hidden"
                  >
                    <Image
                      src={`https://i.pravatar.cc/100?u=${project._id}${i}`}
                      width={32}
                      height={32}
                      alt="user"
                    />
                  </div>
                ))}
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full border-2 border-white bg-gray-50 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-gray-400">
                  +5
                </div>
                <p className="ml-4 md:ml-10 text-[10px] md:text-xs text-gray-500 font-medium self-center">
                  Interested buyers
                </p>
              </div>

              <div className="flex gap-3 w-full sm:w-auto">
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 text-xs md:text-sm font-bold text-gray-400 hover:text-[#1B4332] transition-colors py-2"
                >
                  Preview
                  <ExternalLink size={12} />
                </Link>
                <Link
                  href={`/admin/plots?project=${project.slug}`}
                  className="flex-2 sm:flex-none flex items-center justify-center gap-2 bg-[#1B4332]/5 text-[#1B4332] px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold hover:bg-[#1B4332] hover:text-white transition-all group"
                >
                  Manage Plots
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row"
        >
          <div className="md:w-72 h-48 md:h-64 bg-gray-100" />
          <div className="flex-1 p-8 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="h-8 bg-gray-100 rounded-lg w-1/3" />
              <div className="h-4 bg-gray-50 rounded-md w-1/4" />
              <div className="grid grid-cols-4 gap-6 mt-8 p-6 border-y border-gray-50">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="space-y-2">
                    <div className="h-2 bg-gray-50 rounded w-16" />
                    <div className="h-6 bg-gray-100 rounded w-20" />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-end mt-8">
              <div className="h-8 bg-gray-50 rounded-full w-32" />
              <div className="h-10 bg-gray-100 rounded-xl w-40" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function AdminProjects() {
  const { isAdmin } = await checkAdminStatus();
  if (!isAdmin) return null;
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <ProjectHeader />

      {/* Projects Grid */}
      <Suspense fallback={<ProjectListSkeleton />}>
        <ProjectList />
      </Suspense>
    </div>
  );
}
