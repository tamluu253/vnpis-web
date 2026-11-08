'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, CheckCircle2, AlertTriangle, ShieldCheck, 
  PhoneCall, MessageSquare, QrCode, ArrowRight, Eye, 
  ExternalLink, X, Copy, Check, Truck, Clock, RefreshCw,
  Wrench, Settings, Move, CircleDot, Maximize, Layers
} from 'lucide-react';
import sparePartsData from '@/data/spare-parts.json';

interface ProductItem {
  id: string;
  sku: string;
  name: string;
  originalName: string;
  category: string;
  image: string;
  badge?: string;
  specs: Record<string, string | undefined>;
  warningNote?: string;
  priceReference: string;
  priceUnit: string;
  inStock: boolean;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  all: Layers,
  'ga-dao-gat-muc': Settings,
  'ban-do-mang-muc': Move,
  'ga-dau-in': CircleDot,
  'cum-kep-ban-in': Maximize,
  'oc-vit-phu-kien': Wrench,
};

const MACHINE_BRANDS = [
  { id: 'all', label: 'Tất cả dòng máy' },
  { id: 'zhongke', label: 'Máy Zhongke (Trung Khoa)' },
  { id: 'hongyi', label: 'Máy Hongyi (Hồng Nghị)' },
  { id: 'kelong', label: 'Máy Kelong (Khoa Long)' },
  { id: 'universal', label: 'Chuẩn Đa Năng' },
];

export default function SparePartsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMachine, setSelectedMachine] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [qrModalItem, setQrModalItem] = useState<ProductItem | null>(null);
  const [consultModalItem, setConsultModalItem] = useState<ProductItem | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Checkout Form State inside QR modal
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  // Filtered products
  const filteredProducts = useMemo(() => {
    return (sparePartsData.products as unknown as ProductItem[]).filter((p) => {
      // Category filter
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }
      
      // Machine brand filter
      if (selectedMachine !== 'all') {
        const specsText = JSON.stringify(p.specs).toLowerCase() + ' ' + (p.warningNote || '').toLowerCase();
        if (selectedMachine === 'zhongke' && !specsText.includes('zhongke') && !specsText.includes('trung khoa')) {
          return false;
        }
        if (selectedMachine === 'hongyi' && !specsText.includes('hongyi') && !specsText.includes('hồng nghị')) {
          return false;
        }
        if (selectedMachine === 'kelong' && !specsText.includes('kelong') && !specsText.includes('khoa long')) {
          return false;
        }
        if (selectedMachine === 'universal' && !specsText.includes('phổ') && !specsText.includes('chung') && !specsText.includes('đa năng') && !specsText.includes('tiêu chuẩn')) {
          return false;
        }
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const searchable = [
          p.name,
          p.sku,
          p.originalName,
          p.priceReference,
          ...Object.values(p.specs),
          p.warningNote || ''
        ].join(' ').toLowerCase();
        return searchable.includes(q);
      }

      return true;
    });
  }, [selectedCategory, selectedMachine, searchQuery]);

  const handleCopy = (text: string, fieldName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const getCleanPrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/\./g, ''), 10) || 0;
  };

  const handleOrderNotify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerPhone.trim()) return;
    setOrderSubmitted(true);
  };

  return (
    <div className="space-y-8">
      {/* Search & Filter Header */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center mb-6">
          <div className="relative w-full lg:w-96">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên, kích thước (M6, M10, 4 inch, 80mm)..."
              className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-rose-500 text-sm"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Machine brand filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-1">
            <span className="text-xs font-bold text-slate-500 whitespace-nowrap flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Dòng máy:
            </span>
            {MACHINE_BRANDS.map((m) => (
              <button
                key={m.id}
                onClick={() => setSelectedMachine(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedMachine === m.id
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 pt-4 border-t border-slate-100">
          {sparePartsData.categories.map((cat) => {
            const Icon = CATEGORY_ICONS[cat.id] || Wrench;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                  isSelected
                    ? 'bg-rose-50 border-rose-500 text-rose-700 shadow-sm font-bold ring-1 ring-rose-500'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <Icon className={`w-5 h-5 mb-1.5 ${isSelected ? 'text-rose-600' : 'text-slate-500'}`} />
                <span className="text-xs font-semibold leading-tight line-clamp-1">{cat.name}</span>
                <span className="text-[10px] text-slate-400 mt-0.5">
                  {cat.id === 'all' 
                    ? `${sparePartsData.products.length} mã` 
                    : `${(sparePartsData.products as unknown as ProductItem[]).filter(p => p.category === cat.id).length} mã`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count & Quick Help Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-gradient-to-r from-rose-50 via-amber-50 to-orange-50 border border-rose-200/80 rounded-2xl p-4 sm:p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-rose-500/20">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-sm sm:text-base">
              Hiển thị {filteredProducts.length} linh kiện & phụ tùng cơ khí sẵn kho
            </h3>
            <p className="text-xs text-slate-600 mt-0.5">
              Đầy đủ thông số dung sai kỹ thuật, ảnh thực tế và kiểm tra độ tương thích với máy của quý khách trước khi xuất kho.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href="https://zalo.me/0987453866"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5" /> Chat Zalo Kỹ Thuật (0987 453 866)
          </a>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <Wrench className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h4 className="font-bold text-slate-800 text-base">Không tìm thấy linh kiện phù hợp</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
            Quý khách vui lòng thử tìm với từ khóa khác (ví dụ: &quot;4 inch&quot;, &quot;M6&quot;, &quot;Zhongke&quot;) hoặc liên hệ Hotline để bộ phận kỹ thuật tiện/đúc theo yêu cầu.
          </p>
          <button
            onClick={() => { setSelectedCategory('all'); setSelectedMachine('all'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-lg hover:bg-rose-700"
          >
            Xóa bộ lọc tìm kiếm
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              id={product.id}
              className="bg-white rounded-2xl border border-slate-200 hover:border-rose-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div>
                {/* Header: SKU & Badges */}
                <div className="p-4 pb-0 flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                    {product.sku}
                  </span>
                  {product.badge && (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Product Image */}
                <div className="p-4 relative">
                  <div className="w-full h-52 bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative flex items-center justify-center p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={() => setLightboxImage({ src: product.image, title: product.name })}
                      className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity text-xs flex items-center gap-1 backdrop-blur-sm"
                      title="Phóng to ảnh chi tiết"
                    >
                      <Eye className="w-3.5 h-3.5" /> Xem ảnh lớn
                    </button>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-400 font-mono text-center">
                    Gốc: {product.originalName}
                  </div>
                </div>

                {/* Title & Specs */}
                <div className="px-5 pb-3">
                  <h4 className="font-bold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors">
                    {product.name}
                  </h4>

                  <div className="mt-3 space-y-1.5 bg-slate-50/80 rounded-xl p-3 border border-slate-100 text-xs">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="text-slate-700 leading-relaxed font-medium">{val}</span>
                      </div>
                    ))}
                  </div>

                  {product.warningNote && (
                    <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50/80 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span className="leading-tight">{product.warningNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Price & Action CTA */}
              <div className="p-5 pt-3 border-t border-slate-100 bg-gradient-to-b from-transparent to-slate-50/50">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    <span className="text-[11px] text-slate-500 block font-medium">Giá tham khảo:</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-extrabold text-rose-600 font-mono">
                        {product.priceReference}
                      </span>
                      <span className="text-xs font-bold text-slate-600">
                        đ / {product.priceUnit}
                      </span>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Sẵn kho
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setConsultModalItem(product)}
                    className="w-full py-2.5 px-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm"
                  >
                    <Wrench className="w-3.5 h-3.5 text-amber-400" />
                    <span>Kiểm tra máy</span>
                  </button>

                  <button
                    onClick={() => {
                      setQrModalItem(product);
                      setOrderSubmitted(false);
                    }}
                    className="w-full py-2.5 px-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-1 shadow-sm shadow-rose-500/20"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span>Mua &amp; VietQR</span>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* VIETQR PAYMENT MODAL */}
      {qrModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setQrModalItem(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2.5 text-rose-600 mb-1">
              <QrCode className="w-6 h-6" />
              <span className="text-xs font-extrabold uppercase tracking-wider">Thanh Toán VietQR Tự Động</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              {qrModalItem.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Mã linh kiện: <span className="font-mono font-bold text-slate-800">{qrModalItem.sku}</span>
            </p>

            {/* QR Code Container */}
            <div className="mt-4 p-4 rounded-2xl bg-gradient-to-b from-rose-50 to-orange-50 border border-rose-200/80 flex flex-col items-center text-center">
              <div className="w-56 h-56 bg-white p-2.5 rounded-xl shadow-md border border-slate-200 relative">
                <img
                  src={`https://img.vietqr.io/image/VCB-7987453866-compact2.png?amount=${getCleanPrice(qrModalItem.priceReference)}&addInfo=${encodeURIComponent(`VNPIS ${qrModalItem.sku}`)}`}
                  alt="Mã VietQR thanh toán VNPIS"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Quét mã bằng app của bất kỳ ngân hàng nào (Napas 247)</span>
              </div>
            </div>

            {/* Bank Transfer Details with Copy Buttons */}
            <div className="mt-4 space-y-2 text-xs bg-slate-50 p-3.5 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Ngân hàng:</span>
                <span className="font-bold text-slate-800">Vietcombank (VCB)</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Số tài khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-extrabold text-rose-600 text-sm">7987453866</span>
                  <button
                    onClick={() => handleCopy('7987453866', 'stk')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Sao chép số tài khoản"
                  >
                    {copiedField === 'stk' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Tài khoản thụ hưởng:</span>
                <span className="font-bold text-slate-800">7987453866 (Vietcombank)</span>
              </div>

              <div className="flex justify-between items-center py-1 border-b border-slate-200/60">
                <span className="text-slate-500 font-medium">Số tiền thanh toán:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-extrabold text-emerald-700 text-sm">
                    {qrModalItem.priceReference} đ
                  </span>
                  <button
                    onClick={() => handleCopy(getCleanPrice(qrModalItem.priceReference).toString(), 'amount')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Sao chép số tiền"
                  >
                    {copiedField === 'amount' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-between items-center py-1">
                <span className="text-slate-500 font-medium">Nội dung chuyển khoản:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-slate-200">
                    VNPIS {qrModalItem.sku}
                  </span>
                  <button
                    onClick={() => handleCopy(`VNPIS ${qrModalItem.sku}`, 'memo')}
                    className="p-1 text-slate-400 hover:text-slate-700"
                    title="Sao chép nội dung"
                  >
                    {copiedField === 'memo' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Delivery Confirmation Form */}
            <div className="mt-4 pt-3 border-t border-slate-100">
              {orderSubmitted ? (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-center">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 mx-auto mb-1" />
                  <h5 className="font-bold text-emerald-800 text-xs">Đã ghi nhận thông tin giao hàng!</h5>
                  <p className="text-[11px] text-emerald-700 mt-0.5">
                    Hệ thống sẽ gửi email xác nhận. Kỹ thuật viên VNPIS sẽ gọi điện xác nhận chuẩn máy và chuyển hàng hỏa tốc trong 2H (TP.HCM).
                  </p>
                </div>
              ) : (
                <form onSubmit={handleOrderNotify} className="space-y-2.5">
                  <span className="text-[11px] font-bold text-slate-700 block">
                    Nhập thông tin nhận hàng (Sau khi quét QR):
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="tel"
                      required
                      placeholder="Số điện thoại (*)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500"
                    />
                    <input
                      type="email"
                      placeholder="Email nhận thông báo"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Địa chỉ giao hàng (hoặc tên công ty xuất VAT)"
                    value={customerAddress}
                    onChange={(e) => setCustomerAddress(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-rose-500"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors shadow-md shadow-emerald-600/20 flex items-center justify-center gap-1.5"
                  >
                    <Truck className="w-4 h-4" /> Xác nhận đã chuyển khoản &amp; Nhận hàng
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* COMPATIBILITY CHECK & CONSULTATION MODAL */}
      {consultModalItem && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 relative my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setConsultModalItem(null)}
              className="absolute right-4 top-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <Wrench className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Hỗ Trợ Kỹ Thuật Đời Máy</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 leading-tight">
              Kiểm tra độ tương thích: {consultModalItem.name}
            </h3>

            <div className="mt-4 p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <p className="font-bold flex items-center gap-1.5 text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Tại sao cần kiểm tra trước khi mua?
              </p>
              <p className="leading-relaxed">
                Máy in pad trên thị trường có nhiều đời sản xuất (Zhongke, Hongyi, Kelong...). Để tránh mua nhầm kích thước tâm lỗ hoặc ren ốc làm gián đoạn sản xuất, kỹ thuật VNPIS sẽ đo đối chiếu trực tiếp giúp bạn.
              </p>
            </div>

            <div className="mt-5 space-y-3">
              <a
                href={`https://zalo.me/0987453866?text=${encodeURIComponent(`Xin chào VNPIS, tôi cần kiểm tra độ tương thích của phụ tùng [${consultModalItem.name} - ${consultModalItem.sku}] với máy in của bên tôi.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Gửi ảnh phụ tùng cũ qua Zalo Kỹ Thuật (0987 453 866)
              </a>

              <a
                href="tel:0987453866"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-amber-400" />
                Gọi trực tiếp kỹ sư phụ tùng: 0987 453 866
              </a>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 text-center">
              <p className="text-[11px] text-slate-400">
                Hỗ trợ gia công phay CNC, tiện lỗ ren theo mẫu phôi thực tế của nhà máy nếu máy của quý khách thuộc dòng phi tiêu chuẩn.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden p-3 shadow-2xl">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute right-3 top-3 p-1.5 rounded-full bg-black/70 hover:bg-black text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="w-full h-96 sm:h-[450px] bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center p-4">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-center text-xs font-bold text-slate-700 mt-2">
              {lightboxImage.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
