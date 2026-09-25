import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/tij-printers',
  },
};

export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function TijPrintersRedirect() {
  redirect('/products/tij-ink');
}
