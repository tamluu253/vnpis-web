import React from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Giải Pháp In Dây Cáp Điện: Mực Trắng Không Răng Cưa | VNPIS',
  description: 'In thông số lên dây cáp điện đòi hỏi độ bám cao và mã vạch không bị vỡ hạt. Mực trắng chuyên dụng cho cáp giải quyết triệt để vấn đề này.',
};

export default function ArticlePage() {
  return (
    <main className="min-h-screen pt-24 pb-12 bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <Link href="/products/special-inks" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Về trang Mực In Đặc Biệt
        </Link>
        
        <article className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <span className="bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">CIJ</span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Mã: WHITE-CABLE</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">Giải Pháp In Dây Cáp Điện: Mực Trắng Không Răng Cưa</h1>
          <p className="text-xl text-slate-600 mb-10 leading-relaxed">In thông số lên dây cáp điện đòi hỏi độ bám cao và mã vạch không bị vỡ hạt. Mực trắng chuyên dụng cho cáp giải quyết triệt để vấn đề này.</p>
          
          <div className="mb-12">
            
          </div>

          <div className="prose prose-lg max-w-none text-slate-700">
            <h2>Tại sao nên sử dụng mã mực WHITE-CABLE?</h2>
            <p>Trong môi trường sản xuất công nghiệp, việc chọn đúng loại mực quyết định tới 80% khả năng truy xuất nguồn gốc và nhận diện thương hiệu. Dòng mực CIJ mã <strong>WHITE-CABLE</strong> của VNPIS mang lại hiệu suất vượt trội, loại bỏ hoàn toàn các vấn đề bong tróc, mờ nhòe hay nghẹt đầu in.</p>
            
            <ul className="space-y-4 my-8 list-none pl-0">
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-0.5" />
                <span>Bám dính vĩnh viễn trên bề mặt tiêu chuẩn.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-0.5" />
                <span>Thời gian khô cực nhanh, đáp ứng dây chuyền tốc độ cao.</span>
              </li>
              <li className="flex items-start">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 shrink-0 mt-0.5" />
                <span>Thân thiện môi trường, an toàn cho người vận hành.</span>
              </li>
            </ul>

            <p>Khách hàng của VNPIS đã ứng dụng thành công giải pháp này để tiết kiệm hàng trăm triệu đồng chi phí tem nhãn mỗi năm. Thay vì dán tem, in trực tiếp bằng công nghệ CIJ là tương lai của ngành đóng gói.</p>
          </div>
        </article>

        {/* Lead Form */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Cần Tư Vấn & Báo Giá Mã WHITE-CABLE?</h2>
            <p className="text-slate-300">Để lại thông tin, chuyên gia VNPIS sẽ mang mẫu thử đến tận nhà máy của bạn.</p>
          </div>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Họ và Tên *</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập tên của bạn" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Số Điện Thoại *</label>
                <input type="tel" className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" placeholder="Nhập số điện thoại" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Yêu cầu báo giá</label>
              <textarea rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-700 bg-slate-800 text-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" defaultValue={"Tôi quan tâm đến mã mực WHITE-CABLE. Vui lòng liên hệ tư vấn."}></textarea>
            </div>
            <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg transition-colors text-lg">
              Gửi Yêu Cầu Tư Vấn Ngay
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
