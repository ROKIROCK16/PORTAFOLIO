import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: a sibling lockfile exists one level up.
  turbopack: { root: path.join(__dirname) },
};

export default nextConfig;
