export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/printheads/kodak-s5',
  },
  title: 'Kodak S5 | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Kodak S5 by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Kodak S5" 
      category="VNPIS Solutions"
    />
  );
}
