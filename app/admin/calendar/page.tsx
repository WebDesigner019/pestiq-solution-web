"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June",
                "July","August","September","October","November","December"];

const STATUS_META: Record<BookingStatus, { dot: string; bg: string; text: string; pill: string }> = {
  pending:   { dot:"bg-amber-400",   bg:"bg-amber-50",   text:"text-amber-700",   pill:"bg-amber-400"   },
  confirmed: { dot:"bg-blue-500",    bg:"bg-blue-50",    text:"text-blue-700",    pill:"bg-blue-500"    },
  completed: { dot:"bg-emerald-500", bg:"bg-emerald-50", text:"text-emerald-700", pill:"bg-emerald-500" },
  cancelled: { dot:"bg-red-400",     bg:"bg-red-50",     text:"text-red-700",     pill:"bg-red-400"     },
};

function buildWA(b: Booking) {
  const msg =
    `🛡️ *PestIQ — Service Assignment*\n\n` +
    `*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Contact:* ${b.phone}\n` +
    `*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n` +
    `*Service:* ${b.service} (${b.plan})\n` +
    `*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n` +
    `*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminCalendarPage() {
  const today  = new Date();
  const [view, setView]   = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [day, setDay]     = useState<number>(today.getDate());
  const [modal, setModal] = useState<Booking | null>(null);

  const year  = view.getFullYear();
  const month = view.getMonth();
  const firstDay    = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const bookingsOnDay = (d: number) => {
    const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return MOCK_BOOKINGS.filter(b => b.scheduledDate === ds);
  };

  const selectedBookings = day ? bookingsOnDay(day) : [];
  const totalThisMonth   = MOCK_BOOKINGS.filter(b =>
    b.scheduledDate.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)
  ).length;

  return (
    <div className="min-h-full bg-[#f8f9fb]">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/80 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-[#0c1a3a] text-xl font-black tracking-tight">Calendar</h1>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">{totalThisMonth} appointment{totalThisMonth!==1?"s":""} in {MONTHS[month]}</p>
        </div>
        {/* Legend */}
        <div className="hidden sm:flex items-center gap-4">
          {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => (
            <div key={s} className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${STATUS_META[s].dot}`} />
              <span className="text-slate-500 text-[10px] font-semibold capitalize">{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-5">

          {/* ── Calendar grid ── */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
            {/* Month nav */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <button
                onClick={() => setView(new Date(year, month-1, 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-center">
                <p className="text-[#0c1a3a] font-black text-base">{MONTHS[month]}</p>
                <p className="text-slate-400 text-xs">{year}</p>
              </div>
              <button
                onClick={() => setView(new Date(year, month+1, 1))}
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Day headers */}
            <div className="grid grid-cols-7 border-b border-slate-100">
              {DAYS.map(d => (
                <div key={d} className="py-2.5 text-center text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50">
                  {d}
                </div>
              ))}
            </div>

            {/* Cells */}
            <div className="grid grid-cols-7">
              {Array.from({ length: firstDay }).map((_,i) => (
                <div key={`e${i}`} className="min-h-[80px] border-r border-b border-slate-100 bg-slate-50/30" />
              ))}

              {Array.from({ length: daysInMonth }).map((_,i) => {
                const d = i + 1;
                const isToday  = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
                const isSel    = day === d;
                const bks      = bookingsOnDay(d);
                const hasAppts = bks.length > 0;

                return (
                  <button
                    key={d}
                    onClick={() => setDay(d)}
                    className={`min-h-[80px] border-r border-b border-slate-100 p-2 text-left transition-all hover:bg-slate-50 ${
                      isSel ? "bg-[#0c1a3a]/[0.04] ring-inset ring-1 ring-[#1557b8]/20" : ""
                    }`}
                  >
                    {/* Day number */}
                    <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-black mb-1.5 ${
                      isToday  ? "bg-yellow-400 text-[#0c1a3a]" :
                      isSel    ? "bg-[#0c1a3a] text-white" :
                      hasAppts ? "text-[#0c1a3a]" : "text-slate-400"
                    }`}>
                      {d}
                    </span>

                    {/* Appointment pills */}
                    <div className="space-y-0.5">
                      {bks.slice(0,2).map(b => (
                        <div
                          key={b.id}
                          className={`flex items-center gap-1 rounded text-[8px] font-bold px-1.5 py-0.5 truncate ${STATUS_META[b.status].bg} ${STATUS_META[b.status].text}`}
                          title={`${b.customerName} — ${b.service}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${STATUS_META[b.status].dot}`} />
                          {b.customerName.split(" ")[0]}
                        </div>
                      ))}
                      {bks.length > 2 && (
                        <p className="text-[8px] text-slate-400 font-bold px-1">+{bks.length - 2} more</p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Day detail ── */}
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden h-fit">
            <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50">
              <p className="text-[#0c1a3a] font-black text-sm">
                {day ? `${MONTHS[month]} ${day}, ${year}` : "Select a day"}
              </p>
              <p className="text-slate-400 text-[10px] mt-0.5 font-medium">
                {selectedBookings.length === 0 ? "No appointments" : `${selectedBookings.length} appointment${selectedBookings.length > 1 ? "s" : ""}`}
              </p>
            </div>

            {selectedBookings.length === 0 ? (
              <div className="py-14 px-5 text-center">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">📅</span>
                </div>
                <p className="text-slate-500 text-xs font-semibold">No appointments</p>
                <p className="text-slate-300 text-[11px] mt-1">Click a highlighted day</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {selectedBookings.map(b => {
                  const m = STATUS_META[b.status];
                  return (
                    <div key={b.id} className="px-5 py-4 group hover:bg-slate-50/60 transition-colors">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#0c1a3a] to-[#1557b8] flex items-center justify-center text-white text-[9px] font-black flex-shrink-0">
                            {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                          </div>
                          <div className="min-w-0">
                            <p className="text-[#0c1a3a] text-xs font-bold truncate">{b.customerName}</p>
                            <p className="text-slate-400 text-[10px]">{b.scheduledTime}</p>
                          </div>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold flex-shrink-0 ${m.bg} ${m.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                          {b.status}
                        </span>
                      </div>
                      <p className="text-slate-500 text-[11px] font-medium mb-1">{b.service}</p>
                      <p className="text-slate-400 text-[10px] truncate mb-3">{b.address}, {b.city}</p>

                      <div className="flex gap-2">
                        <button
                          onClick={() => setModal(b)}
                          className="flex-1 h-7 text-[10px] font-bold text-[#1557b8] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                        >
                          View Details
                        </button>
                        <a
                          href={buildWA(b)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-7 h-7 rounded-lg bg-emerald-50 hover:bg-emerald-100 flex items-center justify-center transition-colors"
                          title="Send to technician"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Booking detail modal ── */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" onClick={() => setModal(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 z-10">
            <button onClick={() => setModal(null)} className="absolute top-4 right-4 text-slate-300 hover:text-slate-600">
              <X className="w-5 h-5" />
            </button>
            <p className="font-mono text-[10px] text-slate-400 font-bold mb-1">{modal.id}</p>
            <h3 className="text-[#0c1a3a] text-lg font-black mb-0.5">{modal.customerName}</h3>
            <p className="text-slate-400 text-xs mb-4">{modal.phone}</p>

            <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2">
              {[
                ["Service", modal.service],
                ["Plan",    modal.plan],
                ["Time",    modal.scheduledTime],
                ["Address", `${modal.address}, ${modal.city}, ${modal.state}`],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-400 text-[10px] font-semibold w-14 flex-shrink-0">{label}</span>
                  <span className="text-[#0c1a3a] text-xs font-semibold">{value}</span>
                </div>
              ))}
            </div>

            {modal.notes && (
              <p className="text-slate-600 text-xs bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4 leading-relaxed">
                {modal.notes}
              </p>
            )}

            <a
              href={buildWA(modal)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Send to Technician
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
