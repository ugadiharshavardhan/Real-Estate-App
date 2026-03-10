"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "../ErrorBoundary";

// Dynamically import the actual Leaflet map component and disable Server-Side Rendering (SSR).
// Leaflet uses the `window` object which is only available in the browser.
const LeafletVentureMap = dynamic(
    () => import("./LeafletVentureMap"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[600px] bg-gray-50 rounded-2xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 animate-shimmer" style={{ background: 'linear-gradient(90deg, #f3f4f6 0%, #e5e7eb 50%, #f3f4f6 100%)', backgroundSize: '1000px 100%' }} />
                <div className="relative z-10 text-center">
                    <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400 font-bold uppercase tracking-[0.2em] text-[10px]">Preparing Venture Layout</p>
                </div>
            </div>
        )
    }
);

export default function VentureMapWrapper({ projectSlug }) {
    return (
        <ErrorBoundary>
            <LeafletVentureMap projectSlug={projectSlug} />
        </ErrorBoundary>
    );
}
