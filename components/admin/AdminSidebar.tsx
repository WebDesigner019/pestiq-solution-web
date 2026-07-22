"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  CalendarDays,
  Users,
  ClipboardList,
  LogOut,
  Bug,
} from "lucide-react";

const NAV = [
  { href: "/admin/overview",  label: "Overview",  icon: LayoutDashboard },
  { href: "/admin/bookings",  label: "Bookings",  icon: ClipboardList, badge: 3 },
  { href: "/admin/customers", label: "Customers", icon: Users           },
  { href: "/admin/calendar",  label: "Calendar",  icon: CalendarDays    },
];

interface Props {
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdminSidebar({ isOpen }: Props) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleLogout = () => {
    sessionStorage.removeItem("pestiq_admin_auth");
    router.push("/admin");
  };

  return (
    <aside style={{
      width: isOpen ? 200 : 0,
      minWidth: isOpen ? 200 : 0,
      overflow: "hidden",
      transition: "width 0.25s ease, min-width 0.25s ease",
      flexShrink: 0,
      background: "#0f2052",
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      position: "sticky",
      top: 0,
    }}>
      {/* Inner container — fixed width so content doesn't reflow during animation */}
      <div style={{ width: 200, height: "100%", display: "flex", flexDirection: "column" }}>

        {/* Brand */}
        <div style={{
          height: 56, display: "flex", alignItems: "center", gap: 10,
          padding: "0 16px", flexShrink: 0,
          borderBottom: "1px solid rgba(255,255,255,0.08)"
        }}>
          <div style={{
            width: 28, height: 28, borderRadius: 8,
            background: "#FACC15",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <Bug style={{ width: 14, height: 14, color: "#071b4d" }} />
          </div>
          <div style={{ lineHeight: 1 }}>
            <p style={{ color: "#ffffff", fontWeight: 900, fontSize: 14, margin: 0, letterSpacing: "-0.02em" }}>
              PestIQ
            </p>
            <p style={{ color: "#4e6592", fontWeight: 600, fontSize: 9, margin: 0, textTransform: "uppercase", letterSpacing: "0.15em" }}>
              Solutions
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "16px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
          <p style={{
            color: "#4e6592", fontSize: 9, fontWeight: 800,
            textTransform: "uppercase", letterSpacing: "0.18em",
            padding: "0 10px 10px", margin: 0, whiteSpace: "nowrap",
          }}>
            Management
          </p>

          {NAV.map(({ href, label, icon: Icon, badge }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 8,
                  textDecoration: "none",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  whiteSpace: "nowrap",
                  transition: "background 0.12s",
                  background: active ? "rgba(255,255,255,0.08)" : "transparent",
                  color: active ? "#ffffff" : "#8fa3c8",
                  borderLeft: active ? "2px solid #FACC15" : "2px solid transparent",
                  marginLeft: 0,
                }}
              >
                <Icon style={{
                  width: 15, height: 15, flexShrink: 0,
                  color: active ? "#FACC15" : "#4e6592",
                }} />
                <span style={{ flex: 1 }}>{label}</span>
                {badge && (
                  <span style={{
                    fontSize: 10, fontWeight: 800,
                    padding: "1px 6px", borderRadius: 999,
                    background: active ? "#FACC15" : "rgba(255,255,255,0.1)",
                    color: active ? "#071b4d" : "#8fa3c8",
                    whiteSpace: "nowrap",
                  }}>
                    {badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div style={{ padding: "10px", borderTop: "1px solid rgba(255,255,255,0.07)", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 10px", marginBottom: 2 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#ffffff", fontSize: 11, fontWeight: 900, flexShrink: 0,
            }}>
              A
            </div>
            <div style={{ minWidth: 0 }}>
              <p style={{ color: "#ffffff", fontSize: 12, fontWeight: 700, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Administrator
              </p>
              <p style={{ color: "#4e6592", fontSize: 10, margin: 0, whiteSpace: "nowrap" }}>PestIQ Solutions</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "8px 12px", borderRadius: 8, border: "none",
              background: "transparent", cursor: "pointer",
              color: "#8fa3c8", fontSize: 13, fontWeight: 500,
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8fa3c8"; }}
          >
            <LogOut style={{ width: 14, height: 14, color: "#4e6592", flexShrink: 0 }} />
            Log Out
          </button>
        </div>
      </div>
    </aside>
  );
}
