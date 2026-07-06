import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Printheads | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Printheads by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Printheads" 
      category="VNPIS Solutions"
    />
  );
}
