'use client';
export const dynamicParams = true;

import React from 'react';
import Link from 'next/link';

export default function DuAnPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-slate-50 pt-24">
      <section className="bg-slate-900 text-white py-16">
        <div className="container mx-auto px-4 max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Thư Viện Dự Án Gia Công In Ấn</h1>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Tổng hợp hình ảnh các dự án thực tế đã gia công in ấn sắc nét trên chất liệu nhựa, vải, đồ gia dụng, kim loại và bao bì đóng gói.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="group relative aspect-square rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-100">
                <img 
                  alt={`Dự án in gia công VNPIS ${item}`} 
                  src={`/images/portfolio/vnpis-in-gia-cong-${item}.jpg`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/blog-placeholder.jpg';
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
