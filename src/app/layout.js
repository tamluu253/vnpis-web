import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'VNPIS - In dữ liệu biến đổi',
  description: 'Nền tảng cung cấp thiết bị, vật tư và giải pháp công nghệ in ấn – mã hóa – tự động hóa hàng đầu tại Việt Nam.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
