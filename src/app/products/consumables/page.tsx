"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Beaker, ShieldCheck, Search, Filter, Droplet } from 'lucide-react';
import inksData from '@/data/inks.json';

// Mapping chứng nhận sang màu sắc huy hiệu (Badge)
const certColors: Record<string, string> = {
  "ZDHC Level 3": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "GOTS": "bg-green-100 text-green-800 border-green-200",
  "Oeko-Tex": "bg-teal-100 text-teal-800 border-teal-200",
  "REACH": "bg-blue-100 text-blue-800 border-blue-200",
  "RoHS": "bg-cyan-100 text-cyan-800 border-cyan-200",
  "EN71-3": "bg-indigo-100 text-indigo-800 border-indigo-200",
  "Halogen-Free": "bg-sky-100 text-sky-800 border-sky-200",
};

export default function ConsumablesPage() {
  const [activeMaterial, setActiveMaterial] = useState<string>("Tất cả");

  // Thu thập tất cả các loại vật liệu để làm bộ lọc
  const allMaterials = Array.from(
    new Set(
      inksData.flatMap(brand => 
        brand.series.flatMap(series => series.materials)
      )
    )
  ).sort();

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Header & Navigation */}
      <div className="bg-slate-900 text-white pt-24 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-0 -left-1/4 w-1/2 h-full bg-gradient-to-r from-blue-500 to-transparent blur-3xl transform -skew-x-12"></div>
          <div className="absolute top-0 -right-1/4 w-1/2 h-full bg-gradient-to-l from-emerald-500 to-transparent blur-3xl transform skew-x-12"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <Link href="/products" className="inline-flex items-center text-slate-300 hover:text-white mb-6 transition-colors font-medium">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Về trang Sản phẩm
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-400/30">
              <Droplet className="w-10 h-10 text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Mực In & Vật Tư (Consumables)
            </h1>
          </div>
          
          <p className="text-lg text-slate-400 max-w-3xl leading-relaxed">
            Danh mục các dòng mực in công nghiệp cao cấp từ các thương hiệu hàng đầu thế giới. 
            Đáp ứng mọi yêu cầu khắt khe nhất về độ bám dính, chống trầy xước và tiêu chuẩn an toàn (REACH, RoHS, ZDHC).
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-8 relative z-20">
        
        {/* Smart Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-12 border border-slate-100 flex flex-col md:flex-row items-center gap-6">
          <div className="flex items-center gap-3 text-slate-700 font-bold w-full md:w-auto">
            <Filter className="w-5 h-5 text-blue-500" />
            Lọc theo vật liệu:
          </div>
          <div className="flex flex-wrap gap-2 flex-grow">
            <button 
              onClick={() => setActiveMaterial("Tất cả")}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeMaterial === "Tất cả" ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
            >
              Tất cả
            </button>
            {allMaterials.map(mat => (
              <button 
                key={mat}
                onClick={() => setActiveMaterial(mat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${activeMaterial === mat ? "bg-blue-500 text-white shadow-md shadow-blue-500/20" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
              >
                {mat}
              </button>
            ))}
          </div>
        </div>

        {/* Brands Listing */}
        <div className="space-y-16">
          {inksData.map(brand => {
            // Lọc ra các dòng mực thỏa mãn vật liệu
            const filteredSeries = brand.series.filter(s => 
              activeMaterial === "Tất cả" || s.materials.includes(activeMaterial)
            );

            // Nếu hãng không có mực nào thỏa mãn, bỏ qua
            if (filteredSeries.length === 0) return null;

            return (
              <div key={brand.brandId} className="scroll-mt-32" id={brand.brandId}>
                {/* Brand Header */}
                <div className="flex items-center justify-between border-b-2 border-slate-200 pb-4 mb-8">
                  <div className="flex items-center gap-4">
                    <img src={brand.logo} alt={brand.country} className="h-6 w-auto rounded-sm shadow-sm" />
                    <h2 className="text-3xl font-black text-slate-800 tracking-tight">{brand.brandName}</h2>
                  </div>
                  <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{brand.country}</span>
                </div>
                
                <p className="text-slate-600 mb-8 max-w-4xl text-lg">{brand.description}</p>

                {/* Series Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSeries.map(series => (
                    <div key={series.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-slate-200 overflow-hidden flex flex-col group">
                      
                      <div className="p-6 flex-grow">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1 block">{series.type}</span>
                            <h3 className="text-2xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors">{series.name}</h3>
                          </div>
                          <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center p-2 border border-slate-100">
                            <img src={series.image} alt="Ink icon" className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </div>

                        <p className="text-slate-600 text-sm leading-relaxed mb-6">
                          {series.desc}
                        </p>

                        <div className="mb-6">
                          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                            <Beaker className="w-3 h-3" /> Vật Liệu Ứng Dụng
                          </h4>
                          <div className="flex flex-wrap gap-1.5">
                            {series.materials.map(mat => (
                              <span key={mat} className="text-xs font-medium bg-slate-100 text-slate-700 px-2 py-1 rounded">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="bg-slate-50 p-4 border-t border-slate-100">
                        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3" /> Chứng Nhận
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {series.certs.map(cert => {
                            const colorClass = certColors[cert] || "bg-slate-200 text-slate-700 border-slate-300";
                            return (
                              <span key={cert} className={`text-xs font-bold px-2.5 py-1 rounded-md border ${colorClass} shadow-sm`}>
                                {cert}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
