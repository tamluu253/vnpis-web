export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function RfidWarehouseRedirect() {
  redirect('/products/consumables');
}
