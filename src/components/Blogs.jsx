"use client";

import { motion } from "framer-motion";
import { mockBlogs } from "../data/blogs";
import { ArrowRight } from "lucide-react";
import { ProjectCardSkeleton } from "./Skeleton";

export default function Blogs() {
  return (
    <section className="py-24 bg-white" id="blog">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4"
          >
            Insights & Real Estate Trends
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-1 bg-[#1B4332] mx-auto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockBlogs.length === 0 ? (
            [1, 2, 3].map((i) => <ProjectCardSkeleton key={i} />)
          ) : (
            mockBlogs.map((blog, idx) => (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="group cursor-pointer flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative h-60 w-full rounded-2xl overflow-hidden mb-6 shadow-sm">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                    style={{ backgroundImage: `url(${blog.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-[#1B4332] shadow-sm">
                    {blog.category.toUpperCase()}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <p className="text-sm text-gray-500 mb-2 font-inter">
                    {blog.date}
                  </p>
                  <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 group-hover:text-[#1B4332] transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 font-inter mb-6 line-clamp-2 flex-1">
                    {blog.summary}
                  </p>
                  <div className="flex items-center text-[#1B4332] font-medium text-sm group/btn mt-auto">
                    <span className="relative overflow-hidden pb-1">
                      Read More
                      <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1B4332] transition-all duration-300 group-hover/btn:w-full"></span>
                    </span>
                    <ArrowRight
                      size={16}
                      className="ml-2 transform group-hover/btn:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </motion.article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
