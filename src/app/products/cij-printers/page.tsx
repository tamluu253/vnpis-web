import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'CIJ Printers | VNPIS',
  description: 'CIJ Printers by VNPIS Industrial Solutions.',
};

export default function Page() {
  return (
    <LandingPage 
      title="CIJ Printers" 
      category="Máy In"
    />
  );
}
