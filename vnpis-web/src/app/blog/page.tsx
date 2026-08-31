export const dynamicParams = true;
import React from 'react';
import { BookOpen, Sparkles, ShieldCheck, Printer, Tag } from 'lucide-react';
import BlogList from '@/components/BlogList';
import { getAllDocumentsMeta } from '@/lib/mdx';

export const metadata = {
  title: 'Thư Viện Bài Viết SEO & Kiến Thức In Ấn | In Tampon Giá Rẻ, In Lụa Giá Rẻ VNPIS',
  description: 'Tổng hợp kiến thức kỹ thuật & báo giá gia công in tampon giá rẻ, in lụa giá rẻ, vật tư in tampon, vật tư in lụa chính hãng tại TP.HCM. Công ty TNHH VNPIS.',
  alternates: {
    canonical: 'https://vnpis.com/blog',
  },
};

export default function BlogIndex() {
  const blogData = getAllDocumentsMeta('articles');
  
  return (
    <main className="min-h-screen pt-28 pb-20 bg-slate-50 font-sans">
      {/* Hero Header */}
      <section className="bg-slate-900 text-white py-16 mb-12 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 relative z-10 max-w-5xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-bold border border-blue-500/30 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-400" /> Thư Viện Kiến Thức SEO Kỹ Thuật In VNPIS
          </div>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Kinh Nghiệm &amp; Báo Giá <span className="text-blue-400">In Tampon Giá Rẻ</span>, <span className="text-emerald-400">In Lụa Giá Rẻ</span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Cập nhật bài viết chuyên sâu về kỹ thuật gia công in tampon, in lụa bao bì, in QR code và hướng dẫn lựa chọn <strong>vật tư in tampon</strong> (đầu silicon, bản thép cliché) &amp; <strong>vật tư in lụa</strong> (khung lụa, dao gạt, mực in) chất lượng cao.
          </p>

          {/* Quick Keywords Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-xs font-semibold text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl text-blue-300">#In Tampon Giá Rẻ</span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl text-emerald-300">#In Lụa Giá Rẻ</span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl text-orange-300">#Vật Tư In Tampon</span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl text-teal-300">#Vật Tư In Lụa</span>
            <span className="bg-slate-800 border border-slate-700 px-3 py-1 rounded-xl text-purple-300">#In QR Code Biến Đổi</span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 max-w-7xl">
        <BlogList initialData={blogData} />
      </div>
    </main>
  );
}
