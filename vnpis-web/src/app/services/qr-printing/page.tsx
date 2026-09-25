export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/services/qr-printing',
  },
  title: 'Qr Printing | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Qr Printing by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Qr Printing" 
      category="VNPIS Solutions"
    />
  );
}
