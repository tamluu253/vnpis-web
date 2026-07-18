import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Download, FileText } from 'lucide-react';
import catalogs from '@/data/catalogs.json';

export const metadata = {
  title: 'Thư viện Catalog | VNPIS',
  description: 'Kho lưu trữ tài liệu Catalog từ các nhà cung cấp máy in và vật tư ngành in.',
};

export default function CatalogLibraryPage() {
  // Group catalogs by type
  const groupedCatalogs = catalogs.reduce((acc, cat) => {
    if (!acc[cat.type]) acc[cat.type] = [];
    acc[cat.type].push(cat);
    return acc;
  }, {} as Record<string, typeof catalogs>);

  return (
    <main className="min-h-screen pt-24 pb-16 bg-slate-50">
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/resources" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Trở lại Tài nguyên
          </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200 mb-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Thư viện Catalog & Tài liệu</h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Xem và tải về các tài liệu thông số kỹ thuật, cấu hình máy in và danh mục vật tư gốc từ các nhà cung cấp uy tín của VNPIS.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-12">
          {Object.entries(groupedCatalogs).map(([type, items]) => (
            <div key={type}>
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center border-b pb-2">
                <FileText className="w-6 h-6 mr-3 text-blue-500" />
                Catalog {type}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((cat, idx) => (
                  <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-blue-200 transition-all p-6 flex flex-col group">
                    <div className="mb-4">
                      <span className="inline-block bg-slate-100 text-slate-600 text-xs font-bold px-2 py-1 rounded-md mb-3">
                        {cat.supplier}
                      </span>
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2 min-h-[56px]">
                        {cat.title}
                      </h3>
                    </div>
                    <p className="text-slate-500 text-sm mb-6 flex-grow">
                      {cat.desc}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                      <span className="text-xs font-medium text-slate-400 bg-slate-50 px-2 py-1 rounded-md">
                        PDF • {cat.size}
                      </span>
                      <a 
                        href={cat.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center bg-blue-50 hover:bg-blue-600 text-blue-600 hover:text-white p-2 rounded-lg transition-colors"
                        title="Tải về"
                      >
                        <Download className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </main>
  );
}
