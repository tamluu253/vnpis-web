import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Machine Rental | VNPIS',
  description: 'Machine Rental by VNPIS Industrial Solutions.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Machine Rental" 
      category="Dịch Vụ"
    />
  );
}
