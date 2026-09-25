export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/resources/software',
  },
  title: 'Software | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Software by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Software" 
      category="VNPIS Solutions"
    />
  );
}
