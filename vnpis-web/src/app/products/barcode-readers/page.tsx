export const dynamicParams = true;
import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/barcode-readers',
  },
  title: 'Barcode Readers | VNPIS Industrial Solutions',
  description: 'Enterprise solutions for Barcode Readers by VNPIS.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Barcode Readers" 
      category="VNPIS Solutions"
    />
  );
}
