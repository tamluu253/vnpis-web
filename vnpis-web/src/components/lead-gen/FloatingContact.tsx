'use client';

import React, { useState } from 'react';
import { Phone, MessageCircle, X } from 'lucide-react';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Expanded Quick Contact Card */}
      {isOpen && (
        <div className="mb-3 bg-slate-900/95 backdrop-blur-md border border-slate-700 text-white rounded-2xl p-4 shadow-2xl w-72 animate-fadeIn font-sans">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Hotline & Zalo Hỗ Trợ</span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {/* Mr. Tâm */}
            <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/80 space-y-2">
              <div className="text-xs font-extrabold text-amber-300">Mr. Tâm (Tư vấn B2B): 0987 453 866</div>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://zalo.me/0987453866"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2 px-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg text-xs flex items-center justify-center transition-colors shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5 mr-1" /> Zalo Chat
                </a>
                <a
                  href="tel:0987453866"
                  className="py-2 px-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs flex items-center justify-center transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 mr-1" /> Gọi ngay
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Buttons */}
      <div className="flex flex-col space-y-3">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-xl hover:bg-blue-700 hover:scale-105 transition-all duration-300 relative group border-2 border-white/20"
          aria-label="Tùy chọn gọi điện thoại"
        >
          <Phone className="w-6 h-6 animate-pulse" />
          <span className="absolute right-16 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            Hotline Xưởng In
          </span>
        </button>

        <a
          href="https://zalo.me/0987453866"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-300 relative group overflow-hidden border border-slate-200"
          aria-label="Nhắn tin Zalo"
        >
          <img src="/images/zalo-icon.svg" alt="Zalo" className="w-9 h-9 object-contain" />
          <span className="absolute right-16 bg-slate-900 text-white px-3 py-1.5 rounded-xl text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-lg">
            Chat Zalo
          </span>
        </a>
      </div>
    </div>
  );
}
