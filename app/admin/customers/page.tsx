"use client";

import React, { useState } from "react";
import { Search, MessageCircle, Phone, Mail, MapPin, FileText, ChevronRight, X, ArrowUpRight } from "lucide-react";
import { MOCK_CUSTOMERS, MOCK_BOOKINGS, type Customer } from "@/lib/adminMockData";

const PLAN_STYLES: Record<string, { bg: string; text: string; dot: string }> = {
  Complete:   { bg:"bg-blue-50",   text:"text-blue-700",   dot:"bg-blue-500"   },
  Essential:  { bg:"bg-violet-50", text:"text-violet-700", dot:"bg-violet-500" },
  "One-Time": { bg:"bg-orange-50", text:"text-orange-700", dot:"bg-orange-400" },
  None:       { bg:"bg-slate-100", text:"text-slate-500",  dot:"bg-slate-300"  },
};

const AVATAR_COLORS = [
  "from-blue-600 to-indigo-600",
  "from-violet-600 to-purple-600",
  "from-emerald-600 to-teal-600",
  "from-rose-500 to-pink-600",
  "from-amber-500 to-orange-500",
  "from-sky-500 to-cyan-600",
  "from-fuchsia-500 to-purple-600",
  "from-lime-500 to-emerald-500",
];

export default function AdminCustomersPage() {
  const [search, setSearch]   = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) || c.zip.includes(q);
  });

  const customerBookings = selected
    ? MOCK_BOOKINGS.filter(b => b.customerName === selected.name)
    : [];

  const topSpend = Math.max(...MOCK_CUSTOMERS.map(c => c.totalSpent), 1);

  return (
    <div className="min-h-full bg-[#f8f9fb]">
      {/* Top bar */}
      <div className="bg-white border-b border-slate-200/80 px-8 py-5 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[#0c1a3a] text-xl font-black tracking-tight">Customers</h1>
          <p className="text-slate-400 text-xs mt-0.5 font-medium">{filtered.length} records</p>
        </div>
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers…"
            className="w-full h-9 pl-9 pr-4 bg-slate-100 border border-transparent rounded-xl text-xs outline-none focus:bg-white focus:border-slate-200 focus:ring-2 focus:ring-[#1557b8]/10 transition-all"
          />
        </div>
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Customer table — Linear/Stripe style list */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100">
                {["Customer", "Plan", "Bookings", "Total Spent", "Last Service", ""].map(h => (
                  <th key={h||"action"} className="text-left text-[9px] font-black text-slate-400 uppercase tracking-[0.12em] px-6 py-3 bg-slate-50/50">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((c, i) => {
                const plan = PLAN_STYLES[c.plan] ?? PLAN_STYLES.None;
                const grad = AVATAR_COLORS[i % AVATAR_COLORS.length];
                const spendPct = Math.round((c.totalSpent / topSpend) * 100);
                return (
                  <tr
                    key={c.id}
                    className="hover:bg-slate-50/60 transition-colors cursor-pointer group"
                    onClick={() => setSelected(c)}
                  >
                    {/* Customer */}
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-[10px] font-black flex-shrink-0`}>
                          {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                        </div>
                        <div>
                          <p className="text-[#0c1a3a] text-xs font-bold">{c.name}</p>
                          <p className="text-slate-400 text-[10px]">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Plan */}
                    <td className="px-6 py-3.5">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${plan.bg} ${plan.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${plan.dot}`} />
                        {c.plan}
                      </span>
                    </td>
                    {/* Bookings */}
                    <td className="px-6 py-3.5">
                      <span className="text-[#0c1a3a] text-xs font-black">{c.totalBookings}</span>
                    </td>
                    {/* Spend with mini bar */}
                    <td className="px-6 py-3.5 min-w-[120px]">
                      <p className="text-[#0c1a3a] text-xs font-black mb-1">${c.totalSpent.toLocaleString()}</p>
                      <div className="h-1 rounded-full bg-slate-100 w-20">
                        <div className="h-1 rounded-full bg-[#1557b8]/40" style={{ width:`${spendPct}%` }} />
                      </div>
                    </td>
                    {/* Last Service */}
                    <td className="px-6 py-3.5">
                      <p className="text-slate-600 text-xs">
                        {c.lastService === "—" ? <span className="text-slate-300">Never</span>
                          : new Date(c.lastService).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </p>
                    </td>
                    {/* Arrow */}
                    <td className="px-6 py-3.5">
                      <ChevronRight className="w-4 h-4 text-slate-200 group-hover:text-slate-400 transition-colors" />
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="px-6 py-16 text-center text-slate-400 text-sm">No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Detail Drawer ── */}
      {selected && (() => {
        const idx = MOCK_CUSTOMERS.findIndex(c => c.id === selected.id);
        const grad = AVATAR_COLORS[idx % AVATAR_COLORS.length];
        const plan = PLAN_STYLES[selected.plan] ?? PLAN_STYLES.None;
        return (
          <div className="fixed inset-0 z-50 flex">
            <div className="flex-1 bg-black/40 backdrop-blur-[2px]" onClick={() => setSelected(null)} />
            <div className="w-full max-w-[420px] bg-white flex flex-col shadow-2xl">
              {/* Header */}
              <div className="px-6 py-5 border-b border-slate-100">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${grad} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                      {selected.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <h2 className="text-[#0c1a3a] font-black text-base leading-tight">{selected.name}</h2>
                      <p className="text-slate-400 text-[11px] mt-0.5">{selected.id}</p>
                    </div>
                  </div>
                  <button onClick={() => setSelected(null)} className="text-slate-300 hover:text-slate-600">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold ${plan.bg} ${plan.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${plan.dot}`} />
                    {selected.plan} Plan
                  </span>
                  <span className="text-slate-400 text-[10px]">
                    Since {new Date(selected.joinedDate).toLocaleDateString("en-US",{month:"short",year:"numeric"})}
                  </span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                {/* Stats grid */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label:"Bookings", value: selected.totalBookings },
                    { label:"Total Spent", value: `$${selected.totalSpent.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-slate-50 rounded-xl p-3.5">
                      <p className="text-slate-400 text-[10px] font-semibold">{label}</p>
                      <p className="text-[#0c1a3a] text-lg font-black mt-0.5">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Contact</p>
                  <div className="space-y-2">
                    {[
                      { icon:Phone, v:selected.phone, href:`tel:${selected.phone}` },
                      { icon:Mail,  v:selected.email, href:`mailto:${selected.email}` },
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

                {/* Service history */}
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">Service History ({customerBookings.length})</p>
                  {customerBookings.length === 0 ? (
                    <p className="text-slate-400 text-xs">No services yet.</p>
                  ) : (
                    <div className="space-y-2">
                      {customerBookings.map(b => (
                        <div key={b.id} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-[#0c1a3a] text-xs font-bold truncate">{b.service}</p>
                            <p className="text-slate-400 text-[10px]">
                              {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} · ${b.price}
                            </p>
                          </div>
                          <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                            b.status==="completed"?"bg-emerald-50 text-emerald-700":
                            b.status==="confirmed"?"bg-blue-50 text-blue-700":
                            b.status==="pending"?"bg-amber-50 text-amber-700":"bg-red-50 text-red-700"
                          } capitalize`}>
                            {b.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer: WhatsApp */}
              <div className="px-6 py-4 border-t border-slate-100">
                <a
                  href={`https://wa.me/${selected.phone.replace(/\D/g,"")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full h-11 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-bold transition-colors shadow-lg shadow-emerald-500/25"
                >
                  <MessageCircle className="w-4 h-4" />
                  Message on WhatsApp
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
