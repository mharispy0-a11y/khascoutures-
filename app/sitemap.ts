import type { MetadataRoute } from "next";

const BASE_URL = "https://splendorous-daffodil-c9b791.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/collections`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/gallery`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const collectionAnchors: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/collections#bridal`, lastModified: new Date(), priority: 0.85 },
    { url: `${BASE_URL}/collections#party`, lastModified: new Date(), priority: 0.8 },
    { url: `${BASE_URL}/collections#pret`, lastModified: new Date(), priority: 0.75 },
  ];

  return [...staticRoutes, ...collectionAnchors];
}
