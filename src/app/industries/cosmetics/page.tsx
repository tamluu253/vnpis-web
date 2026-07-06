import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Cosmetics | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Cosmetics by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Cosmetics" 
      category="VNPIS Solutions"
    />
  );
}
