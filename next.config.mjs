/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bullmanequipment.com", "erp.bullman.fr"],
  },
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.html$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
