const nextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  ...(process.env.NODE_ENV === 'production' ? { output: 'export' } : {}),
};

export default nextConfig;
