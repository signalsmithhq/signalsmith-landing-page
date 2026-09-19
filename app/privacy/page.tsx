import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy — SignalSmith",
  description: "How SignalSmith uses consent-gated analytics and handles privacy.",
  alternates: { canonical: "https://signalsmith.online/privacy" },
};

export default function PrivacyPage() {
  return <main className="min-h-screen bg-[var(--paper)] px-6 py-24 text-[var(--ink)] md:px-10 md:py-32 lg:px-14">
    <div className="mx-auto max-w-3xl">
      <p className="eyebrow">SignalSmith / Privacy</p>
      <h1 className="mt-8 text-5xl font-medium tracking-[-.04em] md:text-7xl">A clear account of the data we use.</h1>
      <p className="mt-8 max-w-2xl text-lg leading-8 text-black/60">This page describes the analytics currently implemented on signalsmith.online. It is intentionally limited to the information needed to understand how the site is used.</p>
      <div className="mt-16 space-y-12 text-base leading-8 text-black/70">
        <section><h2 className="text-2xl font-medium text-black">Analytics and consent</h2><p className="mt-4">SignalSmith uses Google Analytics 4 only after you accept analytics in the consent prompt. If you reject analytics, the Google Analytics script is not loaded. Your choice is stored locally on this device so the prompt is not repeatedly shown. You can change it at any time through “Privacy preferences”.</p></section>
        <section><h2 className="text-2xl font-medium text-black">What is measured</h2><p className="mt-4">When analytics are enabled, the site measures page views and selected interactions: Casebook views and clicks, Foundry, Advisory, social, external-link, and contact-link clicks. Events may include a content label or a broad location such as “homepage”, “connect”, “footer”, or “route”. The site does not send email addresses, names, phone numbers, form contents, or raw user-entered personal information to Google Analytics.</p></section>
        <section><h2 className="text-2xl font-medium text-black">No fingerprinting or anonymous User-ID</h2><p className="mt-4">SignalSmith does not create browser or device fingerprints using IP addresses, screen properties, fonts, canvas, WebGL, AudioContext, timezone, or device characteristics. It does not implement GA4 User-ID for anonymous visitors. Google Analytics may still process pseudonymous and technical data under Google’s own service terms and privacy documentation when analytics consent is granted; this page does not describe that data as anonymous.</p></section>
        <section><h2 className="text-2xl font-medium text-black">External services and links</h2><p className="mt-4">Google Analytics is configured through the public environment variable <code className="font-mono text-sm">NEXT_PUBLIC_GA_MEASUREMENT_ID</code>. Instagram and LinkedIn links lead to third-party services with their own privacy practices. The contact link opens your email application; the site does not transmit the email address you use to Google Analytics.</p></section>
        <section><h2 className="text-2xl font-medium text-black">Questions</h2><p className="mt-4">For privacy questions, contact <a className="underline underline-offset-4" href="mailto:contact@signalsmith.online">contact@signalsmith.online</a>.</p></section>
      </div>
    </div>
  </main>;
}
