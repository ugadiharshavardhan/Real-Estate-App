"use client";

import { motion } from "framer-motion";
import { ArrowRight, Trophy, ShieldCheck, Users2, Landmark } from "lucide-react";
import Link from "next/link";

export default function Newsletter() {
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
          className="bg-[#1B4332] rounded-[3.5rem] p-10 md:p-24 shadow-[0_40px_100px_rgba(27,67,50,0.25)] relative overflow-hidden text-center"
        >
          {/* Refined Decorative Background */}
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-400 opacity-[0.03] rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#C5A059] opacity-[0.05] rounded-full blur-[150px] translate-x-1/2 translate-y-1/2" />
          
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 mb-10"
            >
              <div className="w-1.5 h-1.5 bg-[#C5A059] rounded-full animate-pulse" />
              <span className="text-[#C5A059] text-[10px] font-black uppercase tracking-[0.4em]">Become a Member</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-[5.5rem] font-playfair font-bold text-white mb-10 leading-[1.05]"
            >
              Join the <span className="text-green-400 italic">Ventrivo</span>{" "}
              Family
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-gray-300 font-inter mb-16 max-w-4xl mx-auto text-lg md:text-2xl leading-relaxed font-light"
            >
              At <strong className="text-white font-bold">Ventrivo Group</strong>, we don't just sell plots; we build foundations for generations. 
              By choosing a venture with us, you aren't just an investor—you become a cherished member of a family committed to prosperity, 
              security, and premium living. Start your journey toward a lasting legacy today.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-8"
            >
              <Link
                href="/projects"
                className="group relative px-14 py-6 bg-[#C5A059] text-white rounded-2xl font-inter font-bold text-sm tracking-widest uppercase flex items-center gap-4 transition-all hover:bg-[#b08d4a] hover:-translate-y-1 shadow-[0_20px_40px_rgba(197,160,89,0.3)]"
              >
                Secure Your Plot
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>

            {/* Core Values / Why Join Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4 mt-24 pt-20 border-t border-white/5">
              {[
                { icon: Landmark, title: "Heritage Status", desc: "Plots designed to appreciate and endure through generations." },
                { icon: ShieldCheck, title: "Utmost Security", desc: "Every venture is secured with 24/7 surveillance and gated care." },
                { icon: Users2, title: "Family Growth", desc: "Exclusive access to our elite network of property owners." },
                { icon: Trophy, title: "Premium Standards", desc: "World-class amenities crafted for a luxurious life." },
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-4 group/item">
                  <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center text-green-300 group-hover/item:bg-white/10 group-hover/item:text-[#C5A059] transition-all duration-300">
                    <item.icon size={28} />
                  </div>
                  <h4 className="text-white font-bold font-inter text-sm uppercase tracking-wider">{item.title}</h4>
                  <p className="text-gray-400 text-xs font-inter max-w-[180px] leading-relaxed opacity-70 group-hover/item:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-24 flex flex-col items-center gap-6">
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
              <p className="text-white/30 text-[9px] font-black font-inter tracking-[0.5em] uppercase">
                The Gold Standard of Real Estate &bull; Ventrivo Group Family
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
