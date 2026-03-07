"use client";

import { useState, useEffect, useRef } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import plotData from "../data/plotData.json";

export default function VentureMap() {
  const [svgContent, setSvgContent] = useState("");
  const [hoveredPlot, setHoveredPlot] = useState(null);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);

  useEffect(() => {
    // Need to correctly URL encode the path containing spaces
    fetch("/PYALAKURTI%20%20VENTURE%20LAYOUT.svg")
      .then((res) => res.text())
      .then((text) => {
        setSvgContent(text);
      })
      .catch((err) => console.error("Error loading SVG:", err));
  }, []);

  const handleMouseMove = (e) => {
    const target = e.target;
    if (target.tagName === "path") {
      const id = target.getAttribute("id");
      // Extract plot number from semantic ID (e.g., "plot-1" -> 1)
      if (id && id.startsWith("plot-")) {
        const plotNumber = parseInt(id.replace("plot-", ""), 10);
        // plotData.number is a string in the JSON
        const plot = plotData.find((p) => p.number === String(plotNumber));

        if (plot) {
          setHoveredPlot(plot);
          setTooltipPos({ x: e.clientX, y: e.clientY });
          target.style.cursor = "pointer";
          return;
        }
      }
    }
    setHoveredPlot(null);
  };

  const handleMouseClick = (e) => {
    // If we have a hovered plot (from mouse move), select it
    if (hoveredPlot) {
      setSelectedPlot(hoveredPlot);
      return;
    }

    // Fallback: check the target of the click directly
    const target = e.target;
    if (target.tagName === "path") {
      const id = target.getAttribute("id");
      if (id && id.startsWith("plot-")) {
        const plotNumber = parseInt(id.replace("plot-", ""), 10);
        const plot = plotData.find((p) => p.number === String(plotNumber));
        if (plot) {
          setSelectedPlot(plot);
          return;
        }
      }
    }

    // If clicked elsewhere, close the popup
    setSelectedPlot(null);
  };

  return (
    <div className="relative w-full h-[600px] border border-gray-200 rounded-2xl overflow-hidden bg-[#fafafa] flex flex-col p-4">
      {svgContent ? (
        <TransformWrapper
          initialScale={1}
          minScale={0.5}
          maxScale={4}
          centerOnInit={true}
          wheel={{ step: 0.1 }} // Desktop Scroll zoom
          pinch={{ step: 5 }} // Mobile Pinch zoom
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
              {/* Map UI Controls */}
              <div className="absolute top-6 left-6 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-gray-100">
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-[#1B4332] rounded-lg shadow-sm border border-gray-100 transition-colors"
                  onClick={() => zoomIn()}
                  title="Zoom In"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-[#1B4332] rounded-lg shadow-sm border border-gray-100 transition-colors"
                  onClick={() => zoomOut()}
                  title="Zoom Out"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </button>
                <button
                  className="w-10 h-10 flex items-center justify-center bg-white hover:bg-gray-50 text-[#1B4332] rounded-lg shadow-sm border border-gray-100 transition-colors mt-2"
                  onClick={() => resetTransform()}
                  title="Reset Map"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </button>
              </div>

              <TransformComponent wrapperClass="!w-full !h-full rounded-xl bg-white shadow-inner overflow-hidden cursor-move">
                <div
                  ref={containerRef}
                  className="w-full h-full [&>svg]:w-full [&>svg]:h-full [&>svg]:object-contain svg-interactive relative p-4"
                  dangerouslySetInnerHTML={{ __html: svgContent }}
                  onMouseMove={handleMouseMove}
                  onClick={handleMouseClick}
                />
              </TransformComponent>
            </>
          )}
        </TransformWrapper>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-gray-400 animate-pulse">
          <svg
            className="w-12 h-12 mb-4 animate-spin text-[#1B4332]"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="font-inter font-medium">Loading Interactive Map...</p>
        </div>
      )}

      {/* Tooltip for hover */}
      {hoveredPlot && (
        <div
          className="fixed z-50 pointer-events-none bg-white/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-xl border border-gray-100 transform -translate-x-1/2 -translate-y-full mt-[-10px] min-w-[180px] transition-opacity duration-200"
          style={{ left: tooltipPos.x, top: tooltipPos.y }}
        >
          <p className="font-playfair font-bold text-[#1B4332] text-lg mb-1 border-b border-gray-100 pb-1 flex justify-between items-center">
            Plot {hoveredPlot.number}
          </p>
          <div className="text-xs text-gray-600 space-y-1 mt-2">
            <p className="flex justify-between">
              <span>Area:</span>{" "}
              <span className="font-semibold text-gray-900">
                {hoveredPlot.areaSqFt} Sq.Ft
              </span>
            </p>
            <p className="flex justify-between">
              <span>Cents:</span>{" "}
              <span className="font-semibold text-gray-900">
                {hoveredPlot.areaCents}
              </span>
            </p>
            <p className="flex justify-between pt-1 border-t border-gray-50 mt-1">
              <span>Facing:</span>{" "}
              <span className="font-semibold text-[#1B4332]">
                {hoveredPlot.facing}
              </span>
            </p>
          </div>
        </div>
      )}

      {/* Selected Popup Panel */}
      {selectedPlot && (
        <div className="absolute top-4 right-4 z-40 bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 max-w-sm w-[300px] animate-in fade-in slide-in-from-right-8 duration-300">
          <button
            onClick={() => setSelectedPlot(null)}
            className="absolute top-4 right-4 text-gray-400 hover:bg-gray-100 p-1 rounded-full transition-colors"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div className="mb-4 flex gap-2">
            <span className="bg-green-100 text-green-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Available
            </span>
            <span className="bg-blue-50 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-blue-100">
              {selectedPlot.facing}
            </span>
          </div>
          <h3 className="font-playfair text-3xl font-bold text-gray-900 mb-2">
            Plot {selectedPlot.number}
          </h3>

          <div className="space-y-4 mt-6">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Total Area</span>
              <span className="font-bold text-gray-900">
                {selectedPlot.areaSqFt} Sq.Ft
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-500 text-sm">Measurement (Cents)</span>
              <span className="font-bold text-gray-900">
                {selectedPlot.areaCents}
              </span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-gray-100 text-sm">
              <span className="text-gray-500">Road Access</span>
              <span className="font-medium text-gray-900">
                33ft / 40ft Main Road
              </span>
            </div>

            <button className="w-full mt-6 bg-[#1B4332] hover:bg-[#133024] text-white py-3 rounded-xl font-medium transition-all shadow-lg shadow-[#1B4332]/20 flex items-center justify-center gap-2 group">
              <span>Book Plot</span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Global styles for SVG interaction */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
                .svg-interactive path, 
                .svg-interactive polygon, 
                .svg-interactive rect {
                  transition: all 0.2s ease;
                }
                /* Ensure text labels don't block interactions with paths */
                .svg-interactive text,
                .svg-interactive tspan {
                  pointer-events: none;
                }
                /* Plot highlight on hover */
                .svg-interactive path[id^="plot-"]:hover {
                  fill: rgba(27, 67, 50, 0.6) !important;
                  stroke: #1B4332 !important;
                  stroke-width: 2px !important;
                  stroke-opacity: 1 !important;
                  opacity: 1 !important;
                }
            `,
        }}
      />
    </div>
  );
}
