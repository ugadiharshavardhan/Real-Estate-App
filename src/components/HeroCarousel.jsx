"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCarousel({ projects = [] }) {
  const staticSlides = [
    {
      id: "promo-1",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80&auto=format&fit=crop",
      headline: "Building Tomorrow's Landmarks",
      sub: "Premium real estate developments across prime locations with modern amenities and sustainable design.",
      link: "#our-projects",
    },
    {
      id: "promo-2",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80&auto=format&fit=crop",
      headline: "Invest in Your Future",
      sub: "Smart plotted communities in high-growth areas, designed for long-term appreciation and prosperity.",
      link: "#contact",
    },
    {
      id: "promo-3",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1920&q=80&auto=format&fit=crop",
      headline: "Excellence in Every Detail",
      sub: "Over a decade of trust and quality, crafting legacies through unparalleled architectural vision.",
      link: "/#our-story",
    },
  ];

  // Map exactly ONE slide per project
  const projectSlides = useMemo(() => {
    if (!projects || projects.length === 0) return [];
    
    return projects.map((p) => ({
      id: `${p._id}-unique`,
      image: p.heroImage,
      headline: p.name,
      sub: p.tagline || p.description?.substring(0, 100).trim() + "..." || "Premium development.",
      link: `/projects/${p.slug}`,
    }));
  }, [projects]);

  // Combine project slides with static promotional slides
  const slides = useMemo(() => {
    const combined = [...projectSlides];
    
    // Interleave or append promotional slides if we have projects
    if (projectSlides.length > 0) {
      // Interleave promo slides after every 1-2 projects for variety
      staticSlides.forEach((promo, idx) => {
        const insertAt = (idx + 1) * 2 - 1;
        if (insertAt < combined.length) {
          combined.splice(insertAt, 0, promo);
        } else {
          combined.push(promo);
        }
      });
      return combined;
    }
    
    return staticSlides;
  }, [projectSlides]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 8000); // Slower transition for better visibility
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-screen overflow-hidden bg-black group">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image using next/image for maximum clarity */}
          <Image
            src={slides[currentIndex].image}
            alt={slides[currentIndex].headline}
            fill
            priority
            className="object-cover scale-100"
            sizes="100vw"
            quality={100}
          />

          {/* Adjusted Gradient Overlay - Lighter for better image visibility */}
          <div className="absolute left-0 top-0 h-full w-full md:w-3/4 bg-linear-to-r from-black/60 via-black/20 to-transparent z-1" />

          {/* Content Wrapper */}
          <div className="relative z-10 w-full h-full flex items-end pb-28 pt-10 px-4 md:px-10">
            <div className="text-left max-w-4xl">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-playfair text-white font-bold leading-tight mb-4 md:mb-6 drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
              >
                {slides[currentIndex].headline}
              </motion.h1>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 font-inter mb-8 md:mb-10 max-w-[600px] drop-shadow-md"
              >
                {slides[currentIndex].sub}
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-row gap-3 md:gap-4"
              >
                <Link
                  href={slides[currentIndex].link}
                  className="px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-base bg-[#1B4332] text-white font-medium rounded-full hover:bg-green-900 transition-all hover:scale-105 flex items-center justify-center gap-2 group/btn"
                >
                  Explore Now
                  <ArrowRight
                    size={16}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </Link>
                <Link
                  href="/#contact"
                  className="px-5 py-2.5 md:px-8 md:py-3 text-xs md:text-base bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 transition-all hover:scale-105 text-center"
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
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex
              ? "bg-white w-8"
              : "bg-white/40 hover:bg-white/70"
              }`}
          />
        ))}
      </div>
    </div>
  );
}
