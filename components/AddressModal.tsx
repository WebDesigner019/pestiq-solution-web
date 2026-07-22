"use client";

import React, { useState } from "react";
import { useLocation } from "@/context/LocationContext";
import { MapPin, Search } from "lucide-react";

interface AddressModalProps {
  onClose: () => void;
}

const ALL_US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District Of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" }
];

const COMPREHENSIVE_ADDRESSES = [
  "15009 NE Rd Collbran CO 81624",
  "58487 NE Rd Collbran CO 81624",
  "58505 NE Rd Collbran CO 81624",
  "58602 NE Rd Collbran CO 81624",
  "58832 NE Rd Collbran CO 81624",
  "58939 NE Rd Collbran CO 81624",
  "59861 NE Rd Collbran CO 81624",
  "59934 NE Rd Collbran CO 81624",
  "100 Broadway, New York, NY 10005",
  "350 5th Ave, New York, NY 10118",
  "1 Flatbush Ave, Brooklyn, NY 11217",
  "28-07 Jackson Ave, Long Island City, NY 11101",
  "1 Grand Central Terminal, Bronx, NY 10451",
  "100 Bay St, Staten Island, NY 10301",
  "1 Getty Square, Yonkers, NY 10701",
  "1 Mamaroneck Ave, White Plains, NY 10601",
  "500 Main St, New Rochelle, NY 10801",
  "1 Washington St, Jersey City, NJ 07302",
  "100 Hudson St, Hoboken, NJ 07030",
  "1 Broad St, Newark, NJ 07102",
  "10 Main St, Hackensack, NJ 07601",
  "1 Ocean Ave, Lakewood, NJ 08701",
  "1 Atlantic St, Stamford, CT 06901",
  "1 Greenwich Ave, Greenwich, CT 06830",
  "123 Peachtree St NE, Atlanta, GA 30303",
  "500 N Michigan Ave, Chicago, IL 60611",
  "600 Congress Ave, Austin, TX 78701",
  "100 Wilshire Blvd, Santa Monica, CA 90401"
];

export default function AddressModal({ onClose }: AddressModalProps) {
  const { setZipCode, setStreetAddress } = useLocation();
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

  const filteredSuggestions = COMPREHENSIVE_ADDRESSES.filter(s => 
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
        // Resolve address ZIP code or keywords
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
            (num >= 10501 && num <= 10805);
          const isNewJersey =
            (num >= 7001 && num <= 7999) ||
            (num >= 8701 && num <= 8908);
          const isCt =
            (num >= 6801 && num <= 6928);

          if (isNyc || isWestchester || isNewJersey || isCt) {
            hasService = true;
          }
        } else {
          // Check string fallback
          const t = address.toLowerCase();
          if (
            ["manhattan", "brooklyn", "bronx", "queens", "staten island", "yonkers", "mount vernon", "new rochelle", "white plains", "lakewood", "brick", "toms river", "jersey city", "hoboken", "stamford", "greenwich"].some(
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
              Your customized price is based on location.
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
                  <input
                    type="text"
                    placeholder="Search address or ZIP code..."
                    value={addressInput}
                    onChange={(e) => {
                      setAddressInput(e.target.value);
                      setShowSuggestions(e.target.value.length > 0);
                    }}
                    onFocus={() => {
                      if (addressInput.length > 0) setShowSuggestions(true);
                    }}
                    onBlur={() => {
                      setTimeout(() => setShowSuggestions(false), 250);
                    }}
                    className="w-full pl-6 pr-10 py-4 bg-white text-zinc-900 placeholder:text-gray-500 text-[16px] font-medium border-0 rounded-full shadow-2xl outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                    required
                    autoFocus
                  />
                  <Search className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  
                  {/* Dropdown Suggestions List (Matching Terminix Style Screenshot) */}
                  {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 text-left border border-gray-200 max-h-72 overflow-y-auto">
                      {filteredSuggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setAddressInput(suggestion);
                            setShowSuggestions(false);
                            handleSubmit(suggestion);
                          }}
                          className="w-full px-6 py-3.5 text-left text-gray-800 hover:bg-blue-50 hover:text-[#0066cc] transition-colors border-b border-gray-100 last:border-0 flex items-center gap-3 text-sm font-medium"
                        >
                          <MapPin className="w-4 h-4 text-gray-400 shrink-0" />
                          <span className="truncate">{suggestion}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setIsManualMode(true)}
                  className="text-zinc-400 hover:text-white text-sm font-medium transition-colors mt-2 underline underline-offset-4"
                >
                  Can&apos;t find your address? Enter it manually.
                </button>

                <button
                  type="submit"
                  className="w-full sm:w-auto self-center bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] font-extrabold text-[13px] uppercase tracking-wider px-10 py-4.5 rounded-full shadow-md transition-all duration-250 mt-2"
                >
                  Continue ›
                </button>
              </form>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const fullAddress = `${manualStreet}, ${manualCity}, ${manualState} ${manualZip}`;
                  handleSubmit(fullAddress);
                }}
                className="w-full max-w-md flex flex-col gap-4 mt-4 text-left"
              >
                <div>
                  <label className="text-zinc-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Street Address</label>
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

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-zinc-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">City</label>
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
                    <label className="text-zinc-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">Zip Code</label>
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      value={manualZip}
                      onChange={(e) => setManualZip(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white text-zinc-900 placeholder:text-gray-400 text-[15px] font-medium border-0 rounded-xl shadow-inner outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="text-zinc-300 text-xs font-bold uppercase tracking-wider mb-1.5 block">State</label>
                  <div className="relative">
                    <select
                      value={manualState}
                      onChange={(e) => setManualState(e.target.value)}
                      className="w-full px-5 py-3.5 bg-white text-zinc-900 text-[15px] font-semibold border border-gray-300 rounded-xl shadow-sm outline-none focus:ring-4 focus:ring-[#ffc400]/30 transition-all appearance-none cursor-pointer max-h-48 overflow-y-auto"
                      required
                    >
                      <option value="" disabled>Select State</option>
                      {ALL_US_STATES.map((st) => (
                        <option key={st.code} value={st.code}>
                          {st.name} ({st.code})
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 font-bold">
                      ▼
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mt-6">
                  <button
                    type="button"
                    onClick={() => setIsManualMode(false)}
                    className="bg-white/10 hover:bg-white/20 text-white font-extrabold text-[12.5px] uppercase tracking-wider px-6 py-3.5 rounded-full border border-white/10 transition-all duration-200"
                  >
                    ‹ Go back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#ffc400] hover:bg-[#e6af00] text-[#071b4d] font-extrabold text-[13px] uppercase tracking-wider px-8 py-3.5 rounded-full shadow-md transition-all duration-200"
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
