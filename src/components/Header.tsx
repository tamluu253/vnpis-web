'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, PhoneCall, MessageCircle } from 'lucide-react';

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
        { name: 'Chống Hàng Giả', href: '/solutions/anti-counterfeit' },
        { name: 'Truy Xuất Nguồn Gốc', href: '/solutions/production-traceability' },
      ],
    },
    {
      name: 'Sản Phẩm',
      href: '/products',
      dropdown: [
        { name: 'Máy In Phun Công Nghiệp', href: '/products/uv-printers' },
        { name: 'Đầu In Công Nghiệp', href: '/products/printheads/ricoh-gen5' },
        { name: 'Mực In CIJ / TIJ', href: '/products/cij-inks/domino' },
        { name: 'Máy In Pad (Tampon)', href: '/products/pad-printing/machines' },
      ],
    },
    {
      name: 'Dịch Vụ',
      href: '/services',
      dropdown: [
        { name: 'In Gia Công QR', href: '/services/qr-printing-service' },
        { name: 'Tư Vấn Giải Pháp', href: '/services/consulting' },
      ],
    },
    {
      name: 'Ứng Dụng',
      href: '/industries',
    },
    {
      name: 'Tin Tức',
      href: '/blog',
    },
    {
      name: 'Về Chúng Tôi',
      href: '/about',
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src="/images/vnpis-logo.png" alt="VNPIS Logo" className="h-12 w-auto" />
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

        {/* CTA Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          <a href="tel:0987453866" className="flex items-center text-slate-700 hover:text-blue-600 font-bold text-sm">
            <PhoneCall className="w-4 h-4 mr-2" /> 0987 453 866
          </a>
          <Link href="/contact" className="px-5 py-2.5 bg-orange-600 text-white text-sm font-bold rounded-md hover:bg-orange-700 transition-colors shadow-md shadow-orange-600/20">
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
