export const dynamicParams = true;
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Chính Sách Bảo Mật | VNPIS',
  description: 'Chính sách bảo mật thông tin khách hàng và dữ liệu doanh nghiệp tại Công ty TNHH VNPIS.',
};

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <div className="pt-32 pb-20 container mx-auto px-4 max-w-4xl">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-slate-200">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Chính Sách Bảo Mật Thông Tin</h1>
          <p className="text-slate-500 text-sm mb-8">Cập nhật lần cuối: Ngày 10 tháng 08 năm 2026</p>

          <div className="prose prose-slate max-w-none space-y-6 leading-relaxed">
            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">1. Thu Thập Thông Tin Khách Hàng</h2>
            <p>
              Công ty TNHH VNPIS (MST: 0318266611) cam kết bảo mật tuyệt đối các thông tin cá nhân và dữ liệu doanh nghiệp do Quý khách hàng cung cấp khi truy cập website vnpis.com hoặc đăng ký nhận báo giá dịch vụ gia công in ấn và thiết bị công nghiệp.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">2. Mục Đích Sử Dụng Thông Tin</h2>
            <p>Các thông tin như Tên doanh nghiệp, Số điện thoại (Hotline/Zalo), Email và Nhu cầu gia công sản phẩm chỉ được sử dụng cho các mục đích:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Tư vấn giải pháp kỹ thuật, báo giá máy in Pad, máy in Lụa, Single Pass và vật tư in TIJ/CIJ.</li>
              <li>Hỗ trợ kỹ thuật cứu hộ đầu in phun và khảo sát phôi in thực tế tại xưởng.</li>
              <li>Gửi thông báo tiến độ đơn hàng B2B và cập nhật tài liệu kỹ thuật MSDS.</li>
            </ul>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">3. Cam Kết Không Chia Sẻ Dữ Liệu</h2>
            <p>
              VNPIS tôn trọng quyền riêng tư của doanh nghiệp. Chúng tôi tuyệt đối không bán, trao đổi hoặc tiết lộ thông tin của Quý khách cho bên thứ ba ngoại trừ trường hợp có yêu cầu chính thức từ cơ quan pháp luật Việt Nam.
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-6 mb-3">4. Thông Tin Liên Hệ Bảo Mật</h2>
            <p>Mọi thắc mắc liên quan đến dữ liệu cá nhân, Quý khách vui lòng liên hệ:</p>
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 mt-4 space-y-2">
              <p className="font-bold text-slate-900">Công ty TNHH VNPIS</p>
              <p></p>
              <p>Trụ sở chính: Tầng 1, 202 Lê Lai, Phường Bến Thành, TP. Hồ Chí Minh</p>
              <p>Hotline/Zalo 24/7: 0987 453 866 | Email: info@vnpis.com</p>
            </div>
          </div>

          <div className="mt-10 pt-6 border-t border-slate-100 flex justify-between items-center">
            <Link href="/" className="text-blue-600 font-bold hover:underline">
              &larr; Quay lại trang chủ
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
