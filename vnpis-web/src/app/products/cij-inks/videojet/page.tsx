export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/cij-inks/videojet',
  },
  title: 'Videojet | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Videojet by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Videojet" 
      category="VNPIS Solutions"
    />
  );
}
