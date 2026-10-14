'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Droplet, CircleDot, Layers, Settings, Beaker, LayoutGrid } from 'lucide-react';

export type ConsumableCategoryKey = 'overview' | 'inks' | 'pads' | 'plates' | 'accessories' | 'additives';

interface TabItem {
  id: ConsumableCategoryKey;
  label: string;
  subLabel?: string;
  href: string;
  icon: React.ElementType;
  activeColorClass: string;
  badge?: string;
}

export const CONSUMABLE_TABS: TabItem[] = [
  {
    id: 'overview',
    label: 'Tổng Quan',
    subLabel: 'Siêu thị vật tư',
    href: '/products/consumables',
    icon: LayoutGrid,
    activeColorClass: 'bg-slate-900 text-white border-slate-900 shadow-md',
  },
  {
    id: 'accessories',
    label: 'Cốc Mực, Vòng Gạt & Tấm Lót',
    subLabel: 'Cốc nhôm, vòng sứ/thép, dao gạt, lót khay',
    href: '/products/consumables/coc-muc-vong-gat-muc',
    icon: Settings,
    activeColorClass: 'bg-emerald-600 text-white border-emerald-600 shadow-lg shadow-emerald-500/20',
  },
  {
    id: 'inks',
    label: 'Mực In Tampon & In Lụa',
    subLabel: 'Dubuit, Henkey, Ruco, Afford',
    href: '/products/consumables/muc-in',
    icon: Droplet,
    activeColorClass: 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20',
  },
  {
    id: 'pads',
    label: 'Đầu In Silicone',
    subLabel: 'R-Series, Q-Series cao cấp',
    href: '/products/consumables/dau-in-silicone',
    icon: CircleDot,
    activeColorClass: 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-500/20',
  },
  {
    id: 'plates',
    label: 'Khuôn In Chế Bản',
    subLabel: 'Khuôn thép CNC, mỏng 0.5, Polymer',
    href: '/products/consumables/khuon-in',
    icon: Layers,
    activeColorClass: 'bg-purple-600 text-white border-purple-600 shadow-lg shadow-purple-500/20',
  },
  {
    id: 'additives',
    label: 'Phụ Gia & Dung Môi',
    subLabel: 'Thinner, Hardener, Retarder, Primer',
    href: '/products/consumables/phu-gia-dung-moi',
    icon: Beaker,
    activeColorClass: 'bg-amber-600 text-white border-amber-600 shadow-lg shadow-amber-500/20',
  },
];

interface ConsumablesNavProps {
  currentTab?: ConsumableCategoryKey;
}

export default function ConsumablesNav({ currentTab }: ConsumablesNavProps) {
  const pathname = usePathname();

  const getIsActive = (tab: TabItem) => {
    if (currentTab) return currentTab === tab.id;
    if (tab.href === '/products/consumables') {
      return pathname === '/products/consumables';
    }
    return pathname.startsWith(tab.href);
  };

  return (
    <nav 
      aria-label="Danh mục vật tư in công nghiệp" 
      className="flex overflow-x-auto hide-scrollbar gap-2.5 pb-2 -mx-2 px-2"
    >
      {CONSUMABLE_TABS.map((tab) => {
        const isActive = getIsActive(tab);
        const IconComponent = tab.icon;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            prefetch={true}
            className={`group relative flex items-center px-4 py-3 md:px-5 md:py-3.5 rounded-xl font-bold whitespace-nowrap transition-all border text-sm md:text-base shrink-0 ${
              isActive
                ? tab.activeColorClass
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 shadow-sm'
            }`}
          >
            <IconComponent className={`w-4 h-4 md:w-5 md:h-5 mr-2 shrink-0 ${
              isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'
            }`} />
            
            <span className="flex flex-col text-left">
              <span className="leading-tight">{tab.label}</span>
              {tab.subLabel && (
                <span className={`text-[10px] md:text-[11px] font-normal leading-tight hidden sm:block ${
                  isActive ? 'text-white/80' : 'text-slate-400 group-hover:text-slate-500'
                }`}>
                  {tab.subLabel}
                </span>
              )}
            </span>

            {tab.badge && (
              <span className="ml-2 px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded bg-rose-500 text-white shadow-sm">
                {tab.badge}
              </span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}
