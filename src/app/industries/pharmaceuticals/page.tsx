import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Pharmaceuticals | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Pharmaceuticals by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Pharmaceuticals" 
      category="VNPIS Solutions"
    />
  );
}
