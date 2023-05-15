/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "assets.example.com",
      "avatars.githubusercontent.com",
      "images.pexels.com",
      "www.pexels.com",
      "media.istockphoto.com",
      "www.thestreet.com",
      "www.joblo.com"
    ],
  },
};
module.exports = nextConfig;
