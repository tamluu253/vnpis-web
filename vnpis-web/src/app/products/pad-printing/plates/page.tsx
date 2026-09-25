export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/pad-printing/plates',
  },
  title: 'Plates | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Plates by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Plates" 
      category="VNPIS Solutions"
    />
  );
}
