import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 86400,
  },
  turbopack: {
    root: path.join(process.cwd(), '..'),
  },
  staticPageGenerationTimeout: 180,
  outputFileTracingIncludes: {
    '/**': ['./content/**/*'],
  },
  outputFileTracingRoot: path.join(process.cwd(), '..'),
  async redirects() {
    return [
      {
        source: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-gia-re-in-ly-nhua',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-gia-re-in-nap-chai',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-gia-re-nganh-do-choi',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-in-bong-den-led',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-in-vo-binh-nuoc-20l',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-linh-kien-dien-tu',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/may-in-tampon-1-mau-vo-hop-my-pham',
        destination: '/blog/may-in-tampon-1-mau-gia-re-da-nang-cho-moi-chat-lieu',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-kinh-cuong-luc-nganh-duoc-pham',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-kinh-cuong-luc-nganh-linh-kien-o-to',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-mang-bopp-nganh-dien-tu',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-mang-bopp-nganh-logistics',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-mang-bopp-nganh-vat-lieu-xay-dung',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-nhua-pet-nganh-nong-san',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-nhua-pet-nganh-vat-lieu-xay-dung',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-ong-cao-su-nganh-co-khi',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-ong-cao-su-nganh-my-pham',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-thep-khong-gi-nganh-duoc-pham',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-thep-khong-gi-nganh-nong-san',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-cij-cho-vai-khong-det-nganh-my-pham',
        destination: '/blog/cam-nang-chon-muc-in-cij-cho-moi-vat-lieu-va-nganh-cong-nghiep',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-day-cap-quang-nganh-duoc-pham',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-day-cap-quang-nganh-thuc-pham',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-go-cong-nghiep-nganh-logistics',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-go-cong-nghiep-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-kinh-cuong-luc-nganh-my-pham',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-mach-dien-tu-pcb-nganh-linh-kien-o-to',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-mach-dien-tu-pcb-nganh-nong-san',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-mach-dien-tu-pcb-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-mang-bopp-nganh-co-khi',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-ong-cao-su-nganh-my-pham',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-vai-khong-det-nganh-dien-tu',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-dod-cho-vai-khong-det-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-bao-bi-giay-nganh-dien-tu',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-bao-bi-giay-nganh-linh-kien-o-to',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-day-cap-quang-nganh-nong-san',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-day-cap-quang-nganh-thuc-pham',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-mach-dien-tu-pcb-nganh-nong-san',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-mang-bopp-nganh-logistics',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-nhua-pet-nganh-co-khi',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-ong-cao-su-nganh-do-uong',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-ong-cao-su-nganh-vat-lieu-xay-dung',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-thep-khong-gi-nganh-do-uong',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-thep-khong-gi-nganh-thuc-pham',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-thep-khong-gi-nganh-vat-lieu-xay-dung',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-tij-cho-vai-khong-det-nganh-do-uong',
        destination: '/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-day-cap-quang-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-mach-dien-tu-pcb-nganh-linh-kien-o-to',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-nhua-pet-nganh-nong-san',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-nhua-pet-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-ong-cao-su-nganh-thuc-pham',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-thep-khong-gi-nganh-do-uong',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/muc-in-uv-cho-vai-khong-det-nganh-vat-lieu-xay-dung',
        destination: '/blog/muc-in-phun-cong-nghiep-dod-cho-vat-lieu-xay-dung-va-ong-dan',
        permanent: true,
      },
      {
        source: '/blog/week_01_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_01_vnpis_02',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_01_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_02_vnpis_01',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_02_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_02_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_03_vnpis_01',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_03_vnpis_02',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_03_vnpis_03',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_04_vnpis_01',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_04_vnpis_02',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_04_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_05_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_05_vnpis_02',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_05_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_06_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_06_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_06_vnpis_03',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_07_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_07_vnpis_02',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_07_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_08_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_08_vnpis_02',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_08_vnpis_03',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_09_vnpis_01',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_09_vnpis_02',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_09_vnpis_03',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_10_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_10_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_10_vnpis_03',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_11_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_11_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_11_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_12_vnpis_01',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_12_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_12_vnpis_03',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_13_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_13_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_13_vnpis_03',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_14_vnpis_01',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_14_vnpis_02',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_14_vnpis_03',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_15_vnpis_01',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_15_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_15_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_16_vnpis_01',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_16_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_16_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_17_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_17_vnpis_02',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_17_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_18_vnpis_01',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_18_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_18_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_19_vnpis_01',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_19_vnpis_02',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_19_vnpis_03',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_20_vnpis_01',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_20_vnpis_02',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_20_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_21_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_21_vnpis_02',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_21_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_22_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_22_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_22_vnpis_03',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_23_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_23_vnpis_02',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_23_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_24_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_24_vnpis_02',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_24_vnpis_03',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_25_vnpis_01',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_25_vnpis_02',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_25_vnpis_03',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_26_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_26_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_26_vnpis_03',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_27_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_27_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_27_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_28_vnpis_01',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_28_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_28_vnpis_03',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_29_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_29_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_29_vnpis_03',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_30_vnpis_01',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_30_vnpis_02',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_30_vnpis_03',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_31_vnpis_01',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_31_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_31_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_32_vnpis_01',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_32_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_32_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_33_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_33_vnpis_02',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_33_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_34_vnpis_01',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_34_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_34_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_35_vnpis_01',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_35_vnpis_02',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_35_vnpis_03',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_36_vnpis_01',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_36_vnpis_02',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_36_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_37_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_37_vnpis_02',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_37_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_38_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_38_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_38_vnpis_03',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_39_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_39_vnpis_02',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_39_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_40_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_40_vnpis_02',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_40_vnpis_03',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_41_vnpis_01',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_41_vnpis_02',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_41_vnpis_03',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_42_vnpis_01',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_42_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_42_vnpis_03',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_43_vnpis_01',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_43_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_43_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_44_vnpis_01',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_44_vnpis_02',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_44_vnpis_03',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_45_vnpis_01',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_45_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_45_vnpis_03',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_46_vnpis_01',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_46_vnpis_02',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_46_vnpis_03',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_47_vnpis_01',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_47_vnpis_02',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_47_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/blog/week_48_vnpis_01',
        destination: '/blog/hop-muc-tij-12-7mm-hp45-in-date-nhanh-kho',
        permanent: true,
      },
      {
        source: '/blog/week_48_vnpis_02',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_48_vnpis_03',
        destination: '/blog/dung-moi-mek-ethanol-cho-may-in-date-cij',
        permanent: true,
      },
      {
        source: '/blog/week_49_vnpis_01',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_49_vnpis_02',
        destination: '/blog/so-sanh-muc-in-tampon-henkey-pet8000-ppex-sapvc',
        permanent: true,
      },
      {
        source: '/blog/week_49_vnpis_03',
        destination: '/blog/combo-vat-tu-in-tampon-ban-thep-coc-muc-ceramic',
        permanent: true,
      },
      {
        source: '/blog/week_50_vnpis_01',
        destination: '/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
        permanent: true,
      },
      {
        source: '/blog/week_50_vnpis_02',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_50_vnpis_03',
        destination: '/blog/cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        permanent: true,
      },
      {
        source: '/blog/week_51_vnpis_01',
        destination: '/blog/bang-chon-luoi-in-lua-mesh-count-80t-165t',
        permanent: true,
      },
      {
        source: '/blog/week_51_vnpis_02',
        destination: '/blog/dao-gat-muc-squeegee-pu-in-lua',
        permanent: true,
      },
      {
        source: '/blog/week_51_vnpis_03',
        destination: '/blog/top-5-may-in-tampon-coc-muc-kin',
        permanent: true,
      },
      {
        source: '/blog/week_52_vnpis_01',
        destination: '/blog/may-in-lua-tru-tron-chai-lo-thuy-tinh',
        permanent: true,
      },
      {
        source: '/blog/week_52_vnpis_02',
        destination: '/blog/may-in-lua-phang-ban-tu-dong',
        permanent: true,
      },
      {
        source: '/blog/week_52_vnpis_03',
        destination: '/blog/bao-gia-may-in-uv-single-pass-carton',
        permanent: true,
      },
      {
        source: '/products/consumables/accessories',
        destination: '/products/consumables/coc-muc-vong-gat-muc',
        permanent: true,
      },
      {
        source: '/products/consumables/coc-muc',
        destination: '/products/consumables/coc-muc-vong-gat-muc',
        permanent: true,
      },
      {
        source: '/products/consumables/vong-gat-muc',
        destination: '/products/consumables/coc-muc-vong-gat-muc',
        permanent: true,
      },
      {
        source: '/products/consumables/tam-lot-khay-muc',
        destination: '/products/consumables/coc-muc-vong-gat-muc',
        permanent: true,
      },
      {
        source: '/products/consumables/inks',
        destination: '/products/consumables/muc-in',
        permanent: true,
      },
      {
        source: '/products/consumables/pads',
        destination: '/products/consumables/dau-in-silicone',
        permanent: true,
      },
      {
        source: '/products/consumables/plates',
        destination: '/products/consumables/khuon-in',
        permanent: true,
      },
      {
        source: '/products/consumables/additives',
        destination: '/products/consumables/phu-gia-dung-moi',
        permanent: true,
      },
      {
        source: '/in-tampon/hj',
        destination: '/products/pad-printers/hj',
        permanent: true,
      },
      {
        source: '/in-tampon/mc',
        destination: '/products/pad-printers/mc',
        permanent: true,
      },
      {
        source: '/kien-thuc/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/kien-thuc',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/kien-thuc/index',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/kien-thuc/index.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/bai-viet/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
      {
        source: '/ebook-in-pad',
        destination: '/so-tay-in-pad',
        permanent: true,
      },
      {
        source: '/products/cij-printers',
        destination: '/products/cij-ink',
        permanent: true,
      },
      {
        source: '/products/rfid-warehouse-sme',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/products/tij-printers',
        destination: '/products/tij-ink',
        permanent: true,
      },
      {
        source: '/index.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/index',
        destination: '/',
        permanent: true,
      },
      {
        source: '/in-tampon-gia-re',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/products/pad-printing',
        destination: '/in-tampon',
        permanent: true,
      },
      {
        source: '/in-lua-gia-re',
        destination: '/in-lua',
        permanent: true,
      },
      {
        source: '/bai-viet',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tin-tuc.html',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/dich-vu.html',
        destination: '/services',
        permanent: true,
      },
      {
        source: '/quy-trinh.html',
        destination: '/',
        permanent: true,
      },
      {
        source: '/vat-tu.html',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/chinh-sach.html',
        destination: '/terms-of-service',
        permanent: true,
      },
      {
        source: '/gioi-thieu.html',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/lien-he.html',
        destination: '/contact',
        permanent: true,
      },
      {
        source: '/dich-vu-in-gia-cong-xua-chua-cai-tien-may.html',
        destination: '/dich-vu-in-gia-cong',
        permanent: true,
      },
      {
        source: '/dich-vu-in-gia-cong-sua-chua-cai-tien-may.html',
        destination: '/dich-vu-in-gia-cong',
        permanent: true,
      },
      {
        source: '/in-qr-cho-nha-may.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/giai-phap-in-du-lieu-bien-doi.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/in-du-lieu-bien-doi.html',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/muc-in-ohuyen-du-lieu-bien-doi-single-pass-ink/:path*',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-ohuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink/:path*',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/muc-in-chuyen-du-lieu-bien-doi-single-pass-ink',
        destination: '/solutions/uv-single-pass-printing',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun/:path*',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/linh-kien-vat-tu-may-in-phun',
        destination: '/products/consumables',
        permanent: true,
      },
      {
        source: '/mayin-phun-cong-nghiep/:path*',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/mayin-phun-cong-nghiep',
        destination: '/in-ky-thuat-so',
        permanent: true,
      },
      {
        source: '/category/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/tag/:path*',
        destination: '/blog',
        permanent: true,
      },
      {
        source: '/:path*.html',
        destination: '/blog',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
