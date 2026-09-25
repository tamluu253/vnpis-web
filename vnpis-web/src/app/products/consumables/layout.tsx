import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/consumables',
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
