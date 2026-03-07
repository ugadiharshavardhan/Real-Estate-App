"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Heart,
  Trophy,
  Users,
  Mail,
  ArrowRight,
  ShieldCheck,
  Globe,
  Star,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, ease: "easeOut" },
};

const pillars = [
  {
    icon: <ShieldCheck className="w-8 h-8" />,
    title: "Trust & Integrity",
    text: "We believe that every successful project is rooted in the unwavering commitment of a team driven by transparency and ethical work.",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "National Pride",
    text: "VENTRIVO is built by Indians, for Indians. We take immense pride in shaping communities and legacies that define the future of our country.",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Collaborative Evolution",
    text: "We don't just offer jobs; we offer a platform to learn, lead, and evolve. At VENTRIVO, every individual is empowered to own their ideas.",
  },
];

export default function CareerPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />

      {/* Hero Section: The Vision */}
      <section className="relative pt-32 pb-24 md:pt-48 md:pb-40 bg-[#1B4332] overflow-hidden">
        <div className="absolute inset-0 opacity-15 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920')] bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#1B4332]/50 to-[#1B4332]" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <span className="inline-block px-4 py-1 rounded-full bg-white/10 text-[#C5A059] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm border border-white/10">
              The VENTRIVO Journey
            </span>
            <h1 className="text-4xl md:text-7xl font-playfair font-bold text-white mb-8 leading-tight">
              Build a Future <br />
              <span className="text-[#C5A059]">That Lasts Generations</span>
            </h1>
            <p className="text-gray-300 font-inter text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed">
              At VENTRIVO, we build more than premium real estate. We build
              careers with purpose, lives with meaning, and legacies that
              endure.
            </p>
            <motion.a
              href="#the-purpose"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-[#1B4332] px-10 py-5 rounded-full font-black shadow-2xl hover:bg-gray-100 transition-all text-lg"
            >
              Discover Our Purpose
              <ArrowRight size={22} className="text-[#C5A059]" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Built for Indians, By Indians */}
      <section className="py-32 bg-white" id="the-purpose">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-8">
              <div className="inline-block p-4 bg-[#f0fdf4] rounded-2xl text-[#1B4332]">
                <Star className="w-10 h-10 fill-current" />
              </div>
              <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 leading-tight">
                Contributing to a <br />
                <span className="text-[#1B4332]">National Story</span>
              </h2>
              <p className="text-gray-600 font-inter text-lg leading-relaxed">
                When you join us, your work becomes part of a larger
                mission—helping families own their first piece of land, securing
                their children&apos;s futures, and moving closer to the Indian dream.
              </p>
              <p className="text-gray-600 font-inter text-lg leading-relaxed">
                We are powered by people who take pride in shaping communities
                across the country. We don&apos;t just offer roles; we provide a
                platform to make a meaningful impact in the lives of thousands.
              </p>

              <div className="flex flex-col sm:flex-row gap-8 pt-6">
                <div className="border-l-4 border-[#C5A059] pl-6 py-2">
                  <h4 className="text-2xl font-bold text-gray-900">Purpose</h4>
                  <p className="text-gray-500 text-sm">Lives & Legacies</p>
                </div>
                <div className="border-l-4 border-[#1B4332] pl-6 py-2">
                  <h4 className="text-2xl font-bold text-gray-900">Growth</h4>
                  <p className="text-gray-500 text-sm">Collective Success</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px] md:h-[600px] group"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200"
                alt="Visionary Team"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1B4332]/20 group-hover:bg-transparent transition-colors duration-500" />
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl">
                <p className="italic text-gray-800 text-lg font-playfair font-medium">
                  &quot;At VENTRIVO, we believe in growing together. We encourage
                  ownership, value ideas, and recognize performance at every
                  scale.&quot;
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: Pillars of Growth */}
      <section className="py-32 bg-[#F0FDF4] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#1B4332]/5 rounded-full -mr-48 -mt-48 blur-3xl" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
              Our Cultural Pillars
            </h2>
            <div className="w-20 h-1 bg-[#C5A059] mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pillars.map((pillar, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                transition={{ delay: i * 0.15, duration: 0.8 }}
                className="bg-white p-10 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-white/80 hover:shadow-[0_20px_60px_rgba(27,67,50,0.1)] transition-all transform hover:-translate-y-2"
              >
                <div className="text-[#1B4332] mb-8 bg-[#F0FDF4] w-16 h-16 flex items-center justify-center rounded-2xl">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {pillar.title}
                </h3>
                <p className="text-gray-600 font-inter leading-relaxed">
                  {pillar.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: The Invitation */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div
            {...fadeInUp}
            className="bg-[#1B4332] rounded-[50px] p-12 md:p-24 relative overflow-hidden text-center text-white shadow-2xl"
          >
            {/* Abstract Background Ornaments */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#C5A059]/15 rounded-full -ml-32 -mb-32 blur-3xl" />

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <Mail className="mx-auto w-16 h-16 text-[#C5A059] mb-8" />
              <h2 className="text-4xl md:text-5xl font-playfair font-bold mb-8">
                Begin Your Journey With Us
              </h2>
              <p className="text-gray-300 font-inter text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                If you seek more than just a job—if you seek meaning, growth,
                and the opportunity to build a legacy—your path starts here.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <a
                  href="mailto:careers@ventrivo.com"
                  className="bg-[#C5A059] text-white px-12 py-5 rounded-full font-black text-lg hover:bg-[#b38f4d] transition-all transform hover:scale-105 shadow-xl"
                >
                  Join the Collective Vision
                </a>
              </div>
              <p className="mt-8 text-gray-400 text-sm font-medium uppercase tracking-[0.2em]">
                Build Dreams. Build a future that lasts.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
