import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Beaker, CheckCircle2, PhoneCall } from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';

export const metadata: Metadata = {
  title: 'Phụ Gia & Dung Môi Hóa Chất Ngành In (Thinner, Hardener, Retarder, Primer) | VNPIS',
  description: 'Tổng đại lý dung môi pha loãng mực in tampon & in lụa, chất đóng rắn tăng độ bám Hardener 2K, dung dịch chống bít bản Retarder, chất xử lý bề mặt tăng bám Primer cho nhựa PP, PE, kim loại, thủy tinh.',
  keywords: [
    'phụ gia in tampon',
    'dung môi in tampon',
    'nước pha mực in lụa',
    'chất đóng rắn hardener',
    'chất làm chậm khô retarder',
    'chất trợ bám primer pp pe',
    'thinner mực in',
    'dung môi tẩy rửa khuôn in'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/phu-gia-dung-moi',
  },
  openGraph: {
    title: 'Phụ Gia & Dung Môi Hóa Chất Ngành In | VNPIS',
    description: 'Dung môi pha loãng, chất đóng rắn hardener, retarder và primer trợ bám dính gấp 5 lần chuyên dụng ngành in.',
    url: 'https://vnpis.com/products/consumables/phu-gia-dung-moi',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function PhuGiaDungMoiPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Trang chủ',
        item: 'https://vnpis.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sản phẩm',
        item: 'https://vnpis.com/products',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Vật Tư In Công Nghiệp',
        item: 'https://vnpis.com/products/consumables',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Phụ Gia & Dung Môi',
        item: 'https://vnpis.com/products/consumables/phu-gia-dung-moi',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header & Hero */}
      <header className="bg-white text-slate-900 pt-24 pb-10 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-amber-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-orange-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-amber-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-amber-600 transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link href="/products/consumables" className="hover:text-amber-600 transition-colors">Vật tư in công nghiệp</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Phụ gia & dung môi</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-amber-100 text-amber-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-amber-200">
                <Beaker className="w-3.5 h-3.5" />
                VNPIS Industrial Solvents & Chemicals
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                Phụ Gia & Dung Môi Hóa Chất Ngành In
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Bộ giải pháp dung dịch phụ trợ tối ưu màng mực: Dung môi pha loãng nhanh/chậm khô, Chất xử lý bề mặt tăng bám dính gấp 5 lần (Primer), Dung dịch chống bít bản in (Retarder) và Chất đóng rắn tăng cứng chịu hóa chất cồn (Hardener 2K).
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-amber-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Phụ Gia <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <CopyLinkButton 
                itemTitle="Phụ Gia & Dung Môi Hóa Chất" 
                className="w-full justify-center"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chuyển sang nhóm vật tư khác:</div>
            <ConsumablesNav currentTab="additives" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessoriesData.additives.map((item: any) => (
            <article 
              key={item.id} 
              id={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between scroll-mt-28 target:ring-2 target:ring-amber-500 target:bg-amber-50/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                  </div>
                  <CopyLinkButton 
                    hash={item.id} 
                    itemTitle={item.name} 
                    variant="compact"
                  />
                </div>

                <div className="w-full h-52 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 mb-6 p-4 flex items-center justify-center">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h2>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.desc}</p>
                
                {item.features && (
                  <div className="space-y-1.5 mb-4">
                    {item.features.map((f: string, i: number) => (
                      <div key={i} className="flex items-center text-xs font-semibold text-amber-950 bg-amber-50 px-2.5 py-1.5 rounded-md border border-amber-100">
                        <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-amber-600 shrink-0" /> {f}
                      </div>
                    ))}
                  </div>
                )}

                {item.sizes && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-6">
                    <span className="text-xs font-bold text-slate-400 uppercase w-full mb-1">Dung tích / Đóng gói:</span>
                    {item.sizes.map((sz: string, i: number) => (
                      <span key={i} className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
                        {sz}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                <Link href="/contact" className="inline-flex items-center justify-center w-full py-3.5 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl transition-colors shadow-md text-sm">
                  Báo Giá Dung Môi / Phụ Gia <ArrowRight className="w-4 h-4 ml-2"/>
                </Link>
                <div className="flex gap-2">
                  <a
                    href="tel:0987453866"
                    className="flex-1 inline-flex items-center justify-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-amber-600" /> 0987 453 866
                  </a>
                  <CopyLinkButton 
                    hash={item.id} 
                    itemTitle={item.name} 
                    className="flex-1"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
