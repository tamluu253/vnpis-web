export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { 
  Package, 
  ArrowRight, 
  Printer, 
  Droplet, 
  ScanLine, 
  Tag, 
  Zap, 
  Settings, 
  Sparkles, 
  ShieldCheck, 
  QrCode, 
  Layers, 
  CheckCircle2, 
  Cpu, 
  Wrench 
} from 'lucide-react';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products',
  },
  title: 'Hệ Sinh Thái Giải Pháp & Thiết Bị In Công Nghiệp 1-Stop Solution | VNPIS',
  description: 'VNPIS là nhà cung cấp giải pháp kỹ thuật in ấn công nghiệp trọn gói (1-Stop Solution Provider): In dệt may DTG, in tampon, in lụa, mực in CIJ/TIJ, máy khắc laser và hệ thống số hóa PrintFlow.',
};

const solutionEcosystems = [
  {
    badge: 'GIẢI PHÁP TIÊU BIỂU · ĐẶC QUYỀN MỚI',
    title: 'Hệ Giải Pháp In Dệt May DTG & Hóa Chất S.K',
    description: 'Trọn bộ giải pháp 1 điểm đến: Nước phủ Dark/Light S.K, dung dịch vệ sinh CSX, mực in DTG, đầu in Brother GTX bảo hành 1 năm 1 đổi 1. TẶNG MIỄN PHÍ phần mềm quản lý xưởng SK PrintFlow!',
    href: '/products/sk-dtg-solution',
    icon: <Droplet className="w-10 h-10 text-emerald-500" />,
    featured: true,
    highlights: ['Nước phủ Dark/Light S.K', 'Vệ sinh Cleaning CSX-GTX4', 'Tặng Free PrintFlow QR', 'Bảo hành 1 năm 1 đổi 1']
  },
  {
    badge: 'LINH KIỆN CÔNG NGHỆ CAO',
    title: 'Đầu Phun Công Nghiệp Chính Hãng',
    description: 'Cung cấp và phục hồi đầu phun công nghiệp Brother DTG (GTX, GTXpro), Ricoh Gen5/Gen6, Epson i3200, Kyocera hiệu suất cao kèm quy trình trade-in thu cũ đổi mới.',
    href: '/products/printheads',
    icon: <Printer className="w-10 h-10 text-blue-500" />,
    highlights: ['Brother DTG Series', 'Ricoh Gen5 / Gen6', 'Epson i3200', 'Đổi 1:1 siêu tốc']
  },
  {
    badge: 'VẬT TƯ TIÊU HAO CHÍNH XÁC',
    title: 'Cốc Mực, Vòng Gạt & Vật Tư In Tampon',
    description: 'Cốc mực kín nam châm CNC, vòng sứ Zirconia siêu phẳng 92 HRA, vòng thép Tungsten chống mẻ, tấm lót khay mực dùng 1 lần, đệm silicone và mực in Dubuit cao cấp.',
    href: '/products/consumables',
    icon: <Settings className="w-10 h-10 text-teal-500" />,
    highlights: ['Vòng sứ Zirconia', 'Cốc mực nam châm CNC', 'Đầu in silicone', 'Khay lót 1 lần']
  },
  {
    badge: 'MÁY MÓC TỰ ĐỘNG HÓA',
    title: 'Máy In Tampon & In Lụa Công Nghiệp',
    description: 'Giải pháp in pad, in lụa bán tự động và tự động hoàn toàn cho linh kiện điện tử, thiết bị y tế, nắp chai đồ uống và đồ nhựa gia dụng.',
    href: '/products/pad-printers',
    icon: <Tag className="w-10 h-10 text-rose-500" />,
    highlights: ['Máy in Pad 1 - 8 màu', 'Máy in lụa tròn & phẳng', 'Bàn hút chân không', 'Tùy biến đồ gá']
  },
  {
    badge: 'HÓA CHẤT CHUYÊN DỤNG',
    title: 'Mực In CIJ & TIJ Đặc Biệt',
    description: 'Mực in phun CIJ tương thích Videojet, Domino, Linx và hộp mực nhiệt TIJ HP 45A. Dòng mực chuyên dụng kháng dung môi, chịu nhiệt độ cao, bám dính kính, kim loại, cáp điện.',
    href: '/products/cij-ink',
    icon: <Package className="w-10 h-10 text-purple-500" />,
    highlights: ['Mực CIJ kháng cồn/nhiệt', 'Hộp mực TIJ HP 45A', 'Đạt chuẩn RoHS & REACH', 'Độ bám dính siêu việt']
  },
  {
    badge: 'TRUY XUẤT & ĐỊNH DANH SỐ',
    title: 'Hệ Thống Đọc Barcode & Chip RFID',
    description: 'Thiết bị đọc mã vạch công nghiệp, máy quét 1D/2D tốc độ cao trên băng tải và giải pháp nhận diện RFID tự động cho nhà máy thông minh (Smart Factory).',
    href: '/products/barcode-readers',
    icon: <ScanLine className="w-10 h-10 text-amber-500" />,
    highlights: ['Máy quét cố định băng chuyền', 'Cổng đọc RFID kho', 'Truy xuất nguồn gốc', 'Tích hợp ERP/MES']
  },
  {
    badge: 'CÔNG NGHỆ ĐỘT PHÁ',
    title: 'Máy Khắc Laser Tốc Độ Cao',
    description: 'Giải pháp khắc laser Fiber, CO2, UV vĩnh viễn trên kim loại, linh kiện bán dẫn, nhựa chịu nhiệt, chống hàng giả và truy vết số serial nhảy.',
    href: '/products/laser-printers',
    icon: <Zap className="w-10 h-10 text-yellow-500" />,
    highlights: ['Laser Fiber kim loại', 'Laser CO2 phi kim', 'Laser UV siêu mịn', 'Khắc date & mã QR']
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-6xl">
        
        {/* Header Section: 1-Stop Solution Positioning */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-orange-100 text-orange-700 text-xs font-black tracking-wider uppercase mb-4 border border-orange-200">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            1-STOP INDUSTRIAL SOLUTION PROVIDER
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Hệ Sinh Thái Thiết Bị & Giải Pháp In Công Nghiệp Toàn Diện
          </h1>
          <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            VNPIS kết nối hoàn hảo giữa <strong>Thiết Bị Cơ Khí Chính Xác</strong>, <strong>Hóa Chất & Mực In Chuyên Dụng</strong>, 
            <strong>Linh Kiện Đầu Phun Hiệu Suất Cao</strong> và <strong>Phần Mềm Quản Trị Vận Hành</strong> thành một thể thống nhất – 
            giải quyết trọn vẹn bài toán năng suất cho thị trường Việt Nam và xuất khẩu.
          </p>
        </div>

        {/* Spotlight Banner: S.K Bangkok & PrintFlow Combo */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl p-8 md:p-10 text-white shadow-xl border-2 border-emerald-500/40 mb-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-emerald-500 text-slate-950 text-xs font-black rounded-full uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" /> COMBO ĐỘT PHÁ NGÀNH DTG
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 text-white text-xs font-bold rounded-full">
                  S.K Bangkok × VNPIS
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-3 leading-snug">
                Trọn Bộ Giải Pháp In Áo Thun DTG: Hóa Chất S.K + Đầu In Brother GTX <br />
                <span className="text-emerald-400">TẶNG MIỄN PHÍ BẢN QUYỀN HỆ THỐNG SK PRINTFLOW</span>
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">
                Sử dụng full combo nước phủ Dark/Light, dung dịch bảo dưỡng Cleaning Solution CSX và mực in dệt may S.K để nhận ngay hệ thống quản lý xưởng PrintFlow (khách tự thiết kế, quét QR từng áo, đẩy file tự động tới Brother GTX).
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-bold text-emerald-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Bảo hành đầu in 1 năm 1 đổi 1</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Miễn phí phần mềm PrintFlow trọn đời combo</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Tiết kiệm 50% chi phí vận hành</span>
              </div>
            </div>

            <div className="flex-shrink-0">
              <Link 
                href="/products/sk-dtg-solution"
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/30 text-sm md:text-base group"
              >
                Khám Phá Trọn Bộ Combo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* 1-Stop Solution Architecture Section */}
        <div className="mb-16 bg-white rounded-3xl p-8 md:p-10 border border-slate-200 shadow-sm">
          <div className="text-center mb-8 max-w-2xl mx-auto">
            <span className="text-xs uppercase font-extrabold text-blue-600 tracking-wider block mb-1">
              TRIẾT LÝ VẬN HÀNH 1 ĐIỂM ĐẾN
            </span>
            <h3 className="text-2xl font-black text-slate-900">
              Vì Sao Khách Hàng Chọn Mô Hình 1-Stop Solution Tại VNPIS?
            </h3>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black mb-3">1</div>
              <h4 className="font-bold text-slate-900 mb-1 text-base">Thiết Bị Máy Móc</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Máy in pad, in lụa, máy in dệt Brother DTG, máy khắc laser công nghiệp chính hãng.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black mb-3">2</div>
              <h4 className="font-bold text-slate-900 mb-1 text-base">Vật Tư & Hóa Chất</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Mực in Dubuit, hóa chất tiền xử lý S.K, cốc mực Zirconia, dung dịch vệ sinh CSX đồng bộ.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black mb-3">3</div>
              <h4 className="font-bold text-slate-900 mb-1 text-base">Phần Mềm Số Hóa</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Hệ thống PrintFlow quản lý mã QR, web-to-print designer và hệ thống RFID nhà kho.</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-700 flex items-center justify-center font-black mb-3">4</div>
              <h4 className="font-bold text-slate-900 mb-1 text-base">Bảo Trì & Đổi 1:1</h4>
              <p className="text-xs text-slate-600 leading-relaxed">Kỹ sư VNPIS trực tiếp bảo dưỡng, cân chỉnh, thu cũ đổi mới siêu tốc không chờ đợi.</p>
            </div>
          </div>
        </div>

        {/* Main Products Ecosystem Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionEcosystems.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href}
              className={`group bg-white rounded-3xl p-8 border transition-all duration-300 flex flex-col ${
                cat.featured 
                  ? 'border-emerald-500 shadow-lg hover:shadow-2xl ring-2 ring-emerald-500/20' 
                  : 'border-slate-200 hover:border-orange-500 hover:shadow-xl'
              }`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-[10px] font-black tracking-wider uppercase px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                  {cat.badge}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-orange-600 transition-colors">
                {cat.title}
              </h3>

              <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                {cat.description}
              </p>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {cat.highlights.map((tag, tIdx) => (
                  <span key={tIdx} className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-slate-50 text-slate-600 border border-slate-100">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center text-orange-600 font-black text-xs uppercase tracking-wider mt-auto pt-4 border-t border-slate-100">
                KHÁM PHÁ GIẢI PHÁP <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-600/20 rounded-full blur-3xl -mr-10 -mt-10 pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 bg-white/10 text-orange-300 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
              TƯ VẤN KỸ THUẬT 1-STOP
            </span>
            <h2 className="text-3xl font-black mb-4">Cần Thiết Kế Cấu Hình Giải Pháp Riêng Cho Nhà Máy?</h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-8">
              Đội ngũ kỹ sư VNPIS trực tiếp khảo sát phôi in, chất liệu và quy trình sản xuất của bạn để đề xuất phương án tối ưu chi phí và độ bền bỉ cao nhất.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-sm md:text-base font-black text-slate-950 bg-white rounded-xl hover:bg-slate-100 transition-all shadow-xl">
              Yêu Cầu Khảo Sát & Báo Giá Trọn Gói
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
