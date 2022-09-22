/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        domains: ['fypaesthetics.s3.ap-south-1.amazonaws.com'],
    },
    swcMinify: true,
    reactStrictMode: true,
    eslint: {
        ignoreDuringBuilds: true,
    },
};
