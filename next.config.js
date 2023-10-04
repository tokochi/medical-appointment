/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   serverComponentsExternalPackages: ['mongoose', 'mongodb', 'bcrypt'],
  // },
  webpack: (config) => {
    config.externals = [...config.externals, 'bcrypt'," moment", 'mongoose', 'mongodb'];
       return config;
     },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

module.exports = nextConfig
