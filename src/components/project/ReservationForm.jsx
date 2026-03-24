"use client";

import React, { useState } from "react";

export default function ReservationForm({ plotNumber, projectSlug, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!agreed) {
      setError("You must agree to the terms and conditions to reserve this plot.");
      return;
    }

    if (!formData.name || !formData.phone || !formData.email) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/plots/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          plotNumber,
          projectSlug,
          ...formData,
        }),
      });

      const json = await res.json();
      if (json.success) {
        onSubmit(json.data);
      } else {
        setError(json.error || "Failed to reserve plot.");
      }
    } catch (err) {
      setError("A network error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4 className="font-bold text-[#1B4332] mb-3 text-lg">Reserve Plot {plotNumber}</h4>
      
      {error && (
        <div className="mb-3 p-2 bg-red-50 text-red-600 text-[10px] sm:text-xs rounded border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Full Name</label>
          <input
            type="text"
            required
            className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332]"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        
        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Phone Number</label>
          <input
            type="tel"
            required
            className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332]"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Email Address</label>
          <input
            type="email"
            required
            className="w-full text-sm p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#1B4332]"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="flex items-start gap-2 pt-1 pb-2">
          <input
            type="checkbox"
            id="terms"
            className="mt-1"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
          />
          <label htmlFor="terms" className="text-[10px] leading-tight text-gray-500">
            <strong>Terms & Conditions:</strong> The plot is reserved for you only for <strong>24 hours</strong>. After that, the reservation will automatically expire and it will become a normal available plot.
          </label>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 py-2 text-xs font-bold text-gray-500 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-[2] py-2 text-xs font-bold text-white bg-[#1B4332] hover:bg-[#133024] rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Reserving..." : "Confirm Reservation"}
          </button>
        </div>
      </form>
    </div>
  );
}
