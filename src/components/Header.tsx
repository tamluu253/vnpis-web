'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, PhoneCall, Globe } from 'lucide-react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navigation = [
    {
      name: 'Giải Pháp',
      href: '/solutions',
      dropdown: [
        { name: 'In QR Code', href: '/solutions/qr-code-printing' },
        { name: 'In Dữ Liệu Biến Đổi', href: '/solutions/variable-data-printing' },
        { name: 'Giải Pháp RFID', href: '/solutions/rfid' },
        { name: 'RFID Kho Bãi', href: '/solutions/warehouse-rfid' },
        { name: 'RFID May Mặc', href: '/solutions/garment-rfid' },
        { name: 'Chống Hàng Giả', href: '/solutions/anti-counterfeit' },
        { name: 'Truy Xuất Nguồn Gốc', href: '/solutions/traceability' },
      ],
    },
    {
      name: 'Sản Phẩm',
      href: '/products',
      dropdown: [
        { name: 'Máy In UV Single Pass', href: '/products/uv-printers' },
        { name: 'Máy In Pad', href: '/products/pad-printers' },
        { name: 'Máy In Lụa', href: '/products/screen-printers' },
        { name: 'Mực In CIJ', href: '/products/cij-ink' },
        { name: 'Mực In TIJ', href: '/products/tij-ink' },
        { name: 'Mực In CIJ, TIJ Đặc Biệt', href: '/products/special-inks' },
        { name: 'Đầu In Ricoh', href: '/products/ricoh-printheads' },
        { name: 'Đầu In Epson', href: '/products/epson-printheads' },
        { name: 'Máy In Pad / In Lụa', href: '/products/pad-screen-machines' },
        { name: 'Vật Tư In Pad / In Lụa', href: '/products/pad-screen-supplies' },
      ]
    },
    {
      name: 'Dịch Vụ',
      href: '/services',
      dropdown: [
        { name: 'In Công Nghiệp', href: '/services/industrial-printing' },
        { name: 'In Gia Công QR', href: '/services/qr-printing' },
        { name: 'In Dữ Liệu Biến Đổi', href: '/services/variable-data-printing' },
        { name: 'Dịch Vụ In Pad', href: '/services/pad-printing-service' },
        { name: 'Dịch Vụ In UV', href: '/services/uv-printing-service' },
        { name: 'Tư Vấn Giải Pháp', href: '/services/consulting' },
      ],
    },
    {
      name: 'Ngành',
      href: '/industries',
    },
    {
      name: 'Blog',
      href: '/blog',
    },
    {
      name: 'Tài Liệu',
      href: '/documents',
    },
    {
      name: 'Về Chúng Tôi',
      href: '/about',
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-20 lg:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/images/vnpis-logo.png" alt="VNPIS Logo" className="h-14 lg:h-16 w-auto transition-all" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <div
              key={item.name}
              className="relative group h-20 flex items-center"
              onMouseEnter={() => item.dropdown && setActiveMenu(item.name)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href={item.href}
                className="text-sm font-semibold text-slate-800 hover:text-blue-600 transition-colors flex items-center"
              >
                {item.name}
                {item.dropdown && <ChevronDown className="ml-1 w-4 h-4" />}
              </Link>

              {/* Dropdown Menu */}
              {item.dropdown && (
                <div
                  className={`absolute top-20 left-0 w-64 bg-white border border-slate-100 shadow-xl rounded-b-xl py-4 transition-all duration-200 origin-top ${
                    activeMenu === item.name ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'
                  }`}
                >
                  {item.dropdown.map((subItem) => (
                    <Link
                      key={subItem.name}
                      href={subItem.href}
                      className="block px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors"
                    >
                      {subItem.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-6">
          <div className="relative group flex items-center h-20 z-50">
            <button className="flex items-center text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors bg-slate-50 px-3 py-1.5 rounded-md border border-slate-200">
              <Globe className="w-4 h-4 mr-1.5" /> Select Language <ChevronDown className="ml-1 w-3 h-3" />
            </button>
            <div className="absolute top-[60px] right-0 w-48 bg-white border border-slate-100 shadow-xl rounded-lg py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
              <button onClick={() => { document.cookie = `googtrans=/vi/vi; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Tiếng Việt
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/zh-CN; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Chinese (Simplified)
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/en; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                English
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/ja; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Japanese
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/km; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Khmer
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/ko; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Korean
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/lo; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Lao
              </button>
              <button onClick={() => { document.cookie = `googtrans=/vi/th; path=/;`; window.location.reload(); }} className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors">
                Thai
              </button>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-500 font-medium">Hotline 24/7</span>
            <a href="tel:0987453866" className="text-blue-600 font-bold text-lg hover:text-blue-700 transition-colors">
              0987 453 866
            </a>
          </div>
          <Link
            href="/contact"
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-full font-medium transition-colors shadow-sm shadow-orange-500/20"
          >
            Nhận Báo Giá
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 shadow-xl h-[calc(100vh-80px)] overflow-y-auto">
          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col space-y-2">
                <Link href={item.href} className="font-bold text-slate-900 text-lg py-2 border-b border-slate-100">
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 flex flex-col space-y-3 pt-2">
                    {item.dropdown.map((subItem) => (
                      <Link key={subItem.name} href={subItem.href} className="text-slate-600 text-sm font-medium">
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col space-y-4">
              <a href="tel:0987453866" className="flex items-center justify-center w-full py-3 bg-slate-100 text-slate-800 rounded-md font-bold">
                <PhoneCall className="w-5 h-5 mr-2" /> Hotline: 0987 453 866
              </a>
              <Link href="/contact" className="flex items-center justify-center w-full py-3 bg-orange-600 text-white rounded-md font-bold shadow-lg">
                Yêu Cầu Báo Giá
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
