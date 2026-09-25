export const dynamicParams = true;
﻿import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/services/uv-printing-service',
  },
  title: 'Uv Printing Service | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Uv Printing Service by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Dịch Vụ In UV" 
      category="VNPIS Solutions"
      externalCtaUrl="https://vnpis.com"
      externalCtaText="Xem bảng giá & Đặt in tại vnpis.com"
    />
  );
}
