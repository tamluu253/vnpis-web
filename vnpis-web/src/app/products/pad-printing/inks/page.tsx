export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/pad-printing/inks',
  },
  title: 'Inks | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Inks by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Inks" 
      category="VNPIS Solutions"
    />
  );
}
