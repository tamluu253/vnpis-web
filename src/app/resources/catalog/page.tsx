import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Catalog | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Catalog by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Catalog" 
      category="VNPIS Solutions"
    />
  );
}
