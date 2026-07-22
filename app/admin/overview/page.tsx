"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardList,
  Users,
  DollarSign,
  CalendarCheck,
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  MessageCircle,
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_CUSTOMERS, type BookingStatus } from "@/lib/adminMockData";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; icon: React.ElementType }> = {
  pending: { label: "Pending", color: "text-yellow-700", bg: "bg-yellow-100", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-blue-700", bg: "bg-blue-100", icon: AlertCircle },
  completed: { label: "Completed", color: "text-green-700", bg: "bg-green-100", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-700", bg: "bg-red-100", icon: XCircle },
};

function buildWhatsAppMessage(booking: typeof MOCK_BOOKINGS[0]): string {
  const msg = `🛡️ *PestIQ — New Appointment*\n\n` +
    `*Booking ID:* ${booking.id}\n` +
    `*Customer:* ${booking.customerName}\n` +
    `*Phone:* ${booking.phone}\n` +
    `*Address:* ${booking.address}, ${booking.city}, ${booking.state} ${booking.zip}\n` +
    `*Service:* ${booking.service}\n` +
    `*Plan:* ${booking.plan}\n` +
    `*Date:* ${new Date(booking.scheduledDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n` +
    `*Time:* ${booking.scheduledTime}\n` +
    `*Property Size:* ${booking.sqFt.toLocaleString()} sq ft\n` +
    `*Notes:* ${booking.notes || "None"}\n\n` +
    `Please confirm receipt. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminOverviewPage() {
  const totalBookings = MOCK_BOOKINGS.length;
  const pendingCount = MOCK_BOOKINGS.filter(b => b.status === "pending").length;
  const confirmedCount = MOCK_BOOKINGS.filter(b => b.status === "confirmed").length;
  const completedCount = MOCK_BOOKINGS.filter(b => b.status === "completed").length;
  const totalRevenue = MOCK_BOOKINGS.filter(b => b.status === "completed").reduce((s, b) => s + b.price, 0);
  const recentBookings = [...MOCK_BOOKINGS].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-[#071b4d] text-2xl lg:text-3xl font-black tracking-tight">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">
          {new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total Bookings", value: totalBookings, sub: `${pendingCount} pending`, icon: ClipboardList, color: "bg-blue-600", light: "bg-blue-50 text-blue-600" },
          { label: "Active Customers", value: MOCK_CUSTOMERS.length, sub: "All time", icon: Users, color: "bg-purple-600", light: "bg-purple-50 text-purple-600" },
          { label: "Revenue (Completed)", value: `$${totalRevenue.toLocaleString()}`, sub: `${completedCount} completed`, icon: DollarSign, color: "bg-green-600", light: "bg-green-50 text-green-600" },
          { label: "Confirmed This Week", value: confirmedCount, sub: "Upcoming appointments", icon: CalendarCheck, color: "bg-yellow-500", light: "bg-yellow-50 text-yellow-600" },
        ].map(({ label, value, sub, icon: Icon, color, light }) => (
          <div key={label} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
            <div className={`inline-flex w-10 h-10 rounded-xl ${light} items-center justify-center mb-3`}>
              <Icon className="w-5 h-5" />
            </div>
            <p className="text-slate-500 text-xs font-semibold mb-0.5">{label}</p>
            <p className="text-[#071b4d] text-2xl font-black">{value}</p>
            <p className="text-slate-400 text-[11px] mt-0.5 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> {sub}
            </p>
          </div>
        ))}
      </div>

      {/* Two-column: Recent bookings + Quick actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <h2 className="text-[#071b4d] font-black text-sm">Recent Bookings</h2>
            <Link href="/admin/bookings" className="text-[#1557b8] text-xs font-bold flex items-center gap-1 hover:underline">
              View All <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recentBookings.map(booking => {
              const cfg = STATUS_CONFIG[booking.status];
              const StatusIcon = cfg.icon;
              return (
                <div key={booking.id} className="px-6 py-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-[#071b4d] text-sm font-bold truncate">{booking.customerName}</p>
                    <p className="text-slate-400 text-xs truncate">{booking.service} · {booking.city}, {booking.state}</p>
                  </div>
                  <div className="hidden sm:block text-slate-500 text-xs whitespace-nowrap">
                    {new Date(booking.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    {" · "}{booking.scheduledTime}
                  </div>
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${cfg.bg} ${cfg.color} flex-shrink-0`}>
                    <StatusIcon className="w-3 h-3" /> {cfg.label}
                  </span>
                  <a
                    href={buildWhatsAppMessage(booking)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Send to Technician via WhatsApp"
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                  >
                    <MessageCircle className="w-4 h-4 text-green-600" />
                  </a>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions + Status Summary */}
        <div className="space-y-4">
          {/* Quick actions */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-[#071b4d] font-black text-sm mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <Link href="/admin/bookings" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-blue-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                  <ClipboardList className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-[#071b4d] text-sm font-semibold">Manage Bookings</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </Link>
              <Link href="/admin/customers" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-purple-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-[#071b4d] text-sm font-semibold">Customer CRM</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </Link>
              <Link href="/admin/calendar" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-green-50 transition-colors group">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
                  <CalendarCheck className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-[#071b4d] text-sm font-semibold">Appointment Calendar</span>
                <ArrowRight className="w-4 h-4 text-slate-400 ml-auto" />
              </Link>
            </div>
          </div>

          {/* Status breakdown */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h2 className="text-[#071b4d] font-black text-sm mb-4">Booking Status</h2>
            <div className="space-y-3">
              {(["pending", "confirmed", "completed", "cancelled"] as BookingStatus[]).map(status => {
                const cfg = STATUS_CONFIG[status];
                const count = MOCK_BOOKINGS.filter(b => b.status === status).length;
                const pct = Math.round((count / totalBookings) * 100);
                return (
                  <div key={status}>
                    <div className="flex justify-between mb-1">
                      <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
                      <span className="text-xs text-slate-500">{count}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100">
                      <div
                        className={`h-1.5 rounded-full ${
                          status === "pending" ? "bg-yellow-400" :
                          status === "confirmed" ? "bg-blue-500" :
                          status === "completed" ? "bg-green-500" : "bg-red-400"
                        }`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
