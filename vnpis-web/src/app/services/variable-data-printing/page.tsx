export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/services/variable-data-printing',
  },
  title: 'Variable Data Printing | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Variable Data Printing by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Variable Data Printing" 
      category="VNPIS Solutions"
    />
  );
}
