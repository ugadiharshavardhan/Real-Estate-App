"use client";

import { useState, useTransition } from "react";
import { updateEnquiryStatus } from "@/utils/actions/admin";
import { Loader2, Check, ChevronDown } from "lucide-react";

export default function EnquiryStatusToggle({ enquiryId, currentStatus }) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus || "pending");
  const [isOpen, setIsOpen] = useState(false);

  const statuses = [
    {
      id: "pending",
      label: "Pending",
      color: "text-orange-600 bg-orange-50 border-orange-100",
    },
    {
      id: "contacted",
      label: "Contacted",
      color: "text-teal-600 bg-teal-50 border-teal-100",
    },
    {
      id: "closed",
      label: "Closed",
      color: "text-green-600 bg-green-50 border-green-100",
    },
  ];

  const activeStatus = statuses.find((s) => s.id === status);

  const handleUpdate = async (newStatus) => {
    if (newStatus === status) {
      setIsOpen(false);
      return;
    }

    startTransition(async () => {
      const res = await updateEnquiryStatus(enquiryId, newStatus);
      if (res.success) {
        setStatus(newStatus);
        setIsOpen(false);
      } else {
        alert("Failed to update status: " + res.error);
      }
    });
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-all hover:shadow-sm ${activeStatus?.color} min-w-[110px] justify-between`}
      >
        {isPending ? (
          <Loader2 size={12} className="animate-spin mx-auto text-gray-400" />
        ) : (
          <>
            {activeStatus?.label}
            <ChevronDown size={12} />
          </>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-full left-0 mt-2 w-36 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {statuses.map((s) => (
              <button
                key={s.id}
                onClick={() => handleUpdate(s.id)}
                className={`w-full flex items-center justify-between px-4 py-2 text-[10px] font-bold uppercase tracking-wider hover:bg-gray-50 transition-colors ${status === s.id ? s.color.split(" ")[0] : "text-gray-400"
                  }`}
              >
                {s.label}
                {status === s.id && <Check size={12} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
