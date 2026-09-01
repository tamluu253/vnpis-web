export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, ArrowRight, ExternalLink, Building2, Layers, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import ConsultationForm from '@/components/ui/ConsultationForm';

export const metadata = {
  title: 'Liên Hệ Công ty TNHH VNPIS | Nhận Báo Giá In Tampon, In Lụa, In KTS',
  description: 'Liên hệ Công ty TNHH VNPIS (Địa chỉ: 18 Đường số 4, KDC Đại Phúc Green Villas, Bình Hưng, TP.HCM). Chuyên gia công in Tampon ly tô chén nhựa, in lụa bao bì/vải, in QR Code biến đổi. Hỗ trợ in mẫu thử miễn phí & hotline 24/7.',
  alternates: {
    canonical: 'https://vnpis.com/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-24 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-xs sm:text-sm font-bold tracking-wider mb-6 border border-blue-500/30 uppercase">
              <Sparkles className="w-4 h-4 text-blue-400" /> Công ty TNHH VNPIS
            </span>
            <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-white leading-tight">
              Liên Hệ Trực Tiếp Để Nhận <br className="hidden md:block"/>
              Báo Giá Gia Công In Ấn B2B Tốt Nhất
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Xưởng gia công **VNPIS** (thuộc Công ty TNHH VNPIS) chuyên gia công in Tampon, in Lụa, in UV cuộn và in dữ liệu biến đổi nhảy số series, QR Code động. Trực tiếp in test mẫu sản phẩm miễn phí cho khách hàng trước khi chốt đơn.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 mt-12">
            {/* Phone Card */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Hotline Kỹ Thuật &amp; Báo Giá 24/7</div>
                <div className="text-sm font-extrabold text-white leading-snug mt-1">
                  Mr. Tâm: <a href="tel:0987453866" className="text-blue-400 hover:underline">0987 453 866</a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Email Tiếp Nhận Báo Giá &amp; File In</div>
                <div className="text-sm font-bold text-white mt-1">info@vnpis.com</div>
                <div className="text-[11px] text-slate-400">Phản hồi trong 30 phút</div>
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 p-5 rounded-2xl flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xs font-semibold text-slate-400">Thời Gian Vận Hành Xưởng</div>
                <div className="text-sm font-bold text-white mt-1">Thứ 2 - Thứ 7: 8h - 18h</div>
                <div className="text-[11px] text-slate-400">Nhận gia công ca đêm theo hợp đồng</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DỊCH VỤ IN GIA CÔNG CỐT LỖI Solved by In An VNPIS */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest block mb-2">Năng Lực Phục Vụ</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Doanh Nghiệp Của Bạn Đang Cần Gia Công Sản Phẩm Nào?
            </h2>
            <p className="text-slate-600 text-base md:text-lg">
              Xưởng in VNPIS Solutions trang bị hệ thống máy in tự động công suất cao, sẵn sàng nhận các đơn hàng gia công phức tạp nhất.
            </p>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mt-4" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-blue-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mb-6 text-xl font-extrabold group-hover:scale-110 transition-transform">
                  01
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Gia Công In Tampon (Pad Printing)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  Chuyên in logo, thông số trên bề mặt cong, lõm, hình cầu hoặc gồ ghề: tô chén ly dĩa nhựa PP/PET, bình giữ nhiệt, thỏi son mỹ phẩm, nút bấm thiết bị điện tử.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">Ưu điểm xưởng VNPIS:</span>
                <p className="text-sm font-semibold text-slate-800">
                  Mực bám siêu cường pass test 3M, nét in nhỏ sắc nét không nhòe.
                </p>
              </div>
            </div>

            {/* Service 2 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-teal-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mb-6 text-xl font-extrabold group-hover:scale-110 transition-transform">
                  02
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  Gia Công In Lụa (Screen Printing)
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  In màng nhựa phẳng, túi nilon, túi giấy bao bì, vải thun may mặc, áo đồng phục, tấm kim loại và vật liệu quảng cáo với độ phủ màu cao, màu sắc tươi sáng.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-teal-600 uppercase tracking-wider block mb-1">Ưu điểm xưởng VNPIS:</span>
                <p className="text-sm font-semibold text-slate-800">
                  Đáp ứng sản lượng 50.000+ sản phẩm/ngày, giao hàng đúng hẹn.
                </p>
              </div>
            </div>

            {/* Service 3 */}
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:shadow-xl hover:border-purple-300 transition-all flex flex-col justify-between group">
              <div>
                <div className="w-14 h-14 bg-purple-100 text-purple-700 rounded-2xl flex items-center justify-center mb-6 text-xl font-extrabold group-hover:scale-110 transition-transform">
                  03
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">
                  In KTS &amp; QR Code Dữ Liệu Biến Đổi
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  In mã QR Code biến đổi, Barcode mã vạch, Số Serial nhảy liên tục trực tiếp lên tem nhãn, thùng carton hoặc bề mặt sản phẩm để quản lý kho &amp; chống hàng giả.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <span className="text-xs font-bold text-purple-600 uppercase tracking-wider block mb-1">Ưu điểm xưởng VNPIS:</span>
                <p className="text-sm font-semibold text-slate-800">
                  Tích hợp hệ thống camera kiểm tra mã lỗi (Vision Inspection) tự động.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BANNERS CROSS-LINKING TO EQUIPMENT SITE (vnpis.com) */}
      <section className="py-16 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-slate-800/90 border border-slate-700 p-8 md:p-10 rounded-3xl shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold border border-orange-500/30 uppercase">
                <Layers className="w-4 h-4" /> Hệ Sinh Thế Máy Móc &amp; Vật Tư In VNPIS
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
                Bạn Muốn Tự Mua Thiết Bị &amp; Mực In Để Chủ Động Sản Xuất Tại Nhà Máy?
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Bên cạnh dịch vụ gia công in ấn tại xưởng của **Công ty TNHH VNPIS**, cùng thuộc hệ sinh thái chủ sở hữu VNPIS là công ty chuyên cung cấp chính hãng các dòng **Máy in tampon, Máy in lụa tự động, Mực in công nghiệp Henkey/Dubuit, Hộp mực TIJ &amp; Đầu in phun Ricoh/Epson**.
              </p>
            </div>
            <div className="shrink-0 w-full lg:w-auto text-center">
              <a
                href="https://vnpis.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-extrabold rounded-2xl shadow-lg shadow-orange-500/25 transition-all text-sm md:text-base whitespace-nowrap hover:scale-105"
              >
                <span>Khám Phá Thiết Bị Tại VNPIS.COM</span>
                <ExternalLink className="w-5 h-5 ml-2" />
              </a>
              <span className="block text-xs text-slate-400 mt-2">Xem danh mục máy in &amp; vật tư mực in B2B</span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ĐỊA CHỈ XƯỞNG & BẢN ĐỒ ĐỊNH VỊ CỦA Công ty TNHH VNPIS */}
      <section className="py-20 bg-slate-100 border-y border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Address Info Column */}
            <div className="lg:col-span-6 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-lg text-slate-900 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
                  <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider rounded-full">
                    Địa Chỉ &amp; Định Vị Xưởng
                  </span>
                  <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-6">Công ty TNHH VNPIS</h2>
                
                <div className="space-y-6 text-slate-700 text-base leading-relaxed">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-600 mr-4 shrink-0 mt-1" />
                    <div className="space-y-1">
                      <strong className="text-slate-900 block text-lg font-bold mb-2">Hệ thống địa chỉ Công ty TNHH VNPIS (MST: 0318266611):</strong>
                      <div className="text-sm space-y-1.5">
                        <p><strong className="text-slate-900">Trụ sở chính:</strong> Tầng 1, 202 Lê Lai, Phường Bến Thành, TP. Hồ Chí Minh.</p>
                        <p><strong className="text-slate-900">Địa điểm KD 1:</strong> 62 Trần Thị Nơi, Phường Chánh Hưng, TP. Hồ Chí Minh.</p>
                        <p><strong className="text-slate-900">Địa điểm KD 2 (Xưởng sản xuất):</strong> 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="w-6 h-6 text-blue-600 mr-4 shrink-0 mt-1" />
                    <div>
                      <strong className="text-slate-900 block text-lg font-bold mb-1">Hotline Kinh Doanh &amp; Tư Vấn Kỹ Thuật 24/7:</strong>
                      <div className="font-bold text-blue-600 text-lg mt-1">
                        <a href="tel:0987453866" className="hover:underline flex items-center gap-1">
                          Mr. Tâm: 0987 453 866
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-blue-600 mr-4 shrink-0" />
                    <div>
                      <strong className="text-slate-900 text-base font-bold mr-2">Email báo giá &amp; tiếp nhận file thiết kế:</strong>
                      <span className="text-blue-600 font-semibold">info@vnpis.com</span>
                    </div>
                  </div>

                  <div className="flex items-center pt-2">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 mr-4 shrink-0" />
                    <span className="font-semibold text-slate-800 text-sm">
                      Hỗ trợ in test mẫu sản phẩm (Sample testing) trực tiếp và giao nhận hàng gia công tận nơi trên toàn quốc.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <a
                  href="https://share.google/N6YpipmVmhVDnLSBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-md transition-all text-sm uppercase tracking-wider"
                >
                  <MapPin className="w-4 h-4 text-orange-300" />
                  <span>Mở Chỉ Đường Trên Google Maps</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Embedded Google Map Column */}
            <div className="lg:col-span-6 bg-white p-4 rounded-3xl border border-slate-200 shadow-lg min-h-[400px] flex flex-col">
              <div className="flex items-center justify-between p-3 mb-2 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" /> Bản Đồ Vị Trí VNPIS (Bình Hưng, TP.HCM)
                </span>
                <a
                  href="https://share.google/N6YpipmVmhVDnLSBA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-blue-600 hover:text-blue-800 font-extrabold flex items-center gap-1"
                >
                  <span>Chỉ đường</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-slate-200 relative flex-grow">
                <iframe
                  title="Bản đồ chỉ đường Google Maps Công ty TNHH VNPIS"
                  src="https://maps.google.com/maps?q=18+%C4%90%C6%B0%E1%BB%9Dng+s%E1%BB%91+4,+KDC+%C4%90%E1%BA%A1i+Ph%C3%BAc+Green+Villas,+B%C3%ACnh+H%C6%B0ng,+TP.+H%E1%BB%93+Ch%C3%AD+Minh&t=&z=16&ie=UTF8&iwloc=&output=embed"
                  className="w-full h-full min-h-[380px] border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FORM YÊU CẦU TƯ VẤN & BÁO GIÁ */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <ConsultationForm
            title="Gửi Yêu Cầu Báo Giá In Gia Công &amp; Làm Mẫu Miễn Phí"
            subtitle="Đội ngũ kỹ thuật xưởng in VNPIS Solutions sẽ tiếp nhận thông số sản phẩm, hỗ trợ in mẫu thử (sample test) thực tế và gửi bảng giá gia công tối ưu nhất cho doanh nghiệp."
            pageTitle="In An VNPIS Contact Page"
          />
        </div>
      </section>
    </div>
  );
}
