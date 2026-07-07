import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ContactForm from '@/components/lead-gen/ContactForm';
import blogData from '@/data/blog-posts.json';

// Generate static params for all 70 posts at build time
export function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Not Found' };
  
  return {
    title: `${post.title} | VNPIS`,
    description: post.desc,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogData.find((p) => p.slug === params.slug);
  
  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen pt-24 pb-16 bg-white">
      <article className="container mx-auto px-4 max-w-4xl">
        <Link href="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại danh sách
        </Link>
        
        <div className="mb-10">
          <div className="flex gap-3 mb-6">
            <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold border border-orange-200">
              {post.type}
            </span>
            <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold border border-slate-200">
              Mã: {post.code}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">
            {post.desc}
          </p>

          <div className="w-full aspect-video bg-slate-100 rounded-2xl overflow-hidden mb-12 shadow-lg">
            {post.mediaExt === 'mp4' && post.slug !== 'giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01' && post.slug !== 'muc-in-day-cap-trang-linx-videojet' ? (
              <video src={`/media/blog/${post.slug}.mp4`} autoPlay loop muted playsInline className="w-full h-full object-cover" />
            ) : post.mediaExt === 'jpg' ? (
              <img src={`/media/blog/${post.slug}.jpg`} alt={post.title} className="w-full h-full object-cover" />
            ) : (
               <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400">
                  Ảnh / Video minh họa
               </div>
            )}
          </div>
        </div>

        <div className="prose prose-lg max-w-none text-slate-700 mb-16">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
          ) : (
            <p>Nội dung chi tiết đang được cập nhật. Vui lòng liên hệ với VNPIS để được tư vấn trực tiếp về giải pháp này.</p>
          )}
          
          <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-0">Tại sao chọn mực in VNPIS?</h3>
            <ul className="space-y-3 mb-0 list-none pl-0">
              <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Cung cấp hàng trăm mã mực đa dạng (CIJ, TIJ, DOD, UV).</li>
              <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Nhập khẩu trực tiếp từ nhà máy sản xuất (HongKong, Trung Quốc, Mỹ).</li>
              <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Đầy đủ chứng nhận an toàn quốc tế (RoHS, Halogen-Free, FDA).</li>
              <li className="flex items-center"><CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 shrink-0" /> Kỹ sư trực tiếp đến nhà máy thử mẫu miễn phí trên dây chuyền.</li>
            </ul>
          </div>
        </div>

        <hr className="border-slate-200 mb-16" />
        
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Nhận Mẫu Thử Miễn Phí</h2>
            <p className="text-slate-600">Điền form dưới đây để yêu cầu kỹ sư VNPIS mang mực in đến chạy thử trực tiếp tại nhà máy của bạn.</p>
          </div>
          <ContactForm />
        </div>
      </article>
    </main>
  );
}
