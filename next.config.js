/** @type {import('next').NextConfig} */
const nextConfig = {
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
