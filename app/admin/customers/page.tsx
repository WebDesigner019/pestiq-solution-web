"use client";

import React, { useState } from "react";
import { Search, Phone, Mail, MapPin, MessageCircle, ChevronRight, X, Clock, FileText } from "lucide-react";
import { MOCK_CUSTOMERS, MOCK_BOOKINGS, type Customer } from "@/lib/adminMockData";

const PLAN_COLORS: Record<string, { bg: string; text: string }> = {
  Complete:  { bg: "bg-blue-100",   text: "text-blue-700"  },
  Essential: { bg: "bg-purple-100", text: "text-purple-700"},
  "One-Time":{ bg: "bg-orange-100", text: "text-orange-700"},
  None:      { bg: "bg-slate-100",  text: "text-slate-500" },
};

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.email.toLowerCase().includes(q) ||
      c.phone.includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.zip.includes(q)
    );
  });

  const customerBookings = selected
    ? MOCK_BOOKINGS.filter(b => b.customerName === selected.name)
    : [];

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-[#071b4d] text-2xl lg:text-3xl font-black tracking-tight">Customer CRM</h1>
        <p className="text-slate-500 text-sm mt-0.5">{filtered.length} customers found</p>
      </div>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search by name, email, city, zip…"
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full h-11 pl-10 pr-4 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1557b8] focus:ring-2 focus:ring-[#1557b8]/15 transition-all"
        />
      </div>

      {/* Customer grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(customer => {
          const planStyle = PLAN_COLORS[customer.plan] ?? PLAN_COLORS.None;
          return (
            <button
              key={customer.id}
              onClick={() => setSelected(customer)}
              className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 text-left hover:shadow-md hover:border-[#1557b8]/30 transition-all group"
            >
              {/* Avatar + name */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#071b4d] to-[#1557b8] flex items-center justify-center text-white font-black text-base flex-shrink-0">
                  {customer.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#071b4d] font-black text-sm truncate">{customer.name}</p>
                  <p className="text-slate-400 text-xs truncate">{customer.city}, {customer.state}</p>
                </div>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 ${planStyle.bg} ${planStyle.text}`}>
                  {customer.plan}
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-[10px] text-slate-400 font-semibold">Total Bookings</p>
                  <p className="text-[#071b4d] font-black text-base">{customer.totalBookings}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2.5">
                  <p className="text-[10px] text-slate-400 font-semibold">Total Spent</p>
                  <p className="text-[#071b4d] font-black text-base">${customer.totalSpent.toLocaleString()}</p>
                </div>
              </div>

              {/* Contact */}
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="w-3.5 h-3.5 text-slate-300" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Phone className="w-3.5 h-3.5 text-slate-300" />
                  {customer.phone}
                </div>
              </div>

              <div className="flex items-center justify-end mt-4">
                <span className="text-[#1557b8] text-xs font-bold flex items-center gap-1 group-hover:underline">
                  View Details <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </button>
          );
        })}
        {filtered.length === 0 && (
          <div className="col-span-3 py-16 text-center text-slate-400 text-sm">No customers match your search.</div>
        )}
      </div>

      {/* Customer detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex">
          <div className="flex-1 bg-black/50 backdrop-blur-sm" onClick={() => setSelected(null)} />
          <div className="w-full max-w-md bg-white shadow-2xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white z-10 flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#071b4d] to-[#1557b8] flex items-center justify-center text-white font-black text-base">
                  {selected.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h2 className="text-[#071b4d] font-black text-lg leading-tight">{selected.name}</h2>
                  <p className="text-slate-400 text-xs">{selected.id}</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-6 py-6 space-y-6">
              {/* Plan badge */}
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${PLAN_COLORS[selected.plan]?.bg} ${PLAN_COLORS[selected.plan]?.text}`}>
                  {selected.plan} Plan
                </span>
                <span className="text-slate-400 text-xs">Customer since {new Date(selected.joinedDate).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
              </div>

              {/* Contact info */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Contact</p>
                <div className="space-y-2.5">
                  {[
                    { icon: Phone, label: selected.phone, href: `tel:${selected.phone}` },
                    { icon: Mail, label: selected.email, href: `mailto:${selected.email}` },
                    { icon: MapPin, label: `${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`, href: `https://maps.google.com/?q=${encodeURIComponent(selected.address + " " + selected.city + " " + selected.state)}` },
                  ].map(({ icon: Icon, label, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      className="flex items-start gap-3 text-sm text-[#1557b8] hover:underline">
                      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0 text-slate-400" />
                      {label}
                    </a>
                  ))}
                  <a
                    href={`https://wa.me/${selected.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-green-600 hover:underline"
                  >
                    <MessageCircle className="w-4 h-4 text-green-500" />
                    Message on WhatsApp
                  </a>
                </div>
              </div>

              {/* Stats */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Account Summary</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "Total Bookings", value: selected.totalBookings },
                    { label: "Total Spent", value: `$${selected.totalSpent.toLocaleString()}` },
                    { label: "Last Service", value: selected.lastService === "—" ? "None yet" : new Date(selected.lastService).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                    { label: "Member Since", value: new Date(selected.joinedDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400 font-semibold mb-0.5">{label}</p>
                      <p className="text-[#071b4d] text-sm font-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service history */}
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Service History</p>
                {customerBookings.length === 0 ? (
                  <p className="text-slate-400 text-sm">No bookings found.</p>
                ) : (
                  <div className="space-y-2">
                    {customerBookings.map(b => (
                      <div key={b.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-4 h-4 text-slate-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-[#071b4d] text-xs font-bold truncate">{b.service}</p>
                          <p className="text-slate-400 text-[11px]">
                            {new Date(b.scheduledDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} · ${b.price}
                          </p>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.status === "completed" ? "bg-green-100 text-green-700" :
                          b.status === "confirmed" ? "bg-blue-100 text-blue-700" :
                          b.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                          "bg-red-100 text-red-700"
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
