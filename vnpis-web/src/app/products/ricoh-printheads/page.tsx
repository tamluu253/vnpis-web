export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/ricoh-printheads',
  },
  title: 'Ricoh Printheads | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Ricoh Printheads by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Ricoh Printheads" 
      category="VNPIS Solutions"
    />
  );
}
