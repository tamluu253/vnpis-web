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
        "description": "Chuyên gia công in tampon 1 màu, máy in tampon 1 màu, in lụa giá rẻ, in kỹ thuật số dữ liệu biến đổi QR/Barcode. Cung cấp máy in & mực in công nghiệp CIJ, TIJ chính hãng tại TP.HCM.",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng",
          "addressLocality": "TP. Hồ Chí Minh",
          "addressRegion": "TP.HCM",
          "postalCode": "700000",
          "addressCountry": "VN"
        },
        "sameAs": [
          "https://zalo.me/0987453866"
        ]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://vnpis.com/#localbusiness",
        "name": "Công ty TNHH VNPIS - Máy In Tampon 1 Màu & In Ấn Công Nghiệp",
        "image": "https://vnpis.com/images/vnpis-logo.png",
        "url": "https://vnpis.com",
        "telephone": "0987453866",
        "email": "info@vnpis.com",
        "priceRange": "$$",
        "hasMap": "https://www.google.com/maps/search/?api=1&query=18+Đường+số+4,+KDC+Đại+Phúc+Green+Villas,+Xã+Bình+Hưng,+TP.+Hồ+Chí+Minh",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng",
          "addressLocality": "TP. Hồ Chí Minh",
          "addressRegion": "TP.HCM",
          "postalCode": "700000",
          "addressCountry": "VN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 10.7289,
          "longitude": 106.6663
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "description": "Tổng kho thiết bị máy in tampon 1 màu, máy in lụa công nghiệp, vật tư in tampon, mực in CIJ, TIJ chính hãng tại TP.HCM. Xưởng gia công in tampon ly nhựa, chai lọ, linh kiện.",
        "areaServed": {
          "@type": "Country",
          "name": "Vietnam"
        }
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
