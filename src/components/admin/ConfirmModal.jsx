"use client";

import { X, AlertTriangle, Loader2 } from "lucide-react";

export default function ConfirmModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    isDestructive = false,
    isLoading = false
}) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div
                className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-white">
                    <h3 className="text-xl font-playfair font-bold text-gray-900">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>
                </div>

                <div className="p-8 text-center">
                    <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-6 ${isDestructive ? "bg-red-50 text-red-600" : "bg-[#1B4332]/5 text-[#1B4332]"
                        }`}>
                        <AlertTriangle size={32} />
                    </div>
                    <p className="text-gray-600 leading-relaxed font-inter">
                        {message}
                    </p>
                </div>

                <div className="p-6 border-t border-gray-50 bg-gray-50/50 flex gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 px-6 py-3 rounded-2xl text-sm font-bold text-gray-500 hover:bg-white hover:shadow-sm transition-all font-inter border border-transparent hover:border-gray-100"
                    >
                        {cancelText}
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isLoading}
                        className={`flex-1 px-6 py-3 rounded-2xl text-sm font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-black/5 ${isDestructive
                                ? "bg-red-600 hover:bg-red-700 shadow-red-600/20"
                                : "bg-[#1B4332] hover:bg-[#133024] shadow-[#1B4332]/20"
                            }`}
                    >
                        {isLoading && <Loader2 size={16} className="animate-spin" />}
                        {isLoading ? "Processing..." : confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}
