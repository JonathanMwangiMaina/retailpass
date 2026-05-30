import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Explicitly disable App Router experimental features
  experimental: {},
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Suppress webpack warnings for optional dependencies
  webpack: (config, { isServer }) => {
    // Ignore OpenTelemetry optional dependencies
    config.ignoreWarnings = [
      { module: /node_modules\/@opentelemetry\/sdk-node/ },
      { module: /node_modules\/handlebars/ },
    ];

    return config;
  },
};

export default nextConfig;
