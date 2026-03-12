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
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-inter font-medium text-green-800 mb-6">
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
                            className="bg-[#f2f8f6] p-8 lg:p-10 rounded-sm flex flex-col justify-center text-left shadow-sm border border-[#e2ecea] group hover:shadow-md transition-all duration-300"
                        >
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-medium text-[#5c6976] mb-3 font-inter lowercase">
                                {plan.title.replace("-", " ")}
                            </h3>
                            <div className="flex justify-between items-baseline w-full mb-3 gap-4 border-b border-[#e2ecea] pb-3">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#c49a3e] font-inter whitespace-nowrap">
                                    {plan.amount}
                                </span>
                                <span className="text-[#8e99a3] font-inter text-[10px] sm:text-xs tracking-wider lowercase">
                                    {plan.unit.replace("PER SQUARE YARD", "per sq. yd")}
                                </span>
                            </div>
                            <p className="text-[#8e99a3] font-inter text-xs sm:text-sm md:text-base leading-relaxed">
                                {plan.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="mt-20 bg-[#14532d] rounded-[2rem] p-8 md:p-12 w-full shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 text-white border border-[#166534]">
                    <div className="flex flex-row items-center gap-6">
                        <div className="bg-white/10 p-4 sm:p-5 rounded-full flex shrink-0 items-center justify-center">
                            <ShieldCheck size={32} className="text-white sm:w-10 sm:h-10" strokeWidth={1.5} />
                        </div>
                        <div className="flex flex-col text-left justify-center">
                            <h4 className="font-playfair font-bold text-xl sm:text-2xl mb-1 sm:mb-2 tracking-wide leading-tight">
                                Safe & Secure Transactions
                            </h4>
                            <p className="font-inter text-sm sm:text-base text-white/80 leading-relaxed font-light mt-0 max-w-2xl">
                                All payments are bank-verified and RERA compliant for your peace of mind.
                            </p>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                         <div className="px-8 py-4 border border-white/20 rounded-full font-medium tracking-wider text-sm whitespace-nowrap">
                            RERA CERTIFIED
                         </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
