import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Droplet, ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';
import InksCatalogSection from '@/components/consumables/InksCatalogSection';

export const metadata: Metadata = {
  title: 'Mực In Tampon & In Lụa Công Nghiệp Cao Cấp (Dubuit, Henkey, Ruco) | VNPIS',
  description: 'Đại lý phân phối mực in tampon & in lụa chính hãng Dubuit (Pháp), Henkey, Ruco (Đức), Afford, Sericom. Bám dính siêu việt trên nhựa ABS, PP, PE, kim loại sơn tĩnh điện, thủy tinh, cao su. Đạt chuẩn RoHS, REACH, ZDHC Level 3.',
  keywords: [
    'mực in tampon',
    'mực in lụa',
    'mực in dubuit',
    'mực in henkey',
    'mực in ruco',
    'mực in afford',
    'mực in pad',
    'mực in công nghiệp',
    'mực in nhựa pp pe',
    'mực in kim loại'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/muc-in',
  },
  openGraph: {
    title: 'Mực In Tampon & In Lụa Công Nghiệp Cao Cấp | VNPIS',
    description: 'Mực in công nghiệp cao cấp Dubuit, Henkey, Ruco bám dính siêu việt trên mọi bề mặt khó bám. Đạt tiêu chuẩn an toàn quốc tế.',
    url: 'https://vnpis.com/products/consumables/muc-in',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
  },
};

export default function MucInPage() {
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
        name: 'Mực In Tampon & In Lụa',
        item: 'https://vnpis.com/products/consumables/muc-in',
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
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-blue-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-sky-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-blue-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link href="/products/consumables" className="hover:text-blue-600 transition-colors">Vật tư in công nghiệp</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Mực in tampon & in lụa</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-100 text-blue-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-blue-200">
                <Droplet className="w-3.5 h-3.5" />
                VNPIS Premium Industrial Inks
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                Mực In Tampon & In Lụa Công Nghiệp
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Phân phối chính hãng các thương hiệu mực in pad và in lụa hàng đầu thế giới: <strong className="text-slate-900">Dubuit (Pháp)</strong>, <strong className="text-slate-900">Henkey</strong>, <strong className="text-slate-900">Ruco (Đức)</strong>, Afford, Sericom và Nengtong. Độ bám dính siêu việt, màu sắc tươi sáng, kháng hóa chất cồn và đạt trọn bộ chứng chỉ an toàn RoHS, REACH, ZDHC Level 3, Oeko-Tex.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-blue-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Mực <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <CopyLinkButton 
                itemTitle="Mực In Tampon & In Lụa" 
                className="w-full justify-center"
              />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chuyển sang nhóm vật tư khác:</div>
            <ConsumablesNav currentTab="inks" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-8">
        <InksCatalogSection />

        {/* Bottom CTA */}
        <section className="mt-16 bg-gradient-to-r from-blue-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Mẫu thử mực miễn phí
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Bạn Chưa Biết Chọn Dòng Mực Nào Cho Bề Mặt Của Mình?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Gửi sản phẩm mẫu về phòng LAB của VNPIS. Các kỹ sư hóa chất của chúng tôi sẽ test độ bám dính bằng băng keo 3M, thử cồn 99% và tư vấn công thức pha mực chuẩn xác nhất.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:0987453866"
              className="inline-flex items-center justify-center px-6 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-lg text-sm whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> 0987 453 866
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20 text-sm whitespace-nowrap"
            >
              Liên Hệ Test Mẫu
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
