"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Trophy, ShieldCheck, Users2, Landmark, X, Building2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Newsletter({ projects = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleProjectSelect = (slug) => {
    setIsModalOpen(false);
    router.push(`/projects/${slug}`);
  };

  return (
    <section
      className="py-16 md:py-32 bg-[#FDFCFB] relative overflow-hidden"
      id="newsletter"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#1B4332] rounded-[3.5rem] p-8 md:p-16 lg:p-24 shadow-[0_40px_100px_rgba(27,67,50,0.25)] relative overflow-hidden"
        >
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400 opacity-[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C5A059] opacity-[0.05] rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12 lg:gap-20">
              
              {/* Part 1: Content & Heading */}
              <div className="lg:w-1/2 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-8"
                >
                  <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse" />
                  <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em]">Become a Member</span>
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-playfair font-bold text-white mb-8 leading-[1.1]"
                >
                  Join the <span className="text-green-400 italic">Ventrivo</span> Family
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-300 font-inter mb-10 text-base md:text-lg lg:text-xl leading-relaxed font-light"
                >
                  At <strong className="text-white font-bold">Ventrivo Group</strong>, we build foundations for generations. 
                  By choosing a venture with us, you join a family committed to prosperity, 
                  security, and premium living. Start your journey toward a lasting legacy today.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-10 py-5 bg-[#C5A059] text-white rounded-2xl font-inter font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-4 transition-all hover:bg-[#b08d4a] hover:-translate-y-1 shadow-[0_20px_40px_rgba(197,160,89,0.3)] w-full sm:w-auto"
                  >
                    Secure Your Plot
                    <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </motion.div>
              </div>

              {/* Part 2: Values Grid */}
              <div className="lg:w-1/2 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[
                    { icon: Landmark, title: "Heritage Status", desc: "Plots designed to appreciate through generations." },
                    { icon: ShieldCheck, title: "Utmost Security", desc: "Secured with 24/7 surveillance and gated care." },
                    { icon: Users2, title: "Family Growth", desc: "Exclusive access to our elite family of owners." },
                    { icon: Trophy, title: "Premium Standards", desc: "World-class amenities for a luxurious life." },
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + idx * 0.1 }}
                      className="flex flex-col items-center lg:items-start gap-3 p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/item"
                    >
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-green-300 group-hover/item:text-[#C5A059] transition-all duration-300">
                        <item.icon size={24} />
                      </div>
                      <h4 className="text-white font-bold font-inter text-xs uppercase tracking-wider">{item.title}</h4>
                      <p className="text-gray-400 text-[11px] font-inter leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity text-center lg:text-left">
                        {item.desc}
                      </p>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-12 flex flex-col items-center lg:items-start gap-4">
                  <div className="w-full lg:w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent lg:from-white/20 lg:to-transparent" />
                  <p className="text-white/30 text-[8px] font-black font-inter tracking-[0.4em] uppercase">
                    The Gold Standard &bull; Ventrivo Group
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Project Selection Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="bg-[#1B4332] p-8 text-center relative">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 text-white/50 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Building2 size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-playfair font-bold text-white mb-2">Select a Project</h3>
                <p className="text-green-200/60 text-sm font-inter">Choose a venture to explore available plots</p>
              </div>

              {/* Modal Content - Project List */}
              <div className="p-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="grid gap-3">
                  {projects.length > 0 ? (
                    projects.map((project) => (
                      <button
                        key={project._id}
                        onClick={() => handleProjectSelect(project.slug)}
                        className="group flex items-center justify-between p-5 bg-gray-50 hover:bg-[#1B4332] rounded-2xl transition-all duration-300 text-left border border-gray-100 hover:border-[#1B4332]"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#1B4332] shadow-sm transform group-hover:scale-110 transition-transform">
                            <Building2 size={24} />
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 group-hover:text-white transition-colors">{project.name}</h4>
                            <p className="text-xs text-gray-500 group-hover:text-green-200/60 transition-colors uppercase tracking-widest font-bold">{project.location}</p>
                          </div>
                        </div>
                        <ChevronRight size={20} className="text-gray-300 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </button>
                    ))
                  ) : (
                    <p className="text-center py-10 text-gray-400 font-inter italic">No projects available at the moment.</p>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex items-center justify-center">
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">
                   Connecting you to your future home
                 </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
