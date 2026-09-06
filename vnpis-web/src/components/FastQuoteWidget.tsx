'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, Zap, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function FastQuoteWidget({ currentTitle }: { currentTitle?: string }) {
  const [category, setCategory] = useState('Máy in Tampon');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return;

    // Create Zalo message link
    const message = `Chào VNPIS, tôi tên là ${name || 'Khách hàng'}, SĐT: ${phone}. Cần tư vấn: [${category}] ${note ? `- Yêu cầu: ${note}` : ''} ${currentTitle ? `(Từ bài viết: ${currentTitle})` : ''}`;
    const zaloUrl = `https://zalo.me/0987453866?text=${encodeURIComponent(message)}`;
    
    setSubmitted(true);
    setTimeout(() => {
      window.open(zaloUrl, '_blank');
    }, 500);
  };

  return (
    <div className="my-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden font-sans">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
          <div className="flex items-center space-x-2">
            <span className="p-2 bg-blue-500/20 text-blue-400 rounded-xl border border-blue-500/30">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">Báo Giá Nhanh 30 Giây &amp; Test Mẫu Thử</h3>
              <p className="text-xs text-slate-400">Tư vấn chọn giải pháp in ấn B2B tối ưu ngân sách xưởng</p>
            </div>
          </div>
          <div className="flex items-center text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full font-bold">
            <Clock className="w-3.5 h-3.5 mr-1.5" /> Phản hồi trong 5 phút
          </div>
        </div>

        {submitted ? (
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-6 text-center text-emerald-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
            <h4 className="text-lg font-bold mb-1">Yêu Cầu Đã Được Khởi Tạo!</h4>
            <p className="text-xs text-emerald-200/80 mb-4">Đang chuyển hướng kết nối trực tiếp với Chuyên viên Kỹ thuật VNPIS qua Zalo...</p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-blue-400 underline font-semibold"
            >
              Gửi lại yêu cầu khác
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                1. Chọn Nhu Cầu Cần Báo Giá / Tư Vấn:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {[
                  'Máy in Tampon',
                  'Mực in Công Nghiệp',
                  'Cứu Hộ Đầu In',
                  'In Gia Công Phôi',
                ].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      category === item
                        ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Họ Tên / Tên Công Ty (Tùy chọn):</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Anh Nam - Xưởng In Nhựa"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Số Điện Thoại / Zalo (* Bắt buộc):</label>
                <input
                  type="tel"
                  required
                  placeholder="Nhập SĐT để nhận báo giá..."
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Chi Tiết Sản Phẩm Cần In / Ghi Chú:</label>
              <textarea
                rows={2}
                placeholder="Ví dụ: Cần in logo 2 màu lên 10.000 nắp chai nhựa PP, hỗ trợ in thử mẫu..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <div className="flex items-center space-x-3 text-xs text-slate-400">
                <span className="flex items-center"><ShieldCheck className="w-4 h-4 text-emerald-400 mr-1" /> Bảo mật thông tin</span>
                <span className="flex items-center"><MapPin className="w-4 h-4 text-amber-400 mr-1" /> Test mẫu tại xưởng Bình Chánh</span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-xl text-xs flex items-center justify-center space-x-2 transition-all shadow-lg shadow-blue-600/30"
              >
                <span>GỬI YÊU CẦU QUA ZALO</span>
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
