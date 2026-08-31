'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, PhoneCall, Globe, ExternalLink, Check } from 'lucide-react';

type NavigationItem = {
  name: string;
  href: string;
  dropdown?: {
    name: string;
    href: string;
    external?: boolean;
  }[];
};

const languages = [
  { code: 'vi', name: 'Tiếng Việt', label: 'VI', flag: '🇻🇳' },
  { code: 'en', name: 'English', label: 'EN', flag: '🇬🇧' },
  { code: 'zh-CN', name: '中文 (Chinese)', label: 'ZH', flag: '🇨🇳' },
  { code: 'ja', name: '日本語 (Japanese)', label: 'JA', flag: '🇯🇵' },
  { code: 'ko', name: '한국어 (Korean)', label: 'KO', flag: '🇰🇷' },
  { code: 'km', name: 'ភាសាខ្មែរ (Khmer)', label: 'KM', flag: '🇰🇭' },
  { code: 'lo', name: 'ພາສາລາວ (Lao)', label: 'LO', flag: '🇱🇦' },
  { code: 'th', name: 'ไทย (Thai)', label: 'TH', flag: '🇹🇭' },
];

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLangOpen, setIsMobileLangOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<string>('vi');

  const [logoSrc, setLogoSrc] = useState('/images/vnpis-logo.png');
  const [logoAlt, setLogoAlt] = useState('VNPIS Logo');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/vi\/([^;]+)/);
      if (match && match[1]) {
        setCurrentLang(match[1]);
      }
      if (window.location.hostname.includes('inanvnpis')) {
        setLogoSrc('/images/inanvnpis-logo.png');
        setLogoAlt('In Ấn VNPIS Logo');
      }
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    document.cookie = `googtrans=/vi/${langCode}; path=/; domain=${window.location.hostname}`;
    document.cookie = `googtrans=/vi/${langCode}; path=/;`;
    setCurrentLang(langCode);
    setIsMobileLangOpen(false);
    window.location.reload();
  };

  const selectedLangObj = languages.find((l) => l.code === currentLang) || languages[0];

  const navigation: NavigationItem[] = [
    {
      name: 'Giải Pháp',
      href: '/solutions',
      dropdown: [
        { name: 'Variable Data Printing', href: '/solutions/variable-data-printing' },
        { name: 'UV Single Pass Printing', href: '/solutions/uv-single-pass-printing' },
        { name: 'Pad Printing', href: '/solutions/pad-printing' },
        { name: 'Screen Printing', href: '/solutions/screen-printing' },
        { name: 'Industrial Coding', href: '/solutions/industrial-coding' },
      ],
    },
    {
      name: 'Sản Phẩm',
      href: '/products',
      dropdown: [
        { name: 'UV Printer', href: '/products/uv-printers' },
        { name: 'Pad Printer', href: '/products/pad-printers' },
        { name: 'Screen Printer', href: '/products/screen-printers' },
        { name: 'Hot Stamping', href: '/products/hot-stamping' },
        { name: 'CIJ Ink', href: '/products/cij-ink' },
        { name: 'TIJ Ink', href: '/products/tij-ink' },
        { name: 'Special Inks', href: '/products/special-inks' },
        { name: 'Printheads', href: '/products/printheads' },
        { name: 'Printing Consumables', href: '/products/consumables' },
      ]
    },
    {
      name: 'Dịch Vụ',
      href: '/services',
      dropdown: [
        { name: 'Variable Data Printing', href: '/services/variable-data-printing' },
        { name: 'Pad Printing Service', href: '/services/pad-printing-service' },
        { name: 'Screen Printing Service', href: '/services/screen-printing-service' },
        { name: 'Machine Rental', href: '/services/machine-rental' },
        { name: 'Machine Repair', href: '/services/machine-repair' },
        { name: 'Color Management', href: '/services/color-management' },
      ],
    },
    {
      name: 'Kiến Thức',
      href: '/blog',
      dropdown: [
        { name: 'Blog', href: '/blog' },
        { name: 'Case Study', href: '/case-studies' },
        { name: 'Video', href: '/videos' },
        { name: 'Downloads', href: '/resources/download' },
        { name: 'FAQ', href: '/faq' },
      ],
    },
    {
      name: 'Giới Thiệu',
      href: '/about',
    },
    {
      name: 'Liên Hệ',
      href: '/contact',
    },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-slate-200 shadow-sm transition-all">
      <div className="container mx-auto px-4 h-20 lg:h-24 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <img src={logoSrc} alt={logoAlt} className="h-14 lg:h-16 w-auto transition-all" />
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
                      target={subItem.external ? "_blank" : undefined}
                      rel={subItem.external ? "noopener noreferrer" : undefined}
                      className="block px-6 py-2.5 text-sm text-slate-600 hover:bg-slate-50 hover:text-blue-600 font-medium transition-colors"
                    >
                      <span className="flex items-center">
                        {subItem.name}
                        {subItem.external && <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />}
                      </span>
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
              <Globe className="w-4 h-4 mr-1.5 text-blue-600" />
              <span>{selectedLangObj.flag} {selectedLangObj.name}</span>
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
            <div className="absolute top-[60px] right-0 w-52 bg-white border border-slate-100 shadow-xl rounded-lg py-2 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full text-left px-4 py-2 text-sm flex items-center justify-between hover:bg-slate-50 font-medium transition-colors ${
                    currentLang === lang.code ? 'text-blue-600 bg-blue-50/50 font-bold' : 'text-slate-700'
                  }`}
                >
                  <span className="flex items-center">
                    <span className="mr-2 text-base">{lang.flag}</span>
                    {lang.name}
                  </span>
                  {currentLang === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                </button>
              ))}
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

        {/* Mobile Header Actions: Language Button & Menu Toggle */}
        <div className="flex items-center space-x-2 lg:hidden">
          {/* Mobile Quick Language Toggle Button */}
          <button
            onClick={() => {
              setIsMobileLangOpen(!isMobileLangOpen);
              if (isMobileMenuOpen) setIsMobileMenuOpen(false);
            }}
            className="flex items-center text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full border border-slate-300 transition-colors"
            aria-label="Chọn ngôn ngữ"
          >
            <Globe className="w-4 h-4 mr-1 text-blue-600" />
            <span>{selectedLangObj.flag} {selectedLangObj.label}</span>
            <ChevronDown className="w-3 h-3 ml-1 text-slate-500" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            className="p-2 text-slate-700 rounded-lg hover:bg-slate-100"
            onClick={() => {
              setIsMobileMenuOpen(!isMobileMenuOpen);
              if (isMobileLangOpen) setIsMobileLangOpen(false);
            }}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Language Picker Dropdown Modal */}
      {isMobileLangOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 py-4 shadow-2xl absolute top-20 left-0 w-full z-50">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center">
              <Globe className="w-4 h-4 mr-1.5 text-blue-600" /> Chọn Ngôn Ngữ / Select Language
            </span>
            <button onClick={() => setIsMobileLangOpen(false)} className="text-slate-400 p-1 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                  currentLang === lang.code
                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                    : 'border-slate-200 bg-slate-50/50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center truncate">
                  <span className="mr-2 text-sm">{lang.flag}</span>
                  <span className="truncate">{lang.name}</span>
                </span>
                {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 ml-1" />}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-6 shadow-xl h-[calc(100vh-80px)] overflow-y-auto">
          {/* Mobile Language Selector inside Menu Drawer */}
          <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 mb-6">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5 flex items-center">
              <Globe className="w-4 h-4 mr-1.5 text-blue-600" /> Đa Ngôn Ngữ / Languages
            </div>
            <div className="grid grid-cols-2 gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                    currentLang === lang.code
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="flex items-center truncate">
                    <span className="mr-1.5 text-sm">{lang.flag}</span>
                    <span className="truncate">{lang.name}</span>
                  </span>
                  {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-white shrink-0 ml-1" />}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-4">
            {navigation.map((item) => (
              <div key={item.name} className="flex flex-col space-y-2">
                <Link href={item.href} onClick={() => setIsMobileMenuOpen(false)} className="font-bold text-slate-900 text-lg py-2 border-b border-slate-100">
                  {item.name}
                </Link>
                {item.dropdown && (
                  <div className="pl-4 flex flex-col space-y-3 pt-2">
                    {item.dropdown.map((subItem) => (
                      <Link 
                        key={subItem.name} 
                        href={subItem.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        target={subItem.external ? "_blank" : undefined}
                        rel={subItem.external ? "noopener noreferrer" : undefined} 
                        className="text-slate-600 text-sm font-medium flex items-center"
                      >
                        {subItem.name}
                        {subItem.external && <ExternalLink className="w-3 h-3 ml-1.5 opacity-70" />}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col space-y-4">
              <a href="tel:0987453866" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full py-3 bg-slate-100 text-slate-800 rounded-md font-bold">
                <PhoneCall className="w-5 h-5 mr-2" /> Hotline: 0987 453 866
              </a>
              <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center justify-center w-full py-3 bg-orange-600 text-white rounded-md font-bold shadow-lg">
                Yêu Cầu Báo Giá
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
