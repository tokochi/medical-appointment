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
        hostname: "imagecdn.med.ovh",
      },
      {
        protocol: "https",
        hostname: "addalile.com",
      },
      {
        protocol: "https",
        hostname: "firebasestorage.googleapis.com",
      },
      {
        protocol: "https",
        hostname: "sehatitaji.com",
      },
      {
        protocol: "https",
        hostname: "www.sehatitaji.com",
      },
      {
        protocol: "https",
        hostname: "www.med.tn",
      },
    ],
  },
};

module.exports = nextConfig
