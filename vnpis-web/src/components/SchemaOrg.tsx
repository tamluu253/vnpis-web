import React from 'react';

export default function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://vnpis.com/#organization",
        "name": "Công ty TNHH VNPIS",
        "url": "https://vnpis.com",
        "logo": "https://vnpis.com/images/vnpis-logo.png",
        "telephone": "0987453866",
        "email": "info@vnpis.com",
        "description": "Chuyên gia công in tampon, in lụa, in kỹ thuật số dữ liệu biến đổi QR/Barcode. Cung cấp máy in & mực in công nghiệp CIJ, TIJ chính hãng tại TP.HCM.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng",
          "addressLocality": "TP. Hồ Chí Minh",
          "addressCountry": "VN"
        },
        "sameAs": [
          "https://zalo.me/0987453866"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://vnpis.com/#localbusiness",
        "name": "Công ty TNHH VNPIS - Giải Pháp In Ấn Công Nghiệp",
        "image": "https://vnpis.com/images/vnpis-logo.png",
        "url": "https://vnpis.com",
        "telephone": "0987453866",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng",
          "addressLocality": "TP. Hồ Chí Minh",
          "addressCountry": "VN"
        },
        "description": "Xưởng gia công in Tampon, in Lụa, in KTS dữ liệu biến đổi VDP và phân phối mực in công nghiệp CIJ, TIJ.",
        "priceRange": "$$"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
