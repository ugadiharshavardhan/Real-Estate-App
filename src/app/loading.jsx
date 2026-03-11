"use client";

import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center z-100">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059]/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative flex flex-col items-center">
        {/* Animated Logo/Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ 
              opacity: [0.4, 1, 0.4],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="text-4xl md:text-5xl font-bold font-playfair tracking-[0.2em] text-[#1B4332]"
          >
            VEN<span className="text-[#C5A059]">TRIVO</span>
          </motion.div>
          
          {/* Minimalist Subtext */}
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-4 text-[10px] uppercase font-black tracking-[0.4em] text-gray-400"
          >
            Crafting Legacies
          </motion.p>
        </motion.div>

        {/* Subtle Decorative Line */}
        <motion.div 
          className="mt-12 w-24 h-px bg-gray-100 relative overflow-hidden"
        >
          <motion.div 
            animate={{ 
              x: ["-100%", "100%"]
            }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-[#C5A059] to-transparent"
          />
        </motion.div>
      </div>
    </div>
  );
}
