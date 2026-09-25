export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/pad-screen-supplies',
  },
  title: 'Pad Screen Supplies | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Pad Screen Supplies by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Pad Screen Supplies" 
      category="VNPIS Solutions"
    />
  );
}
