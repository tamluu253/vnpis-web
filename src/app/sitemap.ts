import { MetadataRoute } from 'next';

const DOMAIN = 'https://vnpis.com';

const blogSlugs = [
  "giai-phap-in-truc-tiep-len-vo-trung-ga-muc-he01",
  "muc-in-lop-xe-dzwav-chiu-nhiet-luu-hoa",
  "muc-cij-k12-chiu-nhiet-121-do-luoc-soi",
  "muc-in-tang-hinh-t03-chong-hang-gia",
  "muc-tij-hf200-kho-nhanh-sieu-net",
  "muc-bam-dinh-sieu-cuong-k15-khong-halogen",
  "muc-in-day-cap-trang-linx-videojet",
  "muc-in-chai-thuy-tinh-uot-lanh",
  "muc-in-tij-bao-bi-bim-bim-snack",
  "muc-khang-con-alcohol-resistant-ink",
  "muc-do-cij-reda-in-nhua-toi-mau",
  "muc-in-ong-pe-ong-nhua",
  "muc-nuoc-tij-hw-in-carton",
  "muc-in-nhua-pvc-vang-trang",
  "muc-tij-tuy-bien-ma-vach",
  "muc-xanh-la-green-ink",
  "muc-in-tij-tieu-chuan-fda",
  "muc-in-tu-dong-hoa-robot",
  "muc-khang-dau-t09-in-kim-loai",
  "giai-phap-in-date-gia-re-hieu-qua"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${DOMAIN}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: `${DOMAIN}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${DOMAIN}/products/special-inks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/products/cij-ink`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/products/tij-ink`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${DOMAIN}/products/uv-printers`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...blogEntries,
  ];
}
