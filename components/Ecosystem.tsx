import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { ecosystem } from "@/content/site";

export function Ecosystem() {
  return <div className="mt-14 grid gap-x-8 md:grid-cols-2 lg:grid-cols-4">
    {ecosystem.map((item, i) => <Link href={item.href} key={item.name} data-analytics-event={item.name === "Casebook" ? "casebook_click" : item.name === "Foundry" ? "foundry_click" : item.name === "Advisory" ? "advisory_click" : undefined} data-case-study={item.name === "Casebook" ? "casebook" : undefined} data-location="ecosystem" className={(i === 0 ? "border-t-2 border-[var(--ink)] " : "border-t border-black/20 ") + "group flex min-h-[205px] flex-col justify-between py-5 transition-colors hover:border-[var(--cyan)]"}>
      <div className="flex items-start justify-between"><span className="eyebrow">{String(i + 1).padStart(2, "0")} / {item.mode}</span><ArrowUpRight size={17} strokeWidth={1.5} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></div>
      <div><h3 className="text-3xl font-medium tracking-[-.035em]">{item.name}</h3><p className="mt-3 max-w-[250px] text-sm leading-6 text-black/55">{item.description}</p></div>
      <span className={"text-[10px] font-bold uppercase tracking-[.18em] " + (item.available ? "text-[var(--cyan)]" : "text-black/40")}>{item.status}</span>
    </Link>)}
  </div>;
}
