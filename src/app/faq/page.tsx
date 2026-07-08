import LandingPage from '@/components/templates/LandingPage';

export const metadata = {
  title: 'Câu Hỏi Thường Gặp | VNPIS',
  description: 'Câu Hỏi Thường Gặp by VNPIS Industrial Solutions.',
};

export default function Page() {
  return (
    <LandingPage 
      title="Câu Hỏi Thường Gặp" 
      category="Kiến Thức"
    />
  );
}
