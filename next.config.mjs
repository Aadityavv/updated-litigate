/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      MONGODB_URI: process.env.MONGODB_URI, // MongoDB connection string
    },
    reactStrictMode: true, // Enables React strict mode for better debugging
    swcMinify: true, // Enables faster SWC compiler-based minification
    eslint: {
      dirs: ["pages", "components", "lib", "api"], // Lint only specified directories
    },
    async redirects() {
      return [
        {
          source: "/old-route",
          destination: "/new-route",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;
  