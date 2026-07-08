import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageCircleQuestion, Phone } from 'lucide-react';

export const metadata = {
  title: 'Câu Hỏi Thường Gặp (FAQ) | VNPIS',
  description: 'Tổng hợp các câu hỏi thường gặp về máy in công nghiệp, mực in, dịch vụ bảo trì và gia công tại VNPIS.',
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
         <div className="absolute inset-0 bg-slate-800/50 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <MessageCircleQuestion className="w-16 h-16 text-slate-400 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight">
            Câu Hỏi Thường Gặp (FAQ)
          </h1>
          <p className="text-xl text-slate-300">
            Giải đáp thắc mắc về công nghệ, sản phẩm và chính sách dịch vụ của VNPIS.
          </p>
        </div>
      </section>

      {/* 2. FAQ CONTENT */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          
          <div className="space-y-12">
            {/* Category 1 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Công Nghệ In & Sản Phẩm</h2>
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">1. Khi nào nên dùng máy in CIJ, khi nào dùng TIJ?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    CIJ (In phun liên tục) phù hợp để in trên các bề mặt lõm/cong (đáy lon, cổ chai), tốc độ cực nhanh, mực bám mọi chất liệu. TIJ (In phun nhiệt) phù hợp để in trên mặt phẳng (thùng carton, hộp giấy), cần độ phân giải cao (Mã QR, Barcode) và ưu tiên sự nhỏ gọn, sạch sẽ, không bảo trì.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">2. In UV Single Pass khác gì so với in UV phẳng (Flatbed)?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    In UV phẳng yêu cầu đặt sản phẩm lên bàn in và đầu in chạy qua chạy lại (pass) mất nhiều thời gian. In UV Single Pass là sản phẩm chạy trên băng tải, đi qua dưới một hàng đầu in cố định, in xong trong 1 lượt (Single Pass) với tốc độ lên tới 50-60m/phút. Phù hợp sản xuất hàng loạt số lượng cực lớn.
                  </p>
                </div>
              </div>
            </div>

            {/* Category 2 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Mực In & Vật Tư</h2>
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">3. VNPIS có bán mực tương thích cho máy Videojet/Domino không?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Có. Chúng tôi cung cấp giải pháp mực và dung môi tương thích 100% về mặt hóa học cho hầu hết các thương hiệu máy in CIJ lớn (Videojet, Domino, Linx...). Sử dụng mực tương thích VNPIS giúp nhà máy giảm 30% - 40% chi phí vận hành (OPEX).
                  </p>
                </div>
              </div>
            </div>

            {/* Category 3 */}
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-4">Dịch Vụ (Sửa Chữa, Gia Công, Cho Thuê)</h2>
              <div className="space-y-6">
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">4. Dịch vụ cho thuê máy in tính phí như thế nào?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    Chi phí thuê được tính trọn gói theo Tháng/Quý/Năm tùy thuộc vào số lượng máy và loại máy. Giá thuê đã bao gồm toàn bộ chi phí bảo trì, thay thế phụ tùng (nếu có hỏng hóc). Vật tư (mực, dung môi) khách hàng sẽ mua theo khối lượng sử dụng thực tế.
                  </p>
                </div>
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">5. Gia công in lụa có nhận số lượng ít không?</h3>
                  <p className="text-slate-600 leading-relaxed">
                    VNPIS định vị là xưởng gia công công nghiệp, do đó chúng tôi tối ưu tốt nhất cho các đơn hàng số lượng lớn (từ vài ngàn đến hàng trăm ngàn sản phẩm). Với đơn hàng nhỏ lẻ, chi phí lên khuôn và làm mẫu ban đầu sẽ làm giá thành/sản phẩm cao hơn.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 3. CTA */}
      <section className="py-20 bg-slate-900 text-white text-center border-t border-slate-800">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl font-bold mb-6">Bạn Vẫn Còn Câu Hỏi Khác?</h2>
          <p className="text-xl text-slate-400 mb-10">Liên hệ trực tiếp với đội ngũ kỹ sư của chúng tôi để được giải đáp cụ thể cho trường hợp của nhà máy bạn.</p>
          <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-900 bg-white rounded-lg hover:bg-slate-200 transition-colors shadow-2xl">
            Liên Hệ Tư Vấn <Phone className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
