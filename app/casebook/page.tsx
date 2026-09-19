import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Footer } from "@/components/Footer";
import { casebookTopics } from "@/content/site";

export const metadata: Metadata = {
  title: "Casebook — SignalSmith",
  description: "Real business problems worked from first principles, from the business question to the decision.",
  alternates: { canonical: "https://signalsmith.online/casebook" },
};

export default function CasebookPage() { return <><main className="min-h-screen bg-[var(--paper)] px-6 py-8 md:px-10 lg:px-14"><div className="mx-auto max-w-[1440px]"><Link href="/" className="inline-flex items-center gap-2 border-b border-black/20 pb-2 text-xs font-bold uppercase tracking-[.16em] transition-colors hover:border-black"><ArrowLeft size={15} /> Back to SignalSmith</Link><div className="mt-24 max-w-4xl md:mt-32"><p className="eyebrow">SignalSmith Casebook / Learn</p><h1 className="mt-5 max-w-[820px] text-[clamp(4.5rem,8vw,8rem)] font-semibold leading-[.98] tracking-[-.03em]">Problems<br /><span className="text-black/35">solved end-to-end.</span></h1><p className="mt-9 max-w-xl text-lg leading-8 text-black/60">The Casebook will document the reasoning required to move from business context to a useful signal and a better decision.</p></div><div className="mt-24 grid gap-5 border-t border-black/15 pt-5 md:grid-cols-3">{casebookTopics.map(([number,title,body])=><article key={title} data-analytics-event="casebook_click" data-case-study={title} data-location="casebook" className="min-h-[280px] border border-black/15 bg-white p-6"><p className="eyebrow">Preview / {number}</p><h2 className="mt-16 text-3xl font-medium tracking-[-.035em]">{title}</h2><p className="mt-3 text-sm leading-6 text-black/55">{body}</p><p className="mt-6 text-[10px] font-bold uppercase tracking-[.18em] text-black/35">Case study in progress</p></article>)}</div></div></main><Footer /></>; }
