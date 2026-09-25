export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/pad-screen-machines',
  },
  title: 'Pad Screen Machines | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Pad Screen Machines by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Pad Screen Machines" 
      category="VNPIS Solutions"
    />
  );
}
