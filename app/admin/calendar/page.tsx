"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const S: Record<BookingStatus, { dot:string; bg:string; text:string }> = {
  pending:   { dot:"bg-amber-400",   bg:"bg-amber-50",   text:"text-amber-800"   },
  confirmed: { dot:"bg-blue-500",    bg:"bg-blue-50",    text:"text-blue-800"    },
  completed: { dot:"bg-emerald-500", bg:"bg-emerald-50", text:"text-emerald-800" },
  cancelled: { dot:"bg-red-400",     bg:"bg-red-50",     text:"text-red-800"     },
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

export default function AdminCalendarPage() {
  const today  = new Date();
  const [view,  setView]  = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [day,   setDay]   = useState<number>(today.getDate());
  const [modal, setModal] = useState<Booking | null>(null);

  const year      = view.getFullYear();
  const month     = view.getMonth();
  const firstDay  = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();

  const bookingsOnDay = (d: number) => {
    const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return MOCK_BOOKINGS.filter(b => b.scheduledDate === ds);
  };

  const selectedBookings = day ? bookingsOnDay(day) : [];
  const totalThisMonth = MOCK_BOOKINGS.filter(b =>
    b.scheduledDate.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)
  ).length;

  const bookingIdx = (name: string) => MOCK_BOOKINGS.findIndex(b => b.customerName === name) % GRADIENTS.length;

  return (
    <div style={{ padding:"28px 32px", maxWidth:1200, margin:"0 auto" }}>

      {/* Page heading */}
      <div style={{ marginBottom:24 }}>
        <h1 style={{ color:"#0c1a3a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.03em" }}>Calendar</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0", fontWeight:500 }}>
          {totalThisMonth} appointment{totalThisMonth!==1?"s":""} in {MONTHS[month]}
        </p>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:20 }}>
        {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span className={`w-2 h-2 rounded-full ${S[s].dot}`} />
            <span style={{ color:"#64748b", fontSize:12, fontWeight:600, textTransform:"capitalize" }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:16 }}>

        {/* Calendar grid */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>

          {/* Month nav */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f8fafc" }}>
            <button
              onClick={() => setView(new Date(year, month-1, 1))}
              style={{ width:32, height:32, borderRadius:8, border:"1px solid #e2e8f0", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b" }}
            >
              <ChevronLeft style={{ width:15, height:15 }} />
            </button>
            <div style={{ textAlign:"center" }}>
              <p style={{ color:"#0c1a3a", fontSize:15, fontWeight:800, margin:0 }}>{MONTHS[month]}</p>
              <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{year}</p>
            </div>
            <button
              onClick={() => setView(new Date(year, month+1, 1))}
              style={{ width:32, height:32, borderRadius:8, border:"1px solid #e2e8f0", background:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"#64748b" }}
            >
              <ChevronRight style={{ width:15, height:15 }} />
            </button>
          </div>

          {/* Day headers */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:"1px solid #f1f5f9", background:"#fafafa" }}>
            {DAYS.map(d => (
              <div key={d} style={{ padding:"8px 0", textAlign:"center", fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.08em" }}>
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
            {Array.from({ length: firstDay }).map((_,i) => (
              <div key={`e${i}`} style={{ minHeight:80, borderRight:"1px solid #f8fafc", borderBottom:"1px solid #f8fafc", background:"#fafafa" }} />
            ))}

            {Array.from({ length: daysCount }).map((_,i) => {
              const d = i + 1;
              const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
              const isSel   = day===d;
              const bks     = bookingsOnDay(d);

              return (
                <button
                  key={d}
                  onClick={() => setDay(d)}
                  style={{
                    minHeight:80, border:"none",
                    borderRight:"1px solid #f8fafc", borderBottom:"1px solid #f8fafc",
                    padding:"8px 6px", textAlign:"left", cursor:"pointer",
                    background: isSel ? "#f0f7ff" : "white",
                    outline: isSel ? "1px solid #bfdbfe" : "none",
                    transition:"background 0.1s",
                  }}
                >
                  <span style={{
                    display:"inline-flex", width:24, height:24, alignItems:"center", justifyContent:"center",
                    borderRadius:"50%", fontSize:12, fontWeight:700, marginBottom:4,
                    background: isToday ? "#FACC15" : "none",
                    color: isToday ? "#071b4d" : isSel ? "#1557b8" : bks.length > 0 ? "#0c1a3a" : "#94a3b8",
                  }}>
                    {d}
                  </span>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {bks.slice(0,2).map(b => (
                      <div key={b.id} className={`${S[b.status].bg} ${S[b.status].text}`}
                        style={{ borderRadius:4, padding:"2px 5px", fontSize:10, fontWeight:700, overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>
                        {b.customerName.split(" ")[0]}
                      </div>
                    ))}
                    {bks.length > 2 && (
                      <span style={{ fontSize:10, color:"#94a3b8", fontWeight:700, padding:"0 4px" }}>+{bks.length-2}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden", height:"fit-content" }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid #f8fafc", background:"#fafafa" }}>
            <p style={{ color:"#0c1a3a", fontSize:14, fontWeight:800, margin:0 }}>
              {day ? `${MONTHS[month]} ${day}` : "Select a day"}
            </p>
            <p style={{ color:"#94a3b8", fontSize:12, margin:"3px 0 0", fontWeight:500 }}>
              {selectedBookings.length===0 ? "No appointments" : `${selectedBookings.length} appointment${selectedBookings.length>1?"s":""}`}
            </p>
          </div>

          {selectedBookings.length===0 ? (
            <div style={{ padding:"48px 18px", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📅</div>
              <p style={{ color:"#94a3b8", fontSize:13, fontWeight:600, margin:0 }}>No appointments</p>
              <p style={{ color:"#cbd5e1", fontSize:12, margin:"4px 0 0" }}>Click a highlighted day</p>
            </div>
          ) : (
            <div>
              {selectedBookings.map(b => {
                const m = S[b.status];
                const gi = bookingIdx(b.customerName);
                return (
                  <div key={b.id} style={{ padding:"14px 18px", borderBottom:"1px solid #f8fafc" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                      <div style={{ width:30, height:30, borderRadius:"50%", background:GRADIENTS[gi], display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontSize:10, fontWeight:900, flexShrink:0 }}>
                        {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                      </div>
                      <div style={{ flex:1 }}>
                        <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:700, margin:0 }}>{b.customerName}</p>
                        <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.scheduledTime}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold ${m.bg} ${m.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                        {b.status}
                      </span>
                    </div>
                    <p style={{ color:"#475569", fontSize:13, fontWeight:500, margin:"0 0 2px" }}>{b.service}</p>
                    <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 10px", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{b.address}, {b.city}</p>
                    <div style={{ display:"flex", gap:8 }}>
                      <button onClick={()=>setModal(b)}
                        style={{ flex:1, height:30, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                        View Details
                      </button>
                      <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                        style={{ width:30, height:30, borderRadius:7, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none" }}>
                        <MessageCircle style={{ width:13, height:13, color:"#16a34a" }} />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(2px)" }} onClick={()=>setModal(null)} />
          <div style={{ position:"relative", background:"#fff", borderRadius:16, boxShadow:"0 25px 50px rgba(0,0,0,0.2)", width:"100%", maxWidth:380, padding:24, zIndex:10 }}>
            <button onClick={()=>setModal(null)} style={{ position:"absolute", top:16, right:16, background:"none", border:"none", cursor:"pointer", color:"#94a3b8" }}>
              <X style={{ width:17, height:17 }} />
            </button>
            <p style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", margin:"0 0 4px" }}>{modal.id}</p>
            <h3 style={{ color:"#0c1a3a", fontSize:17, fontWeight:900, margin:0 }}>{modal.customerName}</h3>
            <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 16px" }}>{modal.phone}</p>
            <div style={{ background:"#fafafa", borderRadius:10, padding:14, marginBottom:14 }}>
              {[["Service",modal.service],["Plan",modal.plan],["Time",modal.scheduledTime],["Address",`${modal.address}, ${modal.city}, ${modal.state}`]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", gap:12, marginBottom:8 }}>
                  <span style={{ color:"#94a3b8", fontSize:12, fontWeight:600, width:50, flexShrink:0 }}>{l}</span>
                  <span style={{ color:"#0c1a3a", fontSize:13, fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            {modal.notes && <p style={{ color:"#475569", fontSize:13, background:"#fffbeb", border:"1px solid #fef08a", borderRadius:9, padding:12, marginBottom:14 }}>{modal.notes}</p>}
            <a href={buildWA(modal)} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10, height:44, background:"#16a34a", color:"#fff", borderRadius:10, fontSize:14, fontWeight:700, textDecoration:"none" }}>
              <MessageCircle style={{ width:15, height:15 }} />
              Send to Technician
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
