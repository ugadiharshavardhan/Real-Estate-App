import { Suspense } from "react";
import Link from "next/link";
import { getAllReservedPlots } from "@/utils/data/projects";
import {
  ArrowLeft,
  Clock,
  User,
  Phone,
  Mail,
  Map as MapIcon,
  Timer,
  ExternalLink,
} from "lucide-react";
import PlotStatusToggle from "@/components/admin/PlotStatusToggle";
import AdminLoading from "@/components/admin/AdminLoading";

function TimeRemaining({ reservedUntil }) {
  if (!reservedUntil) return <span className="text-gray-400">N/A</span>;
  
  const expiryDate = new Date(reservedUntil);
  const now = new Date();
  
  if (expiryDate < now) {
    return <span className="text-red-500 font-bold uppercase text-[10px] tracking-widest">Expired</span>;
  }
  
  const diffHours = Math.floor((expiryDate - now) / (1000 * 60 * 60));
  const isExpiringSoon = diffHours < 6;
  
  return (
    <div className={`flex items-center gap-1.5 ${isExpiringSoon ? 'text-orange-500' : 'text-green-600'}`}>
      <Timer size={14} className={isExpiringSoon ? 'animate-pulse' : ''} />
      <span className="font-bold font-inter text-sm">
        {diffHours}h remaining
      </span>
    </div>
  );
}

async function ReservedPlotsList() {
  const plots = await getAllReservedPlots();

  if (!plots || plots.length === 0) {
    return (
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
           <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 font-playfair mb-2">No Active Reservations</h3>
        <p className="text-gray-500 max-w-sm font-inter">
          There are currently no plots actively reserved by customers. Check back later or review the main inventory.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Mobile View: Cards */}
      <div className="md:hidden divide-y divide-gray-50">
        {plots.map((plot) => {
          const customer = plot.customer && plot.customer.length > 0 ? plot.customer[0] : null;
          
          return (
            <div key={plot._id?.toString() || plot.plotId} className="p-5 space-y-5">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center font-bold text-yellow-700 font-inter">
                    {plot.plotNumber}
                  </div>
                  <div>
                    <Link href={`/projects/${plot.projectId?.slug}`} target="_blank" className="flex items-center gap-1 text-[10px] text-gray-500 hover:text-[#1B4332] transition-colors">
                      {plot.projectId?.name || "Project"} <ExternalLink size={10} />
                    </Link>
                    <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Plot {plot.plotNumber}</span>
                  </div>
                </div>
                <TimeRemaining reservedUntil={plot.reservedUntil} />
              </div>

              {customer ? (
                <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Customer Details</p>
                  <div className="flex items-center gap-2 text-sm font-bold text-gray-900 capitalize">
                    <User size={14} className="text-gray-400" /> {customer.name}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={14} className="text-gray-400" />
                    <a href={`tel:${customer.phone}`} className="hover:text-[#1B4332] hover:underline">{customer.phone}</a>
                  </div>
                  {customer.email && (
                    <div className="flex items-center gap-2 text-sm text-gray-600 truncate">
                      <Mail size={14} className="text-gray-400 shrink-0" />
                      <a href={`mailto:${customer.email}`} className="hover:text-[#1B4332] hover:underline truncate">{customer.email}</a>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-orange-50 text-orange-600 p-3 rounded-xl text-xs flex items-center gap-2">
                  <User size={14} /> Missing customer data
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pb-2 border-b border-gray-50">
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Reserved At</p>
                  <p className="text-xs font-bold text-gray-900">
                    {plot.reservedAt ? new Date(plot.reservedAt).toLocaleString() : "Unknown"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest">Pricing</p>
                  <p className="text-sm font-bold text-[#1B4332]">₹{(plot.price / 100000).toFixed(2)} Lac</p>
                </div>
              </div>

              <div className="pt-2">
                 <p className="text-[9px] text-gray-400 font-black uppercase tracking-widest mb-2">Upgrade Status</p>
                 <PlotStatusToggle plot={plot} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop View: Table */}
      <table className="hidden md:table w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-50/50">
            <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
              Plot Info
            </th>
            <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
              Customer Contact
            </th>
            <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
              Reservation Timeline
            </th>
            <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter">
              Pricing
            </th>
            <th className="px-8 py-5 text-[10px] text-gray-400 uppercase font-bold tracking-widest font-inter text-right">
              Action / Upgrade
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {plots.map((plot) => {
            const customer = plot.customer && plot.customer.length > 0 ? plot.customer[0] : null;

            return (
              <tr
                key={plot._id?.toString() || plot.plotId}
                className="hover:bg-gray-50/30 transition-colors group"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center font-bold text-yellow-700 font-inter">
                      {plot.plotNumber}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">Plot {plot.plotNumber}</span>
                      <Link href={`/projects/${plot.projectId?.slug}`} target="_blank" className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-[#1B4332] transition-colors mt-0.5">
                        {plot.projectId?.name || "Project"} <ExternalLink size={10} />
                      </Link>
                    </div>
                  </div>
                </td>
                
                <td className="px-8 py-6">
                  {customer ? (
                    <div className="space-y-1.5">
                      <p className="text-sm font-bold text-gray-900 capitalize flex items-center gap-2">
                        <User size={14} className="text-gray-400" /> {customer.name}
                      </p>
                      <div className="flex flex-col gap-1 text-xs text-gray-500">
                        <a href={`tel:${customer.phone}`} className="flex items-center gap-2 hover:text-[#1B4332] transition-colors">
                          <Phone size={12} className="text-gray-400" /> {customer.phone}
                        </a>
                        {customer.email && (
                          <a href={`mailto:${customer.email}`} className="flex items-center gap-2 hover:text-[#1B4332] transition-colors truncate max-w-[200px]" title={customer.email}>
                            <Mail size={12} className="text-gray-400 shrink-0" /> <span className="truncate">{customer.email}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  ) : (
                    <span className="text-xs text-orange-500 bg-orange-50 px-2 py-1 rounded">No customer data</span>
                  )}
                </td>

                <td className="px-8 py-6">
                  <div className="space-y-2">
                    <TimeRemaining reservedUntil={plot.reservedUntil} />
                    <div className="text-[10px] text-gray-400">
                      Reserved: <span className="font-medium text-gray-600">{plot.reservedAt ? new Date(plot.reservedAt).toLocaleDateString() : "Unknown"}</span>
                    </div>
                  </div>
                </td>

                <td className="px-8 py-6">
                  <span className="text-sm font-bold text-gray-900 font-inter">
                    ₹{(plot.price / 100000).toFixed(2)} L
                  </span>
                </td>
                
                <td className="px-8 py-6 text-right w-48">
                  <PlotStatusToggle plot={plot} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

import { CheckCircle2 } from "lucide-react"; // Import CheckCircle for empty state

export default function ReservedPlotsCRM() {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <div className="flex items-center gap-2 text-gray-400 mb-2">
            <Link
              href="/admin"
              className="hover:text-gray-600 transition-colors"
            >
              Dashboard
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-bold">
              CRM
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900 flex items-center gap-3">
            Active Reservations
            <span className="bg-yellow-100 text-yellow-800 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-yellow-200 mt-1">
              CRM View
            </span>
          </h1>
        </div>
        
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-xl border border-gray-100 shadow-sm flex items-center gap-2">
          <Clock size={16} className="text-[#1B4332]" />
          Plots auto-expire after 24 hours
        </div>
      </div>

      <Suspense fallback={<AdminLoading />}>
        <ReservedPlotsList />
      </Suspense>
    </div>
  );
}
