import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  staticPageGenerationTimeout: 180,
  outputFileTracingIncludes: {
    '/**': ['./content/**/*', './vnpis-web/content/**/*'],
  },
  outputFileTracingRoot: process.cwd(),
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
        source: '/sitemap.html',
        destination: '/sitemap.xml',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
