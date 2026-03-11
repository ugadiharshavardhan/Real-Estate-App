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
  X,
} from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminSidebar({ isOpen, onClose }) {
  const pathname = usePathname();
  const { user } = useUser();

  const menuItems = [
    { name: "Overview", icon: LayoutDashboard, href: "/admin" },
    { name: "Projects", icon: Building2, href: "/admin/projects" },
    { name: "Plots", icon: Map, href: "/admin/plots" },
    { name: "Enquiries", icon: MessageSquare, href: "/admin/enquiries" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full overflow-y-auto">
      <div className="p-8 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl font-playfair font-bold tracking-wider">
          VENTRIVO{" "}
          <span className="text-xs block text-white/60 font-inter font-normal mt-1 tracking-widest uppercase">
            Admin Portal
          </span>
        </h1>
        <button onClick={onClose} className="lg:hidden p-2 text-white/60 hover:text-white transition-colors">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 p-6 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
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
                <span className="font-medium text-sm md:text-base">{item.name}</span>
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
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-[#1B4332] text-white flex-col fixed left-0 top-0 bottom-0 z-50">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#1B4332] text-white z-101 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
