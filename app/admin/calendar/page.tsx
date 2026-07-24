"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { MOCK_BOOKINGS, type Booking, type BookingStatus } from "@/lib/adminMockData";

const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const S: Record<BookingStatus, { dot:string; text:string; bg:string; pillBg:string }> = {
  pending:   { dot:"#f59e0b", text:"#92400e", bg:"#fffbeb", pillBg:"rgba(245,158,11,0.12)" },
  confirmed: { dot:"#3b82f6", text:"#1e40af", bg:"#eff6ff", pillBg:"rgba(59,130,246,0.12)"  },
  completed: { dot:"#10b981", text:"#065f46", bg:"#ecfdf5", pillBg:"rgba(16,185,129,0.12)" },
  cancelled: { dot:"#ef4444", text:"#991b1b", bg:"#fef2f2", pillBg:"rgba(239,68,68,0.12)"  },
};

const GRADS = [
  "#1d4ed8,#3b82f6","#7c3aed,#a78bfa","#059669,#34d399",
  "#dc2626,#f87171","#d97706,#fbbf24","#0284c7,#38bdf8",
  "#c026d3,#e879f9","#16a34a,#86efac",
];

function buildWA(b: Booking) {
  const msg = `🛡️ *PestIQ — Service Assignment*\n\n*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Contact:* ${b.phone}\n*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n*Service:* ${b.service} (${b.plan})\n*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminCalendarPage() {
  const today = new Date();
  const [view,  setView]  = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selDay, setSelDay] = useState<number>(today.getDate());
  const [modal, setModal] = useState<Booking | null>(null);

  const year      = view.getFullYear();
  const month     = view.getMonth();
  const firstDay  = new Date(year, month, 1).getDay();
  const daysCount = new Date(year, month + 1, 0).getDate();

  const bookingsOnDay = (d: number) => {
    const ds = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    return MOCK_BOOKINGS.filter(b => b.scheduledDate === ds);
  };

  const selBookings   = selDay ? bookingsOnDay(selDay) : [];
  const totalThisMo   = MOCK_BOOKINGS.filter(b => b.scheduledDate.startsWith(`${year}-${String(month+1).padStart(2,"0")}`)).length;
  const hasBookings   = (d: number) => bookingsOnDay(d).length > 0;

  const gradIdx = (name: string) => {
    const idx = MOCK_BOOKINGS.findIndex(b=>b.customerName===name);
    return GRADS[(idx<0?0:idx)%GRADS.length];
  };

  const prevMonth = () => { setSelDay(0); setView(new Date(year,month-1,1)); };
  const nextMonth = () => { setSelDay(0); setView(new Date(year,month+1,1)); };

  return (
    <div style={{ padding:"24px 28px", maxWidth:1280, margin:"0 auto" }}>
      {/* Heading */}
      <div style={{ marginBottom:20 }}>
        <h1 style={{ color:"#0d1e4a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.025em" }}>Calendar</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>
          {totalThisMo} appointment{totalThisMo!==1?"s":""} in {MONTHS[month]} {year}
        </p>
      </div>

      {/* Legend */}
      <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:18, flexWrap:"wrap" }}>
        {(["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => (
          <div key={s} style={{ display:"flex", alignItems:"center", gap:5 }}>
            <span style={{ width:8,height:8,borderRadius:"50%",background:S[s].dot,display:"inline-block" }}/>
            <span style={{ color:"#64748b", fontSize:12, fontWeight:600, textTransform:"capitalize" }}>{s}</span>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 310px", gap:16, alignItems:"start" }}>

        {/* Calendar grid */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", overflow:"hidden" }}>
          {/* Nav */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom:"1px solid #f8fafc" }}>
            <button onClick={prevMonth}
              style={{ width:32,height:32,borderRadius:8,border:"1px solid #e8edf5",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#f8fafc")}
              onMouseLeave={e=>(e.currentTarget.style.background="#fff")}
            >
              <ChevronLeft style={{width:15,height:15}}/>
            </button>
            <div style={{ textAlign:"center" }}>
              <p style={{ color:"#0d1e4a", fontSize:15, fontWeight:800, margin:0 }}>{MONTHS[month]}</p>
              <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{year}</p>
            </div>
            <button onClick={nextMonth}
              style={{ width:32,height:32,borderRadius:8,border:"1px solid #e8edf5",background:"#fff",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",color:"#64748b" }}
              onMouseEnter={e=>(e.currentTarget.style.background="#f8fafc")}
              onMouseLeave={e=>(e.currentTarget.style.background="#fff")}
            >
              <ChevronRight style={{width:15,height:15}}/>
            </button>
          </div>

          {/* Day names */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", borderBottom:"1px solid #edf0f7", background:"#fafbfd" }}>
            {DAYS.map(d => (
              <div key={d} style={{ padding:"8px 0", textAlign:"center", fontSize:11, fontWeight:700, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.07em" }}>{d}</div>
            ))}
          </div>

          {/* Days grid */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)" }}>
            {Array.from({length:firstDay}).map((_,i) => (
              <div key={`e${i}`} style={{ minHeight:80, borderRight:"1px solid #f8fafc", borderBottom:"1px solid #f8fafc", background:"#fafbfd" }} />
            ))}

            {Array.from({length:daysCount}).map((_,i) => {
              const d = i + 1;
              const isToday = today.getFullYear()===year && today.getMonth()===month && today.getDate()===d;
              const isSel   = selDay === d;
              const bks     = bookingsOnDay(d);

              return (
                <button key={d} onClick={()=>setSelDay(d)}
                  style={{
                    minHeight:80, padding:"6px",
                    border:"none",
                    borderRight:"1px solid #f8fafc",
                    borderBottom:"1px solid #f8fafc",
                    textAlign:"left", cursor:"pointer",
                    background: isSel ? "#eff6ff" : "white",
                    outline: isSel ? "inset 0 0 0 2px #bfdbfe" : "none",
                    boxShadow: isSel ? "inset 0 0 0 2px #bfdbfe" : "none",
                    transition:"background 0.1s",
                  }}
                >
                  <span style={{
                    display:"inline-flex", width:24, height:24, alignItems:"center", justifyContent:"center",
                    borderRadius:"50%", fontSize:12, fontWeight:700, marginBottom:4,
                    background: isToday ? "#FACC15" : "none",
                    color: isToday ? "#071b4d" : isSel ? "#1557b8" : bks.length>0 ? "#0d1e4a" : "#94a3b8",
                  }}>{d}</span>
                  <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
                    {bks.slice(0,2).map(b => (
                      <div key={b.id} style={{
                        borderRadius:4, padding:"1px 5px", fontSize:10, fontWeight:700,
                        overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis",
                        background:S[b.status].pillBg, color:S[b.status].text,
                      }}>
                        {b.customerName.split(" ")[0]}
                      </div>
                    ))}
                    {bks.length>2 && (
                      <span style={{ fontSize:10, color:"#94a3b8", fontWeight:700, paddingLeft:4 }}>+{bks.length-2} more</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", overflow:"hidden" }}>
          <div style={{ padding:"14px 18px", borderBottom:"1px solid #f8fafc", background:"#fafbfd" }}>
            <p style={{ color:"#0d1e4a", fontSize:14, fontWeight:800, margin:0 }}>
              {selDay ? `${MONTHS[month]} ${selDay}, ${year}` : "Select a day"}
            </p>
            <p style={{ color:"#94a3b8", fontSize:12, margin:"3px 0 0" }}>
              {selBookings.length===0 ? "No appointments" : `${selBookings.length} appointment${selBookings.length>1?"s":""}`}
            </p>
          </div>

          {selBookings.length===0 ? (
            <div style={{ padding:"44px 18px", textAlign:"center" }}>
              <div style={{ fontSize:32, marginBottom:8 }}>📅</div>
              <p style={{ color:"#94a3b8", fontSize:13, fontWeight:600, margin:0 }}>No appointments</p>
              <p style={{ color:"#d1d5db", fontSize:12, margin:"4px 0 0" }}>Click a highlighted day</p>
            </div>
          ) : (
            selBookings.map(b => {
              const m = S[b.status];
              const gr = gradIdx(b.customerName);
              return (
                <div key={b.id} style={{ padding:"14px 18px", borderBottom:"1px solid #f8fafc" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:8 }}>
                    <div style={{ width:30,height:30,borderRadius:"50%",background:`linear-gradient(135deg,${gr})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:10,fontWeight:900,flexShrink:0 }}>
                      {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:700, margin:0 }}>{b.customerName}</p>
                      <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.scheduledTime}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, background:m.bg, color:m.text }}>
                      {b.status}
                    </span>
                  </div>
                  <p style={{ color:"#374151", fontSize:13, fontWeight:500, margin:"0 0 2px" }}>{b.service}</p>
                  <p style={{ color:"#94a3b8", fontSize:12, margin:"0 0 10px", overflow:"hidden", whiteSpace:"nowrap", textOverflow:"ellipsis" }}>{b.address}, {b.city}</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={()=>setModal(b)}
                      style={{ flex:1, height:30, border:"1px solid #bfdbfe", background:"#eff6ff", color:"#1d4ed8", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                      View Details
                    </button>
                    <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                      style={{ width:30,height:30,borderRadius:7,background:"#f0fdf4",display:"flex",alignItems:"center",justifyContent:"center",textDecoration:"none" }}>
                      <MessageCircle style={{width:13,height:13,color:"#16a34a"}}/>
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {modal && (
        <div style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div style={{ position:"absolute", inset:0, background:"rgba(0,0,0,0.5)", backdropFilter:"blur(3px)" }} onClick={()=>setModal(null)} />
          <div style={{ position:"relative", background:"#fff", borderRadius:16, boxShadow:"0 25px 50px rgba(0,0,0,0.2)", width:"100%", maxWidth:390, padding:"24px", zIndex:10 }}>
            <button onClick={()=>setModal(null)} style={{ position:"absolute",top:16,right:16,background:"none",border:"none",cursor:"pointer",color:"#94a3b8" }}>
              <X style={{width:17,height:17}}/>
            </button>
            <p style={{ fontFamily:"monospace", fontSize:11, color:"#94a3b8", margin:"0 0 4px", fontWeight:700 }}>{modal.id}</p>
            <h3 style={{ color:"#0d1e4a", fontSize:17, fontWeight:900, margin:"0 0 2px" }}>{modal.customerName}</h3>
            <p style={{ color:"#94a3b8", fontSize:13, margin:"0 0 16px" }}>{modal.phone}</p>
            <div style={{ background:"#fafbfd", borderRadius:10, padding:"14px 16px", marginBottom:14 }}>
              {[["Service",modal.service],["Plan",modal.plan],["Price",`$${modal.price}`],["Time",modal.scheduledTime],["Address",`${modal.address}, ${modal.city}, ${modal.state}`]].map(([l,v])=>(
                <div key={l} style={{ display:"flex", gap:12, marginBottom:8 }}>
                  <span style={{ color:"#94a3b8", fontSize:12, fontWeight:600, width:52, flexShrink:0 }}>{l}</span>
                  <span style={{ color:"#0d1e4a", fontSize:13, fontWeight:600 }}>{v}</span>
                </div>
              ))}
            </div>
            {modal.notes && (
              <div style={{ background:"#fffbeb", border:"1px solid #fde68a", borderRadius:9, padding:"10px 14px", marginBottom:14 }}>
                <p style={{ color:"#92400e", fontSize:11, fontWeight:700, margin:"0 0 4px", textTransform:"uppercase", letterSpacing:"0.1em" }}>Notes</p>
                <p style={{ color:"#374151", fontSize:13, margin:0 }}>{modal.notes}</p>
              </div>
            )}
            <a href={buildWA(modal)} target="_blank" rel="noopener noreferrer"
              style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:10,height:44,background:"#16a34a",color:"#fff",borderRadius:10,fontSize:14,fontWeight:700,textDecoration:"none" }}>
              <MessageCircle style={{width:15,height:15}}/>
              Send to Technician via WhatsApp
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
