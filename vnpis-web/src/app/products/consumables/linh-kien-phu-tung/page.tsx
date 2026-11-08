import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, PhoneCall, 
  HelpCircle, Wrench, Settings, Move, CircleDot, Maximize,
  Truck, Clock, QrCode, AlertTriangle, FileText, Sparkles, MessageSquare
} from 'lucide-react';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import SparePartsCatalog from '@/components/consumables/SparePartsCatalog';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';

export const metadata: Metadata = {
  title: 'Linh Kiện & Phụ Tùng Máy In Tampon, In Lụa | VNPIS TP.HCM',
  description: 'Tổng kho phụ tùng cơ khí máy in tampon & in lụa chính hãng: Gá dao gạt mực 4"/6" tâm lỗ 80mm, bàn đỡ máng mực vi chỉnh X/Y, cụm gá đầu in Silicone, cùm kẹp bàn in 57mm, con chạy chữ T, ốc vít Hongyi & Zhongke. Sẵn kho TP.HCM, giao 2H, hỗ trợ thanh toán VietQR tự động.',
  keywords: [
    'phụ tùng máy in pad',
    'linh kiện máy in tampon',
    'gá dao gạt mực máy in pad',
    'bàn vi chỉnh máy in tampon',
    'bàn đỡ máng mực',
    'gá đầu in silicone',
    'trụ gá cao su in tampon',
    'cùm kẹp bàn in',
    'ốc gá dao hongyi zhongke',
    'phụ tùng máy in lụa',
    'vật tư máy in công nghiệp VNPIS'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables/linh-kien-phu-tung',
  },
  openGraph: {
    title: 'Linh Kiện & Phụ Tùng Máy In Tampon, In Lụa | VNPIS TP.HCM',
    description: 'Kho linh kiện cơ khí thay thế cho máy in pad, in lụa Zhongke, Hongyi, Kelong... Sẵn kho giao ngay, hỗ trợ kiểm tra đời máy và thanh toán VietQR tự động.',
    url: 'https://vnpis.com/products/consumables/linh-kien-phu-tung',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://vnpis.com/images/products/parts/part_r5_stt3.png',
        width: 800,
        height: 600,
        alt: 'Linh kiện phụ tùng máy in tampon và in lụa VNPIS',
      },
    ],
  },
};

export default function LinhKienPhuTungPage() {
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
            name: 'Vật tư in công nghiệp',
            item: 'https://vnpis.com/products/consumables',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Linh kiện & Phụ tùng máy in',
            item: 'https://vnpis.com/products/consumables/linh-kien-phu-tung',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Linh Kiện & Phụ Tùng Máy In Tampon, In Lụa | VNPIS',
        description: 'Tổng kho phụ tùng cơ khí máy in tampon & in lụa: Gá dao gạt mực, bàn vi chỉnh X/Y, cụm gá đầu in, cùm kẹp bàn in, ốc vít chuyên dụng.',
        url: 'https://vnpis.com/products/consumables/linh-kien-phu-tung',
        publisher: {
          '@type': 'Organization',
          name: 'VNPIS',
          url: 'https://vnpis.com',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Top Banner Navigation */}
      <div className="bg-slate-900 border-b border-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
              <span>/</span>
              <Link href="/products/consumables" className="hover:text-white transition-colors">Vật tư in công nghiệp</Link>
              <span>/</span>
              <span className="text-rose-400 font-bold">Linh kiện &amp; Phụ tùng máy in</span>
            </div>
            
            <div className="flex items-center gap-3">
              <CopyLinkButton 
                urlPath="/products/consumables/linh-kien-phu-tung"
                itemTitle="Linh kiện & Phụ tùng máy in Tampon - VNPIS"
                variant="compact"
              />
              <span className="hidden md:inline text-slate-400">|</span>
              <a 
                href="tel:0987453866"
                className="hidden md:flex items-center gap-1.5 text-amber-400 font-bold hover:underline"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Hotline: 0987 453 866
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f43f5e_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-4 backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              Tổng Kho Linh Kiện &amp; Phụ Tùng Cơ Khí Chuẩn Hóa
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Linh Kiện &amp; Phụ Tùng Máy In Tampon &amp; In Lụa
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-300 leading-relaxed">
              Cung cấp đồng bộ hơn <strong className="text-white">40+ mã phụ tùng cơ khí</strong> thay thế cho máy in pad (tampon) và máy in lụa: Cụm gá dao gạt mực, bàn đỡ máng mực vi chỉnh X/Y, cụm đế gá đầu in Silicone, cùm kẹp bàn in 57mm, con chạy rãnh T và ốc vít đặc chủng chuẩn máy <strong className="text-rose-400">Zhongke, Hongyi, Kelong</strong>.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 flex flex-wrap gap-2.5 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Chuẩn cơ khí quốc tế
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium">
                <Truck className="w-4 h-4 text-blue-400" /> Sẵn kho giao 2H TP.HCM
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium">
                <QrCode className="w-4 h-4 text-rose-400" /> Thanh toán VietQR Napas 24/7
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-slate-200 border border-white/10 font-medium">
                <Wrench className="w-4 h-4 text-amber-400" /> Hỗ trợ đo kiểm đời máy
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <ConsumablesNav currentTab="parts" />

        {/* Technical Notice Banner */}
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-sm mt-0.5 md:mt-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-amber-950 text-sm">
                Lưu ý quan trọng trước khi đặt hàng linh kiện:
              </h4>
              <p className="text-xs text-amber-900/80 mt-0.5 leading-relaxed">
                Máy in pad của các hãng Trung Khoa (Zhongke), Hồng Nghị (Hongyi) có một số chi tiết đặc thù (khoảng cách tâm lỗ gá dao 80mm, ốc gá dao mỏng 3mm vs dày 6mm). Quý khách hãy bấm nút <strong>&quot;Kiểm tra máy&quot;</strong> hoặc chụp ảnh gửi Zalo để kỹ sư VNPIS đo đối chiếu chuẩn xác 100% trước khi đóng gói.
              </p>
            </div>
          </div>

          <a
            href="https://zalo.me/0987453866"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <MessageSquare className="w-4 h-4" /> Gửi ảnh kiểm tra đời máy
          </a>
        </div>

        {/* Interactive Spare Parts Catalog */}
        <SparePartsCatalog />

        {/* Technical Buying & Compatibility Guide */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Cẩm Nang Kỹ Thuật</span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-1">
              Hướng Dẫn Đo &amp; Nhận Diện Phụ Tùng Máy In Tampon Chuẩn Xác
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Tránh rủi ro mua sai kích thước làm gián đoạn dây chuyền sản xuất của nhà máy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Đo khoảng cách tâm lỗ gá dao gạt mực
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Chuẩn công nghiệp phổ biến nhất là <strong>80 mm</strong> (tính từ tâm lỗ ốc bên trái sang tâm lỗ ốc bên phải). Nếu máy cổ điển trên 10 năm của bạn có khoảng cách khác, vui lòng liên hệ VNPIS để khoan phay lại lỗ theo yêu cầu.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Phân biệt ốc vuông gá dao 18x18 M6
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Máy <strong>Hồng Nghị (Hongyi)</strong> sử dụng ốc vuông dày <strong>6 mm</strong>. Trong khi máy <strong>Trung Khoa (Zhongke)</strong> lại sử dụng bản mỏng chỉ <strong>3 mm</strong> để lọt vừa khe trượt hẹp.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h4 className="font-bold text-slate-900 text-sm">
                Chọn chiều dài trụ sắt gá đầu in Ø19mm
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Đường kính trụ chuẩn là Ø19mm. Chiều dài <strong>60 mm</strong> phù hợp máy in pad cỡ nhỏ (máy 1 màu mini); <strong>80 mm</strong> cho máy cỡ trung và <strong>100 mm</strong> cho máy cỡ lớn hoặc in sản phẩm có độ sâu cao.
              </p>
            </div>
          </div>
        </section>

        {/* Payment & Delivery Assurance */}
        <section className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Thanh Toán &amp; Giao Vận</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                Quy Trình Mua Phụ Tùng Nhanh Chóng &amp; Minh Bạch Tại VNPIS
              </h3>
              <ul className="mt-4 space-y-2.5 text-xs sm:text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Thanh toán VietQR tự động:</strong> Quét mã chuyển khoản tức thì 24/7 từ bất kỳ ngân hàng nào, mã giao dịch gán tự động với đơn hàng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Xuất hóa đơn VAT đầy đủ:</strong> Hỗ trợ xuất hóa đơn GTGT điện tử hợp lệ cho doanh nghiệp và công ty nhà xưởng.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Giao hàng hỏa tốc:</strong> Giao ngay trong 2 giờ tại nội thành TP.HCM hoặc gửi chuyển phát nhanh Viettel Post / chành xe toàn quốc.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 text-center">
              <h4 className="text-base font-bold text-white mb-1">Cần Báo Giá Dự Án Hoặc Số Lượng Lớn?</h4>
              <p className="text-xs text-slate-300 mb-4">
                Vui lòng gửi danh sách mã linh kiện cần mua, VNPIS sẽ gửi bảng báo giá cạnh tranh trong vòng 15 phút.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://zalo.me/0987453866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-4 h-4" /> Báo Giá Qua Zalo
                </a>
                <a
                  href="tel:0987453866"
                  className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5"
                >
                  <PhoneCall className="w-4 h-4" /> Gọi 0987 453 866
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
