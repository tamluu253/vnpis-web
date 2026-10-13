import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Layers, CheckCircle2, PhoneCall } from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';

export const metadata: Metadata = {
  title: 'Khuôn In Chế Bản Tampon (Khuôn Thép CNC 10mm, Thép Mỏng, Bản Polymer) | VNPIS',
  description: 'Dịch vụ gia công và cung cấp vật tư khuôn in tampon (cliche/plates): Khuôn thép dày CNC 10mm tôi cứng độ bền trên 1.000.000 lượt in, khuôn thép mỏng 0.5mm và vật tư bản in Polymer tự phơi UV tại xưởng.',
  keywords: [
    'khuôn in tampon',
    'khuôn thép in pad',
    'bản in polymer',
    'cliche pad printing',
    'khuôn thép 10mm',
    'khuôn thép mỏng 0.5mm',
    'chế bản in tampon',
    'khắc laser khuôn tampon'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/khuon-in',
  },
  openGraph: {
    title: 'Khuôn In Chế Bản Tampon (Khuôn Thép CNC 10mm, Bản Polymer) | VNPIS',
    description: 'Gia công khuôn in tampon thép CNC 10mm và bản in polymer độ nét chuẩn vi mô 0.05mm.',
    url: 'https://vnpis.com/products/consumables/khuon-in',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function KhuonInPage() {
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
        name: 'Khuôn In Chế Bản',
        item: 'https://vnpis.com/products/consumables/khuon-in',
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
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-purple-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-violet-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-purple-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-purple-600 transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link href="/products/consumables" className="hover:text-purple-600 transition-colors">Vật tư in công nghiệp</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Khuôn in chế bản</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-purple-100 text-purple-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-purple-200">
                <Layers className="w-3.5 h-3.5" />
                VNPIS Cliche & Plate Manufacturing
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                Khuôn In Chế Bản Tampon (Cliche / Plates)
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Khuôn in quyết định 90% độ sắc nét hình ảnh. VNPIS cung cấp dịch vụ gia công khắc laser fiber / ăn mòn axit khuôn thép CNC 10mm siêu bền, khuôn thép mỏng 0.5mm và vật tư khuôn Polymer tự phơi UV tại nhà máy.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-purple-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Khuôn <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <CopyLinkButton 
                itemTitle="Khuôn In Chế Bản" 
                className="w-full justify-center"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chuyển sang nhóm vật tư khác:</div>
            <ConsumablesNav currentTab="plates" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accessoriesData.plates.map((item: any) => (
            <article 
              key={item.id} 
              id={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between scroll-mt-28 target:ring-2 target:ring-purple-500 target:bg-purple-50/20"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
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
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{item.desc}</p>
                
                <div className="space-y-2 mb-6">
                  {item.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-start text-xs font-bold text-purple-950 bg-purple-50 border border-purple-100 p-2.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-purple-600 mr-2 shrink-0 mt-0.5"/> {f}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                <Link href="/contact" className="inline-flex items-center justify-center w-full py-3.5 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl transition-colors shadow-md text-sm">
                  Báo Giá Khuôn In Này <ArrowRight className="w-4 h-4 ml-2"/>
                </Link>
                <div className="flex gap-2">
                  <a
                    href="tel:0987453866"
                    className="flex-1 inline-flex items-center justify-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-purple-600" /> 0987 453 866
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
