"use client";

import { ShieldCheck } from "lucide-react";

export default function PaymentOption() {
    const plans = [
        {
            title: "Option-A",
            description: "100% spot payment",
            amount: "Rs. 1,50,000",
            unit: "PER SQUARE YARD",
        },
        {
            title: "Option-B",
            description: "50% advance 50% within a month",
            amount: "Rs. 1,75,000",
            unit: "PER SQUARE YARD",
        },
        {
            title: "Option-C",
            description: "plot allotment advance balance within 3 months",
            amount: "Rs. 1,90,000",
            unit: "PER SQUARE YARD",
        },
    ];

    return (
        <section id="payment-option" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-inter font-medium text-green-800 mb-6">
                        Payment Options
                    </h2>
                    <div className="flex justify-center mb-10">
                        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6C7.5 6 7.5 1 15 1C22.5 1 22.5 6 30 6C37.5 6 37.5 11 45 11C52.5 11 52.5 6 60 6" stroke="#166534" strokeWidth="2" />
                        </svg>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.title}
                            className="bg-[#f2f8f6] p-12 lg:p-16 rounded-sm flex flex-col items-center justify-center text-center shadow-sm border border-[#e2ecea] group hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-3xl font-normal text-[#5c6976] mb-8 font-inter">
                                {plan.title}
                            </h3>
                            <p className="text-[#8e99a3] font-inter text-sm mb-12 max-w-[200px] leading-relaxed">
                                {plan.description}
                            </p>
                            <div className="mb-2">
                                <span className="text-4xl font-bold text-[#c49a3e] font-inter">
                                    {plan.amount}
                                </span>
                            </div>
                            <p className="text-[#8e99a3] font-inter text-xs tracking-widest mt-4 uppercase">
                                {plan.unit}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-green-900 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl">
                    <div className="flex items-center gap-6">
                        <div className="bg-white/10 p-4 rounded-full">
                            <ShieldCheck size={40} className="text-white" />
                        </div>
                        <div>
                            <p className="font-bold text-2xl font-playfair mb-1">Safe & Secure Transactions</p>
                            <p className="text-white/70 font-inter text-base">All payments are bank-verified and RERA compliant for your peace of mind.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
