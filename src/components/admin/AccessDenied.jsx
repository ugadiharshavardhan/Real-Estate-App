import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home, Lock, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function AccessDenied() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        {/* Icon Plate */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-red-100 rounded-3xl rotate-6 animate-pulse" />
          <div className="absolute inset-0 bg-white border-2 border-red-500 rounded-3xl flex items-center justify-center -rotate-3 transition-transform hover:rotate-0 duration-300">
            <Lock className="text-red-500 w-10 h-10" />
          </div>
          <div className="absolute -top-2 -right-2">
            <ShieldAlert className="text-red-600 w-8 h-8 fill-red-50" />
          </div>
        </div>

        {/* Text Content */}
        <div className="space-y-3">
          <h1 className="text-3xl font-playfair font-black text-gray-900 tracking-tight">
            Access Denied
          </h1>
          <p className="text-gray-500 font-inter text-sm leading-relaxed max-w-[280px] mx-auto">
            Your current account does not have the administrative privileges required to access this portal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-4">
          <SignOutButton redirectUrl="/sign-in?redirect_url=/admin">
            <button className="flex items-center justify-center gap-2 w-full py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm hover:bg-[#133024] transition-all shadow-xl shadow-[#1B4332]/20 group">
              <LogOut size={18} className="group-hover:-translate-y-0.5 transition-transform" />
              Login Again
            </button>
          </SignOutButton>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-100 py-4 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all font-inter"
          >
            <Home size={18} />
            Back to Home
          </Link>
          
          <Link
            href="javascript:history.back()"
            className="flex items-center justify-center gap-2 bg-white text-gray-500 py-2 rounded-2xl font-medium text-xs hover:text-gray-700 transition-all"
          >
            <ArrowLeft size={14} />
            Go Back
          </Link>
        </div>

        {/* Support Meta */}
        <div className="pt-8 text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
          <span className="w-8 h-[1px] bg-gray-100" />
          Security Protocol 403
          <span className="w-8 h-[1px] bg-gray-100" />
        </div>
      </div>
    </div>
  );
}
