export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Phone, HelpCircle, Cpu, Layers, HardDrive } from 'lucide-react';

export const metadata = {
  title: 'Mực In TIJ HP 2.5 12.7mm 25.4mm & Máy In Phun Nhiệt TIJ | VNPIS',
  description: 'Chuyên phân phối hộp mực in TIJ công nghệ HP 2.5 (12.7mm & 25.4mm), mực dung môi khô nhanh in bao bì màng nhôm, PET, nhựa, carton. Máy in TIJ băng tải giá xưởng. Hotline: 0987 453 866.',
  alternates: {
    canonical: 'https://vnpis.com/tij',
  },
};

export default function TijPage() {
  const faqList = [
    {
      q: 'Mực in TIJ (Thermal Inkjet) khác gì so với mực in CIJ?',
      a: 'Công nghệ TIJ (Thermal Inkjet) sử dụng nhiệt để đẩy giọt mực qua đầu in tích hợp trực tiếp trên cartridge (hộp mực HP 2.5), cho độ phân giải lên đến 600 DPI siêu nét, không lo nghẹt đầu phun, không cần dùng dung môi pha bẩn và không tốn chi phí bảo trì bộ lọc như máy CIJ.'
    },
    {
      q: 'Hộp mực TIJ dung môi khô nhanh bám dính trên bề mặt nào?',
      a: 'Mực dung môi TIJ (Solvent Ink) bám dính tuyệt đối và khô trong 1-3 giây trên màng nhôm, màng nilon PE/PP, chai nhựa PET, vỏ hộp mỹ phẩm bóng giặt, thép không gỉ và ống PVC.'
    },
    {
      q: 'Kích thước đầu in TIJ 12.7mm và 25.4mm có thể ghép nhiều đầu không?',
      a: 'Có. Các dòng máy in TIJ công nghiệp do VNPIS cung cấp hỗ trợ ghép nối từ 2 đến 8 đầu in, cho phép mở rộng độ rộng vệt in lên 50.8mm hoặc 101.6mm để in logo lớn, mã vạch Barcode và nội dung phức tạp.'
    },
    {
      q: 'Một hộp mực in TIJ 42ml in được bao nhiêu sản phẩm?',
      a: 'Với kích thước chữ in date HSD 2mm (khoảng 14-16 ký tự), một hộp mực TIJ 42ml tiêu chuẩn có thể in từ 400.000 đến 800.000 sản phẩm.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-green-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Công Nghệ In TIJ &amp; Mực In TIJ</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider mb-4 border border-green-200">
            Giải Pháp In Date &amp; Mã Vạch 600 DPI Độ Phân Giải Cao
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Mực In TIJ Công Nghệ HP 2.5 &amp; Máy In Phun Nhiệt TIJ Công Nghiệp
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Phân phối hộp mực in nhiệt TIJ HP 2.5 (khổ in 12.7mm &amp; 25.4mm), mực dung môi khô nhanh chuyên in date, lot, QR code trên bao bì nhựa, màng nhôm, thùng carton. Cung cấp máy in TIJ cầm tay và băng tải tự động.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-green-600 mb-1">600 DPI</div>
            <div className="text-xs text-slate-600 font-medium">Độ Phân Giải Sắc Nét</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">42 ml</div>
            <div className="text-xs text-slate-600 font-medium">Dung Tích Hộp Mực HP 2.5</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">12.7 &amp; 25.4mm</div>
            <div className="text-xs text-slate-600 font-medium">Độ Rộng Đầu In Chuẩn</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">0đ Bảo Trì</div>
            <div className="text-xs text-slate-600 font-medium">Thay Hộp Mực Là Thay Đầu In</div>
          </div>
        </div>

        {/* Section 1: TIJ là gì */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            1. TIJ (Thermal Inkjet) Là Gì?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>TIJ (Thermal Inkjet - In Phun Nhiệt)</strong> là công nghệ in phun sử dụng nhiệt năng để làm nóng các phần tử điện trở nhỏ bên trong đầu in, tạo ra bong bóng khí đẩy giọt mực bắn ra ngoài chính xác lên bề mặt sản phẩm.
            </p>
            <p>
              Điểm cải tiến vượt trội của công nghệ TIJ HP 2.5 là đầu phun được tích hợp trực tiếp trên từng hộp mực (Cartridge). Khi hết mực, người dùng chỉ cần thay cartridge mới là đồng thời đã thay mới 100% đầu in, loại bỏ hoàn toàn rủi ro hỏng hóc hay tốn kém chi phí sửa chữa đầu in công nghiệp.
            </p>
          </div>
        </section>

        {/* Section 2: Dòng mực TIJ */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            2. Các Dòng Mực In TIJ Phổ Biến Tại VNPIS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực Dung Môi TIJ Khô Nhanh</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mực gốc dung môi (Solvent Ink cartridge) bám dính siêu cường, khô trong 1-2s trên bao bì màng nhôm, nhựa PET/PP, thủy tinh và kim loại.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực Nước TIJ In Thùng Carton</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Mực gốc nước (Water-based Ink cartridge) chuyên dùng cho các chất liệu thấm hút như thùng carton, giấy couche, gỗ công nghiệp và vải.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Máy In TIJ Băng Tải Tự Động</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Thiết bị máy in TIJ gắn chuyền tự động, tích hợp cảm biến quang sensor và bộ mã hóa encoder cho tốc độ in lên đến 90 mét/phút.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Sản Phẩm & Ứng Dụng */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            3. Ứng Dụng Thực Tế Của Công Nghệ In TIJ
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'In date NSX/HSD sắc nét trên bao bì bánh kẹo, snack',
              'In mã QR Code động truy xuất nguồn gốc nông sản',
              'In mã vạch Barcode GS1 quản lý kho tự động',
              'In số lô Lot number trên vỉ thuốc dược phẩm',
              'In mã số nhảy Serial chống hàng giả',
              'In logo thương hiệu & chữ viết lên thùng carton'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-slate-700 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-green-600 mr-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bảng Giá Hộp Mực TIJ */}
        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            4. Bảng Giá Hộp Mực TIJ HP 2.5 Giá Xưởng
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto text-sm">
            * Cam kết cartridge chính hãng, độ phân giải sắc nét, test độ bám dính miễn phí.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-white uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-xl">Loại Hộp Mực TIJ (Cartridge)</th>
                  <th className="p-4">Độ Rộng Đầu In</th>
                  <th className="p-4">Loại Mực / Đặc Tính</th>
                  <th className="p-4 rounded-r-xl">Giá Ưu Đãi B2B</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-semibold text-white">Hộp Mực TIJ Dung Môi Khô Nhanh</td>
                  <td className="p-4">12.7 mm (0.5 inch)</td>
                  <td className="p-4">Solvent Ink / Khô 1s trên nhựa, nhôm</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 750.000đ / Hộp</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Hộp Mực TIJ Dung Môi Khổ Lớn</td>
                  <td className="p-4">25.4 mm (1.0 inch)</td>
                  <td className="p-4">Solvent Ink / In logo, QR lớn</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 1.450.000đ / Hộp</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Hộp Mực Nước TIJ In Carton</td>
                  <td className="p-4">12.7 mm / 25.4 mm</td>
                  <td className="p-4">Water-based Ink / In thùng carton</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 550.000đ / Hộp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Câu Hỏi Thường Gặp FAQ */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center">
            <HelpCircle className="w-7 h-7 text-green-600 mr-3" />
            5. Câu Hỏi Thường Gặp Về Mực &amp; Máy In TIJ
          </h2>
          <div className="space-y-6">
            {faqList.map((item, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.q}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Contact */}
        <div className="text-center bg-gradient-to-r from-green-600 to-emerald-700 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bạn Cần Báo Giá Mực TIJ &amp; Demo Máy In Tận Nhà Máy?</h3>
          <p className="text-green-100 text-base mb-8 max-w-xl mx-auto">
            Liên hệ VNPIS ngay hôm nay để nhận hộp mực TIJ dùng thử và khảo sát lắp đặt máy in phun TIJ miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0987453866" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-green-700 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              <Phone className="w-5 h-5 mr-2" /> Zalo Kỹ Thuật: 0987 453 866 (Mr. Tâm)
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-green-950 text-white hover:bg-black font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              Yêu Cầu Demo Máy In TIJ <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": faqList.map(item => ({
              "@type": "Question",
              "name": item.q,
              "acceptedAnswer": {
                "@type": "Answer",
                "text": item.a
              }
            }))
          })
        }}
      />
    </div>
  );
}
