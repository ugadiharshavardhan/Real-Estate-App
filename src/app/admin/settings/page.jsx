import {
  Settings,
  Bell,
  Lock,
  User,
  Database,
  Globe,
  Mail,
  Save,
  ShieldCheck,
} from "lucide-react";

export default function AdminSettings() {
  const sections = [
    {
      title: "Profile",
      icon: User,
      desc: "Manage your account details and preferences.",
    },
    {
      title: "Notifications",
      icon: Bell,
      desc: "Configure how you receive alerts and updates.",
    },
    {
      title: "Security",
      icon: Lock,
      desc: "Update password and security settings.",
    },
    {
      title: "Site Info",
      icon: Globe,
      desc: "Edit business details displayed on the site.",
    },
    {
      title: "Email Configuration",
      icon: Mail,
      desc: "SMTP and notification email settings.",
    },
    {
      title: "Database & Sync",
      icon: Database,
      desc: "Manage data sync and backup options.",
    },
  ];

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
            Settings
          </h1>
          <p className="text-gray-500 font-inter">
            Configure your workspace and portal preferences.
          </p>
        </div>
        <button className="px-6 py-3 bg-[#1B4332] text-white rounded-2xl text-sm font-bold hover:bg-[#133024] transition-all flex items-center gap-2 font-inter shadow-lg shadow-[#1B4332]/20">
          <Save size={18} />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation / List */}
        <div className="lg:col-span-1 space-y-2">
          {sections.map((section, index) => (
            <button
              key={index}
              className={`w-full text-left p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                index === 3
                  ? "bg-[#1B4332] border-[#1B4332] text-white shadow-xl shadow-[#1B4332]/20"
                  : "bg-white border-gray-100 text-gray-900 hover:border-gray-200"
              }`}
            >
              <div
                className={`p-3 rounded-2xl ${index === 3 ? "bg-white/10" : "bg-gray-50"}`}
              >
                <section.icon
                  size={20}
                  className={index === 3 ? "text-white" : "text-[#1B4332]"}
                />
              </div>
              <div>
                <h3 className="font-bold text-sm mb-1">{section.title}</h3>
                <p
                  className={`text-[11px] leading-snug ${index === 3 ? "text-white/60" : "text-gray-400"}`}
                >
                  {section.desc}
                </p>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area (Currently focused on Site Info as an example) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-[40px] p-10 border border-gray-50 shadow-sm">
            <h2 className="text-2xl font-playfair font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Globe className="text-[#1B4332]" />
              Site Information
            </h2>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                    Business Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Ugadi Ventures"
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                    Support Email
                  </label>
                  <input
                    type="email"
                    defaultValue="contact@ugadiventures.com"
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                  Office Address
                </label>
                <textarea
                  rows={3}
                  defaultValue="123 Real Estate Plaza, Commercial Road, Kurnool, Andhra Pradesh"
                  className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all resize-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                    Primary Phone
                  </label>
                  <input
                    type="text"
                    defaultValue="+91 98765 43210"
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-gray-400 ml-1">
                    Working Hours
                  </label>
                  <input
                    type="text"
                    defaultValue="Mon - Sat | 9:00 AM - 7:00 PM"
                    className="w-full px-6 py-4 bg-gray-50/50 border border-gray-100 rounded-2xl text-sm font-inter focus:outline-none focus:ring-2 focus:ring-[#1B4332]/5 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-50 flex items-center justify-between">
              <div className="flex items-center gap-3 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-xs font-bold font-inter tracking-wide uppercase">
                  Changes Auto-saved
                </span>
              </div>
              <div className="flex gap-4">
                <button className="text-sm font-bold text-gray-400 hover:text-gray-600 transition-colors">
                  Discard
                </button>
                <button className="px-8 py-3 bg-[#1B4332] text-white rounded-xl text-sm font-bold hover:bg-[#133024] transition-all shadow-md">
                  Apply Update
                </button>
              </div>
            </div>
          </div>

          <div className="bg-orange-50/50 border border-orange-100 rounded-[32px] p-8 flex items-center gap-6">
            <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 shrink-0">
              <ShieldCheck size={24} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 text-sm mb-1">
                Security Recommendation
              </h4>
              <p className="text-xs text-gray-500 leading-relaxed max-w-md">
                Your site information is visible to the public. Ensure all
                contact details are correct to maintain professional customer
                engagement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
