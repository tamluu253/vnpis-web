export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, ShieldCheck, Zap, Phone, HelpCircle, QrCode, Cpu, Database } from 'lucide-react';

export const metadata = {
  title: 'Dịch Vụ In Biến Đổi Dữ Liệu Kỹ Thuật Số (VDP) & QR Code | VNPIS',
  description: 'Chuyên gia công in biến đổi dữ liệu kỹ thuật số (Variable Data Printing - VDP), mã QR Code động, Barcode, Serial nhảy chống hàng giả tận nhà máy. Hotline/Zalo: 0987 453 866.',
  alternates: {
    canonical: 'https://vnpis.com/in-ky-thuat-so',
  },
};

export default function InKyThuatSoPage() {
  const faqList = [
    {
      q: 'In biến đổi dữ liệu kỹ thuật số (Variable Data Printing - VDP) là gì?',
      a: 'In dữ liệu biến đổi (VDP) là công nghệ in kỹ thuật số cho phép thay đổi các yếu tố nội dung như mã QR Code, mã vạch Barcode, số Serial, chữ hoặc hình ảnh trên từng sản phẩm/bao bì trong cùng một lượt in mà không cần dừng dây chuyền.'
    },
    {
      q: 'Hệ thống VNPIS in mã QR biến đổi từ nguồn dữ liệu nào?',
      a: 'VNPIS kết nối trực tiếp với file dữ liệu Excel, CSV, cơ sở dữ liệu SQL/ERP hoặc phần mềm truy xuất nguồn gốc của doanh nghiệp để in chính xác từng mã QR/Serial duy nhất không trùng lặp.'
    },
    {
      q: 'Dịch vụ in dữ liệu biến đổi tận nơi của VNPIS hoạt động ra sao?',
      a: 'Đội ngũ kỹ sư VNPIS mang hệ thống máy in UV Single Pass hoặc máy in TIJ công nghiệp cùng băng tải tốc độ cao đến trực tiếp nhà máy hoặc kho hàng của quý khách để tiến hành gia công in mã QR/Serial lên bao bì, giúp giảm chi phí vận chuyển vật tư.'
    },
    {
      q: 'Camera kiểm tra Vision System giúp ích gì trong quá trình in VDP?',
      a: 'Hệ thống Vision Camera soi đọc 100% mã QR/Barcode ngay sau khi in ở tốc độ 60m/phút, tự động phát hiện và loại bỏ các sản phẩm bị mờ, lỗi mã hoặc trùng lặp dữ liệu.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-6">
          <Link href="/" className="hover:text-purple-600">Trang chủ</Link>
          <span className="mx-2">/</span>
          <span className="text-slate-900 font-semibold">In Biến Đổi Dữ Liệu Kỹ Thuật Số (VDP)</span>
        </nav>

        {/* Header Hero */}
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 rounded-full bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200">
            Giải Pháp In QR Code &amp; Số Serial Biến Đổi Chống Hàng Giả
          </span>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
            Gia Công In Biến Đổi Dữ Liệu Kỹ Thuật Số (VDP) Tận Nhà Máy
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Chuyên gia công in kỹ thuật số trực tiếp mã QR Code động, Barcode biến đổi, số Serial nhảy liên tục trên sản phẩm &amp; bao bì. Giải pháp hàng đầu phục vụ quản lý kho thông minh, tem truy xuất nguồn gốc và chống hàng giả.
          </p>
        </div>

        {/* Hero Banner Image */}
        <div className="mb-16 rounded-3xl overflow-hidden shadow-lg border border-slate-200 max-w-4xl mx-auto">
          <img 
            src="/images/qr-code-printing.jpg" 
            alt="Dịch vụ in biến đổi dữ liệu kỹ thuật số VDP in mã QR biến đổi VNPIS" 
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-purple-600 mb-1">60 m/Phút</div>
            <div className="text-xs text-slate-600 font-medium">Tốc Độ In UV Single Pass</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-blue-600 mb-1">100%</div>
            <div className="text-xs text-slate-600 font-medium">Vision Camera Soi Mã Lỗi</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-teal-600 mb-1">0 Trùng Lặp</div>
            <div className="text-xs text-slate-600 font-medium">Cơ Sở Dữ Liệu Độc Quyền</div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center shadow-sm">
            <div className="text-3xl font-extrabold text-orange-600 mb-1">Tận Nơi</div>
            <div className="text-xs text-slate-600 font-medium">Kỹ Thuật Đến Tận Nhà Máy</div>
          </div>
        </div>

        {/* Section 1: In dữ liệu biến đổi VDP là gì */}
        <section className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-sm mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            1. In Biến Đổi Dữ Liệu Kỹ Thuật Số (VDP) Là Gì?
          </h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              <strong>In dữ liệu biến đổi (Variable Data Printing - VDP)</strong> là một hình thức in kỹ thuật số trong đó các yếu tố như văn bản, mã vạch, mã QR Code hoặc hình ảnh có thể được thay đổi tự động từ sản phẩm này sang sản phẩm khác mà không làm gián đoạn tốc độ chạy của chuyền sản xuất.
            </p>
            <p>
              Ví dụ: Khi in 100.000 vỏ hộp bao bì, mỗi vỏ hộp sẽ sở hữu 1 mã QR Code duy nhất chứa thông tin lô hàng, ngày giờ sản xuất, mã đại lý phân phối và mã xác thực chống hàng giả.
            </p>
          </div>
        </section>

        {/* Section 2: Công nghệ in VDP */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            2. Các Công Nghệ In Dữ Liệu Biến Đổi Tại VNPIS
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In UV Single Pass Tốc Độ Cao</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Đầu in công nghiệp Konica / Ricoh Gen 5 kết hợp đèn sấy LED UV giúp in mã QR biến đổi độ nét cao 600DPI trực tiếp trên màng bóng PET, túi nhôm và nắp chai.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <QrCode className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">In TIJ Gắn Băng Tải Chuyển Động</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Hệ thống máy in phun nhiệt TIJ mực dung môi khô nhanh, in số Serial biến đổi linh hoạt trên bao bì giấy, vỏ hộp thuốc và linh kiện.
              </p>
            </div>

            <div className="bg-white border border-slate-200 p-8 rounded-3xl shadow-sm">
              <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center font-bold text-xl mb-4">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Vision Camera Soi Mã Động</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Camera kiểm tra tự động quét đọc lại 100% mã QR ngay sau khi in, phát hiện mã mờ, mã lỗi và đẩy sản phẩm lỗi ra khỏi băng chuyền.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Ứng dụng thực tế */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6">
            3. Ứng Dụng Thực Tế Của In Biến Đổi Dữ Liệu
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              'In mã QR Code tem chống hàng giả & kích hoạt bảo hành',
              'In tem truy xuất nguồn gốc nông sản, thủy sản Export',
              'In mã vạch Barcode GS1 quản lý kho thông minh SME',
              'In số Serial nhảy liên tục trên thẻ cào, thẻ thành viên',
              'In mã trúng thưởng biến đổi cho chiến dịch Marketing',
              'In cá thể hóa tên khách hàng & địa chỉ theo file Excel'
            ].map((item, idx) => (
              <div key={idx} className="flex items-center text-slate-700 text-sm bg-slate-50 p-4 rounded-2xl border border-slate-200">
                <CheckCircle className="w-4 h-4 text-purple-600 mr-3 flex-shrink-0" />
                <span className="font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Bảng Giá In VDP */}
        <section className="bg-slate-900 text-white p-8 md:p-10 rounded-3xl shadow-xl mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4 text-center">
            4. Bảng Giá Gia Công In Dữ Liệu Biến Đổi Tham Khảo
          </h2>
          <p className="text-slate-300 text-center mb-8 max-w-2xl mx-auto text-sm">
            * Nhận mang thiết bị &amp; kỹ sư đến gia công trực tiếp tại nhà máy của khách hàng trên toàn quốc.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-300">
              <thead className="bg-slate-800 text-white uppercase text-xs">
                <tr>
                  <th className="p-4 rounded-l-xl">Số Lượng Sản Phẩm</th>
                  <th className="p-4">In Mã QR / Barcode Biến Đổi</th>
                  <th className="p-4">In QR + Số Serial Nhảy</th>
                  <th className="p-4 rounded-r-xl">Địa Điểm Triển Khai</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                <tr>
                  <td className="p-4 font-semibold text-white">10.000 – 50.000 SP</td>
                  <td className="p-4">80đ – 150đ / SP</td>
                  <td className="p-4">120đ – 200đ / SP</td>
                  <td className="p-4">Tại xưởng VNPIS / Nhà máy</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">50.000 – 500.000 SP</td>
                  <td className="p-4">40đ – 80đ / SP</td>
                  <td className="p-4">60đ – 110đ / SP</td>
                  <td className="p-4">Gia công tận nhà máy</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-white">Tràn Chuyền Hàng Triệu SP</td>
                  <td className="p-4 text-orange-400 font-bold">Liên hệ giá xưởng</td>
                  <td className="p-4 text-orange-400 font-bold">Liên hệ giá xưởng</td>
                  <td className="p-4">Lắp chuyền cố định 24/7</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 5: Câu Hỏi Thường Gặp FAQ */}
        <section className="bg-white border border-slate-200 p-8 md:p-10 rounded-3xl shadow-sm mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 flex items-center">
            <HelpCircle className="w-7 h-7 text-purple-600 mr-3" />
            5. Câu Hỏi Thường Gặp Về In Biến Đổi Dữ Liệu (VDP)
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
        <div className="text-center bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-10 rounded-3xl shadow-xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Bạn Cần Tư Vấn In QR Code &amp; Dữ Liệu Biến Đổi Tận Nhà Máy?</h3>
          <p className="text-purple-100 text-base mb-8 max-w-xl mx-auto">
            Liên hệ đội ngũ kỹ sư VNPIS để được khảo sát kỹ thuật và chạy mẫu test mã QR biến đổi trực tiếp tại nhà máy của bạn.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="https://zalo.me/0987453866" target="_blank" rel="noreferrer" className="inline-flex items-center px-8 py-4 bg-white text-purple-700 hover:bg-slate-100 font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              <Phone className="w-5 h-5 mr-2" /> Zalo Kỹ Thuật: 0987 453 866 (Mr. Tâm)
            </a>
            <Link href="/contact" className="inline-flex items-center px-8 py-4 bg-purple-950 text-white hover:bg-black font-extrabold rounded-2xl shadow-lg transition-colors text-sm">
              Yêu Cầu Khảo Sát Tận Nơi <ArrowRight className="w-5 h-5 ml-2" />
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
