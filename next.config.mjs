import { withVercelPrisma } from '@vercel/next';

/** @type {import('next').NextConfig} */
const nextConfig = withVercelPrisma({
  // Your existing config can go here
});

export default nextConfig;
