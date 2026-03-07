"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section
      className="py-24 bg-[#f5f5f3] relative overflow-hidden"
      id="newsletter"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-green-900 rounded-[2.5rem] p-10 md:p-20 shadow-[0_20px_50px_rgba(27,67,50,0.3)] relative overflow-hidden text-center"
        >
          {/* Hand-crafted feel: Decorative blobs */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-400 opacity-10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#C5A059] opacity-5 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />

          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6 leading-tight"
            >
              Join the <span className="text-green-400 italic">VENTRIVO</span>{" "}
              Family
            </motion.h2>
            <p className="text-gray-300 font-inter mb-12 max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
              Be the first to explore our hand-picked luxury listings and
              receive thoughtfully curated market insights once a month. No
              spam, just pure inspiration.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto bg-white/5 p-2 rounded-full border border-white/10 backdrop-blur-md"
            >
              <div className="relative flex-1">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Your favorite email address"
                  className="w-full px-8 py-4 rounded-full bg-transparent text-white placeholder-gray-400 outline-none transition-all focus:placeholder-transparent"
                />
                {status === "error" && (
                  <p className="absolute left-6 -bottom-8 text-xs text-red-400 font-inter">
                    Please enter a valid email.
                  </p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={status === "loading" || status === "success"}
                className={`px-10 py-4 rounded-full font-inter font-bold text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all shadow-lg ${
                  status === "success"
                    ? "bg-green-500 text-white"
                    : "bg-[#C5A059] text-white hover:bg-[#b08d4a] disabled:opacity-70 disabled:cursor-not-allowed"
                }`}
              >
                {status === "loading" ? (
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                ) : status === "success" ? (
                  <span>Welcome!</span>
                ) : (
                  <>
                    Join Now
                    <Send size={16} />
                  </>
                )}
              </motion.button>
            </form>

            <p className="mt-8 text-white/40 text-xs font-inter tracking-wide uppercase">
              Secure & Confidential &bull; Unsubscribe at any time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
