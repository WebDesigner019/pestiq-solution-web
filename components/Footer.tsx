"use client";

import React from "react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group py-1" aria-label="PestIQ Solutions Home">
      <div className="w-10 h-10 rounded-xl bg-[#071b4d] flex items-center justify-center p-2 shadow-lg border border-[#1a7a3c]/40 group-hover:border-[#1a7a3c] transition-all group-hover:scale-105">
        <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M50 8 L85 24 V52 C85 72 68 88 50 94 C32 88 15 72 15 52 V24 L50 8 Z" fill="#0a2540" stroke="#1a7a3c" strokeWidth="6" strokeLinejoin="round" />
          <path d="M38 30 H58 C66 30 72 36 72 44 C72 52 66 58 58 58 H38 V30 Z" fill="#1a7a3c" />
          <path d="M38 30 V72" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
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
