import React from 'react';
import { ArrowRight, ShieldCheck, Microscope, Thermometer, Droplets, Droplet } from 'lucide-react';
import Link from 'next/link';


export const metadata = {
  title: 'Mực In CIJ, TIJ Đặc Biệt | VNPIS - Giải Pháp In Phun Công Nghiệp',
  description: 'Chuyên cung cấp các dòng mực in CIJ, TIJ đặc biệt: mực tàng hình, mực chịu nhiệt, mực thực phẩm in trứng, mực kháng cồn, kháng lưu hóa.',
};

export default function SpecialInksPage() {
  return (
    <main className="min-h-screen pt-20">
      {/* 1. HERO SECTION */}
      <section className="relative py-24 lg:py-32 overflow-hidden bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 to-slate-900 z-0" />
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10 z-0" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center space-x-2 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-full mb-6 border border-blue-500/30">
                <Microscope className="w-4 h-4" />
                <span className="text-sm font-semibold tracking-wide uppercase">Công Nghệ Hóa Chất Tiên Tiến</span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Mực In CIJ, TIJ <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Đặc Biệt</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed max-w-2xl">
                Giải pháp toàn diện cho những bề mặt "khó nhằn" nhất. Từ mực in chịu nhiệt độ cao luộc sôi, mực tàng hình bảo mật, cho đến mực thực phẩm in trực tiếp lên vỏ trứng gà. VNPIS cung cấp dải sản phẩm chuyên biệt cho mọi ngành công nghiệp.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#catalog" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center justify-center text-lg hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  Tra Cứu Bảng Mã Mực <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="aspect-video lg:aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700 shadow-2xl relative flex items-center justify-center">
                 <div className="grid grid-cols-2 gap-4 p-8 w-full h-full">
                    <div className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                        <Thermometer className="w-12 h-12 text-red-400 mb-4" />
                        <span className="text-white font-bold">Chịu Nhiệt Cao</span>
                        <span className="text-slate-400 text-sm mt-2">Lên đến 300°C</span>
                    </div>
                    <div className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                        <ShieldCheck className="w-12 h-12 text-cyan-400 mb-4" />
                        <span className="text-white font-bold">Tàng Hình / UV</span>
                        <span className="text-slate-400 text-sm mt-2">Bảo mật chống giả</span>
                    </div>
                    <div className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                        <Droplets className="w-12 h-12 text-orange-400 mb-4" />
                        <span className="text-white font-bold">Kháng Dung Môi</span>
                        <span className="text-slate-400 text-sm mt-2">Kháng Cồn, Dầu</span>
                    </div>
                    <div className="bg-slate-900 rounded-xl border border-slate-700 flex flex-col items-center justify-center p-6 text-center">
                        <Droplet className="w-12 h-12 text-green-400 mb-4" />
                        <span className="text-white font-bold">Mực Thực Phẩm</span>
                        <span className="text-slate-400 text-sm mt-2">An toàn ăn uống</span>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INK CATALOG */}
      <section id="catalog" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Bảng Tra Cứu Mực In Đặc Biệt VNPIS</h2>
            <div className="w-20 h-1 bg-blue-500 mx-auto rounded-full mb-8" />
            <p className="text-lg text-slate-600">Phân loại chi tiết các dòng mực CIJ, TIJ chuyên biệt theo mã và ứng dụng.</p>
          </div>

          {/* Dòng Mực TIJ (Mực Nhiệt) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-orange-500 pl-4">1. Dòng Mực TIJ (Mực In Phun Nhiệt)</h3>
            <div className="overflow-x-auto shadow-xl rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Mã Mực</th>
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Tên Phân Loại</th>
                    <th className="p-4 font-semibold border-b border-slate-700">Ứng Dụng & Đặc Tính</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-orange-600">HF200</td>
                    <td className="p-4 font-semibold">Mực Đen TIJ Khô Nhanh</td>
                    <td className="p-4 text-sm text-slate-600">Độ phân giải cao, siêu khô nhanh, cân bằng tốt giữa độ bám dính và làm phẳng bề mặt. Khả năng mở nắp chờ (decap time) cực tốt.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-orange-600">HF300 / HF310 / HF500 / HF510</td>
                    <td className="p-4 font-semibold">Mực Màu TIJ (Đỏ, Xanh, Magenta)</td>
                    <td className="p-4 text-sm text-slate-600">Mực gốc dung môi (Solvent/Ethanol-based) khô nhanh, màu sắc tươi sáng, tương thích nhiều loại chất liệu đa dạng.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-orange-600">HF901</td>
                    <td className="p-4 font-semibold">Mực TIJ Tàng Hình Khô Nhanh</td>
                    <td className="p-4 text-sm text-slate-600">Mực in tàng hình (chỉ hiện xanh dưới đèn UV), sử dụng cho máy in phun nhiệt TIJ.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-orange-600">HW</td>
                    <td className="p-4 font-semibold">Mực Gốc Nước TIJ</td>
                    <td className="p-4 text-sm text-slate-600">Độ đen cực cao (High Density Black), chuyên dụng cho bề mặt thấm hút tốt (carton, giấy).</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-orange-600">HE01</td>
                    <td className="p-4 font-semibold">Mực Đỏ In Trứng TIJ</td>
                    <td className="p-4 text-sm text-slate-600">Sản xuất từ nguyên liệu phẩm màu thực phẩm, chuyên dùng để in trực tiếp lên vỏ trứng gà/vịt (khô chậm hơn mực dung môi).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dòng Mực CIJ (Mực Liên Tục) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-blue-500 pl-4">2. Dòng Mực CIJ (Mực In Phun Liên Tục)</h3>
            <div className="overflow-x-auto shadow-xl rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Mã Mực</th>
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Tên Phân Loại</th>
                    <th className="p-4 font-semibold border-b border-slate-700">Ứng Dụng & Đặc Tính</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">K12</td>
                    <td className="p-4 font-semibold">Mực Chịu Nhiệt Cao</td>
                    <td className="p-4 text-sm text-slate-600">Chịu được quá trình chưng cất, luộc sôi lên đến 121°C. Ứng dụng phổ biến cho túi bao bì thực phẩm, đồ hộp hấp khử trùng.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">LT02 / LT1A</td>
                    <td className="p-4 font-semibold">Mực Sấy Nóng / Chống Di Di Tản</td>
                    <td className="p-4 text-sm text-slate-600">Chịu nhiệt nung/sấy (baking). Mực LT1A có đặc tính chống di tản phân tử, an toàn cho bao bì.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">K09 / K15 / K17B</td>
                    <td className="p-4 font-semibold">Mực Bám Dính Siêu Cường</td>
                    <td className="p-4 text-sm text-slate-600">Bám dính xuất sắc trên đa số bề mặt nhựa và kim loại trơn láng. K15 là mực không chứa Halogen. K17B đặc biệt chống chịu tốt trong môi trường đông lạnh.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">T09</td>
                    <td className="p-4 font-semibold">Mực Kháng Dầu / Luộc</td>
                    <td className="p-4 text-sm text-slate-600">In tốt ngay cả khi bề mặt trước khi in có dính nhẹ lớp dầu mỡ. Có thể chịu luộc ở nhiệt độ thấp.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">T03</td>
                    <td className="p-4 font-semibold">Mực Tàng Hình (Invisible Blue)</td>
                    <td className="p-4 text-sm text-slate-600">Trong suốt/tàng hình dưới điều kiện ánh sáng thường. Phát quang màu xanh rõ rệt dưới tia UV. Ứng dụng truy xuất nguồn gốc, chống hàng giả.</td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">KE01</td>
                    <td className="p-4 font-semibold">Mực Đỏ In Trứng (Tiếp Xúc Thực Phẩm)</td>
                    <td className="p-4 text-sm text-slate-600">Không chứa kim loại nặng (Không Chrome), đạt tiêu chuẩn an toàn tiếp xúc thực phẩm. Base không phải gốc MEK (Butanone).</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-blue-600">BLUEA / BLUEB / C-MAGENTA / GREEN / PURPLE</td>
                    <td className="p-4 font-semibold">Hệ Mực Màu CIJ</td>
                    <td className="p-4 text-sm text-slate-600">Dòng mực màu (Đỏ, Xanh lá, Xanh dương, Tím...) chuyên in trên các loại bề mặt sáng màu. Mã BLUEC đặc trị in trên tấm phân cực (Polarizing film).</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Dòng Mực Chữ Lớn (DOD) */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center border-l-4 border-slate-700 pl-4">3. Dòng Mực In Ký Tự Lớn (DOD)</h3>
            <div className="overflow-x-auto shadow-xl rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Mã Mực</th>
                    <th className="p-4 font-semibold border-b border-slate-700 whitespace-nowrap">Tên Phân Loại</th>
                    <th className="p-4 font-semibold border-b border-slate-700">Ứng Dụng & Đặc Tính</th>
                  </tr>
                </thead>
                <tbody className="text-slate-800">
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-800">DZW</td>
                    <td className="p-4 font-semibold">Mực Trắng DOD Thường</td>
                    <td className="p-4 text-sm text-slate-600">Sử dụng cho máy in phun ký tự lớn (Drop-on-Demand). Ứng dụng in logo, lô hàng chữ lớn.</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="p-4 font-bold text-slate-800">DZWAV</td>
                    <td className="p-4 font-semibold">Mực Trắng DOD Kháng Lưu Hóa</td>
                    <td className="p-4 text-sm text-slate-600">Chuyên trị in lên Lốp xe, sản phẩm cao su. Chịu được quá trình lưu hóa (vulcanization) khắc nghiệt của ngành sản xuất lốp.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 3. LEAD FORM SECTION */}
      <section id="contact" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Gặp Bài Toán Bề Mặt Khó?</h2>
            <p className="text-lg text-slate-300">
              Hãy mô tả chất liệu và yêu cầu của bạn, đội ngũ kỹ sư hóa chất VNPIS sẽ gửi mẫu mực test thử hoàn toàn miễn phí.
            </p>
          </div>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Họ và Tên *</label>
                  <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập tên của bạn" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Số Điện Thoại *</label>
                  <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập số điện thoại" required />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Vật liệu cần in & Yêu cầu đặc biệt</label>
                <textarea rows={4} className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Ví dụ: Cần in lên túi nilon, chịu nhiệt luộc sôi 100 độ..."></textarea>
              </div>
              <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors text-lg">
                Gửi Yêu Cầu Tư Vấn Ngay
              </button>
            </form>
        </div>
      </section>
    </main>
  );
}
