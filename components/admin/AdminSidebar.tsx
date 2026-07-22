"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Bug,
  Bell,
} from "lucide-react";

const NAV = [
  { href: "/admin/overview",   label: "Overview",   icon: LayoutDashboard },
  { href: "/admin/bookings",   label: "Bookings",   icon: ClipboardList,  badge: 3 },
  { href: "/admin/customers",  label: "Customers",  icon: Users           },
  { href: "/admin/calendar",   label: "Calendar",   icon: CalendarDays    },
];

export default function AdminSidebar() {
  const pathname  = usePathname();
  const router    = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("pestiq_admin_auth");
    router.push("/admin");
  };

  const Content = () => (
    <div className="flex flex-col h-full select-none">

      {/* ── Brand ── */}
      <div className="px-5 py-5 flex items-center gap-3 border-b border-white/10">
        <div className="w-8 h-8 rounded-lg bg-yellow-400 flex items-center justify-center flex-shrink-0 shadow-lg">
          <Bug className="w-4 h-4 text-[#0c1a3a]" />
        </div>
        <div className="leading-tight">
          <p className="text-white font-black text-[15px] tracking-tight">PestIQ</p>
          <p className="text-white/40 text-[9px] font-semibold uppercase tracking-[0.15em]">Admin Portal</p>
        </div>
        {/* Notification dot */}
        <div className="ml-auto relative">
          <Bell className="w-4 h-4 text-white/40" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-yellow-400" />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        <p className="text-white/30 text-[9px] font-black uppercase tracking-[0.18em] px-3 pb-2 pt-1">
          Management
        </p>
        {NAV.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className={`
                group flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold
                transition-all duration-150 relative
                ${active
                  ? "bg-white/10 text-white"
                  : "text-white/60 hover:text-white hover:bg-white/[0.07]"
                }
              `}
            >
              {/* Active accent bar */}
              {active && (
                <span className="absolute left-0 inset-y-1 w-0.5 rounded-r-full bg-yellow-400" />
              )}
              <Icon className={`w-4 h-4 flex-shrink-0 ${active ? "text-yellow-400" : "text-white/40 group-hover:text-white/70"}`} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${active ? "bg-yellow-400 text-[#0c1a3a]" : "bg-white/10 text-white/60"}`}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: user + logout ── */}
      <div className="px-3 py-4 border-t border-white/10 space-y-1">
        {/* User row */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div className="w-7 h-7 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white text-xs font-black flex-shrink-0">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12px] font-semibold truncate">Administrator</p>
            <p className="text-white/40 text-[10px] truncate">pestiq-solutions.com</p>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-semibold text-white/50 hover:text-white hover:bg-white/[0.07] transition-colors"
        >
          <LogOut className="w-4 h-4 flex-shrink-0 text-white/30" />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-9 h-9 bg-[#0c1a3a] rounded-lg flex items-center justify-center text-white shadow-lg"
      >
        <Menu className="w-4 h-4" />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
      )}

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-56 bg-[#0c1a3a] transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <button onClick={() => setMobileOpen(false)} className="absolute top-3 right-3 text-white/40 hover:text-white">
          <X className="w-4 h-4" />
        </button>
        <Content />
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-[200px] bg-[#0c1a3a] flex-shrink-0 h-screen sticky top-0">
        <Content />
      </aside>
    </>
  );
}
