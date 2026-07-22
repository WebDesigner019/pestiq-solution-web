"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  LogOut,
  Menu,
  X,
  Bug,
  Bell,
} from "lucide-react";

const NAV = [
  { href: "/admin/overview",  label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/bookings",  label: "Bookings",  icon: ClipboardList,  badge: 3 },
  { href: "/admin/customers", label: "Customers", icon: Users           },
  { href: "/admin/calendar",  label: "Calendar",  icon: CalendarDays    },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router   = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("pestiq_admin_auth");
    router.push("/admin");
  };

  const Content = () => (
    <div className="flex flex-col h-full">

      {/* ── Brand ── */}
      <div
        style={{ padding: "20px 16px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", gap: "10px" }}
      >
        <div style={{
          width: 34, height: 34, borderRadius: 10,
          backgroundColor: "#FACC15",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0
        }}>
          <Bug style={{ width: 16, height: 16, color: "#071b4d" }} />
        </div>
        <div>
          <p style={{ color: "#FFFFFF", fontWeight: 900, fontSize: 15, margin: 0, letterSpacing: "-0.02em" }}>PestIQ</p>
          <p style={{ color: "#94a3b8", fontWeight: 600, fontSize: 9, margin: 0, textTransform: "uppercase", letterSpacing: "0.15em" }}>Admin Portal</p>
        </div>
        <div style={{ marginLeft: "auto", position: "relative" }}>
          <Bell style={{ width: 15, height: 15, color: "#94a3b8" }} />
          <span style={{
            position: "absolute", top: -2, right: -2,
            width: 7, height: 7, borderRadius: "50%", backgroundColor: "#FACC15"
          }} />
        </div>
      </div>

      {/* ── Nav ── */}
      <nav style={{ flex: 1, padding: "12px 10px", display: "flex", flexDirection: "column", gap: 2 }}>
        <p style={{
          color: "#64748b", fontSize: 9, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.18em",
          padding: "4px 10px 8px", margin: 0
        }}>
          Management
        </p>

        {NAV.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 12px",
                borderRadius: 10,
                textDecoration: "none",
                fontSize: 13,
                fontWeight: 600,
                position: "relative",
                transition: "all 0.15s",
                backgroundColor: active ? "#1e3a6e" : "transparent",
                color: active ? "#FFFFFF" : "#cbd5e1",
                borderLeft: active ? "3px solid #FACC15" : "3px solid transparent",
              }}
            >
              <Icon style={{
                width: 16, height: 16, flexShrink: 0,
                color: active ? "#FACC15" : "#64748b"
              }} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  fontSize: 10, fontWeight: 800,
                  padding: "1px 6px", borderRadius: 999,
                  backgroundColor: active ? "#FACC15" : "#1e293b",
                  color: active ? "#071b4d" : "#94a3b8",
                }}>
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ── Bottom: user + logout ── */}
      <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        {/* User row */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px" }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            backgroundColor: "#1e3a6e",
            border: "1px solid #334155",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FFFFFF", fontSize: 11, fontWeight: 900, flexShrink: 0
          }}>
            A
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 700, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              Administrator
            </p>
            <p style={{ color: "#64748b", fontSize: 10, margin: 0 }}>PestIQ Solutions</p>
          </div>
        </div>

        {/* Log out */}
        <button
          onClick={handleLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 10,
            padding: "9px 12px", borderRadius: 10, border: "none",
            backgroundColor: "transparent", cursor: "pointer",
            color: "#94a3b8", fontSize: 13, fontWeight: 600,
            transition: "all 0.15s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1e293b";
            (e.currentTarget as HTMLButtonElement).style.color = "#FFFFFF";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
            (e.currentTarget as HTMLButtonElement).style.color = "#94a3b8";
          }}
        >
          <LogOut style={{ width: 15, height: 15, color: "#64748b", flexShrink: 0 }} />
          Log Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          display: "flex", position: "fixed", top: 14, left: 14, zIndex: 50,
          width: 36, height: 36, borderRadius: 8,
          backgroundColor: "#071b4d", border: "none", cursor: "pointer",
          alignItems: "center", justifyContent: "center", color: "#FFFFFF",
          boxShadow: "0 2px 8px rgba(0,0,0,0.3)"
        }}
        className="lg:hidden"
      >
        <Menu style={{ width: 16, height: 16 }} />
      </button>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          style={{ position: "fixed", inset: 0, zIndex: 40, backgroundColor: "rgba(0,0,0,0.6)", backdropFilter: "blur(2px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 50, width: 210,
          backgroundColor: "#0f2052",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <button
          onClick={() => setMobileOpen(false)}
          style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", cursor: "pointer", color: "#94a3b8" }}
        >
          <X style={{ width: 16, height: 16 }} />
        </button>
        <Content />
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:flex"
        style={{
          flexDirection: "column",
          width: 210,
          backgroundColor: "#0f2052",
          flexShrink: 0,
          height: "100vh",
          position: "sticky",
          top: 0,
        }}
      >
        <Content />
      </aside>
    </>
  );
}
