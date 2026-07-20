"use client";

import React from "react";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" className="brand flex flex-col" aria-label="PestIQ Solutions home">
      <span className="brand-word text-3xl font-black tracking-tight flex items-center">
        <span style={{ color: "#071b4d" }}>PEST</span>
        <span className="bg-[#ffc400] text-[#071b4d] ml-0.5 px-1 py-0.5 not-italic rounded-sm">IQ</span>
      </span>
      <small className="text-[#516075] tracking-[0.36em] uppercase mt-1 ml-1 text-[8px] font-extrabold block">
        Solutions
      </small>
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
