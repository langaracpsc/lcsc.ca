import type { MetadataRoute } from "next";
import { ORIGIN } from "./site-config";

// The sitemap line must be an absolute URL; metadataBase doesn't apply here.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${ORIGIN}/sitemap.xml`,
  };
}
