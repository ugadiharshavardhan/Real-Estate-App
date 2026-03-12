"use client";

import { motion, AnimatePresence } from "framer-motion";
import { mockBlogs } from "../data/blogs";
import { ArrowRight, X, Calendar, Tag } from "lucide-react";
import { useState, useEffect } from "react";
import { ProjectCardSkeleton } from "./Skeleton";

export default function Blogs() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedBlog) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedBlog]);

  return (
    <section className="py-16 md:py-24 bg-white" id="blogs">
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
                onClick={() => setSelectedBlog(blog)}
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

      {/* Modal Popup */}
      <AnimatePresence>
        {selectedBlog && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBlog(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedBlog(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-900 hover:bg-white transition-colors shadow-sm"
              >
                <X size={20} />
              </button>

              <div className="flex-1 overflow-y-auto hide-scrollbar">
                {/* Image Section */}
                <div className="relative h-[300px] md:h-[400px] w-full">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${selectedBlog.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="flex gap-4 mb-4">
                      <span className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                        <Tag size={12} />
                        {selectedBlog.category.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-2 px-3 py-1 bg-white/20 backdrop-blur-md border border-white/20 rounded-full text-xs font-medium text-white">
                        <Calendar size={12} />
                        {selectedBlog.date}
                      </span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-playfair font-bold text-white leading-tight">
                      {selectedBlog.title}
                    </h2>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-8 md:p-12">
                  <div className="max-w-3xl mx-auto">
                    <p className="text-xl md:text-2xl font-playfair font-medium text-gray-900 mb-8 leading-relaxed italic border-l-4 border-[#1B4332] pl-8 py-2">
                      {selectedBlog.summary}
                    </p>
                    <div className="prose prose-lg max-w-none text-gray-600 font-inter leading-relaxed whitespace-pre-line">
                      {selectedBlog.content}
                    </div>
                  </div>
                </div>

                {/* Footer Section in Modal */}
                <div className="p-8 md:p-12 pt-0 border-t border-gray-100 mt-8 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-gray-500 text-sm font-inter">
                    Share this article:
                  </div>
                  <div className="flex gap-4">
                    {/* Placeholder social sharing buttons */}
                    {['fb', 'tw', 'li'].map(social => (
                      <button key={social} className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:border-[#1B4332] hover:text-[#1B4332] transition-colors uppercase text-[10px] font-bold">
                        {social}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
