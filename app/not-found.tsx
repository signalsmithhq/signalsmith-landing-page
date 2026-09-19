import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function NotFound() {
  return <main className="min-h-screen bg-[var(--ink)] text-white"><div className="mx-auto flex min-h-screen max-w-3xl flex-col justify-between px-6 py-8 md:px-10"><Logo light /><div><p className="eyebrow text-[var(--cyan)]">404 / Signal not found</p><h1 className="mt-5 text-6xl font-medium tracking-[-.045em] md:text-8xl">This page<br /><span className="text-white/40">isn&apos;t here.</span></h1><Link href="/" className="cta mt-10 inline-flex items-center gap-3 border border-white/25 px-5 py-4 transition-colors hover:border-white"><ArrowLeft size={15} /> Return to SignalSmith</Link></div><p className="text-xs text-white/35">Start with the problem. Find the signal.</p></div></main>;
}
