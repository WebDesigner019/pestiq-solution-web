"use client";

import React, { useState, useEffect } from "react";
import { useLocation } from "@/context/LocationContext";
import { MapPin } from "lucide-react";

interface AddressModalProps {
  onClose: () => void;
}

const MOCK_SUGGESTIONS = [
  "1150 Marcela Ct, Lakewood, NJ 08701",
  "120 Broadway, New York, NY 10271",
  "500 Elm St, Yonkers, NY 10701",
  "15724 W New Ct, Wasilla, AK 99623",
  "123 Main St, Brooklyn, NY 11201",
  "456 Park Ave, New York, NY 10022",
  "789 Broadway, Bayonne, NJ 07002",
  "321 Broad St, Newark, NJ 07102",
  "100 Ocean Ave, Point Pleasant, NJ 08742",
  "55 Central Park West, New York, NY 10023",
  "200 Westchester Ave, White Plains, NY 10604"
];

export default function AddressModal({ onClose }: AddressModalProps) {
  const { setZipCode, setStreetAddress, clearLocation } = useLocation();
  const [addressInput, setAddressInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [modalState, setModalState] = useState<"input" | "loading" | "unserviceable">("input");
  const [isManualMode, setIsManualMode] = useState(false);
  const [manualStreet, setManualStreet] = useState("");
  const [manualCity, setManualCity] = useState("");
  const [manualZip, setManualZip] = useState("");
  const [manualState, setManualState] = useState("NY");
  const [loadingText, setLoadingText] = useState("Connecting to Property Assessor API...");
  const [loadingSubtext, setLoadingSubtext] = useState("Querying parcel registry...");

  const filteredSuggestions = MOCK_SUGGESTIONS.filter(s => 
    s.toLowerCase().includes(addressInput.toLowerCase())
  );

  // Handle address check submission
  const handleSubmit = (address: string) => {
    setAddressInput(address);
    setModalState("loading");

    // Phase 1: Connect to Assessor API
    setLoadingText("Connecting to Property Assessor API...");
    setLoadingSubtext("Querying regional parcel registry database...");

    setTimeout(() => {
      // Phase 2: Retrieve parcel size
      setLoadingText("Retrieving parcel records...");
      setLoadingSubtext("Calculating building square footage area...");

      setTimeout(() => {
        // Resolve address ZIP code
        const zipMatch = address.match(/\b\d{5}\b/);
        const zip = zipMatch ? zipMatch[0] : "";
        
        let hasService = false;
        if (zip) {
          const num = parseInt(zip, 10);
          const isNyc =
            (num >= 10001 && num <= 10282) ||
            (num >= 10301 && num <= 10314) ||
            (num >= 10451 && num <= 10475) ||
            (num >= 11101 && num <= 11109) ||
            (num >= 11201 && num <= 11256);
          const isWestchester =
            (num >= 10701 && num <= 10710) ||
            (num >= 10550 && num <= 10553) ||
            (num >= 10801 && num <= 10805) ||
            (num >= 10601 && num <= 10610);
          const isNewJersey =
            (num >= 8701 && num <= 8702) ||
            (num >= 8723 && num <= 8724) ||
            (num >= 8753 && num <= 8755);

          if (isNyc || isWestchester || isNewJersey) {
            hasService = true;
          }
        } else {
          // Check string fallback
          const t = address.toLowerCase();
          if (
            ["manhattan", "brooklyn", "bronx", "queens", "staten island", "yonkers", "mount vernon", "new rochelle", "white plains", "lakewood", "brick", "toms river"].some(
              (area) => t.includes(area)
            )
          ) {
            hasService = true;
          }
        }

        if (hasService) {
          // Success: Set in location context and close
          setZipCode(address);
          setStreetAddress(address);
          onClose();
        } else {
          // Unserviceable error state
          setModalState("unserviceable");
        }
      }, 1000);
    }, 1000);
  };

  const handleManualReview = () => {
    // Navigate to booking page with unserviced flags
    setZipCode(addressInput);
    setStreetAddress(addressInput);
    onClose();
    window.location.href = `/book?area=other&address=${encodeURIComponent(addressInput)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#030e2be6] backdrop-blur-sm animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white hover:text-zinc-300 text-[28px] font-light outline-none"
        aria-label="Close modal"
      >
        ×
      </button>

      <div className="w-full max-w-2xl bg-transparent text-center p-6 rounded-lg text-white">
        {modalState === "loading" && (
          <div className="flex flex-col items-center justify-center py-12 gap-6 text-center">
            <div className="w-16 h-16 border-4 border-[#ffc400]/20 border-t-[#ffc400] rounded-full animate-spin"></div>
            <div className="flex flex-col gap-1.5">
              <h3 className="text-[22px] font-extrabold tracking-tight">{loadingText}</h3>
              <p className="text-zinc-400 text-[14px]">{loadingSubtext}</p>
            </div>
          </div>
        )}

        {modalState === "input" && (
          <div className="flex flex-col items-center gap-6">
            <h2 className="text-[36px] sm:text-[46px] font-extrabold tracking-tight leading-tight">
              What is your address?
            </h2>
            <p className="text-zinc-300 text-[15px] sm:text-[17px] -mt-2">
              Your customized plan pricing is based on location and property size.
            </p>

            {!isManualMode ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(addressInput);
                }}
                className="w-full max-w-lg flex flex-col gap-4 mt-4 relative"
              >
                <div className="relative">
                  <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter your street address or ZIP code"
                    value={addressInput}
                    onChange={(e) => {
                      setAddressInput(e.target.value);
                      setShowSuggestions(e.target.value.length > 1);
                    }}
                    onFocus={() => {
                      if (addressInput.length > 1) setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 200);
                    }}
                    className="w-full pl-12 pr-6 py-4 bg-white text-zinc-900 placeholder:text-gray-500 text-[15px] sm:text-[16px] font-medium border-0 rounded-full shadow-lg outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                    required
                    autoFocus
                  />
                  
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl overflow-hidden z-50 text-left border border-gray-100 max-h-64 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setAddressInput(suggestion);
                            setShowSuggestions(false);
                            handleSubmit(suggestion);
                          }}
                          className="w-full px-5 py-3.5 text-left text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3"
                        >
                          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate font-medium">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsManualMode(true)}
                  className="text-zinc-400 hover:text-zinc-200 text-sm font-medium transition-colors mt-2 underline underline-offset-4"
                >
                  Can't find your address? Enter it manually.
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto self-center bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] font-extrabold text-[13px] uppercase tracking-wider px-10 py-4.5 rounded-full shadow-md transition-all duration-250 mt-2"
                >
                  Choose Your Plan ›
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fullAddress = `${manualStreet}, ${manualCity}, ${manualState} ${manualZip}`;
                  handleSubmit(fullAddress);
                }}
                className="w-full max-w-lg flex flex-col gap-4 mt-4 text-left"
              >
                <div>
                  <label className="text-zinc-300 text-sm font-bold mb-1.5 block">Street</label>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={manualStreet}
                    onChange={(e) => setManualStreet(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white text-zinc-900 placeholder:text-gray-400 text-[15px] font-medium border-0 rounded-xl shadow-inner outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-bold mb-1.5 block">City</label>
                  <input
                    type="text"
                    placeholder="City"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white text-zinc-900 placeholder:text-gray-400 text-[15px] font-medium border-0 rounded-xl shadow-inner outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-bold mb-1.5 block">Zip</label>
                  <input
                    type="text"
                    placeholder="ZIP Code"
                    value={manualZip}
                    onChange={(e) => setManualZip(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white text-zinc-900 placeholder:text-gray-400 text-[15px] font-medium border-0 rounded-xl shadow-inner outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="text-zinc-300 text-sm font-bold mb-1.5 block">State</label>
                  <select
                    value={manualState}
                    onChange={(e) => setManualState(e.target.value)}
                    className="w-full px-5 py-3.5 bg-white text-zinc-900 text-[15px] font-medium border-0 rounded-xl shadow-inner outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="NY">New York (NY)</option>
                    <option value="NJ">New Jersey (NJ)</option>
                    <option value="CT">Connecticut (CT)</option>
                    <option value="PA">Pennsylvania (PA)</option>
                    <option value="MA">Massachusetts (MA)</option>
                    <option value="CA">California (CA)</option>
                    <option value="TX">Texas (TX)</option>
                    <option value="FL">Florida (FL)</option>
                  </select>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsManualMode(false)}
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-[12.5px] uppercase tracking-wider px-6 py-4 rounded-full border border-white/10 transition-all duration-200"
                  >
                    ‹ Go back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] font-extrabold text-[13px] uppercase tracking-wider px-8 py-4 rounded-full shadow-md transition-all duration-200"
                  >
                    Continue ›
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {modalState === "unserviceable" && (
          <div className="flex flex-col items-center gap-6 max-w-xl mx-auto">
            <div className="bg-[#0b1c46] border border-white/10 p-8 rounded-3xl w-full shadow-2xl flex flex-col items-center gap-4">
              <span className="text-[12px] bg-white/15 px-4 py-1.5 rounded-full text-zinc-300 font-semibold mb-2">
                {addressInput}
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-extrabold tracking-tight text-white leading-tight">
                Address is not Serviced
              </h2>
              <p className="text-zinc-300 text-[14.5px] sm:text-[16px] leading-relaxed max-w-md">
                We apologize for the inconvenience. At this time, we do not offer automatic online booking in your area.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full mt-6 justify-center">
                <button
                  onClick={() => setModalState("input")}
                  className="bg-white/15 hover:bg-white/25 text-white font-extrabold text-[12.5px] uppercase tracking-wider px-8 py-4 rounded-full border border-white/10 transition-all duration-200"
                >
                  Try Another Address
                </button>
                <button
                  onClick={handleManualReview}
                  className="bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] font-extrabold text-[12.5px] uppercase tracking-wider px-8 py-4 rounded-full shadow-md transition-all duration-200"
                >
                  Request Manual Review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
