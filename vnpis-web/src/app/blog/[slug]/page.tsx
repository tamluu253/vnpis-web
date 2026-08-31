import React from 'react';
import { ArrowLeft, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllSlugs, getDocumentBySlug, getDocumentMetadataBySlug } from '@/lib/mdx';
import ConsultationForm from '@/components/ui/ConsultationForm';
import ArticleContactCTA from '@/components/ArticleContactCTA';

export const dynamicParams = true;

// Generate static params for all posts at build time
export function generateStaticParams() {
  const slugs = getAllSlugs('articles');
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const slugs = getAllSlugs('articles');
  if (!slugs.includes(resolvedParams.slug)) {
    return { title: 'Not Found' };
  }
  
  const meta = getDocumentMetadataBySlug('articles', resolvedParams.slug);
  if (!meta) return { title: 'Not Found' };
  
  const isDraft = meta.draft === true || meta.status === 'draft';
  
  return {
    title: `${meta.title} | VNPIS - Industrial Printing Solutions`,
    description: meta.description,
    alternates: {
      canonical: meta.canonical || `https://vnpis.com/blog/${resolvedParams.slug}`,
    },
    ...(isDraft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogPostContainer slug={resolvedParams.slug} contentType="articles" />;
}

export async function BlogPostContainer({ 
  slug, 
  contentType 
}: { 
  slug: string; 
  contentType: 'articles' | 'pillars'; 
}) {
  const slugs = getAllSlugs(contentType);
  if (!slugs.includes(slug)) {
    notFound();
  }

  const post = await getDocumentBySlug(contentType, slug);
  if (!post) {
    notFound();
  }

  const { metadata, contentHtml } = post;
  const hasDedicatedMedia = Boolean(metadata.mediaExt || metadata.image);
  
  const pageUrl = contentType === 'articles' ? `https://vnpis.com/blog/${slug}` : `https://vnpis.com/${slug}`;

  return (
    <main className="min-h-screen pt-28 pb-16 bg-slate-50 font-sans">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link href={contentType === 'articles' ? '/blog' : '/'} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-extrabold mb-8 transition-colors text-sm">
          <ArrowLeft className="w-4 h-4 mr-2" /> {contentType === 'articles' ? 'Quay lại thư viện bài viết' : 'Quay lại trang chủ'}
        </Link>
        
        <div className="mb-10">
          <div className="flex flex-wrap gap-2.5 mb-6">
            <span className="bg-blue-600 text-white px-3.5 py-1.5 rounded-xl text-xs font-extrabold shadow-sm uppercase tracking-wider">
              {metadata.category || (contentType === 'articles' ? 'KIẾN THỨC IN ẤN' : 'GIẢI PHÁP IN')}
            </span>
            {metadata.code && !metadata.code.startsWith('WEEK') && (
              <span className="bg-slate-200 text-slate-700 px-3.5 py-1.5 rounded-xl text-xs font-bold border border-slate-300">
                {metadata.code}
              </span>
            )}
            <span className="bg-slate-100 text-slate-600 px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-blue-600" /> 5 phút đọc
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            {metadata.title}
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed font-medium">
            {metadata.description}
          </p>

          {hasDedicatedMedia && (
            <div className="w-full aspect-video bg-slate-900 rounded-3xl overflow-hidden mb-12 shadow-xl relative flex items-center justify-center border border-slate-200">
              {metadata.mediaExt === 'mp4' && metadata.slug !== 'giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01' && metadata.slug !== 'muc-in-day-cap-trang-linx-videojet' ? (
                <video src={`/media/blog/${metadata.slug}.mp4`} autoPlay loop muted playsInline className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full relative">
                  <img 
                    src={metadata.image || `/media/blog/${metadata.slug}.${metadata.mediaExt}`} 
                    alt={metadata.title} 
                    className="w-full h-full object-cover opacity-90" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* MAIN ARTICLE CONTENT */}
        <div className="prose prose-lg max-w-none text-slate-700 mb-12 leading-relaxed">
          {contentHtml ? (
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          ) : (
            <p>Nội dung chi tiết đang được cập nhật. Vui lòng liên hệ với Xưởng In VNPIS để được tư vấn trực tiếp về giải pháp này.</p>
          )}
        </div>

        {/* MID/END ARTICLE CTA BANNER FOR HOTLINE 0987 453 866 / ZALO / WHATSAPP */}
        <ArticleContactCTA title={metadata.title} slug={metadata.slug} />

        <div className="mt-12 bg-blue-50/90 border border-blue-200 rounded-3xl p-8 mb-16 shadow-sm">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-4 mt-0">Tại sao chọn dịch vụ gia công in ấn VNPIS?</h3>
          <ul className="space-y-3 mb-0 list-none pl-0">
            <li className="flex items-center text-slate-700 text-sm md:text-base font-semibold"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Gia công in Tampon, in Lụa, in KTS sắc nét, bám dính pass test 3M.</li>
            <li className="flex items-center text-slate-700 text-sm md:text-base font-semibold"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Cung cấp đầy đủ vật tư mực in Henkey/Dubuit, đầu silicon, bản thép cliché chính hãng.</li>
            <li className="flex items-center text-slate-700 text-sm md:text-base font-semibold"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Kỹ thuật hỗ trợ in mẫu thử (sample test) miễn phí tận nơi trước khi chốt đơn hàng.</li>
            <li className="flex items-center text-slate-700 text-sm md:text-base font-semibold"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Xưởng in tại TP.HCM công suất 50.000+ sản phẩm/ngày, đáp ứng giao hàng gấp.</li>
          </ul>
        </div>

        <hr className="border-slate-200 mb-16" />
        
        <div className="max-w-4xl mx-auto">
          <ConsultationForm
            title="Nhận Báo Giá In Gia Công &amp; In Mẫu Thử Miễn Phí"
            subtitle="Đội ngũ kỹ sư Công ty TNHH VNPIS sẽ tiếp nhận sản phẩm, in mẫu thử và báo giá tốt nhất cho anh/chị."
            pageTitle={`${contentType === 'articles' ? 'Blog' : 'Pillar'}: ${metadata.title}`}
          />
        </div>
      </article>

      {/* SCHEMA MARKUP */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": metadata.title,
            "description": metadata.description,
            "image": metadata.image || (hasDedicatedMedia ? `https://vnpis.com/media/blog/${metadata.slug}.${metadata.mediaExt}` : 'https://vnpis.com/vnpis-logo.png'),
            "author": {
              "@type": "Organization",
              "name": "Công ty TNHH VNPIS"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Công ty TNHH VNPIS",
              "logo": {
                "@type": "ImageObject",
                "url": "https://vnpis.com/vnpis-logo.png"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": pageUrl
            }
          })
        }}
      />
    </main>
  );
}
