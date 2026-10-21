import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://masael24.com").replace(/\/$/, "");
  const now = new Date();
  return [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/scholars`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ask`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];
}
