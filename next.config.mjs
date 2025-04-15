/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.jp' },
      { protocol: 'https', hostname: 'images.microcms-assets.io' },
      { protocol: 'https', hostname: 'example.com' },
      {
        protocol: 'https',
        hostname: 'hjjqozexcbjylkoonwkg.supabase.co', // ✅ Supabase のホスト名を追加
        pathname: '/storage/v1/object/public/**',       // ✅ パスパターンも指定
      },
    ],
  },
}

export default nextConfig;
