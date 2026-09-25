export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/resources',
  },
  title: 'Resources | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Resources by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Resources" 
      category="VNPIS Solutions"
    />
  );
}
