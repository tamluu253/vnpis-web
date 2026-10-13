'use client';

import React, { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';

interface CopyLinkButtonProps {
  hash?: string;
  urlPath?: string;
  itemTitle?: string;
  variant?: 'button' | 'icon' | 'compact';
  className?: string;
}

export default function CopyLinkButton({
  hash = '',
  urlPath,
  itemTitle = '',
  variant = 'button',
  className = ''
}: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (typeof window === 'undefined') return;

    let fullUrl = '';
    const origin = window.location.origin;

    if (urlPath) {
      // Ensure leading slash
      const cleanPath = urlPath.startsWith('/') ? urlPath : `/${urlPath}`;
      fullUrl = `${origin}${cleanPath}${hash ? (hash.startsWith('#') ? hash : `#${hash}`) : ''}`;
    } else {
      const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
      fullUrl = `${origin}${window.location.pathname}${cleanHash}`;
    }

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(fullUrl);
      } else {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = fullUrl;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2200);

      // If hash provided and element exists on current page, smooth scroll
      if (hash && typeof window !== 'undefined') {
        const id = hash.replace(/^#/, '');
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  if (variant === 'icon') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        title={copied ? "Đã chép liên kết!" : `Sao chép link ${itemTitle || 'sản phẩm'}`}
        className={`p-2 rounded-lg transition-all border ${
          copied 
            ? 'bg-emerald-600 text-white border-emerald-600' 
            : 'bg-white hover:bg-slate-100 text-slate-500 hover:text-slate-800 border-slate-200'
        } ${className}`}
        aria-label="Sao chép link chia sẻ"
      >
        {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        type="button"
        onClick={handleCopy}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-lg transition-all border ${
          copied
            ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
            : 'bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-slate-200'
        } ${className}`}
        title={`Sao chép link ${itemTitle || 'sản phẩm'}`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5" />
            <span>Đã sao chép!</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Chia sẻ</span>
          </>
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-bold rounded-xl transition-all border ${
        copied
          ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm ring-2 ring-emerald-200'
          : 'bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 border-slate-200 hover:border-slate-300 shadow-sm'
      } ${className}`}
      title={copied ? "Đã lưu vào bộ nhớ tạm" : `Sao chép liên kết ${itemTitle || 'sản phẩm'}`}
    >
      {copied ? (
        <>
          <Check className="w-3.5 h-3.5 text-white" />
          <span>Đã sao chép link!</span>
        </>
      ) : (
        <>
          <Copy className="w-3.5 h-3.5 text-slate-500" />
          <span>Sao chép link</span>
        </>
      )}
    </button>
  );
}
