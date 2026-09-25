export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/printheads/epson-i3200',
  },
  title: 'Epson I3200 | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Epson I3200 by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Epson I3200" 
      category="VNPIS Solutions"
    />
  );
}
