import { MetadataRoute } from 'next';
import { getAllSlugs } from '@/lib/mdx';

const DOMAIN = 'https://vnpis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleSlugs = getAllSlugs('articles');
  const pillarSlugs = getAllSlugs('pillars');

  const blogEntries: MetadataRoute.Sitemap = articleSlugs.map((slug: string) => ({
    url: `${DOMAIN}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const pillarEntries: MetadataRoute.Sitemap = pillarSlugs.map((slug: string) => ({
    url: `${DOMAIN}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const coreServices = [
    '/in-tampon',
    '/in-lua',
    '/muc-in-cij',
    '/tij',
    '/in-ky-thuat-so',
    '/about',
    '/contact',
    '/faq'
  ];

  const serviceEntries: MetadataRoute.Sitemap = coreServices.map((path) => ({
    url: `${DOMAIN}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
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
    ...serviceEntries,
    ...pillarEntries,
    ...blogEntries,
  ];
}

