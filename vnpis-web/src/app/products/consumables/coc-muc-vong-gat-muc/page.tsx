import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall, HelpCircle, Package, Settings, Compass } from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';
import AccessoryItemCard from '@/components/consumables/AccessoryItemCard';

export const metadata: Metadata = {
  title: 'Cốc Mực In Tampon, Vòng Gạt Mực & Tấm Lót Khay Mực | VNPIS',
  description: 'Tổng kho phụ kiện máy in tampon chính hãng: Cốc mực kín nhôm từ tính CNC, vòng sứ gạt mực Zirconia chống xước khuôn, vòng thép Tungsten Carbide chống mẻ, dao gạt Thụy Điển và tấm lót khay mực dùng 1 lần. Đầy đủ quy cách Ø33mm - Ø247mm.',
  keywords: [
    'cốc mực in tampon',
    'vòng gạt mực',
    'vòng sứ gạt mực',
    'vòng thép gạt mực',
    'tấm lót khay mực',
    'dao gạt mực',
    'cốc mực kín',
    'vòng gạt mực zirconia',
    'vòng tungsten carbide',
    'phụ kiện máy in tampon',
    'vật tư máy in pad'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/coc-muc-vong-gat-muc',
  },
  openGraph: {
    title: 'Cốc Mực In Tampon, Vòng Gạt Mực & Tấm Lót Khay Mực | VNPIS',
    description: 'Cốc mực kín nhôm nguyên khối từ tính, vòng sứ Zirconia, vòng thép Tungsten Carbide và tấm lót khay mực dùng 1 lần chuyên dụng cho ngành in pad.',
    url: 'https://vnpis.com/products/consumables/coc-muc-vong-gat-muc',
    siteName: 'VNPIS',
    images: [
      {
        url: 'https://vnpis.com/images/products/accessories/ink-cups.webp',
        width: 800,
        height: 600,
        alt: 'Cốc mực in tampon và vòng gạt mực VNPIS',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
};

// Map items with friendly anchor aliases
const ALIAS_MAP: Record<string, string> = {
  'acc-ink-cup': 'coc-muc-kin',
  'acc-ceramic-ring': 'vong-su-gat-muc',
  'acc-tungsten-ring': 'vong-thep-gat-muc',
  'acc-double-material-ring': 'vong-gat-kep',
  'acc-doctor-blade': 'dao-gat-muc',
  'acc-tray-liner': 'tam-lot-khay-muc',
};

const itemsWithAlias = accessoriesData.accessories.map((item: any) => ({
  ...item,
  aliasId: ALIAS_MAP[item.id] || item.id,
}));

export default function CocMucVongGatMucPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
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
            name: 'Cốc Mực, Vòng Gạt Mực & Tấm Lót Khay Mực',
            item: 'https://vnpis.com/products/consumables/coc-muc-vong-gat-muc',
          },
        ],
      },
      {
        '@type': 'ItemList',
        name: 'Danh Mục Cốc Mực, Vòng Gạt Mực & Tấm Lót Khay Mực In Tampon',
        description: 'Tổng hợp các loại cốc mực kín, vòng sứ Zirconia, vòng thép Tungsten Carbide, dao gạt và tấm lót khay mực cho máy in pad',
        numberOfItems: itemsWithAlias.length,
        itemListElement: itemsWithAlias.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Product',
            name: item.name,
            description: item.desc,
            image: `https://vnpis.com${item.image}`,
            sku: item.aliasId,
            brand: {
              '@type': 'Brand',
              name: 'VNPIS',
            },
            offers: {
              '@type': 'Offer',
              priceCurrency: 'VND',
              price: 'Liên hệ',
              availability: 'https://schema.org/InStock',
              url: `https://vnpis.com/products/consumables/coc-muc-vong-gat-muc#${item.aliasId}`,
            },
          },
        })),
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
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-emerald-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-teal-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-500 mb-6 flex-wrap">
            <Link href="/" className="hover:text-emerald-600 transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-emerald-600 transition-colors">Sản phẩm</Link>
            <span>/</span>
            <Link href="/products/consumables" className="hover:text-emerald-600 transition-colors">Vật tư in công nghiệp</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold">Cốc mực, Vòng gạt, Tấm lót</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-emerald-200">
                <Settings className="w-3.5 h-3.5" />
                VNPIS Premium Spare Parts & Rings
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 mb-4 leading-tight">
                Cốc Mực, Vòng Gạt Mực & Tấm Lót Khay Mực In Tampon
              </h1>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Cung cấp đồng bộ phụ kiện máy in tampon (pad printing): <strong className="text-slate-900">Cốc mực kín nam châm từ tính</strong> chống bay hơi dung môi, <strong className="text-slate-900">Vòng sứ gạt mực Zirconia</strong> siêu phẳng chống xước bản thép, <strong className="text-slate-900">Vòng thép gạt mực Tungsten Carbide</strong> siêu bền chống mẻ vỡ va đập, dao gạt Thụy Điển và <strong className="text-slate-900">Tấm lót khay mực dùng 1 lần</strong> thay màu siêu tốc.
              </p>
            </div>

            <div className="flex flex-wrap lg:flex-col gap-3 shrink-0">
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-emerald-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Nhanh <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
              <CopyLinkButton 
                itemTitle="Cốc Mực, Vòng Gạt & Tấm Lót Khay" 
                className="w-full justify-center"
              />
            </div>
          </div>

          {/* Feature Highlights Badges */}
          <div className="flex flex-wrap gap-2.5 mb-8 text-xs font-bold text-emerald-950">
            <span className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Đầy đủ quy cách Ø33mm đến Ø247mm
            </span>
            <span className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> 6 kiểu biên dạng lưỡi gạt AP-1 ~ AP-6
            </span>
            <span className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Nhận gia công theo bản vẽ kỹ thuật
            </span>
            <span className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-1.5" /> Nam châm Neodymium vĩnh cửu lực hút mạnh
            </span>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Chuyển sang nhóm vật tư khác:</div>
            <ConsumablesNav currentTab="accessories" />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto px-4 mt-8">
        {/* Quick Anchor Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
            <Compass className="w-4 h-4 text-emerald-600" />
            <span>Mục lục sản phẩm:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {itemsWithAlias.map((item) => (
              <a
                key={item.aliasId}
                href={`#${item.aliasId}`}
                className="px-3 py-1.5 text-xs font-bold rounded-lg bg-slate-100 text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 transition-colors"
              >
                {item.name.split('(')[0].trim()}
              </a>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <section aria-label="Danh sách cốc mực, vòng gạt và tấm lót">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {itemsWithAlias.map((item) => (
              <AccessoryItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* Technical FAQ & SEO Guidance Section */}
        <section className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">
              <HelpCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">Cẩm Nang Kỹ Thuật</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                Câu Hỏi Thường Gặp Về Cốc Mực, Vòng Gạt & Tấm Lót Khay Mực
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-black">01.</span>
                Nên chọn Vòng sứ gạt mực Zirconia hay Vòng thép Tungsten Carbide?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                <strong>Vòng sứ Zirconia:</strong> Có bề mặt lưỡi bóng cực cao, gạt mực siêu phẳng và đặc biệt an toàn, bảo vệ chống xước tối đa cho các loại khuôn in thép mỏng 0.5mm và bản in polymer. Tuy nhiên gốm sứ có nguy cơ mẻ nếu va đập mạnh.<br/>
                <strong>Vòng thép Tungsten Carbide:</strong> Hợp kim Vonfram nguyên khối chống va đập, hoàn toàn không sợ nứt mẻ khi tháo rửa vệ sinh, độ bền cơ học cao, cực kỳ thích hợp cho các xưởng in ca lớn 24/7 kết hợp cùng khuôn thép dày CNC 10mm.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-black">02.</span>
                Tại sao máy in tampon nên nâng cấp sang Cốc mực kín (Sealed Ink Cup)?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cốc mực kín giữ mực bên trong khoang nhôm có vòng đệm hít nam châm, ngăn ngừa tới 95% hiện tượng bay hơi dung môi pha mực. Điều này giúp độ nhớt của mực luôn ổn định suốt cả ngày sản xuất, mực không bị khô đặc, tiết kiệm tới 40% lượng mực tiêu hao và loại bỏ mùi dung môi độc hại trong xưởng in.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-black">03.</span>
                Tấm lót khay mực dùng 1 lần (Ink Tray Liners) mang lại lợi ích gì?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Đối với máy in pad sử dụng khay mực hở hoặc máy in lụa, mỗi lần đổi màu mực nhân công phải mất từ 20 đến 30 phút dùng dung dịch tẩy rửa lau sạch khay. Tấm lót khay mực định hình dùng 1 lần giúp công nhân chỉ cần nhấc tấm lót cũ vứt bỏ và thay tấm mới trong 10 giây, tiết kiệm hàng chục lít dung môi và nhân công rửa khuôn.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-bold text-slate-900 text-base mb-2 flex items-start gap-2">
                <span className="text-emerald-600 font-black">04.</span>
                6 kiểu góc vát lưỡi dao gạt AP-1 đến AP-6 lựa chọn như thế nào?
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Kiểu phổ biến nhất trên thị trường là <strong>AP-2 (Vát chữ V 1 mặt)</strong> và <strong>AP-3 (Vát đôi chữ V 2 mặt)</strong>. Với các dòng máy tốc độ cao hoặc cần đảo chiều lưỡi khi mòn, khách hàng chọn AP-3 hoặc AP-4 để lật ngược mặt sử dụng tiếp gấp đôi tuổi thọ. VNPIS hỗ trợ tư vấn chọn góc vát phù hợp với độ sâu khắc của khuôn in.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mt-12 bg-gradient-to-r from-emerald-900 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Giao hàng nhanh toàn quốc
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Cần Báo Giá Cốc Mực Hoặc Đặt Gia Công Vòng Gạt Theo Bản Vẽ?
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              VNPIS luôn sẵn kho đầy đủ kích thước từ Ø33mm đến Ø247mm. Hỗ trợ đo đạc kích thước tận xưởng và gửi mẫu thử nghiệm miễn phí.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <a
              href="tel:0987453866"
              className="inline-flex items-center justify-center px-6 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl transition-all shadow-lg text-sm whitespace-nowrap"
            >
              <PhoneCall className="w-4 h-4 mr-2" /> Hotline: 0987 453 866
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20 text-sm whitespace-nowrap"
            >
              Gửi Yêu Cầu Báo Giá
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
