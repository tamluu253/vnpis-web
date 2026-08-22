export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Phone, HelpCircle, Layers, Cpu, Award } from 'lucide-react';

export const metadata = {
  title: 'Xưởng In Tampon Gia Công TP.HCM | In Pad Đa Bề Mặt VNPIS',
  description: 'Chuyên nhận in gia công in tampon (pad printing) trên bề mặt cong, lõm, ly nhựa, tô chén dĩa, linh kiện điện tử, quà tặng. Test bám dính 3M miễn phí. Hotline/Zalo: 0987 453 866.',
  alternates: {
    canonical: 'https://vnpis.com/in-tampon',
  },
};

export default function InTamponPage() {
  const faqList = [
    {
      q: 'In tampon (Pad Printing) khác gì so với in lụa thông thường?',
      a: 'In tampon sử dụng đầu in bằng silicone mềm linh hoạt dập mực từ bản thép (cliché) lên sản phẩm. Do đó, in tampon có khả năng in mượt mà trên các bề mặt cong, lõm sâu, gồ ghề hoặc hình dạng bất quy tắc mà in lụa phẳng không thể thực hiện được.'
    },
    {
      q: 'Mực in tampon có bị bong tróc khi giặt hoặc lau cồn không?',
      a: 'Xưởng in VNPIS sử dụng các dòng mực chuyên dụng chính hãng như Henkey, Dubuit, Ruco T200 kết hợp phụ gia tăng bám dính. Sản phẩm in xong đều qua công đoạn sấy nhiệt/UV, vượt qua bài test kéo băng keo 3M và thử nghiệm chà xát cồn 90 độ.'
    },
    {
      q: 'Xưởng VNPIS có nhận gia công in tampon số lượng ít không?',
      a: 'VNPIS nhận gia công mọi số lượng từ đơn hàng mẫu vài trăm sản phẩm đến các đơn hàng công nghiệp hàng triệu sản phẩm/tháng với công suất 50.000 sản phẩm/ngày.'
    },
    {
      q: 'Thời gian làm khuôn bản in tampon (Cliché) mất bao lâu?',
      a: 'Với hệ thống máy khắc Laser fiber cao cấp tại xưởng, VNPIS hỗ trợ ra bản thép mỏng/dày chỉ trong 30-60 phút, giúp quý khách lấy mẫu test ngay trong ngày.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-blue-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">Dịch Vụ In Tampon Gia Công</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-200">
            Giải Pháp In Pad Công Nghiệp Hàng Đầu TP.HCM
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Xưởng Gia Công In Tampon (Pad Printing) Đa Bề Mặt Giá Tận Gốc
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chuyên gia công in tampon chuyên nghiệp trên mọi chất liệu: Nhựa PP, PET, ABS, Kim loại, Thủy tinh, Gốm sứ, Silicone. Giải pháp in logo sắc nét trên bề mặt cong, lõm, hình cầu và sản phẩm công nghiệp phức tạp.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-w-4xl mx-auto">
          <img 
            src="/images/pad-printing-cups.jpg" 
            alt="Xưởng gia công in tampon pad printing đa bề mặt cong lõm VNPIS" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">50.000+</div>
            <div className="text-xs text-slate-600 font-medium">Sản Phẩm / Ngày</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-teal-600 mb-1">100%</div>
            <div className="text-xs text-slate-600 font-medium">Pass Test 3M &amp; Cồn</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">30 Phút</div>
            <div className="text-xs text-slate-600 font-medium">Làm Bản In Cliché</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">Miễn Phí</div>
            <div className="text-xs text-slate-600 font-medium">In Mẫu Thử Test Mực</div>
          </div>
        </div>

        {/* Section 1: In Tampon Là Gì */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            1. In Tampon (Pad Printing) Là Gì? Nguyên Lý Hoạt Động
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>In Tampon (Pad Printing)</strong> là công nghệ in gián tiếp sử dụng một đầu in dẻo bằng silicon (gọi là cục tampon) để truyền hình ảnh mực từ bản khắc kim loại/thép (gọi là bản Cliché) sang bề mặt vật phẩm cần in.
            </p>
            <p>
              Nhờ đặc tính đàn hồi tuyệt vời của đầu silicone, công nghệ in tampon biến những bề mặt khó in nhất như: hình cầu tròn, bề mặt lõm sâu, vân gồ ghề hay linh kiện góc cạnh trở nên dễ dàng. Đây là phương pháp tối ưu nhất hiện nay cho các ngành đồ chơi, linh kiện điện tử, đồ gia dụng và quà tặng doanh nghiệp.
            </p>
          </div>
        </section>

        {/* Section 2: Ưu Điểm Nổi Bật */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            2. Tại Sao Chọn Dịch Vụ In Tampon Gia Công Tại VNPIS?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In Chi Tiết Siêu Sắc Nét</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Độ phân giải bản in cao, cho phép in chữ siêu nhỏ (font 4pt), đường nét nét đứt 0.1mm trên các nút bấm, thiết bị y tế và bảng mạch điện tử.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Độ Bám Dính Tuyệt Đối</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sử dụng các hệ mực 2 thành phần (2K) cao cấp Henkey, Dubuit, Ruco T200 phối hợp chất trợ bám dính Primer, đảm bảo không bong tróc khi cọ rửa hay tiếp xúc hóa chất.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Hệ Thống Tự Động Nhiều Màu</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Trang bị dàn máy in Tampon cốc mực kín từ 1 màu đến 6 màu tự động có mâm xoay, giúp in nhanh và chính xác từng khớp màu đăng ký.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Sản Phẩm In Tampon Phổ Biến */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            3. Các Sản Phẩm In Tampon Gia Công Phổ Biến
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
            {[
              'Ly nhựa, tô chén dĩa nhựa PP, PET, Melamine',
              'Quà tặng bút viết, bình giữ nhiệt, móc khóa',
              'Linh kiện điện tử, bàn phím, công tắc, nút bấm',
              'Nón bảo hiểm, dụng cụ bảo hộ lao động',
              'Đồ chơi trẻ em, bóng golf, quả cầu thể thao',
              'Nắp chai nước ngọt, hũ mỹ phẩm, chai thủy tinh',
              'Thiết bị y tế, xilanh, ống nghiệm, nhãn dán',
              'Vỏ máy sấy tóc, bàn ủi, đồ gia dụng gia đình'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-slate-700 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bảng Giá In Tampon Tham Khảo */}
        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            4. Bảng Giá Gia Công In Tampon Tham Khảo
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto text-sm">
            * Giá thực tế phụ thuộc vào số lượng đơn hàng, kích thước logo, số màu in và yêu cầu mực in đặc chủng.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-white uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-xl">Số Lượng Sản Phẩm</th>
                  <th className="p-4">In 1 Màu / 1 Mặt</th>
                  <th className="p-4">In 2 Màu / 2 Mặt</th>
                  <th className="p-4 rounded-r-xl">Thời Gian Giao Hàng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-semibold text-white">500 – 1.000 SP</td>
                  <td className="p-4">500đ – 800đ / SP</td>
                  <td className="p-4">900đ – 1.400đ / SP</td>
                  <td className="p-4">1 – 2 Ngày</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">1.000 – 10.000 SP</td>
                  <td className="p-4">250đ – 450đ / SP</td>
                  <td className="p-4">500đ – 800đ / SP</td>
                  <td className="p-4">2 – 3 Ngày</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Trên 10.000 SP</td>
                  <td className="p-4 text-orange-400 font-bold">Liên hệ giá xưởng</td>
                  <td className="p-4 text-orange-400 font-bold">Liên hệ giá xưởng</td>
                  <td className="p-4">Theo tiến độ chuyền</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Câu Hỏi Thường Gặp FAQ */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center">
            <HelpCircle className="w-7 h-7 text-blue-600 mr-3" />
            5. Câu Hỏi Thường Gặp Về Dịch Vụ In Tampon
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
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bạn Cần Báo Giá Gia Công In Tampon Tận Xưởng?</h3>
          <p className="text-blue-100 text-base mb-8 max-w-xl mx-auto">
            Liên hệ ngay với đội ngũ kỹ sư VNPIS để nhận mẫu in test thử miễn phí trên sản phẩm thực tế của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0987453866" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-blue-700 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              <Phone className="w-5 h-5 mr-2" /> Zalo Kỹ Thuật: 0987 453 866 (Mr. Tâm)
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-blue-900 text-white hover:bg-blue-950 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
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
