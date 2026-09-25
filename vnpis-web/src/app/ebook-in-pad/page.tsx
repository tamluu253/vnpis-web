import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/ebook-in-pad',
  },
};

import { redirect } from 'next/navigation';

export default function EbookInPadRedirect() {
  redirect('/so-tay-in-pad');
}
