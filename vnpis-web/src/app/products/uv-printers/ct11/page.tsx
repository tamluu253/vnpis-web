export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/uv-printers/ct11',
  },
  title: 'Ct11 | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Ct11 by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Ct11" 
      category="VNPIS Solutions"
    />
  );
}
