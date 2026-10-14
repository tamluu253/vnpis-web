'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Settings, Droplet, CircleDot, Layers, Beaker, ArrowRight, ExternalLink } from 'lucide-react';

interface QuickSection {
  id: string;
  name: string;
  shortName: string;
  url: string;
  icon: React.ElementType;
}

const SECTIONS: QuickSection[] = [
  {
    id: 'coc-muc-vong-gat',
    name: 'Cốc Mực & Vòng Gạt',
    shortName: 'Cốc & Vòng Gạt',
    url: '/products/consumables/coc-muc-vong-gat-muc',
    icon: Settings,
  },
  {
    id: 'muc-in',
    name: 'Mực In Tampon & Lụa',
    shortName: 'Mực In',
    url: '/products/consumables/muc-in',
    icon: Droplet,
  },
  {
    id: 'dau-in-silicone',
    name: 'Đầu In Silicone (Pads)',
    shortName: 'Đầu In',
    url: '/products/consumables/dau-in-silicone',
    icon: CircleDot,
  },
  {
    id: 'khuon-in',
    name: 'Khuôn In Chế Bản',
    shortName: 'Khuôn In',
    url: '/products/consumables/khuon-in',
    icon: Layers,
  },
  {
    id: 'phu-gia-dung-moi',
    name: 'Phụ Gia & Dung Môi',
    shortName: 'Phụ Gia',
    url: '/products/consumables/phu-gia-dung-moi',
    icon: Beaker,
  },
];

export default function ConsumablesQuickBar() {
  const [activeSection, setActiveSection] = useState<string>('coc-muc-vong-gat');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <div className="sticky top-20 lg:top-24 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          <div className="text-xs font-black uppercase tracking-wider text-slate-500 hidden xl:flex items-center gap-1.5 shrink-0">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            <span>Mục Lục Nhanh:</span>
          </div>

          <div className="flex items-center gap-1.5 md:gap-2 overflow-x-auto hide-scrollbar py-0.5 w-full xl:w-auto">
            {SECTIONS.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => scrollToSection(e, sec.id)}
                  className={`flex items-center px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 border ${
                    isActive
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                      : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border-slate-200'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                  <span className="hidden sm:inline">{sec.name}</span>
                  <span className="sm:hidden">{sec.shortName}</span>
                </a>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <a
              href="#tu-van-bao-gia"
              className="text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-2 rounded-xl transition-colors flex items-center"
            >
              Nhận Báo Giá <ArrowRight className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
