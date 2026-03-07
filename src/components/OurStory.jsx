"use client";

import { motion } from "framer-motion";

const GridItem = ({ children, index, type = "text" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className={`relative h-[250px] md:h-[28dvh] flex rounded-lg overflow-hidden ${
        type === "text"
          ? "bg-white shadow-md p-6 flex-col justify-center text-center"
          : "shadow-md group"
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
      className="py-12 md:py-16 bg-[#f5f5f3] min-h-dvh flex flex-col justify-center"
      id="our-story"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2"
          >
            Our Story
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-20 h-1 bg-[#1B4332] mx-auto"
          />
        </div>

        {/* Grid Layout: 3 Columns x 2 Rows */}
        <div className="grid md:grid-cols-3 gap-4 mb-12">
          {gridItems.map((item, idx) => (
            <GridItem key={idx} index={idx} type={item.type}>
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <>
                  <h3 className="text-lg font-playfair font-bold text-gray-900 mb-2 italic">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 font-inter text-xs leading-relaxed">
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
            <p className="text-lg md:text-xl font-playfair text-gray-800 leading-relaxed italic">
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
