"use client";

import { useState, useTransition } from "react";
import { createProject, updateProject } from "@/utils/actions/admin";
import { Loader2, X, Upload, Plus, Trash2 } from "lucide-react";

export default function ProjectForm({ project, onClose }) {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    name: project?.name || "",
    slug: project?.slug || "",
    location: project?.location || "",
    description: project?.description || "",
    heroImage: project?.heroImage || "",
    totalPlots: project?.totalPlots || 0,
    totalAcres: project?.totalAcres || 0,
    layoutSvg: project?.layoutSvg || "",
    amenities: project?.amenities || [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    startTransition(async () => {
      const res = project?._id
        ? await updateProject(project._id, formData)
        : await createProject(formData);

      if (res.success) {
        onClose();
      } else {
        alert("Operation failed: " + res.error);
      }
    });
  };

  const addAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, { title: "", icon: "" }],
    });
  };

  const updateAmenity = (index, field, value) => {
    const newAmenities = [...formData.amenities];
    newAmenities[index][field] = value;
    setFormData({ ...formData, amenities: newAmenities });
  };

  const removeAmenity = (index) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-2xl font-playfair font-bold text-gray-900">
            {project?._id ? "Edit Project" : "New Project"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-8 space-y-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Project Name
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter"
                placeholder="Ugadi Ventures II"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Slug
              </label>
              <input
                required
                value={formData.slug}
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm"
                placeholder="ugadi-ventures-ii"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Location
              </label>
              <input
                required
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm"
                placeholder="Shadnagar, Hyderabad"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Total Plots
              </label>
              <input
                type="number"
                required
                value={formData.totalPlots}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalPlots: parseInt(e.target.value),
                  })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Total Acres
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={formData.totalAcres}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    totalAcres: parseFloat(e.target.value),
                  })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm"
              />
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm resize-none"
                placeholder="Brief overview of the venture..."
              />
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Hero Image URL
              </label>
              <input
                required
                value={formData.heroImage}
                onChange={(e) =>
                  setFormData({ ...formData, heroImage: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm"
                placeholder="https://images.unsplash.com/..."
              />
            </div>

            <div className="col-span-full space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Layout SVG (Path or Content)
              </label>
              <textarea
                required
                rows={3}
                value={formData.layoutSvg}
                onChange={(e) =>
                  setFormData({ ...formData, layoutSvg: e.target.value })
                }
                className="w-full px-5 py-3 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 font-inter text-sm resize-none"
                placeholder="SVG content or path to asset..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold uppercase tracking-widest text-gray-400">
                Amenities
              </label>
              <button
                type="button"
                onClick={addAmenity}
                className="text-[#1B4332] text-xs font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Amenity
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {formData.amenities.map((amenity, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <input
                    placeholder="Title"
                    value={amenity.title}
                    onChange={(e) =>
                      updateAmenity(index, "title", e.target.value)
                    }
                    className="flex-1 px-4 py-2 text-sm rounded-xl border border-gray-100 focus:outline-none"
                  />
                  <input
                    placeholder="Icon (Lucide)"
                    value={amenity.icon}
                    onChange={(e) =>
                      updateAmenity(index, "icon", e.target.value)
                    }
                    className="w-24 px-4 py-2 text-sm rounded-xl border border-gray-100 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => removeAmenity(index)}
                    className="p-2 text-red-300 hover:text-red-500"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-100 transition-all font-inter"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isPending}
            className="px-8 py-2.5 bg-[#1B4332] text-white rounded-xl text-sm font-bold hover:bg-[#133024] transition-all flex items-center gap-2 shadow-lg shadow-[#1B4332]/20 disabled:opacity-50"
          >
            {isPending && <Loader2 size={16} className="animate-spin" />}
            {isPending ? "Savng..." : "Save Project"}
          </button>
        </div>
      </div>
    </div>
  );
}
