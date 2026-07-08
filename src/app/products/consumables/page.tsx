import React from 'react';
import Link from 'next/link';
import { ArrowRight, Settings, Droplet, Cog, CheckCircle2, Factory } from 'lucide-react';

export const metadata = {
  title: 'Vật Tư In Lụa & In Tampon | Consumables | VNPIS',
  description: 'Trung tâm vật tư tiêu hao (Consumables) cho in lụa (Screen) và in Tampon (Pad). Silicone pad, bản in thép, polymer, hóa chất dung môi chuyên dụng.',
};

export default function ConsumablesPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-orange-900/20 mix-blend-multiply" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-5xl">
          <span className="inline-block py-1.5 px-4 rounded-full bg-orange-500/20 text-orange-300 text-sm font-bold tracking-widest mb-6 border border-orange-500/30 uppercase">
            Vật Tư Tiêu Hao
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-tight">
            Vật Tư <span className="text-orange-500">In Lụa & In Tampon</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-10 max-w-3xl mx-auto leading-relaxed">
            Hệ sinh thái vật tư phụ trợ đầy đủ nhất. Từ Silicone Pad, bản in thép, bản Polymer đến dao gạt mực, dung môi và các hóa chất xử lý bề mặt chuyên sâu.
          </p>
        </div>
      </section>

      {/* 2. PAD PRINTING CONSUMABLES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Vật Tư In Tampon (Pad Printing)</h2>
              <div className="w-20 h-1 bg-orange-500 rounded-full mb-6" />
              <p className="text-lg text-slate-600 mb-6">Độ sắc nét của bản in Pad phụ thuộc rất lớn vào chất lượng cục cao su (Pad) và bản in thép. VNPIS cung cấp dịch vụ chế tạo theo yêu cầu.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Droplet className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Silicone Pad (Cục Cao Su)</h3>
              <p className="text-slate-600 mb-4">Đúc bằng silicone chịu mài mòn cao, chống tĩnh điện. Có hàng trăm khuôn đúc sẵn với nhiều độ cứng (shore) khác nhau.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Đúc theo hình dáng sản phẩm</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Độ nhả mực xuất sắc</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Settings className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Bản In Thép & Polymer</h3>
              <p className="text-slate-600 mb-4">Khắc bản in bằng laser sợi quang hoặc ăn mòn hóa học độ chính xác 0.01mm. Cung cấp bản thép dày (10mm) và thép mỏng (0.5mm).</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Bản thép tuổi thọ &gt; 1 triệu lần in</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Bản polymer dễ dàng tự chụp tại xưởng</li>
              </ul>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
              <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-6">
                <Cog className="w-7 h-7 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Hóa Chất Phụ Trợ</h3>
              <p className="text-slate-600 mb-4">Mực in Pad, dung môi pha loãng (nhanh/chậm), chất đóng rắn (Hardener) để tăng độ bám, và Primer xử lý bề mặt nhựa PP/PE.</p>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Mực bám dính tốt trên kính, kim loại</li>
                <li className="flex items-center"><CheckCircle2 className="w-4 h-4 text-green-500 mr-2"/> Đạt chứng nhận RoHS, REACH</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SCREEN PRINTING CONSUMABLES */}
      <section className="py-24 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center mb-12">
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Vật Tư In Lụa (Screen Printing)</h2>
              <div className="w-20 h-1 bg-purple-500 rounded-full mb-6" />
              <p className="text-lg text-slate-600 mb-6">Mọi vật tư để căng khung, chụp bản và vận hành máy in lụa công nghiệp, đảm bảo độ sắc nét cao nhất cho các chi tiết nhỏ.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Factory className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Lưới In & Khung Nhôm</h3>
                <p className="text-slate-600 mb-3">Khung nhôm hợp kim nhẹ, chịu lực căng cao. Lưới Polyester (từ 100 đến 420 mesh) chuyên dụng cho in UV và Solvent.</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Settings className="w-8 h-8 text-purple-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Keo Chụp Bản & Dao Gạt</h3>
                <p className="text-slate-600 mb-3">Keo chụp bản (Emulsion) chịu dung môi, chịu nước. Dao gạt mực (Squeegee) cao su PU chịu mài mòn, kháng dung môi cực tốt.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
