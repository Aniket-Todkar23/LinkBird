/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'lh3.googleusercontent.com'],
  },
  devIndicators: {
    buildActivity: false, // hides the build indicator bar
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
    nextScriptWorkers: false,
    nextDevtools: false, // disables Next.js devtools overlay in dev
  },
}

export default nextConfig;
