"use client";

import { useState } from "react";
import { Globe, Save, ShieldCheck } from "lucide-react";
import { updateSiteInfo } from "@/utils/actions/admin";

export default function SiteInfoForm({ initialData }) {
  const [formData, setFormData] = useState({
    businessName: initialData?.businessName || "",
    supportEmail: initialData?.supportEmail || "",
    officeAddress: initialData?.officeAddress || "",
    primaryPhone: initialData?.primaryPhone || "",
    workingHours: initialData?.workingHours || "",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSaveStatus("idle");
  };

  const handleDiscard = () => {
    setFormData({
      businessName: initialData?.businessName || "",
      supportEmail: initialData?.supportEmail || "",
      officeAddress: initialData?.officeAddress || "",
      primaryPhone: initialData?.primaryPhone || "",
      workingHours: initialData?.workingHours || "",
    });
    setSaveStatus("idle");
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const res = await updateSiteInfo(formData);
      if (res.success) {
        setSaveStatus("success");
      } else {
        setSaveStatus("error");
        console.error("Failed to save site info:", res.error);
      }
    } catch (error) {
      setSaveStatus("error");
      console.error("Error saving site info:", error);
    } finally {
      setIsSaving(false);
      if (saveStatus !== "error") {
        setTimeout(() => {
          setSaveStatus("idle");
        }, 3000);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
        <div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900">
            Site Information
          </h1>
          <p className="text-sm text-gray-500 font-inter mt-1">Manage public business details</p>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSaving}
          className="px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-sm font-bold hover:bg-[#133024] transition-all flex items-center gap-2 font-inter shadow-lg shadow-[#1B4332]/20 w-full md:w-auto justify-center disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-gray-50 shadow-sm mb-10">
        <h2 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900 mb-8 flex items-center gap-3">
          <Globe className="text-[#1B4332]" />
          Business Details
        </h2>

        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Support Email
              </label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
              Office Address
            </label>
            <textarea
              name="officeAddress"
              rows={3}
              value={formData.officeAddress}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Primary Phone
              </label>
              <input
                type="text"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                Working Hours
              </label>
              <input
                type="text"
                name="workingHours"
                value={formData.workingHours}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
              />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {saveStatus === "success" && (
              <>
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold font-inter tracking-wide uppercase text-green-600">
                  Settings Saved Successfully
                </span>
              </>
            )}
            {saveStatus === "error" && (
              <>
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <span className="text-[10px] sm:text-xs font-bold font-inter tracking-wide uppercase text-red-600">
                  Error saving settings
                </span>
              </>
            )}
            {saveStatus === "idle" && (
              <span className="text-[10px] sm:text-xs font-bold font-inter tracking-wide uppercase text-gray-400">
                Unsaved Changes
              </span>
            )}
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <button
              onClick={handleDiscard}
              disabled={isSaving}
              className="flex-1 md:flex-none text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
            >
              Discard
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSaving}
              className="flex-1 md:flex-none px-8 py-3 bg-[#1B4332] text-white rounded-xl text-sm font-bold hover:bg-[#133024] transition-all shadow-md disabled:opacity-50"
            >
               Apply Update
            </button>
          </div>
        </div>
      </div>

      <div className="bg-orange-50/50 border border-orange-100 rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-gray-900 text-sm mb-1">
            Security Recommendation
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-md">
            Your site information is visible to the public. Ensure all
            contact details are correct to maintain professional customer
            engagement.
          </p>
        </div>
      </div>
    </>
  );
}
