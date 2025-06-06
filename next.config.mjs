/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // During build, ignore TypeScript errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // During build, ignore ESLint errors
    ignoreDuringBuilds: true,
  },
  webpack: (config, { isServer }) => {
    // Handle specific modules that might cause issues during build
    if (isServer) {
      config.externals = [...config.externals, 'pg', 'sqlite3', 'tedious', 'pg-hstore'];
    }
    return config;
  },
  // Explicitly set the output to be standalone
  output: 'standalone',
};

export default nextConfig;

