import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText } from 'lucide-react';
import blogData from '@/data/blog-posts.json';

export const metadata = {
  title: 'Blog Kiến Thức In Phun Công Nghiệp | VNPIS',
  description: 'Tổng hợp các bài viết chuyên sâu về mực in, giải pháp in phun công nghiệp CIJ, TIJ, DOD và các ứng dụng thực tế.',
};

export default function BlogIndex() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-4">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold">
            <FileText className="w-5 h-5" />
            <span>Blog & Tin Tức Ngành</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Giải Pháp & Kiến Thức In Phun Công Nghiệp</h1>
          <p className="text-lg text-slate-600">
            Khám phá thư viện {blogData.length}+ bài viết chuyên sâu và giải pháp kỹ thuật in phun đặc biệt của VNPIS.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((article, index) => (
            <Link key={index} href={`/blog/${article.slug}`} className="group block bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden flex flex-col h-full">
              <div className="relative aspect-video bg-slate-100 overflow-hidden">
                {article.mediaExt === 'mp4' && article.slug !== 'giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01' && article.slug !== 'muc-in-day-cap-trang-linx-videojet' ? (
                  <video src={`/media/blog/${article.slug}.mp4`} muted loop playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-slate-900 group-hover:scale-105 transition-transform duration-500">
                     <span className="text-4xl font-bold text-white opacity-20">{article.code}</span>
                     {article.mediaExt === 'jpg' && <img src={`/media/blog/${article.slug}.jpg`} alt={article.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />}
                  </div>
                )}
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-md">{article.type}</span>
                  <span className="bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2.5 py-1 rounded-md">{article.code}</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h2 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-grow">
                  {article.desc}
                </p>
                <div className="flex items-center text-blue-600 font-semibold text-sm mt-auto">
                  Xem chi tiết <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}
