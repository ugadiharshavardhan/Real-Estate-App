"use client";

import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import {
  MapContainer,
  TileLayer,
  GeoJSON,
  LayersControl,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import ReservationForm from "./ReservationForm";

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const { Overlay } = LayersControl;

// --- Sub-components (Extracted & Memoized) ---

const FitBounds = React.memo(({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [20, 20] });
  }, [bounds, map]);
  return null;
});
FitBounds.displayName = "FitBounds";

const HomeButton = React.memo(({ bounds }) => {
  const map = useMap();
  const handleHome = useCallback(() => {
    if (bounds) map.fitBounds(bounds, { animate: true, padding: [20, 20] });
  }, [bounds, map]);

  return (
    <div className="leaflet-top leaflet-left !mt-20">
      <div className="leaflet-control leaflet-bar">
        <button
          onClick={handleHome}
          className="bg-white w-[34px] h-[34px] flex items-center justify-center hover:bg-gray-100 transition-colors border-none cursor-pointer"
          title="Center to Venture"
          type="button"
        >
          <HomeIcon />
        </button>
      </div>
    </div>
  );
});
HomeButton.displayName = "HomeButton";

const HomeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const StatusBox = React.memo(({ color, label, count, isFullLabel = false }) => (
  <div className="flex items-center overflow-hidden border border-gray-900 h-5 md:h-7 w-full lg:w-auto">
    {color && (
      <div className="w-5 h-5 md:w-7 md:h-7 border-r border-gray-900 shrink-0" style={{ backgroundColor: color }}></div>
    )}
    <div className={`px-1 md:px-2 grow bg-[#022c22] text-white flex items-center justify-center font-bold text-[9px] sm:text-[10px] md:text-xs lg:text-sm border-r border-gray-900 ${isFullLabel ? "sm:min-w-[90px] md:min-w-[120px]" : ""}`}>
      {label}
    </div>
    <div className="px-1 md:px-2 min-w-[20px] md:min-w-[40px] bg-[#022c22] text-white flex items-center justify-center font-bold text-[9px] sm:text-[10px] md:text-xs lg:text-sm">
      {count}
    </div>
  </div>
));
StatusBox.displayName = "StatusBox";

const MapLegend = React.memo(({ stats }) => (
  <div className="mb-8 bg-[#022c22] p-2 md:p-3 rounded-2xl shadow-xl">
    <div className="grid grid-cols-2 lg:flex lg:flex-row items-center justify-center gap-1 md:gap-2">
      <StatusBox label="Total Plots" count={stats.total} isFullLabel />
      <StatusBox color="#22c55e" label="Available Plots" count={stats.available} isFullLabel />
      <StatusBox color="#e9d5ff" label="Mortgaged Plots" count={stats.mortgaged} isFullLabel />
      <StatusBox color="#f59e0b" label="Registered Plots" count={stats.registered} isFullLabel />
      <StatusBox color="#fef9c3" label="Reserved Plots" count={stats.reserved} isFullLabel />
      <StatusBox color="#ef4444" label="Booked Plots" count={stats.booked} isFullLabel />
    </div>
  </div>
));
MapLegend.displayName = "MapLegend";

const PlotPopup = React.memo(({ info, position, onClose, onReserveSuccess }) => {
  const [showReservationForm, setShowReservationForm] = useState(false);

  // Reset form state when a new plot is selected
  useEffect(() => {
    setShowReservationForm(false);
  }, [info?.plotNumber]);

  if (!info || !position) return null;

  return (
    <div className="absolute top-3 right-3 z-[1001] bg-white rounded-xl shadow-2xl p-4 border border-gray-100 w-[345px] animate-in fade-in slide-in-from-right-4 duration-300">
      <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <div className="mb-2 border-b border-gray-100 pb-2">
        <h3 className="font-playfair text-lg font-bold text-gray-900">Plot: {info.plotNumber}</h3>
      </div>
      {info.loading ? (
        <div className="text-gray-500 text-sm animate-pulse py-2">Loading details...</div>
      ) : (
        <div className="space-y-2 text-sm">
          {info.customerName && (
            <div className="flex justify-between items-center py-2 bg-gray-50/50 -mx-2 px-2 rounded-xl border border-gray-100/50 shadow-sm mb-2 scale-[1.02] transition-transform">
              <span className="text-gray-500 capitalize text-[11px] font-black tracking-widest">
                {info.status === "registered" ? "Registered By:" : info.status === "booked" ? "Booked By:" : info.status === "reserved" ? "Reserved By:" : `${info.status} By:`}
              </span>
              <span className="font-extrabold text-[#1B4332] capitalize text-base">{info.customerName}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-500 text-xs">Plot Area:</span>
            <span className="font-bold text-gray-900">{info.area} Sq.Ft & {info.areaCents} Cents</span>
          </div>
          <div className="grid grid-cols-2 gap-2 py-2 border-y border-gray-50 my-1">
            {['East', 'West', 'North', 'South'].map(dir => (
              <div key={dir} className="flex flex-col">
                <span className="text-[10px] text-gray-400 uppercase font-bold">{dir}</span>
                <span className="font-bold text-gray-900">{info[dir.toLowerCase()] || 0} ft</span>
              </div>
            ))}
          </div>
          {info.road && (
            <div className="flex justify-between items-center py-1">
              <span className="text-gray-500 text-xs">Road Access:</span>
              <span className="font-bold text-gray-900 text-sm">{info.road}</span>
            </div>
          )}
          <div className="flex justify-between items-center py-1">
            <span className="text-gray-500 text-xs">Facing Direction:</span>
            <span className="font-bold text-gray-900 capitalize text-sm">{info.facing}</span>
          </div>
          <div className="flex justify-between items-center border-t border-gray-100 mt-2 pt-3 py-1">
            <span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Plot Status:</span>
            <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm
              ${info.status === "available" ? "bg-green-100 text-green-800 border-green-200" :
                info.status === "booked" ? "bg-red-100 text-red-800 border-red-200" :
                  info.status === "mortgaged" ? "bg-purple-100 text-purple-800 border-purple-200" :
                    info.status === "registered" ? "bg-amber-100 text-amber-800 border-amber-200" :
                      info.status === "reserved" ? "bg-yellow-100 text-yellow-800 border-yellow-200" :
                        "bg-gray-100 text-gray-800 border-gray-200"}`}>
              {info.status || "Unknown"}
            </span>
          </div>

          {info.status === "available" && (
            <button
              onClick={() => setShowReservationForm(true)}
              className="w-full mt-3 py-2.5 bg-[#1B4332] text-white text-xs font-bold rounded-xl hover:bg-[#133024] transition-all shadow-md active:scale-[0.98]"
            >
              Reserve Plot (24 Hours)
            </button>
          )}

        </div>
      )}

      {/* Reservation Form Modal Overlay */}
      {showReservationForm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm shadow-2xl">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative animate-in zoom-in duration-200">
            <ReservationForm
              plotNumber={info.plotNumber}
              projectSlug={info.projectSlug || "ugadi-ventures"}
              onCancel={() => setShowReservationForm(false)}
              onSubmit={(updatedData) => {
                setShowReservationForm(false);
                onReserveSuccess(updatedData);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
});
PlotPopup.displayName = "PlotPopup";

// --- Main Component ---

export default function LeafletVentureMap({ projectSlug = "ugadi-ventures" }) {
  const [geoData, setGeoData] = useState({ plots: null, roads: null, compounds: null, footpaths: null });
  const [plotsDB, setPlotsDB] = useState([]);
  const [mapBounds, setMapBounds] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);
  const [popupPosition, setPopupPosition] = useState(null);
  const [selectedPlotNo, setSelectedPlotNo] = useState(null);

  // Optimization: Lookup Map for DB records
  const plotsLookup = useMemo(() => {
    const map = new Map();
    plotsDB.forEach(p => map.set(String(p.plotNumber), p));
    return map;
  }, [plotsDB]);

  useEffect(() => {
    const controller = new AbortController();
    async function init() {
      try {
        await fetch(`/api/plots/sync?projectSlug=${projectSlug}`, { method: "POST", signal: controller.signal });

        const [dbRes, mapRes] = await Promise.all([
          fetch(`/api/plots?projectSlug=${projectSlug}`, { signal: controller.signal }),
          fetch(`/api/map-data?projectSlug=${projectSlug}`, { signal: controller.signal })
        ]);

        const [dbJson, mapJson] = await Promise.all([dbRes.json(), mapRes.json()]);

        if (dbJson.success) setPlotsDB(dbJson.data);
        if (mapJson.success) {
          setGeoData(mapJson.data);
          if (mapJson.data.plots?.features?.length > 0) {
            setMapBounds(L.geoJSON(mapJson.data.plots).getBounds());
          }
        }
      } catch (err) {
        if (err.name !== 'AbortError') console.error("Map Load Error:", err);
      }
    }
    init();
    return () => controller.abort();
  }, [projectSlug]);

  // Memoized Styling Functions
  const styleRoads = useCallback((feature) => ({
    color: feature.properties.stroke || "#000000",
    weight: feature.properties["stroke-width"] || 12,
    fillColor: feature.properties.fill || "#000000",
    fillOpacity: feature.properties["fill-opacity"] || 1,
  }), []);

  const styleCompounds = useCallback((feature) => ({
    color: feature.properties.stroke || "#000000",
    weight: 3,
  }), []);

  const styleFootpaths = useCallback(() => ({
    color: "#ffffff",
    weight: 1,
    fillColor: "#ffffff",
    fillOpacity: 1,
  }), []);

  const stylePlots = useCallback((feature) => {
    const plotNumber = String(feature.properties.plot_no || feature.properties.name || "").replace(/[^0-9]/g, "");
    const dbRecord = plotsLookup.get(plotNumber);
    const status = dbRecord?.status?.toLowerCase() || "available";

    let fillColor = "#22c55e"; // default green
    if (status === "booked") fillColor = "#ef4444";
    else if (status === "mortgaged") fillColor = "#e9d5ff";
    else if (status === "registered") fillColor = "#f59e0b";
    else if (status === "reserved") fillColor = "#fef9c3";

    const isSelected = selectedPlotNo === plotNumber;
    return {
      fillColor,
      color: isSelected ? "#ffffff" : (feature.properties.stroke || "#000000"),
      weight: isSelected ? 4 : (feature.properties["stroke-width"] || 2),
      fillOpacity: isSelected ? 1.0 : (feature.properties["fill-opacity"] || 1),
    };
  }, [plotsLookup, selectedPlotNo]);

  const onEachPlot = useCallback((feature, layer) => {
    const plotNumber = String(feature.properties.plot_no || feature.properties.name || "").replace(/[^0-9]/g, "");

    if (plotNumber) {
      layer.bindTooltip(plotNumber, {
        permanent: true, direction: "center", className: "plot-number-tooltip", opacity: 0.9
      });
    }

    layer.on({
      mouseover: (e) => {
        e.target.setStyle({ weight: 3, fillOpacity: 0.9, color: "#ffffff" });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) e.target.bringToFront();
      },
      mouseout: (e) => e.target.setStyle(stylePlots(feature)),
      click: async (e) => {
        const target = e.target;
        setSelectedPlotNo(plotNumber);
        target.bringToFront();

        const center = target.getBounds().getCenter();
        setPopupPosition([center.lat, center.lng]);

        const dbRecord = plotsLookup.get(plotNumber);
        const customerArray = dbRecord?.customer || dbRecord?.customers || [];
        const customerName = Array.isArray(customerArray)
          ? customerArray.map(c => c.name).filter(Boolean).join(" & ")
          : "";

        setPopupInfo({
          loading: true, plotNumber, projectSlug,
          area: dbRecord?.areaSqFt || feature.properties.area || "Unknown",
          areaCents: dbRecord?.areaCents || "Unknown",
          east: dbRecord?.east || 0, west: dbRecord?.west || 0,
          north: dbRecord?.north || 0, south: dbRecord?.south || 0,
          status: dbRecord?.status || "available",
          facing: dbRecord?.facing || "Unknown",
          road: dbRecord?.road || "N/A",
          customerName
        });

        try {
          const res = await fetch(`/api/plots/${plotNumber}?projectSlug=${projectSlug}`);
          const json = await res.json();
          if (json.success) {
            const freshCustomers = json.data.customer || json.data.customers || [];
            setPopupInfo(prev => ({
              ...prev, loading: false,
              ...json.data,
              customerName: Array.isArray(freshCustomers)
                ? freshCustomers.map(c => c.name).filter(Boolean).join(" & ")
                : ""
            }));
          } else {
            setPopupInfo(prev => ({ ...prev, loading: false }));
          }
        } catch (error) {
          setPopupInfo(prev => ({ ...prev, loading: false }));
        }
      }
    });
  }, [plotsLookup, projectSlug, stylePlots]);

  const stats = useMemo(() => ({
    total: plotsDB.length,
    available: plotsDB.filter(p => p.status === "available").length,
    mortgaged: plotsDB.filter(p => p.status === "mortgaged").length,
    registered: plotsDB.filter(p => p.status === "registered").length,
    reserved: plotsDB.filter(p => p.status === "reserved").length,
    booked: plotsDB.filter(p => p.status === "booked").length,
  }), [plotsDB]);

  if (!geoData.plots) {
    return (
      <div className="w-full h-[500px] bg-gray-50 flex items-center justify-center animate-pulse rounded-2xl border border-gray-200">
        <div className="text-gray-400 font-medium">Loading Map Data...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full mt-12">
      <MapLegend stats={stats} />

      <div className="relative w-full shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white p-2">
        <div className="w-full h-[450px] rounded-xl overflow-hidden relative">
          <MapContainer
            center={[15.724, 77.813]}
            zoom={16}
            style={{ width: "100%", height: "100%" }}
            preferCanvas={true}
          >
            {mapBounds && <FitBounds bounds={mapBounds} />}
            {mapBounds && <HomeButton bounds={mapBounds} />}

            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Satellite Map (Esri)">
                <TileLayer
                  attribution='&copy; Esri'
                  url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                  maxZoom={22} maxNativeZoom={18}
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="OpenStreetMap">
                <TileLayer
                  attribution='&copy; OpenStreetMap'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  maxZoom={22} maxNativeZoom={19}
                />
              </LayersControl.BaseLayer>

              {geoData.compounds && (
                <Overlay checked name="Compound Boundary">
                  <GeoJSON data={geoData.compounds} style={styleCompounds} />
                </Overlay>
              )}

              {geoData.plots && (
                <Overlay checked name="Plots">
                  <GeoJSON
                    key={`plots-${plotsDB.length}-${selectedPlotNo}`}
                    data={geoData.plots}
                    style={stylePlots}
                    onEachFeature={onEachPlot}
                  />
                </Overlay>
              )}

              {geoData.roads && (
                <Overlay checked name="Roads">
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

          <PlotPopup
            info={popupInfo}
            position={popupPosition}
            onClose={() => setPopupInfo(null)}
            onReserveSuccess={(updatedData) => {
              // Instantly update the Local UI with the newly reserved plot without a hard refresh
              const freshNum = updatedData.plotNumber;

              // Update Plots DB cache
              setPlotsDB(prev => {
                const exists = prev.find(p => p.plotNumber === freshNum);
                if (exists) {
                  return prev.map(p => p.plotNumber === freshNum ? { ...p, ...updatedData } : p);
                }
                return [...prev, updatedData];
              });

              // Update the popup open info
              setPopupInfo(prev => ({
                ...prev,
                ...updatedData,
                customerName: updatedData.customer?.[0]?.name || updatedData.customerName || "You (Reserved)",
              }));

              alert(`Plot ${freshNum} has been successfully reserved for 24 hours!`);
            }}
          />
        </div>
      </div>

      <style jsx global>{`
        .plot-number-tooltip {
          background: transparent !important; border: none !important; box-shadow: none !important;
          color: #000000 !important; font-weight: 800 !important; font-size: 10px !important;
          text-shadow: 1px 1px 0px rgba(255, 255, 255, 0.8), -1px -1px 0px rgba(255, 255, 255, 0.8) !important;
          pointer-events: none !important;
        }
        .leaflet-tooltip-pane { z-index: 650; }
      `}</style>
    </div>
  );
}
