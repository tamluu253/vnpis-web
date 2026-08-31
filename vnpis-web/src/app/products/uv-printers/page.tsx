export const dynamicParams = true;
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Factory, Zap, Settings, ShieldCheck, Eye, Layers } from 'lucide-react';
import uvPrinters from '@/data/uv-printers.json';

export const metadata = {
  title: 'Máy In UV Single Pass (Máy Cấp Tờ Rời & Máy Cuộn Camera Inspection) | VNPIS',
  description: 'Hệ thống máy in UV Single Pass dạng cấp tờ rời tự động và dạng cuộn tích hợp Camera Inspection kiểm phẩm mã QR/Barcode 100%. Tốc độ 150m/phút.',
};

export default function UvPrintersPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-slate-900 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <span className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-6 border border-blue-500/30 text-sm font-bold tracking-wider">
                MÁY IN UV SINGLE PASS CHUYÊN DỤNG
              </span>
              <h1 className="text-4xl lg:text-5xl font-black mb-6 leading-tight">
                Máy In UV Single Pass <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Cấp Tờ Rời & Máy Cuộn Camera Inspection</span>
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">
                Giải pháp máy in công nghiệp chuyên dụng: Dạng cấp phôi tờ rời tự động cho bao bì carton/túi màng và Dạng máy cuộn tích hợp camera quan sát kiểm tra chất lượng mã QR/Barcode online 100%.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#catalog" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center shadow-lg shadow-blue-600/30">
                  Xem Chi Tiết 2 Dòng Máy <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <Link href="/contact" className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center backdrop-blur-sm">
                  Tư Vấn Kỹ Thuật
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Layers className="w-10 h-10 text-yellow-400 mb-3" />
                  <span className="font-bold">Cấp Tờ Tự Động</span>
                  <span className="text-slate-400 text-sm mt-1">Nạp phôi nilon, carton, thẻ</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Eye className="w-10 h-10 text-cyan-400 mb-3" />
                  <span className="font-bold">Camera Inspection</span>
                  <span className="text-slate-400 text-sm mt-1">Kiểm tra QR Code online 100%</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Zap className="w-10 h-10 text-blue-400 mb-3" />
                  <span className="font-bold">Tốc Độ Cao</span>
                  <span className="text-slate-400 text-sm mt-1">Up to 150m / phút</span>
                </div>
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col items-center justify-center text-center">
                  <ShieldCheck className="w-10 h-10 text-green-400 mb-3" />
                  <span className="font-bold">Độ Bền Đầu In</span>
                  <span className="text-slate-400 text-sm mt-1">Ricoh Gen6 / Kyocera</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATALOG SECTION */}
      <section id="catalog" className="py-24 bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Chi Tiết 2 Dạng Máy In UV Single Pass Chuẩn Xưởng</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6" />
            <p className="text-lg text-slate-600">
              Được thiết kế đáp ứng chính xác đặc thù dây chuyền sản xuất: nạp tờ phẳng tự động hoặc cuộn tem nhãn kiểm định bằng mắt thần camera CCD.
            </p>
          </div>

          <div className="space-y-16">
            {uvPrinters.map((printer, index) => (
              <div key={printer.id} className={`flex flex-col lg:flex-row gap-12 items-center bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 hover:shadow-xl transition-shadow ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                
                {/* Image Side */}
                <div className="lg:w-1/2 w-full">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
                    <Image 
                      src={printer.image} 
                      alt={printer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:w-1/2 w-full">
                  <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{printer.name}</h3>
                  <p className="text-slate-600 mb-8 leading-relaxed text-base md:text-lg">
                    {printer.description}
                  </p>
                  
                  <div className="mb-8">
                    <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Tính năng nổi bật</h4>
                    <ul className="space-y-3">
                      {printer.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700 text-sm md:text-base">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                    <h4 className="font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm">Thông số kỹ thuật</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 text-sm">
                      <div>
                        <span className="text-slate-500 block mb-1">Loại Đầu In</span>
                        <span className="font-semibold text-slate-900">{printer.specs.printheadType}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Khổ In</span>
                        <span className="font-semibold text-slate-900">{printer.specs.printWidth}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Tốc Độ In</span>
                        <span className="font-semibold text-slate-900">{printer.specs.printSpeed}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Độ Phân Giải</span>
                        <span className="font-semibold text-slate-900">{printer.specs.resolution}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block mb-1">Hệ Thống Sấy</span>
                        <span className="font-semibold text-slate-900">{printer.specs.curingSystem}</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA SECTION */}
      <section className="py-24 bg-blue-600 text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Bạn Cần Khảo Sát & Chạy Thử Máy Trực Tiếp?</h2>
          <p className="text-xl text-blue-100 mb-10 leading-relaxed">
            Kỹ sư VNPIS luôn sẵn sàng tiếp nhận phôi mẫu của bạn để chạy thử nghiệm trên máy cấp tờ rời hoặc hệ thống máy cuộn Camera Inspection.
          </p>
          <Link href="/contact" className="bg-white text-blue-600 hover:bg-slate-100 font-bold py-4 px-10 rounded-full transition-colors text-lg shadow-xl inline-block">
            Liên Hệ Đội Ngũ Kỹ Thuật (0987 453 866)
          </Link>
        </div>
      </section>

    </main>
  );
}
