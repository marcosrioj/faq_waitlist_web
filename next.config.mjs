/** @type {import('next').NextConfig} */
const rawBasePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? "")
  .trim()
  .replace(/^['"]|['"]$/g, "");
const normalizedBasePath =
  rawBasePath === "/" ? "" : rawBasePath.replace(/\/$/, "");
const basePath =
  normalizedBasePath && !normalizedBasePath.startsWith("/")
    ? `/${normalizedBasePath}`
    : normalizedBasePath;
const isStaticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "true";

const nextConfig = {
  reactStrictMode: true,
  ...(isStaticExport ? { output: "export", trailingSlash: true } : {}),
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: isStaticExport
  }
};

export default nextConfig;
