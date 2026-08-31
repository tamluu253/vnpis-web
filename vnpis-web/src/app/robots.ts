import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/vnpis-analytics-dashboard', '/private/'],
    },
    sitemap: 'https://vnpis.com/sitemap.xml',
  };
}
