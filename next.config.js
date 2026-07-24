
const nextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "damianrene.dev" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
    allowedDevOrigins: ['192.168.2.0/24'],
  output: "export", // Replaces output: 'standalone'
}

export default nextConfig
