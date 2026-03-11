"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, FileText, Scale, AlertCircle } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: <FileText className="text-[#C5A059]" size={24} />,
      title: "1. Acceptance of Terms",
      content: "By accessing and using Ventrivo&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please refrain from using our platform. These terms apply to all visitors, users, and others who access or use our services."
    },
    {
      icon: <Shield className="text-[#C5A059]" size={24} />,
      title: "2. User Conduct",
      content: "Users agree to use our platform for lawful purposes only. Any unauthorized use, including but not limited to unauthorized entry into our systems, misuse of passwords, or misuse of any information posted on the site, is strictly prohibited."
    },
    {
      icon: <Scale className="text-[#C5A059]" size={24} />,
      title: "3. Property Listings",
      content: "While we strive for accuracy, property listings, prices, and availability are subject to change without notice. Ventrivo does not warrant the completeness or accuracy of the information provided in property descriptions."
    },
    {
      icon: <AlertCircle className="text-[#C5A059]" size={24} />,
      title: "4. Limitation of Liability",
      content: "Ventrivo shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use our services, even if we have been advised of the possibility of such damages."
    }
  ];

  return (
    <main className="min-h-screen bg-[#FDFCFB]">
      <Navbar scrolled={true} />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-[#1B4332] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-green-400 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C5A059] rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-playfair font-bold text-white mb-6"
          >
            Terms of Service
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 font-inter text-lg max-w-2xl mx-auto"
          >
            Last Updated: March 11, 2026. Please read these terms carefully before using our services.
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="space-y-12">
            {sections.map((section, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-6 p-8 bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mt-1 shrink-0 p-3 bg-[#FDFCFB] rounded-2xl border border-gray-50 flex items-center justify-center h-fit">
                  {section.icon}
                </div>
                <div className="space-y-4">
                  <h2 className="text-2xl font-playfair font-bold text-gray-900">{section.title}</h2>
                  <p className="text-gray-600 font-inter leading-relaxed whitespace-pre-line">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 p-10 bg-gray-50 rounded-4xl border border-gray-100 text-center"
          >
            <h3 className="text-2xl font-playfair font-bold text-gray-900 mb-4">Questions about our terms?</h3>
            <p className="text-gray-600 font-inter mb-8">
              If you have any questions regarding these Terms of Service, please contact our legal team.
            </p>
            <a 
              href="mailto:legal@ventrivo.com"
              className="inline-block px-10 py-4 bg-[#1B4332] text-white rounded-full font-bold tracking-widest uppercase text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/20"
            >
              Contact Legal Dept
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
