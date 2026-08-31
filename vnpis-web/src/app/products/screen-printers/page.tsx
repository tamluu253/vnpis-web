export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import ConsultationForm from '@/components/ui/ConsultationForm';

const screenPrinters = [
  {
    id: 'sj-screen-1',
    brand: 'SJ',
    name: 'Máy In Lụa Tròn Sanjin 360° Chai Lọ Mỹ Phẩm',
    desc: 'Máy in lụa xoay tròn công nghiệp Sanjin chuyên dụng in 360 độ trên chai lọ mỹ phẩm, tuýp nhựa, cốc thủy tinh, bình nước và đồ gia dụng.',
    video: '/media/machines/sj/sj-factory-demo-1.mp4',
    features: ['In xoay tròn 360° chai lọ & tuýp mỹ phẩm', 'Xilanh khí nén kéo dao gạt mực mượt mà', 'Căn lề micro 3 chiều cực nét'],
    specs: {
      plateSize: '350 x 350 mm',
      printArea: 'Đường kính Ф80 mm',
      speed: '1,500 nhịp/giờ',
      airPressure: '5 - 7 bar',
      weight: '95 kg'
    }
  },
  {
    id: 'hj-screen-1',
    brand: 'HJ',
    name: 'Máy In Lụa HJ Khổ Lớn Công Nghiệp',
    desc: 'Hệ thống in lụa công nghiệp cho các chi tiết kích thước lớn. Khung máy thép đúc chắc chắn chống rung lắc, độ chính xác chồng màu hoàn hảo.',
    video: '/media/machines/hj-screen-printer.mp4',
    features: ['Khổ in lớn tùy chỉnh theo yêu cầu', 'Hệ thống kéo gạt mực Servo chính xác', 'Bảng điều khiển màn hình cảm ứng PLC'],
    specs: {
      plateSize: '700 x 1000 mm',
      printArea: '400 x 600 mm',
      speed: '1,000 nhịp/giờ',
      airPressure: '5 - 7 bar',
      weight: '280 kg'
    }
  }
];

export const metadata = {
  title: 'Máy In Lụa (Screen Printing) Công Nghiệp | SJ, HJ',
  description: 'Tổng hợp danh mục máy in lụa công nghiệp chính hãng SJ, HJ. Bán tự động, in lụa tròn 360 độ chai lọ, bàn hút chân không.',
};

export default function ScreenPrintersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 font-sans">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-6 font-semibold">
            <Layers className="w-5 h-5" />
            <span>HỆ THỐNG MÁY IN LỰA CHÍNH HÃNG SJ & HJ</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Máy In Lụa (Screen Printer) Công Nghiệp</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Giải pháp in lụa (in lưới) công nghiệp chính hãng Sanjin (SJ) & HJ. Tự động hóa khâu kéo gạt mực, in 360 độ chai lọ mỹ phẩm, trang bị bàn hút chân không giữ phôi chắc chắn cho bề mặt nhựa, kim loại, màng bìa.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4">
            <Link href="/products/screen-printers/sj" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-emerald-600/30 transition-all">
              Catalog Máy In Lụa SJ (14 Models) <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link href="/products/screen-printers/hj" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg shadow-blue-600/30 transition-all">
              Catalog Máy In Lụa HJ (7 Models) <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        {/* Machine Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {screenPrinters.map((machine) => (
            <div key={machine.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-video bg-slate-900">
                <video src={machine.video} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-slate-900 shadow-sm text-sm">
                  Thương hiệu {machine.brand}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{machine.name}</h3>
                <p className="text-slate-600 mb-6 text-base leading-relaxed">{machine.desc}</p>
                
                <ul className="space-y-2.5 mb-6">
                  {machine.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Specs Box */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Thông số kỹ thuật chuẩn</h4>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    <div>
                      <span className="text-slate-500 block">Kích thước khung:</span>
                      <span className="font-semibold text-slate-800">{machine.specs.plateSize}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Kích thước hình in:</span>
                      <span className="font-semibold text-slate-800">{machine.specs.printArea}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Tốc độ in:</span>
                      <span className="font-semibold text-slate-800">{machine.specs.speed}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Áp suất khí nén:</span>
                      <span className="font-semibold text-slate-800">{machine.specs.airPressure}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 mt-auto">
                  <Link href="/products/screen-printers/sj" className="flex-1 text-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md shadow-emerald-500/20">
                    Xem Catalog SJ (14 Models)
                  </Link>
                  <Link href="/products/screen-printers/hj" className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-colors text-sm shadow-md shadow-blue-500/20">
                    Xem Catalog HJ (7 Models)
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lead Form */}
        <div id="contact-form" className="max-w-4xl mx-auto">
          <ConsultationForm
            title="Tư Vấn & Khảo Sát Máy In Lụa Tại Xưởng"
            subtitle="Để lại thông tin kích thước sản phẩm và nhu cầu in ấn, kỹ sư VNPIS sẽ gợi ý cấu hình máy in lụa phù hợp nhất."
            pageTitle="Máy In Lụa"
          />
        </div>

      </div>
    </main>
  );
}
