import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Zap, ShieldCheck, Factory, Settings, Crosshair, BarChart3, Phone } from 'lucide-react';

export const metadata = {
  title: 'UV Single Pass Printing | In Dữ Liệu Biến Đổi Tốc Độ Cao | VNPIS',
  description: 'Giải pháp máy in UV Single Pass công nghiệp in trực tiếp trên dây chuyền. Tối ưu cho Variable Data, mã QR, Barcode, Serial kết hợp hệ thống Vision Camera.',
};

export default function UVSinglePassPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-blue-900/20 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-widest mb-6 border border-blue-500/30 uppercase">
            Giải Pháp Cốt Lõi ⭐⭐⭐⭐⭐
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Công Nghệ In <span className="text-orange-500">UV Single Pass</span> Tốc Độ Cao
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Giải pháp in "át chủ bài" của VNPIS. In trực tiếp trên dây chuyền (Inline Printing) với tốc độ vượt trội. Tối ưu hoàn hảo cho in Dữ Liệu Biến Đổi, QR Code, và Barcode công nghiệp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/contact" className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-orange-600 rounded-lg hover:bg-orange-700 transition-all duration-300 shadow-xl shadow-orange-600/30">
              Nhận Tư Vấn Kỹ Thuật <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM IT SOLVES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Tại sao nhà máy cần UV Single Pass?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-8" />
            <p className="text-lg text-slate-600">Loại bỏ sự phụ thuộc vào tem nhãn in sẵn, in đa dạng thiết kế và dữ liệu động ngay trên dây chuyền với chi phí trên mỗi bản in thấp nhất.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Variable Data Printing (VDP)</h3>
              <p className="text-slate-600 leading-relaxed">In thông tin thay đổi liên tục trên mỗi sản phẩm: Mã QR định danh độc nhất, Barcode nhảy số, Serial number bảo mật.</p>
            </div>
            
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Inline Printing Tốc Độ Cao</h3>
              <p className="text-slate-600 leading-relaxed">Được tích hợp trực tiếp vào dây chuyền sản xuất hiện tại. In với tốc độ lên đến 50m/phút mà không làm chậm quy trình.</p>
            </div>

            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all">
              <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <Crosshair className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Tích Hợp Vision Camera</h3>
              <p className="text-slate-600 leading-relaxed">Kết hợp hệ thống camera kiểm tra tự động, loại bỏ 100% sản phẩm in lỗi, đọc và xác thực mã QR ngay lập tức sau khi in.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. APPLICATION & MATERIALS */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Khả Năng Tương Thích Vượt Trội</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Công nghệ mực UV sấy khô ngay lập tức bằng đèn LED UV, cho phép bám dính hoàn hảo trên mọi chất liệu mà không cần phủ bề mặt trước.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  "Nhựa (PP, PE, PET, PVC)",
                  "Màng ghép, Bao bì mềm",
                  "Kim loại, Nhôm, Thép",
                  "Thủy tinh, Kính",
                  "Gấy Couche, Giấy kraft",
                  "Thẻ nhựa, Thẻ RFID"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center bg-slate-800 p-4 rounded-lg border border-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="lg:w-1/2">
               <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 p-8 flex flex-col justify-center text-center">
                 <Factory className="w-24 h-24 text-slate-600 mx-auto mb-6" />
                 <h3 className="text-2xl font-bold text-slate-300 mb-4">Sức Mạnh Của Sự Tập Trung</h3>
                 <p className="text-slate-400">Rất ít công ty tại Việt Nam có thể làm chủ và triển khai trọn vẹn giải pháp UV Single Pass tích hợp Inline. VNPIS tự hào là một trong những đơn vị tiên phong với kinh nghiệm triển khai thực chiến.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ECOSYSTEM */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Hệ Sinh Thái UV Single Pass Của VNPIS</h2>
          <p className="text-lg text-slate-600 mb-12">Chúng tôi cung cấp toàn bộ chuỗi giá trị, đảm bảo dây chuyền của bạn hoạt động mượt mà nhất.</p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/products/uv-printers" className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Thiết Bị In</h3>
              <p className="text-sm text-slate-500">Máy in UV Single Pass nhập khẩu châu Âu, Nhật Bản.</p>
            </Link>
            <div className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Mực UV</h3>
              <p className="text-sm text-slate-500">Mực UV bám dính cao, khô nhanh, an toàn môi trường.</p>
            </div>
            <Link href="/products/printheads" className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Đầu In</h3>
              <p className="text-sm text-slate-500">Đầu in công nghiệp Ricoh, Epson, Kyocera.</p>
            </Link>
            <Link href="/services/uv-printing-service" className="bg-white p-6 rounded-xl border border-slate-200 hover:border-blue-500 hover:shadow-lg transition-all group">
              <h3 className="font-bold text-slate-900 group-hover:text-blue-600 mb-2">Dịch Vụ In</h3>
              <p className="text-sm text-slate-500">Nhận gia công in Dữ Liệu Biến Đổi tại xưởng VNPIS.</p>
            </Link>
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Chuyển Đổi Số Dây Chuyền Sản Xuất Ngay Hôm Nay</h2>
          <p className="text-xl text-blue-100 mb-10">Kết nối với kỹ sư hệ thống của VNPIS để nhận phân tích tính khả thi và báo giá triển khai giải pháp UV Single Pass.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-blue-600 bg-white rounded-lg hover:bg-slate-50 transition-colors shadow-2xl">
            Yêu Cầu Gọi Lại Ngay <Phone className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
