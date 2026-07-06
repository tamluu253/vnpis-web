import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Products | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Products by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Products" 
      category="VNPIS Solutions"
    />
  );
}
