"use client";

import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, GeoJSON, LayersControl, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const { Overlay } = LayersControl;

// Component to handle auto-fit bounds
function FitBounds({ bounds }) {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            map.fitBounds(bounds, { padding: [20, 20] });
        }
    }, [bounds, map]);
    return null;
}

// Home Button Component
function HomeButton({ bounds }) {
    const map = useMap();
    const handleHome = () => {
        if (bounds) {
            map.fitBounds(bounds, { animate: true, padding: [20, 20] });
        }
    };
    return (
        <div className="leaflet-top leaflet-left !mt-20">
            <div className="leaflet-control leaflet-bar">
                <button
                    onClick={handleHome}
                    className="bg-white w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100 transition-colors border-none cursor-pointer"
                    title="Center to Venture"
                    type="button"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default function LeafletVentureMap({ projectSlug = "ugadi-ventures" }) {
    const [geoData, setGeoData] = useState({
        plots: null,
        roads: null,
        compounds: null,
        footpaths: null,
    });

    const [plotsDB, setPlotsDB] = useState([]);
    const [mapBounds, setMapBounds] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    const [popupPosition, setPopupPosition] = useState(null);
    const [selectedPlotNo, setSelectedPlotNo] = useState(null);

    // 1. Fetch JSON files & Db Data
    useEffect(() => {
        async function init() {
            try {
                // Sync DB first
                await fetch(`/api/plots/sync?projectSlug=${projectSlug}`, { method: "POST" });

                // Fetch Plots from DB for Dynamic Styling
                const dbRes = await fetch(`/api/plots?projectSlug=${projectSlug}`);
                const dbJson = await dbRes.json();
                if (dbJson.success) {
                    setPlotsDB(dbJson.data);
                }

                // Fetch GeoJSONs from MongoDB
                const mapRes = await fetch(`/api/map-data?projectSlug=${projectSlug}`);
                const mapJson = await mapRes.json();

                if (mapJson.success) {
                    setGeoData(mapJson.data);

                    // Calculate bounds based on Plots
                    if (mapJson.data.plots && mapJson.data.plots.features && mapJson.data.plots.features.length > 0) {
                        const layer = L.geoJSON(mapJson.data.plots);
                        setMapBounds(layer.getBounds());
                    }
                } else {
                    console.warn("No map data found in DB, falling back to static files could be implemented here.");
                }

            } catch (err) {
                console.error("Failed to load map data:", err);
            }
        }
        init();
    }, [projectSlug]);

    // Styling Functions
    const styleRoads = (feature) => ({
        color: feature.properties.stroke || "#000000",
        weight: feature.properties["stroke-width"] || 12,
        fillColor: feature.properties.fill || "#000000",
        fillOpacity: feature.properties["fill-opacity"] || 1
    });

    const styleCompounds = (feature) => ({
        color: feature.properties.stroke || "#000000",
        weight: 3, // Increased from 1.5
        dashArray: "" // Solid
    });

    const styleFootpaths = (feature) => ({
        color: "#ffffff",
        weight: 1,
        fillColor: "#ffffff",
        fillOpacity: 1,
        dashArray: "" // Solid white lines
    });

    const stylePlots = (feature) => {
        // Determine plotNumber
        let plotNumberRaw = feature.properties.plot_no || feature.properties.name || feature.properties.plot_id || feature.properties.id || "";
        const plotNumber = String(plotNumberRaw).replace(/[^0-9]/g, '');

        // Match with DB Record
        const dbRecord = plotsDB.find(p => String(p.plotNumber) === plotNumber);
        const status = dbRecord ? dbRecord.status?.toLowerCase() : "available";

        // Initial styling from JSON properties
        let fillColor = feature.properties.fill || "#c6cf26";
        let strokeColor = feature.properties.stroke || "#000000";
        let strokeWeight = feature.properties["stroke-width"] || 2;
        let fillOpacity = feature.properties["fill-opacity"] || 1;

        // DB-Driven Color Logic matching the user's reference image
        if (status === "sold") fillColor = "#ef4444";           // Red
        else if (status === "booked") fillColor = "#ffedd5";    // Peach/Light Orange
        else if (status === "mortgaged") fillColor = "#e9d5ff"; // Lavender/Purple
        else if (status === "registered") fillColor = "#f59e0b"; // Golden/Amber
        else if (status === "available") fillColor = "#fef9c3"; // Cream/Yellow
        else if (status === "reserved") fillColor = "#fde68a"; // Soft Yellow

        const isSelected = selectedPlotNo === plotNumber;

        return {
            fillColor: fillColor,
            color: isSelected ? "#ffffff" : strokeColor,
            weight: isSelected ? 4 : strokeWeight,
            fillOpacity: isSelected ? 1.0 : fillOpacity,
        };
    };

    // Interaction handlers for plots
    const onEachPlot = (feature, layer) => {
        let plotNumberRaw = feature.properties.plot_no || feature.properties.name || feature.properties.plot_id || feature.properties.id || "";
        const plotNumber = String(plotNumberRaw).replace(/[^0-9]/g, '');

        // Add Plot Number labels directly on the map
        if (plotNumber) {
            layer.bindTooltip(plotNumber, {
                permanent: true,
                direction: "center",
                className: "plot-number-tooltip",
                opacity: 0.9
            });
        }

        // Ensure selected plot stays on top after render
        if (selectedPlotNo === plotNumber) {
            setTimeout(() => {
                if (layer.bringToFront) layer.bringToFront();
            }, 0);
        }

        // Hover Effects
        layer.on({
            mouseover: (e) => {
                const target = e.target;
                const originalStyle = stylePlots(feature);
                target.setStyle({
                    weight: 3,
                    fillOpacity: 0.9,
                    color: "#ffffff", // Bright white border on hover
                });
                target.bringToFront();
            },
            mouseout: (e) => {
                const target = e.target;
                const originalStyle = stylePlots(feature);
                // Reset to original style (including color/border fix)
                target.setStyle(originalStyle);
            },
            click: async (e) => {
                const target = e.target;
                let plotNumberRaw = feature.properties.plot_no || feature.properties.name || feature.properties.plot_id || feature.properties.id || "";
                const plotNumber = String(plotNumberRaw).replace(/[^0-9]/g, '');

                // Set selected plot for exclusive highlight
                setSelectedPlotNo(plotNumber);
                target.bringToFront(); // Immediate highlight z-index fix

                // Calculate center for Popup
                const center = target.getBounds().getCenter();
                setPopupPosition([center.lat, center.lng]);

                // Optimistic UI update using existing DB array or properties
                const dbRecord = plotsDB.find(p => String(p.plotNumber) === plotNumber);
                setPopupInfo({
                    loading: true,
                    plotNumber: plotNumber,
                    area: feature.properties.area || (dbRecord?.areaSqFt) || 'Unknown',
                });

                // Backend API Fetching as per requirements
                try {
                    const res = await fetch(`/api/plots/${plotNumber}?projectSlug=${projectSlug}`);
                    const json = await res.json();
                    if (json.success) {
                        setPopupInfo({
                            loading: false,
                            plotNumber: json.data.plotNumber,
                            area: json.data.areaSqFt,
                            areaCents: json.data.areaCents,
                            status: json.data.status,
                            facing: json.data.facing || "Unknown",
                            road: json.data.road || "N/A",
                            price: json.data.price,
                            owner: json.data.ownerName || "N/A"
                        });
                    } else {
                        // Fallback local DB state
                        setPopupInfo({
                            loading: false,
                            plotNumber: plotNumber,
                            area: dbRecord?.areaSqFt || 'Unknown',
                            areaCents: dbRecord?.areaCents || 'Unknown',
                            status: dbRecord?.status || 'Unknown',
                            facing: dbRecord?.facing || "Unknown",
                            road: dbRecord?.road || "N/A",
                            owner: "N/A"
                        });
                    }
                } catch (error) {
                    console.error("Popup Error:", error);
                    setPopupInfo(prev => ({ ...prev, loading: false }));
                }
            }
        });
    };

    // Close Popup Handler
    const closePopup = () => {
        setPopupInfo(null);
        setPopupPosition(null);
    };

    // Calculate Stats for Legend
    const stats = {
        total: plotsDB.length,
        available: plotsDB.filter(p => p.status === 'available').length,
        mortgaged: plotsDB.filter(p => p.status === 'mortgaged').length,
        registered: plotsDB.filter(p => p.status === 'registered').length,
        booked: plotsDB.filter(p => p.status === 'booked' || p.status === 'sold' || p.status === 'reserved').length,
    };

    const StatusBox = ({ color, label, count, isFullLabel = false }) => (
        <div className="flex items-center overflow-hidden border border-gray-900 h-10">
            {color && <div className="w-10 h-10 border-r border-gray-900 flex-shrink-0" style={{ backgroundColor: color }}></div>}
            <div className={`px-4 flex-grow bg-[#065f46] text-white flex items-center justify-center font-bold text-sm lg:text-base border-r border-gray-900 ${isFullLabel ? 'min-w-[140px]' : ''}`}>
                {label}
            </div>
            <div className="px-4 min-w-[50px] bg-[#065f46] text-white flex items-center justify-center font-bold text-sm lg:text-base">
                {count}
            </div>
        </div>
    );

    if (!geoData.plots) {
        return (
            <div className="w-full h-[500px] bg-gray-50 flex items-center justify-center animate-pulse rounded-2xl border border-gray-200">
                <div className="text-gray-400 font-medium">Loading Map Data...</div>
            </div>
        );
    }

    return (
        <div className="relative w-full mt-12">
            {/* Dynamic Legend / Count Section - Moved Above Map */}
            <div className="mb-8 bg-[#065f46] p-6 rounded-2xl shadow-xl overflow-x-auto">
                <div className="flex flex-wrap items-center justify-center gap-4 min-w-max md:min-w-0">
                    <div className="flex flex-col gap-2">
                        <StatusBox color="#fef9c3" label="Available Plots" count={stats.available} isFullLabel />
                        <StatusBox color="#e9d5ff" label="Mortgaged Plots" count={stats.mortgaged} isFullLabel />
                    </div>

                    <div className="flex flex-col gap-2">
                        <StatusBox label="Total Plots" count={stats.total} isFullLabel />
                        <StatusBox color="#f59e0b" label="Registered Plots" count={stats.registered} isFullLabel />
                    </div>

                    <div className="flex items-center border border-gray-900 overflow-hidden h-20 shadow-lg">
                        <div className="flex flex-col h-full">
                            <div className="w-10 h-1/3 border-b border-gray-900" style={{ backgroundColor: "#ffedd5" }}></div>
                            <div className="w-10 h-1/3 border-b border-gray-900" style={{ backgroundColor: "#fde68a" }}></div>
                            <div className="w-10 h-1/3" style={{ backgroundColor: "#ef4444" }}></div>
                        </div>
                        <div className="px-6 h-full bg-[#065f46] text-white flex items-center justify-center font-bold text-lg min-w-[140px] border-l border-gray-900">
                            Booked Plots
                        </div>
                        <div className="px-6 h-full bg-[#065f46] text-white flex items-center justify-center font-black text-2xl min-w-[60px] border-l border-gray-900">
                            {stats.booked}
                        </div>
                    </div>
                </div>
            </div>

            <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white p-2">
                <div className="w-full h-[450px] rounded-xl overflow-hidden relative">
                    <MapContainer
                        center={[15.724, 77.813]} // Default fallback center
                        zoom={16}
                        style={{ width: "100%", height: "100%" }}
                    >
                        {mapBounds && <FitBounds bounds={mapBounds} />}
                        {mapBounds && <HomeButton bounds={mapBounds} />}

                        <LayersControl position="topright">
                            {/* Base Tile Layers */}
                            <LayersControl.BaseLayer checked name="Satellite Map (Esri)">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EAP, and the GIS User Community'
                                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                    maxZoom={22}
                                    maxNativeZoom={18}
                                />
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="Satellite with Labels">
                                <React.Fragment>
                                    <TileLayer
                                        url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                                        maxZoom={22}
                                        maxNativeZoom={18}
                                    />
                                    <TileLayer
                                        url="https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}"
                                        maxZoom={22}
                                        maxNativeZoom={18}
                                    />
                                </React.Fragment>
                            </LayersControl.BaseLayer>
                            <LayersControl.BaseLayer name="OpenStreetMap">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    maxZoom={22} // Allow high zooming for venture scales
                                    maxNativeZoom={19}
                                />
                            </LayersControl.BaseLayer>

                            {/* GeoJSON Overlays */}
                            {geoData.compounds && (
                                <Overlay checked name="Compound Boundary">
                                    <GeoJSON data={geoData.compounds} style={styleCompounds} />
                                </Overlay>
                            )}

                            {geoData.plots && (
                                <Overlay checked name="Plots">
                                    <GeoJSON
                                        key={`plots-${selectedPlotNo}-${plotsDB.length}`} // Force re-render on selection
                                        data={geoData.plots}
                                        style={stylePlots}
                                        onEachFeature={onEachPlot}
                                    />
                                </Overlay>
                            )}

                            {geoData.roads && (
                                <Overlay checked name="Roads">
                                    {/* Placing this lower in the layers list naturally elevates its SVG z-index within the same pane */}
                                    <GeoJSON data={geoData.roads} style={styleRoads} />
                                </Overlay>
                            )}

                            {geoData.footpaths && (
                                <Overlay checked name="Footpaths">
                                    <GeoJSON data={geoData.footpaths} style={styleFootpaths} />
                                </Overlay>
                            )}
                        </LayersControl>
                    </MapContainer>

                    {/* Custom Overlay Popup */}
                    {popupInfo && popupPosition && (
                        <div className="absolute top-4 right-4 z-[1000] bg-white rounded-xl shadow-2xl p-5 border border-gray-100 max-w-sm w-[280px] animate-in fade-in slide-in-from-right-8 duration-300">
                            <button
                                onClick={closePopup}
                                className="absolute top-3 right-3 text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-colors"
                            >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </svg>
                            </button>
                            <div className="mb-3 border-b border-gray-100 pb-3">
                                <h3 className="font-playfair text-xl font-bold text-gray-900">
                                    Plot Number: {popupInfo.plotNumber}
                                </h3>
                            </div>
                            {popupInfo.loading ? (
                                <div className="text-gray-500 text-sm animate-pulse py-2">Loading details...</div>
                            ) : (
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-500">Plot Area:</span>
                                        <span className="font-bold text-gray-900">
                                            {popupInfo.area} Sq.Ft {popupInfo.areaCents && `(${popupInfo.areaCents} Cents)`}
                                        </span>
                                    </div>
                                    {popupInfo.road && (
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-500">Road Access:</span>
                                            <span className="font-bold text-gray-900">{popupInfo.road}</span>
                                        </div>
                                    )}
                                    {popupInfo.price && (
                                        <div className="flex justify-between items-center py-1">
                                            <span className="text-gray-500">Price:</span>
                                            <span className="font-bold text-gray-900">₹{popupInfo.price.toLocaleString()}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-500">Facing Direction:</span>
                                        <span className="font-bold text-gray-900 capitalize">{popupInfo.facing}</span>
                                    </div>
                                    <div className="flex justify-between items-center py-1">
                                        <span className="text-gray-500">Plot Status:</span>
                                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase
                    ${popupInfo.status === 'available' ? 'bg-green-100 text-green-700' :
                                                popupInfo.status === 'sold' || popupInfo.status === 'booked' ? 'bg-red-100 text-red-700' :
                                                    popupInfo.status === 'mortgaged' ? 'bg-purple-100 text-purple-700' :
                                                        'bg-yellow-100 text-yellow-700'
                                            }`}>
                                            {popupInfo.status || 'Unknown'}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <style jsx global>{`
                .plot-number-tooltip {
                    background: transparent !important;
                    border: none !important;
                    box-shadow: none !important;
                    color: #000000 !important;
                    font-weight: 800 !important;
                    font-size: 10px !important;
                    text-shadow: 1px 1px 0px rgba(255,255,255,0.8), -1px -1px 0px rgba(255,255,255,0.8) !important;
                    pointer-events: none !important;
                }
                .leaflet-tooltip-pane {
                    z-index: 650;
                }
            `}</style>
        </div>
    );
}
