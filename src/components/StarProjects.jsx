"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { mockProjects } from "../data/projects";
import { ChevronLeft, ChevronRight, mapPin } from "lucide-react";
import Link from "next/link";

export default function StarProjects() {
  const carouselRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, []);

  const slideLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: "smooth" });
    }
  };

  const slideRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-white overflow-hidden" id="our-projects">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
            >
              Star Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 font-inter max-w-xl"
            >
              Discover our signature developments that redefine luxury and set
              new benchmarks in premium real estate.
            </motion.p>
          </div>

          <div className="flex gap-4 mt-6 md:mt-0">
            <button
              onClick={slideLeft}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] transition-all"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={slideRight}
              className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1B4332] hover:text-white hover:border-[#1B4332] transition-all"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Carousel */}
        <motion.div
          ref={carouselRef}
          className="flex overflow-x-hidden snap-x snap-mandatory hide-scrollbar gap-8 pb-8 cursor-grab active:cursor-grabbing"
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className="flex gap-8"
          >
            {mockProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="min-w-[300px] md:min-w-[400px] bg-white rounded-2xl overflow-hidden group hover:shadow-2xl transition-shadow duration-500 border border-gray-100 flex-shrink-0 snap-start relative"
              >
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden">
                  <motion.div
                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${project.images[0]})` }}
                  />
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-gray-800 shadow-sm">
                    {project.status.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-2 group-hover:text-[#1B4332] transition-colors">
                    {project.name}
                  </h3>
                  <div className="flex items-center text-gray-500 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      {project.location}
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                        Starting From
                      </p>
                      <p className="font-bold text-gray-900 text-lg">
                        {project.priceInfo}
                      </p>
                    </div>
                    <Link href={`/projects/${project.slug}`} className="text-sm font-medium text-[#1B4332] hover:text-[#9e7f43] transition-colors underline underline-offset-4">
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
