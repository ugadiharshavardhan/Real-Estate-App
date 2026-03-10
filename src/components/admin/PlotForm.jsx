"use client";

import { useState, useTransition } from "react";
import { updatePlot } from "@/utils/actions/admin";
import { Loader2, X } from "lucide-react";

export default function PlotForm({ plot, onClose }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    plotNumber: plot?.plotNumber || "",
    areaSqFt: plot?.areaSqFt ?? "",
    areaCents: plot?.areaCents ?? "",
    east: plot?.east ?? "",
    west: plot?.west ?? "",
    north: plot?.north ?? "",
    south: plot?.south ?? "",
    facing: plot?.facing || "",
    road: plot?.road || "",
    price: plot?.price ?? "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation: make areaSqFt and areaCents compulsory
    if (!formData.areaSqFt || !formData.areaCents) {
      alert("Both Area (Sq.Ft) and Area (Cents) are compulsory.");
      return;
    }

    startTransition(async () => {
      // Cast numeric fields to ensure they are stored correctly in MongoDB
      const processedData = {
        ...formData,
        areaSqFt: Number(formData.areaSqFt),
        areaCents: Number(formData.areaCents),
        east: formData.east ? Number(formData.east) : 0,
        west: formData.west ? Number(formData.west) : 0,
        north: formData.north ? Number(formData.north) : 0,
        south: formData.south ? Number(formData.south) : 0,
        price: Number(formData.price),
      };

      const res = await updatePlot(plot._id, processedData);
      if (res.success) {
        onClose();
      } else {
        alert("Failed to update plot: " + res.error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col font-inter">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <div className="space-y-1">
            <h2 className="text-2xl font-playfair font-bold text-gray-900">
              Plot Specifications
            </h2>
            <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">
              Plot #{plot.plotNumber} • Current Status:{" "}
              <span className="text-[#1B4332]">{plot.status}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-8 overflow-y-auto">
          {/* Status Note */}
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-2xl flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
              <span className="text-orange-600 font-bold text-xs">!</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-orange-900">
                Specifications Only
              </p>
              <p className="text-[10px] text-orange-700 leading-relaxed font-medium">
                To update the status or customer details, use the &quot;Status
                Control&quot; column in the plots table.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                Plot Number (Reference)
              </label>
              <input
                disabled
                value={formData.plotNumber}
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed text-sm font-bold"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Area (Sq.Ft)
                </label>
                <input
                  type="number"
                  required
                  value={formData.areaSqFt}
                  onChange={(e) =>
                    setFormData({ ...formData, areaSqFt: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Area (Cents)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.areaCents}
                  onChange={(e) =>
                    setFormData({ ...formData, areaCents: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  East Side (ft)
                </label>
                <input
                  type="number"
                  value={formData.east}
                  onChange={(e) =>
                    setFormData({ ...formData, east: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  West Side (ft)
                </label>
                <input
                  type="number"
                  value={formData.west}
                  onChange={(e) =>
                    setFormData({ ...formData, west: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  North Side (ft)
                </label>
                <input
                  type="number"
                  value={formData.north}
                  onChange={(e) =>
                    setFormData({ ...formData, north: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  South Side (ft)
                </label>
                <input
                  type="number"
                  value={formData.south}
                  onChange={(e) =>
                    setFormData({ ...formData, south: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Facing
                </label>
                <input
                  required
                  value={formData.facing}
                  onChange={(e) =>
                    setFormData({ ...formData, facing: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="East, West etc."
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Road Width
                </label>
                <input
                  required
                  value={formData.road}
                  onChange={(e) =>
                    setFormData({ ...formData, road: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="40ft Road"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                  Price (INR)
                </label>
                <input
                  type="number"
                  required
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-100 focus:outline-none focus:ring-4 focus:ring-[#1B4332]/5 font-bold text-gray-900 text-sm transition-all"
                  placeholder="Total Price"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-8 py-2.5 bg-[#1B4332] text-white rounded-xl text-sm font-bold hover:bg-[#133024] transition-all flex items-center gap-2 shadow-lg shadow-[#1B4332]/20 disabled:opacity-50"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Updating..." : "Update Plot"}
          </button>
        </div>
      </div>
    </div>
  );
}
