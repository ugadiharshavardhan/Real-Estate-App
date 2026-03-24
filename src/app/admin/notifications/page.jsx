import { Suspense } from "react";
import Link from "next/link";
import { getEnquiries } from "@/utils/data/enquiries";
import { getAllReservedPlots } from "@/utils/data/projects";
import {
  Bell,
  MessageSquare,
  Clock,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import AdminLoading from "@/components/admin/AdminLoading";

function getStatusBadge(status) {
  switch (status) {
    case "pending":
    case "reserved":
      return (
        <span className="bg-yellow-100 text-yellow-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-yellow-200">
          Action Required
        </span>
      );
    case "contacted":
    case "booked":
    case "registered":
      return (
        <span className="bg-green-100 text-green-800 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-green-200">
          Resolved
        </span>
      );
    default:
      return null;
  }
}

async function NotificationsFeed() {
  // Fetch data in parallel
  const [enquiriesData, reservedPlotsData] = await Promise.all([
    getEnquiries(),
    getAllReservedPlots()
  ]);

  // Transform Enquiries into timeline events
  const enquiryEvents = enquiriesData
    .filter(enq => enq.status === 'pending') // Only show actionable enquiries
    .map(enq => ({
      id: `enq-${enq._id}`,
      type: 'enquiry',
      title: 'New Callback Request',
      description: `Message: "${enq.message}"`,
      customer: enq.name,
      contact: enq.phone,
      date: new Date(enq.createdAt),
      icon: MessageSquare,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100',
      status: enq.status,
      actionLink: '/admin/enquiries',
      actionText: 'View Enquiry'
    }));

  // Transform Reservations into timeline events
  const reservationEvents = reservedPlotsData
    .map(plot => {
      const customer = plot.customer && plot.customer.length > 0 ? plot.customer[0] : null;
      return {
        id: `res-${plot._id}`,
        type: 'reservation',
        title: `Plot ${plot.plotNumber} Reserved`,
        description: `Project: ${plot.projectId?.name || 'Unknown'}`,
        customer: customer ? customer.name : 'Unknown',
        contact: customer ? customer.phone : 'Unknown',
        date: new Date(plot.reservedAt || new Date()), // Fallback if reservedAt missing
        icon: Clock,
        iconColor: 'text-orange-600',
        iconBg: 'bg-orange-100',
        status: plot.status,
        actionLink: '/admin/reserved',
        actionText: 'Manage Reservation'
      };
    });

  // Combine and sort by date descending (newest first)
  const allNotifications = [...enquiryEvents, ...reservationEvents]
    .sort((a, b) => b.date - a.date);

  if (allNotifications.length === 0) {
    return (
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm p-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
           <CheckCircle2 size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 font-playfair mb-2">You're All Caught Up!</h3>
        <p className="text-gray-500 max-w-sm font-inter text-sm">
          There are no pending enquiries or active reservations requiring your attention right now.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-[40px] p-6 sm:p-10 border border-gray-50 shadow-sm">
      <h2 className="text-xl sm:text-2xl font-playfair font-bold text-gray-900 mb-8 flex items-center gap-3">
        <Bell className="text-[#1B4332]" />
        Activity Feed
      </h2>

      <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 space-y-12 pb-4">
        {allNotifications.map((notif, index) => (
          <div key={notif.id} className="relative pl-8 md:pl-10 group">
            {/* Timeline Dot/Icon */}
            <div className={`absolute -left-[21px] md:-left-[25px] top-0 w-10 h-10 md:w-12 md:h-12 ${notif.iconBg} rounded-2xl flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110`}>
              <notif.icon size={20} className={notif.iconColor} />
            </div>

            {/* Notification Card */}
            <div className="bg-gray-50/50 hover:bg-white rounded-3xl p-6 border border-gray-100 hover:border-[#1B4332]/20 hover:shadow-lg hover:shadow-[#1B4332]/5 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg font-playfair">{notif.title}</h3>
                    {getStatusBadge(notif.status)}
                  </div>
                  <p className="text-sm text-gray-500 font-inter max-w-xl leading-relaxed">
                    {notif.description}
                  </p>
                </div>
                <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest bg-white px-3 py-1.5 rounded-lg border border-gray-100 shrink-0">
                  {notif.date.toLocaleString()}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-gray-600">
                  <span className="flex items-center gap-1.5 opacity-80">
                    User: <span className="text-gray-900 opacity-100">{notif.customer}</span>
                  </span>
                  <span className="text-gray-300">|</span>
                  <span className="flex items-center gap-1.5 opacity-80">
                    Contact: <span className="text-gray-900 opacity-100">{notif.contact}</span>
                  </span>
                </div>

                <Link 
                  href={notif.actionLink}
                  className="flex items-center gap-2 text-sm font-bold text-[#1B4332] hover:text-[#C5A059] transition-colors shrink-0 group/link"
                >
                  {notif.actionText}
                  <ArrowRight size={16} className="transform group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NotificationsCenter() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
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
              Activity
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-playfair font-bold text-gray-900">
            Notifications
          </h1>
        </div>
      </div>

      <Suspense fallback={<AdminLoading />}>
        <NotificationsFeed />
      </Suspense>

      <div className="bg-blue-50/50 border border-blue-100 rounded-[32px] p-6 sm:p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
          <ShieldCheck size={24} />
        </div>
        <div className="text-center sm:text-left">
          <h4 className="font-bold text-gray-900 text-sm mb-1">
            Stay on Top of Leads
          </h4>
          <p className="text-xs text-gray-500 leading-relaxed max-w-3xl">
            This activity feed centralizes all urgent actions required by the admin team. It automatically pulls in 
            all unread callback enquiries and active 24-hour plot reservations. Clearing these notifications 
            requires navigating to their respective pages to resolve them.
          </p>
        </div>
      </div>
    </div>
  );
}
