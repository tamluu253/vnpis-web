import React from 'react';
import { ArrowRight, CheckCircle2, Factory, Droplets, ShieldCheck, Clock, Layers, Maximize } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mực In Phun Công Nghiệp CIJ | Tương Thích & Tiết Kiệm | VNPIS',
  description: 'Giải pháp mực in CIJ tương thích hoàn hảo cho Videojet, Domino, Linx, Markem-Imaje. Khô nhanh, bám dính siêu việt, chống chịu nhiệt độ cao.',
};

export default function CIJInkPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-blue-900/40 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 text-blue-300 text-sm font-semibold tracking-wider mb-6 border border-blue-500/30">
              SẢN PHẨM: MỰC IN CIJ
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight leading-tight">
              Mực In Phun Công Nghiệp <span className="text-blue-400">CIJ</span> Tương Thích Hoàn Hảo
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              Giải pháp thay thế ưu việt cho Videojet, Domino, Linx, Markem-Imaje. Tiết kiệm lên đến 40% chi phí vận hành mà vẫn đảm bảo độ bám dính và sắc nét vượt trội.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#contact" className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/30">
                Đăng Ký Test Mực Miễn Phí <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Nỗi đau của nhà máy khi dùng mực CIJ thông thường</h2>
            <div className="w-20 h-1 bg-red-500 mx-auto rounded-full mb-8" />
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Nghẹt Đầu In Thường Xuyên</h3>
              <p className="text-slate-600 leading-relaxed">Mực nhanh khô ở đầu phun nhưng lại lâu khô trên sản phẩm, gây tắc nghẽn, buộc dây chuyền phải dừng lại để súc rửa liên tục.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Layers className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Bám Dính Kém, Dễ Bong Tróc</h3>
              <p className="text-slate-600 leading-relaxed">In trên bề mặt trơn nhẵn như PE, PP, Thủy tinh hay kim loại dễ bị bay màu, trầy xước khi ma sát hoặc qua quá trình thanh trùng.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100 shadow-sm hover:shadow-md transition-all">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Droplets className="w-7 h-7 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Chi Phí Mực Chính Hãng Quá Cao</h3>
              <p className="text-slate-600 leading-relaxed">Bị độc quyền bởi hãng máy in, giá mực và dung môi bị đẩy lên quá cao làm đội chi phí sản xuất (OPEX) của nhà máy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SOLUTION & BENEFITS */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 px-4 py-2 rounded-full text-blue-400 font-semibold mb-6">
                <ShieldCheck className="w-5 h-5" />
                <span>Giải Pháp Từ VNPIS</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">Mực CIJ VNPIS - Hiệu Suất Tối Đa, Tối Ưu Chi Phí</h2>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Được tổng hợp từ các nguyên liệu cao cấp, mực in CIJ của VNPIS vượt qua các bài kiểm tra khắc nghiệt nhất: Luộc sôi, cấp đông, cồn công nghiệp.
              </p>
              <ul className="space-y-4">
                {[
                  "Tương thích 100% với Videojet, Domino, Linx, Markem-Imaje",
                  "Khô cực nhanh dưới 1 giây, chống lem nhòe",
                  "Bám dính siêu việt trên Thủy tinh, Nhựa PP/PE, Kim loại",
                  "Kháng cồn, kháng dung môi, chịu nhiệt độ thanh trùng",
                  "Giảm 30% - 40% chi phí vật tư in ấn hàng năm"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-200 text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl relative">
                 <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                    [Khu vực chèn Video/Hình ảnh thực tế test mực CIJ]
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. APPLICATIONS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Ứng Dụng Thực Tiễn Trong Ngành</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { name: 'Ngành Đồ Uống', desc: 'In date trên vỏ chai PET, thủy tinh nón đọng sương, lon nhôm.' },
              { name: 'Dây Cáp Điện', desc: 'Mực trắng/vàng tương phản cao, bám chắc trên vỏ cáp PE/PVC trơn tuột.' },
              { name: 'Thực Phẩm Đông Lạnh', desc: 'Kháng ẩm ướt, chịu nhiệt độ âm sâu không bong tróc NSX/HSD.' },
              { name: 'Linh Kiện Điện Tử', desc: 'Kháng cồn IPA, in siêu nhỏ sắc nét trên PCB, linh kiện mạ kẽm.' }
            ].map((app, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:border-blue-200 transition-colors">
                <h4 className="text-xl font-bold text-slate-900 mb-3">{app.name}</h4>
                <p className="text-slate-600">{app.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEAD FORM SECTION */}
      <section id="contact" className="py-24 bg-blue-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-blue-100">
            <div className="p-8 md:p-12 text-center bg-blue-600 text-white">
              <h2 className="text-3xl font-bold mb-4">Đăng Ký Test Mực Miễn Phí Tại Nhà Máy</h2>
              <p className="text-blue-100 text-lg">Đội ngũ kỹ sư VNPIS sẽ mang mẫu mực đến tận dây chuyền của bạn để kiểm chứng độ bám dính.</p>
            </div>
            <div className="p-8 md:p-12">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Họ & Tên *</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Nhập họ tên..." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Số Điện Thoại *</label>
                    <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Nhập số điện thoại..." />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Công ty / Nhà máy</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Tên công ty..." />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Dòng máy in đang sử dụng (Videojet, Domino...)</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Ví dụ: Videojet 1580..." />
                </div>
                <button type="button" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl transition-colors shadow-lg shadow-orange-500/30">
                  Gửi Yêu Cầu Test Mực
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
