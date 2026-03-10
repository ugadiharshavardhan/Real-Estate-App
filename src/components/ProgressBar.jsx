"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ProgressBar() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // When the route or params change, we consider the transition finished
        // This is a common pattern for Next.js App Router progress bars
        setLoading(false);
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
        <div className="fixed top-0 left-0 right-0 z-[9999]">
            <div className="h-1 bg-[#1B4332] w-full animate-progress-bar origin-left" />
            <style jsx>{`
        @keyframes progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(0.7); }
          100% { transform: scaleX(0.9); }
        }
        .animate-progress-bar {
          animation: progress 3s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
