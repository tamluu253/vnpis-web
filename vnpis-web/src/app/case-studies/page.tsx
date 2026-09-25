export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/case-studies',
  },
  title: 'Case Studies | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Case Studies by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Case Studies" 
      category="VNPIS Solutions"
    />
  );
}
