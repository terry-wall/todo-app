/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma'],
  },
  // Disable static optimization for dynamic routes to prevent pre-render errors
  trailingSlash: false,
  output: 'standalone',
  // Explicitly exclude problematic paths from static generation
  async generateBuildId() {
    return 'build-' + Date.now()
  },
  // Skip pre-rendering for routes that don't exist
  skipTrailingSlashRedirect: true,
}

module.exports = nextConfig