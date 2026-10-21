import type { MetadataRoute } from "next";
import { getCategories, getPublishedMasala, getScholars } from "@/lib/firebase/reads";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://masael24.com").replace(/\/$/, "");
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/categories`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${baseUrl}/scholars`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/ask`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  try {
    const [categories, masala, scholars] = await Promise.all([
      getCategories(),
      getPublishedMasala(1000),
      getScholars(),
    ]);
    const categoryPages = categories.map((item) => ({
      url: `${baseUrl}/categories/${item.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
    const masalaPages = masala.map((item) => ({
      url: `${baseUrl}/masala/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
    const scholarPages = scholars.map((item) => ({
      url: `${baseUrl}/scholars/${item.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));
    return [...staticPages, ...categoryPages, ...masalaPages, ...scholarPages];
  } catch {
    // Keep core public URLs available if the content service is temporarily unavailable.
    return staticPages;
  }
}
