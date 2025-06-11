/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "media.craiyon.com",
      "m.media-amazon.com",
      "static1.colliderimages.com", // ✅ Add this line
    ],
  },
};

module.exports = nextConfig;
