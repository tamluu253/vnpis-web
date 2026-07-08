import React from 'react';
import Link from 'next/link';
import { Settings, CheckCircle2, ArrowRight } from 'lucide-react';

const padPrinters = [
  {
    id: 'sanjin-150x400',
    brand: 'SJ',
    name: 'SJ-150x400 (1 Màu)',
    desc: 'Máy in pad 1 màu khổ 150x400, chuyên in logo lên vật thể cong như bút bi, thân ống. Hoạt động ổn định, độ nét cao.',
    video: '/media/machines/sanjin-150x400-pen.mp4',
    features: ['Cốc mực kín 90mm', 'Tốc độ: 1200 nhịp/giờ', 'Bàn làm việc X-Y-R']
  },
  {
    id: 'mc-150x150-2c',
    brand: 'MC',
    name: 'MC-150x150 (2 Màu Bàn Trượt)',
    desc: 'Máy in 2 màu đồng thời, độ lệch màu cực thấp. Phù hợp in nắp chai, nắp hũ mỹ phẩm, đồ chơi.',
    video: '/media/machines/mc-150x150-2color.mp4',
    features: ['In 2 màu tự động', 'Bàn trượt Shuttle', 'Bơm mực tự động']
  },
  {
    id: 'hj-4color',
    brand: 'HJ',
    name: 'HJ-4Color (4 Màu Tự Động)',
    desc: 'Hệ thống tự động cấp phôi, in 4 màu độc lập và gắp thành phẩm. Tối ưu sản xuất hàng loạt.',
    video: '/media/machines/hj-4color.mp4',
    features: ['Tự động hóa 100%', 'PLC Touch Screen', 'Tự động lau pad']
  },
  {
    id: 'dl-series',
    brand: 'DL',
    name: 'DL (Series Phổ Thông)',
    desc: 'Máy in pad để bàn phổ thông. Thiết kế nhỏ gọn, độ bền linh kiện cao.',
    video: '',
    imgPlaceholder: 'DL Pad Printer',
    features: ['Đạt chuẩn CE', 'Giao diện cảm ứng', 'Linh kiện SMC/Festo']
  }
];

export const metadata = {
  title: 'Máy In Pad (Tampography) Công Nghiệp | SJ, MC, HJ, DL',
  description: 'Tổng hợp các model máy in Pad 1 màu, 2 màu, 4 màu tự động từ các nhà cung cấp uy tín: SJ, MC, HJ, DL.',
};

export default function PadPrintersPage() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-6xl">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6 font-semibold">
            <Settings className="w-5 h-5" />
            <span>Tampography System</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">Hệ Thống Máy In Pad Công Nghiệp</h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Giải pháp in ấn hoàn hảo trên các bề mặt cong, lồi lõm hoặc không bằng phẳng. Phân phối chính hãng các dòng máy in Pad từ các thương hiệu: SJ, MC, HJ và DL.
          </p>
          <div className="flex justify-center mt-4">
            <Link href="/products/pad-printers/hj" className="inline-flex items-center bg-blue-600 text-white hover:bg-blue-700 font-bold text-lg px-10 py-5 rounded-full shadow-xl shadow-blue-600/20 transition-all transform hover:-translate-y-1">
              Xem Toàn Bộ Catalog Máy HJ (30+ Models) <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {padPrinters.map((machine) => (
            <div key={machine.id} className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
              <div className="relative aspect-video bg-slate-100">
                {machine.video ? (
                  <video src={machine.video} autoPlay loop muted playsInline className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 font-semibold text-xl">
                    {machine.imgPlaceholder}
                  </div>
                )}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg font-bold text-slate-800 shadow-sm">
                  {machine.brand}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{machine.name}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed flex-grow">{machine.desc}</p>
                
                <ul className="space-y-2 mb-8">
                  {machine.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-700 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link href="#contact-form" className="inline-flex items-center justify-center w-full bg-slate-900 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors">
                  Yêu Cầu Báo Giá <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div id="contact-form" className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Tư Vấn Chọn Máy In Pad</h2>
            <p className="text-slate-600">Để lại thông tin về sản phẩm bạn cần in, chúng tôi sẽ tư vấn dòng máy có kích thước và số màu phù hợp nhất.</p>
          </div>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Họ và tên *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
              <input type="tel" placeholder="Số điện thoại *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            </div>
            <input type="text" placeholder="Tên công ty / Xưởng sản xuất *" required className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
            <textarea placeholder="Mô tả sản phẩm cần in (vd: Cần in 2 màu lên nắp chai nhựa cong)..." rows={4} className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none"></textarea>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl transition-colors">
              Gửi Yêu Cầu Tư Vấn
            </button>
          </form>
        </div>

      </div>
    </main>
  );
}
