export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Printer, 
  CheckCircle2, 
  ShieldCheck, 
  RefreshCw, 
  AlertTriangle, 
  HelpCircle, 
  Droplet, 
  Sparkles, 
  Truck, 
  Layers, 
  FileCheck, 
  BadgePercent, 
  PhoneCall,
  Clock,
  ExternalLink
} from 'lucide-react';
import ConsultationForm from '@/components/ui/ConsultationForm';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/printheads/brother-gtx',
  },
  title: 'Đầu In Máy In Brother DTG (GTX / GTXpro / GTXpro Bulk) | VNPIS',
  description: 'Đầu in Brother DTG chính hãng cho máy in áo thun Brother GTX, GTXpro, GTXpro Bulk. Tùy chọn Refurbished (≥99% tia, bảo hành 2 năm 1 đổi 1) và OEM New 100%. Hỗ trợ kỹ thuật chuyên sâu.',
};

export default function BrotherGtxPrintheadPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-blue-600 to-indigo-600 blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-orange-500 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <Link href="/products/printheads" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về danh mục Đầu Phun Công Nghiệp
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <Printer className="w-3.5 h-3.5" /> BROTHER DTG SERIES
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <ShieldCheck className="w-3.5 h-3.5" /> BẢO HÀNH 2 NĂM 1 ĐỔI 1
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-400/30">
              <RefreshCw className="w-3.5 h-3.5" /> CHƯƠNG TRÌNH THU CŨ ĐỔI MỚI
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Đầu In Cho Máy In Brother DTG <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-orange-400">
              GTX • GTXpro • GTXpro Bulk
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            Giải pháp đầu in màu (Color) và đầu in trắng (White) chuẩn dệt may công nghiệp chuyên dụng cho dòng máy in áo thun trực tiếp Brother DTG. 
            Tối ưu chi phí sản xuất với tùy chọn <strong>Refurbished đủ $\ge$ 99% tia</strong> hoặc dòng <strong>OEM New mới 100%</strong> kèm cam kết kỹ thuật khắt khe nhất từ VNPIS.
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#pricing" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/30"
            >
              Xem Bảng Giá & Thông Số
            </a>
            <a 
              href="#warranty-policy" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors"
            >
              Chính Sách Bảo Hành 2 Năm
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-orange-400 bg-orange-500/10 border border-orange-500/30 rounded-xl hover:bg-orange-500/20 transition-colors"
            >
              Tư Vấn & Đặt Mua
            </a>
          </div>
        </div>
      </section>

      {/* 2. COMPATIBILITY HIGHLIGHT */}
      <section className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <div className="bg-white rounded-2xl shadow-md border border-slate-200 p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> DÒNG MÁY TƯƠNG THÍCH HOÀN TOÀN
              </div>
              <h2 className="text-xl md:text-2xl font-black text-slate-900">
                Tương thích tối đa cho các hệ máy in dệt may Brother DTG
              </h2>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <span className="px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold shadow-sm">
                Brother GTX
              </span>
              <span className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-sm">
                Brother GTXpro
              </span>
              <span className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-sm">
                Brother GTXpro Bulk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. PRODUCT & PRICING TABLE */}
      <section id="pricing" className="container mx-auto px-4 max-w-6xl mt-16 scroll-mt-24">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            BẢNG GIÁ & TÌNH TRẠNG KHO
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Bảng Sản Phẩm, Giá Bán & Tiêu Chuẩn Kỹ Thuật
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-base">
            <strong>Refurbished</strong> là phương án tiết kiệm chi phí thông minh cho xưởng sản xuất; <strong>OEM New</strong> dành cho khách hàng cần đầu in mới nguyên bản 100%.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Card 1: Refurbished Color */}
          <div className="bg-white rounded-3xl border-2 border-blue-500 shadow-xl overflow-hidden flex flex-col relative">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-blue-200 block">DÒNG TIẾT KIỆM HIỆU SUẤT CAO</span>
                <h3 className="text-xl font-black">Refurbished – Đầu in màu (Color)</h3>
              </div>
              <span className="px-3 py-1 bg-white text-blue-700 rounded-full text-xs font-black shadow-sm">
                ĐANG CÓ HÀNG
              </span>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-100">
                <span className="text-3xl md:text-4xl font-black text-slate-900">1.550 USD</span>
                <span className="text-base md:text-lg font-bold text-blue-600">
                  (~39.525.000 VNĐ)
                </span>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Brother DTG chính hãng, đã qua quá trình phục hồi - tân trang chuyên nghiệp và kiểm tra kỹ thuật nghiêm ngặt bằng thiết bị đo kiểm chuyên dụng.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Đủ tia (Nozzle):</span>
                  <span className="text-lg font-black text-emerald-600">≥ 99% tia</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Ngoại quan:</span>
                  <span className="text-lg font-black text-slate-800">90% – 97%</span>
                </div>
              </div>

              <div className="bg-blue-50/70 border border-blue-100 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-blue-900 uppercase block tracking-wider">Chính sách bảo hành:</span>
                    <p className="text-sm font-bold text-blue-800">
                      2 năm 1 đổi 1 <span className="font-normal text-blue-700">(Điều kiện bắt buộc: Thu hồi lại đầu in cũ)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href="#contact" 
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-colors shadow-md shadow-blue-500/20"
                >
                  Đặt Mua / Nhận Tư Vấn
                </a>
              </div>
            </div>
          </div>

          {/* Card 2: Refurbished White */}
          <div className="bg-white rounded-3xl border-2 border-indigo-500 shadow-xl overflow-hidden flex flex-col relative">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 flex items-center justify-between">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-indigo-200 block">DÒNG TIẾT KIỆM HIỆU SUẤT CAO</span>
                <h3 className="text-xl font-black">Refurbished – Đầu in trắng (White)</h3>
              </div>
              <span className="px-3 py-1 bg-white text-indigo-700 rounded-full text-xs font-black shadow-sm">
                ĐANG CÓ HÀNG
              </span>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-100">
                <span className="text-3xl md:text-4xl font-black text-slate-900">1.650 USD</span>
                <span className="text-base md:text-lg font-bold text-indigo-600">
                  (~42.160.000 VNĐ)
                </span>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Brother DTG chính hãng cho hệ mực trắng (White Ink) in nền vải tối màu, đã tân trang hoàn chỉnh, thông tia đạt chuẩn xả mực dày dặn.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Đủ tia (Nozzle):</span>
                  <span className="text-lg font-black text-emerald-600">≥ 99% tia</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Ngoại quan:</span>
                  <span className="text-lg font-black text-slate-800">90% – 97%</span>
                </div>
              </div>

              <div className="bg-indigo-50/70 border border-indigo-100 rounded-2xl p-4 mb-6">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-indigo-900 uppercase block tracking-wider">Chính sách bảo hành:</span>
                    <p className="text-sm font-bold text-indigo-800">
                      2 năm 1 đổi 1 <span className="font-normal text-indigo-700">(Điều kiện bắt buộc: Thu hồi lại đầu in cũ)</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href="#contact" 
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm transition-colors shadow-md shadow-indigo-500/20"
                >
                  Đặt Mua / Nhận Tư Vấn
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: OEM New Color */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-100 text-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-200">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500 block">DÒNG XUẤT XƯỞNG NGUYÊN BẢN</span>
                <h3 className="text-xl font-bold">OEM New – Đầu in màu (Color)</h3>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black">
                SẮP RA MẮT
              </span>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-100">
                <span className="text-2xl md:text-3xl font-black text-slate-700">Đang cập nhật</span>
                <span className="text-xs font-bold text-slate-400 uppercase">Liên hệ đặt trước</span>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Đầu in Brother GTXpro mới 100% xuất xưởng từ nhà sản xuất, thích hợp cho xưởng cần phụ tùng nguyên seal hộp.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Đủ tia (Nozzle):</span>
                  <span className="text-base font-bold text-slate-800">Mới 100%</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Ngoại quan:</span>
                  <span className="text-base font-bold text-slate-800">Mới 100%</span>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href="#contact" 
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  Đăng Ký Nhận Báo Giá Sớm
                </a>
              </div>
            </div>
          </div>

          {/* Card 4: OEM New White */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="bg-slate-100 text-slate-800 px-6 py-4 flex items-center justify-between border-b border-slate-200">
              <div>
                <span className="text-xs uppercase tracking-wider font-extrabold text-slate-500 block">DÒNG XUẤT XƯỞNG NGUYÊN BẢN</span>
                <h3 className="text-xl font-bold">OEM New – Đầu in trắng (White)</h3>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-black">
                SẮP RA MẮT
              </span>
            </div>

            <div className="p-6 md:p-8 flex-grow flex flex-col">
              <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-slate-100">
                <span className="text-2xl md:text-3xl font-black text-slate-700">Đang cập nhật</span>
                <span className="text-xs font-bold text-slate-400 uppercase">Liên hệ đặt trước</span>
              </div>

              <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                Đầu in Brother GTXpro mực trắng mới 100% nguyên seal hộp chính hãng, độ phân giải sắc nét và độ phủ mực tối đa.
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Đủ tia (Nozzle):</span>
                  <span className="text-base font-bold text-slate-800">Mới 100%</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Ngoại quan:</span>
                  <span className="text-base font-bold text-slate-800">Mới 100%</span>
                </div>
              </div>

              <div className="mt-auto">
                <a 
                  href="#contact" 
                  className="w-full inline-flex items-center justify-center py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-colors"
                >
                  Đăng Ký Nhận Báo Giá Sớm
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Master Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <h3 className="text-lg font-bold text-slate-900">Bảng Tổng Hợp Chi Tiết Sản Phẩm & Điều Kiện</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-bold">
                  <th className="p-4">Sản Phẩm</th>
                  <th className="p-4">Mô Tả Kỹ Thuật</th>
                  <th className="p-4 text-center">Đủ Tia (Nozzle)</th>
                  <th className="p-4 text-center">Ngoại Quan</th>
                  <th className="p-4">Giá Bán (USD / VNĐ)</th>
                  <th className="p-4 text-center">Tình Trạng</th>
                  <th className="p-4">Chính Sách Bảo Hành</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-600">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-900">Refurbished – Đầu in màu (Color)</td>
                  <td className="p-4">Brother DTG chính hãng, đã tân trang và kiểm tra kỹ thuật</td>
                  <td className="p-4 text-center font-bold text-emerald-600">≥ 99% tia</td>
                  <td className="p-4 text-center font-bold text-slate-700">90% – 97%</td>
                  <td className="p-4 font-bold text-blue-600">
                    <div>1.550 USD</div>
                    <div className="text-xs text-slate-500 font-normal">39.525.000 VNĐ</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                      Đang có hàng
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">
                    2 năm 1 đổi 1 <br />
                    <span className="text-xs text-slate-500 font-normal">(Điều kiện: Thu cũ đổi lại)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-bold text-slate-900">Refurbished – Đầu in trắng (White)</td>
                  <td className="p-4">Brother DTG chính hãng, đã tân trang và kiểm tra kỹ thuật</td>
                  <td className="p-4 text-center font-bold text-emerald-600">≥ 99% tia</td>
                  <td className="p-4 text-center font-bold text-slate-700">90% – 97%</td>
                  <td className="p-4 font-bold text-indigo-600">
                    <div>1.650 USD</div>
                    <div className="text-xs text-slate-500 font-normal">42.160.000 VNĐ</div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                      Đang có hàng
                    </span>
                  </td>
                  <td className="p-4 font-semibold text-slate-800">
                    2 năm 1 đổi 1 <br />
                    <span className="text-xs text-slate-500 font-normal">(Điều kiện: Thu cũ đổi lại)</span>
                  </td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="p-4 font-bold text-slate-900">OEM New – Đầu in màu (Color)</td>
                  <td className="p-4">Brother GTXpro, mới 100% nguyên hộp</td>
                  <td className="p-4 text-center font-bold text-slate-800">Mới 100%</td>
                  <td className="p-4 text-center font-bold text-slate-800">Mới 100%</td>
                  <td className="p-4 font-medium text-slate-500">Đang cập nhật</td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                      Sắp ra mắt
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Tiêu chuẩn chính hãng</td>
                </tr>
                <tr className="hover:bg-slate-50/70 transition-colors bg-slate-50/40">
                  <td className="p-4 font-bold text-slate-900">OEM New – Đầu in trắng (White)</td>
                  <td className="p-4">Brother GTXpro, mới 100% nguyên hộp</td>
                  <td className="p-4 text-center font-bold text-slate-800">Mới 100%</td>
                  <td className="p-4 text-center font-bold text-slate-800">Mới 100%</td>
                  <td className="p-4 font-medium text-slate-500">Đang cập nhật</td>
                  <td className="p-4 text-center">
                    <span className="inline-block px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-200">
                      Sắp ra mắt
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">Tiêu chuẩn chính hãng</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 4. TWO WARRANTY PROGRAMS */}
      <section id="warranty-policy" className="container mx-auto px-4 max-w-6xl mt-20 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            CHÍNH SÁCH BẢO HÀNH ĐỘC QUYỀN VNPIS
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Lựa Chọn Chương Trình Bảo Hành Linh Hoạt
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base">
            Chúng tôi thiết kế hai chương trình đồng hành rõ ràng nhằm đem đến quyền lợi tối đa và sự an tâm cao nhất cho xưởng in của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Program A: Có mua vật tư */}
          <div className="bg-gradient-to-b from-emerald-50/50 to-white rounded-3xl p-8 border-2 border-emerald-500 shadow-lg relative flex flex-col">
            <div className="absolute top-6 right-6">
              <span className="px-3 py-1 bg-emerald-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm">
                KHUYẾN NGHỊ TỐI ƯU
              </span>
            </div>

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3">
              Chương Trình 1: Có Mua Vật Tư (Mực, Phụ Tùng)
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Dành cho khách hàng sử dụng trọn gói giải pháp mực in và phụ kiện thay thế từ VNPIS. Đầu in của bạn được bảo vệ toàn diện với chi phí 0đ.
            </p>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Điều kiện duy trì:</span>
                  <span className="text-sm font-bold text-slate-800">Duy trì định mức mua mực tối thiểu định kỳ hàng tháng từ VNPIS</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Thời hạn & Chi phí:</span>
                  <span className="text-sm font-bold text-emerald-700">Bảo hành miễn phí toàn diện theo chương trình</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Phạm vi bảo hành:</span>
                  <span className="text-sm font-bold text-slate-800">Hỗ trợ sửa chữa kỹ thuật hoặc đổi 1:1 khi gặp sự cố</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white rounded-xl border border-emerald-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Quy trình xử lý:</span>
                  <span className="text-sm font-bold text-slate-800">Kiểm tra kỹ thuật nhanh chóng và được duyệt đổi ngay</span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-xl text-xs text-emerald-800 font-medium border border-emerald-200">
              💡 <strong>Lợi ích vượt trội:</strong> Không lo rủi ro mực trôi nổi gây cháy chập bo hay đông kết túi mực bên trong.
            </div>
          </div>

          {/* Program B: Không mua vật tư */}
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6">
              <FileCheck className="w-8 h-8" />
            </div>

            <h3 className="text-2xl font-black text-slate-900 mb-3">
              Chương Trình 2: Không Mua Vật Tư
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Dành cho khách hàng chỉ mua riêng lẻ đầu in Brother DTG và tự chủ nguồn vật tư, mực in bên ngoài.
            </p>

            <div className="space-y-4 mb-8 flex-grow">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-slate-400 mt-2"></div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Điều kiện áp dụng:</span>
                  <span className="text-sm font-bold text-slate-800">Không mua mực, vật tư, phụ tùng từ VNPIS</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Phạm vi bảo hành:</span>
                  <span className="text-sm font-bold text-slate-800">Chỉ bảo hành đối với các lỗi phần cứng điện (mạch điện tử)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-amber-50 rounded-xl border border-amber-100">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold text-amber-800 uppercase block">Không thuộc phạm vi bảo hành:</span>
                  <span className="text-sm font-semibold text-amber-900">Tắc nozzle, lỗi dòng mực, hỏng hoặc vỡ túi mực bên trong</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
                <div className="w-2 h-2 rounded-full bg-slate-400 mt-2"></div>
                <div>
                  <span className="text-xs font-bold text-slate-500 uppercase block">Xử lý yêu cầu:</span>
                  <span className="text-sm font-bold text-slate-800">Kiểm tra kỹ thuật và được duyệt theo đúng phạm vi cam kết</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-100 p-4 rounded-xl text-xs text-slate-600 font-medium">
              ℹ️ Cả hai chương trình đều áp dụng theo đúng quy định tại <strong>Điều khoản bảo hành tiêu chuẩn</strong> của VNPIS.
            </div>
          </div>
        </div>
      </section>

      {/* 5. 1:1 REPLACEMENT WORKFLOW */}
      <section className="container mx-auto px-4 max-w-6xl mt-12">
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mb-10">
            <span className="inline-block px-3 py-1 bg-blue-500/20 text-blue-300 text-xs font-bold rounded-full mb-3 uppercase tracking-wider border border-blue-400/30">
              MINH BẠCH & NHANH CHÓNG
            </span>
            <h2 className="text-2xl md:text-3xl font-black mb-3">
              Quy Trình Đổi 1:1 – Một Đầu In Lỗi Gửi Về, Một Đầu In Tốt Gửi Lại
            </h2>
            <p className="text-slate-300 text-sm md:text-base">
              Chúng tôi tối giản quy trình tiếp nhận để rút ngắn tối đa thời gian dừng máy (downtime) cho xưởng in của bạn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-blue-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                1
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Bước 1: Trả Đầu In Lỗi</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Khách hàng đóng gói cẩn thận đầu in bị sự cố và gửi về trung tâm dịch vụ kỹ thuật của VNPIS.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-indigo-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/30">
                2
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Bước 2: Kiểm Tra & Xác Minh</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Kỹ thuật viên VNPIS kiểm tra tình trạng thực tế, đo kiểm tia và xác minh điều kiện bảo hành theo chương trình áp dụng.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white font-black text-lg flex items-center justify-center mb-4 shadow-lg shadow-emerald-500/30">
                3
              </div>
              <h4 className="text-lg font-bold mb-2 text-white">Bước 3: Đổi 1:1 Giao Hàng</h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Ngay khi yêu cầu được duyệt, VNPIS gửi lại đầu in thay thế đã qua kiểm định hoạt động hoàn hảo cho khách hàng.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-white/10 text-xs md:text-sm text-slate-300">
            <div className="flex items-center gap-2.5">
              <Truck className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <span><strong>Chi phí vận chuyển:</strong> Do bên nhận chịu (áp dụng cho cả chiều gửi về và chiều gửi lại).</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span><strong>Phạm vi áp dụng:</strong> Cả 2 chương trình bảo hành (khi lỗi thuộc phạm vi và yêu cầu được kỹ thuật phê duyệt).</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. WARRANTY TERMS TABLE */}
      <section className="container mx-auto px-4 max-w-6xl mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-wider font-extrabold text-blue-400 block mb-1">
                TIÊU CHUẨN ĐÁNH GIÁ CHÍNH XÁC
              </span>
              <h3 className="text-2xl font-black">Điều Khoản & Điều Kiện Bảo Hành</h3>
            </div>
            <span className="text-xs text-slate-400 bg-white/10 px-3.5 py-1.5 rounded-full">
              Quy chuẩn kỹ thuật VNPIS
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cột Điều kiện được bảo hành */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-emerald-700 font-bold text-base">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <h4>Điều Kiện Được Bảo Hành</h4>
                </div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    <span>Đầu in không bị va đập, móp méo, biến dạng, trầy xước mặt nozzle hay hư hỏng vật lý.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    <span>Đầu in còn nguyên hiện trạng, không có bất kỳ dấu hiệu tự ý can thiệp, tháo rời, chỉnh sửa hoặc sửa chữa ngoài.</span>
                  </li>
                  <li className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0"></span>
                    <span>Lỗi phát sinh nằm trong danh mục bảo hành của chương trình khách hàng đang tham gia.</span>
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-100 text-xs text-blue-900 leading-relaxed">
                  <strong>Xử lý yêu cầu:</strong> Mọi yêu cầu bảo hành đều qua kiểm tra kỹ thuật tại lab VNPIS để xác minh tình trạng thực tế. Chỉ đổi 1:1 sau khi yêu cầu được duyệt theo đúng chương trình áp dụng.
                </div>
              </div>

              {/* Cột Trường hợp không bảo hành */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-rose-700 font-bold text-base">
                  <AlertTriangle className="w-5 h-5 text-rose-600" />
                  <h4>Các Trường Hợp Từ Chối Bảo Hành</h4>
                </div>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Chập điện, xung áp hoặc hư hỏng do nguồn điện bên ngoài / lỗi bo máy in.</span>
                  </li>
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Tắc nozzle và lỗi dòng mực (nếu thuộc chương trình Không mua vật tư).</span>
                  </li>
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Vỡ hoặc rò rỉ túi mực bên trong do quá áp hoặc dung môi không tương thích.</span>
                  </li>
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Hư hỏng do thao tác lắp đặt sai quy cách kỹ thuật hoặc va đập cơ học.</span>
                  </li>
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Tự ý tháo mở ốc, can thiệp hoặc thay đổi kết cấu đầu in.</span>
                  </li>
                  <li className="flex items-start gap-2 p-2.5 rounded-lg bg-rose-50/50 text-rose-900 border border-rose-100/70">
                    <span className="text-rose-500 font-bold mr-1">•</span>
                    <span>Sự cố bất khả kháng do thiên tai, ngập lụt, cháy nổ hoặc động vật xâm nhập.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CONTACT & CONSULTATION FORM */}
      <section id="contact" className="container mx-auto px-4 max-w-4xl mt-20 scroll-mt-24">
        <ConsultationForm 
          pageTitle="Đầu in Brother DTG (GTX / GTXpro / GTXpro Bulk)"
          title="Yêu Cầu Báo Giá & Tư Vấn Thu Cũ Đổi Mới"
          subtitle="Để lại thông tin về dòng máy in Brother DTG bạn đang sử dụng và tình trạng đầu in hiện tại. Kỹ thuật viên VNPIS sẽ liên hệ báo giá và tư vấn phương án tiết kiệm nhất."
        />
      </section>
    </div>
  );
}
