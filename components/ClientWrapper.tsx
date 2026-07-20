"use client";

import React from "react";
import { LocationProvider, useLocation } from "@/context/LocationContext";
import AddressModal from "@/components/AddressModal";

function GlobalModalWrapper() {
  const { isAddressModalOpen, setIsAddressModalOpen } = useLocation();
  if (!isAddressModalOpen) return null;
  return <AddressModal onClose={() => setIsAddressModalOpen(false)} />;
}

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <LocationProvider>
      {children}
      <GlobalModalWrapper />
    </LocationProvider>
  );
}
