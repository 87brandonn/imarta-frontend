/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.googleapis.com']
  },
  redirects : () => [
    {
      source : '/admin/cms',
      destination : '/admin/cms/home',
      permanent : true
    },
    {
      source : '/admin/data',
      destination : '/admin/data/work-program',
      permanent : true
    }
  ]
};

module.exports = nextConfig;
