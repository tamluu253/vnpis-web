import React from 'react';
import Link from 'next/link';
import { Home, PhoneCall, ArrowRight, Printer, Wrench, Layers } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Trang Không Tồn Tại | VNPIS Industrial Solutions',
  description: 'Trang bạn đang tìm kiếm có thể đã thay đổi địa chỉ hoặc không còn tồn tại trên VNPIS. Vui lòng quay về trang chủ hoặc liên hệ Hotline 0987 453 866.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-20 font-sans relative overflow-hidden">
      {/* Background Decorative Blur Gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-orange-500/15 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-3xl w-full text-center relative z-10">
        {/* 404 Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-semibold mb-6">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          <span>Mã lỗi 404 - Trang Không Tồn Tại</span>
        </div>

        {/* Big 404 Heading */}
        <h1 className="text-7xl md:text-9xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-300 to-orange-400 mb-6">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold text-slate-100 mb-4">
          Nội dung không tồn tại hoặc đã được cập nhật địa chỉ mới
        </h2>

        <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Đường dẫn bạn truy cập có thể đã được thay đổi cấu trúc URL hoặc tạm ngưng. Bạn có thể sử dụng các liên kết dưới đây để khám phá các giải pháp in công nghiệp VNPIS:
        </p>

        {/* Quick Solution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 text-left">
          <Link
            href="/solutions"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-blue-500/50 hover:bg-slate-800/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 group-hover:text-blue-400 transition-colors flex items-center">
              Giải Pháp In <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400">UV Single Pass, In Dữ Liệu Biến Đổi, Pad Printing, CIJ</p>
          </Link>

          <Link
            href="/products"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-orange-500/50 hover:bg-slate-800/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Printer className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 group-hover:text-orange-400 transition-colors flex items-center">
              Sản Phẩm & Vật Tư <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400">Máy in UV, Mực CIJ/TIJ, Đầu in Ricoh/Epson, Linh kiện</p>
          </Link>

          <Link
            href="/services"
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all group"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors flex items-center">
              Dịch Vụ Kỹ Thuật <ArrowRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </h3>
            <p className="text-xs text-slate-400">Sửa chữa máy in, cho thuê máy, quản lý màu sắc, bảo trì</p>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/30 flex items-center justify-center"
          >
            <Home className="w-5 h-5 mr-2" /> Quay Về Trang Chủ
          </Link>

          <a
            href="tel:0987453866"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white font-bold transition-all flex items-center justify-center"
          >
            <PhoneCall className="w-5 h-5 mr-2 text-orange-400" /> Hotline: 0987 453 866
          </a>
        </div>
      </div>
    </div>
  );
}
