import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lf-web-assets.tokopedia-static.net",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;