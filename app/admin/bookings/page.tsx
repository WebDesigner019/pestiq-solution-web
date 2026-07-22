"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  MessageCircle,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  Ruler,
  DollarSign,
  FileText,
  X,
} from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const STATUS_CONFIG: Record<BookingStatus, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  pending:   { label: "Pending",   color: "text-yellow-800", bg: "bg-yellow-50",  border: "border-yellow-200", icon: Clock },
  confirmed: { label: "Confirmed", color: "text-blue-800",   bg: "bg-blue-50",    border: "border-blue-200",   icon: AlertCircle },
  completed: { label: "Completed", color: "text-green-800",  bg: "bg-green-50",   border: "border-green-200",  icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "text-red-800",    bg: "bg-red-50",     border: "border-red-200",    icon: XCircle },
};

function buildWhatsAppMessage(booking: Booking): string {
  const msg =
    `🛡️ *PestIQ Solutions — Service Assignment*\n\n` +
    `*Booking:* ${booking.id}\n` +
    `*Customer:* ${booking.customerName}\n` +
    `*Contact:* ${booking.phone}\n` +
    `*Address:* ${booking.address}, ${booking.city}, ${booking.state} ${booking.zip}\n` +
    `*Service:* ${booking.service}\n` +
    `*Plan:* ${booking.plan}\n` +
    `*Date:* ${new Date(booking.scheduledDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}\n` +
    `*Time:* ${booking.scheduledTime}\n` +
    `*Property:* ${booking.sqFt.toLocaleString()} sq ft\n` +
    `*Notes:* ${booking.notes || "None"}\n\n` +
    `Please reply to confirm. Drive safe! — PestIQ Admin 🐛`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchesSearch =
      b.customerName.toLowerCase().includes(q) ||
      b.id.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) ||
      b.service.toLowerCase().includes(q);
    const matchesStatus = statusFilter === "all" || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const changeStatus = (id: string, newStatus: BookingStatus) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status: newStatus } : null);
  };

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-[#071b4d] text-2xl lg:text-3xl font-black tracking-tight">Bookings</h1>
          <p className="text-slate-500 text-sm mt-0.5">{filtered.length} of {bookings.length} total bookings</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, booking ID, city, service…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1557b8] focus:ring-2 focus:ring-[#1557b8]/15 transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value as BookingStatus | "all")}
            className="h-11 pl-10 pr-8 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1557b8] appearance-none cursor-pointer"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                {["Booking", "Customer", "Service", "Date & Time", "Status", "Actions"].map(h => (
                  <th key={h} className="text-left text-[10px] font-black text-slate-400 uppercase tracking-widest px-5 py-3.5">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map(booking => {
                const cfg = STATUS_CONFIG[booking.status];
                const StatusIcon = cfg.icon;
                return (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50 transition-colors cursor-pointer"
                    onClick={() => setSelected(booking)}
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-xs font-bold text-slate-400">{booking.id}</span>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-[#071b4d] text-sm font-bold leading-tight">{booking.customerName}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{booking.city}, {booking.state}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-slate-700 text-sm font-medium">{booking.service}</p>
                      <p className="text-slate-400 text-xs">{booking.plan} · ${booking.price}</p>
                    </td>
                    <td className="px-5 py-4 whitespace-nowrap">
                      <p className="text-slate-700 text-sm font-medium">
                        {new Date(booking.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      <p className="text-slate-400 text-xs">{booking.scheduledTime}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
                        <StatusIcon className="w-3 h-3" /> {cfg.label}
                      </span>
                    </td>
                    <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                      <div className="flex items-center gap-2">
                        {/* Status change */}
                        {booking.status === "pending" && (
                          <button
                            onClick={() => changeStatus(booking.id, "confirmed")}
                            className="text-[10px] font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-1 rounded-full transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => changeStatus(booking.id, "completed")}
                            className="text-[10px] font-bold text-green-600 bg-green-50 hover:bg-green-100 border border-green-200 px-2.5 py-1 rounded-full transition-colors"
                          >
                            Complete
                          </button>
                        )}
                        {(booking.status === "pending" || booking.status === "confirmed") && (
                          <button
                            onClick={() => changeStatus(booking.id, "cancelled")}
                            className="text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-2.5 py-1 rounded-full transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {/* WhatsApp dispatch */}
                        <a
                          href={buildWhatsAppMessage(booking)}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Send to Technician via WhatsApp"
                          className="w-8 h-8 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                        >
                          <MessageCircle className="w-4 h-4 text-green-600" />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-slate-400 text-sm">
                    No bookings match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-white shadow-2xl overflow-y-auto flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <div>
                <p className="font-mono text-xs text-slate-400 font-bold">{selected.id}</p>
                <h2 className="text-[#071b4d] text-lg font-black">{selected.customerName}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-5 flex-1 space-y-6">
              {/* Status */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Status</p>
                <div className="flex gap-2 flex-wrap">
                  {(["pending", "confirmed", "completed", "cancelled"] as BookingStatus[]).map(s => {
                    const cfg = STATUS_CONFIG[s];
                    return (
                      <button
                        key={s}
                        onClick={() => changeStatus(selected.id, s)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                          selected.status === s
                            ? `${cfg.bg} ${cfg.color} ${cfg.border} ring-2 ring-offset-1 ring-current`
                            : "bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        {cfg.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Customer Contact</p>
                <div className="space-y-2">
                  {[
                    { icon: Phone, label: selected.phone, href: `tel:${selected.phone}` },
                    { icon: Mail, label: selected.email, href: `mailto:${selected.email}` },
                    { icon: MapPin, label: `${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`, href: `https://maps.google.com/?q=${encodeURIComponent(selected.address + " " + selected.city + " " + selected.state)}` },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-2.5 text-sm text-[#1557b8] hover:underline">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              {/* Service */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Service Details</p>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                  {[
                    { icon: FileText, label: "Service", value: selected.service },
                    { icon: FileText, label: "Plan", value: selected.plan },
                    { icon: DollarSign, label: "Price", value: `$${selected.price}` },
                    { icon: Ruler, label: "Property Size", value: `${selected.sqFt.toLocaleString()} sq ft` },
                    { icon: Clock, label: "Date", value: new Date(selected.scheduledDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" }) },
                    { icon: Clock, label: "Time", value: selected.scheduledTime },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="flex items-center gap-3">
                      <Icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-slate-500 text-xs w-24 flex-shrink-0">{label}</span>
                      <span className="text-[#071b4d] text-sm font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Tech Notes</p>
                  <p className="text-slate-600 text-sm bg-yellow-50 border border-yellow-100 rounded-xl p-4 leading-relaxed">{selected.notes}</p>
                </div>
              )}

              {/* WhatsApp send */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Dispatch to Technician</p>
                <a
                  href={buildWhatsAppMessage(selected)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-3 w-full h-12 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-green-500/25"
                >
                  <MessageCircle className="w-5 h-5" />
                  Send via WhatsApp
                </a>
                <p className="text-slate-400 text-[11px] mt-2 text-center">Opens WhatsApp with pre-filled appointment details</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
