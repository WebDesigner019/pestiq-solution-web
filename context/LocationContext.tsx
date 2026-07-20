"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type PriceTier = "nyc" | "westchester" | "newjersey" | "other" | null;

export interface CartItem {
  planId: "essential" | "complete" | "onetime";
  planName: string;
  monthlyPrice: string;
  initialFee: string;
  isSubscription: boolean;
}

interface LocationContextType {
  zipCode: string;
  streetAddress: string;
  serviceArea: string;
  priceTier: PriceTier;
  propertySqFt: number | null;
  cartItem: CartItem | null;
  isAddressModalOpen: boolean;
  setIsAddressModalOpen: (open: boolean) => void;
  setZipCode: (zip: string) => boolean;
  setStreetAddress: (address: string) => void;
  setCartItem: (item: CartItem | null) => void;
  clearLocation: () => void;
  clearCart: () => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const [zipCode, setZipCodeState] = useState<string>("");
  const [streetAddress, setStreetAddressState] = useState<string>("");
  const [serviceArea, setServiceArea] = useState<string>("New York Metro");
  const [priceTier, setPriceTier] = useState<PriceTier>(null);
  const [propertySqFt, setPropertySqFt] = useState<number | null>(null);
  const [cartItem, setCartItemState] = useState<CartItem | null>(null);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState<boolean>(false);

  const calculateSqFt = (addr: string): number => {
    if (!addr) return 2000;
    let hash = 0;
    for (let i = 0; i < addr.length; i++) {
      hash = addr.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Deterministic range of 1,200 to 4,200 sq ft, rounded to nearest 50 sq ft
    const raw = Math.abs(hash % 3001) + 1200;
    return Math.round(raw / 50) * 50;
  };

  const resolveZip = (zip: string): { tier: PriceTier; area: string } => {
    // Try to extract 5-digit zip code if it's a full address
    const zipMatch = zip.trim().match(/\b\d{5}\b/);
    const cleanZip = zipMatch ? zipMatch[0] : zip.trim();
    if (!/^\d{5}$/.test(cleanZip)) {
      // String fallback matching
      const t = zip.toLowerCase();
      if (["manhattan", "brooklyn", "bronx", "queens", "staten island"].some(x => t.includes(x))) {
        return { tier: "nyc", area: "New York City" };
      }
      if (["yonkers", "mount vernon", "new rochelle", "white plains"].some(x => t.includes(x))) {
        return { tier: "westchester", area: "Lower Westchester" };
      }
      if (["lakewood", "brick", "toms river"].some(x => t.includes(x))) {
        return { tier: "newjersey", area: "Ocean County, NJ" };
      }
      return { tier: null, area: "New York Metro" };
    }

    const num = parseInt(cleanZip, 10);

    const isNyc =
      (num >= 10001 && num <= 10282) ||  // Manhattan
      (num >= 10301 && num <= 10314) ||  // Staten Island
      (num >= 10451 && num <= 10475) ||  // Bronx
      (num >= 11101 && num <= 11109) ||  // Queens (LIC/Astoria)
      (num >= 11201 && num <= 11256);    // Brooklyn

    if (isNyc) return { tier: "nyc", area: "New York City" };

    const isWestchester =
      (num >= 10701 && num <= 10710) ||  // Yonkers
      (num >= 10550 && num <= 10553) ||  // Mount Vernon
      (num >= 10801 && num <= 10805) ||  // New Rochelle
      (num >= 10601 && num <= 10610);    // White Plains

    if (isWestchester) return { tier: "westchester", area: "Lower Westchester" };

    const isNewJersey =
      (num >= 8701 && num <= 8702) ||  // Lakewood, NJ
      (num >= 8723 && num <= 8724) ||  // Brick Township, NJ
      (num >= 8753 && num <= 8755);    // Toms River, NJ

    if (isNewJersey) return { tier: "newjersey", area: "Ocean County, NJ" };

    return { tier: "other", area: "Unserviceable Area" };
  };

  const handleSetZipCode = (zip: string): boolean => {
    // Try to extract 5-digit ZIP code from string
    const zipMatch = zip.match(/\b\d{5}\b/);
    const cleanZip = zipMatch ? zipMatch[0] : zip;

    const { tier, area } = resolveZip(cleanZip);
    setZipCodeState(cleanZip);
    setServiceArea(area);
    setPriceTier(tier);
    if (typeof window !== "undefined") {
      localStorage.setItem("pestiq_zip", cleanZip);
    }
    return tier !== "other" && tier !== null;
  };

  const handleSetStreetAddress = (address: string) => {
    setStreetAddressState(address);
    const resolvedSqFt = calculateSqFt(address);
    setPropertySqFt(resolvedSqFt);
    if (typeof window !== "undefined") {
      localStorage.setItem("pestiq_address", address);
      localStorage.setItem("pestiq_sqft", resolvedSqFt.toString());
    }
  };

  const handleSetCartItem = (item: CartItem | null) => {
    setCartItemState(item);
    if (typeof window !== "undefined") {
      if (item) {
        localStorage.setItem("pestiq_cart", JSON.stringify(item));
      } else {
        localStorage.removeItem("pestiq_cart");
      }
    }
  };

  const handleClearLocation = () => {
    setZipCodeState("");
    setStreetAddressState("");
    setServiceArea("New York Metro");
    setPriceTier(null);
    setPropertySqFt(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pestiq_zip");
      localStorage.removeItem("pestiq_address");
      localStorage.removeItem("pestiq_sqft");
    }
  };

  const handleClearCart = () => {
    setCartItemState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("pestiq_cart");
    }
  };

  // Restore from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedZip = localStorage.getItem("pestiq_zip");
      const savedAddress = localStorage.getItem("pestiq_address");
      const savedSqFt = localStorage.getItem("pestiq_sqft");
      const savedCart = localStorage.getItem("pestiq_cart");
      
      if (savedZip) handleSetZipCode(savedZip);
      if (savedAddress) setStreetAddressState(savedAddress);
      if (savedSqFt) setPropertySqFt(parseInt(savedSqFt, 10));
      if (savedCart) {
        try { setCartItemState(JSON.parse(savedCart)); } catch {}
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <LocationContext.Provider
      value={{
        zipCode,
        streetAddress,
        serviceArea,
        priceTier,
        propertySqFt,
        cartItem,
        isAddressModalOpen,
        setIsAddressModalOpen,
        setZipCode: handleSetZipCode,
        setStreetAddress: handleSetStreetAddress,
        setCartItem: handleSetCartItem,
        clearLocation: handleClearLocation,
        clearCart: handleClearCart,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) throw new Error("useLocation must be used within a LocationProvider");
  return context;
}
