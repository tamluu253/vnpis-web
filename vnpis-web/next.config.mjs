import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  turbopack: {
    root: path.join(process.cwd(), '..'),
  },
  staticPageGenerationTimeout: 180,
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  outputFileTracingRoot: path.join(process.cwd(), '..'),
  async redirects() {
    return [
      {
        source: '/products/consumables/inks',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/in-tampon/hj',
        destination: '/products/pad-printers/hj',
        permanent: true,
      },
      {
        source: '/in-tampon/mc',
        destination: '/products/pad-printers/mc',
        permanent: true,
      },
      {
        source: '/kien-thuc/index',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/kien-thuc/index.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/in-tampon-gia-re',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/products/pad-printing',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/in-lua-gia-re',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/bai-viet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/dich-vu.html',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/quy-trinh.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vat-tu.html',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/chinh-sach.html',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/gioi-thieu.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/lien-he.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/dich-vu-in-gia-cong-xua-chua-cai-tien-may.html',
        destination: '/dich-vu-in-gia-cong',
        permanent: true,
      },
      {
        source: '/dich-vu-in-gia-cong-sua-chua-cai-tien-may.html',
        destination: '/dich-vu-in-gia-cong',
        permanent: true,
      },
      {
        source: '/in-qr-cho-nha-may.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/giai-phap-in-du-lieu-bien-doi.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/in-du-lieu-bien-doi.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/muc-in-ohuyen-du-lieu-bien-doi-single-pass-ink/:path*',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-ohuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink/:path*',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun/:path*',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/mayin-phun-cong-nghiep/:path*',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/mayin-phun-cong-nghiep',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
