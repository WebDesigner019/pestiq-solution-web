"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Login page doesn't need auth
    if (pathname === "/admin" || pathname === "/admin/") {
      setChecked(true);
      return;
    }
    const auth = sessionStorage.getItem("pestiq_admin_auth");
    if (auth !== "1") {
      router.replace("/admin");
    } else {
      setChecked(true);
    }
  }, [pathname, router]);

  // On the login page itself, just render children
  if (pathname === "/admin" || pathname === "/admin/") {
    return <>{children}</>;
  }

  if (!checked) {
    return (
      <div className="min-h-screen bg-[#071b4d] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-yellow-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fb]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
