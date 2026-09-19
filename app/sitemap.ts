import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://signalsmith.online/", changeFrequency: "monthly", priority: 1 },
    { url: "https://signalsmith.online/casebook", changeFrequency: "monthly", priority: 0.9 },
    { url: "https://signalsmith.online/privacy", changeFrequency: "yearly", priority: 0.3 },
  ];
}
