"use client";

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

// Marker icon fix for Leaflet in Next.js (Idempotent check)
if (L.Marker.prototype.options.icon && !L.Marker.prototype.options._isFixed) {
    const DefaultIcon = L.icon({
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });
    L.Marker.prototype.options.icon = DefaultIcon;
    L.Marker.prototype.options._isFixed = true;
}

export default function RouteMap({ startCoords, endCoords, ventureName }) {
    const mapRef = useRef(null);
    const containerRef = useRef(null);
    const routingControlRef = useRef(null);
    const isMounted = useRef(true);

    // Helper to safely detach routing control to prevent async race conditions
    const safeDetach = (map, control) => {
        if (!map || !control) return;
        try {
            // 1. Force clear waypoints first while map is still valid. 
            // This prevents internal Leaflet Routing Machine listeners from 
            // firing after the control is removed.
            if (control.setWaypoints) {
                control.setWaypoints([]);
            }

            // 2. Stricter check: Only attempt removal if both map and control are still linked
            if (map.removeControl && (control._map === map || map.hasLayer?.(control))) {
                map.removeControl(control);
            }
        } catch (e) {
            // Silent catch for non-critical cleanup issues
            console.debug("Cleanup notice:", e.message);
        }
    };

    // 1. Initialize Map Instance (Runs exactly once)
    useEffect(() => {
        isMounted.current = true;
        if (typeof window === "undefined" || !containerRef.current || mapRef.current) return;

        try {
            const map = L.map(containerRef.current).setView([endCoords.lat, endCoords.lng], 13);
            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
                maxZoom: 19,
            }).addTo(map);

            mapRef.current = map;
        } catch (error) {
            console.error("Map Initialization Error:", error);
        }

        return () => {
            isMounted.current = false;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    // 2. Handle Routing Logic (Runs when coordinates change)
    useEffect(() => {
        const map = mapRef.current;
        if (!map || !isMounted.current) return;
        if (!startCoords?.lat || !startCoords?.lng || !endCoords?.lat || !endCoords?.lng) return;

        // --- STEP A: SAFE CLEANUP ---
        if (routingControlRef.current) {
            safeDetach(map, routingControlRef.current);
            routingControlRef.current = null;
        }

        // --- STEP B: FRESH INITIALIZATION ---
        try {
            const control = L.Routing.control({
                waypoints: [
                    L.latLng(startCoords.lat, startCoords.lng),
                    L.latLng(endCoords.lat, endCoords.lng)
                ],
                routeWhileDragging: false,
                addWaypoints: false,
                fitSelectedRoutes: true,
                showAlternatives: false,
                collapsible: true,
                lineOptions: {
                    styles: [{ color: "#1B4332", weight: 6, opacity: 0.8 }]
                },
                createMarker: (i, wp) => {
                    const label = i === 0 ? "Your Location" : `Destination: ${ventureName || "Venture"}`;
                    return L.marker(wp.latLng).bindPopup(label);
                },
                router: L.Routing.osrmv1({
                    serviceUrl: "https://router.project-osrm.org/route/v1",
                    // Add a timeout if the backend supports it, or just rely on our cleanup
                })
            }).addTo(map);

            // Catch and handle OSRM calculation failures gracefully
            control.on('routingerror', (e) => {
                if (!isMounted.current) return;
                console.error("Routing Error:", e.error);
                window.dispatchEvent(new CustomEvent('routing-failed', {
                    detail: e.error?.message || "Could not find a valid driving route."
                }));
            });

            routingControlRef.current = control;

            // Fit bounds with slight delay to ensure control is ready
            const bounds = L.latLngBounds([
                [startCoords.lat, startCoords.lng],
                [endCoords.lat, endCoords.lng]
            ]);
            map.fitBounds(bounds, { padding: [50, 50] });

        } catch (err) {
            console.error("Leaflet Routing Machine Error:", err);
        }

        return () => {
            if (routingControlRef.current && mapRef.current) {
                safeDetach(mapRef.current, routingControlRef.current);
                routingControlRef.current = null;
            }
        };
    }, [startCoords, endCoords, ventureName]);

    return (
        <div
            ref={containerRef}
            style={{ height: "500px", width: "100%", borderRadius: "12px", border: "1px solid #dee2e6" }}
            className="shadow-sm overflow-hidden z-0"
        />
    );
}
