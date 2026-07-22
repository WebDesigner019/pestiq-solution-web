"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "@/context/LocationContext";
import { Search, MapPin, Navigation, CheckCircle2 } from "lucide-react";

interface AddressSuggestion {
  fullAddress: string;
  street: string;
  city: string;
  state: string;
  zip: string;
}

const PRESET_SUGGESTIONS: AddressSuggestion[] = [
  { fullAddress: "100 Broadway, New York, NY 10005", street: "100 Broadway", city: "New York", state: "NY", zip: "10005" },
  { fullAddress: "350 5th Ave, New York, NY 10118", street: "350 5th Ave", city: "New York", state: "NY", zip: "10118" },
  { fullAddress: "1 Flatbush Ave, Brooklyn, NY 11217", street: "1 Flatbush Ave", city: "Brooklyn", state: "NY", zip: "11217" },
  { fullAddress: "28-07 Jackson Ave, Long Island City, NY 11101", street: "28-07 Jackson Ave", city: "Long Island City", state: "NY", zip: "11101" },
  { fullAddress: "1 Grand Central Terminal, Bronx, NY 10451", street: "1 Grand Central Terminal", city: "Bronx", state: "NY", zip: "10451" },
  { fullAddress: "100 Bay St, Staten Island, NY 10301", street: "100 Bay St", city: "Staten Island", state: "NY", zip: "10301" },
  { fullAddress: "1 Getty Square, Yonkers, NY 10701", street: "1 Getty Square", city: "Yonkers", state: "NY", zip: "10701" },
  { fullAddress: "1 Mamaroneck Ave, White Plains, NY 10601", street: "1 Mamaroneck Ave", city: "White Plains", state: "NY", zip: "10601" },
  { fullAddress: "500 Main St, New Rochelle, NY 10801", street: "500 Main St", city: "New Rochelle", state: "NY", zip: "10801" },
  { fullAddress: "1 Washington St, Jersey City, NJ 07302", street: "1 Washington St", city: "Jersey City", state: "NJ", zip: "07302" },
  { fullAddress: "100 Hudson St, Hoboken, NJ 07030", street: "100 Hudson St", city: "Hoboken", state: "NJ", zip: "07030" },
  { fullAddress: "1 Broad St, Newark, NJ 07102", street: "1 Broad St", city: "Newark", state: "NJ", zip: "07102" },
  { fullAddress: "10 Main St, Hackensack, NJ 07601", street: "10 Main St", city: "Hackensack", state: "NJ", zip: "07601" },
  { fullAddress: "1 Ocean Ave, Lakewood, NJ 08701", street: "1 Ocean Ave", city: "Lakewood", state: "NJ", zip: "08701" },
  { fullAddress: "1 Atlantic St, Stamford, CT 06901", street: "1 Atlantic St", city: "Stamford", state: "CT", zip: "06901" },
  { fullAddress: "1 Greenwich Ave, Greenwich, CT 06830", street: "1 Greenwich Ave", city: "Greenwich", state: "CT", zip: "06830" }
];

interface AddressAutocompleteProps {
  placeholder?: string;
  buttonText?: string;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  onSelect?: (address: string) => void;
}

export function AddressAutocomplete({
  placeholder = "Enter your street address or zip code...",
  buttonText = "Check Price & Coverage",
  className = "",
  inputClassName = "",
  buttonClassName = "",
  onSelect
}: AddressAutocompleteProps) {
  const { streetAddress, zipCode, submitAddressSearch } = useLocation();
  const [query, setQuery] = useState<string>(streetAddress || zipCode || "");
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync with context if updated externally
  useEffect(() => {
    if (streetAddress) {
      setQuery(streetAddress);
    } else if (zipCode) {
      setQuery(zipCode);
    }
  }, [streetAddress, zipCode]);

  // Handle outside click to close suggestions
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    setSelectedIndex(-1);

    if (val.trim().length >= 2) {
      const lower = val.toLowerCase().trim();
      const filtered = PRESET_SUGGESTIONS.filter(
        item => 
          item.fullAddress.toLowerCase().includes(lower) ||
          item.city.toLowerCase().includes(lower) ||
          item.zip.includes(lower) ||
          item.street.toLowerCase().includes(lower)
      );
      setSuggestions(filtered);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  };

  const handleSelectSuggestion = (fullAddr: string) => {
    setQuery(fullAddr);
    setIsOpen(false);
    submitAddressSearch(fullAddr);
    if (onSelect) onSelect(fullAddr);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsOpen(false);
    submitAddressSearch(query);
    if (onSelect) onSelect(query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || suggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === "Enter" && selectedIndex >= 0) {
      e.preventDefault();
      handleSelectSuggestion(suggestions[selectedIndex].fullAddress);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleGeolocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Fallback location for demo in NY metro
          const demoAddress = "100 Broadway, New York, NY 10005";
          setQuery(demoAddress);
          submitAddressSearch(demoAddress);
        },
        () => {
          const fallback = "350 5th Ave, New York, NY 10118";
          setQuery(fallback);
          submitAddressSearch(fallback);
        }
      );
    }
  };

  return (
    <div ref={wrapperRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
            <MapPin className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.trim().length >= 2 && suggestions.length > 0) setIsOpen(true);
            }}
            placeholder={placeholder}
            className={`w-full pl-11 pr-10 py-3.5 bg-white text-gray-900 border border-gray-300 rounded-xl text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#0066cc] focus:border-transparent shadow-sm ${inputClassName}`}
          />
          <button
            type="button"
            onClick={handleGeolocation}
            title="Use my current location"
            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-[#0066cc] transition-colors"
          >
            <Navigation className="w-4 h-4" />
          </button>
        </div>

        <button
          type="submit"
          className={`bg-[#ffc400] hover:bg-[#e6b000] text-[#071b4d] font-extrabold px-6 py-3.5 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 ${buttonClassName}`}
        >
          <Search className="w-4 h-4" />
          <span>{buttonText}</span>
        </button>
      </form>

      {/* Autocomplete Dropdown List */}
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute z-50 top-full left-0 right-0 mt-1.5 bg-white border border-gray-200 rounded-xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto animate-fade-in">
          <li className="px-3.5 py-1.5 bg-gray-50 text-[11px] font-extrabold uppercase tracking-wider text-gray-500 border-b border-gray-100 flex items-center justify-between">
            <span>Suggested Tri-State Addresses</span>
            <span className="text-[10px] text-gray-400 lowercase font-normal">select or press enter</span>
          </li>
          {suggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSelectSuggestion(item.fullAddress)}
              className={`px-4 py-3 flex items-start gap-3 cursor-pointer text-xs sm:text-sm border-b border-gray-50 last:border-0 transition-colors ${
                index === selectedIndex ? "bg-blue-50 text-[#0066cc] font-semibold" : "hover:bg-gray-50 text-gray-700"
              }`}
            >
              <MapPin className={`w-4 h-4 mt-0.5 flex-shrink-0 ${index === selectedIndex ? "text-[#0066cc]" : "text-gray-400"}`} />
              <div>
                <span className="font-bold block text-gray-900">{item.fullAddress}</span>
                <span className="text-[11px] text-gray-500 block mt-0.5">
                  {item.city}, {item.state} ({item.zip})
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
