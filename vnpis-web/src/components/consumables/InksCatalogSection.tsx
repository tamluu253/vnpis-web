'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';
import inksData from '@/data/inks.json';
import CopyLinkButton from './CopyLinkButton';

const certColors: Record<string, string> = {
  "RoHS": "bg-blue-100 text-blue-700 border-blue-200",
  "REACH": "bg-sky-100 text-sky-700 border-sky-200",
  "ZDHC Level 3": "bg-green-100 text-green-700 border-green-200",
  "Oeko-Tex": "bg-teal-100 text-teal-700 border-teal-200",
  "GOTS": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "EN71-3": "bg-indigo-100 text-indigo-700 border-indigo-200"
};

export default function InksCatalogSection() {
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
    <div className="space-y-12">
      {/* Filter by Material */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
          Lọc Mực In Theo Vật Liệu Bề Mặt (Substrate)
        </h3>
        <div className="flex flex-wrap gap-2">
          {allMaterials.map(mat => (
            <button
              key={mat}
              onClick={() => setSelectedMaterial(mat)}
              className={`px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition-all ${
                selectedMaterial === mat 
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
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
          <section key={brand.brandId} id={brand.brandId} className="scroll-mt-28">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b-2 border-slate-200 pb-4 mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl border border-slate-200 p-2 flex items-center justify-center shadow-sm">
                  <img src={brand.logo} alt={brand.brandName} className="max-w-full max-h-full object-contain" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
                    {brand.brandName}
                    <span className="text-xs font-mono font-normal text-slate-400">#{brand.brandId}</span>
                  </h2>
                  <p className="text-slate-500 text-sm">{brand.country} • {brand.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-auto">
                <CopyLinkButton 
                  urlPath="/products/consumables/muc-in"
                  hash={brand.brandId} 
                  itemTitle={`Mực ${brand.brandName}`} 
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brand.series.map(serie => {
                const serieAnchor = serie.id || `${brand.brandId}-${serie.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
                return (
                  <article 
                    key={serie.id || serie.name} 
                    id={serieAnchor}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all flex flex-col justify-between scroll-mt-28 group target:ring-2 target:ring-blue-500 target:bg-blue-50/20"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-mono text-slate-400 font-bold">#{serieAnchor}</span>
                        <CopyLinkButton 
                          urlPath="/products/consumables/muc-in"
                          hash={serieAnchor} 
                          itemTitle={`${brand.brandName} ${serie.name}`} 
                          variant="icon"
                          className="p-1.5"
                        />
                      </div>

                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {serie.name}
                          </h3>
                          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                            {serie.type}
                          </span>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                        {serie.desc}
                      </p>

                      {/* Vật liệu in */}
                      <div className="mb-6">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                          Vật Liệu Ứng Dụng:
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {serie.materials.map(mat => (
                            <span key={mat} className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 font-medium rounded-lg border border-blue-100">
                              {mat}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Chứng chỉ sinh thái */}
                      {serie.certs && serie.certs.length > 0 && (
                        <div className="mb-6 pt-4 border-t border-slate-100">
                          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                            Tiêu Chuẩn & Chứng Nhận:
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {serie.certs.map(cert => (
                              <span 
                                key={cert} 
                                className={`text-[11px] font-bold px-2 py-0.5 rounded-md border ${certColors[cert] || 'bg-slate-100 text-slate-700 border-slate-200'}`}
                              >
                                {cert}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-100">
                      <Link 
                        href="/contact" 
                        className="w-full inline-flex items-center justify-center py-2.5 px-4 bg-slate-900 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-colors shadow-sm"
                      >
                        Báo Giá & Mẫu Thử <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                      <div className="flex gap-2">
                        <a
                          href="tel:0987453866"
                          className="flex-1 inline-flex items-center justify-center py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-lg transition-colors"
                        >
                          <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> 0987 453 866
                        </a>
                        <CopyLinkButton 
                          urlPath="/products/consumables/muc-in"
                          hash={serieAnchor} 
                          itemTitle={`${brand.brandName} ${serie.name}`}
                          className="flex-1"
                        />
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
