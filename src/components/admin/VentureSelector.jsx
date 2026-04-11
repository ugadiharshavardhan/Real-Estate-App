"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { LayoutDashboard, Building2, ChevronDown } from "lucide-react";

export default function VentureSelector({ projects, currentSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSelect = (slug) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug === "all") {
      params.delete("project");
    } else {
      params.set("project", slug);
    }
    router.push(`/admin?${params.toString()}`);
  };

  const selectedProject = projects.find(p => p.slug === currentSlug);

  return (
    <div className="relative inline-block w-full sm:w-72">
      <div className="flex items-center gap-2 mb-2 text-[10px] uppercase font-black tracking-widest text-gray-400 ml-1">
        Select Venture
      </div>
      <div className="group relative">
        <select
          value={currentSlug || "all"}
          onChange={(e) => handleSelect(e.target.value)}
          className="w-full appearance-none bg-white border border-gray-100 px-6 py-4 rounded-3xl text-sm font-bold text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all cursor-pointer pr-12"
        >
          <option value="all">Global Overview (All Projects)</option>
          {projects.map((project) => (
            <option key={project.projectId} value={project.slug}>
              {project.name}
            </option>
          ))}
        </select>
        <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 group-focus-within:text-[#1B4332] transition-colors">
          <ChevronDown size={18} />
        </div>
      </div>
    </div>
  );
}
