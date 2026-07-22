"use client";

import React from "react";
import { Bug, Bell, ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  sidebarOpen: boolean;
  onToggle: () => void;
}

export default function AdminTopBar({ sidebarOpen, onToggle }: Props) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });

  return (
    <header style={{
      height: 56,
      background: "#ffffff",
      borderBottom: "1px solid #e2e8f0",
      display: "flex",
      alignItems: "center",
      padding: "0 24px 0 0",
      gap: 0,
      flexShrink: 0,
      zIndex: 10,
    }}>
      {/* Sidebar toggle */}
      <button
        onClick={onToggle}
        title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
        style={{
          width: 56,
          height: 56,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          background: "none",
          cursor: "pointer",
          color: "#64748b",
          borderRight: "1px solid #f1f5f9",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#f8fafc")}
        onMouseLeave={e => (e.currentTarget.style.background = "none")}
      >
        {sidebarOpen
          ? <ChevronLeft style={{ width: 16, height: 16 }} />
          : <ChevronRight style={{ width: 16, height: 16 }} />
        }
      </button>

      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 20px", borderRight: "1px solid #f1f5f9" }}>
        <div style={{
          width: 28, height: 28, borderRadius: 8,
          background: "#071b4d",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
        }}>
          <Bug style={{ width: 14, height: 14, color: "#FACC15" }} />
        </div>
        <div style={{ lineHeight: 1 }}>
          <span style={{ color: "#071b4d", fontWeight: 900, fontSize: 14, letterSpacing: "-0.03em", display: "block" }}>
            PestIQ
          </span>
          <span style={{ color: "#94a3b8", fontWeight: 600, fontSize: 9, textTransform: "uppercase", letterSpacing: "0.12em", display: "block" }}>
            Admin Portal
          </span>
        </div>
      </div>

      {/* Date */}
      <span style={{
        color: "#94a3b8", fontSize: 12, fontWeight: 500,
        padding: "0 20px", display: "none",
      }}
        className="admin-date"
      >
        {dateStr}
      </span>

      <div style={{ flex: 1 }} />

      {/* Right side */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {/* Notification */}
        <button style={{
          width: 34, height: 34, borderRadius: 8,
          background: "none", border: "1px solid #e2e8f0",
          display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", position: "relative",
          color: "#64748b",
        }}>
          <Bell style={{ width: 14, height: 14 }} />
          <span style={{
            position: "absolute", top: 7, right: 7,
            width: 6, height: 6, borderRadius: "50%",
            background: "#FACC15", border: "1.5px solid #fff"
          }} />
        </button>

        {/* Admin avatar */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "4px 10px 4px 4px",
          borderRadius: 8, border: "1px solid #e2e8f0",
          cursor: "default",
        }}>
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: "#071b4d",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#FACC15", fontSize: 11, fontWeight: 900,
          }}>
            A
          </div>
          <div style={{ lineHeight: 1 }}>
            <p style={{ color: "#0f172a", fontSize: 12, fontWeight: 700, margin: 0 }}>Admin</p>
            <p style={{ color: "#94a3b8", fontSize: 10, margin: 0 }}>pestiq</p>
          </div>
        </div>
      </div>
    </header>
  );
}
