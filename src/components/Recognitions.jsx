"use client";

import { useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Counter({ from, to, duration, suffix = "" }) {
  const nodeRef = useRef(null);
  const inView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / (duration * 1000),
        1,
      );

      const current = Math.floor(progress * (to - from) + from);
      if (nodeRef.current) {
        nodeRef.current.textContent = current.toLocaleString() + suffix;
      }

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        if (nodeRef.current) {
          nodeRef.current.textContent = to.toLocaleString() + suffix;
        }
      }
    };

    window.requestAnimationFrame(step);
  }, [inView, from, to, duration, suffix]);

  return (
    <span
      ref={nodeRef}
      className="font-playfair text-4xl md:text-5xl font-bold text-[#1B4332]"
    >
      {from}
      {suffix}
    </span>
  );
}

export default function Recognitions({ projectsCount = 25 }) {
  const stats = [
    {
      value: projectsCount > 0 ? projectsCount +1 : 25,
      suffix: "+",
      label: "Projects Delivered",
    },
    { value: 100, suffix: "+", label: "Happy Customers" },
    { value: 1000, suffix: "+", label: "Sq Ft Developed" },
    { value: 2, suffix: "", label: "Cities Experience" },
  ];

  const awards = [
    "“Best Emerging Developer 2024” – Realty Excellence Awards",
    "“Top 10 Plotted Development Brand” – South India Realty Summit",
    "ISO 9001:2015 Certified Company",
    "15+ Years of Excellence in Real Estate",
  ];

  return (
    <section className="py-24 bg-[#F0FDF4]" id="recognitions">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
          >
            Recognitions & Achievements
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-[#1B4332] mx-auto"
          />
        </div>

        {/* Counters */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center"
            >
              <Counter
                from={0}
                to={stat.value}
                duration={2}
                suffix={stat.suffix}
              />
              <p className="text-sm md:text-base font-inter text-gray-600 mt-2 font-medium uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Awards Glass Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {awards.map((award, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -5 }}
              className="bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(197,160,89,0.1)] transition-all flex items-center justify-center text-center min-h-[160px]"
            >
              <p className="font-playfair text-lg text-gray-800 leading-relaxed font-medium">
                {award}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
