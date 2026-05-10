/** @type {import('next').NextConfig} */
const isExport = process.env.USE_EXPORT === 'true';

const nextConfig = {
  reactStrictMode: true,
  ...(isExport && {
    output: 'export',
    basePath: '/PI---FRONT',
    assetPrefix: '/PI---FRONT/',
  }),
};

module.exports = nextConfig;