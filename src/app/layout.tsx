import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/lead-gen/FloatingContact';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'VNPIS | Industrial Printing Solutions',
  description: 'Enterprise B2B provider of QR Code Printing, Variable Data Printing, RFID, and Industrial Ink Solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={\`\${inter.variable} font-sans flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased\`}>
        <Header />
        <main className="flex-grow pt-20">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
