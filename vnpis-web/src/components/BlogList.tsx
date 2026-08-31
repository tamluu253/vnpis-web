"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, Search, Filter, BookOpen, Sparkles, Layers, Tag, ChevronLeft, ChevronRight, Clock, Printer, Cpu, ShieldCheck, Box, Sliders } from 'lucide-react';

function ArticleDynamicCover({ article }: { article: any }) {
  const slug = (article.slug || '').toLowerCase();
  const title = (article.title || '').toLowerCase();

  let gradient = 'from-slate-950 via-slate-900 to-blue-950';
  let accentColor = 'text-blue-400';
  let glowColor = 'bg-blue-500/20';
  let IconComponent = Printer;

  if (slug.includes('tampon') || title.includes('tampon')) {
    gradient = 'from-slate-950 via-blue-950 to-indigo-950';
    accentColor = 'text-blue-400';
    glowColor = 'bg-blue-500/20';
    IconComponent = Printer;
  } else if (slug.includes('lua') || title.includes('lụa')) {
    gradient = 'from-slate-950 via-emerald-950 to-teal-950';
    accentColor = 'text-emerald-400';
    glowColor = 'bg-emerald-500/20';
    IconComponent = Layers;
  } else if (slug.includes('vat-tu') || title.includes('vật tư') || title.includes('đầu silicon') || title.includes('cliche') || title.includes('mực')) {
    gradient = 'from-slate-950 via-amber-950 to-orange-950';
    accentColor = 'text-amber-400';
    glowColor = 'bg-amber-500/20';
    IconComponent = Sliders;
  } else if (slug.includes('qr') || slug.includes('kts') || slug.includes('tij') || slug.includes('cij') || title.includes('qr code')) {
    gradient = 'from-slate-950 via-purple-950 to-violet-950';
    accentColor = 'text-purple-400';
    glowColor = 'bg-purple-500/20';
    IconComponent = Cpu;
  } else {
    gradient = 'from-slate-950 via-slate-900 to-indigo-950';
    accentColor = 'text-cyan-400';
    glowColor = 'bg-cyan-500/20';
    IconComponent = ShieldCheck;
  }

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} relative flex items-center justify-center p-6 group-hover:scale-105 transition-transform duration-500 overflow-hidden`}>
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
      <div className={`absolute -top-12 -right-12 w-40 h-40 ${glowColor} rounded-full blur-2xl pointer-events-none`} />
      <div className="relative z-10 text-center space-y-2">
        <div className={`w-14 h-14 mx-auto rounded-2xl ${glowColor} border border-white/10 flex items-center justify-center backdrop-blur-md shadow-inner`}>
          <IconComponent className={`w-7 h-7 ${accentColor}`} />
        </div>
        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest pt-1">
          VNPIS INDUSTRIAL TECH
        </div>
      </div>
    </div>
  );
}

export default function BlogList({ initialData }: { initialData: any[] }) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  // Key SEO Categories
  const seoCategories = [
    { id: 'ALL', label: 'Tất Cả Bài Viết', badge: 'TẤT CẢ' },
    { id: 'IN_TAMPON', label: 'In Tampon Giá Rẻ', badge: 'IN TAMPON GIÁ RẺ' },
    { id: 'IN_LUA', label: 'In Lụa Giá Rẻ', badge: 'IN LỤA GIÁ RẺ' },
    { id: 'VAT_TU_TAMPON', label: 'Vật Tư In Tampon', badge: 'VẬT TƯ TAMPON' },
    { id: 'VAT_TU_LUA', label: 'Vật Tư In Lụa', badge: 'VẬT TƯ IN LỤA' },
    { id: 'IN_KTS', label: 'In KTS & QR Code', badge: 'IN KTS & QR' },
  ];

  // Helper to categorize articles dynamically
  const getArticleSeoCategory = (item: any): string => {
    const slug = (item.slug || '').toLowerCase();
    const title = (item.title || '').toLowerCase();
    const cat = (item.category || '').toLowerCase();

    if (slug.includes('tampon') || title.includes('tampon') || cat.includes('pad')) {
      if (title.includes('vật tư') || title.includes('đầu silicon') || title.includes('cliche') || title.includes('cốc mực') || title.includes('lưỡi gạt')) {
        return 'VAT_TU_TAMPON';
      }
      return 'IN_TAMPON';
    }

    if (slug.includes('lua') || title.includes('lụa') || cat.includes('screen')) {
      if (title.includes('vật tư') || title.includes('khung') || title.includes('dao gạt') || title.includes('keo chụp') || title.includes('lưới')) {
        return 'VAT_TU_LUA';
      }
      return 'IN_LUA';
    }

    if (slug.includes('vat-tu') || title.includes('vật tư') || title.includes('mực in') || cat.includes('vat-tu')) {
      return 'VAT_TU_TAMPON';
    }

    if (slug.includes('qr') || slug.includes('kts') || slug.includes('tij') || slug.includes('cij') || title.includes('qr code') || title.includes('kỹ thuật số')) {
      return 'IN_KTS';
    }

    return 'IN_TAMPON';
  };

  // Helper to get logical fallback image
  const getTopicImage = (item: any): string => {
    if (item.mediaExt === 'jpg') return `/media/blog/${item.slug}.jpg`;
    
    const cat = getArticleSeoCategory(item);
    if (cat === 'IN_TAMPON' || cat === 'VAT_TU_TAMPON') return '/images/pad-printing-cups.jpg';
    if (cat === 'IN_LUA' || cat === 'VAT_TU_LUA') return '/images/screen-printing-bags.jpg';
    if (cat === 'IN_KTS') return '/images/qr-code-printing.jpg';
    
    return '/images/pad-printing-cups.jpg';
  };

  // Helper to get badge label
  const getBadgeLabel = (item: any): { text: string; bg: string } => {
    const cat = getArticleSeoCategory(item);
    switch (cat) {
      case 'IN_TAMPON':
        return { text: 'IN TAMPON GIÁ RẺ', bg: 'bg-blue-600' };
      case 'IN_LUA':
        return { text: 'IN LỤA GIÁ RẺ', bg: 'bg-emerald-600' };
      case 'VAT_TU_TAMPON':
        return { text: 'VẬT TƯ IN TAMPON', bg: 'bg-orange-500' };
      case 'VAT_TU_LUA':
        return { text: 'VẬT TƯ IN LỤA', bg: 'bg-teal-600' };
      case 'IN_KTS':
        return { text: 'IN KTS & QR CODE', bg: 'bg-purple-600' };
      default:
        return { text: 'GIA CÔNG IN ẤN', bg: 'bg-slate-700' };
    }
  };

  // Filtered dataset based on search & category
  const filteredData = useMemo(() => {
    let result = initialData;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        item =>
          (item.title && item.title.toLowerCase().includes(q)) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          (item.slug && item.slug.toLowerCase().includes(q))
      );
    }

    // Category filter
    if (activeCategory !== 'ALL') {
      result = result.filter(item => getArticleSeoCategory(item) === activeCategory);
    }

    return result;
  }, [initialData, searchQuery, activeCategory]);

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage) || 1;
  const currentArticles = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [filteredData, currentPage]);

  const handleCategoryChange = (catId: string) => {
    setActiveCategory(catId);
    setCurrentPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-12">
      {/* Search & Category Filter Section */}
      <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200/80 shadow-lg space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Tìm bài viết: in tampon giá rẻ, in lụa giá rẻ, vật tư in tampon, bản thép, mực in..."
            className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-300 rounded-2xl text-slate-900 placeholder-slate-400 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-blue-600 outline-none transition-all font-medium text-sm md:text-base"
          />
          {searchQuery && (
            <button
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600 bg-slate-200 px-2 py-1 rounded-lg"
            >
              Xóa
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
          {seoCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-5 py-2.5 rounded-2xl text-xs md:text-sm font-bold transition-all duration-300 flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
          Hiển thị {filteredData.length} bài viết SEO chất lượng cao
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map((article: any, index: number) => {
          const badge = getBadgeLabel(article);
          const bgImg = getTopicImage(article);

          return (
            <Link
              key={article.slug || index}
              href={`/blog/${article.slug}`}
              className="group block bg-white rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 border border-slate-200/80 overflow-hidden flex flex-col h-full"
            >
              {/* Media Thumbnail */}
              <div className="relative aspect-[16/9] bg-slate-900 overflow-hidden">
                {article.mediaExt === 'mp4' &&
                article.slug !== 'giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01' &&
                article.slug !== 'muc-in-day-cap-trang-linx-videojet' ? (
                  <video
                    src={`/media/blog/${article.slug}.mp4`}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : article.mediaExt === 'jpg' || article.mediaExt === 'png' || article.image ? (
                  <div className="w-full h-full relative group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={article.image || `/media/blog/${article.slug}.${article.mediaExt}`}
                      alt={article.title}
                      className="w-full h-full object-cover opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  </div>
                ) : (
                  <ArticleDynamicCover article={article} />
                )}

                {/* Badge Overlay */}
                <div className="absolute top-4 left-4 z-10">
                  <span className={`${badge.bg} text-white text-[11px] font-extrabold px-3 py-1.5 rounded-xl shadow-md uppercase tracking-wider`}>
                    {badge.text}
                  </span>
                </div>

                {/* Read Time Tag */}
                <div className="absolute bottom-3 right-4 z-10 flex items-center gap-1 text-[11px] font-bold text-white/90 bg-slate-950/60 backdrop-blur-md px-2.5 py-1 rounded-lg">
                  <Clock className="w-3 h-3 text-blue-400" /> 5 phút đọc
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 md:p-7 flex flex-col flex-grow">
                <h2 className="text-lg md:text-xl font-extrabold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h2>
                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow">
                  {article.description}
                </p>
                <div className="flex items-center justify-between text-blue-600 font-extrabold text-xs md:text-sm mt-auto pt-4 border-t border-slate-100">
                  <span>Đọc bài viết chi tiết</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Empty Search Result */}
      {filteredData.length === 0 && (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-xl mx-auto space-y-4">
          <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">Không tìm thấy bài viết phù hợp</h3>
          <p className="text-slate-600 text-sm">
            Thử tìm với từ khóa khác như <strong>"in tampon giá rẻ"</strong>, <strong>"in lụa giá rẻ"</strong>, <strong>"vật tư in"</strong> hoặc chọn danh mục khác.
          </p>
          <button
            onClick={() => { setSearchQuery(''); setActiveCategory('ALL'); setCurrentPage(1); }}
            className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all text-sm"
          >
            Xem Tất Cả Bài Viết
          </button>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
            aria-label="Trang trước"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="flex items-center space-x-1 font-bold text-sm">
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 2)
              .map((page, idx, arr) => {
                const prevPage = arr[idx - 1];
                const showEllipsis = prevPage && page - prevPage > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className="px-2 text-slate-400">...</span>}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        currentPage === page
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 transition-all"
            aria-label="Trang sau"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
