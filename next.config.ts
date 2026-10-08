import type { NextConfig } from "next";
import { ORIGIN } from "./app/site-config";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www.lcsc.ca reaches this Worker as its own custom domain (wrangler.jsonc),
      // so send it to the apex instead of serving a duplicate site. vinext drops
      // the query on cross-origin redirects; the site reads none.
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lcsc.ca" }],
        destination: `${ORIGIN}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
