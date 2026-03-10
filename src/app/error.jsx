"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8 border border-red-100 shadow-xl shadow-red-500/10">
                <AlertTriangle className="text-red-500" size={40} />
            </div>

            <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                Something went wrong!
            </h1>

            <p className="text-gray-500 font-inter max-w-md mb-12 leading-relaxed">
                We encountered an unexpected error while processing your request.
                Our team has been notified and we&apos;re working to fix it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => reset()}
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/20"
                >
                    <RefreshCcw size={18} />
                    Try Again
                </button>
                <Link
                    href="/"
                    className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all font-inter"
                >
                    <Home size={18} />
                    Back to Home
                </Link>
            </div>

            <div className="mt-16 p-4 bg-gray-50 rounded-xl border border-gray-100 max-w-xl mx-auto overflow-hidden">
                <p className="text-[10px] font-mono text-gray-400 break-all">
                    Error: {error?.message || "Unknown Application Error"}
                </p>
            </div>
        </div>
    );
}
