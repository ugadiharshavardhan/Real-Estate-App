import { Suspense } from "react";
import { getEnquiries } from "@/utils/data/enquiries";
import {
  MessageSquare,
  Phone,
  Mail,
  Building2,
  Clock,
  MoreVertical,
  ChevronRight,
} from "lucide-react";
import EnquiryStatusToggle from "@/components/admin/EnquiryStatusToggle";

async function EnquiryList() {
  const enquiries = await getEnquiries();

  if (enquiries.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-20 border border-dashed border-gray-200 flex flex-col items-center text-center">
        <div className="p-4 bg-gray-50 rounded-full mb-6">
          <MessageSquare size={48} className="text-gray-300" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          No enquiries yet
        </h3>
        <p className="text-gray-500 max-w-sm">
          Lead enquiries from the venture pages will appear here for you to
          manage.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {enquiries.map((enquiry) => (
        <div
          key={enquiry._id}
          className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col lg:flex-row items-start lg:items-center gap-8 group hover:shadow-md transition-shadow"
        >
          {/* User Identity */}
          <div className="flex items-center gap-4 min-w-[240px]">
            <div className="w-14 h-14 bg-[#1B4332]/5 rounded-2xl flex items-center justify-center font-bold text-[#1B4332] text-xl">
              {enquiry.name?.charAt(0) || "U"}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-lg">
                {enquiry.name}
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1.5 uppercase font-bold tracking-widest mt-0.5">
                <Clock size={12} />
                {new Date(enquiry.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="flex items-center gap-2 text-sm text-gray-600 font-inter">
              <Mail size={16} className="text-gray-300" />
              {enquiry.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600 font-inter font-bold">
              <Phone size={16} className="text-[#1B4332]" />
              {enquiry.phone}
            </div>
          </div>

          {/* Project Interest */}
          <div className="flex-1 bg-gray-50 rounded-2xl p-4 flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Building2 size={20} className="text-[#1B4332]" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">
                Inquiry For
              </p>
              <p className="text-sm font-bold text-gray-900">
                {enquiry.projectId?.name || "General Inquiry"}
              </p>
            </div>
            {enquiry.plotId && (
              <div className="ml-auto border-l border-gray-200 pl-4">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">
                  Plot
                </p>
                <p className="text-sm font-bold text-[#1B4332]">
                  {enquiry.plotId.replace("plot-", "#")}
                </p>
              </div>
            )}
          </div>

          {/* Status & Actions */}
          <div className="flex items-center gap-4 ml-auto lg:ml-0">
            <EnquiryStatusToggle
              enquiryId={enquiry._id.toString()}
              currentStatus={enquiry.status}
            />
            {/* ... buttons ... */}
            <button className="flex items-center gap-2 bg-[#1B4332] text-white px-6 py-2.5 rounded-2xl text-sm font-bold hover:bg-[#133024] transition-all group">
              View
              <ChevronRight
                size={16}
                className="group-hover:translate-x-1 transition-transform"
              />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function EnquiryListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 flex flex-col lg:flex-row items-center gap-8">
          <div className="flex items-center gap-4 min-w-[240px]">
            <div className="w-14 h-14 bg-gray-50 rounded-2xl" />
            <div className="space-y-2">
              <div className="h-5 bg-gray-100 rounded w-24" />
              <div className="h-3 bg-gray-50 rounded w-16" />
            </div>
          </div>
          <div className="flex flex-col gap-2 min-w-[200px]">
            <div className="h-4 bg-gray-50 rounded w-32" />
            <div className="h-4 bg-gray-50 rounded w-28" />
          </div>
          <div className="flex-1 h-16 bg-gray-50 rounded-2xl" />
          <div className="h-10 bg-gray-50 rounded-xl w-32" />
        </div>
      ))}
    </div>
  );
}

export default function AdminEnquiries() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
            Enquiries
          </h1>
          <p className="text-gray-500 font-inter">
            Manage leads and customer communications.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 font-medium self-center ml-4">
            4 Active Agents Online
          </p>
        </div>
      </div>

      {/* Enquiry List */}
      <Suspense fallback={<EnquiryListSkeleton />}>
        <EnquiryList />
      </Suspense>
    </div>
  );
}
