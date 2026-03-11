"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectNavbar({ layoutSvg }) {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("");

    const [isMobileOpen, setIsMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsSticky(window.scrollY > 500);
        };

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        const sections = [
            "plot-availability",
            "project-info",
            "payment-option",
            "amenities",
            "project-development",
            "location-highlights",
        ];

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    const navLinks = [
        { name: "Online Plot Availability", href: "#plot-availability", id: "plot-availability" },
        { name: "Project Info", href: "#project-info", id: "project-info" },
        { name: "Payment Option", href: "#payment-option", id: "payment-option" },
        { name: "Amenities", href: "#amenities", id: "amenities" },
        { name: "Project Development", href: "#project-development", id: "project-development" },
        { name: "Location Highlights", href: "#location-highlights", id: "location-highlights" },
    ];

    const handleScroll = (e, href) => {
        e.preventDefault();
        const id = href.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
            setIsMobileOpen(false);
        }
    };

    return (
        <>
            <nav
                className={`${isSticky
                    ? "fixed top-0 left-0 right-0 z-50 bg-white/10 backdrop-blur-md border-b border-white/30 shadow-xl py-3 md:py-4"
                    : "relative z-40 bg-white border-b border-gray-100 py-4 md:py-6"
                    } transition-all duration-500 px-4 sm:px-6`}
            >
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-between lg:justify-center gap-4 lg:gap-12 w-full">
                
                {/* Mobile View Header*/}
                <div className="flex items-center justify-between w-full lg:hidden">
                    <span className="text-xs sm:text-sm font-bold text-gray-800 uppercase tracking-wider truncate mr-4">
                        {navLinks.find(link => link.id === activeSection)?.name || "Project Menu"}
                    </span>
                    <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="p-2 text-gray-800 border rounded hover:bg-gray-50 shrink-0">
                        {/* Custom Hamburger Icon if lucide is not explicitly imported for this, but wait, lucide-react Menu isn't imported here? Let's use pure SVG to avoid import issues or just import Menu. I'll use pure SVG: */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {isMobileOpen ? (
                                <>
                                    <line x1="18" y1="6" x2="6" y2="18"></line>
                                    <line x1="6" y1="6" x2="18" y2="18"></line>
                                </>
                            ) : (
                                <>
                                    <line x1="3" y1="12" x2="21" y2="12"></line>
                                    <line x1="3" y1="6" x2="21" y2="6"></line>
                                    <line x1="3" y1="18" x2="21" y2="18"></line>
                                </>
                            )}
                        </svg>
                    </button>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex flex-1 items-center justify-center gap-x-6 lg:gap-x-8 xl:gap-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className={`relative whitespace-nowrap text-xs xl:text-sm font-bold transition-all duration-300 uppercase tracking-wider ${activeSection === link.id ? "text-green-800" : "text-gray-400 hover:text-gray-900"
                                }`}
                        >
                            {link.name}
                            {activeSection === link.id && (
                                <motion.div
                                    layoutId="activeUnderlineProject"
                                    className="absolute -bottom-2 left-0 right-0 h-[3px] bg-green-800 rounded-full"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </a>
                    ))}
                </div>

                {/* Desktop Download Button */}
                <div className="hidden lg:flex items-center">
                    <a
                        href={layoutSvg || "#"}
                        download={layoutSvg ? layoutSvg.split('/').pop() : "layout.svg"}
                        className="flex items-center justify-center gap-2 bg-green-800 text-white px-5 xl:px-6 py-2 xl:py-3 rounded-full text-xs xl:text-sm font-black hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl group tracking-widest whitespace-nowrap"
                    >
                        <Download size={18} className="group-hover:animate-bounce" />
                        <span>DOWNLOAD LAYOUT</span>
                    </a>
                </div>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isMobileOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className={`lg:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 sm:left-auto sm:right-6 sm:w-80 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.3)] border flex flex-col py-6 px-6 z-50 ${
                            isSticky 
                                ? "bg-black/60 backdrop-blur-2xl border-white/20"
                                : "bg-white/95 backdrop-blur-xl border-gray-200"
                        }`}
                    >
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={(e) => handleScroll(e, link.href)}
                                    className={`text-sm font-bold uppercase tracking-wider pb-2 border-b transition-colors ${
                                        isSticky 
                                            ? (activeSection === link.id ? "text-green-400 border-white/10" : "text-white/80 border-white/10 hover:text-white")
                                            : (activeSection === link.id ? "text-green-800 border-gray-100" : "text-gray-600 border-gray-100 hover:text-gray-900")
                                    }`}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                        <div className="pt-6">
                            <a
                                href={layoutSvg || "#"}
                                download={layoutSvg ? layoutSvg.split('/').pop() : "layout.svg"}
                                className={`flex items-center justify-center gap-2 px-6 py-3 w-full rounded-lg text-sm font-bold shadow-lg transition-colors ${
                                    isSticky ? "bg-white/10 text-white hover:bg-white/20" : "bg-green-800 text-white hover:bg-black"
                                }`}
                            >
                                <Download size={18} />
                                <span>DOWNLOAD LAYOUT</span>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>

        {/* Screen Overlay */}
        <AnimatePresence>
            {isMobileOpen && (
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="fixed inset-0 bg-transparent z-40 lg:hidden" 
                    onClick={() => setIsMobileOpen(false)}
                />
            )}
        </AnimatePresence>
    </>
    );
}
