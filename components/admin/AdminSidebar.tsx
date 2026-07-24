"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, CalendarDays, Users, ClipboardList, LogOut, Bug, X, Menu,
} from "lucide-react";

const NAV = [
  { href: "/admin/overview",  label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/bookings",  label: "Bookings",  icon: ClipboardList,  badge: 4 },
  { href: "/admin/customers", label: "Customers", icon: Users           },
  { href: "/admin/calendar",  label: "Calendar",  icon: CalendarDays    },
];

interface Props { isOpen: boolean; onToggle: () => void; }

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();
  const router   = useRouter();

  const logout = () => {
    sessionStorage.removeItem("pestiq_admin_auth");
    router.push("/admin");
  };

  return (
    <div style={{ width: 220, height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Brand */}
      <div style={{
        height: 58, display: "flex", alignItems: "center", gap: 10,
        padding: "0 16px", flexShrink: 0,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9, background: "#FACC15",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          <Bug style={{ width: 15, height: 15, color: "#071b4d" }} />
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontWeight: 900, fontSize: 15, margin: 0, letterSpacing: "-0.025em" }}>PestIQ</p>
          <p style={{ color: "#5878a8", fontWeight: 600, fontSize: 9, margin: 0, textTransform: "uppercase", letterSpacing: "0.14em" }}>Admin Portal</p>
        </div>
        {/* Mobile close */}
        {onClose && (
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "#5878a8", padding: 4 }}>
            <X style={{ width: 16, height: 16 }} />
          </button>
        )}
      </div>

      {/* Nav section */}
      <nav style={{ flex: 1, padding: "14px 8px 0", overflowY: "auto" }}>
        <p style={{
          color: "#3d5580", fontSize: 10, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.16em", padding: "0 10px 8px", margin: 0,
        }}>Management</p>

        {NAV.map(({ href, label, icon: Icon, badge }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link key={href} href={href} onClick={onClose}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 9,
                textDecoration: "none", fontSize: 13.5,
                fontWeight: active ? 700 : 400,
                whiteSpace: "nowrap", marginBottom: 2,
                transition: "background 0.15s",
                background: active ? "rgba(255,255,255,0.1)" : "transparent",
                color: active ? "#fff" : "#8fa8d0",
                borderLeft: `2px solid ${active ? "#FACC15" : "transparent"}`,
              }}
            >
              <Icon style={{ width: 16, height: 16, flexShrink: 0, color: active ? "#FACC15" : "#4a6494" }} />
              <span style={{ flex: 1 }}>{label}</span>
              {badge && (
                <span style={{
                  fontSize: 10, fontWeight: 800, padding: "1px 7px", borderRadius: 999,
                  background: active ? "#FACC15" : "rgba(255,255,255,0.08)",
                  color: active ? "#071b4d" : "#8fa8d0",
                }}>{badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div style={{ padding: "10px 8px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "6px 12px", marginBottom: 4 }}>
          <div style={{
            width: 30, height: 30, borderRadius: "50%",
            background: "rgba(250,204,21,0.12)", border: "1.5px solid rgba(250,204,21,0.3)",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FACC15", fontSize: 11, fontWeight: 900, flexShrink: 0,
          }}>A</div>
          <div style={{ minWidth: 0 }}>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 700, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Administrator</p>
            <p style={{ color: "#4a6494", fontSize: 10, margin: 0 }}>PestIQ Solutions</p>
          </div>
        </div>
        <button onClick={logout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: 9,
            padding: "8px 12px", borderRadius: 9, border: "none",
            background: "transparent", cursor: "pointer",
            color: "#5878a8", fontSize: 13, fontWeight: 500, whiteSpace: "nowrap",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#5878a8"; }}
        >
          <LogOut style={{ width: 14, height: 14, color: "#3d5580", flexShrink: 0 }} />
          Log Out
        </button>
      </div>
    </div>
  );
}

export default function AdminSidebar({ isOpen, onToggle }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger (shows when sidebar is closed on mobile) */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden"
        style={{
          position: "fixed", top: 13, left: 14, zIndex: 60,
          width: 32, height: 32, borderRadius: 8,
          background: "#0f2052", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          color: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        }}
      >
        <Menu style={{ width: 16, height: 16 }} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 50, backdropFilter: "blur(2px)" }}
        />
      )}

      {/* Mobile drawer */}
      <div
        className="lg:hidden"
        style={{
          position: "fixed", top: 0, left: 0, bottom: 0,
          width: 220, background: "#0d1e4a", zIndex: 55,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 0.28s ease",
        }}
      >
        <SidebarContent onClose={() => setMobileOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block"
        style={{
          width: isOpen ? 220 : 0,
          minWidth: isOpen ? 220 : 0,
          overflow: "hidden",
          flexShrink: 0,
          background: "#0d1e4a",
          height: "100vh",
          position: "sticky",
          top: 0,
          transition: "width 0.25s cubic-bezier(0.4,0,0.2,1), min-width 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <SidebarContent />
      </aside>
    </>
  );
}
