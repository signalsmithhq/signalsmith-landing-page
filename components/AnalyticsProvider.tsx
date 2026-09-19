"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

type Consent = "accepted" | "rejected" | null;
type AnalyticsParams = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const CONSENT_KEY = "signalsmith-analytics-consent";

export function trackEvent(event: string, params: AnalyticsParams = {}) {
  if (typeof window !== "undefined" && window.gtag) {
    const debugParams = process.env.NODE_ENV === "development" ? { debug_mode: true } : {};
    window.gtag("event", event, { ...params, ...debugParams });
  }
}

function AnalyticsScripts({ measurementId, onReady }: { measurementId: string; onReady: () => void }) {
  const safeMeasurementId = measurementId.replace(/[^A-Za-z0-9_-]/g, "");
  const debugConfig = process.env.NODE_ENV === "development" ? ", debug_mode: true" : "";

  return <>
    <Script id="signalsmith-ga-init" strategy="afterInteractive">
      {`window.dataLayer = window.dataLayer || [];
function gtag(){ window.dataLayer.push(arguments); }
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${safeMeasurementId}', { send_page_view: false${debugConfig} });`}
    </Script>
    <Script
      id="signalsmith-ga-script"
      src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(safeMeasurementId)}`}
      strategy="afterInteractive"
      onLoad={onReady}
      onError={() => console.error("SignalSmith analytics: Google tag failed to load.")}
    />
  </>;
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const [consent, setConsent] = useState<Consent>(null);
  const [tagReady, setTagReady] = useState(false);
  const analyticsEnabled = consent === "accepted";

  useEffect(() => {
    if (!measurementId) return;
    const stored = window.localStorage.getItem(CONSENT_KEY) as Consent;
    if (stored === "accepted" || stored === "rejected") setConsent(stored);
  }, [measurementId]);

  useEffect(() => {
    if (!measurementId || !analyticsEnabled || !tagReady || !window.gtag) return;
    trackEvent("page_view", { page_path: pathname });
    if (pathname === "/casebook") trackEvent("casebook_view", { location: "route" });
  }, [analyticsEnabled, measurementId, pathname, tagReady]);

  useEffect(() => {
    if (!measurementId || !analyticsEnabled || !tagReady) return;
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-analytics-event]");
      if (!element) return;
      const eventName = element.dataset.analyticsEvent;
      if (!eventName) return;
      const params: AnalyticsParams = {};
      ["caseStudy", "platform", "location"].forEach((key) => {
        const value = element.dataset[key];
        if (value) params[key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)] = value;
      });
      trackEvent(eventName, params);
      if (element.dataset.analyticsExternal === "true") trackEvent("external_link_click", params);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [analyticsEnabled, measurementId, tagReady]);

  const updateConsent = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(CONSENT_KEY, value);
    setConsent(value);
    if (measurementId && window.gtag) window.gtag("consent", "update", { analytics_storage: value === "accepted" ? "granted" : "denied" });
  };

  return <>{children}{measurementId && analyticsEnabled && <AnalyticsScripts measurementId={measurementId} onReady={() => setTagReady(true)} />}{measurementId && consent === null && <ConsentBanner onChoose={updateConsent} />}{measurementId && consent !== null && <ConsentSettings onChoose={updateConsent} />}</>;
}

function ConsentBanner({ onChoose }: { onChoose: (value: Exclude<Consent, null>) => void }) {
  return <aside className="fixed inset-x-4 bottom-4 z-50 border border-black/15 bg-[var(--paper)] p-5 shadow-lg md:inset-x-auto md:right-6 md:max-w-md" aria-label="Analytics consent"><p className="eyebrow">Privacy / Analytics</p><p className="mt-3 text-sm leading-6 text-black/65">SignalSmith uses privacy-conscious Google Analytics to understand site usage. No fingerprinting or User-ID is used.</p><div className="mt-4 flex gap-4"><button type="button" className="cta border border-black/25 px-4 py-3 hover:border-black" onClick={() => onChoose("accepted")}>Accept analytics</button><button type="button" className="cta px-2 py-3 text-black/55 hover:text-black" onClick={() => onChoose("rejected")}>Reject</button></div></aside>;
}

function ConsentSettings({ onChoose }: { onChoose: (value: Exclude<Consent, null>) => void }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return <button type="button" className="fixed bottom-4 left-4 z-40 cta border border-black/20 bg-[var(--paper)] px-3 py-2 text-black/55 hover:text-black" onClick={() => setOpen(true)} aria-label="Manage analytics preferences">Privacy preferences</button>;
  }

  return <aside className="fixed inset-x-4 bottom-4 z-50 border border-black/15 bg-[var(--paper)] p-5 shadow-lg md:inset-x-auto md:left-6 md:max-w-md" aria-label="Manage analytics preferences">
    <p className="eyebrow">Privacy / Analytics</p>
    <p className="mt-3 text-sm leading-6 text-black/65">Choose whether SignalSmith may use Google Analytics to understand site usage. Your choice is stored on this device.</p>
    <div className="mt-4 flex flex-wrap gap-4">
      <button type="button" className="cta border border-black/25 px-4 py-3 hover:border-black" onClick={() => onChoose("accepted")}>Accept analytics</button>
      <button type="button" className="cta px-2 py-3 text-black/55 hover:text-black" onClick={() => onChoose("rejected")}>Reject analytics</button>
    </div>
  </aside>;
}
