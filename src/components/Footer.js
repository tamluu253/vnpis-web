import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 border-t-4 border-orange-500">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">VỀ VNPIS</h3>
          <p className="mb-4">VNPIS - Cung cấp giải pháp in ấn dữ liệu biến đổi, QR code, mã vạch, và thiết bị in công nghiệp hàng đầu tại Việt Nam.</p>
          <div className="flex space-x-4">
            {/* Social Icons placeholder */}
            <a href="#" className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center hover:bg-orange-500 transition-colors">
              <span className="sr-only">Facebook</span>
              FB
            </a>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">LIÊN KẾT NHANH</h3>
          <ul className="space-y-2">
            <li><Link href="/gioi-thieu" className="hover:text-orange-500 transition-colors">Giới thiệu</Link></li>
            <li><Link href="/san-pham" className="hover:text-orange-500 transition-colors">Sản phẩm &amp; Giải pháp</Link></li>
            <li><Link href="/ho-tro" className="hover:text-orange-500 transition-colors">Hỗ trợ kỹ thuật</Link></li>
            <li><Link href="/lien-he" className="hover:text-orange-500 transition-colors">Liên hệ</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-4 border-b border-gray-700 pb-2">LIÊN HỆ</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">📍</span>
              <span>Địa chỉ văn phòng VNPIS</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">📞</span>
              <span>Hotline: 0909718296</span>
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">✉️</span>
              <span>Email: support@vnpis.com</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="container mx-auto px-4 mt-8 pt-4 border-t border-gray-800 text-center text-sm">
        &copy; {new Date().getFullYear()} VNPIS. All rights reserved.
      </div>
    </footer>
  )
}
