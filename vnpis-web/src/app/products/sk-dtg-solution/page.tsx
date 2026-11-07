export const dynamicParams = true;
import React from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  CheckCircle2, 
  Printer, 
  Droplet, 
  Layers, 
  QrCode, 
  Smartphone, 
  Laptop, 
  Cpu, 
  Zap, 
  ExternalLink,
  Award,
  BarChart3,
  RefreshCw,
  FolderSync
} from 'lucide-react';
import ConsultationForm from '@/components/ui/ConsultationForm';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/sk-dtg-solution',
  },
  title: 'Trọn Bộ Giải Pháp In DTG S.K & Miễn Phí Phần Mềm SK PrintFlow | VNPIS',
  description: 'Trọn bộ giải pháp in dệt may DTG từ S.K Bangkok & VNPIS: Nước phủ vải Dark/Light, dung dịch vệ sinh đầu in GTX, mực in DTG chính hãng. TẶNG MIỄN PHÍ phần mềm quản lý xưởng SK PrintFlow khi sử dụng trọn bộ combo.',
};

export default function SkDtgSolutionPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* 1. HERO HEADER */}
      <section className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-25">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-orange-500 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-6xl">
          <Link href="/products" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium text-sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Về danh mục Giải Pháp & Sản Phẩm VNPIS
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
              <Sparkles className="w-3.5 h-3.5" /> S.K COLOR & CHEMICALS (BANGKOK) × VNPIS
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/30">
              <QrCode className="w-3.5 h-3.5" /> MIỄN PHÍ PHẦN MỀM SK PRINTFLOW
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 text-xs font-bold border border-orange-400/30">
              <ShieldCheck className="w-3.5 h-3.5" /> 1-STOP SOLUTION FOR DTG
            </span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white mb-6 leading-tight">
            Trọn Bộ Giải Pháp In Áo Thun DTG Toàn Diện <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-200 to-orange-400">
              Hóa Chất S.K • Mực In • Đầu In • Phần Mềm PrintFlow
            </span>
          </h1>

          <p className="text-base md:text-lg text-slate-300 max-w-3xl leading-relaxed mb-8">
            Giải pháp 1 điểm đến (1-Stop Solution) hoàn chỉnh cho các xưởng in áo thun dệt may trực tiếp tại Việt Nam. 
            Kết hợp hoàn hảo giữa <strong>Nước phủ tiền xử lý vải Dark/Light</strong>, <strong>Dung dịch vệ sinh đầu in</strong>, 
            <strong>Mực DTG cao cấp S.K</strong> cùng đặc quyền: <strong>TẶNG MIỄN PHÍ HỆ THỐNG QUẢN TRỊ XƯỞNG SK PRINTFLOW</strong> khi sử dụng trọn bộ combo!
          </p>

          <div className="flex flex-wrap gap-4">
            <a 
              href="#combo-packages" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-white bg-emerald-600 rounded-xl hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30"
            >
              Xem Chi Tiết Full Combo & Khuyến Mãi
            </a>
            <a 
              href="#printflow-features" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors"
            >
              Khám Phá Phần Mềm PrintFlow
            </a>
            <Link 
              href="/products/printheads/brother-gtx" 
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm md:text-base font-bold text-blue-300 bg-blue-500/10 border border-blue-400/30 rounded-xl hover:bg-blue-500/20 transition-colors"
            >
              Đầu In Brother GTX (Bảo Hành 1 Năm 1 Đổi 1)
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: WHY 1-STOP SOLUTION */}
      <section className="container mx-auto px-4 max-w-6xl -mt-8 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 font-black text-xl">
                01
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Đồng Bộ Kỹ Thuật 100%</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Hóa chất tiền xử lý, mực in và dung dịch bảo dưỡng được nghiên cứu tương thích hóa học tối ưu, triệt tiêu 100% nguy cơ phản ứng đông kết làm tắc đầu in.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center flex-shrink-0 font-black text-xl">
                02
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">Miễn Phí PrintFlow</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Không tốn phí bản quyền phần mềm quản lý xưởng hàng tháng. Khách hàng tự thiết kế online, theo dõi đơn bằng QR, tự động kết nối máy Brother GTX.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-700 flex items-center justify-center flex-shrink-0 font-black text-xl">
                03
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">1 Đối Tác Chịu Trách Nhiệm</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Không lo tình trạng bên bán máy đổ lỗi cho bên bán mực, bên bán mực đổ lỗi cho hóa chất. VNPIS đứng ra bảo chứng và bảo hành trọn vẹn toàn bộ dây chuyền.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. COMBO S.K PRODUCTS BREAKDOWN */}
      <section id="combo-packages" className="container mx-auto px-4 max-w-6xl mt-20 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            DANH MỤC VẬT TƯ & HÓA CHẤT CHUYÊN DỤNG
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            Trọn Bộ Hóa Chất Tiền Xử Lý & Bảo Trì S.K (Bangkok, Thái Lan)
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base">
            S.K. Color & Chemicals là nhà sản xuất hóa chất dệt may và mực DTG hàng đầu Đông Nam Á, mang lại độ mềm mại, độ bám dính và chuẩn an toàn Oeko-Tex cao nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          
          {/* Item 1: Dark Cotton Pretreatment */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center mb-6">
              <Droplet className="w-8 h-8 text-emerald-400" />
            </div>
            <span className="text-xs uppercase font-extrabold text-emerald-600 mb-1 tracking-wider">MÃ: PRT-DTG-TCUDC3</span>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              SK Ulti Dark Cotton Blend Pretreatment
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
              Dung dịch tiền xử lý cao cấp dành riêng cho vải màu tối, đen và sợi pha (Cotton/Poly). Giúp lớp mực trắng Titanium Dioxide ($TiO_2$) kết tụ tức thì trên bề mặt sợi, tăng độ đục và rực rỡ mà không gây ố vàng (Low Stain).
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between"><span>Độ nhớt:</span><strong>~3 cps</strong></div>
              <div className="flex justify-between"><span>pH tiêu chuẩn:</span><strong>9.0 – 10.0</strong></div>
              <div className="flex justify-between"><span>Đặc tính:</span><strong>Mềm tay, chống loang ố</strong></div>
            </div>
            <span className="inline-block text-center py-2 px-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold">
              Can 1 Lít / Can 5 Lít / Thùng 20 Lít
            </span>
          </div>

          {/* Item 2: Light Cotton Pretreatment */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <Droplet className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase font-extrabold text-amber-600 mb-1 tracking-wider">MÃ: PRT-DTG-TCWC</span>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              SK Ulti Light Cotton Blend Pretreatment
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
              Dung dịch tiền xử lý cho áo sáng màu, trắng, pastel. Khóa chặt các hạt mực CMYK trên mặt vải, giúp hình in nét căng, độ chuyển màu mượt mà, chống hiện tượng chìm mực vào thớ vải và tăng độ bền giặt lên cấp độ 4–5.
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between"><span>Độ nhớt:</span><strong>~4 cps</strong></div>
              <div className="flex justify-between"><span>pH tiêu chuẩn:</span><strong>9.5 – 10.0</strong></div>
              <div className="flex justify-between"><span>Đặc tính:</span><strong>Không để lại dư lượng mắt thấy</strong></div>
            </div>
            <span className="inline-block text-center py-2 px-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold">
              Can 1 Lít / Can 5 Lít / Thùng 20 Lít
            </span>
          </div>

          {/* Item 3: Cleaning Solution for GTX */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 p-8 flex flex-col">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase font-extrabold text-blue-600 mb-1 tracking-wider">MÃ: IJ-CSX-GTX4</span>
            <h3 className="text-xl font-black text-slate-900 mb-3">
              Optimized Cleaning Solution for Brother GTX
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-grow">
              Dung dịch làm sạch & bảo dưỡng chuyên sâu gốc nước (water-based) thiết kế riêng cho dòng máy in Brother GTX/GTXpro. Làm tan cặn mực khô trên lưỡi gạt wiper, nắp ủ capping mà không ăn mòn lớp phủ kỵ nước của vòi phun.
            </p>
            <div className="space-y-2.5 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between"><span>Độ nhớt:</span><strong>&lt; 2 mPa·s tại 25°C</strong></div>
              <div className="flex justify-between"><span>pH tiêu chuẩn:</span><strong>8.0 – 9.0</strong></div>
              <div className="flex justify-between"><span>Tương thích:</span><strong>Brother GTX, GTXpro, Bulk</strong></div>
            </div>
            <span className="inline-block text-center py-2 px-4 rounded-xl bg-slate-100 text-slate-800 text-xs font-bold">
              Chai 1 Lít / Can 5 Lít
            </span>
          </div>

        </div>

        {/* Big Offer Banner: Free PrintFlow */}
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-indigo-950 rounded-3xl p-8 md:p-12 text-white border-2 border-emerald-500/50 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black uppercase tracking-wider mb-4 shadow-sm">
                ƯU ĐÃI ĐỘC QUYỀN VNPIS
              </span>
              <h3 className="text-2xl md:text-4xl font-black mb-4 leading-tight">
                Dùng Trọn Bộ Hóa Chất & Mực DTG S.K <br />
                <span className="text-emerald-400">TẶNG MIỄN PHÍ BẢN QUYỀN HỆ THỐNG SK PRINTFLOW</span>
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
                Khi xưởng in sử dụng full combo vật tư (Mực DTG + Nước phủ Dark/Light + Dung dịch vệ sinh S.K) từ VNPIS, bạn sẽ được <strong>kích hoạt miễn phí 100% hệ thống phần mềm quản trị xưởng SK PrintFlow</strong> trị giá hàng triệu đồng mỗi tháng. 
                Đồng thời đầu in Brother DTG của bạn được hưởng chính sách <strong>bảo hành 1 năm 1 đổi 1 siêu tốc</strong>!
              </p>
              <div className="flex flex-wrap gap-4 text-xs md:text-sm font-bold text-emerald-300">
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Không giới hạn số lượng áo in</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Bản địa hóa VietQR & Tiếng Việt</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4" /> Đẩy file tự động tới Brother GTX</span>
              </div>
            </div>

            <div className="flex-shrink-0 flex flex-col gap-3">
              <a 
                href="#contact" 
                className="inline-flex items-center justify-center px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl transition-all shadow-lg shadow-emerald-500/30 text-base text-center"
              >
                Đăng Ký Nhận Combo Ngay
              </a>
              <a 
                href="https://sk-printflow.onrender.com/designer.html?shop=tshirt-master" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all text-sm text-center"
              >
                Trải Nghiệm Demo Khách Thiết Kế <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SK PRINTFLOW DEEP-DIVE */}
      <section id="printflow-features" className="container mx-auto px-4 max-w-6xl mt-20 scroll-mt-24">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
            HỆ THỐNG QUẢN TRỊ XƯỞNG THẾ HỆ MỚI
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">
            SK PrintFlow Giải Quyết Triệt Để 5 Nỗi Đau Lớn Nhất Của Xưởng DTG
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto text-base">
            Không còn tình trạng nhận đơn rải rác qua Zalo, sót bill chuyển khoản, sai kích thước in hay khách liên tục giục "xong chưa?". PrintFlow đưa toàn bộ hoạt động xưởng về một nền tảng duy nhất.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6">
              <Smartphone className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">1. Khách Tự Thiết Kế Online</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Khách tự tải ảnh, thêm chữ, xóa nền 1 chạm ngay trên điện thoại. Vùng in tính bằng cm, đúng theo phom áo thật của xưởng. Giá tính tự động, khách trả tiền trước khi xưởng in.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-6">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">2. Quét Tem QR Từng Công Đoạn</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mỗi chiếc áo dán một tem QR in nhiệt. Nhân viên quét mã tại các khâu: Tiếp nhận &rarr; Pretreatment &rarr; In máy GTX &rarr; Sấy &rarr; QC &rarr; Đóng gói. Thấy rõ tiến độ và không bao giờ in nhầm áo.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
              <FolderSync className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">3. Tự Động Đẩy File Tới Brother GTX</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Kết nối trực tiếp với phần mềm RIP chính thức của Brother (GTX Graphics Lab / Hot Folder / SDK). Quét mã đơn là file in tự động load vào máy in tương ứng, không cần copy USB thủ công.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center mb-6">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">4. Ước Tính Lượng Mực Thật Theo Pixel</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Hệ thống tự động phân tích độ phủ màu của thiết kế theo từng pixel, tính toán chính xác lượng mực CMYK và White tiêu thụ, giúp chủ xưởng định giá bán chuẩn xác và kiểm soát hao hụt.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">5. Khách Tự Theo Dõi Đơn Thời Gian Thực</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Mỗi đơn hàng có 1 link theo dõi riêng cập nhật theo từng lần quét tem tại xưởng. Kèm mã vận đơn giao hàng, giúp giảm hơn 80% tin nhắn hỏi "áo của mình xong chưa shop?".
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">6. Phân Quyền 8 Vai Trò Bảo Mật</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Phân quyền chặt chẽ cho chủ xưởng, kế toán, nhân viên tiếp nhận, thợ in và QC. Khách chỉ thấy giá bán, không bao giờ thấy giá vốn hay công thức chi phí của xưởng.
            </p>
          </div>

        </div>

        {/* Live Demo Access Links */}
        <div className="mt-12 p-8 bg-slate-100 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-black text-slate-900 mb-1">Trải Nghiệm Trực Tiếp Hệ Thống Bản Demo "T-Shirt Master"</h4>
            <p className="text-sm text-slate-600">Đầy đủ giao diện khách tự thiết kế và giao diện điều hành của chủ xưởng.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a 
              href="https://sk-printflow.onrender.com/designer.html?shop=tshirt-master" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-colors"
            >
              Demo Khách Thiết Kế <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <a 
              href="https://sk-printflow.onrender.com/login.html?shop=tshirt-master" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 flex items-center gap-2 transition-colors shadow-sm"
            >
              Demo Quản Lý Xưởng <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. VNPIS 1-STOP SOLUTION ECOSYSTEM */}
      <section className="container mx-auto px-4 max-w-6xl mt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 md:p-12 shadow-sm">
          <div className="text-center mb-10">
            <span className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
              VNPIS 1-STOP SOLUTION PROVIDER
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900 mb-3">
              Mô Hình Giải Pháp 1 Điểm Đến – Không Cần Tìm Kiếm Rời Rạc
            </h3>
            <p className="text-slate-600 text-sm md:text-base max-w-2xl mx-auto">
              VNPIS chịu trách nhiệm đồng bộ từ thiết bị phần cứng, linh kiện thay thế, hóa chất mực in đến phần mềm số hóa nhà xưởng.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Printer className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Máy & Đầu In</h4>
              <p className="text-xs text-slate-500">Đầu in Brother GTX Refurbished $\ge$99% tia & OEM New, bảo hành 1 năm 1 đổi 1.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <Droplet className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Hóa Chất & Mực In</h4>
              <p className="text-xs text-slate-500">Nước phủ Dark/Light S.K, Cleaning Solution CSX-GTX4, mực in DTG Oeko-Tex.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <QrCode className="w-8 h-8 text-indigo-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Phần Mềm Quản Trị</h4>
              <p className="text-xs text-slate-500">Hệ thống PrintFlow theo dõi QR từng áo, kết nối máy in Brother, khách tự thiết kế.</p>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
              <ShieldCheck className="w-8 h-8 text-orange-600 mx-auto mb-3" />
              <h4 className="font-bold text-slate-900 text-base mb-1">Bảo Trì Kỹ Thuật</h4>
              <p className="text-xs text-slate-500">Đội ngũ kỹ sư VNPIS trực tiếp chuyển giao công nghệ, cân chỉnh máy và cứu hộ 24/7.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CONTACT FORM */}
      <section id="contact" className="container mx-auto px-4 max-w-4xl mt-20 scroll-mt-24">
        <ConsultationForm 
          pageTitle="Trọn Bộ Giải Pháp In DTG S.K & Phần Mềm PrintFlow"
          title="Đăng Ký Tư Vấn Trọn Bộ Giải Pháp S.K & Nhận PrintFlow Miễn Phí"
          subtitle="Để lại thông tin về quy mô xưởng và các dòng máy in DTG bạn đang vận hành. Kỹ sư VNPIS sẽ liên hệ tư vấn cấu hình combo hóa chất và demo phần mềm quản trị trực tiếp."
        />
      </section>
    </div>
  );
}
