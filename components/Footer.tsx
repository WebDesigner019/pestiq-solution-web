"use client";

import React from "react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="PestIQ Home">
      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#0a2540] to-[#071b4d] flex items-center justify-center p-1.5 shadow-md border border-[#1a7a3c]/30 group-hover:scale-105 transition-transform">
        <svg viewBox="0 0 512 512" className="w-full h-full">
          <path d="M256 32 L432 96 V240 C432 352 344 448 256 480 C168 448 80 352 80 240 V96 Z" fill="#0a2540" />
          <path d="M256 64 L396 116 V232 C396 324 324 406 256 434 C188 406 116 324 116 232 V116 Z" fill="none" stroke="#1a7a3c" strokeWidth="24" />
          <path d="M256 140 C310 140 330 200 310 270 C290 340 256 370 256 370 C256 370 222 340 202 270 C182 200 202 140 256 140 Z" fill="#1a7a3c" />
          <path d="M256 160 V340" stroke="#ffc400" strokeWidth="16" strokeLinecap="round" />
          <circle cx="256" cy="230" r="22" fill="#ffc400" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-black tracking-tight leading-none flex items-center">
          <span className="text-[#071b4d]">PEST</span>
          <span className="text-[#1a7a3c] font-black">IQ</span>
        </span>
        <span className="text-[8px] font-extrabold tracking-[0.28em] text-gray-500 uppercase mt-0.5">
          SOLUTIONS
        </span>
      </div>
    </Link>
  );
}

const o = [
  ["Ant Control", "/pests/ants"],
  ["Cockroach Control", "/pests/cockroaches"],
  ["Rodent Control", "/pests/rodents"],
  ["Spider Control", "/pests/spiders"]
];

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-cta">
        <div className="header-container">
          <div>
            <strong>Ready to protect your home?</strong>
            <span>Check local availability and request a preferred appointment time.</span>
          </div>
          <Link href="/book">
            Get started <span>›</span>
          </Link>
        </div>
      </div>
      <div className="header-container footer-grid">
        <div className="footer-brand">
          <Logo />
          <p>
            Residential pest-control planning for select New York City, Lower Westchester, and Ocean County, NJ neighborhoods.
          </p>
          <a href="tel:+12125550148">(212) 555-0148</a>
        </div>
        <div>
          <h3>Services</h3>
          {o.map(([name, href]) => (
            <Link key={name} href={href}>
              {name}
            </Link>
          ))}
        </div>
        <div>
          <h3>Customer care</h3>
          <Link href="/book">Request service</Link>
          <Link href="/plans">Plans &amp; pricing</Link>
          <Link href="/#service-areas">Service areas</Link>
          <Link href="/policies">Policies</Link>
        </div>
        <div>
          <h3>Hours</h3>
          <p>
            Monday–Saturday
            <br />
            7:00am–7:00pm
          </p>
          <p>
            Sunday
            <br />
            9:00am–4:00pm
          </p>
          <a href="mailto:hello@pestiqsolutions.com">hello@pestiqsolutions.com</a>
        </div>
      </div>
      <div className="header-container footer-bottom">
        <span>© 2026 PestIQ Solutions</span>
        <div>
          <Link href="/policies#privacy">Privacy</Link>
          <Link href="/policies">Terms &amp; policies</Link>
          <span>USA</span>
        </div>
      </div>
    </footer>
  );
}
