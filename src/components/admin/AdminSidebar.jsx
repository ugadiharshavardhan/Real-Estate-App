"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Map,
  UserPlus,
  MessageSquare,
  Settings,
  Building2,
  ChevronRight,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

export default function AdminSidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Projects", icon: Building2, href: "/admin/projects" },
    { name: "Plots", icon: Map, href: "/admin/plots" },
    { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const { user } = useUser();

  return (
    <aside className="w-64 bg-[#1B4332] text-white flex flex-col h-screen sticky top-0 overflow-y-auto">
      <div className="p-8 border-b border-white/10">
        <h1 className="text-2xl font-playfair font-bold tracking-wider">
          VENTRIVO{" "}
          <span className="text-xs block text-white/60 font-inter font-normal mt-1 tracking-widest uppercase">
            Admin Portal
          </span>
        </h1>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all group ${
                isActive
                  ? "bg-white text-[#1B4332] shadow-lg"
                  : "hover:bg-white/10 text-white/80"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon
                  size={20}
                  className={
                    isActive
                      ? "text-[#1B4332]"
                      : "text-white/40 group-hover:text-white"
                  }
                />
                <span className="font-medium">{item.name}</span>
              </div>
              {isActive && <ChevronRight size={16} />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl">
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox:
                  "w-10 h-10 rounded-full border-2 border-white/10",
              },
            }}
          />
          <div className="overflow-hidden">
            <p className="text-sm font-bold truncate">
              {user?.fullName ||
                user?.primaryEmailAddress?.emailAddress?.split("@")[0] ||
                "Admin"}
            </p>
            <p className="text-[10px] text-white/40 uppercase tracking-widest truncate">
              {user?.primaryEmailAddress?.emailAddress || "Master Access"}
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
