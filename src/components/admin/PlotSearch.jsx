"use client";

import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlotSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("q") || "");

    // Debounced navigation
    useEffect(() => {
        // Only push if the query differs from the current URL to prevent loops
        const currentQ = searchParams.get("q") || "";
        if (query === currentQ) return;

        const timer = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (query) {
                params.set("q", query);
            } else {
                params.delete("q");
            }

            const currentUrl = `?${params.toString()}`;
            router.push(currentUrl, { scroll: false });
        }, 400);

        return () => clearTimeout(timer);
    }, [query, router, searchParams]);

    return (
        <div className="relative">
            <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />
            <input
                type="text"
                placeholder="Search plot, status, or customer..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-12 pr-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-inter w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 shadow-sm"
            />
        </div>
    );
}
