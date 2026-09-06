import React from 'react';
import { Award, ShieldCheck, CheckCircle, Factory, FileText } from 'lucide-react';

export default function InkCertificatesBadge() {
  return (
    <div className="my-8 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 text-slate-200 font-sans shadow-xl">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <span className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl border border-emerald-500/30">
            <Award className="w-5 h-5" />
          </span>
          <div>
            <h4 className="text-lg font-black text-white tracking-tight">CHỨNG NHẬN AN TOÀN &amp; NĂNG LỰC NHÀ CUNG CẤP VNPIS</h4>
            <p className="text-xs text-slate-400">Đạt tiêu chuẩn xuất khẩu EU, Mỹ &amp; Nhật Bản - An toàn sức khỏe con người</p>
          </div>
        </div>
        <div className="flex items-center text-xs text-blue-400 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full font-bold">
          <Factory className="w-3.5 h-3.5 mr-1.5" /> MST: 0318266611
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {/* ZDHC Level 3 */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3 hover:border-emerald-500/50 transition-colors">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-emerald-400 uppercase tracking-wider block mb-0.5">ZDHC Level 3</span>
            <h5 className="text-sm font-extrabold text-white mb-1">Mực In May Mặc An Toàn</h5>
            <p className="text-xs text-slate-400 leading-relaxed">Không chứa hóa chất độc hại thăng hoa, đạt chuẩn xuất khẩu ngành dệt may &amp; da giày vào Châu Âu.</p>
          </div>
        </div>

        {/* EN71-3 */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3 hover:border-blue-500/50 transition-colors">
          <div className="p-2.5 bg-blue-500/10 text-blue-400 rounded-xl shrink-0">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-blue-400 uppercase tracking-wider block mb-0.5">EN71-3 European Standard</span>
            <h5 className="text-sm font-extrabold text-white mb-1">An Toàn Cho Trẻ Sơ Sinh</h5>
            <p className="text-xs text-slate-400 leading-relaxed">Chuẩn kiểm định mực in đồ chơi trẻ em, thiết bị học tập và sản phẩm nhựa tiếp xúc trực tiếp.</p>
          </div>
        </div>

        {/* FDA Compliance */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl flex items-start space-x-3 hover:border-amber-500/50 transition-colors">
          <div className="p-2.5 bg-amber-500/10 text-amber-400 rounded-xl shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block mb-0.5">FDA Compliance Grade</span>
            <h5 className="text-sm font-extrabold text-white mb-1">In Bao Bì Thực Phẩm &amp; Dược</h5>
            <p className="text-xs text-slate-400 leading-relaxed">Mực in CIJ/TIJ khô nhanh, kháng nước, chịu nhiệt độ thanh trùng màng nhôm &amp; chai vỉ thuốc.</p>
          </div>
        </div>
      </div>

      {/* Workshop Address & Verification */}
      <div className="bg-gradient-to-r from-blue-950/40 via-slate-950 to-indigo-950/40 border border-blue-500/20 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span><strong>Xưởng Test Máy &amp; Chế Bản:</strong> 18 Đường số 4, KDC Đại Phúc Green Villas, Bình Hưng, Bình Chánh, TP.HCM</span>
        </div>
        <a
          href="https://vnpis.com/contact"
          target="_blank"
          rel="noreferrer"
          className="text-blue-400 hover:text-blue-300 font-extrabold underline whitespace-nowrap"
        >
          Xem Hồ Sơ Năng Lực VNPIS &rarr;
        </a>
      </div>
    </div>
  );
}
