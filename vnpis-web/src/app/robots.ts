import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/vnpis-analytics-dashboard', '/private/', '/dbg', '/hrm', '/pos', '/api/'],
    },
    sitemap: 'https://vnpis.com/sitemap.xml',
  };
}
