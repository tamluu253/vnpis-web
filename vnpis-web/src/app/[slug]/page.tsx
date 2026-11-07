export const dynamicParams = true;

import { notFound, permanentRedirect } from 'next/navigation';
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
  const pillarSlugs = getAllSlugs('pillars');
  
  if (pillarSlugs.includes(resolvedParams.slug)) {
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

  const articleSlugs = getAllSlugs('articles');
  if (articleSlugs.includes(resolvedParams.slug)) {
    permanentRedirect(`/blog/${resolvedParams.slug}`);
  }

  return { title: 'Not Found' };
}

export default async function PillarPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const pillarSlugs = getAllSlugs('pillars');
  
  if (pillarSlugs.includes(resolvedParams.slug)) {
    return <BlogPostContainer slug={resolvedParams.slug} contentType="pillars" />;
  }

  const articleSlugs = getAllSlugs('articles');
  if (articleSlugs.includes(resolvedParams.slug)) {
    permanentRedirect(`/blog/${resolvedParams.slug}`);
  }

  notFound();
}
