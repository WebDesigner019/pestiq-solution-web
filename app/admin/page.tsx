"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Eye, EyeOff, AlertCircle } from "lucide-react";

// Admin PIN — change this to your preferred password
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

    // Simulate a brief auth delay for UX
    setTimeout(() => {
      if (pin === ADMIN_PIN) {
        sessionStorage.setItem("pestiq_admin_auth", "1");
        router.push("/admin/overview");
      } else {
        setError("Incorrect password. Access denied.");
        setLoading(false);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#030e2b] via-[#071b4d] to-[#0b2a66] flex items-center justify-center p-4">
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Top accent bar */}
          <div className="h-1.5 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400" />

          <div className="p-8">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#071b4d] shadow-lg mb-4">
                <ShieldCheck className="w-8 h-8 text-yellow-400" />
              </div>
              <h1 className="text-[#071b4d] text-2xl font-black tracking-tight">Admin Portal</h1>
              <p className="text-slate-500 text-sm mt-1">PestIQ Solutions — Restricted Access</p>
            </div>

            {/* Security badge */}
            <div className="flex items-center gap-2.5 bg-slate-50 rounded-xl p-3 mb-6 border border-slate-100">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse flex-shrink-0" />
              <p className="text-slate-600 text-xs">Secure session — expires on browser close</p>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-[#071b4d] text-xs font-bold mb-1.5">Admin Password</label>
                <div className="relative">
                  <input
                    type={showPin ? "text" : "password"}
                    value={pin}
                    onChange={(e) => { setPin(e.target.value); setError(""); }}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="w-full h-12 px-4 pr-11 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#1557b8] focus:ring-2 focus:ring-[#1557b8]/15 transition-all bg-slate-50 focus:bg-white"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPin(v => !v)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPin ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs font-medium">{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !pin}
                className="w-full h-12 bg-[#071b4d] hover:bg-[#0b2a66] disabled:opacity-60 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#071b4d]/30"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying…
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Access Dashboard
                  </>
                )}
              </button>
            </form>

            <p className="text-center text-slate-400 text-[11px] mt-6">
              Authorized personnel only · Unauthorized access is prohibited
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-blue-300/50 text-[11px] mt-4">
          © {new Date().getFullYear()} PestIQ Solutions
        </p>
      </div>
    </div>
  );
}
