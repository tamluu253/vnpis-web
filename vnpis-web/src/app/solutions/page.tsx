export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/solutions',
  },
  title: 'Giải Pháp | VNPIS',
  description: 'Giải Pháp by VNPIS Industrial Solutions.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Giải Pháp" 
      category="VNPIS Solutions"
    />
  );
}
