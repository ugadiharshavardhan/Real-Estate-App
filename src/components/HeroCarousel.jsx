"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HeroCarousel({ projects = [] }) {
  const staticSlides = [
    {
      id: "static-1",
      image:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80&auto=format&fit=crop",
      headline: "Building Tomorrow's Landmarks",
      sub: "Premium real estate developments across prime locations.",
      link: "#our-projects",
    },
    {
      id: "static-2",
      image:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format&fit=crop",
      headline: "Invest in Locations That Grow",
      sub: "Smart plotted communities with long-term appreciation.",
      link: "#our-projects",
    },
    {
      id: "static-3",
      image:
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80&auto=format&fit=crop",
      headline: "Unparalleled Luxury Living",
      sub: "Modern high-rise apartment towers designed for exclusivity.",
      link: "#our-projects",
    },
  ];

  // Map real database projects to slides if they exist
  const projectSlides = projects.slice(0, 5).map((p) => ({
    id: p._id,
    image: p.heroImage,
    headline: p.name,
    sub:
      p.tagline ||
      p.description?.substring(0, 100) + "..." ||
      "Premium development.",
    link: `/projects/${p.slug}`,
  }));

  const slides = projectSlides.length > 0 ? projectSlides : staticSlides;

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#1B4332]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
          />

          {/* Left-to-Right Gradient Overlay */}
          <div className="absolute left-0 top-0 h-full w-2/3 bg-linear-to-r from-black/85 via-black/60 to-transparent" />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full h-full flex items-end py-10 px-6 md:px-16 mx-auto">
            <div className="text-left max-w-4xl">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
                className="text-4xl md:text-6xl lg:text-7xl font-playfair text-white font-bold leading-tight mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.6)]"
              >
                {slides[currentIndex].headline}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 1, ease: "easeInOut" }}
                className="text-lg md:text-xl text-gray-200 font-inter mb-10 max-w-[600px]"
              >
                {slides[currentIndex].sub}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 1, ease: "easeInOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link
                  href={slides[currentIndex].link}
                  className="px-8 py-3 bg-[#1B4332] text-white font-medium rounded-full hover:bg-green-900 transition-colors flex items-center justify-center gap-2 group"
                >
                  Explore Projects
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/#contact"
                  className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-colors text-center"
                >
                  Contact Us
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dot Indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? "bg-[#1B4332] w-8"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
