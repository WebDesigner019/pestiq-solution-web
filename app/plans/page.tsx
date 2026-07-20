"use client";

import React from "react";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useLocation } from "@/context/LocationContext";

export default function PlansPage() {
  const { priceTier, serviceArea, propertySqFt, zipCode, setIsAddressModalOpen } = useLocation();

  // Helper to compute local adjusted prices
  const getPrices = () => {
    let baseEssential = 59;
    let baseComplete = 69;
    let baseOnetime = 279;

    if (priceTier === "westchester") {
      baseEssential = 49;
      baseComplete = 59;
      baseOnetime = 249;
    } else if (priceTier === "newjersey") {
      baseEssential = 45;
      baseComplete = 55;
      baseOnetime = 229;
    }

    // Square footage adjustment
    let monthlyAdjustment = 0;
    let onetimeAdjustment = 0;

    if (propertySqFt) {
      if (propertySqFt > 1500 && propertySqFt <= 2500) {
        monthlyAdjustment = 10;
        onetimeAdjustment = 30;
      } else if (propertySqFt > 2500 && propertySqFt <= 3500) {
        monthlyAdjustment = 20;
        onetimeAdjustment = 60;
      } else if (propertySqFt > 3500) {
        monthlyAdjustment = 30;
        onetimeAdjustment = 90;
      }
    }

    return {
      essential: baseEssential + monthlyAdjustment,
      complete: baseComplete + monthlyAdjustment,
      onetime: baseOnetime + onetimeAdjustment,
      adjusted: monthlyAdjustment > 0
    };
  };

  const prices = getPrices();

  const handleCta = (e: React.MouseEvent) => {
    if (!zipCode) {
      e.preventDefault();
      setIsAddressModalOpen(true);
    }
  };

  return (
    <div className="site-shell site-v3">
      <Header />
      <main>
        {/* Address Alert Bar */}
        {!zipCode && (
          <div className="w-full bg-[#fdfaf2] border-b border-[#f3ebcf] py-3.5 px-4 sm:px-8">
            <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[13.5px]">
              <div className="flex items-center gap-2 text-amber-800 font-semibold">
                <span className="text-[16px] -mt-0.5">⚠️</span>
                <span>To see localized pricing, please verify your service address first.</span>
              </div>
              <button
                onClick={() => setIsAddressModalOpen(true)}
                className="px-4 py-1.5 bg-[#1a7a3c] hover:bg-[#155f2e] text-white rounded font-bold text-[12.5px] transition-all whitespace-nowrap"
              >
                Verify Address →
              </button>
            </div>
          </div>
        )}

        {/* PLANS PAGE HEADER */}
        <section className="plans-page-header">
          <div className="v3-content">
            <p>PestIQ Solutions plans</p>
            <h1>Straightforward protection for your property.</h1>
            <span className="flex flex-col items-center gap-2">
              {zipCode ? (
                <span className="bg-[#e8f5ed] text-[#1a7a3c] border border-[#1a7a3c]/10 px-4 py-1.5 rounded-full text-[13px] font-semibold flex items-center gap-1.5">
                  <span>📍</span> Local pricing for: <strong>{serviceArea}</strong> {propertySqFt && `(${propertySqFt} sq ft)`}
                </span>
              ) : (
                <button
                  onClick={() => setIsAddressModalOpen(true)}
                  className="text-zinc-600 hover:text-[#1a7a3c] font-semibold text-[13.5px] underline decoration-dotted"
                >
                  Enter your address or ZIP code to view local adjusted pricing.
                </button>
              )}
            </span>
          </div>
        </section>

        {/* COMPARISON CARDS */}
        <section className="v3-section comparison-section">
          <div className="v3-content">
            <div className="comparison-grid">
              {/* ESSENTIAL CARD */}
              <article className="comparison-card">
                <span className="comparison-rank">Better protection</span>
                <h2>Essential Protection</h2>
                <ul>
                  <li>
                    <span>✓</span>Interior and exterior assessment
                  </li>
                  <li>
                    <span>✓</span>Common household pest coverage
                  </li>
                  <li>
                    <span>✓</span>Scheduled service visits
                  </li>
                  <li>
                    <span>✓</span>Written service notes
                  </li>
                  <li>
                    <span>✓</span>Targeted baiting and barriers
                  </li>
                </ul>
                <div className="comparison-price">
                  <strong>${prices.essential}</strong>
                  <small>/ month</small>
                </div>
                <Link href="/book?plan=monthly" onClick={handleCta} className="w-full">
                  Check availability
                </Link>
              </article>

              {/* COMPLETE CARD */}
              <article className="comparison-card selected">
                <div className="comparison-best">★ Most complete</div>
                <span className="comparison-rank">Best protection</span>
                <h2>Complete Protection</h2>
                <ul>
                  <li>
                    <span>✓</span>Interior and exterior assessment
                  </li>
                  <li>
                    <span>✓</span>Expanded pest coverage
                  </li>
                  <li>
                    <span>✓</span>Scheduled service visits
                  </li>
                  <li>
                    <span>✓</span>Priority follow-up pathway
                  </li>
                  <li>
                    <span>✓</span>Exterior perimeter protection
                  </li>
                  <li>
                    <span>✓</span>Worry-free service guarantee
                  </li>
                </ul>
                <div className="comparison-price">
                  <strong>${prices.complete}</strong>
                  <small>/ month</small>
                </div>
                <Link href="/book?plan=monthly" onClick={handleCta} className="w-full">
                  Check local price
                </Link>
              </article>

              {/* ONE-TIME CARD */}
              <article className="comparison-card">
                <span className="comparison-rank">Single concern</span>
                <h2>One-Time Service</h2>
                <ul>
                  <li>
                    <span>✓</span>Issue-focused inspection
                  </li>
                  <li>
                    <span>✓</span>One agreed treatment scope
                  </li>
                  <li>
                    <span>✓</span>Property recommendations
                  </li>
                  <li>
                    <span>✓</span>No monthly commitment
                  </li>
                  <li>
                    <span>✓</span>30-day follow-up window
                  </li>
                </ul>
                <div className="comparison-price">
                  <strong>${prices.onetime}</strong>
                  <small>starting price</small>
                </div>
                <Link href="/book?plan=one-time" onClick={handleCta} className="w-full">
                  Request a visit
                </Link>
              </article>
            </div>
            {prices.adjusted && (
              <p className="comparison-note">
                * Prices include a size-based adjustment for your {propertySqFt} sq ft property.
              </p>
            )}
          </div>
        </section>

        {/* COMPARISON TABLE */}
        <section className="v3-section comparison-table-section">
          <div className="v3-content">
            <h2>Compare plan features.</h2>
            <div className="comparison-table">
              <div className="table-row head">
                <strong>Feature</strong>
                <span>Essential</span>
                <span>Complete</span>
                <span>One-Time</span>
              </div>
              <div className="table-row">
                <strong>Targeted pests</strong>
                <span>Common</span>
                <span>All standard</span>
                <span>Single issue</span>
              </div>
              <div className="table-row">
                <strong>Visits</strong>
                <span>Scheduled</span>
                <span>Priority</span>
                <span>Single visit</span>
              </div>
              <div className="table-row">
                <strong>Service notes</strong>
                <span>Written</span>
                <span>Written</span>
                <span>Summary report</span>
              </div>
              <div className="table-row">
                <strong>Assurance</strong>
                <span>Service guarantee</span>
                <span>Priority pathway</span>
                <span>30-day window</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
