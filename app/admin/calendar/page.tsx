"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X, Clock, AlertCircle, CheckCircle, XCircle } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const STATUS_COLORS: Record<BookingStatus, { dot: string; bg: string; text: string; icon: React.ElementType }> = {
  pending:   { dot: "bg-yellow-400", bg: "bg-yellow-50 border-yellow-200",  text: "text-yellow-800", icon: Clock },
  confirmed: { dot: "bg-blue-500",   bg: "bg-blue-50 border-blue-200",      text: "text-blue-800",   icon: AlertCircle },
  completed: { dot: "bg-green-500",  bg: "bg-green-50 border-green-200",    text: "text-green-800",  icon: CheckCircle },
  cancelled: { dot: "bg-red-400",    bg: "bg-red-50 border-red-200",        text: "text-red-800",    icon: XCircle },
};

function buildWhatsAppMessage(booking: Booking): string {
  const msg =
    `🛡️ *PestIQ — Service Assignment*\n\n` +
    `*Booking:* ${booking.id}\n` +
    `*Customer:* ${booking.customerName}\n` +
    `*Contact:* ${booking.phone}\n` +
    `*Address:* ${booking.address}, ${booking.city}, ${booking.state} ${booking.zip}\n` +
    `*Service:* ${booking.service}\n` +
    `*Date:* ${new Date(booking.scheduledDate).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}\n` +
    `*Time:* ${booking.scheduledTime}\n` +
    `*Notes:* ${booking.notes || "None"}\n\n` +
    `Please confirm receipt! — PestIQ Admin 🐛`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminCalendarPage() {
  const today = new Date();
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate());
  const [drawerBooking, setDrawerBooking] = useState<Booking | null>(null);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1));

  const bookingsOnDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    return MOCK_BOOKINGS.filter(b => b.scheduledDate === dateStr);
  };

  const selectedBookings = selectedDay ? bookingsOnDate(selectedDay) : [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#071b4d] text-2xl lg:text-3xl font-black tracking-tight">Appointment Calendar</h1>
        <p className="text-slate-500 text-sm mt-0.5">Admin & Technician dispatch view</p>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        {(Object.entries(STATUS_COLORS) as [BookingStatus, typeof STATUS_COLORS[BookingStatus]][]).map(([status, cfg]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
            <span className="text-slate-600 text-xs font-semibold capitalize">{status}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          {/* Month nav */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
            <button onClick={prevMonth} className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <h2 className="text-[#071b4d] font-black text-base">
              {MONTHS[month]} {year}
            </h2>
            <button onClick={nextMonth} className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-slate-100">
            {DAYS.map(d => (
              <div key={d} className="py-3 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {/* Empty cells for offset */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[90px] border-r border-b border-slate-100 bg-slate-50/50" />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day;
              const isSelected = selectedDay === day;
              const dayBookings = bookingsOnDate(day);

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`min-h-[90px] border-r border-b border-slate-100 p-1.5 text-left transition-colors hover:bg-slate-50 ${
                    isSelected ? "bg-[#071b4d]/5 ring-inset ring-2 ring-[#1557b8]/30" : ""
                  }`}
                >
                  <span className={`inline-flex w-6 h-6 items-center justify-center rounded-full text-xs font-black mb-1 ${
                    isToday ? "bg-yellow-400 text-[#071b4d]" : isSelected ? "bg-[#071b4d] text-white" : "text-slate-700"
                  }`}>
                    {day}
                  </span>
                  <div className="space-y-0.5">
                    {dayBookings.slice(0, 2).map(b => (
                      <div
                        key={b.id}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded truncate border ${STATUS_COLORS[b.status].bg} ${STATUS_COLORS[b.status].text}`}
                        title={`${b.customerName} — ${b.service}`}
                      >
                        {b.scheduledTime.replace(" AM","a").replace(" PM","p")} {b.customerName.split(" ")[0]}
                      </div>
                    ))}
                    {dayBookings.length > 2 && (
                      <div className="text-[9px] font-bold text-slate-400 px-1">+{dayBookings.length - 2} more</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail panel */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden h-fit">
          <div className="px-5 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="text-[#071b4d] font-black text-sm">
              {selectedDay
                ? `${MONTHS[month]} ${selectedDay}, ${year}`
                : "Select a day"}
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              {selectedBookings.length === 0 ? "No appointments" : `${selectedBookings.length} appointment${selectedBookings.length > 1 ? "s" : ""}`}
            </p>
          </div>

          {selectedBookings.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm font-medium">No appointments scheduled</p>
              <p className="text-slate-300 text-xs mt-1">Click on a different day to view</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {selectedBookings.map(booking => {
                const cfg = STATUS_COLORS[booking.status];
                return (
                  <div key={booking.id} className="px-5 py-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <p className="text-[#071b4d] text-sm font-black">{booking.customerName}</p>
                        <p className="text-slate-400 text-xs">{booking.scheduledTime}</p>
                      </div>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0 ${cfg.bg} ${cfg.text}`}>
                        {booking.status}
                      </span>
                    </div>
                    <p className="text-slate-600 text-xs font-medium mb-1">{booking.service}</p>
                    <p className="text-slate-400 text-[11px] truncate mb-3">{booking.address}, {booking.city}</p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setDrawerBooking(booking)}
                        className="flex-1 h-8 text-xs font-bold text-[#1557b8] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                      >
                        Details
                      </button>
                      <a
                        href={buildWhatsAppMessage(booking)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                        title="Send to technician"
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Booking detail mini-modal */}
      {drawerBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setDrawerBooking(null)} />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 z-10">
            <button onClick={() => setDrawerBooking(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <X className="w-5 h-5" />
            </button>
            <p className="font-mono text-[10px] text-slate-400 font-bold mb-1">{drawerBooking.id}</p>
            <h3 className="text-[#071b4d] text-xl font-black mb-1">{drawerBooking.customerName}</h3>
            <p className="text-slate-500 text-sm mb-4">{drawerBooking.phone} · {drawerBooking.email}</p>
            <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2 text-sm">
              {[
                ["Service", drawerBooking.service],
                ["Plan", drawerBooking.plan],
                ["Date", new Date(drawerBooking.scheduledDate).toLocaleDateString("en-US", { weekday:"long", month:"long", day:"numeric", year:"numeric" })],
                ["Time", drawerBooking.scheduledTime],
                ["Address", `${drawerBooking.address}, ${drawerBooking.city}, ${drawerBooking.state}`],
              ].map(([label, value]) => (
                <div key={label} className="flex gap-3">
                  <span className="text-slate-400 w-16 flex-shrink-0 text-xs font-semibold">{label}</span>
                  <span className="text-[#071b4d] font-semibold">{value}</span>
                </div>
              ))}
            </div>
            {drawerBooking.notes && (
              <p className="text-slate-600 text-xs bg-yellow-50 border border-yellow-100 rounded-xl p-3 mb-4 leading-relaxed">{drawerBooking.notes}</p>
            )}
            <a
              href={buildWhatsAppMessage(drawerBooking)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full h-11 bg-green-500 hover:bg-green-600 text-white rounded-xl text-sm font-bold transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Send to Technician via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
