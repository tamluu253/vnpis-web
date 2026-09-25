export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/uv-printers/ct21',
  },
  title: 'Ct21 | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Ct21 by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Ct21" 
      category="VNPIS Solutions"
    />
  );
}
