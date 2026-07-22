"use client";

import React, { useState } from "react";
import { useLocation } from "@/context/LocationContext";
import { AddressAutocomplete } from "@/components/AddressAutocomplete";
import { MapPin, X } from "lucide-react";

interface AddressModalProps {
  onClose: () => void;
}

export default function AddressModal({ onClose }: AddressModalProps) {
  const { submitAddressSearch } = useLocation();
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualStreet, setManualStreet] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [manualZip, setManualZip] = useState("");
  const [manualState, setManualState] = useState("NY");

  const handleSelect = (addr: string) => {
    const isSupported = submitAddressSearch(addr);
    if (isSupported) {
      onClose();
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullAddress = `${manualStreet}, ${manualCity}, ${manualState} ${manualZip}`;
    const isSupported = submitAddressSearch(fullAddress);
    if (isSupported) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030e2be6] backdrop-blur-md animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-gray-300 text-3xl font-light outline-none"
        aria-label="Close modal"
      >
        <X className="w-7 h-7" />
      </button>

      <div className="w-full max-w-xl bg-[#0a2540] border border-white/20 text-center p-8 rounded-2xl shadow-2xl text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-[#ffc400] border border-white/20 mb-1">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Check Service & Pricing
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-md">
            Enter your residential address or zip code to instantly view local plan rates and service availability.
          </p>

          {!isManualMode ? (
            <div className="w-full mt-4">
              <AddressAutocomplete
                placeholder="Enter street address, city, or zip code..."
                buttonText="View Plans ›"
                onSelect={handleSelect}
                inputClassName="py-4 text-base"
                buttonClassName="py-4 px-8"
              />

              <button
                type="button"
                onClick={() => setIsManualMode(true)}
                className="text-gray-400 hover:text-white text-xs font-semibold transition-colors mt-6 block mx-auto underline underline-offset-4"
              >
                Can&apos;t find your address? Enter details manually.
              </button>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="w-full flex flex-col gap-3 mt-4 text-left">
              <div>
                <label className="text-gray-300 text-xs font-bold mb-1 block uppercase tracking-wider">Street Address</label>
                <input
                  type="text"
                  placeholder="e.g. 100 Broadway"
                  value={manualStreet}
                  onChange={(e) => setManualStreet(e.target.value)}
                  className="w-full px-4 py-3 bg-white text-gray-900 text-sm font-medium border-0 rounded-xl outline-none focus:ring-2 focus:ring-[#ffc400]"
                  required
                  autoFocus
                />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-1">
                  <label className="text-gray-300 text-xs font-bold mb-1 block uppercase tracking-wider">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-900 text-sm font-medium border-0 rounded-xl outline-none focus:ring-2 focus:ring-[#ffc400]"
                    required
                  />
                </div>
                <div className="col-span-1">
                  <label className="text-gray-300 text-xs font-bold mb-1 block uppercase tracking-wider">State</label>
                  <select
                    value={manualState}
                    onChange={(e) => setManualState(e.target.value)}
                    className="w-full px-3 py-3 bg-white text-gray-900 text-sm font-medium border-0 rounded-xl outline-none focus:ring-2 focus:ring-[#ffc400] appearance-none"
                    required
                  >
                    <option value="NY">NY</option>
                    <option value="NJ">NJ</option>
                    <option value="CT">CT</option>
                    <option value="PA">PA</option>
                    <option value="MA">MA</option>
                    <option value="FL">FL</option>
                  </select>
                </div>
                <div className="col-span-1">
                  <label className="text-gray-300 text-xs font-bold mb-1 block uppercase tracking-wider">ZIP</label>
                  <input
                    type="text"
                    placeholder="ZIP"
                    value={manualZip}
                    onChange={(e) => setManualZip(e.target.value)}
                    className="w-full px-4 py-3 bg-white text-gray-900 text-sm font-medium border-0 rounded-xl outline-none focus:ring-2 focus:ring-[#ffc400]"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-2">
                <button
                  type="button"
                  onClick={() => setIsManualMode(false)}
                  className="text-xs text-gray-400 hover:text-white font-bold transition-colors"
                >
                  ← Back to search
                </button>
                <button
                  type="submit"
                  className="bg-[#ffc400] hover:bg-[#e6b000] text-[#071b4d] font-extrabold text-xs uppercase tracking-wider px-6 py-3 rounded-xl shadow-md transition-all"
                >
                  Calculate Rate ›
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
