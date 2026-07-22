"use client";

import React, { useState } from "react";
import {
  Search, SlidersHorizontal, MessageCircle,
  CheckCircle, XCircle, Clock, AlertCircle,
  ChevronDown, MapPin, Phone, Mail, Ruler,
  DollarSign, FileText, X, ArrowUpRight,
} from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const STATUS_META: Record<BookingStatus, { label: string; dot: string; text: string; bg: string; border: string }> = {
  pending:   { label:"Pending",   dot:"bg-amber-400",   text:"text-amber-700",   bg:"bg-amber-50",   border:"border-amber-200"  },
  confirmed: { label:"Confirmed", dot:"bg-blue-500",    text:"text-blue-700",    bg:"bg-blue-50",    border:"border-blue-200"   },
  completed: { label:"Completed", dot:"bg-emerald-500", text:"text-emerald-700", bg:"bg-emerald-50", border:"border-emerald-200"},
  cancelled: { label:"Cancelled", dot:"bg-red-400",     text:"text-red-700",     bg:"bg-red-50",     border:"border-red-200"    },
};

function buildWA(b: Booking) {
  const msg =
    `🛡️ *PestIQ — Service Assignment*\n\n` +
    `*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Contact:* ${b.phone}\n` +
    `*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n` +
    `*Service:* ${b.service} (${b.plan})\n` +
    `*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n` +
    `*Time:* ${b.scheduledTime}\n*Property:* ${b.sqFt.toLocaleString()} sq ft\n` +
    `*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin 🐛`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

const SERVICE_ICONS: Record<string, string> = {
  "Bed Bug Treatment":   "🛏️",
  "Rodent Control":      "🐀",
  "Mosquito Control":    "🦟",
  "Termite Inspection":  "🌲",
  "Cockroach Control":   "🪲",
  "Ant Control":         "🐜",
  "General Pest Control":"🛡️",
  "Spider Control":      "🕷️",
  "Fly Control":         "🪰",
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search, setSearch]     = useState("");
  const [filter, setFilter]     = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    return (
      (b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) ||
       b.city.toLowerCase().includes(q) || b.service.toLowerCase().includes(q)) &&
      (filter === "all" || b.status === filter)
    );
  });

  const changeStatus = (id: string, s: BookingStatus) => {
    setBookings(p => p.map(b => b.id === id ? { ...b, status: s } : b));
    if (selected?.id === id) setSelected(p => p ? { ...p, status: s } : null);
  };

  const counts = {
    all:       bookings.length,
    pending:   bookings.filter(b=>b.status==="pending").length,
    confirmed: bookings.filter(b=>b.status==="confirmed").length,
    completed: bookings.filter(b=>b.status==="completed").length,
    cancelled: bookings.filter(b=>b.status==="cancelled").length,
  };

  return (
    <div className="min-h-full bg-[#f8f9fb]">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/80 px-8 py-5">
        <h1 className="text-[#0c1a3a] text-xl font-black tracking-tight">Bookings</h1>
        <p className="text-slate-400 text-xs mt-0.5 font-medium">{bookings.length} total service requests</p>
      </div>

      <div className="p-8 max-w-7xl mx-auto space-y-5">

        {/* Filter tabs + search */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          {/* Tab pills */}
          <div className="flex items-center gap-1 bg-white rounded-xl border border-slate-200 p-1">
            {(["all","pending","confirmed","completed","cancelled"] as const).map(s => {
              const active = filter === s;
              const m = s === "all" ? null : STATUS_META[s];
              return (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    active ? "bg-[#0c1a3a] text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {m && <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />}
                  {s}
                  <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-full ${active ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"}`}>
                    {counts[s]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search bookings…"
              className="w-full h-9 pl-9 pr-4 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-[#1557b8] focus:ring-2 focus:ring-[#1557b8]/10 transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b border-slate-100">
                  {["#", "Customer", "Service", "Date", "Status", "Actions"].map(h => (
                    <th key={h} className="text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.12em] px-5 py-3 bg-slate-50/50">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(b => {
                  const m = STATUS_META[b.status];
                  const emoji = SERVICE_ICONS[b.service] ?? "🐛";
                  return (
                    <tr
                      key={b.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                      onClick={() => setSelected(b)}
                    >
                      {/* ID */}
                      <td className="px-5 py-4">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{b.id}</span>
                      </td>
                      {/* Customer */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#1557b8] flex items-center justify-center text-white text-[9px] font-black flex-shrink-0">
                            {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                          </div>
                          <div>
                            <p className="text-[#0c1a3a] text-xs font-bold">{b.customerName}</p>
                            <p className="text-slate-400 text-[10px]">{b.city}, {b.state}</p>
                          </div>
                        </div>
                      </td>
                      {/* Service */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-base leading-none">{emoji}</span>
                          <div>
                            <p className="text-slate-700 text-xs font-semibold">{b.service}</p>
                            <p className="text-slate-400 text-[10px]">{b.plan} · ${b.price}</p>
                          </div>
                        </div>
                      </td>
                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <p className="text-slate-700 text-xs font-semibold">
                          {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                        </p>
                        <p className="text-slate-400 text-[10px]">{b.scheduledTime}</p>
                      </td>
                      {/* Status */}
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${m.bg} ${m.text} ${m.border}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                          {m.label}
                        </span>
                      </td>
                      {/* Actions */}
                      <td className="px-5 py-4" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          {b.status === "pending" && (
                            <button
                              onClick={() => changeStatus(b.id, "confirmed")}
                              className="h-7 px-3 text-[10px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
                            >Confirm</button>
                          )}
                          {b.status === "confirmed" && (
                            <button
                              onClick={() => changeStatus(b.id, "completed")}
                              className="h-7 px-3 text-[10px] font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors"
                            >Complete</button>
                          )}
                          {(b.status==="pending"||b.status==="confirmed") && (
                            <button
                              onClick={() => changeStatus(b.id, "cancelled")}
                              className="h-7 px-3 text-[10px] font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition-colors"
                            >Cancel</button>
                          )}
                          <a
                            href={buildWA(b)}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="WhatsApp"
                            className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-16 text-center text-slate-400 text-sm">No bookings match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/40 backdrop-blur-[2px]" onClick={() => setSelected(null)} />
          <div className="w-full max-w-[420px] bg-white flex flex-col shadow-2xl">
            {/* Drawer header */}
            <div className="flex items-start justify-between px-6 py-5 border-b border-slate-100">
              <div>
                <p className="text-[10px] font-mono font-bold text-slate-400 mb-1">{selected.id}</p>
                <h2 className="text-[#0c1a3a] text-lg font-black">{selected.customerName}</h2>
                <p className="text-slate-400 text-xs mt-0.5">{selected.service}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-300 hover:text-slate-600 mt-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
              {/* Status selector */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Status</p>
                <div className="flex gap-1.5 flex-wrap">
                  {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => {
                    const m = STATUS_META[s];
                    const active = selected.status === s;
                    return (
                      <button
                        key={s}
                        onClick={() => changeStatus(selected.id, s)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all capitalize ${
                          active ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ring-current` : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Contact */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Contact</p>
                <div className="space-y-2">
                  {[
                    { icon:Phone, v: selected.phone, href:`tel:${selected.phone}` },
                    { icon:Mail,  v: selected.email, href:`mailto:${selected.email}` },
                    { icon:MapPin,v:`${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`,
                      href:`https://maps.google.com/?q=${encodeURIComponent(selected.address+" "+selected.city)}` },
                  ].map(({ icon:Icon, v, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 text-xs text-[#1557b8] hover:underline group">
                      <Icon className="w-3.5 h-3.5 mt-0.5 text-slate-300 flex-shrink-0" />
                      <span>{v}</span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 mt-0.5 flex-shrink-0 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Service details */}
              <div>
                <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Service Details</p>
                <div className="bg-slate-50 rounded-xl p-4 space-y-2.5">
                  {[
                    ["Service",  selected.service],
                    ["Plan",     selected.plan],
                    ["Price",    `$${selected.price}`],
                    ["Size",     `${selected.sqFt.toLocaleString()} sq ft`],
                    ["Date",     new Date(selected.scheduledDate).toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric",year:"numeric"})],
                    ["Time",     selected.scheduledTime],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="text-slate-400 text-[10px] font-semibold w-14 flex-shrink-0">{label}</span>
                      <span className="text-[#0c1a3a] text-xs font-semibold">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              {selected.notes && (
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Field Notes</p>
                  <p className="text-slate-600 text-xs bg-amber-50 border border-amber-100 rounded-xl p-4 leading-relaxed">{selected.notes}</p>
                </div>
              )}
            </div>

            {/* Footer: WhatsApp */}
            <div className="px-6 py-4 border-t border-slate-100">
              <a
                href={buildWA(selected)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-emerald-500/25"
              >
                <MessageCircle className="w-4 h-4" />
                Send to Technician via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
