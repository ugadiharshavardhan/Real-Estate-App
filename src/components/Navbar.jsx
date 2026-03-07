"use client";

import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
} from "framer-motion";
import { Search, Menu, X } from "lucide-react";

export default function Navbar({ isAbsolute = false }) {
  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  const navLinks = [
    "Our Story",
    "Our Projects",
    "Our Programs",
    "Our PMS",
    "Career",
  ];

  return (
    <motion.nav

      style={{ backgroundColor: "rgba(255, 255, 255, 0)" }}
      className={`${isAbsolute ? "absolute" : "fixed"} top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 mx-auto max-w-7xl backdrop-blur-md rounded-b-xl md:rounded-full md:mt-4 shadow-[0_2px_20px_rgb(0,0,0,0.04)] transition-colors duration-300`}
    >
      <div className="flex items-center space-x-2 cursor-pointer">
        <span className="text-2xl font-bold font-playfair tracking-tight text-gray-500">
          <span className="text-green-900">VEN</span>TRIVO
        </span>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
          <a
            key={link}
            href={`/#${link.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-sm font-medium text-gray-800 hover:text-[#C5A059] transition-colors relative group"
          >
            {link}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-full"></span>
          </a>
        ))}
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative flex items-center">
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isSearchOpen ? 200 : 0,
              opacity: isSearchOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            placeholder="Search..."
            className="absolute right-8 bg-gray-100/80 outline-none rounded-full px-4 py-2 text-sm text-gray-700 placeholder-gray-400"
          />

          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 text-gray-800 hover:text-green-900 transition-colors rounded-full hover:bg-gray-100"
          >
            <Search size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        className="md:hidden p-2 text-gray-800"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white/95 backdrop-blur-xl z-50 shadow-2xl flex flex-col px-6 py-8 md:hidden"
          >
            <div className="flex justify-end mb-8">
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 text-gray-800"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link}
                  href={`/#${link.replace(/\s+/g, "-").toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-xl font-playfair text-gray-900 border-b border-gray-100 pb-2"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
