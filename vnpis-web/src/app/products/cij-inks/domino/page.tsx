export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/cij-inks/domino',
  },
  title: 'Domino | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Domino by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Domino" 
      category="VNPIS Solutions"
    />
  );
}
