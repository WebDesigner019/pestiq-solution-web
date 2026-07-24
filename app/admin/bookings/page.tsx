"use client";

import React, { useState } from "react";
import { Search, MessageCircle, X, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const STATUS: Record<BookingStatus, { label:string; dot:string; text:string; bg:string; border:string }> = {
  pending:   { label:"Pending",   dot:"#f59e0b", text:"#92400e", bg:"#fffbeb", border:"#fde68a" },
  confirmed: { label:"Confirmed", dot:"#3b82f6", text:"#1e40af", bg:"#eff6ff", border:"#bfdbfe" },
  completed: { label:"Completed", dot:"#10b981", text:"#065f46", bg:"#ecfdf5", border:"#a7f3d0" },
  cancelled: { label:"Cancelled", dot:"#ef4444", text:"#991b1b", bg:"#fef2f2", border:"#fecaca" },
};

const GRADS = [
  "#1d4ed8,#3b82f6","#7c3aed,#a78bfa","#059669,#34d399",
  "#dc2626,#f87171","#d97706,#fbbf24","#0284c7,#38bdf8",
  "#c026d3,#e879f9","#16a34a,#86efac",
];

const TABS: { key: BookingStatus | "all"; label: string }[] = [
  { key:"all",       label:"All"       },
  { key:"pending",   label:"Pending"   },
  { key:"confirmed", label:"Confirmed" },
  { key:"completed", label:"Completed" },
  { key:"cancelled", label:"Cancelled" },
];

function buildWA(b: Booking) {
  const msg = `🛡️ *PestIQ — Service Assignment*\n\n*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Contact:* ${b.phone}\n*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n*Service:* ${b.service} (${b.plan})\n*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(MOCK_BOOKINGS);
  const [search,   setSearch]   = useState("");
  const [filter,   setFilter]   = useState<BookingStatus | "all">("all");
  const [selected, setSelected] = useState<Booking | null>(null);

  const counts: Record<string,number> = {
    all: bookings.length,
    pending:   bookings.filter(b=>b.status==="pending").length,
    confirmed: bookings.filter(b=>b.status==="confirmed").length,
    completed: bookings.filter(b=>b.status==="completed").length,
    cancelled: bookings.filter(b=>b.status==="cancelled").length,
  };

  const filtered = bookings.filter(b => {
    const q = search.toLowerCase();
    const matchQ = b.customerName.toLowerCase().includes(q) || b.id.toLowerCase().includes(q) ||
      b.city.toLowerCase().includes(q) || b.service.toLowerCase().includes(q);
    const matchF = filter === "all" || b.status === filter;
    return matchQ && matchF;
  });

  const changeStatus = (id: string, s: BookingStatus) => {
    setBookings(p => p.map(b => b.id === id ? { ...b, status: s } : b));
    setSelected(p => p?.id === id ? { ...p, status: s } : p);
  };

  const customerGrad = (name: string) => {
    const idx = MOCK_BOOKINGS.findIndex(b => b.customerName === name);
    return GRADS[(idx < 0 ? 0 : idx) % GRADS.length];
  };

  return (
    <div style={{ padding:"24px 28px", maxWidth:1280, margin:"0 auto" }}>
      {/* Heading */}
      <div style={{ marginBottom:20 }}>
        <h1 style={{ color:"#0d1e4a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.025em" }}>Bookings</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>{bookings.length} total service requests</p>
      </div>

      {/* Toolbar */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18, flexWrap:"wrap" }}>
        {/* Filter tabs */}
        <div style={{ display:"flex", background:"#fff", border:"1px solid #e8edf5", borderRadius:10, padding:3, gap:2, flexWrap:"wrap" }}>
          {TABS.map(({ key, label }) => {
            const active = filter === key;
            const m = key !== "all" ? STATUS[key] : null;
            return (
              <button key={key} onClick={() => setFilter(key)}
                style={{
                  display:"flex", alignItems:"center", gap:5,
                  padding:"5px 12px", borderRadius:7, border:"none",
                  fontSize:13, fontWeight: active ? 700 : 500, cursor:"pointer",
                  background: active ? "#0d1e4a" : "transparent",
                  color: active ? "#fff" : "#64748b",
                  transition:"all 0.12s",
                }}
              >
                {m && <span style={{ width:7, height:7, borderRadius:"50%", background:m.dot, display:"inline-block" }} />}
                {label}
                <span style={{
                  fontSize:11, fontWeight:800, padding:"1px 7px", borderRadius:999,
                  background: active ? "rgba(255,255,255,0.18)" : "#f1f5f9",
                  color: active ? "#fff" : "#64748b",
                }}>{counts[key]}</span>
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position:"relative", flex:1, maxWidth:280 }}>
          <Search style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#94a3b8" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search by name, service, city…"
            style={{
              width:"100%", height:36, paddingLeft:34, paddingRight:12,
              background:"#fff", border:"1px solid #e8edf5", borderRadius:9,
              fontSize:13, outline:"none", color:"#0d1e4a", boxSizing:"border-box",
            }}
            onFocus={e=>e.target.style.borderColor="#3b82f6"}
            onBlur={e=>e.target.style.borderColor="#e8edf5"}
          />
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", overflow:"hidden" }}>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:760 }}>
            <thead>
              <tr style={{ background:"#fafbfd", borderBottom:"1px solid #edf0f7" }}>
                {["#","Customer","Service","Date & Time","Status","Actions"].map(h => (
                  <th key={h} style={{
                    textAlign:"left", padding:"10px 16px",
                    fontSize:11, fontWeight:700, color:"#94a3b8",
                    textTransform:"uppercase", letterSpacing:"0.07em", whiteSpace:"nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((b, i) => {
                const m = STATUS[b.status];
                const grad = customerGrad(b.customerName);
                return (
                  <tr key={b.id}
                    onClick={() => setSelected(b)}
                    style={{ borderBottom: i < filtered.length-1 ? "1px solid #f8fafc" : "none", cursor:"pointer" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="#fafcff")}
                    onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                  >
                    {/* ID */}
                    <td style={{ padding:"13px 16px" }}>
                      <span style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", fontWeight:700 }}>{b.id}</span>
                    </td>
                    {/* Customer */}
                    <td style={{ padding:"13px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:9 }}>
                        <div style={{
                          width:30, height:30, borderRadius:"50%", flexShrink:0,
                          background:`linear-gradient(135deg,${grad})`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff", fontSize:10, fontWeight:900,
                        }}>{b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div>
                          <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:700, margin:0 }}>{b.customerName}</p>
                          <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.city}, {b.state}</p>
                        </div>
                      </div>
                    </td>
                    {/* Service */}
                    <td style={{ padding:"13px 16px" }}>
                      <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:600, margin:0 }}>{b.service}</p>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.plan} · ${b.price}</p>
                    </td>
                    {/* Date */}
                    <td style={{ padding:"13px 16px", whiteSpace:"nowrap" }}>
                      <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:600, margin:0 }}>
                        {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </p>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.scheduledTime}</p>
                    </td>
                    {/* Status */}
                    <td style={{ padding:"13px 16px" }}>
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        padding:"3px 10px", borderRadius:999, fontSize:12, fontWeight:700,
                        background:m.bg, color:m.text,
                        border:`1px solid ${m.border}`,
                      }}>
                        <span style={{ width:6,height:6,borderRadius:"50%",background:m.dot,display:"inline-block" }} />
                        {m.label}
                      </span>
                    </td>
                    {/* Actions */}
                    <td style={{ padding:"13px 16px" }} onClick={e=>e.stopPropagation()}>
                      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                        {b.status === "pending" && (
                          <button onClick={()=>changeStatus(b.id,"confirmed")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", cursor:"pointer" }}>
                            Confirm
                          </button>
                        )}
                        {b.status === "confirmed" && (
                          <button onClick={()=>changeStatus(b.id,"completed")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #a7f3d0", background:"#ecfdf5", color:"#065f46", cursor:"pointer" }}>
                            Complete
                          </button>
                        )}
                        {(b.status === "pending" || b.status === "confirmed") && (
                          <button onClick={()=>changeStatus(b.id,"cancelled")}
                            style={{ height:28, padding:"0 10px", fontSize:12, fontWeight:700, borderRadius:7, border:"1px solid #fecaca", background:"#fef2f2", color:"#b91c1c", cursor:"pointer" }}>
                            Cancel
                          </button>
                        )}
                        <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                          style={{ width:28,height:28,borderRadius:7,background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none",flexShrink:0 }}>
                          <MessageCircle style={{width:13,height:13,color:"#16a34a"}}/>
                        </a>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={6} style={{ padding:"52px 16px", textAlign:"center", color:"#94a3b8", fontSize:13 }}>No bookings match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex" }}>
          <div style={{ flex:1, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)" }} onClick={()=>setSelected(null)} />
          <div style={{ width:"100%", maxWidth:420, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"-4px 0 24px rgba(0,0,0,0.15)" }}>
            {/* Drawer header */}
            <div style={{ padding:"20px 24px", borderBottom:"1px solid #edf0f7" }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", margin:"0 0 5px", fontWeight:700 }}>{selected.id}</p>
                  <h2 style={{ color:"#0d1e4a", fontSize:17, fontWeight:900, margin:0 }}>{selected.customerName}</h2>
                  <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>{selected.service}</p>
                </div>
                <button onClick={()=>setSelected(null)} style={{ background:"none", border:"none", cursor:"pointer", color:"#94a3b8", marginTop:2 }}>
                  <X style={{width:18,height:18}}/>
                </button>
              </div>
            </div>

            <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
              {/* Status selector */}
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94a3b8", margin:"0 0 10px" }}>Update Status</p>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:24 }}>
                {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => {
                  const m = STATUS[s]; const active = selected.status === s;
                  return (
                    <button key={s} onClick={()=>changeStatus(selected.id, s)}
                      style={{
                        display:"flex", alignItems:"center", gap:6,
                        padding:"5px 12px", borderRadius:8, border:`1px solid ${active ? m.dot : "#e8edf5"}`,
                        fontSize:12, fontWeight:700, cursor:"pointer", textTransform:"capitalize",
                        background: active ? m.bg : "#fff",
                        color: active ? m.text : "#64748b",
                        boxShadow: active ? `0 0 0 2px ${m.border}` : "none",
                        transition:"all 0.12s",
                      }}
                    >
                      <span style={{ width:6,height:6,borderRadius:"50%",background:m.dot,display:"inline-block" }} />
                      {s}
                    </button>
                  );
                })}
              </div>

              {/* Contact */}
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94a3b8", margin:"0 0 10px" }}>Contact</p>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:24 }}>
                {[
                  { icon:Phone, v:selected.phone,  href:`tel:${selected.phone}` },
                  { icon:Mail,  v:selected.email,  href:`mailto:${selected.email}` },
                  { icon:MapPin,v:`${selected.address}, ${selected.city}, ${selected.state} ${selected.zip}`,
                    href:`https://maps.google.com/?q=${encodeURIComponent(selected.address+" "+selected.city)}` },
                ].map(({icon:Icon,v,href})=>(
                  <a key={href} href={href} target="_blank" rel="noopener noreferrer"
                    style={{ display:"flex", alignItems:"flex-start", gap:9, fontSize:13, color:"#1557b8", textDecoration:"none" }}>
                    <Icon style={{width:14,height:14,marginTop:1,color:"#94a3b8",flexShrink:0}}/>
                    <span style={{ flex:1 }}>{v}</span>
                    <ArrowUpRight style={{width:12,height:12,marginTop:1,flexShrink:0,color:"#94a3b8"}}/>
                  </a>
                ))}
              </div>

              {/* Service details */}
              <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94a3b8", margin:"0 0 10px" }}>Service Details</p>
              <div style={{ background:"#fafbfd", borderRadius:10, padding:"14px 16px", marginBottom:16 }}>
                {[
                  ["Service",   selected.service],
                  ["Plan",      selected.plan],
                  ["Price",     `$${selected.price}`],
                  ["Property",  `${selected.sqFt.toLocaleString()} sq ft`],
                  ["Date",      new Date(selected.scheduledDate).toLocaleDateString("en-US",{weekday:"short",month:"long",day:"numeric",year:"numeric"})],
                  ["Time",      selected.scheduledTime],
                ].map(([label,value])=>(
                  <div key={label} style={{ display:"flex", gap:12, marginBottom:8 }}>
                    <span style={{ color:"#94a3b8", fontSize:12, fontWeight:600, width:56, flexShrink:0 }}>{label}</span>
                    <span style={{ color:"#0d1e4a", fontSize:13, fontWeight:600 }}>{value}</span>
                  </div>
                ))}
              </div>

              {selected.notes && (
                <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:10, padding:"12px 14px" }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#92400e", margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.1em" }}>Notes</p>
                  <p style={{ color:"#374151", fontSize:13, margin:0, lineHeight:1.6 }}>{selected.notes}</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div style={{ padding:"16px 24px", borderTop:"1px solid #edf0f7" }}>
              <a href={buildWA(selected)} target="_blank" rel="noopener noreferrer"
                style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, height:44, background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
                <MessageCircle style={{width:16,height:16}}/>
                Send to Technician via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
