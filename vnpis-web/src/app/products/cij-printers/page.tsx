export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function CijPrintersRedirect() {
  redirect('/products/cij-ink');
}
