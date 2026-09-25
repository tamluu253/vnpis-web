import { Metadata } from 'next';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://vnpis.com/products/rfid-warehouse-sme',
  },
};

export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function RfidWarehouseRedirect() {
  redirect('/products/consumables');
}
