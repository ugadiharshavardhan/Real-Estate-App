"use client";

import { motion } from "framer-motion";

const GridItem = ({ children, index, type = "text" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className={`relative min-h-[300px] md:min-h-[350px] flex rounded-xl overflow-hidden ${
        type === "text"
          ? "bg-white shadow-xl p-8 md:p-10 flex-col justify-center text-center border border-gray-100"
          : "shadow-lg group"
      }`}
    >
      {children}
    </motion.div>
  );
};

export default function OurStory() {
  const gridItems = [
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop",
      alt: "Soil in hands symbolizing land",
    },
    {
      type: "text",
      title: "Land Ownership",
      content:
        "We believe that land is the ultimate foundation of wealth and security. Our philosophy is rooted in the belief that every individual deserves the chance to own a piece of the earth, providing a stable legacy for future generations.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&auto=format&fit=crop",
      alt: "Modern real estate development",
    },
    {
      type: "text",
      title: "Vision & Legacy",
      content:
        "In the heart of dynamic landscapes, we stand with a unique vision. We don't just build structures; we craft legacies of trust, quality, and architectural excellence that stand the test of time and inspire growth.",
    },
    {
      type: "image",
      src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&auto=format&fit=crop",
      alt: "Father walking with child in a green community",
    },
    {
      type: "text",
      title: "Sustainable Prosperity",
      content:
        "Education, prosperity, and sustainable communities go hand in hand. We strive to create environments that nurture growth, foster learning, and promote a balanced lifestyle centered around nature and modern convenience.",
    },
  ];

  return (
    <section
      className="py-16 md:py-24 bg-[#f8f8f6] flex flex-col justify-center"
      id="our-story"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[10px] md:text-xs font-black uppercase tracking-[0.3em] text-[#1B4332] mb-4 block"
          >
            Since 2012
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-playfair font-bold text-gray-900 mb-6"
          >
            The Heart of Our Story
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="w-24 h-1.5 bg-[#1B4332] mx-auto rounded-full"
          />
        </div>

        {/* Grid Layout: 1 Column Mobile, 2 Tablets, 3 Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {gridItems.map((item, idx) => (
            <GridItem key={idx} index={idx} type={item.type}>
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-playfair font-bold text-gray-900 mb-3 italic">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-gray-600 font-inter leading-relaxed">
                    {item.content}
                  </p>
                </>
              )}
            </GridItem>
          ))}
        </div>

        {/* Bottom Quote Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto py-10 px-6 md:px-12 bg-[#e6ece8] rounded-2xl text-center relative"
        >
          {/* Decorative Quote Marks */}
          <span className="absolute left-2 top-4 text-6xl md:text-7xl text-[#C5A059] opacity-30 font-serif leading-none italic">
            &ldquo;
          </span>
          <span className="absolute right-2 bottom-2 text-6xl md:text-7xl text-[#C5A059] opacity-30 font-serif leading-none italic">
            &rdquo;
          </span>

          <div className="relative z-10">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-playfair text-gray-800 leading-relaxed italic">
              In the heart of India&apos;s dynamic real estate landscape stands
              a brand with a unique vision &mdash; a vision rooted in the belief
              that every man should own a land, for it is the truest foundation
              of a legacy.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
