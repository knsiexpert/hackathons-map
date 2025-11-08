/** @type {import('next').NextConfig} */
const repoName = 'hackathons-calendar'
// Sprawdź czy to development mode (npm run dev)
const isDev = process.argv.includes('dev')

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export',
  // basePath i assetPrefix dla GitHub Pages (nie używaj podczas dev)
  basePath: isDev ? '' : `/${repoName}`,
  assetPrefix: isDev ? '' : `/${repoName}/`,
}

export default nextConfig
