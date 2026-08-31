"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Check, 
  Copy, 
  BookOpen, 
  Download, 
  Loader2, 
  Star, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  HelpCircle,
  FileText,
  Users
} from 'lucide-react';

export default function SoTayInPadLanding() {
  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  
  // UI Flow states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [orderData, setOrderData] = useState<any>(null); // holds orderId, qrUrl, etc.
  const [paymentStatus, setPaymentStatus] = useState<'PENDING' | 'COMPLETED' | 'CANCELLED'>('PENDING');
  const [downloadToken, setDownloadToken] = useState('');
  
  // Clipboard copy feedback states
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [copiedRemark, setCopiedRemark] = useState(false);

  // Form reference for scrolling
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 1. Submit form to create order
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/ebook/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, company }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Đã có lỗi xảy ra khi tạo đơn hàng.');
      }
      
      setOrderData(data);
      setPaymentStatus('PENDING');
      
      // Scroll to checkout info
      setTimeout(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err: any) {
      setErrorMessage(err.message || 'Lỗi kết nối máy chủ. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 2. Poll order status every 4 seconds once order is created
  useEffect(() => {
    if (!orderData || paymentStatus === 'COMPLETED') return;
    
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/ebook/status?orderId=${orderData.orderId}`);
        if (response.ok) {
          const data = await response.json();
          if (data.status === 'COMPLETED') {
            setPaymentStatus('COMPLETED');
            if (data.token) {
              setDownloadToken(data.token);
            }
            clearInterval(interval);
          }
        }
      } catch (err) {
        console.error('Error polling payment status:', err);
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [orderData, paymentStatus]);

  // Copy to clipboard helpers
  const copyToClipboard = (text: string, type: 'account' | 'remark') => {
    navigator.clipboard.writeText(text);
    if (type === 'account') {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    } else {
      setCopiedRemark(true);
      setTimeout(() => setCopiedRemark(false), 2000);
    }
  };

  // Dummy error-safe check to handle images or fallback
  const fallbackImgUrl = (stt: string) => {
    return `/images/ebook/images_50/defect_${stt}.jpg`;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      
      {/* GLOW BACKGROUND EFFECT */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
      
      {/* 1. HERO SECTION */}
      <section className="relative py-20 lg:py-28 px-4 md:px-8 max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 flex flex-col space-y-6">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/25 px-4 py-1.5 rounded-full w-fit">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-300">Tài Liệu Độc Quyền VNPIS</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-none text-white">
            Sổ Tay Vận Hành: <br/>
            <span className="bg-gradient-to-r from-blue-400 via-orange-400 to-orange-500 bg-clip-text text-transparent">
              50 Sự Cố In Pad
            </span> <br className="hidden md:inline" />
            Thực Chiến & Quy Trình SOP
          </h1>
          
          <p className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Bản đồ SOP chẩn đoán nguyên nhân gốc rễ, tối ưu hóa thông số mực, pad silicone, bản cliché và xử lý nhanh chóng mọi sự cố in ấn Tampography trực tiếp tại xưởng in trong 3 phút.
          </p>

          {/* Key Quick Stats */}
          <div className="grid grid-cols-3 gap-4 border-y border-slate-800 py-6 max-w-xl">
            <div>
              <div className="text-2xl font-extrabold text-blue-400">54 Trang</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">A4 Sắc Nét</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-orange-400">100+ Ảnh</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Minh Họa Thực Tế</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold text-green-400">4 Bước</div>
              <div className="text-xs text-slate-500 uppercase tracking-wider">Xử Lý Mỗi Lỗi</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={scrollToForm}
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/20 hover:-translate-y-0.5 cursor-pointer"
            >
              Đăng Ký Sở Hữu Chỉ Với 50k
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
            <a 
              href="#loi-ich"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 border border-slate-800 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
            >
              Đọc Preview Tài Liệu
            </a>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-500 pt-2">
            <div className="flex text-yellow-500">★★★★★</div>
            <span>Được đánh giá cao bởi 100+ kỹ sư & chủ xưởng in B2B Việt Nam</span>
          </div>
        </div>

        {/* EBOOK 3D MOCKUP COLUMN */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="relative group perspective-1000">
            {/* Ambient book glow */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-orange-500 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500" />
            
            {/* 3D Styled Book Cover */}
            <div className="relative w-72 h-[400px] md:w-80 md:h-[440px] bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-blue-500/30 rounded-r-2xl rounded-l-md shadow-2xl transform rotate-y-[-10deg] group-hover:rotate-y-[-5deg] transition-all duration-500 flex flex-col justify-between p-8 overflow-hidden select-none">
              
              {/* Cover Spine Shadow simulation */}
              <div className="absolute top-0 left-0 bottom-0 w-4 bg-gradient-to-r from-black/60 to-transparent" />
              <div className="absolute top-0 left-4 bottom-0 w-[1px] bg-white/10" />

              <div className="flex justify-between items-start z-10">
                <span className="text-[10px] font-black tracking-widest text-orange-500 uppercase">VNPIS PUBLICATION</span>
                <span className="text-[9px] font-bold text-blue-400 border border-blue-400/30 px-1.5 py-0.5 rounded">2026 EDITION</span>
              </div>

              <div className="space-y-4 z-10 my-auto">
                <div className="h-1 w-12 bg-orange-500" />
                <h2 className="text-3xl font-black tracking-tight leading-tight text-white">
                  50 SỰ CỐ <br/>
                  <span className="text-blue-400">IN PAD</span> <br/>
                  THỰC CHIẾN
                </h2>
                <p className="text-[11px] text-slate-400 leading-relaxed border-l border-slate-700 pl-3">
                  Bản đồ SOP chẩn đoán nguyên nhân gốc rễ và quy trình xử lý cấp tốc trực tiếp tại máy in tampon công nghiệp.
                </p>
              </div>

              <div className="border-t border-slate-800 pt-4 flex justify-between items-center z-10 text-[10px] text-slate-500 font-medium">
                <span>CÔNG NGHỆ TAMPOGRAPHY</span>
                <span>VNPIS.COM</span>
              </div>
              
              {/* Corner gloss shine */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 transform rotate-45 translate-x-12 -translate-y-12 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. PAIN POINTS SECTION */}
      <section className="py-20 bg-slate-900/60 border-y border-slate-900">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Có Phải Xưởng In Pad Của Bạn Đang Gặp Phải?
            </h2>
            <p className="text-slate-400 text-base">
              Vận hành in Tampography công nghiệp chứa đựng rất nhiều biến số hóa lý dễ gây lỗi hàng loạt.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Pain 1 */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-red-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">1. Hàng nghìn phế phẩm lỗi</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Sản phẩm in xong bị bong tróc màng mực khi giật test băng keo, nhòe nét, lem mực, gai nét in mà không tìm ra nguyên nhân gốc rễ do đâu.
                </p>
              </div>
              <div className="text-red-500/60 text-xs font-semibold mt-6 tracking-wide uppercase">Tổn thất uy tín & đền hàng</div>
            </div>

            {/* Pain 2 */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-red-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">2. Thợ đứng máy mò mẫm</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Thợ in thiếu kinh nghiệm mất cả buổi thử sai, pha mực, châm dung môi (thinner) và đóng rắn (hardener) bằng mắt cảm tính, gây lãng phí hóa chất.
                </p>
              </div>
              <div className="text-red-500/60 text-xs font-semibold mt-6 tracking-wide uppercase">Thời gian chết kéo dài</div>
            </div>

            {/* Pain 3 */}
            <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-8 hover:border-red-500/40 transition-colors flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">3. Hỏng thiết bị đắt tiền</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Cốc mực kín (ink cup) bị mẻ vòng sứ gạt mực gây rò rỉ mực, đầu pad silicone đắt tiền bị rách xước, cliché thép bị cào xước làm hỏng cả tiến độ.
                </p>
              </div>
              <div className="text-red-500/60 text-xs font-semibold mt-6 tracking-wide uppercase">Chi phí sửa chữa đắt đỏ</div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. BENEFITS / WHAT'S INSIDE */}
      <section id="loi-ich" className="py-20 max-w-7xl mx-auto px-4 md:px-8 grid lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col space-y-6">
          <h2 className="text-3xl font-extrabold text-white">
            Sổ Tay Này Giải Quyết Gì Cho Bạn?
          </h2>
          <p className="text-slate-400 leading-relaxed">
            Chúng tôi đúc kết gần 20 năm kinh nghiệm thực chiến chuyển giao công nghệ in pad cho các nhà máy FDI lớn vào một cẩm nang thao tác cực kỳ ngắn gọn và dễ hiểu.
          </p>

          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mr-3">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-slate-100">50 Sự Cố Công Nghiệp Thực Tế:</strong> Covers đầy đủ từ độ bám dính mực, nét chữ gai nhòe, tĩnh điện bắn tơ, rỗ bọt khí đến các trục trặc cơ khí máy.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mr-3">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-slate-100">100 Hình Ảnh Minh Họa Việt Hóa:</strong> Gồm 1 ảnh chụp lỗi hiện tượng tại máy và 1 ảnh chụp thao tác khắc phục chuẩn mực, nhìn là làm được ngay.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mr-3">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-slate-100">Bảng Quy Trình SOP 4 Bước Cấp Tốc:</strong> Từng bước 1, 2, 3, 4 hướng dẫn thợ đứng máy xử lý trực tiếp tại máy in trong 3 phút, loại bỏ hoàn toàn phán đoán sai lầm.
              </div>
            </li>
            <li className="flex items-start">
              <div className="mt-1 w-5 h-5 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center flex-shrink-0 mr-3">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div>
                <strong className="text-slate-100">Cảnh Báo Rủi Ro QA Note:</strong> Những lưu ý kỹ thuật sống còn ngăn thợ in làm hỏng phôi hàng loạt hoặc phá hỏng linh kiện máy móc đắt tiền.
              </div>
            </li>
          </ul>
        </div>

        {/* DEMO CARD PREVIEW */}
        <div className="lg:col-span-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] font-bold uppercase px-3 py-1 rounded-bl-xl tracking-wider z-10">
            Preview Một Sự Cố Trong Sách
          </div>
          
          <div className="space-y-2">
            <span className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Sự Cố #01</span>
            <h3 className="text-xl font-extrabold text-white">Mực tróc hoàn toàn sau khi test băng keo (Tape test failure)</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs font-bold text-red-400 mb-1.5 uppercase tracking-wide">⚠️ Nguyên nhân gốc rễ</div>
              <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                - Sức căng bề mặt phôi nhựa &lt; 38 dynes, dính dầu ép khuôn.
                - Pha thiếu chất đóng rắn Hardener hoặc sai tỷ lệ hệ mực.
                - Khô bề mặt nhưng chưa curing sâu bên trong.
              </p>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80">
              <div className="text-xs font-bold text-green-400 mb-1.5 uppercase tracking-wide">✅ Quy trình SOP xử lý</div>
              <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                B1: Lau sạch phôi bằng cồn IPA 99%.
                B2: Khò lửa xanh lướt 1s đạt độ bám &gt;= 40 dynes.
                B3: Cân tiểu ly pha chính xác Hardener tỷ lệ 10:1.
                B4: Đợi mực curing hoàn toàn trước khi test băng keo 3M 600.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-950/40 border border-blue-900/50 p-4 rounded-xl text-xs leading-relaxed text-blue-300">
            <strong>💡 QA Note:</strong> Mực 2 thành phần cần 24 - 48h để đạt liên kết chéo cực đại. Kiểm tra ngay lập tức sau in chỉ phản ánh tính tương đối.
          </div>
        </div>
      </section>

      {/* 4. DIGITAL ORDER FORM & STATUS SECTION */}
      <section ref={formRef} className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 border-t border-slate-900 scroll-mt-20">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* FLOW 1: INITIAL REGISTRATION FORM */}
          {!orderData && (
            <div className="bg-slate-950 border-2 border-blue-500/20 rounded-3xl p-8 md:p-12 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white font-bold text-xs uppercase px-6 py-1.5 rounded-full tracking-wider shadow-lg">
                Đăng Ký Đọc Ngay PDF
              </div>
              
              <div className="text-center max-w-2xl mx-auto mb-10 mt-2">
                <h2 className="text-3xl font-black text-white mb-3">Tải Sổ Tay Xử Lý Sự Cố In Pad</h2>
                <p className="text-slate-400 text-sm">
                  Đăng ký thông tin để nhận tài liệu PDF sắc nét và tham gia nhóm hỗ trợ kỹ thuật trực tiếp từ VNPIS.
                </p>
                
                {/* Price Display */}
                <div className="mt-6 inline-flex items-center justify-center space-x-4 bg-slate-900 px-6 py-2.5 rounded-2xl border border-slate-800">
                  <span className="text-slate-500 line-through text-base font-medium">499.000đ</span>
                  <span className="text-orange-500 text-3xl font-black">50.000đ</span>
                  <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2 py-0.5 rounded border border-orange-500/20 uppercase tracking-wide">Tiết kiệm 90%</span>
                </div>
              </div>

              {errorMessage && (
                <div className="bg-red-500/10 border border-red-500/35 p-4 rounded-xl text-red-400 text-sm mb-6 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="grid md:grid-cols-2 gap-6" id="orderForm">
                <div className="space-y-2">
                  <label htmlFor="fullname" className="text-sm font-semibold text-slate-300 flex items-center">
                    Họ và tên của bạn <span className="text-orange-500 ml-1">*</span>
                  </label>
                  <input 
                    type="text" 
                    id="fullname" 
                    placeholder="Ví dụ: Nguyễn Văn A" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-semibold text-slate-300">
                    Số điện thoại / Zalo <span className="text-orange-500 ml-1">*</span>
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="Ví dụ: 0987654321" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-slate-300">
                    Địa chỉ Email nhận File PDF <span className="text-orange-500 ml-1">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="Ví dụ: name@gmail.com" 
                    required 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-semibold text-slate-300">
                    Tên xưởng in / Công ty
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    placeholder="Ví dụ: Xưởng in VNPIS Bình Chánh" 
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>

                <div className="md:col-span-2 pt-4">
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl text-white font-bold text-lg hover:from-orange-600 hover:to-orange-700 transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                        Đang tạo đơn hàng...
                      </>
                    ) : (
                      <>
                        Đặt Mua & Nhận Link Tải PDF Tức Thì
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* FLOW 2: PENDING PAYMENT QR CODE STATE */}
          {orderData && paymentStatus === 'PENDING' && (
            <div className="bg-slate-950 border-2 border-orange-500/20 rounded-3xl p-8 md:p-12 shadow-2xl transition-all duration-500">
              
              <div className="text-center max-w-2xl mx-auto mb-8">
                <span className="inline-block py-1 px-3 rounded bg-orange-500/10 border border-orange-500/25 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
                  Đơn Hàng Chờ Thanh Toán
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white">Quét Mã Chuyển Khoản Nhận Ebook</h2>
                <p className="text-slate-400 text-xs md:text-sm mt-1">
                  Đơn hàng <strong className="text-orange-400">{orderData.orderId}</strong> đã được tạo. Vui lòng chuyển khoản đúng số tiền và cú pháp dưới đây.
                </p>
              </div>

              <div className="grid md:grid-cols-12 gap-8 items-center">
                
                {/* QR CODE DISPLAY */}
                <div className="md:col-span-5 flex flex-col items-center">
                  <div className="relative p-4 bg-white rounded-2xl overflow-hidden shadow-2xl w-52 h-52 md:w-56 md:h-56">
                    {/* QR Code image */}
                    <img 
                      src={orderData.qrUrl} 
                      alt="VietQR code for MB Bank transfer" 
                      className="w-full h-full object-contain"
                    />
                    
                    {/* Scanner laser effect */}
                    <div className="absolute left-0 right-0 h-1 bg-green-500/70 shadow-lg shadow-green-500 animate-scanner-laser top-0" />
                  </div>
                  <span className="text-[10px] text-slate-500 mt-3 font-semibold uppercase tracking-wider flex items-center">
                    <Sparkles className="w-3 h-3 mr-1 text-green-400" /> Quét bằng ví MoMo hoặc App Ngân Hàng
                  </span>
                </div>

                {/* DETAILED INSTRUCTIONS */}
                <div className="md:col-span-7 space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3.5">
                    
                    {/* Bank info */}
                    <div className="flex justify-between border-b border-slate-800/80 pb-2.5 text-sm">
                      <span className="text-slate-500">Ngân hàng:</span>
                      <strong className="text-slate-200">Vietcombank</strong>
                    </div>

                    {/* Account Name */}
                    <div className="flex justify-between border-b border-slate-800/80 pb-2.5 text-sm">
                      <span className="text-slate-500">Chủ tài khoản:</span>
                      <strong className="text-slate-200">Lưu Trọng Tâm</strong>
                    </div>

                    {/* Account Number */}
                    <div className="flex justify-between border-b border-slate-800/80 pb-2.5 text-sm items-center">
                      <span className="text-slate-500">Số tài khoản:</span>
                      <div className="flex items-center space-x-2">
                        <strong className="text-slate-200 font-mono text-base">0371000428484</strong>
                        <button 
                          onClick={() => copyToClipboard('0371000428484', 'account')}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                          title="Copy số tài khoản"
                        >
                          {copiedAccount ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between border-b border-slate-800/80 pb-2.5 text-sm">
                      <span className="text-slate-500">Số tiền:</span>
                      <strong className="text-orange-500 text-lg font-black">50.000đ</strong>
                    </div>

                    {/* Remark / Description */}
                    <div className="flex justify-between items-center text-sm pt-0.5">
                      <span className="text-slate-500">Nội dung CK:</span>
                      <div className="flex items-center space-x-2">
                        <strong className="text-orange-400 font-mono text-base bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/25">EBOOK {orderData.orderId}</strong>
                        <button 
                          onClick={() => copyToClipboard(`EBOOK ${orderData.orderId}`, 'remark')}
                          className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-white transition-colors"
                          title="Copy nội dung chuyển khoản"
                        >
                          {copiedRemark ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Polling live feedback block */}
                  <div className="bg-blue-950/40 border border-blue-900/40 rounded-xl p-4 flex items-center space-x-4">
                    <Loader2 className="w-6 h-6 text-blue-400 animate-spin flex-shrink-0" />
                    <div className="text-xs leading-relaxed text-blue-300">
                      <strong>Hệ thống đang tự động xác thực:</strong> Sau khi bạn hoàn tất chuyển khoản thành công, trang này sẽ tự chuyển hướng và mở nút tải Ebook trực tiếp trong vòng 30 giây.
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[11px] text-slate-500">
                    <span>* Vui lòng điền đúng nội dung để hệ thống nhận dạng tự động.</span>
                    <button 
                      onClick={() => setOrderData(null)}
                      className="text-slate-400 hover:text-slate-300 underline font-medium"
                    >
                      Quay lại nhập thông tin khác
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* FLOW 3: COMPLETED SUCCESS DELIVERY STATE */}
          {paymentStatus === 'COMPLETED' && orderData && (
            <div className="bg-slate-950 border-2 border-green-500/20 rounded-3xl p-8 md:p-12 shadow-2xl text-center space-y-6 animate-scaleUp">
              
              <div className="w-20 h-20 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border-2 border-green-500/30 shadow-lg shadow-green-500/10">
                <ShieldCheck className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-green-400 bg-green-500/10 px-3 py-1 rounded border border-green-500/25">
                  Thanh Toán Thành Công
                </span>
                <h2 className="text-3xl font-black text-white pt-2">Cảm Ơn Bạn Đã Ủng Hộ VNPIS!</h2>
                <p className="text-slate-400 text-sm max-w-lg mx-auto">
                  Chào <strong>{orderData.order?.name}</strong>, giao dịch của bạn đã được xác thực tự động thành công. Hệ thống đã gửi một email bàn giao chứa tài liệu gốc đến hòm thư <strong className="text-slate-200">{orderData.order?.email}</strong>.
                </p>
              </div>

              <div className="divider h-px bg-slate-800 max-w-md mx-auto my-6" />

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
                {downloadToken ? (
                  <a 
                    href={`/api/ebook/download?token=${downloadToken}`}
                    className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-green-600 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-600/20 hover:-translate-y-0.5 cursor-pointer"
                  >
                    <Download className="mr-2 w-5 h-5" />
                    Tải Ebook PDF Ngay
                  </a>
                ) : (
                  <span className="text-xs text-slate-500">Vui lòng kiểm tra email để nhận link tải.</span>
                )}
                
                <a 
                  href="https://zalo.me/g/vnpis-support"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-8 py-4 text-base font-bold text-slate-300 border border-slate-800 rounded-xl hover:bg-slate-900 hover:text-white transition-all"
                >
                  <Users className="mr-2 w-5 h-5 text-blue-400" />
                  Tham Gia Nhóm Zalo
                </a>
              </div>

              <p className="text-xs text-slate-500">
                Nếu gặp bất kỳ khó khăn kỹ thuật nào khi tải sách, vui lòng liên hệ hotline/Zalo Mr. Tâm: <strong>0987 453 866</strong> để được bàn giao trực tiếp.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* 5. FAQs OR TRUST BADGES */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-black text-center mb-12 text-white">Câu Hỏi Thường Gặp (FAQs)</h2>
        <div className="grid md:grid-cols-2 gap-8 text-sm">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl">
            <h4 className="font-bold text-slate-200 flex items-center mb-2">
              <HelpCircle className="w-4.5 h-4.5 mr-2 text-blue-400" />
              Tôi có nhận được sách bản cứng in giấy không?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-6">
              Không, đây là tài liệu số hóa Ebook định dạng PDF chất lượng cao. Việc này giúp bạn dễ dàng lưu trữ trên điện thoại và tra cứu nhanh sơ đồ SOP ngay tại dây chuyền in của xưởng mà không sợ bám dầu mực hay rách giấy.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl">
            <h4 className="font-bold text-slate-200 flex items-center mb-2">
              <HelpCircle className="w-4.5 h-4.5 mr-2 text-blue-400" />
              Tại sao tôi chuyển khoản rồi nhưng chưa thấy email?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-6">
              Hệ thống xử lý tự động thường phản hồi sau 1-2 phút (do độ trễ nhận diện của app ngân hàng). Vui lòng kiểm tra kỹ cả thư mục <strong>Spam (Thư rác)</strong> hoặc <strong>Promotions (Quảng cáo)</strong>. Nếu vẫn chưa thấy, hãy chat Zalo ngay với hotline 0987 453 866 để kỹ sư hỗ trợ chuyển file thủ công.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl">
            <h4 className="font-bold text-slate-200 flex items-center mb-2">
              <HelpCircle className="w-4.5 h-4.5 mr-2 text-blue-400" />
              Tài liệu có hướng dẫn về pha chế mực và dung môi không?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-6">
              Có, cẩm nang hướng dẫn cực kỳ kỹ lưỡng tỷ lệ cân đo chất đóng rắn (Hardener) bằng cân tiểu ly, tỷ lệ pha loãng dung môi theo nhiệt độ phòng in thực tế, cũng như cách xử lý mực khô quá nhanh hoặc quá chậm.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl">
            <h4 className="font-bold text-slate-200 flex items-center mb-2">
              <HelpCircle className="w-4.5 h-4.5 mr-2 text-blue-400" />
              Tôi có được hỏi thêm các sự cố không có trong sách?
            </h4>
            <p className="text-slate-400 leading-relaxed pl-6">
              Hoàn toàn được! Đi kèm sách là đặc cách tham gia nhóm Zalo Kỹ thuật in pad của VNPIS. Anh/chị có thể chụp ảnh/quay video sự cố của xưởng gửi vào nhóm để nhận tư vấn trực tiếp từ các kỹ sư trưởng của chúng tôi hoàn toàn miễn phí.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
