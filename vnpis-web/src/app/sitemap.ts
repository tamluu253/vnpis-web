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
    '/products',
    '/products/printheads',
    '/products/printheads/brother-gtx',
    '/services',
    '/solutions',
    '/in-tampon',
    '/in-lua',
    '/muc-in-cij',
    '/tij',
    '/in-ky-thuat-so',
    '/products/pad-printers',
    '/products/pad-printers/hj',
    '/products/pad-printers/sj',
    '/products/pad-printers/mc',
    '/products/screen-printers',
    '/products/screen-printers/hj',
    '/products/screen-printers/sj',
    '/products/hot-stamping',
    '/products/hot-stamping/sj',
    '/products/consumables',
    '/products/consumables/coc-muc-vong-gat-muc',
    '/products/consumables/muc-in',
    '/products/consumables/dau-in-silicone',
    '/products/consumables/khuon-in',
    '/products/consumables/phu-gia-dung-moi',
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

  const allEntries: MetadataRoute.Sitemap = [
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

  // Deduplicate entries by URL to ensure pristine crawl graph
  const seenUrls = new Set<string>();
  const uniqueEntries: MetadataRoute.Sitemap = [];

  for (const entry of allEntries) {
    if (!seenUrls.has(entry.url)) {
      seenUrls.add(entry.url);
      uniqueEntries.push(entry);
    }
  }

  return uniqueEntries;
}
