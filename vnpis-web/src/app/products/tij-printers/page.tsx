export const dynamicParams = true;
import { redirect } from 'next/navigation';

export default function TijPrintersRedirect() {
  redirect('/products/tij-ink');
}
