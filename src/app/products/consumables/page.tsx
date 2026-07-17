"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Package, Layers, CircleDot, Settings, Droplet, Beaker } from 'lucide-react';
import inksData from '@/data/inks.json';
import accessoriesData from '@/data/accessories.json';

// Dữ liệu màu sắc cho các chứng nhận
const certColors: Record<string, string> = {
  "RoHS": "bg-blue-100 text-blue-700 border-blue-200",
  "REACH": "bg-sky-100 text-sky-700 border-sky-200",
  "ZDHC Level 3": "bg-green-100 text-green-700 border-green-200",
  "Oeko-Tex": "bg-teal-100 text-teal-700 border-teal-200",
  "GOTS": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "EN71-3": "bg-indigo-100 text-indigo-700 border-indigo-200"
};

type TabType = 'inks' | 'pads' | 'plates' | 'accessories' | 'additives';

export default function ConsumablesPage() {
  const [activeTab, setActiveTab] = useState<TabType>('inks');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('Tất cả');

  // Logic lọc cho Mực in
  const allMaterials = useMemo(() => {
    const materials = new Set<string>();
    inksData.forEach(brand => {
      brand.series.forEach(serie => {
        serie.materials.forEach(m => materials.add(m));
      });
    });
    return ['Tất cả', ...Array.from(materials)];
  }, []);

  const filteredBrands = useMemo(() => {
    if (selectedMaterial === 'Tất cả') return inksData;

    return inksData.map(brand => ({
      ...brand,
      series: brand.series.filter(s => s.materials.includes(selectedMaterial))
    })).filter(brand => brand.series.length > 0);
  }, [selectedMaterial]);


  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header & Navigation */}
      <div className="bg-white text-slate-900 pt-24 pb-12 relative overflow-hidden border-b border-slate-200">
        <div className="absolute inset-0 z-0 opacity-10">
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
                <h1 className="text-5xl md:text-6xl font-black tracking-tight text-slate-900">
                  Vật Tư In Công Nghiệp
                </h1>
              </div>
              <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                Siêu thị vật tư tổng hợp cho ngành in Tampon (Pad printing) và In lụa (Screen printing). Từ mực in cao cấp đến khuôn thép, cục silicone và các hóa chất chuyên dụng.
              </p>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-orange-500/30 whitespace-nowrap text-lg">
              Nhận Báo Giá Tổng
            </Link>
          </div>

          {/* TABS NAVIGATION */}
          <div className="flex overflow-x-auto hide-scrollbar gap-3 mt-10 pb-2">
            <button 
              onClick={() => setActiveTab('inks')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'inks' ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Droplet className="w-5 h-5 mr-2" /> Mực In (Inks)
            </button>
            <button 
              onClick={() => setActiveTab('pads')}
              className={`flex items-center px-6 py-4 rounded-xl font-bold whitespace-nowrap transition-all border ${activeTab === 'pads' ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/30' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'}`}
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
              <Settings className="w-5 h-5 mr-2" /> Phụ Kiện (Accessories)
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
          <div className="animate-fade-in">
            {/* Filter */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 mb-12">
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Lọc Mực In Theo Vật Liệu</h3>
              <div className="flex flex-wrap gap-2">
                {allMaterials.map(mat => (
                  <button
                    key={mat}
                    onClick={() => setSelectedMaterial(mat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      selectedMaterial === mat 
                        ? 'bg-slate-900 text-white' 
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {mat}
                  </button>
                ))}
              </div>
            </div>

            {/* Brands Listing */}
            <div className="space-y-16">
              {filteredBrands.map(brand => (
                <div key={brand.brandId} className="scroll-mt-32">
                  <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-8">
                    <div className="flex items-center gap-4">
                      <img src={brand.logo} alt={brand.country} className="h-6 w-auto rounded-sm shadow-sm" />
                      <h2 className="text-3xl font-black text-slate-800 tracking-tight">{brand.brandName}</h2>
                    </div>
                    <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{brand.country}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                    {brand.series.map(serie => (
                      <div key={serie.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col md:flex-row gap-6">
                        <div className="w-24 h-24 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100">
                          <img src={serie.image} alt={serie.name} className="w-16 h-16 object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <div className="flex-grow flex flex-col">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-xl font-bold text-slate-900">{serie.name}</h3>
                              <p className="text-sm font-medium text-slate-500">{serie.type}</p>
                            </div>
                          </div>
                          
                          <p className="text-slate-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            {serie.desc}
                          </p>
                          
                          <div className="mt-auto space-y-3">
                            <div className="flex flex-wrap gap-1.5">
                              {serie.materials.map((mat, i) => (
                                <span key={i} className="inline-block px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">
                                  {mat}
                                </span>
                              ))}
                            </div>
                            
                            {serie.certs && serie.certs.length > 0 && (
                              <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100">
                                {serie.certs.map((cert, i) => (
                                  <span key={i} className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-bold border ${certColors[cert] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                                    <ShieldAlert className="w-3 h-3 mr-1" /> {cert}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {filteredBrands.length === 0 && (
                <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                    <Droplet className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Không tìm thấy loại mực phù hợp</h3>
                  <p className="text-slate-500">Hãy thử chọn một vật liệu khác hoặc liên hệ với VNPIS để được tư vấn dòng mực riêng biệt.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===================== TAB: PADS ===================== */}
        {activeTab === 'pads' && (
          <div className="animate-fade-in space-y-8">
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8 mb-8 text-blue-900">
              <h2 className="text-2xl font-bold mb-3 flex items-center"><CircleDot className="w-6 h-6 mr-2 text-blue-600"/> Đầu In Silicone (Pad) Cao Cấp</h2>
              <p className="max-w-3xl">Silicone Pads nhập khẩu trực tiếp, đúc từ chất liệu silicone chống tĩnh điện, đàn hồi cao, truyền mực cực chuẩn. Đa dạng hình thù và độ cứng (từ 30 đến 70 shore) đáp ứng in trên mọi bề mặt lồi lõm.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessoriesData.pads.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow group">
                  <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center border border-blue-100 mb-6">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, i) => (
                      <li key={i} className="flex items-start text-sm font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-blue-500 mr-2 shrink-0 mt-0.5"/> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: PLATES ===================== */}
        {activeTab === 'plates' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-purple-50 border border-purple-100 rounded-2xl p-8 mb-8 text-purple-900">
              <h2 className="text-2xl font-bold mb-3 flex items-center"><Layers className="w-6 h-6 mr-2 text-purple-600"/> Khuôn In Chế Bản (Cliche / Plates)</h2>
              <p className="max-w-3xl">Khuôn in đóng vai trò quyết định đến độ sắc nét của hình ảnh. VNPIS cung cấp dịch vụ ăn mòn khuôn thép CNC và bán vật tư khuôn polymer tự phơi.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessoriesData.plates.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow group">
                  <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center border border-purple-100 mb-6">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm">{item.desc}</p>
                  <ul className="space-y-2">
                    {item.features.map((f, i) => (
                      <li key={i} className="flex items-start text-sm font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-purple-500 mr-2 shrink-0 mt-0.5"/> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: ACCESSORIES ===================== */}
        {activeTab === 'accessories' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-8 mb-8 text-emerald-900">
              <h2 className="text-2xl font-bold mb-3 flex items-center"><Settings className="w-6 h-6 mr-2 text-emerald-600"/> Linh Kiện & Phụ Kiện Tiêu Hao</h2>
              <p className="max-w-3xl">Đảm bảo máy in luôn hoạt động mượt mà với các linh kiện thay thế định kỳ chất lượng cao. Giảm thiểu thời gian downtime sản xuất.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessoriesData.accessories.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="w-20 h-20 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100 mb-6">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform opacity-80" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm flex-grow">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase mr-2 w-full">Quy cách phổ biến:</span>
                    {item.sizes.map((sz, i) => (
                      <span key={i} className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg border border-slate-200">
                        {sz}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB: ADDITIVES ===================== */}
        {activeTab === 'additives' && (
          <div className="animate-fade-in space-y-8">
             <div className="bg-amber-50 border border-amber-100 rounded-2xl p-8 mb-8 text-amber-900">
              <h2 className="text-2xl font-bold mb-3 flex items-center"><Beaker className="w-6 h-6 mr-2 text-amber-600"/> Phụ Gia & Hóa Chất (Additives)</h2>
              <p className="max-w-3xl">Các dung dịch phụ trợ thiết yếu trong quá trình in ấn: dung môi pha loãng mực, chất xử lý tăng độ bám bề mặt, chất đóng rắn và dung dịch vệ sinh khuôn in, vệ sinh sản phẩm lỗi.</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {accessoriesData.additives.map(item => (
                <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow group flex flex-col">
                  <div className="w-20 h-20 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100 mb-6">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain group-hover:scale-110 transition-transform opacity-80" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.name}</h3>
                  <p className="text-slate-600 mb-6 text-sm flex-grow">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-400 uppercase mr-2 w-full">Quy cách đóng gói:</span>
                    {item.sizes.map((sz, i) => (
                      <span key={i} className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-sm font-bold rounded-lg border border-slate-200">
                        {sz}
                      </span>
                    ))}
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
