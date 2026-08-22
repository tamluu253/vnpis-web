// Official B2B Hotline: Mr. Tâm - 0901 836 344 | Email: info@vnpis.com (vnpis-web clean production build)
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingContact from '@/components/lead-gen/FloatingContact';
import GoogleTranslate from '@/components/GoogleTranslate';
import SchemaOrg from '@/components/SchemaOrg';
import { Outfit } from 'next/font/google';
import Script from 'next/script';

const fontMain = Outfit({ subsets: ['latin'], variable: '--font-sans' });

export const metadata = {
  metadataBase: new URL('https://vnpis.com'),
  title: {
    default: 'VNPIS | Xưởng In Tampon, In Lụa, Mực In CIJ & TIJ, In Dữ Liệu Biến Đổi',
    template: '%s | VNPIS - Industrial Printing Solutions',
  },
  description: 'Công ty TNHH VNPIS - Chuyên gia công in tampon, in lụa, in kỹ thuật số dữ liệu biến đổi QR/Barcode. Cung cấp máy in & mực in công nghiệp CIJ, TIJ chính hãng tại TP.HCM. Hotline/Zalo: 0987 453 866.',
  alternates: {
    canonical: './',
  },
  verification: {
    google: 'xQz99KRkCepH0j7LgeoQ2hHqRA4YqEMOw4rP1nHBHH0',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        {/* Google Analytics GA4 cho vnpis.com (G-HGXR16B0NE & G-PGSS2ZC0NZ) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HGXR16B0NE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HGXR16B0NE');
            gtag('config', 'G-PGSS2ZC0NZ');
            gtag('config', 'G-Y2MV182611');
          `}
        </Script>

        {/* Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '920561344403244');
            fbq('track', 'PageView');
          `}
        </Script>
      </head>
      <body className={`${fontMain.variable} font-sans flex flex-col min-h-screen bg-slate-50 text-slate-900 antialiased`}>
        <SchemaOrg />
        <GoogleTranslate />
        <Header />
        <main className="flex-grow pt-20 lg:pt-24">
          {children}
        </main>
        <Footer />
        <FloatingContact />
      </body>
    </html>
  );
}
