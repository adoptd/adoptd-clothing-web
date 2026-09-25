import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // --- 1. Product Categories (WooCommerce -> Next.js) ---
      { source: '/product-category/t-shirts', destination: '/shop/tee-shirts', permanent: true },
      { source: '/product-category/hoodies', destination: '/shop/christian-hoodies-uk', permanent: true },
      { source: '/product-category/tote-bags', destination: '/shop/christian-bags', permanent: true },
      { source: '/product-category/christian-apparel', destination: '/shop', permanent: true },
      { source: '/product-category/blaze-city', destination: '/shop', permanent: true },
      { source: '/product-category/uncategorized', destination: '/shop', permanent: true },
      { source: '/product-category/:slug', destination: '/shop/:slug', permanent: true },

      // --- 2. Nested Old Product URLs (/shop/category/product-slug -> /product/product-slug) ---
      { source: '/shop/blaze-city/:slug', destination: '/product/:slug', permanent: true },
      { source: '/shop/christian-apparel/:slug', destination: '/product/:slug', permanent: true },
      { source: '/shop/tote-bags/:slug', destination: '/product/:slug', permanent: true },
      { source: '/shop/uncategorized/:slug', destination: '/product/:slug', permanent: true },

      // --- 3. Old WordPress Standalone Pages ---
      { source: '/support', destination: '/church-print-services', permanent: true },
      { source: '/my-account', destination: '/checkout', permanent: true },
      { source: '/cart', destination: '/checkout', permanent: true },
      { source: '/about', destination: '/', permanent: true },
      { source: '/contact', destination: '/church-print-services', permanent: true },

      // --- 4. Old Blog Categories & Post URLs ---
      { source: '/category/:slug*', destination: '/blog', permanent: true },
      { source: '/how-adoptd-clothing-came-about-a-faith-based-clothing-brand-built-on-trust-in-god', destination: '/blog', permanent: true },
      { source: '/adopted-by-god-the-meaning-behind-the-name-adoptd', destination: '/blog', permanent: true },
      { source: '/called', destination: '/blog', permanent: true },
      { source: '/faith-based-clothing-share-the-gospel-uk', destination: '/blog', permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "*.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "v5.airtableusercontent.com",
      },
      {
        protocol: "https",
        hostname: "dl.airtable.com",
      },
      {
        protocol: "https",
        hostname: "**.airtable.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "adoptdchristianclothing.co.uk",
      },
    ],
  },
};

export default nextConfig;
