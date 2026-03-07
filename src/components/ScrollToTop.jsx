"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    // Show button when page is scrolled down
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    // Set the top cordinate to 0
    // make scrolling smooth
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    group flex items-center justify-center
                    w-12 h-12 rounded-full
                    bg-[#1B4332] text-white
                    shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                    hover:bg-[#2d5a44] hover:scale-110
                    active:scale-95
                    transition-all duration-500 ease-out
                    ${isVisible ? "translate-y-0 opacity-100 scale-100" : "translate-y-16 opacity-0 scale-50 pointer-events-none"}
                `}
                aria-label="Scroll to top"
            >
                <ChevronUp
                    className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1"
                    strokeWidth={2.5}
                />
            </button>
        </div>
    );
}
