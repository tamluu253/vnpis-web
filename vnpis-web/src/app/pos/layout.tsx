import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/pos',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
