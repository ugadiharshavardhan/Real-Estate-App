import Link from "next/link";
import { ShieldAlert, Home, LogOut } from "lucide-react";
import { SignOutButton } from "@clerk/nextjs";

export default function AccessDenied() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-gray-200/50 p-10 text-center border border-gray-100">
                <div className="w-20 h-20 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-8">
                    <ShieldAlert className="w-10 h-10 text-red-500" />
                </div>

                <h1 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                    Access Denied
                </h1>

                <p className="text-gray-500 font-inter mb-10 leading-relaxed">
                    You don't have the necessary permissions to access the administrator portal. Please contact the system administrator if you believe this is an error.
                </p>

                <div className="space-y-4">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full py-4 bg-[#1B4332] text-white rounded-2xl font-bold text-sm hover:bg-[#133024] transition-all shadow-lg shadow-[#1B4332]/20 font-inter"
                    >
                        <Home size={18} />
                        Back to Home
                    </Link>

                    <SignOutButton redirectUrl="/sign-in?redirect_url=/admin">
                        <button className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-gray-200 text-gray-600 rounded-2xl font-bold text-sm hover:bg-gray-50 transition-all font-inter">
                            <LogOut size={18} />
                            Sign out & Switch Account
                        </button>
                    </SignOutButton>
                </div>
            </div>
        </div>
    );
}
