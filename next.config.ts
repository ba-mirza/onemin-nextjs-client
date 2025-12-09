import type { NextConfig } from "next";

const isMobileBuild = process.env.NEXT_PUBLIC_MOBILE === "true";

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eysbvuebtdwqhpswiths.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: isMobileBuild
    ? undefined
    : {
        serverActions: {
          bodySizeLimit: "3mb",
        },
      },
  reactStrictMode: true,
  output: isMobileBuild ? "export" : undefined,
  trailingSlash: isMobileBuild ? true : false,
};

export default nextConfig;
