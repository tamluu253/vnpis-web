export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/cij-inks/hitachi',
  },
  title: 'Hitachi | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Hitachi by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Hitachi" 
      category="VNPIS Solutions"
    />
  );
}
