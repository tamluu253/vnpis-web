export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/services',
  },
  title: 'Services | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Services by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Services" 
      category="VNPIS Solutions"
    />
  );
}
