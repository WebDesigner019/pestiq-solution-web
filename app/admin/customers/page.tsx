"use client";

import React, { useState } from "react";
import { Search, MessageCircle, Phone, Mail, MapPin, X, ArrowUpRight, ChevronRight } from "lucide-react";
import { MOCK_CUSTOMERS, MOCK_BOOKINGS, type Customer } from "@/lib/adminMockData";

const PLAN: Record<string, { bg:string; text:string; dot:string }> = {
  Complete:   { bg:"bg-blue-50",   text:"text-blue-700",   dot:"bg-blue-500"   },
  Essential:  { bg:"bg-violet-50", text:"text-violet-700", dot:"bg-violet-500" },
  "One-Time": { bg:"bg-orange-50", text:"text-orange-700", dot:"bg-orange-400" },
  None:       { bg:"bg-slate-100", text:"text-slate-500",  dot:"bg-slate-300"  },
};

const GRADIENTS = [
  "linear-gradient(135deg,#1d4ed8,#3b82f6)",
  "linear-gradient(135deg,#7c3aed,#a78bfa)",
  "linear-gradient(135deg,#059669,#34d399)",
  "linear-gradient(135deg,#dc2626,#f87171)",
  "linear-gradient(135deg,#d97706,#fbbf24)",
  "linear-gradient(135deg,#0284c7,#38bdf8)",
  "linear-gradient(135deg,#c026d3,#e879f9)",
  "linear-gradient(135deg,#16a34a,#86efac)",
];

export default function AdminCustomersPage() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) || c.zip.includes(q);
  });

  const customerBookings = selected ? MOCK_BOOKINGS.filter(b => b.customerName === selected.name) : [];
  const topSpend = Math.max(...MOCK_CUSTOMERS.map(c => c.totalSpent), 1);

  return (
    <div style={{ padding:"28px 32px", maxWidth:1200, margin:"0 auto" }}>

      {/* Page heading + search */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, gap:16, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ color:"#0c1a3a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.03em" }}>Customers</h1>
          <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0", fontWeight:500 }}>{filtered.length} records</p>
        </div>
        <div style={{ position:"relative", width:260 }}>
          <Search style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#94a3b8" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search customers…"
            style={{
              width:"100%", height:36, paddingLeft:34, paddingRight:12,
              background:"#fff", border:"1px solid #e2e8f0", borderRadius:9,
              fontSize:13, outline:"none", color:"#0c1a3a", boxSizing:"border-box",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"#fafafa", borderBottom:"1px solid #f1f5f9" }}>
              {["Customer","Plan","Bookings","Total Spent","Last Service",""].map(h => (
                <th key={h||"arrow"} style={{
                  textAlign:"left", padding:"10px 16px",
                  fontSize:11, fontWeight:700, color:"#94a3b8",
                  textTransform:"uppercase", letterSpacing:"0.08em", whiteSpace:"nowrap",
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((c, i) => {
              const plan = PLAN[c.plan] ?? PLAN.None;
              const grad = GRADIENTS[i % GRADIENTS.length];
              const spendPct = Math.round((c.totalSpent / topSpend) * 100);
              return (
                <tr key={c.id}
                  onClick={() => setSelected(c)}
                  style={{ borderBottom:"1px solid #f8fafc", cursor:"pointer", transition:"background 0.1s" }}
                  onMouseEnter={e => (e.currentTarget.style.background="#fafcff")}
                  onMouseLeave={e => (e.currentTarget.style.background="transparent")}
                >
                  {/* Customer */}
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <div style={{
                        width:32, height:32, borderRadius:"50%", background:grad,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        color:"#fff", fontSize:11, fontWeight:900, flexShrink:0
                      }}>
                        {c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                      </div>
                      <div>
                        <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:700, margin:0 }}>{c.name}</p>
                        <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{c.email}</p>
                      </div>
                    </div>
                  </td>
                  {/* Plan */}
                  <td style={{ padding:"12px 16px" }}>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold ${plan.bg} ${plan.text}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${plan.dot}`} />
                      {c.plan}
                    </span>
                  </td>
                  {/* Bookings */}
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ color:"#0c1a3a", fontSize:14, fontWeight:800 }}>{c.totalBookings}</span>
                  </td>
                  {/* Spend */}
                  <td style={{ padding:"12px 16px", minWidth:130 }}>
                    <p style={{ color:"#0c1a3a", fontSize:14, fontWeight:800, margin:"0 0 5px" }}>${c.totalSpent.toLocaleString()}</p>
                    <div style={{ height:4, borderRadius:999, background:"#f1f5f9", width:80 }}>
                      <div style={{ height:"100%", borderRadius:999, background:"#1557b8", opacity:0.35, width:`${spendPct}%` }} />
                    </div>
                  </td>
                  {/* Last service */}
                  <td style={{ padding:"12px 16px" }}>
                    <span style={{ color: c.lastService==="—" ? "#cbd5e1" : "#475569", fontSize:13, fontWeight:500 }}>
                      {c.lastService==="—" ? "Never" : new Date(c.lastService).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                    </span>
                  </td>
                  {/* Arrow */}
                  <td style={{ padding:"12px 16px" }}>
                    <ChevronRight style={{ width:14, height:14, color:"#d1d5db" }} />
                  </td>
                </tr>
              );
            })}
            {filtered.length===0 && (
              <tr><td colSpan={6} style={{ padding:"48px 16px", textAlign:"center", color:"#94a3b8", fontSize:13 }}>No customers found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Drawer */}
      {selected && (() => {
        const idx  = MOCK_CUSTOMERS.findIndex(c=>c.id===selected.id);
        const grad = GRADIENTS[idx % GRADIENTS.length];
        const plan = PLAN[selected.plan] ?? PLAN.None;
        return (
          <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex" }}>
            <div style={{ flex:1, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(2px)" }} onClick={()=>setSelected(null)} />
            <div style={{ width:"100%", maxWidth:420, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"0 25px 50px rgba(0,0,0,0.2)" }}>
              {/* Header */}
              <div style={{ padding:"20px 24px", borderBottom:"1px solid #f1f5f9" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40, height:40, borderRadius:"50%", background:grad, display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:13, fontWeight:900 }}>
                      {selected.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <h2 style={{ color:"#0c1a3a", fontSize:16, fontWeight:900, margin:0 }}>{selected.name}</h2>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"3px 0 0" }}>{selected.id}</p>
                    </div>
                  </div>
                  <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8" }}>
                    <X style={{ width:18, height:18 }} />
                  </button>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14 }}>
                  <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold ${plan.bg} ${plan.text}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${plan.dot}`} />{selected.plan} Plan
                  </span>
                  <span style={{ color:"#94a3b8", fontSize:12 }}>
                    Since {new Date(selected.joinedDate).toLocaleDateString("en-US",{month:"short",year:"numeric"})}
                  </span>
                </div>
              </div>

              <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
                {/* Stats */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:24 }}>
                  {[
                    { label:"Total Bookings", value:selected.totalBookings },
                    { label:"Total Spent",    value:`$${selected.totalSpent.toLocaleString()}` },
                  ].map(({ label, value }) => (
                    <div key={label} style={{ background:"#fafafa", borderRadius:10, padding:14 }}>
                      <p style={{ color:"#94a3b8", fontSize:12, fontWeight:600, margin:"0 0 6px" }}>{label}</p>
                      <p style={{ color:"#0c1a3a", fontSize:20, fontWeight:900, margin:0 }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.15em", color:"#94a3b8", marginBottom:10 }}>Contact</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                  {[
                    { icon:Phone, v:selected.phone, href:`tel:${selected.phone}` },
                    { icon:Mail,  v:selected.email, href:`mailto:${selected.email}` },
                    { icon:MapPin,v:`${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`,
                      href:`https://maps.google.com/?q=${encodeURIComponent(selected.address+" "+selected.city)}` },
                  ].map(({ icon:Icon, v, href }) => (
                    <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                      style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"#1557b8", textDecoration:"none" }}>
                      <Icon style={{ width:14, height:14, marginTop:1, color:"#94a3b8", flexShrink:0 }} />
                      {v}
                      <ArrowUpRight style={{ width:12, height:12, marginTop:1, flexShrink:0 }} />
                    </a>
                  ))}
                </div>

                {/* History */}
                <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.15em", color:"#94a3b8", marginBottom:10 }}>
                  Service History ({customerBookings.length})
                </p>
                {customerBookings.length===0 ? (
                  <p style={{ color:"#94a3b8", fontSize:13 }}>No services yet.</p>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {customerBookings.map(b => (
                      <div key={b.id} style={{ display:"flex", alignItems:"center", gap:10, background:"#fafafa", borderRadius:9, padding:"10px 12px" }}>
                        <div style={{ flex:1, minWidth:0 }}>
                          <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:700, margin:0 }}>{b.service}</p>
                          <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>
                            {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} · ${b.price}
                          </p>
                        </div>
                        <span style={{
                          fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, textTransform:"capitalize",
                          background: b.status==="completed"?"#ecfdf5":b.status==="confirmed"?"#eff6ff":b.status==="pending"?"#fffbeb":"#fef2f2",
                          color: b.status==="completed"?"#065f46":b.status==="confirmed"?"#1d4ed8":b.status==="pending"?"#92400e":"#b91c1c",
                        }}>{b.status}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9" }}>
                <a href={`https://wa.me/${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, height:44, background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
                  <MessageCircle style={{ width:15, height:15 }} />
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
