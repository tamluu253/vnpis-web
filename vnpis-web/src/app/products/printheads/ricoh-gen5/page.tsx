export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/printheads/ricoh-gen5',
  },
  title: 'Ricoh Gen5 | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Ricoh Gen5 by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Ricoh Gen5" 
      category="VNPIS Solutions"
    />
  );
}
