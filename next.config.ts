
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  serverActions: {
    bodySizeLimit: '2mb',
    serverActionsBodySizeLimit: '2mb',
  },
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
      {
        protocol: 'https',
        hostname: 'us-west-2.graphassets.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      }
    ],
  },
  webpack: (config, { isServer }) => {
    // Fix for 'async_hooks' module not found error
    if (!isServer) {
        config.resolve.fallback = {
            ...config.resolve.fallback,
            async_hooks: false,
        };
    }

    return config;
  },
};

export default nextConfig;
