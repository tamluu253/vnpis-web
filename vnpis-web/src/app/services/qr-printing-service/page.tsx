export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/services/qr-printing-service',
  },
  title: 'Qr Printing Service | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Qr Printing Service by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Qr Printing Service" 
      category="VNPIS Solutions"
    />
  );
}
