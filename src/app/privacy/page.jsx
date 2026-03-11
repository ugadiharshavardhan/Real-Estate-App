"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Lock, Eye, Database, Share2, ShieldCheck } from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <Database className="text-[#C5A059]" size={24} />,
      title: "1. Information Collection",
      content: "We collect information you provide directly to us, such as your name, email address, and phone number when you inquire about a property or sign up for our newsletter. We also automatically collect certain information when you visit our website, including your IP address and browsing behavior."
    },
    {
      icon: <Eye className="text-[#C5A059]" size={24} />,
      title: "2. Use of Information",
      content: "The information we collect is used to provide and improve our services, communicate with you, personalize your experience, and for marketing purposes. We do not sell your personal information to third parties."
    },
    {
      icon: <Lock className="text-[#C5A059]" size={24} />,
      title: "3. Data Security",
      content: "We implement robust security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. We use industry-standard encryption and security protocols to safeguard your data."
    },
    {
      icon: <Share2 className="text-[#C5A059]" size={24} />,
      title: "4. Third-Party Sharing",
      content: "We may share your information with trusted third-party service providers who assist us in operating our website and conducting our business, as long as those parties agree to keep this information confidential."
    },
    {
      icon: <ShieldCheck className="text-[#C5A059]" size={24} />,
      title: "5. Your Privacy Rights",
      content: "You have the right to access, update, or delete your personal information. If you wish to exercise any of these rights, please contact us at privacy@ventrivo.com."
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
            Privacy Policy
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-300 font-inter text-lg max-w-2xl mx-auto"
          >
            Your privacy is our priority. Here&apos;s how we handle your data with transparency and care.
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
            className="mt-20 p-10 bg-[#E8F5E9] rounded-4xl text-center border border-green-100/50"
          >
            <h3 className="text-2xl font-playfair font-bold text-[#1B4332] mb-4">Privacy Concerns?</h3>
            <p className="text-gray-700 font-inter mb-8">
              We are committed to resolving any privacy-related issues promptly. Feel free to reach out.
            </p>
            <a 
              href="mailto:privacy@ventrivo.com"
              className="inline-block px-10 py-4 bg-[#1B4332] text-white rounded-full font-bold tracking-widest uppercase text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/20"
            >
              Email Privacy Team
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
