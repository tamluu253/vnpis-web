import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Food | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Food by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Food" 
      category="VNPIS Solutions"
    />
  );
}
