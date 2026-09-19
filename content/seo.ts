import type { Metadata } from "next";

export function futureMetadata(name: string): Metadata {
  return {
    title: `${name} — SignalSmith`,
    robots: { index: false, follow: true },
  };
}
