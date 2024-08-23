/** @type {import('next').NextConfig} */
const nextConfig = {
  publicRuntimeConfig: {
    openaiApiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  },
};

export default nextConfig;
