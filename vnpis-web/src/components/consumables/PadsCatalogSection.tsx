'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, CircleDot, PhoneCall } from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import CopyLinkButton from './CopyLinkButton';

export default function PadsCatalogSection() {
  const [expandedPads, setExpandedPads] = useState<Record<string, boolean>>({});

  const togglePadExpand = (id: string) => {
    setExpandedPads(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8">
      {/* Intro Hero Card */}
      <div className="bg-indigo-900 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/20 border border-indigo-400/30 rounded-full text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
            VNPIS Silicone Pad Technology
          </div>
          <h2 className="text-3xl md:text-4xl font-black mb-4 flex items-center">
            <CircleDot className="w-8 h-8 mr-3 text-indigo-400"/> Đầu In Silicone Cao Cấp (Pad Printing Pads)
          </h2>
          <p className="text-indigo-100 text-lg leading-relaxed mb-4">
            Đầu in silicone đóng vai trò lấy mực từ bản in và chuyển tải chính xác 100% hình ảnh lên bề mặt sản phẩm. VNPIS sản xuất và phân phối hơn 200+ khuôn hình dáng (tròn nón, chữ nhật mái nghiêng, elip, thanh dài...) với đầy đủ độ cứng từ 0 Shore A đến 18 Shore A, chống tĩnh điện và nhả mực sạch bóng.
          </p>
          <div className="flex flex-wrap gap-3 text-xs font-bold">
            <span className="bg-indigo-800/60 px-3.5 py-1.5 rounded-lg border border-indigo-700/50">✓ Chống đọng bọt khí tuyệt đối</span>
            <span className="bg-indigo-800/60 px-3.5 py-1.5 rounded-lg border border-indigo-700/50">✓ Độ đàn hồi cao, bật nảy mực siêu tốc</span>
            <span className="bg-indigo-800/60 px-3.5 py-1.5 rounded-lg border border-indigo-700/50">✓ Nhận đúc silicone theo bản vẽ mẫu của khách</span>
          </div>
        </div>
      </div>

      {/* Grid of Pad Shapes */}
      <div className="grid md:grid-cols-2 gap-8">
        {accessoriesData.pads.map((item: any) => {
          const isExpanded = !!expandedPads[item.id];
          return (
            <article 
              key={item.id} 
              id={item.id}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between scroll-mt-28 target:ring-2 target:ring-indigo-500 target:bg-indigo-50/20"
            >
              <div>
                {/* Header: Anchor + Copy button */}
                <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                    <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                  </div>
                  <CopyLinkButton 
                    urlPath="/products/consumables/dau-in-silicone"
                    hash={item.id} 
                    itemTitle={item.name} 
                    variant="compact"
                  />
                </div>

                <div className="w-full h-64 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 mb-6 p-4 flex items-center justify-center">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.name}</h3>
                <p className="text-slate-600 mb-6 text-sm leading-relaxed">{item.desc}</p>
                
                <div className="space-y-2 mb-6">
                  {item.features.map((f: string, i: number) => (
                    <div key={i} className="flex items-start text-xs font-bold text-slate-700 bg-indigo-50 text-indigo-900 border border-indigo-100 p-2.5 rounded-lg">
                      <CheckCircle2 className="w-4 h-4 text-indigo-600 mr-2 shrink-0 mt-0.5"/> {f}
                    </div>
                  ))}
                </div>

                {/* Models Expandable */}
                {item.models && item.models.length > 0 && (
                  <div className="mb-6 border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      type="button"
                      onClick={() => togglePadExpand(item.id)}
                      className="w-full flex items-center justify-between p-3.5 bg-slate-50 hover:bg-slate-100 text-xs font-bold text-slate-800 transition-colors"
                    >
                      <span>Xem bảng tra mã quy cách ({item.models.length} mã đầu in)</span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-500"/> : <ChevronDown className="w-4 h-4 text-slate-500"/>}
                    </button>

                    {isExpanded && (
                      <div className="max-h-80 overflow-y-auto border-t border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-500 font-bold border-b border-slate-200 sticky top-0">
                            <tr>
                              <th className="p-2.5 text-center w-16">Hình dáng</th>
                              <th className="p-2.5">Mã Sản Phẩm</th>
                              <th className="p-2.5">Kích Thước (LxWxH)</th>
                              <th className="p-2.5">Phân Loại / Ứng Dụng</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {item.models.map((m: any, idx: number) => (
                              <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                <td className="p-2 flex justify-center items-center">
                                  {m.img ? (
                                    <div className="w-12 h-12 bg-white rounded-lg border border-slate-200 p-1 flex items-center justify-center overflow-hidden group/img">
                                      <img src={m.img} alt={m.code} className="w-full h-full object-contain group-hover/img:scale-125 transition-transform" />
                                    </div>
                                  ) : (
                                    <span className="text-slate-300">-</span>
                                  )}
                                </td>
                                <td className="p-2.5 font-bold text-slate-900">{m.code}</td>
                                <td className="p-2.5 font-medium text-indigo-600">{m.size}</td>
                                <td className="p-2.5 text-slate-600">{m.type}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors shadow-md text-sm"
                >
                  Tư Vấn & Báo Giá Mã Đầu In Này <ArrowRight className="w-4 h-4 ml-2"/>
                </Link>
                <div className="flex gap-2">
                  <a
                    href="tel:0987453866"
                    className="flex-1 inline-flex items-center justify-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-indigo-600" /> 0987 453 866
                  </a>
                  <CopyLinkButton 
                    urlPath="/products/consumables/dau-in-silicone"
                    hash={item.id} 
                    itemTitle={item.name} 
                    className="flex-1"
                  />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
