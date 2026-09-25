import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/kien-thuc',
  },
};

export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function KienThucPage() {
  redirect('/blog');
}
