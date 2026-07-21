import React from 'react';
import Link from 'next/link';
import { Layers, CheckCircle2, ArrowRight } from 'lucide-react';

const screenPrinters = [
  {
    id: 'mc-screen-1',
    brand: 'MC',
    name: 'MC-1215 Bán Tự Động',
    desc: 'Thiết kế tối ưu cho in lụa trên các bề mặt phẳng như vỏ hộp nhựa, tấm kim loại, kính. Cơ chế kéo dao gạt mực tự động, đảm bảo độ phủ mực đồng đều.',
    video: '/media/machines/mc-screen-printer.mp4',
    features: ['Bàn in hút chân không', 'Dao gạt hợp kim nhôm', 'Độ phân giải bản in cao']
  },
  {
    id: 'hj-screen-1',
    brand: 'HJ',
    name: 'HJ Khổ Lớn Công Nghiệp',
    desc: 'Hệ thống in lụa công nghiệp cho các chi tiết kích thước lớn. Khung máy chắc chắn chống rung lắc, độ chính xác chồng màu hoàn hảo.',
    video: '/media/machines/hj-screen-printer.mp4',
    features: ['Khổ in lớn tùy chỉnh', 'Hệ thống Servo chính xác', 'Điều khiển PLC thông minh']
  },
  {
    id: 'dl-screen',
    brand: 'DL',
    name: 'DL Rotary (In Chai Tròn)',
    desc: 'Giải pháp chuyên dụng in lụa 360 độ lên thân chai lọ mỹ phẩm, chai thủy tinh, cốc nhựa. Phù hợp cho ngành đóng gói đồ uống và hóa mỹ phẩm.',
    video: '',
    imgPlaceholder: 'DL Rotary Screen Printer',
    features: ['In 360 độ chai lọ', 'Sấy UV tích hợp (Option)', 'Tốc độ cao']
  }
];

export const metadata = {
  title: 'Máy In Lụa (Screen Printing) Công Nghiệp | MC, HJ, DL',
  description: 'Tổng hợp các dòng máy in lụa phẳng và in chai tròn bán tự động từ các nhà cung cấp uy tín: MC, HJ, DL.',
};

export default function ScreenPrintersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full mb-6 font-semibold">
            <Layers className="w-5 h-5" />
            <span>Screen Printing System</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Hệ Thống Máy In Lụa Công Nghiệp</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Giải pháp in lụa (in lưới) hoàn hảo cho các bề mặt phẳng khổ lớn và in 360 độ trên chai lọ. Phân phối chính hãng các dòng máy in lụa từ MC, HJ và DL.
          </p>
          <div className="flex justify-center mt-8 space-x-4">
            <Link href="/products/screen-printers/sj" className="inline-flex items-center bg-emerald-600 text-white hover:bg-emerald-700 font-bold text-lg px-10 py-5 rounded-full shadow-xl shadow-emerald-600/20 transition-all transform hover:-translate-y-1">
              Catalog Máy In Lụa SJ <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {screenPrinters.map((machine) => (
            <div key={machine.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group hover:shadow-xl transition-shadow duration-300">
              <div className="relative aspect-square md:aspect-video lg:aspect-square bg-slate-100">
                {machine.video ? (
                  <video src={machine.video} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-semibold text-center p-4">
                    {machine.imgPlaceholder}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-slate-800 shadow-sm">
                  {machine.brand}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2">{machine.name}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed flex-grow">{machine.desc}</p>
                
                <ul className="space-y-2 mb-6">
                  {machine.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href={machine.id === 'hj-screen-1' ? "/products/screen-printers/hj" : "#contact-form"} className="inline-flex items-center justify-center w-full bg-slate-100 hover:bg-indigo-600 text-slate-800 hover:text-white font-semibold py-3 rounded-xl transition-colors mt-auto">
                  {machine.id === 'hj-screen-1' ? "Xem Tất Cả Máy HJ" : "Nhận Báo Giá"} <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div id="contact-form" className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tư Vấn Máy In Lụa</h2>
            <p className="text-slate-600">Bạn cần in trên bề mặt phẳng, túi nilon hay in xoay quanh chai tròn? Hãy để lại thông tin để chuyên gia của chúng tôi hỗ trợ.</p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Họ và tên *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
              <input type="tel" placeholder="Số điện thoại *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
            </div>
            <input type="text" placeholder="Tên công ty / Xưởng sản xuất *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none" />
            <textarea placeholder="Mô tả sản phẩm cần in (vd: Cần in lụa logo lên cốc thủy tinh)..." rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-600 outline-none"></textarea>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-xl transition-colors">
              Gửi Yêu Cầu Tư Vấn
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
