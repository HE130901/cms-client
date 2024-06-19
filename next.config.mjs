/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(mp4|webm|ogg|swf|ogv)$/,
      use: {
        loader: "file-loader",
        options: {
          publicPath: "/_next/static/videos",
          outputPath: "static/videos",
          name: "[name].[hash].[ext]",
        },
      },
    });

    return config;
  },
  images: {
    domains: ["i.ibb.co"], // Add the domains of the external images you are using
  },
};

export default nextConfig;
