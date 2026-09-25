import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/cij-printers',
  },
};

export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function CijPrintersRedirect() {
  redirect('/products/cij-ink');
}
