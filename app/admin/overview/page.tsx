"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardList, Users, CalendarCheck, DollarSign,
  ArrowRight, MessageCircle, TrendingUp, TrendingDown,
  CheckCircle, XCircle, Clock, AlertCircle,
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_CUSTOMERS, type BookingStatus } from "@/lib/adminMockData";

const STATUS_META: Record<BookingStatus, { label: string; dot: string; text: string; bg: string }> = {
  pending:   { label: "Pending",   dot: "bg-amber-400",  text: "text-amber-700",  bg: "bg-amber-50"  },
  confirmed: { label: "Confirmed", dot: "bg-blue-500",   text: "text-blue-700",   bg: "bg-blue-50"   },
  completed: { label: "Completed", dot: "bg-emerald-500",text: "text-emerald-700",bg: "bg-emerald-50" },
  cancelled: { label: "Cancelled", dot: "bg-red-400",    text: "text-red-700",    bg: "bg-red-50"    },
};

function buildWA(b: (typeof MOCK_BOOKINGS)[0]) {
  const msg =
    `🛡️ *PestIQ — Service Assignment*\n\n` +
    `*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Phone:* ${b.phone}\n` +
    `*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n` +
    `*Service:* ${b.service} (${b.plan})\n` +
    `*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n` +
    `*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminOverviewPage() {
  const pending   = MOCK_BOOKINGS.filter(b => b.status === "pending").length;
  const confirmed = MOCK_BOOKINGS.filter(b => b.status === "confirmed").length;
  const completed = MOCK_BOOKINGS.filter(b => b.status === "completed").length;
  const revenue   = MOCK_BOOKINGS.filter(b => b.status === "completed").reduce((s,b) => s+b.price, 0);
  const recent    = [...MOCK_BOOKINGS]
    .sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0,5);
  const total     = MOCK_BOOKINGS.length;

  const stats = [
    {
      label: "Total Bookings",
      value: total,
      sub: `${pending} pending review`,
      icon: ClipboardList,
      trend: "+12%",
      up: true,
      accent: "#3b82f6",
      bg: "#eff6ff",
    },
    {
      label: "Active Customers",
      value: MOCK_CUSTOMERS.length,
      sub: "All time registrations",
      icon: Users,
      trend: "+5%",
      up: true,
      accent: "#8b5cf6",
      bg: "#f5f3ff",
    },
    {
      label: "Revenue (Completed)",
      value: `$${revenue.toLocaleString()}`,
      sub: `${completed} jobs closed`,
      icon: DollarSign,
      trend: "+23%",
      up: true,
      accent: "#10b981",
      bg: "#ecfdf5",
    },
    {
      label: "Confirmed This Week",
      value: confirmed,
      sub: "Upcoming appointments",
      icon: CalendarCheck,
      trend: confirmed > 0 ? `${confirmed} active` : "None yet",
      up: confirmed > 0,
      accent: "#f59e0b",
      bg: "#fffbeb",
    },
  ];

  const statusBreakdown = (["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => ({
    status: s,
    count: MOCK_BOOKINGS.filter(b => b.status === s).length,
    meta: STATUS_META[s],
  }));

  return (
    <div className="min-h-full bg-[#f8f9fb]">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/80 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-[#0c1a3a] text-xl font-black tracking-tight">Dashboard</h1>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">
            {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live
          </span>
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-6">

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map(({ label, value, sub, icon: Icon, trend, up, accent, bg }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: bg }}>
                  <Icon className="w-4 h-4" style={{ color: accent }} />
                </div>
                <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full ${up ? "text-emerald-700 bg-emerald-50" : "text-slate-500 bg-slate-100"}`}>
                  {up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {trend}
                </span>
              </div>
              <p className="text-[#0c1a3a] text-2xl font-black tracking-tight">{value}</p>
              <p className="text-slate-400 text-[11px] font-medium mt-1">{label}</p>
              <p className="text-slate-300 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* ── Main row ── */}
        <div className="grid lg:grid-cols-5 gap-4">

          {/* Recent Bookings — 3 cols */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <div>
                <h2 className="text-[#0c1a3a] text-sm font-black">Recent Bookings</h2>
                <p className="text-slate-400 text-[11px] mt-0.5">Latest service requests</p>
              </div>
              <Link href="/admin/bookings" className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#1557b8] hover:underline">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {recent.map(b => {
                const m = STATUS_META[b.status];
                return (
                  <div key={b.id} className="flex items-center gap-4 px-6 py-3.5 hover:bg-slate-50/70 transition-colors group">
                    {/* Avatar */}
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#1557b8] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0">
                      {b.customerName.split(" ").map(n => n[0]).join("").slice(0,2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#0c1a3a] text-xs font-bold truncate">{b.customerName}</p>
                      <p className="text-slate-400 text-[10px] truncate">{b.service} · {b.city}</p>
                    </div>
                    <div className="hidden sm:block text-right mr-2">
                      <p className="text-slate-600 text-[11px] font-semibold whitespace-nowrap">
                        {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                      </p>
                      <p className="text-slate-400 text-[10px]">{b.scheduledTime}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-bold flex-shrink-0 ${m.bg} ${m.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                      {m.label}
                    </span>
                    <a
                      href={buildWA(b)}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="WhatsApp technician"
                      className="flex-shrink-0 w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — 2 cols */}
          <div className="lg:col-span-2 space-y-4">

            {/* Booking Status */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
              <h2 className="text-[#0c1a3a] text-sm font-black mb-4">Status Overview</h2>
              <div className="space-y-3">
                {statusBreakdown.map(({ status, count, meta }) => {
                  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                  return (
                    <div key={status}>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
                          <span className="text-slate-600 text-xs font-semibold capitalize">{status}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#0c1a3a] text-xs font-black">{count}</span>
                          <span className="text-slate-300 text-[10px]">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-700 ${meta.dot}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-5">
              <h2 className="text-[#0c1a3a] text-sm font-black mb-3">Quick Actions</h2>
              <div className="space-y-1.5">
                {[
                  { href:"/admin/bookings",  label:"Manage Bookings",       icon:ClipboardList, color:"text-blue-600",   bg:"bg-blue-50"    },
                  { href:"/admin/customers", label:"Customer CRM",          icon:Users,         color:"text-purple-600", bg:"bg-purple-50"  },
                  { href:"/admin/calendar",  label:"Appointment Calendar",  icon:CalendarCheck, color:"text-emerald-600",bg:"bg-emerald-50" },
                ].map(({ href, label, icon: Icon, color, bg }) => (
                  <Link key={href} href={href}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group">
                    <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${color}`} />
                    </div>
                    <span className="text-[#0c1a3a] text-xs font-semibold flex-1">{label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
