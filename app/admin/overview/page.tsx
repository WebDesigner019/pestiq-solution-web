"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardList, Users, CalendarCheck, DollarSign,
  ArrowRight, MessageCircle, TrendingUp,
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_CUSTOMERS, type BookingStatus } from "@/lib/adminMockData";

const S: Record<BookingStatus, { dot: string; text: string; bg: string }> = {
  pending:   { dot: "bg-amber-400",   text: "text-amber-700",   bg: "bg-amber-50"   },
  confirmed: { dot: "bg-blue-500",    text: "text-blue-700",    bg: "bg-blue-50"    },
  completed: { dot: "bg-emerald-500", text: "text-emerald-700", bg: "bg-emerald-50" },
  cancelled: { dot: "bg-red-400",     text: "text-red-700",     bg: "bg-red-50"     },
};

function buildWA(b: (typeof MOCK_BOOKINGS)[0]) {
  const msg =
    `🛡️ *PestIQ — Service Assignment*\n\n` +
    `*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Phone:* ${b.phone}\n` +
    `*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n` +
    `*Service:* ${b.service} (${b.plan})\n` +
    `*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n` +
    `*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

export default function AdminOverviewPage() {
  const pending   = MOCK_BOOKINGS.filter(b => b.status === "pending").length;
  const confirmed = MOCK_BOOKINGS.filter(b => b.status === "confirmed").length;
  const completed = MOCK_BOOKINGS.filter(b => b.status === "completed").length;
  const revenue   = MOCK_BOOKINGS.filter(b => b.status === "completed").reduce((s,b)=>s+b.price,0);
  const recent    = [...MOCK_BOOKINGS].sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0,5);
  const total     = MOCK_BOOKINGS.length;

  const stats = [
    { label:"Total Bookings",      value: total,              sub:`${pending} pending review`,    icon:ClipboardList, color:"#3b82f6", bg:"#eff6ff" },
    { label:"Active Customers",    value: MOCK_CUSTOMERS.length, sub:"All time",                 icon:Users,         color:"#8b5cf6", bg:"#f5f3ff" },
    { label:"Revenue (Completed)", value:`$${revenue.toLocaleString()}`, sub:`${completed} jobs closed`, icon:DollarSign, color:"#10b981", bg:"#ecfdf5" },
    { label:"Confirmed This Week", value: confirmed,          sub:"Upcoming appointments",        icon:CalendarCheck, color:"#f59e0b", bg:"#fffbeb" },
  ];

  const breakdown = (["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s=>({
    s, count:MOCK_BOOKINGS.filter(b=>b.status===s).length, m:S[s]
  }));

  return (
    <div style={{ padding: "28px 32px", maxWidth: 1200, margin: "0 auto" }}>

      {/* Page heading */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ color:"#0c1a3a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.03em" }}>Dashboard Overview</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0", fontWeight:500 }}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:24 }}>
        {stats.map(({ label, value, sub, icon:Icon, color, bg }) => (
          <div key={label} style={{
            background:"#fff", borderRadius:14, padding:"20px",
            border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon style={{ width:16, height:16, color }} />
              </div>
              <span style={{ display:"flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, color:"#10b981", background:"#ecfdf5", padding:"3px 8px", borderRadius:999 }}>
                <TrendingUp style={{ width:11, height:11 }} /> +12%
              </span>
            </div>
            <p style={{ color:"#0c1a3a", fontSize:26, fontWeight:900, margin:0, letterSpacing:"-0.04em" }}>{value}</p>
            <p style={{ color:"#475569", fontSize:13, fontWeight:600, margin:"4px 0 2px" }}>{label}</p>
            <p style={{ color:"#94a3b8", fontSize:12, margin:0 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Main row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:16 }}>

        {/* Recent Bookings */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f8fafc" }}>
            <div>
              <p style={{ color:"#0c1a3a", fontSize:14, fontWeight:800, margin:0 }}>Recent Bookings</p>
              <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>Latest service requests</p>
            </div>
            <Link href="/admin/bookings" style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:700, color:"#1557b8", textDecoration:"none" }}>
              View all <ArrowRight style={{ width:13, height:13 }} />
            </Link>
          </div>

          {recent.map(b => {
            const m = S[b.status];
            return (
              <div key={b.id} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"12px 20px", borderBottom:"1px solid #f8fafc",
              }}
                className="booking-row"
              >
                <div style={{
                  width:32, height:32, borderRadius:"50%",
                  background:"linear-gradient(135deg,#0c1a3a,#1557b8)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", fontSize:11, fontWeight:900, flexShrink:0
                }}>
                  {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#0c1a3a", fontSize:13, fontWeight:700, margin:0 }}>{b.customerName}</p>
                  <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0" }}>{b.service} · {b.city}</p>
                </div>
                <div style={{ textAlign:"right", marginRight:8 }}>
                  <p style={{ color:"#475569", fontSize:12, fontWeight:600, margin:0 }}>
                    {new Date(b.scheduledDate).toLocaleDateString("en-US",{month:"short",day:"numeric"})}
                  </p>
                  <p style={{ color:"#94a3b8", fontSize:11, margin:"2px 0 0" }}>{b.scheduledTime}</p>
                </div>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${m.bg} ${m.text}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${m.dot}`} />
                  {b.status}
                </span>
                <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                  style={{ width:28, height:28, borderRadius:7, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, textDecoration:"none" }}>
                  <MessageCircle style={{ width:13, height:13, color:"#16a34a" }} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

          {/* Status breakdown */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", padding:20 }}>
            <p style={{ color:"#0c1a3a", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>Booking Status</p>
            {breakdown.map(({ s, count, m }) => {
              const pct = total > 0 ? Math.round((count/total)*100) : 0;
              return (
                <div key={s} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span className={`w-2 h-2 rounded-full ${m.dot}`} />
                      <span style={{ color:"#475569", fontSize:13, fontWeight:600, textTransform:"capitalize" }}>{s}</span>
                    </div>
                    <span style={{ color:"#0c1a3a", fontSize:13, fontWeight:800 }}>{count}</span>
                  </div>
                  <div style={{ height:5, borderRadius:999, background:"#f1f5f9", overflow:"hidden" }}>
                    <div className={m.dot} style={{ height:"100%", borderRadius:999, width:`${pct}%`, transition:"width 0.7s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #f1f5f9", boxShadow:"0 1px 4px rgba(0,0,0,0.04)", padding:20 }}>
            <p style={{ color:"#0c1a3a", fontSize:14, fontWeight:800, margin:"0 0 12px" }}>Quick Actions</p>
            {[
              { href:"/admin/bookings",  label:"Manage Bookings",      icon:ClipboardList, color:"#3b82f6", bg:"#eff6ff" },
              { href:"/admin/customers", label:"Customer CRM",         icon:Users,         color:"#8b5cf6", bg:"#f5f3ff" },
              { href:"/admin/calendar",  label:"Appointment Calendar", icon:CalendarCheck, color:"#10b981", bg:"#ecfdf5" },
            ].map(({ href, label, icon:Icon, color, bg }) => (
              <Link key={href} href={href} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, textDecoration:"none", marginBottom:4, background:"transparent", transition:"background 0.12s" }}
                className="quick-action-link">
                <div style={{ width:28, height:28, borderRadius:8, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon style={{ width:13, height:13, color }} />
                </div>
                <span style={{ flex:1, color:"#0c1a3a", fontSize:13, fontWeight:600 }}>{label}</span>
                <ArrowRight style={{ width:13, height:13, color:"#cbd5e1" }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
