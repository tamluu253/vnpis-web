'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown, ChevronUp, Image as ImageIcon, ArrowRight, PhoneCall } from 'lucide-react';
import CopyLinkButton from './CopyLinkButton';

interface AccessoryItemProps {
  item: {
    id: string;
    aliasId?: string;
    name: string;
    keyword?: string;
    material?: string;
    desc: string;
    image: string;
    gallery?: string[];
    sizes?: string[];
    features?: string[];
    categories?: Array<{
      type: string;
      desc: string;
      specs: string;
    }>;
    bladeProfiles?: Array<{
      code: string;
      name: string;
    }>;
    models?: string[];
  };
  urlPath?: string;
}

export default function AccessoryItemCard({ item, urlPath }: AccessoryItemProps) {
  const [currentImg, setCurrentImg] = useState<string>(item.image);
  const [isModelsOpen, setIsModelsOpen] = useState(false);
  const [isProfilesOpen, setIsProfilesOpen] = useState(false);

  // Canonical anchor id
  const anchorId = item.aliasId || item.id;

  return (
    <article
      id={anchorId}
      className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all group flex flex-col justify-between scroll-mt-28 target:ring-2 target:ring-emerald-500 target:bg-emerald-50/20"
    >
      <div>
        {/* Card Header: Anchor + Copy link */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="text-xs font-mono font-bold text-slate-400">#{anchorId}</span>
          </div>
          <CopyLinkButton 
            urlPath={urlPath}
            hash={anchorId} 
            itemTitle={item.name} 
            variant="compact"
          />
        </div>

        {/* Main Image */}
        <div className="w-full h-56 bg-slate-50 rounded-xl overflow-hidden border border-slate-200 mb-3 p-3 flex items-center justify-center relative">
          <img 
            src={currentImg} 
            alt={item.name} 
            loading="lazy"
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
          />
          {item.keyword && (
            <span className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[11px] font-black bg-emerald-600 text-white shadow-sm uppercase tracking-wide">
              {item.keyword}
            </span>
          )}
        </div>

        {/* Image Gallery Switcher (if multiple images) */}
        {item.gallery && item.gallery.length > 1 && (
          <div className="flex gap-2 mb-4 overflow-x-auto pb-1.5 hide-scrollbar">
            {item.gallery.map((gImg, gIdx) => {
              const isSelected = currentImg === gImg;
              return (
                <button
                  key={gIdx}
                  type="button"
                  onClick={() => setCurrentImg(gImg)}
                  className={`w-12 h-12 rounded-lg border p-1 bg-white shrink-0 overflow-hidden transition-all ${
                    isSelected 
                      ? 'border-emerald-600 ring-2 ring-emerald-400 shadow-sm' 
                      : 'border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300'
                  }`}
                  title={`Xem ảnh ${gIdx + 1}`}
                >
                  <img src={gImg} alt={`${item.name} ảnh ${gIdx + 1}`} className="w-full h-full object-contain" />
                </button>
              );
            })}
          </div>
        )}

        {/* Title & Material */}
        <div className="mb-3">
          <h2 className="text-xl font-bold text-slate-900 mb-1 leading-snug">
            {item.name}
          </h2>
          {item.material && (
            <p className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-100 inline-block mb-1">
              Vật liệu: {item.material}
            </p>
          )}
        </div>

        <p className="text-slate-600 mb-4 text-sm leading-relaxed">{item.desc}</p>
        
        {/* Features list */}
        {item.features && item.features.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {item.features.map((f, i) => (
              <div key={i} className="flex items-start text-xs font-semibold text-emerald-900 bg-emerald-50/70 p-2 rounded-lg border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 mr-2 text-emerald-600 shrink-0 mt-0.5" />
                <span>{f}</span>
              </div>
            ))}
          </div>
        )}

        {/* Categories breakdown (for Ink Cups) */}
        {item.categories && item.categories.length > 0 && (
          <div className="mb-4 space-y-2 border-t border-slate-100 pt-3">
            <span className="text-xs font-bold text-slate-400 uppercase block mb-1">Các dòng sản phẩm chính:</span>
            {item.categories.map((cat, cIdx) => (
              <div key={cIdx} className="bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs">
                <div className="font-bold text-slate-900 mb-1">{cat.type}</div>
                <p className="text-slate-600 mb-1 leading-snug">{cat.desc}</p>
                <div className="text-[11px] font-semibold text-emerald-700">{cat.specs}</div>
              </div>
            ))}
          </div>
        )}

        {/* Common Sizes Badges */}
        {item.sizes && item.sizes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 mb-4">
            <span className="text-xs font-bold text-slate-400 uppercase w-full mb-1">Quy cách phổ biến:</span>
            {item.sizes.map((sz, i) => (
              <span key={i} className="inline-block px-2.5 py-1 bg-slate-100 text-slate-800 text-xs font-bold rounded-lg border border-slate-200">
                {sz}
              </span>
            ))}
          </div>
        )}

        {/* Blade Profiles Expandable (AP-1 ~ AP-6) */}
        {item.bladeProfiles && item.bladeProfiles.length > 0 && (
          <div className="mb-4 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={() => setIsProfilesOpen(!isProfilesOpen)}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <span className="flex items-center">
                <ImageIcon className="w-3.5 h-3.5 mr-1.5 text-emerald-600" />
                6 Kiểu Biên Dạng Lưỡi Gạt (AP-1 ~ AP-6)
              </span>
              {isProfilesOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>
            
            {isProfilesOpen && (
              <div className="p-3 border-t border-slate-200 bg-white space-y-2">
                {item.bladeProfiles.map((p, pIdx) => (
                  <div key={pIdx} className="text-xs flex items-start justify-between gap-2 border-b border-slate-100 pb-1.5 last:border-b-0">
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded shrink-0">{p.code}</span>
                    <span className="text-slate-700 text-right leading-tight">{p.name}</span>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setCurrentImg('/images/products/accessories/blade-edges.webp')}
                  className="w-full mt-2 py-1.5 text-center text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 rounded-lg transition-colors border border-emerald-200 flex items-center justify-center gap-1"
                >
                  Xem sơ đồ góc vát AP-1 ~ AP-6 trên hình
                </button>
              </div>
            )}
          </div>
        )}

        {/* Full Dimensions Model List Expandable */}
        {item.models && item.models.length > 0 && (
          <div className="mb-6 border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            <button
              type="button"
              onClick={() => setIsModelsOpen(!isModelsOpen)}
              className="w-full flex items-center justify-between p-3 text-xs font-bold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <span>Danh Mục Quy Cách Kỹ Thuật ({item.models.length} Kích Thước)</span>
              {isModelsOpen ? <ChevronUp className="w-4 h-4 text-slate-500" /> : <ChevronDown className="w-4 h-4 text-slate-500" />}
            </button>

            {isModelsOpen && (
              <div className="p-3 border-t border-slate-200 bg-white max-h-64 overflow-y-auto">
                <p className="text-[11px] text-slate-500 font-semibold mb-2">Đường kính ngoài (OD) × Đường kính trong (ID) × Chiều cao (H):</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {item.models.map((m, mIdx) => (
                    <div key={mIdx} className="bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 rounded px-2 py-1 text-[11px] font-mono font-medium transition-colors">
                      {m}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="space-y-2 mt-4 pt-3 border-t border-slate-100">
        <Link 
          href="/contact" 
          className="inline-flex items-center justify-center w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition-colors shadow-md text-sm"
        >
          Tư Vấn & Báo Giá {item.name.split('(')[0].trim()} <ArrowRight className="w-4 h-4 ml-2"/>
        </Link>
        <div className="flex gap-2">
          <a
            href="tel:0987453866"
            className="flex-1 inline-flex items-center justify-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-600" /> Hotline 0987 453 866
          </a>
          <CopyLinkButton 
            urlPath={urlPath}
            hash={anchorId} 
            itemTitle={item.name} 
            className="flex-1"
          />
        </div>
      </div>
    </article>
  );
}
