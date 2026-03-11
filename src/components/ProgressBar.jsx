"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // When the route or params change, we consider the transition finished
        // We use a small timeout to avoid synchronous setState during render/effect cycle
        const timer = setTimeout(() => setLoading(false), 0);
        return () => clearTimeout(timer);
    }, [pathname, searchParams]);

    useEffect(() => {
        const handleAnchorClick = (e) => {
            const target = e.target.closest("a");
            if (
                target &&
                target.href &&
                target.target !== "_blank" &&
                !target.href.startsWith("javascript:") &&
                !target.href.startsWith("#") &&
                !target.getAttribute("download") &&
                target.href !== window.location.href
            ) {
                // Check if it's an internal link
                const url = new URL(target.href);
                if (url.origin === window.location.origin) {
                    setLoading(true);
                }
            }
        };

        document.addEventListener("click", handleAnchorClick);
        return () => document.removeEventListener("click", handleAnchorClick);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-9999">
            <div className="h-[3px] bg-linear-to-r from-[#1B4332] via-[#C5A059] to-[#1B4332] w-full animate-progress-bar origin-left shadow-[0_1px_10px_rgba(197,160,89,0.5)]" />
            <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          30% { transform: scaleX(0.5); }
          60% { transform: scaleX(0.8); }
          100% { transform: scaleX(0.95); }
        }
        .animate-progress-bar {
          animation: progress 2.5s cubic-bezier(0.1, 0, 0.1, 1) forwards;
        }
      `}</style>
        </div>
    );
}
