export const dynamicParams = true;
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { CheckCircle, PhoneCall, ArrowRight, Zap, ShieldCheck, Factory } from 'lucide-react';

export const metadata = {
  title: 'Giải Pháp In KTS UV Single Pass Tốc Độ Cao | VNPIS',
  description: 'Công nghệ in UV Single Pass in dữ liệu biến đổi, thùng carton, bao bì với tốc độ lên tới 80m/phút. Giải pháp tự động hóa tối ưu chi phí cho nhà máy B2B.',
};

export default function UVSinglePassPrintingPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 text-blue-300 text-sm font-bold tracking-widest mb-6 border border-blue-500/30 uppercase">
            GIẢI PHÁP IN CÔNG NGHIỆP TỐC ĐỘ CAO
          </span>
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Công Nghệ In UV Single Pass Tốc Độ 80m/Phút Cho Nhà Máy B2B
          </h1>
          <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed">
            In trực tiếp dữ liệu biến đổi, mã QR code, barcode và logo trên thùng carton, vỏ hộp, kim loại và bao bì với công nghệ 1 lượt chạy không qua chế bản.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:0987453866" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full font-bold text-lg transition-colors flex items-center shadow-lg shadow-orange-500/30">
              <PhoneCall className="w-5 h-5 mr-2" /> Tư Vấn Kỹ Thuật: 0987 453 866
            </a>
            <Link href="/contact" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-full font-bold text-lg transition-colors">
              Yêu Cầu Báo Giá
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <Zap className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tốc Độ Vượt Trội</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Tốc độ in băng tải lên tới 80m/phút, đáp ứng công suất hàng triệu sản phẩm/ngày cho dây chuyền đóng gói tự động.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <ShieldCheck className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Mực UV Sấy Khô Tức Thì</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Mực UV bám dính cực cao, sấy khô bằng đèn LED UV ngay sau khi phun, chống nước và cào xước chuẩn ISO 2409.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200">
              <Factory className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Tích Hợp Dây Chuyền B2B</h3>
              <p className="text-slate-600 leading-relaxed text-sm">Dễ dàng gá lắp vào băng tải nhà máy, kết nối phần mềm ERP/MES in mã dữ liệu biến đổi mã hóa bảo mật.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">UV Single Pass Là Gì & Tại Sao Nên Chọn VNPIS?</h2>
            <p className="text-slate-600 leading-relaxed">
              Khác với máy in flatbed di chuyển đầu in qua lại nhiều lượt, công nghệ <strong>UV Single Pass</strong> sử dụng dàn đầu in phun công nghiệp (Ricoh Gen5 / Gen6, Kyocera) cố định phủ trọn khổ in. Phôi in di chuyển liên tục dưới dàn đầu in và hoàn thành sản phẩm chỉ trong 1 lượt chạy (Single Pass).
            </p>

            <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Ưu Điểm Khi Chọn Giải Pháp Tại VNPIS</h3>
            <ul className="space-y-3 text-slate-600 list-none pl-0">
              <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" /> Không tốn chi phí và thời gian chế bản lụa hay bản khắc cliché.</li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" /> Thay đổi mẫu thiết kế và dữ liệu mã hóa ngay trên phần mềm điều khiển.</li>
              <li className="flex items-start"><CheckCircle className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" /> Đội ngũ kỹ sư VNPIS hỗ trợ gá lắp, cài đặt phần mềm và bảo trì 24/7.</li>
            </ul>

            {/* Address Footer Box */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl mt-12 not-prose">
              <h4 className="text-xl font-bold mb-4 text-orange-400">LIÊN HỆ KHẢO SÁT & IN MẪU MIỄN PHÍ</h4>
              <p className="text-slate-300 text-sm mb-4">Công ty TNHH VNPIS ()</p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>🏢 <strong>Trụ sở chính:</strong> 18 Đường số 4, Khu Dân Cư Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh</li>
                <li>🔬 <strong>Lab Center 1:</strong> 62 Trần Thị Nơi, Phường Chánh Hưng (P.4, Q.8), TP. Hồ Chí Minh</li>
                <li>🏭 <strong>Đội ngũ KD 2:</strong> 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh</li>
              </ul>
              <div className="mt-6 flex gap-4">
                <a href="tel:0987453866" className="bg-orange-500 hover:bg-orange-600 px-6 py-2.5 rounded-full font-bold text-white transition-colors">
                  Hotline/Zalo: 0987 453 866
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
