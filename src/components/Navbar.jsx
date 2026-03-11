"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar({ isAbsolute: isAbsoluteProp = false }) {
  const pathname = usePathname();
  const router = useRouter();
  const isProjectPage = pathname.startsWith("/projects/");
  const isAdminPage = pathname.startsWith("/admin");
  const isAbsolute = isAbsoluteProp || isProjectPage;

  const [hidden, setHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  const navLinks = [
    "Our Story",
    "Our Projects",
    "Blogs",
    "Testimonials",
    "Career",
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks to close search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
        setSearchResults([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length > 1) {
        setIsSearching(true);
        try {
          const res = await fetch(`/api/projects?search=${encodeURIComponent(searchQuery)}`);
          const data = await res.json();
          if (data.success) {
            setSearchResults(data.data);
          }
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (isAdminPage) return null;

  const handleResultClick = (slug) => {
    router.push(`/projects/${slug}`);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  return (
    <>
      <motion.nav
        className={`${isAbsolute ? "absolute" : "fixed"} top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 md:py-4 mx-auto max-w-7xl md:rounded-b-xl lg:rounded-full md:mt-4 transition-all duration-300 bg-white/10 backdrop-blur-md border border-white/30 shadow-[0_2px_20px_rgb(0,0,0,0.04)]`}
      >
      <Link href="/" className="flex items-center space-x-2 cursor-pointer">
        <span className={`text-2xl font-bold font-playfair tracking-tight ${scrolled ? "text-gray-500" : "text-white/90"}`}>
          <span className={scrolled ? "text-green-900" : "text-white"}>VEN</span>TRIVO
        </span>
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => {
          const isCareer = link === "Career";
          return isCareer ? (
            <Link
              key={link}
              href="/careers"
              className={`text-sm font-medium transition-colors relative group ${scrolled ? "text-gray-800 hover:text-[#C5A059]" : "text-white hover:text-[#C5A059]"}`}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-full"></span>
            </Link>
          ) : (
            <a
              key={link}
              href={`/#${link.replace(/\s+/g, "-").toLowerCase()}`}
              className={`text-sm font-medium transition-colors relative group ${scrolled ? "text-gray-800 hover:text-[#C5A059]" : "text-white hover:text-[#C5A059]"}`}
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#C5A059] transition-all group-hover:w-full"></span>
            </a>
          );
        })}
      </div>

      {/* Actions */}
      <div className="hidden md:flex items-center space-x-4">
        <div className="relative flex items-center" ref={searchRef}>
          <motion.input
            initial={{ width: 0, opacity: 0 }}
            animate={{
              width: isSearchOpen ? 240 : 0,
              opacity: isSearchOpen ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`outline-none rounded-full px-4 py-2 text-sm ${scrolled ? "bg-gray-100/90 text-gray-700 placeholder-gray-400" : "bg-white/20 text-white placeholder-white/70 backdrop-blur-md"}`}
          />

          <button
            onClick={() => {
              setIsSearchOpen(!isSearchOpen);
              if (!isSearchOpen) {
                setTimeout(() => searchRef.current?.querySelector('input')?.focus(), 100);
              }
            }}
            className={`p-2 transition-colors rounded-full ${scrolled ? "text-gray-800 hover:bg-gray-100/50" : "text-white hover:bg-white/20"}`}
          >
            {isSearchOpen && searchQuery ? (
              <X size={20} onClick={(e) => { e.stopPropagation(); setSearchQuery(""); }} />
            ) : (
              <Search size={20} />
            )}
          </button>

          {/* Search Results Dropdown Desktop */}
          <AnimatePresence>
            {isSearchOpen && (searchQuery.length > 1) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-20"
              >
                <div className="max-h-96 overflow-y-auto p-2">
                  {isSearching ? (
                    <div className="flex items-center justify-center py-8 text-gray-400">
                      <Loader2 className="animate-spin mr-2" size={20} />
                      <span className="text-sm">Searching...</span>
                    </div>
                  ) : searchResults.length > 0 ? (
                    searchResults.map((project) => (
                      <button
                        key={project._id}
                        onClick={() => handleResultClick(project.slug)}
                        className="flex items-center w-full p-3 hover:bg-gray-50 rounded-xl transition-colors text-left group"
                      >
                        <div 
                          className="w-12 h-12 rounded-lg bg-cover bg-center shrink-0"
                          style={{ backgroundImage: `url(${project.heroImage})` }}
                        />
                        <div className="ml-3 overflow-hidden">
                          <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-[#1B4332]">
                            {project.name}
                          </p>
                          <p className="text-xs text-gray-500 truncate">
                            {project.location}
                          </p>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="py-8 text-center text-gray-500 text-sm">
                      No projects found for &quot;{searchQuery}&quot;
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Toggle */}
      <button
        className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? "text-gray-800 hover:bg-gray-100/50" : "text-white hover:bg-white/20"}`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Dropdown Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute top-[calc(100%+0.5rem)] left-4 right-4 sm:left-auto sm:right-6 sm:w-80 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.3)] flex flex-col px-6 py-6 md:hidden border transition-all bg-black/60 backdrop-blur-2xl border-white/20 z-20"
          >
            <div className="relative flex flex-col mb-6 w-full">
              <div className="relative flex items-center">
                <input
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full outline-none rounded-xl px-4 py-3 text-sm transition-colors bg-white/10 text-white border border-white/20 placeholder-white/50 focus:border-white/50 focus:bg-white/20"
                />
                {isSearching ? (
                  <Loader2 size={18} className="absolute right-4 animate-spin text-white/50" />
                ) : (
                  <Search size={18} className="absolute right-4 pointer-events-none transition-colors text-white/50" />
                )}
              </div>

              {/* Mobile Search Results */}
              <AnimatePresence>
                {searchQuery.length > 1 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="max-h-60 overflow-y-auto space-y-2 py-2">
                      {searchResults.length > 0 ? (
                        searchResults.map((project) => (
                          <button
                            key={project._id}
                            onClick={() => handleResultClick(project.slug)}
                            className="flex items-center w-full p-2 hover:bg-white/10 rounded-lg transition-colors text-left"
                          >
                            <div 
                              className="w-10 h-10 rounded-md bg-cover bg-center shrink-0"
                              style={{ backgroundImage: `url(${project.heroImage})` }}
                            />
                            <div className="ml-3 overflow-hidden">
                              <p className="text-sm font-medium text-white/90 truncate">
                                {project.name}
                              </p>
                              <p className="text-xs text-white/50 truncate">
                                {project.location}
                              </p>
                            </div>
                          </button>
                        ))
                      ) : !isSearching && (
                        <div className="py-4 text-center text-white/50 text-xs">
                          No results found
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => {
                const isCareer = link === "Career";
                return isCareer ? (
                  <Link
                    key={link}
                    href="/careers"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-playfair border-b pb-2 flex items-center justify-between group transition-colors text-white/90 border-white/10 hover:text-white"
                  >
                    {link}
                    <ArrowRight
                      size={18}
                      className="text-white/40 group-hover:text-[#C5A059]"
                    />
                  </Link>
                ) : (
                  <Link
                    key={link}
                    href={`/#${link.replace(/\s+/g, "-").toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg font-playfair border-b pb-2 transition-colors text-white/90 border-white/10 hover:text-white"
                  >
                    {link}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      </motion.nav>

      {/* Screen Overlay (for clicking away) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
