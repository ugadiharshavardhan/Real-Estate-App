"use client";

import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDevelopment() {
    const scrollRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const devImages = [
        {
            url: "/development/road_marker.png",
            title: "Internal Roads",
            status: "100% Completed"
        },
        {
            url: "/development/footpath_tiles.png",
            title: "Checkered Tiles Footpath",
            status: "Completed"
        },
        {
            url: "/development/avenue_plantation.png",
            title: "Avenue Plantation",
            status: "90% Completed"
        },
        {
            url: "/development/green_strip.png",
            title: "Landscape Greenery",
            status: "Ongoing"
        },
        {
            url: "/development/entrance_gate.png",
            title: "Designer Entrance Gate",
            status: "Final Stages"
        }
    ];

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left"
                ? scrollLeft - clientWidth / 2
                : scrollLeft + clientWidth / 2;

            scrollRef.current.scrollTo({
                left: scrollTo,
                behavior: "smooth"
            });
        }
    };

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setShowLeftArrow(scrollLeft > 20);
            setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 20);
        }
    };

    return (
        <section id="project-development" className="py-24 bg-[#F8FAF9]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-playfair font-black text-[#1B4332] mb-4">
                        Project Development
                    </h2>
                    <div className="flex justify-center">
                        <svg width="60" height="8" viewBox="0 0 60 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 6C4.5 6 7 2 10.5 2C14 2 16.5 6 20 6C23.5 6 26 2 29.5 2C33 2 35.5 6 39 6C42.5 6 45 2 48.5 2C52 2 54.5 6 58 6" stroke="#1B4332" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </div>
                </div>

                <div className="relative group">
                    {/* Navigation Buttons */}
                    {showLeftArrow && (
                        <button
                            onClick={() => scroll("left")}
                            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#1B4332] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300"
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {showRightArrow && (
                        <button
                            onClick={() => scroll("right")}
                            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-[#1B4332] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-all duration-300"
                        >
                            <ChevronRight size={24} />
                        </button>
                    )}

                    {/* Scrollable Area */}
                    <div
                        ref={scrollRef}
                        onScroll={handleScroll}
                        className="flex overflow-x-auto gap-6 pb-12 hide-scrollbar snap-x snap-mandatory"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {devImages.map((img, idx) => (
                            <div
                                key={idx}
                                className="min-w-[280px] md:min-w-[320px] aspect-[4/5] relative rounded-[2rem] overflow-hidden shadow-md snap-start group"
                            >
                                <img
                                    src={img.url}
                                    alt={img.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#1B4332]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                    <span className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1">{img.status}</span>
                                    <h3 className="text-white text-xl font-bold font-playfair">{img.title}</h3>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
