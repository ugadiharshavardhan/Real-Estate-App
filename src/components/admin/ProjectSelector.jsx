"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function ProjectSelector({ projects, currentSlug }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (e) => {
    const slug = e.target.value;
    const params = new URLSearchParams(searchParams);
    params.set("project", slug);
    router.push(`?${params.toString()}`);
  };

  return (
    <select
      defaultValue={currentSlug}
      onChange={handleChange}
      className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-[#1B4332] font-inter focus:outline-none shadow-sm cursor-pointer"
    >
      {projects.map((p) => (
        <option key={p.slug} value={p.slug}>
          {p.name}
        </option>
      ))}
    </select>
  );
}
