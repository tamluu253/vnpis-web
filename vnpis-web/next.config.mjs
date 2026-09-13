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
        source: '/solutions/pad-printing',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/services/pad-printing-service',
        destination: '/in-tampon',
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
        source: '/solutions/screen-printing',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/services/screen-printing-service',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/in-lua-gia-re',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/products/screen-printers',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/products/cij-printers',
        destination: '/muc-in-cij',
        permanent: true,
      },
      {
        source: '/products/cij-ink',
        destination: '/muc-in-cij',
        permanent: true,
      },
      {
        source: '/products/cij-inks',
        destination: '/muc-in-cij',
        permanent: true,
      },
      {
        source: '/products/tij-printers',
        destination: '/tij',
        permanent: true,
      },
      {
        source: '/products/tij-ink',
        destination: '/tij',
        permanent: true,
      },
      {
        source: '/products/tij-inks',
        destination: '/tij',
        permanent: true,
      },
      {
        source: '/services/variable-data-printing',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/services/variable-data-service',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/services/qr-printing',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/services/qr-printing-service',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/bai-viet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/bai-viet/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/tin-tuc',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
      {
        source: '/tin-tuc.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/dich-vu.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/quy-trinh.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vat-tu.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/chinh-sach.html',
        destination: '/',
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
        destination: '/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-ohuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink/:path*',
        destination: '/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun/:path*',
        destination: '/vat-tu-in-cong-nghiep',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun',
        destination: '/vat-tu-in-cong-nghiep',
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
        source: '/industries/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/products/pad-printers',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/products/pad-printers/:path*',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/products/screen-printers/:path*',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/products/industrial-ink',
        destination: '/muc-in-cij',
        permanent: true,
      },
      {
        source: '/products/industrial-ink/:path*',
        destination: '/muc-in-cij',
        permanent: true,
      },
      {
        source: '/products/printheads',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/products/printheads/:path*',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/san-pham/:path*',
        destination: '/',
        permanent: true,
      },
      {
        source: '/dich-vu/:path*',
        destination: '/',
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
        source: '/hrm',
        destination: '/',
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
