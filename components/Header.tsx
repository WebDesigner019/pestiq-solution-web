"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocation } from "@/context/LocationContext";
import { MapPin, Phone, ShoppingCart, User, ChevronDown, Menu } from "lucide-react";
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group py-1" aria-label="PestIQ Solutions Home">
      {/* Modern Geometric P-Shield Mark */}
      <div className="w-10 h-10 rounded-xl bg-[#071b4d] flex items-center justify-center p-2 shadow-lg border border-[#1a7a3c]/40 group-hover:border-[#1a7a3c] transition-all group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Shield Outer Line */}
          <path d="M50 8 L85 24 V52 C85 72 68 88 50 94 C32 88 15 72 15 52 V24 L50 8 Z" fill="#0a2540" stroke="#1a7a3c" strokeWidth="6" strokeLinejoin="round" />
          {/* Stylized P-Leaf Icon */}
          <path d="M38 30 H58 C66 30 72 36 72 44 C72 52 66 58 58 58 H38 V30 Z" fill="#1a7a3c" />
          <path d="M38 30 V72" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          {/* Gold Sparkle Accent */}
          <circle cx="58" cy="44" r="5" fill="#ffc400" />
        </svg>
      </div>
      <div className="flex flex-col justify-center">
        <div className="flex items-center leading-none">
          <span className="text-2xl font-black tracking-tight text-[#071b4d]">PEST</span>
          <span className="text-2xl font-black tracking-tight text-[#1a7a3c]">IQ</span>
          <span className="ml-1 text-[10px] font-black text-[#ffc400] bg-[#071b4d] px-1 py-0.5 rounded tracking-widest uppercase">PRO</span>
        </div>
        <span className="text-[8.5px] font-extrabold tracking-[0.26em] text-gray-500 uppercase mt-1">
          PEST & HOME SOLUTIONS
        </span>
      </div>
    </Link>
  );
}

export function Header() {
  const { zipCode, serviceArea, cartItem, setIsAddressModalOpen } = useLocation();
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="relative w-full z-50 flex flex-col font-sans">
      {/* Tier 1 - Utility Bar */}
      <div 
        className="w-full flex items-center justify-between px-4 md:px-8 text-white text-xs"
        style={{ backgroundColor: "#071b4d", height: "36px" }}
      >
        <div className="flex items-center space-x-6">
          <span>Need Help? <a href="tel:2125550148" className="font-semibold hover:underline">(212) 555-0148</a></span>
          <Link href="/locations" className="hover:underline">Locations</Link>
          <Link href="/contact" className="hover:underline">Contact Us</Link>
        </div>
        <div>
          <Link 
            href="/commercial" 
            className="px-3 py-1 rounded-full text-white font-semibold transition-opacity hover:opacity-80 flex items-center"
            style={{ backgroundColor: "#0a2540" }}
          >
            Commercial <ChevronDown className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </div>

      {/* Tier 2 - Brand Bar */}
      <div className="w-full bg-white flex items-center justify-between px-4 md:px-8 py-4 border-b border-gray-100 relative">
        <div className="flex-shrink-0 flex items-center">
          <Logo />
        </div>

        {/* Center: Location picker */}
        <div className="hidden md:flex items-center justify-center flex-1 mx-4">
          <button 
            onClick={() => setIsAddressModalOpen(true)}
            className="flex items-center space-x-2 px-4 py-2 rounded border border-gray-200 hover:bg-gray-50 transition-colors text-sm"
          >
            <MapPin className="text-gray-500 w-5 h-5" />
            <span className="text-gray-600 font-medium">My Branch:</span>
            <span className="font-bold text-gray-900">{zipCode ? serviceArea : "Select Location"}</span>
            <span className="text-blue-600 font-medium text-xs ml-2 hover:underline">Change</span>
          </button>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center space-x-6">
          <a href="tel:2125550148" className="flex flex-col items-center text-gray-700 hover:text-[#071b4d]">
            <Phone className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold mt-1">Call</span>
          </a>
          <Link href="/cart" className="flex flex-col items-center text-gray-700 hover:text-[#071b4d] relative">
            <ShoppingCart className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold mt-1">Cart</span>
            {cartItem !== null && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                1
              </span>
            )}
          </Link>
          <Link href="/account" className="flex flex-col items-center text-gray-700 hover:text-[#071b4d]">
            <User className="w-5 h-5 mb-1" />
            <span className="text-xs font-semibold mt-1">MyAccount</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden flex flex-col items-center text-gray-700 p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Tier 3 - Nav Bar */}
      <nav 
        className="hidden md:flex w-full bg-white border-b border-[#e8e8e8] relative px-4 md:px-8 text-sm font-semibold text-gray-800"
      >
        <div className="flex space-x-8 items-center h-14">
          <Link href="/termites" className="hover:text-[#1a7a3c] flex items-center h-full">
            Termite Treatment <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </Link>

          <div 
            className="h-full flex items-center group relative"
            onMouseEnter={() => setIsMegaMenuOpen(true)}
            onMouseLeave={() => setIsMegaMenuOpen(false)}
          >
            <button className="hover:text-[#1a7a3c] flex items-center h-full focus:outline-none">
              Pest Control Services <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
            </button>
            
            {/* Mega Dropdown */}
            {isMegaMenuOpen && (
              <div className="absolute top-full left-0 w-screen max-w-7xl -ml-8 bg-white shadow-xl border-t border-gray-100 p-8 grid grid-cols-5 gap-6 z-50">
                {/* Column 1 */}
                <div className="flex flex-col space-y-3">
                  <Link href="/pests/general" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">General Pest Control</Link>
                  <Link href="/pests/ants" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Ant Control</Link>
                  <Link href="/pests/bats" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Bat Control</Link>
                  <Link href="/pests/bed-bugs" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Bed Bug Control</Link>
                </div>
                {/* Column 2 */}
                <div className="flex flex-col space-y-3">
                  <Link href="/pests/birds" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Bird Control</Link>
                  <Link href="/pests/carpenter-ants" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Carpenter Ant Control</Link>
                  <Link href="/pests/centipedes-millipedes" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Centipede & Millipede Control</Link>
                  <Link href="/pests/cockroaches" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Cockroach Control</Link>
                </div>
                {/* Column 3 */}
                <div className="flex flex-col space-y-3">
                  <Link href="/pests/crickets" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Cricket Control</Link>
                  <Link href="/pests/fleas" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Flea Control</Link>
                  <Link href="/pests/flies" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Fly Control</Link>
                  <Link href="/pests/mice" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Mice Control</Link>
                  <Link href="/pests/mosquitoes" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Mosquito Control</Link>
                </div>
                {/* Column 4 */}
                <div className="flex flex-col space-y-3">
                  <Link href="/pests/moths" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Moth Control</Link>
                  <Link href="/pests/rats" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Rat Control</Link>
                  <Link href="/pests/rodents" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Rodent Control Services</Link>
                  <Link href="/pests/scorpions" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Scorpion Control</Link>
                </div>
                {/* Column 5 */}
                <div className="flex flex-col space-y-3">
                  <Link href="/pests/silverfish" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Silverfish Control</Link>
                  <Link href="/pests/spiders" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Spider Control</Link>
                  <Link href="/pests/stinging-pests" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Stinging Pest Control</Link>
                  <Link href="/pests/ticks" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Tick Control</Link>
                  <Link href="/pests/wasps" className="text-gray-600 hover:text-[#1a7a3c] hover:underline">Wasp Control</Link>
                </div>
              </div>
            )}
          </div>

          <Link href="/home-services" className="hover:text-[#1a7a3c] flex items-center h-full">
            Home Services <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </Link>
          <Link href="/research" className="hover:text-[#1a7a3c] flex items-center h-full">
            Pest Research <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </Link>
          <Link href="/about" className="hover:text-[#1a7a3c] flex items-center h-full">
            About PestIQ <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </Link>
          <Link href="/offers" className="hover:text-[#1a7a3c] flex items-center h-full text-red-600">
            Exclusive Offers <ChevronDown className="w-4 h-4 ml-1 opacity-70" />
          </Link>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 flex flex-col z-50">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <button 
              onClick={() => { setMobileMenuOpen(false); setIsAddressModalOpen(true); }}
              className="w-full bg-white px-4 py-3 rounded border border-gray-300 text-sm font-bold flex justify-between items-center"
            >
              <span><MapPin className="w-4 h-4 inline-block mr-1" /> My Branch: {zipCode ? serviceArea : "Select Location"}</span>
              <span className="text-blue-600">Change</span>
            </button>
          </div>
          <Link href="/termites" className="p-4 border-b border-gray-100 font-bold text-gray-800">Termite Treatment</Link>
          <div className="p-4 border-b border-gray-100 flex flex-col">
            <span className="font-bold text-gray-800 mb-3">Pest Control Services</span>
            <div className="grid grid-cols-2 gap-2 pl-4 text-sm">
              <Link href="/pests/ants" className="text-gray-600 py-1">Ant Control</Link>
              <Link href="/pests/cockroaches" className="text-gray-600 py-1">Cockroach Control</Link>
              <Link href="/pests/rodents" className="text-gray-600 py-1">Rodent Control</Link>
              <Link href="/pests/mosquitoes" className="text-gray-600 py-1">Mosquito Control</Link>
              <Link href="/pests/bed-bugs" className="text-gray-600 py-1">Bed Bug Control</Link>
              <Link href="/pests/general" className="text-blue-600 py-1 font-semibold">View All Pests →</Link>
            </div>
          </div>
          <Link href="/home-services" className="p-4 border-b border-gray-100 font-bold text-gray-800">Home Services</Link>
          <Link href="/research" className="p-4 border-b border-gray-100 font-bold text-gray-800">Pest Research</Link>
          <Link href="/about" className="p-4 border-b border-gray-100 font-bold text-gray-800">About PestIQ</Link>
          <Link href="/offers" className="p-4 border-b border-gray-100 font-bold text-red-600">Exclusive Offers</Link>
        </div>
      )}
    </header>
  );
}
