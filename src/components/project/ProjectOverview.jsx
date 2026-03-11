"use client";

import { useActionState } from "react";
import { submitEnquiry } from "@/utils/actions/enquiry";
import { CheckCircle, Users, Layout } from "lucide-react";

export default function ProjectOverview({ project }) {
  const [state, formAction, isPending] = useActionState(submitEnquiry, null);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 md:gap-16">
          <div className="lg:col-span-2">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-6 relative inline-block">
              Project Overview
              <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-[#1B4332]"></div>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 font-inter leading-relaxed mb-8">
              {project.description}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12">
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                <Layout className="w-8 h-8 mx-auto mb-2 text-[#1B4332]" />
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#1B4332] mb-2">
                  {project.totalAcres}+
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest">
                  Acres
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                <Users className="w-8 h-8 mx-auto mb-2 text-[#1B4332]" />
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#1B4332] mb-2">
                  {project.totalPlots}
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest">
                  Premium Plots
                </p>
              </div>
              <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-center hover:shadow-md transition-shadow col-span-2 md:col-span-1">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[#1B4332]" />
                <p className="text-2xl sm:text-3xl lg:text-4xl font-bold font-playfair text-[#1B4332] mb-2">
                  100%
                </p>
                <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-widest">
                  Clear Title
                </p>
              </div>
            </div>
          </div>

          {/* Quick Contact Card */}
          <div className="bg-[#1B4332] rounded-3xl p-8 text-white h-fit sticky top-32 shadow-2xl">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-playfair font-bold mb-4">
              Interested in this project?
            </h3>
            <p className="text-sm sm:text-base text-white/80 mb-8 font-inter">
              Leave your details and our property expert will get in touch with
              you shortly.
            </p>

            <form action={formAction} className="space-y-4">
              <input type="hidden" name="projectId" value={project._id} />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-inter"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-inter"
              />
              <textarea
                name="message"
                placeholder="Tell us about your requirements"
                required
                rows="3"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-inter resize-none"
              ></textarea>

              <button
                type="submit"
                disabled={isPending}
                className="w-full bg-white text-[#1B4332] font-bold py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg mt-4 disabled:opacity-50 font-playfair"
              >
                {isPending ? "Sending..." : "Request Callback"}
              </button>

              {state?.success && (
                <p className="text-green-300 text-sm mt-2 text-center font-inter">
                  Thank you! We will call you soon.
                </p>
              )}
              {state?.error && (
                <p className="text-red-300 text-sm mt-2 text-center font-inter">
                  {state.error}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
