"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PlotStatusFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const statuses = [
    { value: "", label: "All Statuses" },
    { value: "available", label: "Available" },
    { value: "reserved", label: "Reserved" },
    { value: "booked", label: "Booked" },
    { value: "mortgaged", label: "Mortgaged" },
    { value: "registered", label: "Registered" }
  ];

  const currentStatus = searchParams.get("status") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={currentStatus}
      onChange={handleChange}
      className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-inter text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 shadow-sm appearance-none min-w-[140px] cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '1em'
      }}
    >
      {statuses.map(status => (
        <option key={status.value} value={status.value}>
          {status.label}
        </option>
      ))}
    </select>
  );
}
