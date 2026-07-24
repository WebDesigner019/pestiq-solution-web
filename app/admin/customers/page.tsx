"use client";

import React, { useState } from "react";
import { Search, MessageCircle, X, Phone, Mail, MapPin, ArrowUpRight, ChevronRight } from "lucide-react";
import { MOCK_CUSTOMERS, MOCK_BOOKINGS, type Customer } from "@/lib/adminMockData";

const PLAN: Record<string, { dot:string; text:string; bg:string; border:string }> = {
  Complete:   { dot:"#3b82f6", text:"#1e40af", bg:"#eff6ff", border:"#bfdbfe" },
  Essential:  { dot:"#8b5cf6", text:"#5b21b6", bg:"#f5f3ff", border:"#c4b5fd" },
  "One-Time": { dot:"#f59e0b", text:"#92400e", bg:"#fffbeb", border:"#fde68a" },
  None:       { dot:"#94a3b8", text:"#475569", bg:"#f8fafc", border:"#e2e8f0" },
};

const GRADS = [
  "#1d4ed8,#3b82f6","#7c3aed,#a78bfa","#059669,#34d399",
  "#dc2626,#f87171","#d97706,#fbbf24","#0284c7,#38bdf8",
  "#c026d3,#e879f9","#16a34a,#86efac",
];

const STATUS_STYLE: Record<string,{bg:string;color:string}> = {
  completed: { bg:"#ecfdf5", color:"#065f46" },
  confirmed: { bg:"#eff6ff", color:"#1e40af"  },
  pending:   { bg:"#fffbeb", color:"#92400e"  },
  cancelled: { bg:"#fef2f2", color:"#991b1b"  },
};

export default function AdminCustomersPage() {
  const [search,   setSearch]   = useState("");
  const [selected, setSelected] = useState<Customer | null>(null);

  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = search.toLowerCase();
    return c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) || c.zip.includes(q) || c.phone.includes(q);
  });

  const topSpend  = Math.max(...MOCK_CUSTOMERS.map(c => c.totalSpent), 1);
  const cx = (c:Customer) => MOCK_BOOKINGS.filter(b=>b.customerName===c.name);
  const selBookings = selected ? cx(selected) : [];

  return (
    <div style={{ padding:"24px 28px", maxWidth:1280, margin:"0 auto" }}>
      {/* Heading + search */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20, gap:12, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ color:"#0d1e4a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.025em" }}>Customers</h1>
          <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>{filtered.length} records</p>
        </div>
        <div style={{ position:"relative", width:260 }}>
          <Search style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", width:14, height:14, color:"#94a3b8" }} />
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search customers…"
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
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:680 }}>
            <thead>
              <tr style={{ background:"#fafbfd", borderBottom:"1px solid #edf0f7" }}>
                {["Customer","Plan","Bookings","Total Spent","Last Service",""].map(h=>(
                  <th key={h||"x"} style={{
                    textAlign:"left", padding:"10px 16px",
                    fontSize:11, fontWeight:700, color:"#94a3b8",
                    textTransform:"uppercase", letterSpacing:"0.07em", whiteSpace:"nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((c, i) => {
                const plan = PLAN[c.plan] ?? PLAN.None;
                const grad = GRADS[i % GRADS.length];
                const spendPct = Math.round((c.totalSpent/topSpend)*100);
                return (
                  <tr key={c.id}
                    onClick={()=>setSelected(c)}
                    style={{ borderBottom:"1px solid #f8fafc", cursor:"pointer" }}
                    onMouseEnter={e=>(e.currentTarget.style.background="#fafcff")}
                    onMouseLeave={e=>(e.currentTarget.style.background="transparent")}
                  >
                    {/* Customer */}
                    <td style={{ padding:"12px 16px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{
                          width:32, height:32, borderRadius:"50%", flexShrink:0,
                          background:`linear-gradient(135deg,${grad})`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          color:"#fff", fontSize:11, fontWeight:900,
                        }}>{c.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                        <div>
                          <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:700, margin:0 }}>{c.name}</p>
                          <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{c.email}</p>
                        </div>
                      </div>
                    </td>
                    {/* Plan */}
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{
                        display:"inline-flex", alignItems:"center", gap:5,
                        padding:"3px 10px", borderRadius:999, fontSize:12, fontWeight:700,
                        background:plan.bg, color:plan.text, border:`1px solid ${plan.border}`,
                      }}>
                        <span style={{ width:6,height:6,borderRadius:"50%",background:plan.dot,display:"inline-block" }}/>
                        {c.plan}
                      </span>
                    </td>
                    {/* Bookings */}
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ color:"#0d1e4a", fontSize:14, fontWeight:800 }}>{c.totalBookings}</span>
                    </td>
                    {/* Spend */}
                    <td style={{ padding:"12px 16px", minWidth:130 }}>
                      <p style={{ color:"#0d1e4a", fontSize:14, fontWeight:800, margin:"0 0 5px" }}>${c.totalSpent.toLocaleString()}</p>
                      <div style={{ height:4, borderRadius:999, background:"#f1f5f9", width:80 }}>
                        <div style={{ height:"100%", borderRadius:999, background:"#1557b8", opacity:0.4, width:`${spendPct}%` }} />
                      </div>
                    </td>
                    {/* Last service */}
                    <td style={{ padding:"12px 16px" }}>
                      <span style={{ color:c.lastService==="—"?"#d1d5db":"#374151", fontSize:13, fontWeight:500 }}>
                        {c.lastService==="—" ? "Never" : new Date(c.lastService).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})}
                      </span>
                    </td>
                    {/* Arrow */}
                    <td style={{ padding:"12px 16px" }}>
                      <ChevronRight style={{width:14,height:14,color:"#d1d5db"}}/>
                    </td>
                  </tr>
                );
              })}
              {filtered.length===0 && (
                <tr><td colSpan={6} style={{ padding:"52px 16px", textAlign:"center", color:"#94a3b8", fontSize:13 }}>No customers found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer */}
      {selected && (() => {
        const idx  = MOCK_CUSTOMERS.findIndex(c=>c.id===selected.id);
        const grad = GRADS[idx % GRADS.length];
        const plan = PLAN[selected.plan] ?? PLAN.None;
        return (
          <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex" }}>
            <div style={{ flex:1, background:"rgba(0,0,0,0.45)", backdropFilter:"blur(3px)" }} onClick={()=>setSelected(null)} />
            <div style={{ width:"100%", maxWidth:420, background:"#fff", display:"flex", flexDirection:"column", boxShadow:"-4px 0 24px rgba(0,0,0,0.15)" }}>
              {/* Header */}
              <div style={{ padding:"20px 24px", borderBottom:"1px solid #edf0f7" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:40,height:40,borderRadius:"50%",background:`linear-gradient(135deg,${grad})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:13,fontWeight:900 }}>
                      {selected.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div>
                      <h2 style={{ color:"#0d1e4a", fontSize:16, fontWeight:900, margin:0 }}>{selected.name}</h2>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"3px 0 0" }}>{selected.id}</p>
                    </div>
                  </div>
                  <button onClick={()=>setSelected(null)} style={{ background:"none",border:"none",cursor:"pointer",color:"#94a3b8" }}>
                    <X style={{width:18,height:18}}/>
                  </button>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:14 }}>
                  <span style={{ display:"inline-flex", alignItems:"center", gap:5, padding:"3px 10px", borderRadius:999, fontSize:12, fontWeight:700, background:plan.bg, color:plan.text, border:`1px solid ${plan.border}` }}>
                    <span style={{ width:6,height:6,borderRadius:"50%",background:plan.dot,display:"inline-block" }}/>{selected.plan} Plan
                  </span>
                  <span style={{ color:"#94a3b8", fontSize:12 }}>Since {new Date(selected.joinedDate).toLocaleDateString("en-US",{month:"short",year:"numeric"})}</span>
                </div>
              </div>

              <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>
                {/* Mini stats */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:22 }}>
                  {[{ label:"Total Bookings",value:selected.totalBookings },{ label:"Total Spent",value:`$${selected.totalSpent.toLocaleString()}` }].map(({label,value})=>(
                    <div key={label} style={{ background:"#fafbfd", borderRadius:10, padding:14 }}>
                      <p style={{ color:"#94a3b8", fontSize:12, fontWeight:600, margin:"0 0 5px" }}>{label}</p>
                      <p style={{ color:"#0d1e4a", fontSize:20, fontWeight:900, margin:0 }}>{value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact */}
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94a3b8", margin:"0 0 10px" }}>Contact</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
                  {[
                    { icon:Phone, v:selected.phone, href:`tel:${selected.phone}` },
                    { icon:Mail,  v:selected.email, href:`mailto:${selected.email}` },
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

                {/* Booking history */}
                <p style={{ fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.14em", color:"#94a3b8", margin:"0 0 10px" }}>
                  Service History ({selBookings.length})
                </p>
                {selBookings.length===0 ? (
                  <p style={{ color:"#94a3b8", fontSize:13, margin:0 }}>No services yet.</p>
                ) : (
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {selBookings.map(b => {
                      const ss = STATUS_STYLE[b.status] ?? STATUS_STYLE.pending;
                      return (
                        <div key={b.id} style={{ display:"flex", alignItems:"center", gap:10, background:"#fafbfd", borderRadius:9, padding:"10px 12px" }}>
                          <div style={{ flex:1, minWidth:0 }}>
                            <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:700, margin:0 }}>{b.service}</p>
                            <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>
                              {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric",year:"numeric"})} · ${b.price}
                            </p>
                          </div>
                          <span style={{ fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:999, textTransform:"capitalize", background:ss.bg, color:ss.color }}>
                            {b.status}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{ padding:"16px 24px", borderTop:"1px solid #edf0f7" }}>
                <a href={`https://wa.me/${selected.phone.replace(/\D/g,"")}`} target="_blank" rel="noopener noreferrer"
                  style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, height:44, background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
                  <MessageCircle style={{width:16,height:16}}/>
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
