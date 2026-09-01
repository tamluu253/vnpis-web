import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight, ExternalLink } from 'lucide-react';

export default function Footer() {
  const mapUrl = "https://www.google.com/maps/search/?api=1&query=PM9J%2BRC+B%C3%ACnh+H%C6%B0ng,+H%E1%BB%93+Ch%C3%AD+Minh,+Vi%E1%BB%87t+Nam";

  return (
    <footer className="bg-slate-950 text-slate-300 pt-20 pb-10 border-t-4 border-blue-600 font-sans">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6 bg-white p-2 rounded-lg">
              <img src="/images/vnpis-logo.png" alt="VNPIS Logo" className="h-10 w-auto" />
            </Link>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              VNPIS là nhà cung cấp hàng đầu về Giải pháp In Công nghiệp, Máy in tampon 1 màu, In Dữ liệu Biến đổi, Mã QR và Tự động hóa cho các nhà máy sản xuất tại Việt Nam.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors text-sm font-bold">
                FB
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors text-sm font-bold">
                YT
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors text-sm font-bold">
                IN
              </a>
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Giải Pháp & Dịch Vụ</h3>
            <ul className="space-y-3">
              <li><Link href="/solutions/uv-single-pass-printing" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> UV Single Pass Printing</Link></li>
              <li><Link href="/solutions/variable-data-printing" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Variable Data Printing</Link></li>
              <li><Link href="/solutions/pad-printing" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Pad Printing</Link></li>
              <li><Link href="/solutions/screen-printing" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Screen Printing</Link></li>
              <li><Link href="/services/pad-printing-service" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Dịch vụ in gia công</Link></li>
            </ul>
          </div>

          {/* Column 3: Products */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Sản Phẩm Cốt Lõi</h3>
            <ul className="space-y-3">
              <li><Link href="/products/pad-printers" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Máy in tampon 1 màu</Link></li>
              <li><Link href="/products/uv-printers" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> UV Printer</Link></li>
              <li><Link href="/products/cij-ink" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> CIJ Ink</Link></li>
              <li><Link href="/products/tij-ink" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> TIJ Ink</Link></li>
              <li><Link href="/products/consumables" className="hover:text-blue-400 transition-colors flex items-center"><ArrowRight className="w-3 h-3 mr-2" /> Vật tư in tampon & in lụa</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-white text-lg font-bold mb-6">Liên Hệ & Bản Đồ</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-sm leading-relaxed space-y-1 block">
                  <strong className="text-white block">CÔNG TY TNHH VNPIS</strong>
                  <span className="text-slate-400 block">Mã số thuế: 0318266611</span>
                  <span className="block mt-2"><strong className="text-slate-200">Trụ sở chính:</strong> Tầng 1, 202 Lê Lai, Phường Bến Thành, TP. Hồ Chí Minh.</span>
                  <span className="block mt-1"><strong className="text-slate-200">Địa điểm KD 1:</strong> 62 Trần Thị Nơi, Phường Chánh Hưng, TP. Hồ Chí Minh.</span>
                  <span className="block mt-1"><strong className="text-slate-200">Địa điểm KD 2:</strong> 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh.</span>
                  <a
                    href={mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-xs font-bold text-blue-400 hover:text-blue-300 mt-2 transition-colors bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800/50"
                  >
                    <span>Mở ứng dụng Google Maps chỉ đường</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                  </a>
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <span className="font-bold text-white text-lg">0987 453 866</span>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                <a href="mailto:info@vnpis.com" className="hover:text-blue-400 transition-colors">info@vnpis.com</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} VNPIS Industrial Solutions. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-slate-300">Chính sách bảo mật</Link>
            <Link href="/terms-of-service" className="hover:text-slate-300">Điều khoản dịch vụ</Link>
            <Link href="/sitemap.xml" className="hover:text-slate-300">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
