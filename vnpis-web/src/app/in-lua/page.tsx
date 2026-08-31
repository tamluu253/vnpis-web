export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Phone, HelpCircle, Layers, Maximize2, Award } from 'lucide-react';

export const metadata = {
  title: 'Xưởng In Lụa Gia Công TP.HCM | In Bao Bì, Vải, Nhựa Giá Tận Gốc',
  description: 'Chuyên nhận gia công in lụa (screen printing) túi nilon, túi giấy, bao bì đóng gói, vải thun, màng nhựa phẳng, chai lọ xoay tròn. Độ bền màu cao. Hotline/Zalo: 0987 453 866.',
  alternates: {
    canonical: 'https://vnpis.com/in-lua',
  },
};

export default function InLuaPage() {
  const faqList = [
    {
      q: 'In lụa gia công có thể in trên những chất liệu nào?',
      a: 'In lụa có tính linh hoạt cực cao, áp dụng mượt mà trên túi nilon PE/PP/HD, túi giấy kraft, vải thun cotton, áo đồng phục, màng nhựa PVC/PET, kính, mica, nhôm và inox.'
    },
    {
      q: 'Kỹ thuật in lụa xoay tròn khác gì so với in lụa phẳng?',
      a: 'In lụa phẳng áp dụng cho bề mặt phẳng như túi, tấm nhựa, vải. Trong khi đó, in lụa xoay tròn (Roll-to-roll / Cylindrical screen printing) chuyên dùng cho các sản phẩm hình trụ như chai lọ mỹ phẩm, ly thủy tinh, ống nhựa và lon nhôm.'
    },
    {
      q: 'Xưởng VNPIS sử dụng loại mực in lụa nào để tránh bong tróc?',
      a: 'VNPIS nhập khẩu trực tiếp mực in lụa UV và mực gốc dầu chính hãng Sericom, Afford KT1, Henkey. Tất cả các sản phẩm sau khi in đều qua máy sấy băng tải UV/Nhiệt giúp mực bám chết vào bề mặt, chịu ma sát và bay màu.'
    },
    {
      q: 'Giá gia công in lụa được tính như thế nào?',
      a: 'Giá in lụa phụ thuộc vào diện tích vùng in, số lượng màu sắc trong file thiết kế, loại mực sử dụng và tổng số lượng sản phẩm. Đơn hàng số lượng càng lớn thì chi phí trên mỗi sản phẩm càng rẻ.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-teal-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Dịch Vụ In Lụa Gia Công</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 rounded-full bg-teal-100 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
            Xưởng In Lụa Công Nghiệp Công Suất Lớn TP.HCM
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Gia Công In Lụa (Screen Printing) Đa Chất Liệu Giá Tận Xưởng
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chuyên nhận gia công in lụa màng nhựa phẳng, túi giấy, túi nilon bao bì, vải thun, áo đồng phục, màng nhựa PVC/PET, chai lọ xoay tròn với hệ thống mực UV cao cấp cho màu sắc tươi sáng và bền đẹp tuyệt đối.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-w-4xl mx-auto">
          <img 
            src="/images/screen-printing-bags.jpg" 
            alt="Xưởng gia công in lụa bao bì túi nilon vải thun VNPIS" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-teal-600 mb-1">100.000+</div>
            <div className="text-xs text-slate-600 font-medium">Bao Bì / Ngày</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">Mực UV</div>
            <div className="text-xs text-slate-600 font-medium">Khô Ngay - Bền Màu</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">Tự Động</div>
            <div className="text-xs text-slate-600 font-medium">Máy In Lụa Cuộn &amp; Xoay</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">Miễn Phí</div>
            <div className="text-xs text-slate-600 font-medium">Duyệt Mẫu &amp; Kéo Lụa Test</div>
          </div>
        </div>

        {/* Section 1: In Lụa Là Gì */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            1. In Lụa (Screen Printing) Là Gì?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>In Lụa (hay in lưới - Screen Printing)</strong> là phương pháp in ấn dựa trên nguyên lý mực được gạt qua một lớp lưới tơ lụa hoặc lưới kim loại được căng trên khung gỗ/nhôm. Các mắt lưới ở vị trí không có hình ảnh sẽ bị bịt kín bởi keo chụp bản, chỉ cho phép mực đi qua các phần có chi tiết thiết kế.
            </p>
            <p>
              Điểm mạnh nhất của in lụa là cho phép phủ lớp mực rất dày, tạo độ nổi nhẹ, màu sắc lên cực kỳ rực rỡ và độ bền thời tiết vượt trội so với các công nghệ in phun thông thường.
            </p>
          </div>
        </section>

        {/* Section 2: Phương Pháp In Lụa */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            2. Các Phương Pháp In Lụa Gia Công Tại VNPIS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Maximize2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In Lụa Phẳng Tự Động</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Áp dụng cho túi nilon PE/PP, túi giấy, tấm nhựa dẻo, bảng hiệu mica, mạch in PCB, vỏ thùng carton và linh kiện phẳng.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In Lụa Xoay Tròn Chai Lọ</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Máy in lụa xoay 360 độ chuyên dùng cho chai lọ mỹ phẩm, hũ nhựa, ly thủy tinh, bình nước nhôm và ống nhựa hình trụ.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In Lụa Vải &amp; May Mặc</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Bàn in lụa xoay nhiều màu chuyên in áo thun đồng phục, balo, túi vải không dệt với mực dẻo, plastisol và mực UV co giãn.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Sản Phẩm In Lụa Phổ Biến */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            3. Các Sản Phẩm In Lụa Gia Công Phổ Biến
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'Túi nilon PE, PP, HD bao bì shop quần áo, siêu thị',
              'Túi giấy kraft, bao bì giấy couche, vỏ hộp quà tặng',
              'Vải thun cotton, áo đồng phục công ty, balo túi xách',
              'Tấm nhựa phẳng, bảng hiệu mica, bảng tên inox/nhôm',
              'Vỏ chai lọ mỹ phẩm, hũ nhựa, ly thủy tinh xoay tròn',
              'Tem nhãn decal & bao bì đóng gói công nghiệp'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-slate-700 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-teal-600 mr-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bảng Giá In Lụa Tham Khảo */}
        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            4. Bảng Giá Gia Công In Lụa Tham Khảo
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto text-sm">
            * Giá thực tế phụ thuộc vào kích thước bản in, số màu kéo lụa và loại mực đặc chủng.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-white uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-xl">Loại Sản Phẩm In</th>
                  <th className="p-4">Số Lượng 1.000 SP</th>
                  <th className="p-4">Số Lượng 5.000 SP</th>
                  <th className="p-4 rounded-r-xl">Thời Gian Hoàn Thành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-semibold text-white">Túi nilon PE/PP (1 màu)</td>
                  <td className="p-4">200đ – 350đ / cái</td>
                  <td className="p-4">120đ – 220đ / cái</td>
                  <td className="p-4">1 – 2 Ngày</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Túi giấy Kraft / Couche</td>
                  <td className="p-4">400đ – 700đ / cái</td>
                  <td className="p-4">250đ – 450đ / cái</td>
                  <td className="p-4">2 – 3 Ngày</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Chai lọ mỹ phẩm (In xoay tròn)</td>
                  <td className="p-4">600đ – 1.000đ / cái</td>
                  <td className="p-4 font-bold text-orange-400">Liên hệ giá xưởng</td>
                  <td className="p-4">2 – 4 Ngày</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Câu Hỏi Thường Gặp FAQ */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center">
            <HelpCircle className="w-7 h-7 text-teal-600 mr-3" />
            5. Câu Hỏi Thường Gặp Về Dịch Vụ In Lụa
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
        <div className="text-center bg-gradient-to-r from-teal-600 to-emerald-700 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bạn Cần Báo Giá Gia Công In Lụa Giá Tốt Tận Xưởng?</h3>
          <p className="text-teal-100 text-base mb-8 max-w-xl mx-auto">
            Liên hệ ngay xưởng VNPIS để nhận báo giá chi tiết tận gốc và kéo lụa test thử mẫu miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0987453866" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-teal-700 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              <Phone className="w-5 h-5 mr-2" /> Zalo Kỹ Thuật: 0987 453 866 (Mr. Tâm)
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-teal-950 text-white hover:bg-black font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              Gửi Yêu Cầu Báo Giá <ArrowRight className="w-5 h-5 ml-2" />
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
