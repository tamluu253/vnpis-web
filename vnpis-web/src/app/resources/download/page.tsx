export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/resources/download',
  },
  title: 'Download | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Download by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Download" 
      category="VNPIS Solutions"
    />
  );
}
