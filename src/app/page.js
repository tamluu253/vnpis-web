import Link from 'next/link'
import { getAllPosts } from '@/lib/api'
import { ArrowRight, Printer, Cpu, ShieldCheck } from 'lucide-react'

export default function Home() {
  const posts = getAllPosts(['title', 'slug', 'description']).slice(0, 6)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://media.loveitopcdn.com/5274/Tam%20cosota%20ai.jpg')] bg-cover bg-center mix-blend-overlay"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Giải Pháp <span className="text-orange-500">In Dữ Liệu Biến Đổi</span> Tối Ưu Cho Doanh Nghiệp
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Nền tảng cung cấp thiết bị, vật tư và giải pháp công nghệ in ấn – mã hóa – tự động hóa hàng đầu tại Việt Nam.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="/san-pham" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-md font-medium text-center transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30">
                Khám Phá Giải Pháp
              </Link>
              <Link href="/lien-he" className="bg-white/10 hover:bg-white/20 text-white border border-white/30 px-8 py-3 rounded-md font-medium text-center transition-all backdrop-blur-sm">
                Nhận Tư Vấn Ngay
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dịch vụ nổi bật */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sản Phẩm & Dịch Vụ Chủ Lực</h2>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <Printer size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Máy In Công Nghiệp</h3>
              <p className="text-gray-600 mb-4">Cung cấp các dòng máy in CIJ, TIJ, UV, Laser độ bền cao, tốc độ in vượt trội cho dây chuyền sản xuất.</p>
              <Link href="/mayin-phun-cong-nghiep" className="text-orange-500 font-medium inline-flex items-center group-hover:underline">
                Xem chi tiết <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">In QR & Chống Giả</h3>
              <p className="text-gray-600 mb-4">Giải pháp in mã QR số lượng lớn, in dữ liệu biến đổi chống hàng giả, truy xuất nguồn gốc chính xác.</p>
              <Link href="/in-qr-cho-nha-may" className="text-orange-500 font-medium inline-flex items-center group-hover:underline">
                Xem chi tiết <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="p-8 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100 group">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                <Cpu size={28} />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Chip RFID</h3>
              <p className="text-gray-600 mb-4">Ứng dụng công nghệ RFID trong quản lý kho bãi, theo dõi tài sản và tự động hóa chuỗi cung ứng.</p>
              <Link href="/ung-dung-chip-rfid" className="text-orange-500 font-medium inline-flex items-center group-hover:underline">
                Xem chi tiết <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Danh sách bài viết mới */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Tin Tức & Kiến Thức</h2>
              <div className="w-24 h-1 bg-orange-500 rounded-full"></div>
            </div>
            <Link href="/tin-tuc-and-kien-thuc" className="hidden sm:inline-flex items-center text-gray-600 hover:text-orange-500 font-medium transition-colors">
              Xem tất cả <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link href={`/${post.slug}`} key={post.slug} className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
                    {post.description || "Nhấn để xem chi tiết bài viết và giải pháp kỹ thuật."}
                  </p>
                  <div className="text-orange-500 font-medium inline-flex items-center mt-auto">
                    Đọc tiếp <ArrowRight size={16} className="ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/tin-tuc-and-kien-thuc" className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 w-full">
              Xem tất cả bài viết
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
