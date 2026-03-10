"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="relative mb-8">
                <h1 className="text-[120px] md:text-[180px] font-playfair font-black text-[#1B4332]/5 leading-none select-none">
                    404
                </h1>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#1B4332] rounded-full flex items-center justify-center shadow-2xl shadow-[#1B4332]/30 animate-pulse">
                        <span className="text-white text-3xl font-bold font-playfair">?</span>
                    </div>
                </div>
            </div>

            <h2 className="text-3xl md:text-5xl font-playfair font-bold text-gray-900 mb-6">
                Oops! Page Not Found
            </h2>

            <p className="text-lg text-gray-500 font-inter max-w-lg mb-12 leading-relaxed">
                The property you&apos;re looking for might have moved or doesn&apos;t exist.
                Let&apos;s get you back to familiar territory.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/20 group"
                >
                    <Home size={18} />
                    Back to Home
                </Link>
                <button
                    onClick={() => window.history.back()}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all font-inter"
                >
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>

            {/* Modern shapes in background */}
            <div className="fixed top-20 left-[10%] w-64 h-64 bg-[#1B4332]/5 rounded-full blur-3xl -z-10 animate-blob" />
            <div className="fixed bottom-20 right-[10%] w-72 h-72 bg-[#1B4332]/5 rounded-full blur-3xl -z-10 animate-blob animation-delay-2000" />

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite alternate; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}} />
        </div>
    );
}
