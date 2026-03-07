"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import the actual Leaflet map component and disable Server-Side Rendering (SSR).
// Leaflet uses the `window` object which is only available in the browser.
const LeafletVentureMap = dynamic(
    () => import("./LeafletVentureMap"),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-[600px] flex flex-col items-center justify-center bg-gray-50 rounded-2xl border border-gray-200">
                <Loader2 className="w-10 h-10 animate-spin text-[#1B4332] mb-4" />
                <p className="text-[#1B4332] font-semibold tracking-wide">Initializing Leaflet Map...</p>
            </div>
        )
    }
);

export default function VentureMapWrapper({ projectSlug }) {
    return <LeafletVentureMap projectSlug={projectSlug} />;
}
