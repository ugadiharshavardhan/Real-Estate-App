"use client";

import { motion } from "framer-motion";
import { mockTestimonials } from "../data/testimonials";
import { Star } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="py-16 md:py-24 bg-[#F0FDF4]" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4"
          >
            What People Say
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-[#1B4332] mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-sm sm:text-base md:text-lg text-gray-600 font-inter max-w-2xl mx-auto"
          >
            Hear from our satisfied customers who have experienced the
            unparalleled quality and commitment of our real estate projects.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mockTestimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300 relative border border-gray-100"
            >
              {/* Quote Mark */}
              <div className="absolute top-6 right-6 text-[#1B4332]/10">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z" />
                </svg>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6 text-[#1B4332]">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill="currentColor"
                    className="text-[#1B4332]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-xs sm:text-sm md:text-base text-gray-600 font-inter mb-8 italic relative z-10 leading-relaxed">
                &quot;{testimonial.text}&quot;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 mt-auto border-t border-gray-50 pt-6">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#1B4332]/20"
                />
                <div>
                  <h4 className="font-playfair font-bold text-base sm:text-lg md:text-xl text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-inter uppercase tracking-wide">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
