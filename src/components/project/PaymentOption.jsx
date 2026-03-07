"use client";

import { CreditCard, Wallet, Banknote, ShieldCheck } from "lucide-react";

export default function PaymentOption() {
    const plans = [
        {
            title: "Booking Amount",
            amount: "₹1,00,000",
            description: "Initial booking amount to block your preferred plot.",
            icon: <Wallet className="w-8 h-8 text-green-700" />,
        },
        {
            title: "Immediate Payment",
            amount: "100% in 15 Days",
            description: "Special discount of ₹100 per sq. yard for full payment.",
            icon: <Banknote className="w-8 h-8 text-green-700" />,
        },
        {
            title: "Standard Plan",
            amount: "25% in 30 Days",
            description: "Remaining balance within 45 days with interest-free period.",
            icon: <CreditCard className="w-8 h-8 text-green-700" />,
        },
    ];

    return (
        <section id="payment-option" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
                        Payment Options
                    </h2>
                    <div className="w-24 h-1 bg-green-800 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto font-inter">
                        We offer flexible and transparent payment plans to help you secure
                        your dream investment with ease.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.title}
                            className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group"
                        >
                            <div className="bg-green-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-800 transition-colors">
                                <div className="group-hover:text-white transition-colors">
                                    {plan.icon}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold font-playfair text-gray-900 mb-2">
                                {plan.title}
                            </h3>
                            <p className="text-2xl font-bold text-green-800 mb-4 font-inter">
                                {plan.amount}
                            </p>
                            <p className="text-gray-600 font-inter leading-relaxed">
                                {plan.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-12 bg-green-800 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-lg">
                    <div className="flex items-center gap-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <ShieldCheck size={32} />
                        </div>
                        <div>
                            <p className="font-bold text-xl font-playfair">Safe & Secure Transactions</p>
                            <p className="text-white/80 font-inter">All payments are bank-verified and RERA compliant.</p>
                        </div>
                    </div>
                    <button className="bg-white text-green-800 font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-md whitespace-nowrap font-playfair">
                        Download Pricing PDF
                    </button>
                </div>
            </div>
        </section>
    );
}
