"use client";

import { useState, useTransition } from "react";
import { updatePlotStatus } from "@/utils/actions/admin";
import { Loader2, Check, X, User, Mail, Phone, MapPin } from "lucide-react";

export default function PlotStatusToggle({ plot }) {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(plot.status);
  const [customerData, setCustomerData] = useState({
    name: plot.customer?.name || "",
    email: plot.customer?.email || "",
    phone: plot.customer?.phone || "",
    address: plot.customer?.address || "",
  });

  const statuses = [
    {
      id: "available",
      label: "Available",
      color: "text-green-700 bg-green-100 border-green-200",
      description: "Plot is open for new bookings",
    },
    {
      id: "reserved",
      label: "Reserved",
      color: "text-yellow-600 bg-yellow-50 border-yellow-100",
      description: "Temporarily held for a potential buyer",
    },
    {
      id: "booked",
      label: "Booked",
      color: "text-red-600 bg-red-50 border-red-100",
      description: "Booking amount received, awaiting registration",
    },
    {
      id: "mortgaged",
      label: "Mortgaged",
      color: "text-purple-600 bg-purple-50 border-purple-100",
      description: "Plot is under bank mortgage",
    },
    {
      id: "registered",
      label: "Registered",
      color: "text-amber-600 bg-amber-50 border-amber-100",
      description: "Final sale completed and registered",
    },
  ];

  const activeStatus = statuses.find((s) => s.id === plot.status);
  const showCustomerFields = ["reserved", "booked", "registered"].includes(
    selectedStatus,
  );

  const handleSave = async () => {
    startTransition(async () => {
      const res = await updatePlotStatus(
        plot._id,
        selectedStatus,
        showCustomerFields ? customerData : null,
      );
      if (res.success) {
        setIsOpen(false);
      } else {
        alert("Failed to update status: " + res.error);
      }
    });
  };

  return (
    <>
      {/* Status Badge - Static Display */}
      <div className="flex items-center gap-3">
        <div
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${activeStatus?.color} min-w-[110px] text-center shadow-sm`}
        >
          {activeStatus?.label || plot.status}
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="text-[10px] font-black uppercase tracking-widest text-[#1B4332] hover:text-[#133024] underline underline-offset-4 decoration-2 decoration-[#1B4332]/20 hover:decoration-[#1B4332] transition-all"
        >
          Update
        </button>
      </div>

      {/* Status Management Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          <div className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col font-inter animate-in fade-in zoom-in-95 duration-300">
            {/* Header */}
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="space-y-1">
                <h2 className="text-3xl font-playfair font-bold text-gray-900">
                  Status Control
                </h2>
                <p className="text-[11px] text-gray-400 uppercase font-black tracking-[0.2em]">
                  Managing Plot #{plot.plotNumber}
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
              >
                <X size={24} className="text-gray-400" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="p-8 space-y-10 overflow-y-auto">
              {/* Status Selection */}
              <div className="space-y-4">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B4332] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#1B4332] rounded-full" />
                  Select New Status
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {statuses.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSelectedStatus(s.id)}
                      className={`group p-4 rounded-2xl border-2 text-left transition-all ${
                        selectedStatus === s.id
                          ? "border-[#1B4332] bg-[#1B4332]/5 ring-4 ring-[#1B4332]/5"
                          : "border-gray-50 bg-white hover:border-gray-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${
                            selectedStatus === s.id
                              ? "text-[#1B4332]"
                              : "text-gray-400"
                          }`}
                        >
                          {s.label}
                        </span>
                        {selectedStatus === s.id && (
                          <Check size={14} className="text-[#1B4332]" />
                        )}
                      </div>
                      <p className="text-[11px] text-gray-500 leading-tight group-hover:text-gray-700">
                        {s.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Conditional Customer Information */}
              {showCustomerFields && (
                <div className="space-y-6 pt-10 border-t border-gray-100 animate-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B4332] flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-[#1B4332] rounded-full" />
                      Customer Details
                    </label>
                    <span className="text-[10px] font-bold text-gray-400 italic">
                      Required for {selectedStatus} plots
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <div className="relative group">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <input
                          required
                          value={customerData.name}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              name: e.target.value,
                            })
                          }
                          placeholder="Customer Full Name"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-gray-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative group">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <input
                          type="email"
                          value={customerData.email}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              email: e.target.value,
                            })
                          }
                          placeholder="Email Address"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-gray-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative group">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <input
                          value={customerData.phone}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              phone: e.target.value,
                            })
                          }
                          placeholder="Phone Number"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-gray-50/50 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <div className="relative group">
                        <MapPin
                          className="absolute left-4 top-6 text-gray-300 group-focus-within:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <textarea
                          rows={3}
                          value={customerData.address}
                          onChange={(e) =>
                            setCustomerData({
                              ...customerData,
                              address: e.target.value,
                            })
                          }
                          placeholder="Complete Address"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-gray-50/50 focus:bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4 sticky bottom-0 z-10">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-white transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isPending}
                className="px-12 py-4 bg-[#1B4332] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#133024] transition-all flex items-center gap-3 shadow-2xl shadow-[#1B4332]/30 disabled:opacity-50 active:scale-95"
              >
                {isPending && <Loader2 size={16} className="animate-spin" />}
                {isPending ? "Updating Status..." : "Save Status Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
