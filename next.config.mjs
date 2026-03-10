/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "c.pxhere.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "www.sakshi.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s7ap1.scene7.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media.licdn.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "framerusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "rmgoe.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "5.imimg.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.imimg.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
