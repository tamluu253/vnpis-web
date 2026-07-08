import { MetadataRoute } from 'next';
import blogData from '@/data/blog-posts.json';

const DOMAIN = 'https://vnpis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogData.map((post) => ({
    url: `${DOMAIN}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const coreHubs = [
    '/solutions/uv-single-pass-printing',
    '/solutions/pad-printing',
    '/solutions/screen-printing',
    '/solutions/industrial-coding',
    '/solutions/variable-data-printing',
    '/products/industrial-ink',
    '/products/cij-printers',
    '/products/tij-printers',
    '/products/consumables',
    '/services/machine-rental',
    '/services/machine-repair',
    '/services/screen-printing-service',
    '/services/color-management',
    '/videos',
    '/faq'
  ];

  const hubEntries: MetadataRoute.Sitemap = coreHubs.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // high priority for hub pages
  }));

  return [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...hubEntries,
    ...blogEntries,
  ];
}
