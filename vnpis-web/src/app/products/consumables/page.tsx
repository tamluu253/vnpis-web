'use client';
export const dynamicParams = true;

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, ArrowRight, Package, Layers, 
  CircleDot, Settings, Droplet, Beaker, 
  ExternalLink, Sparkles, CheckCircle2, PhoneCall
} from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import ConsumablesNav from '@/components/consumables/ConsumablesNav';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';
import InksCatalogSection from '@/components/consumables/InksCatalogSection';
import PadsCatalogSection from '@/components/consumables/PadsCatalogSection';
import AccessoryItemCard from '@/components/consumables/AccessoryItemCard';

type TabType = 'inks' | 'pads' | 'plates' | 'accessories' | 'additives';

const CATEGORY_LINKS = [
  {
    id: 'accessories',
    title: 'Cốc Mực, Vòng Gạt & Tấm Lót Khay',
    desc: 'Cốc mực kín nam châm từ tính, vòng sứ Zirconia, vòng thép Tungsten Carbide, tấm lót khay mực dùng 1 lần.',
    url: '/products/consumables/coc-muc-vong-gat-muc',
    icon: Settings,
    color: 'emerald',
    badge: 'Được tìm kiếm nhiều',
  },
  {
    id: 'inks',
    title: 'Mực In Tampon & In Lụa Công Nghiệp',
    desc: 'Mực cao cấp Dubuit (Pháp), Henkey, Ruco (Đức), Afford bám dính nhựa, kim loại, thủy tinh.',
    url: '/products/consumables/muc-in',
    icon: Droplet,
    color: 'blue',
  },
  {
    id: 'pads',
    title: 'Đầu In Silicone (Pads)',
    desc: 'Hơn 200+ khuôn hình dáng R-Series tròn nón, Q-Series chữ nhật chống đọng bọt khí.',
    url: '/products/consumables/dau-in-silicone',
    icon: CircleDot,
    color: 'indigo',
  },
  {
    id: 'plates',
    title: 'Khuôn In Chế Bản (Cliche / Plates)',
    desc: 'Khuôn thép CNC 10mm tôi cứng, khuôn thép mỏng 0.5mm và vật tư bản in Polymer.',
    url: '/products/consumables/khuon-in',
    icon: Layers,
    color: 'purple',
  },
  {
    id: 'additives',
    title: 'Phụ Gia & Dung Môi Hóa Chất Ngành In',
    desc: 'Dung môi pha loãng Thinner, chất đóng rắn Hardener, Retarder, hóa chất trợ bám Primer PP/PE.',
    url: '/products/consumables/phu-gia-dung-moi',
    icon: Beaker,
    color: 'amber',
  },
];

const ALIAS_MAP: Record<string, string> = {
  'acc-ink-cup': 'coc-muc-kin',
  'acc-ceramic-ring': 'vong-su-gat-muc',
  'acc-tungsten-ring': 'vong-thep-gat-muc',
  'acc-double-material-ring': 'vong-gat-kep',
  'acc-doctor-blade': 'dao-gat-muc',
  'acc-tray-liner': 'tam-lot-khay-muc',
};

const accessoriesWithAlias = accessoriesData.accessories.map((item: any) => ({
  ...item,
  aliasId: ALIAS_MAP[item.id] || item.id,
}));

export default function ConsumablesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('inks');

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header & Navigation */}
      <div className="bg-white text-slate-900 pt-24 pb-12 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-orange-400 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-yellow-400 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/products" className="inline-flex items-center text-slate-500 hover:text-orange-600 mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Về trang Sản phẩm
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-4 bg-orange-100 rounded-2xl border border-orange-200">
                  <Package className="w-12 h-12 text-orange-600" />
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-slate-900">
                  Vật Tư In Công Nghiệp
                </h1>
              </div>
              <p className="text-lg md:text-xl text-slate-600 max-w-3xl leading-relaxed">
                Siêu thị vật tư tổng hợp cho ngành in Tampon (Pad printing) và In lụa (Screen printing). Từ mực in cao cấp đến cốc mực kín, vòng sứ gạt mực, vòng thép, tấm lót khay, cục silicone và các hóa chất chuyên dụng.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 whitespace-nowrap text-lg">
                Nhận Báo Giá Tổng
              </Link>
              <CopyLinkButton 
                itemTitle="Vật Tư In Công Nghiệp VNPIS" 
                className="py-4 px-6 text-sm"
              />
            </div>
          </div>

          {/* Quick Direct Link Directory Cards */}
          <div className="mt-8 mb-6 p-4 md:p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-500" />
                <span className="text-xs md:text-sm font-bold text-slate-700 uppercase tracking-wider">
                  Trang Chuyên Biệt Theo Từng Danh Mục (Sao chép link gửi khách & SEO Google):
                </span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {CATEGORY_LINKS.map(cat => {
                const Icon = cat.icon;
                return (
                  <div 
                    key={cat.id} 
                    className="p-3.5 bg-white rounded-xl border border-slate-200 hover:border-orange-400 hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="p-2 rounded-lg bg-slate-100 text-slate-700 group-hover:bg-orange-50 group-hover:text-orange-600 transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                        <CopyLinkButton 
                          urlPath={cat.url}
                          itemTitle={cat.title}
                          variant="compact"
                        />
                      </div>
                      <Link 
                        href={cat.url}
                        className="font-bold text-slate-900 group-hover:text-orange-600 transition-colors text-sm line-clamp-2 mb-1 block"
                      >
                        {cat.title}
                      </Link>
                      <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                    <Link 
                      href={cat.url}
                      className="mt-3 text-xs font-bold text-orange-600 flex items-center pt-2 border-t border-slate-100 group-hover:translate-x-1 transition-transform"
                    >
                      Mở link trang <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TABS NAVIGATION */}
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mt-8 pb-2">
            <button 
              onClick={() => setActiveTab('inks')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'inks' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Droplet className="w-5 h-5 mr-2" /> Mực In (Inks)
            </button>
            <button 
              onClick={() => setActiveTab('pads')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'pads' ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <CircleDot className="w-5 h-5 mr-2" /> Đầu In Silicone
            </button>
            <button 
              onClick={() => setActiveTab('plates')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'plates' ? 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Layers className="w-5 h-5 mr-2" /> Khuôn In (Plates)
            </button>
            <button 
              onClick={() => setActiveTab('accessories')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'accessories' ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Settings className="w-5 h-5 mr-2" /> Cốc Mực, Vòng Gạt & Tấm Lót Khay
            </button>
            <button 
              onClick={() => setActiveTab('additives')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'additives' ? 'bg-amber-500 text-white border-amber-500 shadow-lg shadow-amber-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Beaker className="w-5 h-5 mr-2" /> Phụ Gia (Additives)
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-8">
        
        {/* ===================== TAB: MỰC IN ===================== */}
        {activeTab === 'inks' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-blue-600 text-white rounded-xl">
                  <Droplet className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm md:text-base">Trang chuyên mục: Mực In Tampon & In Lụa Công Nghiệp</h2>
                  <p className="text-xs text-slate-600">Đầy đủ thông số, chứng nhận an toàn RoHS/REACH và lọc vật liệu chi tiết.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/products/consumables/muc-in"
                  className="inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Mở link chuyên mục <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton 
                  urlPath="/products/consumables/muc-in"
                  itemTitle="Mực In Tampon & In Lụa"
                  variant="compact"
                />
              </div>
            </div>

            <InksCatalogSection />
          </div>
        )}

        {/* ===================== TAB: PADS ===================== */}
        {activeTab === 'pads' && (
          <div className="animate-fade-in space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-indigo-50 border border-indigo-200 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-indigo-600 text-white rounded-xl">
                  <CircleDot className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm md:text-base">Trang chuyên mục: Đầu In Silicone (Silicone Rubber Pads)</h2>
                  <p className="text-xs text-slate-600">Bảng tra quy cách hơn 200+ mẫu đầu in tròn nón, chữ nhật và đúc theo bản vẽ.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/products/consumables/dau-in-silicone"
                  className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Mở link chuyên mục <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton 
                  urlPath="/products/consumables/dau-in-silicone"
                  itemTitle="Đầu In Silicone In Tampon"
                  variant="compact"
                />
              </div>
            </div>

            <PadsCatalogSection />
          </div>
        )}

        {/* ===================== TAB: PLATES ===================== */}
        {activeTab === 'plates' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-purple-600 text-white rounded-xl">
                  <Layers className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm md:text-base">Trang chuyên mục: Khuôn In Chế Bản (Cliche / Plates)</h2>
                  <p className="text-xs text-slate-600">Khuôn thép CNC 10mm tôi cứng, thép mỏng 0.5mm và vật tư Polymer tự phơi UV.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/products/consumables/khuon-in"
                  className="inline-flex items-center justify-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Mở link chuyên mục <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton 
                  urlPath="/products/consumables/khuon-in"
                  itemTitle="Khuôn In Chế Bản Tampon"
                  variant="compact"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessoriesData.plates.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                      <CopyLinkButton 
                        urlPath="/products/consumables/khuon-in"
                        hash={item.id}
                        itemTitle={item.name}
                        variant="compact"
                      />
                    </div>

                    <div className="w-full h-52 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 mb-6 p-4 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">{item.desc}</p>
                    
                    <div className="space-y-2 mb-6">
                      {item.features.map((f: string, i: number) => (
                        <div key={i} className="flex items-start text-xs font-bold text-slate-700 bg-purple-50 text-purple-900 border border-purple-100 p-2 rounded-lg">
                          <CheckCircle2 className="w-4 h-4 text-purple-600 mr-2 shrink-0 mt-0.5"/> {f}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <Link href="/contact" className="inline-flex items-center justify-center w-full py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-xl transition-colors shadow-md text-sm">
                      Báo Giá Khuôn In Này <ArrowRight className="w-4 h-4 ml-2"/>
                    </Link>
                    <CopyLinkButton 
                      urlPath="/products/consumables/khuon-in"
                      hash={item.id}
                      itemTitle={item.name}
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: CỐC MỰC, VÒNG GẠT & TẤM LÓT ===================== */}
        {activeTab === 'accessories' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-emerald-50 border-2 border-emerald-300 rounded-2xl gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-emerald-600 text-white rounded-xl shadow-md">
                  <Settings className="w-6 h-6" />
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-black text-slate-900 text-base md:text-lg">
                      Trang Chuyên Mục Riêng: Cốc Mực In Tampon, Vòng Gạt Mực & Tấm Lót Khay Mực
                    </h2>
                    <span className="px-2 py-0.5 text-[10px] font-black uppercase tracking-wider rounded bg-emerald-600 text-white hidden md:inline-block">
                      Link Chuẩn SEO
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Đầy đủ kích thước Ø33mm - Ø247mm, 6 biên dạng lưỡi gạt AP-1 ~ AP-6 và link chia sẻ trực tiếp từng sản phẩm.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                <Link
                  href="/products/consumables/coc-muc-vong-gat-muc"
                  className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-md"
                >
                  Mở link chuyên mục <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton 
                  urlPath="/products/consumables/coc-muc-vong-gat-muc"
                  itemTitle="Cốc Mực, Vòng Gạt & Tấm Lót"
                  variant="compact"
                />
              </div>
            </div>

            <div className="bg-emerald-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-emerald-300 text-xs font-bold uppercase tracking-wider mb-4">
                  VNPIS Premium Spare Parts & Rings
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center">
                  <Settings className="w-8 h-8 mr-3 text-emerald-400"/> Cốc Mực, Vòng Gạt Mực & Tấm Lót Khay Mực
                </h2>
                <p className="text-emerald-100 text-lg leading-relaxed mb-4">
                  Phụ kiện cốc mực và vòng gạt công nghiệp đạt chuẩn quốc tế: <strong className="text-white">Vòng sứ gạt mực</strong> Zirconia siêu phẳng chống xước bản thép, <strong className="text-white">Vòng thép gạt mực</strong> Tungsten Carbide siêu bền chống mẻ vỡ va đập, <strong className="text-white">Cốc mực kín</strong> nhôm nguyên khối từ tính lực hút mạnh, Cốc khảm sứ chống hao mực quý, Dao gạt Thụy Điển và <strong className="text-white">Tấm lót khay mực</strong> dùng 1 lần.
                </p>
                <div className="flex flex-wrap gap-3 text-xs font-bold">
                  <span className="bg-emerald-800/60 px-3.5 py-1.5 rounded-lg border border-emerald-700/50">✓ Đầy đủ quy cách Ø33mm đến Ø247mm</span>
                  <span className="bg-emerald-800/60 px-3.5 py-1.5 rounded-lg border border-emerald-700/50">✓ 6 kiểu biên dạng lưỡi gạt AP-1 ~ AP-6</span>
                  <span className="bg-emerald-800/60 px-3.5 py-1.5 rounded-lg border border-emerald-700/50">✓ Nhận gia công theo bản vẽ kỹ thuật</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessoriesWithAlias.map((item: any) => (
                <AccessoryItemCard 
                  key={item.id} 
                  item={item} 
                  urlPath="/products/consumables/coc-muc-vong-gat-muc" 
                />
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: ADDITIVES ===================== */}
        {activeTab === 'additives' && (
          <div className="animate-fade-in space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-2xl gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 bg-amber-600 text-white rounded-xl">
                  <Beaker className="w-5 h-5" />
                </span>
                <div>
                  <h2 className="font-bold text-slate-900 text-sm md:text-base">Trang chuyên mục: Phụ Gia & Dung Môi Hóa Chất Ngành In</h2>
                  <p className="text-xs text-slate-600">Thinner pha mực, chất đóng rắn Hardener, Retarder làm chậm khô, Primer trợ bám.</p>
                </div>
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  href="/products/consumables/phu-gia-dung-moi"
                  className="inline-flex items-center justify-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs rounded-xl transition-colors whitespace-nowrap shadow-sm"
                >
                  Mở link chuyên mục <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton 
                  urlPath="/products/consumables/phu-gia-dung-moi"
                  itemTitle="Phụ Gia & Dung Môi Hóa Chất"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {accessoriesData.additives.map((item: any) => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100">
                      <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                      <CopyLinkButton 
                        urlPath="/products/consumables/phu-gia-dung-moi"
                        hash={item.id}
                        itemTitle={item.name}
                        variant="compact"
                      />
                    </div>

                    <div className="w-full h-52 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 mb-6 p-4 flex items-center justify-center">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                    <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.desc}</p>
                    
                    {item.features && (
                      <div className="space-y-1.5 mb-4">
                        {item.features.map((f: string, i: number) => (
                          <div key={i} className="flex items-center text-xs font-semibold text-amber-900 bg-amber-50 px-2.5 py-1.5 rounded-md border border-amber-100">
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1.5 text-amber-600 shrink-0" /> {f}
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-6">
                      <span className="text-xs font-bold text-slate-400 uppercase w-full mb-1">Dung tích / Đóng gói:</span>
                      {item.sizes.map((sz: string, i: number) => (
                        <span key={i} className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
                          {sz}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2 pt-3 border-t border-slate-100">
                    <Link href="/contact" className="inline-flex items-center justify-center w-full py-3 bg-amber-700 hover:bg-amber-800 text-white font-bold rounded-xl transition-colors shadow-md text-sm">
                      Báo Giá Dung Môi / Phụ Gia <ArrowRight className="w-4 h-4 ml-2"/>
                    </Link>
                    <CopyLinkButton 
                      urlPath="/products/consumables/phu-gia-dung-moi"
                      hash={item.id}
                      itemTitle={item.name}
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
