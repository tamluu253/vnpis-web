export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/laser-printers',
  },
  title: 'Laser Printers | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Laser Printers by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Laser Printers" 
      category="VNPIS Solutions"
    />
  );
}
