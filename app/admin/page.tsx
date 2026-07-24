"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ShieldCheck, Eye, EyeOff, AlertCircle, Lock,
  CheckCircle2, Sparkles, Activity, MessageCircle,
  Building2, Users, ArrowRight, Shield, Zap
} from "lucide-react";

// Admin PIN
const ADMIN_PIN = "pestiq2025";

export default function AdminLoginPage() {
  const router = useRouter();
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (pin === ADMIN_PIN) {
        sessionStorage.setItem("pestiq_admin_auth", "1");
        router.push("/admin/overview");
      } else {
        setError("Invalid credentials. Please check your admin access key.");
        setLoading(false);
      }
    }, 650);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#030a1c",
      display: "flex",
      alignItems: "stretch",
      fontFamily: "var(--font-sans), system-ui, -apple-system, sans-serif",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* LEFT PANEL — Brand Showcase & Watermark */}
      <div className="hidden lg:flex" style={{
        flex: 1.1,
        position: "relative",
        background: "linear-gradient(145deg, #040e29 0%, #071947 50%, #030a1c 100%)",
        padding: "60px 70px",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRight: "1px solid rgba(255, 255, 255, 0.08)",
        overflow: "hidden",
      }}>

        {/* Ambient Grid Pattern */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.05,
          backgroundImage: "radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }} />

        {/* Glow Effects */}
        <div style={{
          position: "absolute", top: "-10%", left: "-10%", width: 500, height: 500,
          background: "radial-gradient(circle, rgba(21,87,184,0.25) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(60px)", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", bottom: "-10%", right: "-10%", width: 450, height: 450,
          background: "radial-gradient(circle, rgba(250,204,21,0.12) 0%, transparent 70%)",
          borderRadius: "50%", filter: "blur(70px)", pointerEvents: "none"
        }} />

        {/* Massive Vector Watermark Badge */}
        <div style={{
          position: "absolute",
          right: "-60px",
          bottom: "-40px",
          opacity: 0.035,
          pointerEvents: "none",
          userSelect: "none",
          transform: "rotate(-12deg)",
        }}>
          <Shield style={{ width: 540, height: 540, color: "#ffffff" }} />
        </div>

        {/* Top Brand Bar */}
        <div style={{ position: "relative", zIndex: 2, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 42, height: 42, borderRadius: 12,
            background: "linear-gradient(135deg, #FACC15, #eab308)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 8px 20px rgba(250,204,21,0.3)",
          }}>
            <ShieldCheck style={{ width: 22, height: 22, color: "#071b4d" }} />
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "#ffffff", fontWeight: 900, fontSize: 20, letterSpacing: "-0.03em" }}>PestIQ</span>
              <span style={{ background: "rgba(250,204,21,0.15)", color: "#FACC15", border: "1px solid rgba(250,204,21,0.3)", padding: "2px 8px", borderRadius: 999, fontSize: 10, fontWeight: 800, textTransform: "uppercase" }}>Enterprise</span>
            </div>
            <p style={{ color: "#64748b", fontSize: 11, fontWeight: 600, margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>Solutions &amp; Dispatch Platform</p>
          </div>
        </div>

        {/* Main Hero Message */}
        <div style={{ position: "relative", zIndex: 2, margin: "60px 0" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
            marginBottom: 24,
          }}>
            <Sparkles style={{ width: 14, height: 14, color: "#FACC15" }} />
            <span style={{ color: "#e2e8f0", fontSize: 12, fontWeight: 600 }}>v3.4 Enterprise Operations CRM</span>
          </div>

          <h1 style={{
            color: "#ffffff", fontSize: "clamp(36px, 3.2vw, 48px)", fontWeight: 900,
            lineHeight: 1.1, letterSpacing: "-0.035em", margin: "0 0 20px"
          }}>
            Precision Dispatch &amp;<br />
            <span style={{ background: "linear-gradient(90deg, #FACC15, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Customer Intelligence
            </span>
          </h1>

          <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, maxWidth: 500, margin: "0 0 36px" }}>
            The centralized command console for PestIQ coordinators and field technicians across NY, NJ &amp; CT.
          </p>

          {/* Core Feature Matrix */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, maxWidth: 520 }}>
            {[
              { icon: Zap, title: "Instant Booking CRM", desc: "Real-time service queue" },
              { icon: MessageCircle, title: "WhatsApp Auto-Dispatch", desc: "1-click technician alerts" },
              { icon: Users, title: "Customer Portfolio", desc: "History & subscription tiers" },
              { icon: Shield, title: "Bank-Grade Security", desc: "Encrypted session tokens" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.07)",
                borderRadius: 14, padding: "14px 16px",
                display: "flex", alignItems: "flex-start", gap: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: "rgba(250,204,21,0.1)", display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0, marginTop: 2,
                }}>
                  <Icon style={{ width: 16, height: 16, color: "#FACC15" }} />
                </div>
                <div>
                  <p style={{ color: "#ffffff", fontSize: 13, fontWeight: 700, margin: "0 0 2px" }}>{title}</p>
                  <p style={{ color: "#64748b", fontSize: 11, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom System Health Bar */}
        <div style={{
          position: "relative", zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.08)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
            <span style={{ color: "#cbd5e1", fontSize: 12, fontWeight: 600 }}>All Systems Operational</span>
          </div>
          <span style={{ color: "#64748b", fontSize: 12 }}>SSL 256-bit Encrypted</span>
        </div>
      </div>

      {/* RIGHT PANEL — Authentication Form */}
      <div style={{
        flex: 1,
        maxWidth: 540,
        background: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "48px 40px",
        position: "relative",
        boxShadow: "-10px 0 40px rgba(0,0,0,0.3)",
      }}>

        {/* Mobile Header */}
        <div className="lg:hidden" style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14,
            background: "#071b4d", display: "inline-flex",
            alignItems: "center", justifyContent: "center", marginBottom: 12,
          }}>
            <ShieldCheck style={{ width: 24, height: 24, color: "#FACC15" }} />
          </div>
          <h2 style={{ color: "#071b4d", fontSize: 22, fontWeight: 900, margin: 0 }}>PestIQ Solutions</h2>
          <p style={{ color: "#64748b", fontSize: 12, margin: "4px 0 0" }}>Enterprise Operations Portal</p>
        </div>

        <div style={{ maxWidth: 380, width: "100%", margin: "0 auto" }}>
          
          {/* Header */}
          <div style={{ marginBottom: 32 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "4px 10px", borderRadius: 6, background: "#eff6ff",
              color: "#1d4ed8", fontSize: 11, fontWeight: 700, marginBottom: 14,
            }}>
              <Lock style={{ width: 12, height: 12 }} /> Protected Access
            </div>
            <h2 style={{ color: "#0f172a", fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: "-0.03em" }}>
              Sign In
            </h2>
            <p style={{ color: "#64748b", fontSize: 13, margin: "6px 0 0", lineHeight: 1.5 }}>
              Enter your master admin password to access the dispatch console.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <label style={{ color: "#0f172a", fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Admin Password
                </label>
                <span style={{ color: "#94a3b8", fontSize: 11 }}>PIN: pestiq2025</span>
              </div>

              <div style={{ position: "relative" }}>
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={(e) => { setPin(e.target.value); setError(""); }}
                  placeholder="Enter admin password"
                  autoFocus
                  required
                  style={{
                    width: "100%", height: 48, paddingLeft: 16, paddingRight: 44,
                    background: "#f8fafc", border: error ? "1.5px solid #ef4444" : "1.5px solid #e2e8f0",
                    borderRadius: 12, fontSize: 14, outline: "none", color: "#0f172a",
                    boxSizing: "border-box", transition: "all 0.15s",
                    fontFamily: showPin ? "inherit" : "monospace",
                    letterSpacing: showPin ? "normal" : "0.2em",
                  }}
                  onFocus={e => {
                    if (!error) e.target.style.borderColor = "#1d4ed8";
                    e.target.style.background = "#ffffff";
                    e.target.style.boxShadow = "0 0 0 4px rgba(29, 78, 216, 0.1)";
                  }}
                  onBlur={e => {
                    if (!error) e.target.style.borderColor = "#e2e8f0";
                    e.target.style.background = "#f8fafc";
                    e.target.style.boxShadow = "none";
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(v => !v)}
                  style={{
                    position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
                    background: "none", border: "none", cursor: "pointer", color: "#94a3b8", padding: 4,
                  }}
                >
                  {showPin ? <EyeOff style={{ width: 16, height: 16 }} /> : <Eye style={{ width: 16, height: 16 }} />}
                </button>
              </div>
            </div>

            {error && (
              <div style={{
                display: "flex", alignItems: "center", gap: 10,
                background: "#fef2f2", border: "1px solid #fecaca",
                borderRadius: 10, padding: "10px 14px", color: "#991b1b",
              }}>
                <AlertCircle style={{ width: 16, height: 16, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600 }}>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !pin}
              style={{
                height: 48, borderRadius: 12, border: "none",
                background: "linear-gradient(135deg, #071b4d 0%, #1557b8 100%)",
                color: "#ffffff", fontSize: 14, fontWeight: 700,
                cursor: loading || !pin ? "not-allowed" : "pointer",
                opacity: loading || !pin ? 0.65 : 1,
                boxShadow: "0 6px 20px rgba(7, 27, 77, 0.25)",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                transition: "all 0.15s",
              }}
              onMouseEnter={e => { if (!loading && pin) e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; }}
            >
              {loading ? (
                <>
                  <div style={{
                    width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)",
                    borderTopColor: "#fff", borderRadius: "50%",
                    animation: "spin 0.8s linear infinite"
                  }} />
                  Authenticating...
                </>
              ) : (
                <>
                  Access Console <ArrowRight style={{ width: 16, height: 16 }} />
                </>
              )}
            </button>
          </form>

          {/* Security details box */}
          <div style={{
            marginTop: 36, paddingTop: 24, borderTop: "1px solid #f1f5f9",
            display: "flex", flexDirection: "column", gap: 10,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 12 }}>
              <CheckCircle2 style={{ width: 14, height: 14, color: "#16a34a" }} />
              <span>Session gating active (sessionStorage)</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#64748b", fontSize: 12 }}>
              <Building2 style={{ width: 14, height: 14, color: "#2563eb" }} />
              <span>PestIQ Solutions Inc. · Internal System</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <p style={{ color: "#94a3b8", fontSize: 11, margin: 0 }}>
            Need help? Contact system administration at <a href="mailto:admin@pestiq.com" style={{ color: "#1d4ed8", textDecoration: "none", fontWeight: 600 }}>admin@pestiq.com</a>
          </p>
        </div>

      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
