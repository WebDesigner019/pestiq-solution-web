"use client";

import React from "react";
import Link from "next/link";
import {
  ClipboardList, Users, CalendarCheck, DollarSign,
  ArrowRight, MessageCircle, TrendingUp, TrendingDown,
} from "lucide-react";
import { MOCK_BOOKINGS, MOCK_CUSTOMERS, type BookingStatus } from "@/lib/adminMockData";

const STATUS: Record<BookingStatus, { dot: string; text: string; bg: string }> = {
  pending:   { dot: "#f59e0b", text: "#92400e", bg: "#fffbeb" },
  confirmed: { dot: "#3b82f6", text: "#1e40af", bg: "#eff6ff" },
  completed: { dot: "#10b981", text: "#065f46", bg: "#ecfdf5" },
  cancelled: { dot: "#ef4444", text: "#991b1b", bg: "#fef2f2" },
};

function buildWA(b: (typeof MOCK_BOOKINGS)[0]) {
  const msg = `🛡️ *PestIQ — Service Assignment*\n\n*Booking:* ${b.id}\n*Customer:* ${b.customerName}\n*Phone:* ${b.phone}\n*Address:* ${b.address}, ${b.city}, ${b.state} ${b.zip}\n*Service:* ${b.service} (${b.plan})\n*Date:* ${new Date(b.scheduledDate).toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}\n*Time:* ${b.scheduledTime}\n*Notes:* ${b.notes||"None"}\n\nPlease confirm. — PestIQ Admin`;
  return `https://wa.me/?text=${encodeURIComponent(msg)}`;
}

const GRADS = [
  "#1d4ed8,#3b82f6","#7c3aed,#a78bfa","#059669,#34d399",
  "#dc2626,#f87171","#d97706,#fbbf24","#0284c7,#38bdf8",
];

export default function AdminOverviewPage() {
  const pending   = MOCK_BOOKINGS.filter(b => b.status === "pending").length;
  const confirmed = MOCK_BOOKINGS.filter(b => b.status === "confirmed").length;
  const completed = MOCK_BOOKINGS.filter(b => b.status === "completed").length;
  const revenue   = MOCK_BOOKINGS.filter(b => b.status === "completed").reduce((s,b)=>s+b.price,0);
  const recent    = [...MOCK_BOOKINGS].sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime()).slice(0,5);
  const total     = MOCK_BOOKINGS.length;

  const stats = [
    { label:"Total Bookings",      value:total,                         sub:`${pending} pending review`, icon:ClipboardList, color:"#3b82f6", bg:"#eff6ff", trend:"+12% vs last mo", up:true },
    { label:"Active Customers",    value:MOCK_CUSTOMERS.length,        sub:"All time records",          icon:Users,         color:"#8b5cf6", bg:"#f5f3ff", trend:"+18% growth",      up:true },
    { label:"Revenue Collected",   value:`$${revenue.toLocaleString()}`, sub:`${completed} jobs completed`,    icon:DollarSign,    color:"#10b981", bg:"#ecfdf5", trend:"+24% vs target",   up:true },
    { label:"Confirmed This Week", value:confirmed,                    sub:"Upcoming appointments",     icon:CalendarCheck, color:"#f59e0b", bg:"#fffbeb", trend:`${confirmed} scheduled`,   up:confirmed>0 },
  ];

  const breakdown = (["pending","confirmed","completed","cancelled"] as BookingStatus[]).map(s => ({
    s, count:MOCK_BOOKINGS.filter(b=>b.status===s).length, m:STATUS[s]
  }));

  return (
    <div style={{ padding:"24px 28px", maxWidth:1280, margin:"0 auto" }}>
      <div style={{ marginBottom:22 }}>
        <h1 style={{ color:"#0d1e4a", fontSize:20, fontWeight:900, margin:0, letterSpacing:"-0.025em" }}>Dashboard Overview</h1>
        <p style={{ color:"#94a3b8", fontSize:13, margin:"4px 0 0" }}>
          {new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric",year:"numeric"})}
        </p>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:14, marginBottom:20 }}>
        {stats.map(({ label, value, sub, icon:Icon, color, bg, trend, up }) => (
          <div key={label} style={{
            background:"#fff", borderRadius:14, padding:"18px 20px",
            border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)",
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
              <div style={{ width:36, height:36, borderRadius:10, background:bg, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon style={{ width:16, height:16, color }} />
              </div>
              <span style={{
                display:"flex", alignItems:"center", gap:3,
                fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999,
                background: up ? "#ecfdf5" : "#f8fafc",
                color: up ? "#065f46" : "#64748b",
              }}>
                {up ? <TrendingUp style={{width:10,height:10}}/> : <TrendingDown style={{width:10,height:10}}/>}
                {trend}
              </span>
            </div>
            <p style={{ color:"#0d1e4a", fontSize:26, fontWeight:900, margin:0, letterSpacing:"-0.04em" }}>{value}</p>
            <p style={{ color:"#374151", fontSize:13, fontWeight:600, margin:"4px 0 2px" }}>{label}</p>
            <p style={{ color:"#94a3b8", fontSize:12, margin:0 }}>{sub}</p>
          </div>
        ))}
      </div>

      {/* Main row */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:16, alignItems:"start" }}>

        {/* Recent bookings */}
        <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", overflow:"hidden" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderBottom:"1px solid #f8fafc" }}>
            <div>
              <p style={{ color:"#0d1e4a", fontSize:14, fontWeight:800, margin:0 }}>Recent Bookings</p>
              <p style={{ color:"#94a3b8", fontSize:12, margin:"3px 0 0" }}>Latest service requests</p>
            </div>
            <Link href="/admin/bookings" style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, fontWeight:700, color:"#1557b8", textDecoration:"none" }}>
              View all <ArrowRight style={{width:13,height:13}}/>
            </Link>
          </div>
          {recent.map((b,i) => {
            const m = STATUS[b.status];
            const grad = GRADS[i % GRADS.length];
            return (
              <div key={b.id} style={{
                display:"flex", alignItems:"center", gap:12,
                padding:"12px 20px", borderBottom:"1px solid #f8fafc",
              }}>
                <div style={{
                  width:32, height:32, borderRadius:"50%", flexShrink:0,
                  background:`linear-gradient(135deg,${grad})`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  color:"#fff", fontSize:11, fontWeight:900,
                }}>
                  {b.customerName.split(" ").map(n=>n[0]).join("").slice(0,2)}
                </div>
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ color:"#0d1e4a", fontSize:13, fontWeight:700, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.customerName}</p>
                  <p style={{ color:"#94a3b8", fontSize:12, margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.service} · {b.city}</p>
                </div>
                <span style={{
                  fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:999,
                  background:m.bg, color:m.text, whiteSpace:"nowrap",
                }}>{b.status}</span>
                <a href={buildWA(b)} target="_blank" rel="noopener noreferrer"
                  style={{ width:28, height:28, borderRadius:8, background:"#f0fdf4", display:"flex", alignItems:"center", justifyContent:"center", textDecoration:"none", flexShrink:0 }}>
                  <MessageCircle style={{width:13,height:13,color:"#16a34a"}}/>
                </a>
              </div>
            );
          })}
        </div>

        {/* Right column */}
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

          {/* Status bars */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", padding:"18px 20px" }}>
            <p style={{ color:"#0d1e4a", fontSize:14, fontWeight:800, margin:"0 0 16px" }}>Status Breakdown</p>
            {breakdown.map(({ s, count, m }) => {
              const pct = total > 0 ? Math.round((count/total)*100) : 0;
              return (
                <div key={s} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <span style={{ width:8, height:8, borderRadius:"50%", background:m.dot, display:"inline-block" }} />
                      <span style={{ color:"#374151", fontSize:13, fontWeight:600, textTransform:"capitalize" }}>{s}</span>
                    </div>
                    <span style={{ color:"#0d1e4a", fontSize:13, fontWeight:800 }}>{count}</span>
                  </div>
                  <div style={{ height:5, borderRadius:999, background:"#f1f5f9" }}>
                    <div style={{ height:"100%", borderRadius:999, background:m.dot, width:`${pct}%`, transition:"width 0.7s" }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick actions */}
          <div style={{ background:"#fff", borderRadius:14, border:"1px solid #edf0f7", boxShadow:"0 1px 3px rgba(15,30,74,0.05)", padding:"18px 20px" }}>
            <p style={{ color:"#0d1e4a", fontSize:14, fontWeight:800, margin:"0 0 10px" }}>Quick Actions</p>
            {[
              { href:"/admin/bookings",  label:"Manage Bookings",      icon:ClipboardList, color:"#3b82f6", bg:"#eff6ff" },
              { href:"/admin/customers", label:"Customer CRM",         icon:Users,         color:"#8b5cf6", bg:"#f5f3ff" },
              { href:"/admin/calendar",  label:"Appointment Calendar", icon:CalendarCheck, color:"#10b981", bg:"#ecfdf5" },
            ].map(({ href, label, icon:Icon, color, bg }) => (
              <Link key={href} href={href}
                style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 10px", borderRadius:9, textDecoration:"none", marginBottom:4 }}
                onMouseEnter={e => (e.currentTarget.style.background="#f8fafc")}
                onMouseLeave={e => (e.currentTarget.style.background="transparent")}
              >
                <div style={{ width:28, height:28, borderRadius:8, background:bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon style={{width:13,height:13,color}}/>
                </div>
                <span style={{ flex:1, color:"#0d1e4a", fontSize:13, fontWeight:600 }}>{label}</span>
                <ArrowRight style={{width:13,height:13,color:"#d1d5db"}}/>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
