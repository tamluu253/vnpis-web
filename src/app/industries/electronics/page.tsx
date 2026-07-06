import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Electronics | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Electronics by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Electronics" 
      category="VNPIS Solutions"
    />
  );
}
