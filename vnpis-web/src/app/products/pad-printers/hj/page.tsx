export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { Settings, PhoneCall, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import hjPrinters from '@/data/hj-printers.json';

export const metadata = {
  title: 'Catalog Máy In Pad HJ | VNPIS',
  description: 'Danh mục chi tiết toàn bộ các model máy in pad công nghiệp chính hãng HJ chuẩn thông số kỹ thuật nhà máy.',
};

export default function HJPrintersCatalog() {
  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50 font-sans">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products/pad-printers" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trở lại danh mục Máy In Pad
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-2xl mb-8 md:mb-0">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-6 font-semibold">
              <Settings className="w-5 h-5" />
              <span>Catalog Máy In Pad HJ Chính Hãng</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Danh Mục Máy In Pad HJ</h1>
            <p className="text-lg text-slate-600">
              Tổng hợp 21 model máy in pad (in tampon) chính hãng HJ. Đa dạng từ dòng máy bàn trượt Shuttle, mâm xoay Turntable, băng tải Conveyor đến máy in khổ ngang dài.
            </p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center md:text-right flex-shrink-0">
            <p className="text-sm text-slate-500 font-medium mb-2">Nhận báo giá & Tư vấn cấu hình</p>
            <a href="tel:0987453866" className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors text-lg shadow-lg shadow-blue-500/30">
              <PhoneCall className="w-5 h-5 mr-2" />
              0987 453 866
            </a>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {hjPrinters.map((machine) => (
            <div key={machine.model} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 flex flex-col overflow-hidden group p-4">
              <div className="aspect-[4/3] bg-slate-50 relative flex items-center justify-center border border-slate-100 rounded-xl overflow-hidden mb-4">
                {machine.video ? (
                  <video 
                    src={machine.video}
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <Image 
                    src={machine.image}
                    alt={machine.model}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                )}
                <div className="absolute top-2 left-2 bg-slate-900/90 text-white font-bold text-[11px] px-2.5 py-0.5 rounded-full shadow-sm backdrop-blur-sm z-10">
                  {machine.model}
                </div>
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-slate-900 mb-2">{machine.name || machine.model}</h3>
                <p className="text-slate-600 text-xs mb-4 line-clamp-2 min-h-[36px]">{machine.desc}</p>
                
                <div className="space-y-1.5 mt-auto pt-3 border-t border-slate-100 text-xs bg-slate-50/70 p-3 rounded-xl border">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Kích thước bản in:</span>
                    <span className="font-semibold text-slate-700">{machine.plateSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khổ in tối đa:</span>
                    <span className="font-semibold text-slate-700">{machine.printArea}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Tốc độ in:</span>
                    <span className="font-semibold text-slate-700">{machine.speed}</span>
                  </div>
                </div>

                <a href="tel:0987453866" className="mt-6 w-full text-center bg-slate-50 hover:bg-slate-100 text-blue-600 font-semibold py-2.5 rounded-lg transition-colors border border-slate-200 text-sm">
                  Liên hệ 0987 453 866
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
