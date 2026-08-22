export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Phone, HelpCircle, Droplet, RefreshCw, Award } from 'lucide-react';

export const metadata = {
  title: 'Mực In CIJ Công Nghiệp Videojet, Domino, Linx, Willett | VNPIS',
  description: 'Nhà phân phối mực in CIJ (Continuous Inkjet), dung môi Make-up, nước rửa tương thích 100% máy in date Videojet, Domino, Linx, Willett. Tiết kiệm 40% chi phí. Hotline: 0987 453 866.',
  alternates: {
    canonical: 'https://vnpis.com/muc-in-cij',
  },
};

export default function MucInCijPage() {
  const faqList = [
    {
      q: 'Mực in CIJ tương thích tại VNPIS có làm nghẹt đầu phun máy in date không?',
      a: 'Không. Tất cả các dòng mực in CIJ, dung môi Make-up và nước rửa Cleaner do VNPIS phân phối đều trải qua quy trình lọc siêu mịn 0.2 Micron, hạt màu mịn tương thích 100% về độ nhớt, điện trở và sức căng bề mặt theo tiêu chuẩn máy in Videojet, Domino, Linx.'
    },
    {
      q: 'Sử dụng mực in CIJ của VNPIS giúp tiết kiệm chi phí như thế nào?',
      a: 'So với dòng mực chính hãng nguyên bản OEM có giá thành đắt đỏ, giải pháp mực in CIJ tương thích cao cấp của VNPIS giúp các nhà máy tiết kiệm từ 35% - 45% chi phí vận hành hàng tháng mà vẫn đảm bảo chất lượng bản in sắc nét và tốc độ khô dưới 1 giây.'
    },
    {
      q: 'Mực in CIJ có in được trên màng nhựa mỏng, chai PET và thủy tinh ướt không?',
      a: 'Có. VNPIS cung cấp các hệ mực CIJ đặc chủng: mực bám dính siêu cường trên màng BOPP/PE, mực in chịu nhiệt luộc tiệt trùng 121°C (K12), mực in trên chai thủy tinh thu hồi cồn lạnh, mực pigmented trắng/vàng cho dây cáp điện.'
    },
    {
      q: 'Thời gian bảo quản mực in CIJ và dung môi là bao lâu?',
      a: 'Hạn sử dụng tiêu chuẩn của mực in CIJ và dung môi tương thích là từ 12 - 24 tháng kể từ ngày sản xuất khi bảo quản ở nhiệt độ phòng từ 15°C – 30°C.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-red-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Mực In CIJ Công Nghiệp</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-4 border border-red-200">
            Giải Pháp Tiết Kiệm 40% Chi Phí Máy In Date Phun Liên Tục
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Mực In CIJ &amp; Dung Môi Tương Thích 100% Videojet, Domino, Linx, Willett
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chuyên cung cấp mực in phun liên tục CIJ (Continuous Inkjet Ink), dung môi pha (Make-up solvent) và dung dịch rửa (Cleaner) cao cấp cho máy in date hsd công nghiệp. Khô nhanh 1s, chống nước, chịu nhiệt, bám dính siêu bền.
          </p>
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-red-600 mb-1">-40%</div>
            <div className="text-xs text-slate-600 font-medium">Chi Phí Vận Hành</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">0.2 Micron</div>
            <div className="text-xs text-slate-600 font-medium">Độ Lọc Khôn Lo Nghẹt Head</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-teal-600 mb-1">&lt; 1 Giây</div>
            <div className="text-xs text-slate-600 font-medium">Tốc Độ Khô Mực Tức Thì</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">100%</div>
            <div className="text-xs text-slate-600 font-medium">Plug &amp; Play Thay Thế</div>
          </div>
        </div>

        {/* Section 1: Mực in CIJ là gì */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            1. Mực In CIJ (Continuous Inkjet Ink) Là Gì?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>Mực in CIJ (Continuous Inkjet Ink)</strong> là dòng mực in phun liên tục đặc chủng chứa dung môi gốc MEK (Methyl Ethyl Ketone), Ethanol hoặc Acetone. Mực được tạo áp lực để bắn ra các giọt mực siêu nhỏ liên tục qua đầu phun máy in date, dưới sự điều hướng của điện trường để tạo thành ký tự NSX, HSD, Số Lô (Lot Number), Barcode và QR Code trên dây chuyền sản xuất tốc độ cao.
            </p>
            <p>
              Yêu cầu kỹ thuật của mực CIJ cực kỳ khắt khe: độ nhớt chuẩn xác, khả năng tích điện ổn định và tuyệt đối không tạo cặn đóng tảng gây nghẹt đường ống hay béc in.
            </p>
          </div>
        </section>

        {/* Section 2: Thương hiệu tương thích */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            2. Các Dòng Mực In CIJ &amp; Dung Môi Phổ Biến
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-red-100 text-red-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Droplet className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực CIJ Cho Máy Videojet</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tương thích hoàn hảo với các model Videojet 1210, 1220, 1510, 1520, 1710. Mã mực V401-D, V410-D, V411-D và dung môi Make-up V701-D, V705-D.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực CIJ Cho Máy Domino</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Tương thích dòng Domino A-Series (A100, A200, Ax150i, Ax350i). Mã mực 291BK, 270BK, 299BK và dung môi MC-291BK.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực CIJ Cho Linx &amp; Willett</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Dành cho máy Linx 4900, 8900, Willett 430, 460. Mực Linx 1010, 1059, Willett 201-0001-001 độ bám dính cực cao.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Ứng dụng thực tế */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            3. Ngành Ứng Dụng Mực In CIJ Công Nghiệp
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'In date HSD chai PET nước ngọt, bia, nước tinh khiết',
              'In NSX/HSD bao bì thực phẩm bánh kẹo, đồ đóng hộp',
              'In số lô & barcode ống nhựa PVC, HDPE, dây cáp điện',
              'In date trên nắp nhôm lon nước giải khát tốc độ cao',
              'In truy xuất nguồn gốc vỉ thuốc dược phẩm, mỹ phẩm',
              'In mã số nhảy ống cao su, kính cường lực, linh kiện ô tô'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-slate-700 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-red-600 mr-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bảng Giá Mực CIJ */}
        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            4. Bảng Giá Mực In CIJ &amp; Dung Môi Tương Thích
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto text-sm">
            * Chiết khấu hấp dẫn cho các nhà máy mua số lượng lớn hoặc theo hợp đồng cung ứng năm.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-white uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-xl">Tên Vật Tư CIJ</th>
                  <th className="p-4">Dung Tích / Quy Cách</th>
                  <th className="p-4">Giá Khuyến Mãi B2B</th>
                  <th className="p-4 rounded-r-xl">Tương Thích Máy In</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-semibold text-white">Mực in CIJ Đen (Gốc MEK / Ethanol)</td>
                  <td className="p-4">Bình 750ml / 1000ml</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 450.000đ / Bình</td>
                  <td className="p-4">Videojet, Domino, Linx, Willett</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Dung Môi Make-up Pha Mực</td>
                  <td className="p-4">Bình 750ml / 1000ml</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 250.000đ / Bình</td>
                  <td className="p-4">Videojet, Domino, Linx, Willett</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Nước Rửa Cleaner / Wash Solution</td>
                  <td className="p-4">Can 1 Lít / 5 Lít</td>
                  <td className="p-4 text-orange-400 font-bold">Chỉ từ 180.000đ / Lít</td>
                  <td className="p-4">Tất cả các dòng máy in CIJ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Câu Hỏi Thường Gặp FAQ */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center">
            <HelpCircle className="w-7 h-7 text-red-600 mr-3" />
            5. Câu Hỏi Thường Gặp Về Mực In CIJ
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
        <div className="text-center bg-gradient-to-r from-red-600 to-rose-700 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Nhận Mẫu Mực In CIJ Test Thử Tận Nhà Máy Miễn Phí!</h3>
          <p className="text-red-100 text-base mb-8 max-w-xl mx-auto">
            Liên hệ hotline VNPIS để nhận mẫu mực CIJ chạy thử trực tiếp trên dòng máy Videojet/Domino của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0987453866" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-red-700 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              <Phone className="w-5 h-5 mr-2" /> Zalo Kỹ Thuật: 0987 453 866 (Mr. Tâm)
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-red-950 text-white hover:bg-black font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              Yêu Cầu Báo Giá Mực <ArrowRight className="w-5 h-5 ml-2" />
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
