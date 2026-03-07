"use client";

import { useState } from "react";
import { Edit3 } from "lucide-react";
import PlotForm from "./PlotForm";

export default function PlotActions({ plot }) {
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowEditForm(true)}
        className="p-2 text-gray-400 hover:text-[#1B4332] transition-colors rounded-lg hover:bg-[#1B4332]/5"
      >
        <Edit3 size={18} />
      </button>
      {showEditForm && (
        <PlotForm plot={plot} onClose={() => setShowEditForm(false)} />
      )}
    </>
  );
}
