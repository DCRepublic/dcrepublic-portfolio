
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "damianrene.dev" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  output: "export", // Replaces output: 'standalone'
}

export default nextConfig
