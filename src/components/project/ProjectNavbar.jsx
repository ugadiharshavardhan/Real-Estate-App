"use client";

import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectNavbar({ layoutSvg }) {
    const [isSticky, setIsSticky] = useState(false);
    const [activeSection, setActiveSection] = useState("");

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
        }
    };

    return (
        <nav
            className={`${isSticky
                ? "fixed top-0 left-0 right-0 z-[100] bg-white/98 shadow-xl py-4"
                : "bg-white border-b border-gray-100 py-6"
                } transition-all duration-500 px-6`}
        >
            <div className="max-w-7xl mx-auto flex flex-row items-center justify-center gap-8 lg:gap-12">
                {/* Navigation Links */}
                <div className="flex items-center justify-center gap-x-6 lg:gap-x-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleScroll(e, link.href)}
                            className={`relative whitespace-nowrap text-[11px] lg:text-sm font-bold transition-all duration-300 uppercase tracking-wider ${activeSection === link.id ? "text-green-800" : "text-gray-400 hover:text-gray-900"
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

                {/* Download Button */}
                <div className="flex items-center">
                    <a
                        href={layoutSvg || "#"}
                        download={layoutSvg ? layoutSvg.split('/').pop() : "layout.svg"}
                        className="flex items-center justify-center gap-2 bg-green-800 text-white px-6 py-3 rounded-full text-[11px] lg:text-sm font-black hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl group tracking-widest whitespace-nowrap"
                    >
                        <Download size={18} className="group-hover:animate-bounce" />
                        <span>DOWNLOAD LAYOUT</span>
                    </a>
                </div>
            </div>
        </nav>
    );
}
