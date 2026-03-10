"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { MapPin, Navigation } from "lucide-react";

// Dynamic import for Leaflet because it depends on window
const RouteMap = dynamic(() => import("./RouteMap"), {
    ssr: false,
    loading: () => <div className="d-flex justify-content-center align-items-center bg-light" style={{ height: "500px" }}>Loading Map...</div>
});

export default function RouteSection({ ventureCoords, ventureName }) {
    const [userLocation, setUserLocation] = useState("");
    const [routeData, setRouteData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Listen for routing failures from the Map component
    useEffect(() => {
        const handleRoutingError = (e) => {
            setError(`Routing failed: ${e.detail || "Could not find a road path between these locations."}`);
            setLoading(false);
        };
        if (typeof window !== "undefined") {
            window.addEventListener('routing-failed', handleRoutingError);
            return () => window.removeEventListener('routing-failed', handleRoutingError);
        }
    }, []);

    const handleUseMyLocation = () => {
        if (!navigator.geolocation) {
            setError("Geolocation is not supported by your browser");
            return;
        }

        setLoading(true);
        setError("");

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Reverse geocode to show a friendly name in the input
                try {
                    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
                    const data = await res.json();
                    setUserLocation(data.display_name || "Current Location");
                } catch (e) {
                    setUserLocation("Current Location");
                }

                setRouteData({
                    start: { lat: latitude, lng: longitude },
                    end: ventureCoords
                });
                setLoading(false);
            },
            (err) => {
                setLoading(false);
                setError("Unable to retrieve your location. Check your browser permissions.");
            }
        );
    };

    const handleShowRoute = async (e) => {
        if (e) e.preventDefault();

        if (!userLocation.trim()) {
            setError("Please enter a location");
            return;
        }

        // If it's already set to "Current Location" from the button, we don't need to geocode
        if (userLocation === "Current Location" && routeData && routeData.start.lat && routeData.start.lng) {
            return;
        }

        setLoading(true);
        setError("");
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(userLocation)}&format=json&limit=1`
            );
            const data = await response.json();

            if (data && data.length > 0) {
                const { lat, lon } = data[0];
                setRouteData({
                    start: { lat: parseFloat(lat), lng: parseFloat(lon) },
                    end: ventureCoords
                });
            } else {
                setError("Location not found. Please try a more specific address.");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to geocode location. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const openInGoogleMaps = () => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${ventureCoords.lat},${ventureCoords.lng}`;
        window.open(url, "_blank");
    };

    return (
        <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-gray-100 overflow-hidden">
                    <div className="bg-[#1B4332] text-white p-6 md:p-8 flex justify-between items-center">
                        <div>
                            <h4 className="text-2xl md:text-3xl font-playfair mb-0">Get Route to This Venture</h4>
                            <p className="text-green-100/80 text-sm mt-2 font-inter tracking-wide uppercase">From your location to {ventureName}</p>
                        </div>
                        <Navigation className="hidden md:block opacity-20 w-16 h-16" strokeWidth={1} />
                    </div>

                    <div className="p-6 md:p-10">
                        <form onSubmit={handleShowRoute} className="mb-8">
                            <div className="flex flex-col md:flex-row items-end gap-6">
                                <div className="flex-1 w-full relative">
                                    <label htmlFor="userLocation" className="block text-sm font-semibold text-gray-700 mb-2 font-inter">
                                        Enter Your Starting Location
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            id="userLocation"
                                            className="w-full pl-5 pr-12 py-4 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-4 focus:ring-green-100 focus:border-[#1B4332] outline-none transition-all font-inter text-gray-800 placeholder-gray-400 shadow-sm"
                                            placeholder="Example: Hyderabad, Jubilee Hills"
                                            value={userLocation}
                                            onChange={(e) => setUserLocation(e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleUseMyLocation}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-[#1B4332] transition-colors"
                                            title="Use my current location"
                                        >
                                            <MapPin size={24} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                                    <button
                                        type="button"
                                        onClick={handleUseMyLocation}
                                        className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-inter flex items-center justify-center gap-2"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Locating...
                                            </>
                                        ) : (
                                            <>
                                                <Navigation size={20} />
                                                Auto-Route from My Location
                                            </>
                                        )}
                                    </button>

                                    <button
                                        type="submit"
                                        className="whitespace-nowrap bg-[#1B4332] hover:bg-[#2d5a44] text-white font-bold py-4 px-8 rounded-xl transition-all shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed font-inter flex items-center justify-center gap-2"
                                        disabled={loading}
                                    >
                                        Show Route
                                    </button>

                                    <button
                                        type="button"
                                        onClick={openInGoogleMaps}
                                        className="whitespace-nowrap border-2 border-gray-200 text-gray-600 hover:bg-gray-50 font-bold py-4 px-8 rounded-xl transition-all active:scale-[0.98] font-inter"
                                    >
                                        Google Maps
                                    </button>
                                </div>
                            </div>
                            {error && (
                                <div className="mt-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                                    {error}
                                </div>
                            )}
                        </form>

                        {routeData && (
                            <div className="mt-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col md:flex-row justify-between items-start md:items-center py-4 px-1 gap-4 border-b border-gray-100 mb-6">
                                    <div>
                                        <h5 className="text-xl font-bold text-gray-900 font-inter">Route Preview</h5>
                                        <p className="text-gray-500 text-sm mt-1">Directions to {ventureName} from your location</p>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-lg border border-green-100">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                        </span>
                                        OSM Free Routing
                                    </div>
                                </div>
                                <div className="rounded-2xl overflow-hidden border border-gray-200">
                                    <RouteMap
                                        startCoords={routeData.start}
                                        endCoords={routeData.end}
                                        ventureName={ventureName}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .font-playfair { font-family: var(--font-playfair), serif; }
                .font-inter { font-family: var(--font-inter), sans-serif; }
                .animate-in { animation: fadeIn 0.5s ease-out both; }
                .fade-in { animation-name: fadeIn; }
                .slide-in-from-top-2 { animation-name: slideInTop; }
                .slide-in-from-bottom-4 { animation-name: slideInBottom; }
                @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
                @keyframes slideInTop { from { transform: translateY(-0.5rem); } to { transform: translateY(0); } }
                @keyframes slideInBottom { from { transform: translateY(1rem); } to { transform: translateY(0); } }
            `}} />
        </section>
    );
}
