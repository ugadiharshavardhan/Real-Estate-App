"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export default function PlotPriceSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const sortOptions = [
    { value: "", label: "Default Sort" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" }
  ];

  const currentSort = searchParams.get("sort") || "";

  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <select
      value={currentSort}
      onChange={handleChange}
      className="px-4 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-inter text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 shadow-sm appearance-none min-w-[160px] cursor-pointer"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%239CA3AF'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 1rem center',
        backgroundSize: '1em'
      }}
    >
      {sortOptions.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
