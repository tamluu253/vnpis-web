export const dynamicParams = true;

import { BlogPostContainer } from '@/app/blog/[slug]/page';
import { getAllSlugs, getDocumentMetadataBySlug } from '@/lib/mdx';

export function generateStaticParams() {
  const pillarSlugs = getAllSlugs('pillars');
  return pillarSlugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugs = getAllSlugs('pillars');
  if (!slugs.includes(resolvedParams.slug)) {
    return { title: 'Not Found' };
  }
  
  const meta = getDocumentMetadataBySlug('pillars', resolvedParams.slug);
  if (!meta) return { title: 'Not Found' };
  
  const isDraft = meta.draft === true || meta.status === 'draft';
  
  return {
    title: `${meta.title} | VNPIS - Giải Pháp In Ấn Công Nghiệp Toàn Diện`,
    description: meta.description,
    alternates: {
      canonical: meta.canonical || `https://vnpis.com/${resolvedParams.slug}`,
    },
    ...(isDraft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function PillarPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogPostContainer slug={resolvedParams.slug} contentType="pillars" />;
}
