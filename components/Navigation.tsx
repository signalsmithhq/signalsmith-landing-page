"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [["Casebook", "/casebook"], ["Gems", "/gems"], ["Blueprints", "/blueprints"], ["Foundry", "/foundry"], ["Advisory", "/advisory"], ["Connect", "#connect"]];

function analyticsProps(label: string) {
  const event = label === "Casebook" ? "casebook_click" : label === "Foundry" ? "foundry_click" : label === "Advisory" ? "advisory_click" : undefined;
  return event ? { "data-analytics-event": event, "data-case-study": label === "Casebook" ? "casebook" : undefined, "data-location": "header" } : {};
}

export function Navigation() {
  const [open, setOpen] = useState(false);
  return <header className="absolute inset-x-0 top-0 z-20">
    <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-6 md:px-10 lg:px-14">
      <a href="#top" aria-label="SignalSmith home"><Logo light compact /></a>
      <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[.18em] text-white/75 md:flex" aria-label="Primary navigation">
        {links.map(([label, href]) => <a key={label} href={href} {...analyticsProps(label)} className="transition-colors hover:text-white">{label}</a>)}
      </nav>
      <button className="text-white md:hidden" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav className="mx-4 border border-white/20 bg-[var(--ink)] p-5 md:hidden" aria-label="Mobile navigation">
      {links.map(([label, href]) => <a key={label} href={href} {...analyticsProps(label)} onClick={() => setOpen(false)} className="block border-b border-white/10 py-4 text-xs font-bold uppercase tracking-[.18em] text-white">{label}</a>)}
    </nav>}
  </header>;
}
