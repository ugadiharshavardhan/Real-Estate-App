"use client";

import { useState, useTransition } from "react";
import { updatePlotStatus } from "@/utils/actions/admin";
import { Loader2, Check, X, User, Phone, MapPin } from "lucide-react";

// Helper to extract and normalize customers (Moved outside to be a pure utility)
const getCustomersFromPlot = (p) => {
  const rawData = p?.customer || p?.customers;
  if (!rawData) return [];

  // Normalize to array
  const normalized = Array.isArray(rawData) ? rawData : [rawData];

  // Map and ensure all fields are initialized to empty strings (to prevent uncontrolled/controlled error)
  return normalized
    .filter((c) => c && typeof c === "object")
    .map((c) => ({
      name: c.name || "",
      aadharNumber: c.aadharNumber || "",
      phone: c.phone || "",
      address: c.address || "",
    }))
    .filter((c) => c.name || c.aadharNumber || c.phone || c.address); // Only return if it has some data
};

export default function PlotStatusToggle({ plot }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const statuses = [
    {
      id: "available",
      label: "Available",
      color: "text-green-700 bg-green-100 border-green-200",
    },
    {
      id: "reserved",
      label: "Reserved",
      color: "text-yellow-600 bg-yellow-50 border-yellow-100",
    },
    {
      id: "booked",
      label: "Booked",
      color: "text-red-600 bg-red-50 border-red-100",
    },
    {
      id: "mortgaged",
      label: "Mortgaged",
      color: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      id: "registered",
      label: "Registered",
      color: "text-amber-600 bg-amber-50 border-amber-100",
    },
  ];

  const activeStatus = statuses.find((s) => s.id === plot.status);

  const handleSave = async (selectedStatus, customersData) => {
    startTransition(async () => {
      const showCustomerFields = ["reserved", "booked", "registered"].includes(selectedStatus);
      const res = await updatePlotStatus(
        plot._id,
        selectedStatus,
        showCustomerFields ? customersData : null,
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

      {isOpen && (
        <StatusModal
          key={plot._id + plot.status}
          plot={plot}
          isPending={isPending}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
        />
      )}
    </>
  );
}

function StatusModal({ plot, isPending, onClose, onSave }) {
  const [selectedStatus, setSelectedStatus] = useState(plot.status);
  const [customersData, setCustomersData] = useState(() => {
    const existing = getCustomersFromPlot(plot);
    return existing.length > 0
      ? JSON.parse(JSON.stringify(existing))
      : [{ name: "", aadharNumber: "", phone: "", address: "" }];
  });

  const existingCustomers = getCustomersFromPlot(plot);

  const statuses = [
    {
      id: "available",
      label: "Available",
      description: "Plot is open for new bookings",
    },
    {
      id: "reserved",
      label: "Reserved",
      description: "Temporarily held for a potential buyer",
    },
    {
      id: "booked",
      label: "Booked",
      description: "Booking amount received, awaiting registration",
    },
    {
      id: "mortgaged",
      label: "Mortgaged",
      description: "Plot is under bank mortgage",
    },
    {
      id: "registered",
      label: "Registered",
      description: "Final sale completed and registered",
    },
  ];

  const showCustomerFields = ["reserved", "booked", "registered"].includes(selectedStatus);

  const handleAddCustomer = () => {
    setCustomersData([
      ...customersData,
      { name: "", aadharNumber: "", phone: "", address: "" },
    ]);
  };

  const handleRemoveCustomer = (index) => {
    if (customersData.length === 1) return;
    setCustomersData(customersData.filter((_, i) => i !== index));
  };

  const handleCustomerChange = (index, field, value) => {
    const updated = [...customersData];
    updated[index] = { ...updated[index], [field]: value };
    setCustomersData(updated);
  };

  const validateAndSave = () => {
    if (showCustomerFields) {
      for (const [index, customer] of customersData.entries()) {
        const { name, aadharNumber, phone, address } = customer;
        if (!name || !aadharNumber || !phone || !address) {
          alert(`Please fill in all details for Customer #${index + 1}: Name, Aadhar Number, Phone, and Address.`);
          return;
        }

        const aadharRegex = /^\d{12}$/;
        if (!aadharRegex.test(aadharNumber.replace(/\s/g, ""))) {
          alert(`Please enter a valid 12-digit Aadhar Number for Customer #${index + 1}.`);
          return;
        }
      }
    }
    onSave(selectedStatus, customersData);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-4xl shadow-2xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col font-inter animate-in fade-in zoom-in-95 duration-300">
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
            onClick={onClose}
            className="p-3 hover:bg-gray-100 rounded-2xl transition-all"
          >
            <X size={24} className="text-gray-400" />
          </button>
        </div>

        <div className="p-8 space-y-10 overflow-y-auto">
          {existingCustomers.length > 0 && (
            <div className="p-6 bg-[#1B4332]/5 rounded-3xl border border-[#1B4332]/10 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <User size={16} className="text-[#1B4332]" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#1B4332]">
                  Current Registration
                </span>
              </div>
              <div className="space-y-2">
                {existingCustomers.map((c, idx) => (
                  <div key={idx} className="flex flex-col border-l-2 border-[#1B4332]/20 pl-4 py-1">
                    <p className="text-sm font-bold text-gray-900">{c.name}</p>
                    <p className="text-[10px] text-gray-500 font-medium">Aadhar: {c.aadharNumber}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

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
                  className={`group p-4 rounded-2xl border-2 text-left transition-all ${selectedStatus === s.id
                    ? "border-[#1B4332] bg-[#1B4332]/5 ring-4 ring-[#1B4332]/5"
                    : "border-gray-50 bg-white hover:border-gray-200"
                    }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-black uppercase tracking-widest ${selectedStatus === s.id
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

          {showCustomerFields && (
            <div className="space-y-8 pt-10 border-t border-gray-100 animate-in slide-in-from-top-4 duration-500">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-[#1B4332] flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#1B4332] rounded-full" />
                  Joint Customer Details
                </label>
                <button
                  type="button"
                  onClick={handleAddCustomer}
                  className="px-4 py-2 bg-[#1B4332]/5 text-[#1B4332] rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#1B4332]/10 transition-all border border-[#1B4332]/10"
                >
                  + Add Customer
                </button>
              </div>

              {customersData.map((customer, index) => (
                <div key={index} className="p-6 bg-gray-50/50 rounded-4xl border border-gray-100 space-y-6 relative group/card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#1B4332]/40">
                      Customer #{index + 1}
                    </span>
                    {customersData.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomer(index)}
                        className="text-red-400 hover:text-red-500 transition-colors p-1"
                        title="Remove Customer"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2 md:col-span-2">
                      <div className="relative group/input">
                        <User
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <input
                          required
                          value={customer.name}
                          onChange={(e) => handleCustomerChange(index, 'name', e.target.value)}
                          placeholder="Full Name"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative group/input">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#1B4332] transition-colors font-bold text-[10px]">
                          Aadhar
                        </div>
                        <input
                          value={customer.aadharNumber}
                          onChange={(e) => handleCustomerChange(index, 'aadharNumber', e.target.value)}
                          placeholder="12 Digit No"
                          className="w-full pl-16 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="relative group/input">
                        <Phone
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within/input:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <input
                          value={customer.phone}
                          onChange={(e) => handleCustomerChange(index, 'phone', e.target.value)}
                          placeholder="Phone Number"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-white"
                        />
                      </div>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <div className="relative group/input">
                        <MapPin
                          className="absolute left-4 top-6 text-gray-300 group-focus-within/input:text-[#1B4332] transition-colors"
                          size={18}
                        />
                        <textarea
                          rows={2}
                          value={customer.address}
                          onChange={(e) => handleCustomerChange(index, 'address', e.target.value)}
                          placeholder="Address"
                          className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all bg-white resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-8 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-4 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-white transition-all"
          >
            Cancel
          </button>
          <button
            onClick={validateAndSave}
            disabled={isPending}
            className="px-12 py-4 bg-[#1B4332] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#133024] transition-all flex items-center gap-3 shadow-2xl shadow-[#1B4332]/30 disabled:opacity-50 active:scale-95"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Updating Status..." : "Save Status Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
