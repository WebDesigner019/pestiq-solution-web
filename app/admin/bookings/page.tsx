"use client";

import React, { useState } from "react";
import { Search, MessageCircle, X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const S: Record<BookingStatus, { label:string; dot:string; text:string; bg:string; border:string }> = {
  pending:   { label:"Pending",   dot:"bg-amber-400",   text:"text-amber-800",   bg:"bg-amber-50",   border:"border-amber-200"   },
  confirmed: { label:"Confirmed", dot:"bg-blue-500",    text:"text-blue-800",    bg:"bg-blue-50",    border:"border-blue-200"    },
  completed: { label:"Completed", dot:"bg-emerald-500", text:"text-emerald-800", bg:"bg-emerald-50", border:"border-emerald-200" },
  cancelled: { label:"Cancelled", dot:"bg-red-400",     text:"text-red-800",     bg:"bg-red-50",     border:"border-red-200"     },
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

const FILTER_TABS: { key: BookingStatus | "all"; label: string }[] = [
  { key:"all",       label:"All"       },
  { key:"pending",   label:"Pending"   },
  { key:"confirmed", label:"Confirmed" },
  { key:"completed", label:"Completed" },
  { key:"cancelled", label:"Cancelled" },
];

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const counts = {
    all:       bookings.length,
    pending:   bookings.filter(b=>b.status==="pending").length,
    confirmed: bookings.filter(b=>b.status==="confirmed").length,
    completed: bookings.filter(b=>b.status==="completed").length,
    cancelled: bookings.filter(b=>b.status==="cancelled").length,
  };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchSearch = b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) || b.service.toLowerCase().includes(q);
    const matchFilter = filter === "all" || b.status === filter;
    return matchSearch && matchFilter;
  });

  const changeStatus = (id: string, s: BookingStatus) => {
    setBookings(p => p.map(b => b.id === id ? { ...b, status:s } : b));
    if (selected?.id === id) setSelected(p => p ? { ...p, status:s } : null);
  };

  return (
    <div style={{ padding:"28px 32px", maxWidth:1200, margin:"0 auto" }}>

      {/* Page heading */}
      <div style={{ marginBottom:20 }}>
        <h1 style={{ color:"#0c1a3a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.03em" }}>Bookings</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0", fontWeight:500 }}>{bookings.length} total service requests</p>
      </div>

      {/* Filters row */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>

        {/* Status tabs */}
        <div style={{ display:"flex", background:"#fff", border:"1px solid #e2e8f0", borderRadius:10, padding:3, gap:2 }}>
          {FILTER_TABS.map(({ key, label }) => {
            const active = filter === key;
            const m = key !== "all" ? S[key] : null;
            return (
              <button
                key={key}
                onClick={() => setFilter(key)}
                style={{
                  display:"flex", alignItems:"center", gap:5,
                  padding:"5px 12px", borderRadius:7, border:"none",
                  fontSize:13, fontWeight:active?700:500, cursor:"pointer",
                  background: active ? "#0c1a3a" : "transparent",
                  color: active ? "#fff" : "#64748b",
                  transition:"all 0.12s",
                }}
              >
                {m && <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />}
                {label}
                <span style={{
                  fontSize:11, fontWeight:800, padding:"1px 6px", borderRadius:999,
                  background: active ? "rgba(255,255,255,0.2)" : "#f1f5f9",
                  color: active ? "#fff" : "#64748b",
                }}>
                  {counts[key]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position:"relative", flex:1, maxWidth:280 }}>
          <Search style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#94a3b8" }} />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search bookings…"
            style={{
              width:"100%", height:36, paddingLeft:34, paddingRight:12,
              background:"#fff", border:"1px solid #e2e8f0", borderRadius:9,
              fontSize:13, outline:"none", color:"#0c1a3a",
              boxSizing:"border-box",
            }}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:700 }}>
            <thead>
              <tr style={{ background:"#fafafa", borderBottom:"1px solid #f1f5f9" }}>
                {["#","Customer","Service","Date & Time","Status","Actions"].map(h => (
                  <th key={h} style={{
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
              {filtered.map((b, i) => {
                const m = S[b.status];
                return (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    style={{
                      borderBottom: i < filtered.length-1 ? "1px solid #f8fafc" : "none",
                      cursor:"pointer", transition:"background 0.1s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.background="#fafcff")}
                    onMouseLeave={e => (e.currentTarget.style.background="transparent")}
                  >
                    {/* ID */}
                    <td style={{ padding:"13px 16px" }}>
                      <span style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", fontWeight:700 }}>{b.id}</span>
                    </td>
                    {/* Customer */}
                    <td style={{ padding:"13px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div style={{
                          width:30, height:30, borderRadius:"50%",
                          background:"linear-gradient(135deg,#0c1a3a,#1557b8)",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff", fontSize:10, fontWeight:900, flexShrink:0
                        }}>
                          {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                        </div>
                        <div>
                          <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:700, margin:0 }}>{b.customerName}</p>
                          <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.city}, {b.state}</p>
                        </div>
                      </div>
                    </td>
                    {/* Service — NO emoji */}
                    <td style={{ padding:"13px 16px" }}>
                      <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:600, margin:0 }}>{b.service}</p>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.plan} · ${b.price}</p>
                    </td>
                    {/* Date */}
                    <td style={{ padding:"13px 16px", whiteSpace:"nowrap" }}>
                      <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:600, margin:0 }}>
                        {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </p>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.scheduledTime}</p>
                    </td>
                    {/* Status */}
                    <td style={{ padding:"13px 16px" }}>
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[12px] font-bold border ${m.bg} ${m.text} ${m.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                        {m.label}
                      </span>
                    </td>
                    {/* Actions */}
                    <td style={{ padding:"13px 16px" }} onClick={e=>e.stopPropagation()}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {b.status==="pending" && (
                          <button onClick={()=>changeStatus(b.id,"confirmed")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", cursor:"pointer" }}>
                            Confirm
                          </button>
                        )}
                        {b.status==="confirmed" && (
                          <button onClick={()=>changeStatus(b.id,"completed")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #a7f3d0", background:"#ecfdf5", color:"#065f46", cursor:"pointer" }}>
                            Complete
                          </button>
                        )}
                        {(b.status==="pending"||b.status==="confirmed") && (
                          <button onClick={()=>changeStatus(b.id,"cancelled")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #fecaca", background:"#fef2f2", color:"#b91c1c", cursor:"pointer" }}>
                            Cancel
                          </button>
                        )}
                        <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                          style={{ width:28, height:28, borderRadius:7, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", flexShrink:0 }}>
                          <MessageCircle style={{ width:13, height:13, color:"#16a34a" }} />
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length===0 && (
                <tr><td colSpan={6} style={{ padding:"48px 16px", textAlign:"center", color:"#94a3b8", fontSize:13 }}>No bookings match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex" }}>
          <div style={{ flex:1, background:"rgba(0,0,0,0.4)", backdropFilter:"blur(2px)" }} onClick={()=>setSelected(null)} />
          <div style={{ width:"100%", maxWidth:420, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"0 25px 50px rgba(0,0,0,0.2)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", padding:"20px 24px", borderBottom:"1px solid #f1f5f9" }}>
              <div>
                <p style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", margin:"0 0 4px" }}>{selected.id}</p>
                <h2 style={{ color:"#0c1a3a", fontSize:18, fontWeight:900, margin:0 }}>{selected.customerName}</h2>
                <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>{selected.service}</p>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", marginTop:2 }}>
                <X style={{ width:18, height:18 }} />
              </button>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>

              {/* Status */}
              <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.15em", color:"#94a3b8", marginBottom:10 }}>Status</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
                {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => {
                  const m = S[s]; const active = selected.status===s;
                  return (
                    <button key={s} onClick={()=>changeStatus(selected.id,s)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-bold border capitalize transition-all ${
                        active ? `${m.bg} ${m.text} ${m.border} ring-2 ring-offset-1 ring-current` : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100"
                      }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />{s}
                    </button>
                  );
                })}
              </div>

              {/* Contact */}
              <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.15em", color:"#94a3b8", marginBottom:10 }}>Contact</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {[
                  { icon:Phone, v:selected.phone,  href:`tel:${selected.phone}` },
                  { icon:Mail,  v:selected.email,  href:`mailto:${selected.email}` },
                  { icon:MapPin,v:`${selected.address}, ${selected.city}, ${selected.state}`, href:`https://maps.google.com/?q=${encodeURIComponent(selected.address+" "+selected.city)}` },
                ].map(({ icon:Icon, v, href }) => (
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"flex-start", gap:10, fontSize:13, color:"#1557b8", textDecoration:"none" }}>
                    <Icon style={{ width:14, height:14, marginTop:1, color:"#94a3b8", flexShrink:0 }} />
                    {v}
                    <ArrowUpRight style={{ width:12, height:12, marginTop:1, flexShrink:0 }} />
                  </a>
                ))}
              </div>

              {/* Details */}
              <p style={{ fontSize:11, fontWeight:800, textTransform:"uppercase", letterSpacing:"0.15em", color:"#94a3b8", marginBottom:10 }}>Service Details</p>
              <div style={{ background:"#fafafa", borderRadius:10, padding:16, marginBottom:16 }}>
                {[
                  ["Service", selected.service],
                  ["Plan",    selected.plan],
                  ["Price",   `$${selected.price}`],
                  ["Date",    new Date(selected.scheduledDate).toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric",year:"numeric"})],
                  ["Time",    selected.scheduledTime],
                ].map(([label, value]) => (
                  <div key={label} style={{ display:"flex", gap:12, marginBottom:8 }}>
                    <span style={{ color:"#94a3b8", fontSize:12, fontWeight:600, width:52, flexShrink:0 }}>{label}</span>
                    <span style={{ color:"#0c1a3a", fontSize:13, fontWeight:600 }}>{value}</span>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <p style={{ color:"#475569", fontSize:13, background:"#fffbeb", border:"1px solid #fef08a", borderRadius:10, padding:12, lineHeight:1.6 }}>
                  {selected.notes}
                </p>
              )}
            </div>

            <div style={{ padding:"16px 24px", borderTop:"1px solid #f1f5f9" }}>
              <a href={buildWA(selected)} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, height:44, background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
                <MessageCircle style={{ width:15, height:15 }} />
                Send to Technician via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
