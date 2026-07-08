import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Machine Repair | VNPIS',
  description: 'Machine Repair by VNPIS Industrial Solutions.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Machine Repair" 
      category="Dịch Vụ"
    />
  );
}
