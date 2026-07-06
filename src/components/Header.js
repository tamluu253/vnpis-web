import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            {/* Sử dụng thẻ img trực tiếp để load ảnh từ thư mục public */}
            <img src="/images/vnpis-logo.png" alt="VNPIS Logo" className="h-12 w-auto" />
          </Link>
        </div>
        
        <nav className="hidden md:flex space-x-8 font-medium">
          <Link href="/" className="text-gray-800 hover:text-orange-500 transition-colors">TRANG CHỦ</Link>
          <Link href="/gioi-thieu" className="text-gray-800 hover:text-orange-500 transition-colors">GIỚI THIỆU</Link>
          <div className="relative group">
            <Link href="/san-pham" className="text-gray-800 hover:text-orange-500 transition-colors">SẢN PHẨM / GIẢI PHÁP</Link>
          </div>
          <Link href="/nganh-ung-dung" className="text-gray-800 hover:text-orange-500 transition-colors">NGÀNH ỨNG DỤNG</Link>
          <Link href="/tin-tuc-and-kien-thuc" className="text-gray-800 hover:text-orange-500 transition-colors">TIN TỨC</Link>
          <Link href="/lien-he" className="text-gray-800 hover:text-orange-500 transition-colors">LIÊN HỆ</Link>
        </nav>

        <div className="md:hidden">
          {/* Nút menu mobile - sẽ code chức năng sau */}
          <button className="text-gray-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}
