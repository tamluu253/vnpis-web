import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CircleDot, PhoneCall } from 'lucide-react';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';
import PadsCatalogSection from '@/components/consumables/PadsCatalogSection';

export const metadata: Metadata = {
  title: 'Đầu In Silicone (Pad Printing Silicone Rubber) Chống Đọng Bọt | VNPIS',
  description: 'Tổng kho đầu in silicone in tampon chất lượng cao. Đầy đủ dòng R Series (tròn nón), Q Series (chữ nhật mái nghiêng), hình cầu, thanh dài. Độ bật nảy mực siêu tốc, chống đọng bọt khí, đầy đủ độ cứng 0-18 Shore A, nhận đúc khuôn theo yêu cầu.',
  keywords: [
    'đầu in silicone',
    'cục in tampon',
    'đầu in tampon',
    'silicone rubber pad',
    'pad printing pad',
    'cục cao su in pad',
    'đầu in silicone tròn nón',
    'đầu in silicone chữ nhật'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/dau-in-silicone',
  },
  openGraph: {
    title: 'Đầu In Silicone (Pad Printing Silicone Rubber) Chống Đọng Bọt | VNPIS',
    description: 'Đầu in silicone in tampon chuyên nghiệp với hơn 200+ mẫu mã và nhận gia công đúc silicone tùy chỉnh theo bản vẽ.',
    url: 'https://vnpis.com/products/consumables/dau-in-silicone',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function DauInSiliconePage() {
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
        name: 'Đầu In Silicone (Pads)',
        item: 'https://vnpis.com/products/consumables/dau-in-silicone',
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
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-indigo-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-blue-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-indigo-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-indigo-600 transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link href="/products/consumables" className="hover:text-indigo-600 transition-colors">Vật tư in công nghiệp</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Đầu in silicone</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-100 text-indigo-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-indigo-200">
                <CircleDot className="w-3.5 h-3.5" />
                VNPIS Silicone Pad Technology
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                Đầu In Silicone In Tampon (Silicone Rubber Pads)
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Cung cấp hơn 200+ mã đầu in cao su silicone cho máy in tampon. Bề mặt siêu mịn, khử tĩnh điện, độ nhả mực 99%, chống biến dạng rách vỡ khi ép lực cao. Đầy đủ các dòng tròn nón chống bọt khí, chữ nhật mái nghiêng vuốt mực sắc nét.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Đầu In <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <CopyLinkButton 
                itemTitle="Đầu In Silicone In Tampon" 
                className="w-full justify-center"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chuyển sang nhóm vật tư khác:</div>
            <ConsumablesNav currentTab="pads" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-8">
        <PadsCatalogSection />
      </main>
    </div>
  );
}
