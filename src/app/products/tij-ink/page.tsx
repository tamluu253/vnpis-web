import React from 'react';
import { ArrowRight, CheckCircle2, Zap, MonitorSmartphone, Package, Target } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mực In Nhiệt TIJ (Thermal Inkjet) | Độ Phân Giải Cao | VNPIS',
  description: 'Mực in TIJ chất lượng cao dùng cho hộp mực 12.7mm, 25.4mm. In barcode, QR code siêu nét 600dpi, bám chắc trên thùng carton, bao bì màng, hộp giấy.',
};

export default function TIJInkPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-blue-900/60 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-orange-500/20 text-orange-300 text-sm font-semibold tracking-wider mb-6 border border-orange-500/30">
              SẢN PHẨM: MỰC IN TIJ (MỰC NHIỆT)
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Mực In TIJ - Giải Pháp In <span className="text-orange-400">Siêu Nét 600dpi</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Tối ưu cho in QR Code, Barcode, và thông tin truy xuất nguồn gốc trên mọi bao bì. Cắm là in, không rườm rà súc rửa, tiết kiệm nhân sự tối đa.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-900 bg-white rounded-full hover:bg-slate-100 transition-colors shadow-lg">
                Yêu Cầu Báo Giá <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Thách thức khi dùng mực TIJ kém chất lượng</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mb-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Target className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mã Vạch, QR Không Đọc Được</h3>
              <p className="text-slate-600 leading-relaxed">Mực bị nhòe hoặc đứt nét, dẫn đến máy quét mã vạch không thể đọc, gây gián đoạn khâu kiểm kho và xuất hàng.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Package className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Mực Lau Dễ Bay Chữ</h3>
              <p className="text-slate-600 leading-relaxed">Mực bám kém trên túi nilon, màng PE bóng. Chỉ cần vuốt tay nhẹ hoặc ma sát trong lúc vận chuyển là mất số lô, NSX.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <Zap className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Nghẹt Đầu Phun Vĩnh Viễn</h3>
              <p className="text-slate-600 leading-relaxed">Do bản chất cartridge dính liền đầu phun, dùng mực dỏm khiến đầu phun bị tắt nghẽn, làm hỏng toàn bộ hộp mực đắt tiền.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION */}
      <section className="py-24 bg-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
            <div className="md:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Chất Lượng Vượt Trội Từ VNPIS</h2>
              <ul className="space-y-4 mb-8">
                {[
                  "Độ phân giải siêu nét lên tới 600dpi",
                  "Khô ngay lập tức trên túi nilon, nhôm, nhựa",
                  "Chống nghẹt đầu kim (Decap time dài)",
                  "Tương thích hộp mực 12.7mm & 25.4mm",
                  "Hoạt động ổn định ở tốc độ băng chuyền cao"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="#contact" className="text-orange-600 font-bold hover:text-orange-700 flex items-center transition-colors">
                Nhận Báo Giá Mực TIJ <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2 bg-slate-900 relative min-h-[300px]">
              <video 
                src="/media/tij-chips-bag-test.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center p-6">
                 <div className="bg-black/60 backdrop-blur-sm px-6 py-4 rounded-2xl border border-slate-700 max-w-sm text-center">
                    <p className="text-white font-bold text-lg mb-1">In trực tiếp trên bao bì PE</p>
                    <p className="text-slate-300 text-sm">Test thực tế: Mực TIJ khô ngay, cào không tróc.</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEAD FORM SECTION */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Bạn Cần Tìm Hộp Mực TIJ Tương Thích?</h2>
            <p className="text-slate-400 text-lg">Để lại thông tin máy in và bề mặt in, chúng tôi sẽ báo giá dòng mực chuẩn nhất cho bạn.</p>
          </div>
          <div className="bg-slate-800 rounded-3xl p-8 md:p-12 border border-slate-700 shadow-2xl">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Họ & Tên *</label>
                  <input type="text" className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="Nhập họ tên..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Số Điện Thoại *</label>
                  <input type="tel" className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" placeholder="Nhập số điện thoại..." />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Bạn cần in trên bề mặt nào?</label>
                <select className="w-full px-4 py-3 bg-slate-900 border border-slate-600 rounded-lg text-white focus:border-orange-500 outline-none appearance-none">
                  <option>Thùng Carton (Thấm hút)</option>
                  <option>Túi Nilon / Bao bì màng nhựa (Không thấm hút)</option>
                  <option>Kim loại / Thủy tinh</option>
                  <option>Khác</option>
                </select>
              </div>
              <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/20">
                Gửi Yêu Cầu Báo Giá
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
