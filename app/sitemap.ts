import type { MetadataRoute } from "next";
import { ORIGIN, PAGES } from "./site-config";

// URLs must be absolute; metadataBase doesn't apply here. No lastModified: the
// pages carry no real edit dates, and a build time would tell crawlers every
// page changed on every deploy.
export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map(({ href }) => ({ url: new URL(href, ORIGIN).href }));
}
