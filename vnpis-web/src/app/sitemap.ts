import { MetadataRoute } from 'next';
import { getAllSlugs, getDocumentMetadataBySlug } from '@/lib/mdx';

const DOMAIN = 'https://vnpis.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const articleSlugs = getAllSlugs('articles');
  const pillarSlugs = getAllSlugs('pillars');

  const blogEntries: MetadataRoute.Sitemap = articleSlugs
    .filter((slug) => {
      const meta = getDocumentMetadataBySlug<any>('articles', slug);
      return meta && meta.draft !== true && meta.status !== 'draft';
    })
    .map((slug: string) => ({
      url: `${DOMAIN}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const pillarEntries: MetadataRoute.Sitemap = pillarSlugs
    .filter((slug) => {
      const meta = getDocumentMetadataBySlug<any>('pillars', slug);
      return meta && meta.draft !== true && meta.status !== 'draft';
    })
    .map((slug: string) => ({
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
    '/so-tay-in-pad',
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
