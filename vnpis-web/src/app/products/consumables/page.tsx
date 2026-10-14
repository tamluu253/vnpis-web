import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { 
  Settings, Droplet, CircleDot, Layers, Beaker, 
  CheckCircle2, ArrowRight, ShieldCheck, Truck, 
  FlaskConical, Cpu, PhoneCall, MessageSquare, 
  HelpCircle, Clock, Award, FileText, ChevronRight,
  ExternalLink, Sparkles, AlertCircle
} from 'lucide-react';
import accessoriesData from '@/data/accessories.json';
import inksData from '@/data/inks.json';
import ConsumablesQuickBar from '@/components/consumables/ConsumablesQuickBar';
import CopyLinkButton from '@/components/consumables/CopyLinkButton';
import ConsultationForm from '@/components/ui/ConsultationForm';

export const metadata: Metadata = {
  title: 'Tổng Kho Vật Tư In Tampon & In Lụa Công Nghiệp | VNPIS TP.HCM',
  description: 'Tổng kho vật tư máy in tampon (pad printing) & in lụa chính hãng: Mực in cao cấp Dubuit, Henkey, Ruco; Cốc mực kín nam châm CNC; Vòng sứ Zirconia; Vòng thép Tungsten; Đầu in silicone R/Q-Series; Khuôn in chế bản; Dung môi phụ gia. Sẵn kho TP.HCM, giao 2H, đầy đủ CO/CQ.',
  keywords: [
    'vật tư in tampon',
    'vật tư in lụa',
    'cốc mực in tampon',
    'vòng sứ gạt mực',
    'vòng thép gạt mực',
    'đầu in silicone',
    'mực in tampon',
    'khuôn in tampon',
    'dung môi pha mực',
    'tấm lót khay mực',
    'phụ kiện máy in tampon',
    'vật tư in công nghiệp TP.HCM'
  ],
  alternates: {
    canonical: 'https://vnpis.com/products/consumables',
  },
  openGraph: {
    title: 'Tổng Kho Vật Tư In Tampon & In Lụa Công Nghiệp | VNPIS TP.HCM',
    description: 'Cung cấp đồng bộ 500+ mã vật tư & phụ kiện máy in pad, in lụa chính hãng. Sẵn kho TP.HCM, giao hỏa tốc 2H, test mẫu và pha màu miễn phí.',
    url: 'https://vnpis.com/products/consumables',
    siteName: 'VNPIS',
    locale: 'vi_VN',
    type: 'website',
    images: [
      {
        url: 'https://vnpis.com/images/products/accessories/ink-cups.webp',
        width: 800,
        height: 600,
        alt: 'Tổng kho vật tư in tampon và in lụa công nghiệp VNPIS',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tổng Kho Vật Tư In Tampon & In Lụa Công Nghiệp | VNPIS TP.HCM',
    description: 'Cung cấp đồng bộ 500+ mã vật tư máy in pad & in lụa chính hãng: Cốc mực kín, vòng sứ Zirconia, đầu in silicone, mực in, dung môi.',
    images: ['https://vnpis.com/images/products/accessories/ink-cups.webp'],
  },
};

const CATEGORIES_DATA = [
  {
    id: 'coc-muc-vong-gat',
    title: 'Cốc Mực, Vòng Gạt & Tấm Lót Khay',
    shortTitle: 'Cốc Mực & Vòng Gạt',
    badge: 'Sẵn kho đầy đủ size',
    tagline: 'Ø33mm - Ø247mm • Nhôm CNC Nam Châm • Sứ Zirconia • Vonfram Tungsten',
    desc: 'Giải pháp cốc mực kín từ tính lực ép mạnh, ngăn ngừa 100% bay hơi dung môi. Vòng sứ Zirconia siêu phẳng chống xước bản thép, vòng thép Tungsten Carbide chống mẻ va đập và tấm lót khay mực dùng 1 lần thay màu trong 10 giây.',
    url: '/products/consumables/coc-muc-vong-gat-muc',
    icon: Settings,
    image: '/images/products/accessories/ink-cups.webp',
    highlights: [
      'Cốc mực nhôm CNC nam châm vĩnh cửu lực hút mạnh',
      'Vòng sứ Zirconia siêu mịn bảo vệ khuôn in không xước',
      'Vòng thép Tungsten Carbide chịu va đập, chống mẻ vỡ',
      'Tấm lót khay mực dùng 1 lần tiết kiệm dung môi vệ sinh',
    ],
  },
  {
    id: 'muc-in',
    title: 'Mực In Tampon & In Lụa Cao Cấp',
    shortTitle: 'Mực In Tampon & Lụa',
    badge: 'Đạt chuẩn RoHS & REACH',
    tagline: 'Dubuit (Pháp) • Henkey • Ruco (Đức) • Afford',
    desc: 'Hệ thống mực in 1 thành phần và 2 thành phần chuyên dụng. Khả năng bám dính siêu việt trên các chất liệu khó như nhựa PP, PE không qua xử lý lửa/corona, kim loại sơn tĩnh điện, inox, thủy tinh, gốm sứ và gỗ.',
    url: '/products/consumables/muc-in',
    icon: Droplet,
    image: '/images/products/additives/solvent.webp',
    highlights: [
      'Mực in Dubuit (Pháp) bóng đẹp, độ bền cơ học cao',
      'Mực Henkey chuyên dụng bám dính nhựa khó PP/PE/ABS',
      'Mực Ruco (Đức) đạt chứng nhận y tế, đồ chơi EN71',
      'Đầy đủ hệ màu Pantone, hỗ trợ pha màu theo yêu cầu',
    ],
  },
  {
    id: 'dau-in-silicone',
    title: 'Đầu In Silicone (Pad Printing Pads)',
    shortTitle: 'Đầu In Silicone',
    badge: '200+ Mã khuôn có sẵn',
    tagline: 'R-Series Tròn Nón • Q-Series Chữ Nhật • Shore 38A - 55A',
    desc: 'Cao su silicone kỹ thuật nhập khẩu, đàn hồi cực cao, độ nhả mực lên đến 98%. Đầy đủ các khuôn hình nón tròn chống đọng bọt khí ở đỉnh, hình chữ nhật cho logo dài và nhận đúc silicone theo phôi sản phẩm thực tế.',
    url: '/products/consumables/dau-in-silicone',
    icon: CircleDot,
    image: '/images/products/pads/pad_shape_1_p1.jpg',
    highlights: [
      'Silicone chống tĩnh điện, không hút bụi khi in',
      'Bề mặt siêu bóng giúp truyền tải 100% chi tiết tram mảnh',
      'Độ cứng Shore A đa dạng (38A mềm, 45A chuẩn, 55A cứng)',
      'Gia công đế nhôm hoặc đế gỗ theo đúng gá máy in',
    ],
  },
  {
    id: 'khuon-in',
    title: 'Khuôn In Chế Bản (Cliche / Plates)',
    shortTitle: 'Khuôn In Chế Bản',
    badge: 'Khắc CNC & Phơi UV',
    tagline: 'Thép Mỏng 0.5mm • Thép Dày 10mm CNC • Bản Polymer',
    desc: 'Cung cấp phôi khuôn và dịch vụ gia công chế bản in tampon trọn gói: Khuôn thép mỏng 0.25mm - 0.5mm tôi cao tần độ bóng gương, khuôn thép dày 10mm mài phẳng hai mặt tuổi thọ 1.000.000 lượt in và bản polymer nhạy sáng.',
    url: '/products/consumables/khuon-in',
    icon: Layers,
    image: '/images/products/plates/plate-steel-thick.webp',
    highlights: [
      'Bản thép dày 10mm mài phẳng hai mặt dung sai < 0.005mm',
      'Bản thép mỏng 0.5mm tiết kiệm chi phí cho đơn hàng vừa',
      'Bản Polymer phơi UV tiện lợi, tự gia công tại xưởng',
      'Nhận ra phim tram và khắc axit/khắc laser theo bản vẽ',
    ],
  },
  {
    id: 'phu-gia-dung-moi',
    title: 'Phụ Gia & Dung Môi Hóa Chất Ngành In',
    shortTitle: 'Phụ Gia & Dung Môi',
    badge: 'Chuyên dụng chống bay hơi',
    tagline: 'Thinner Nhanh/Chậm • Hardener • Retarder • Primer Trợ Bám',
    desc: 'Hóa chất tinh khiết điều chỉnh tốc độ bay hơi và độ nhớt của mực in theo từng điều kiện nhiệt độ nhà xưởng. Chất đóng rắn Hardener gia tăng độ cứng chống mài mòn, dung môi chậm khô Retarder chống nghẹt khuôn mùa nóng.',
    url: '/products/consumables/phu-gia-dung-moi',
    icon: Beaker,
    image: '/images/products/additives/hardener.webp',
    highlights: [
      'Thinner pha loãng tinh khiết không làm đục màu mực',
      'Chất đóng rắn Hardener tỷ lệ pha 10:1 tăng kháng hóa chất',
      'Dung môi chậm khô Retarder chống khô mực trên cốc',
      'Chất trợ bám Primer quét xử lý trước bề mặt nhựa PP/PE',
    ],
  },
];

const FAQS_DATA = [
  {
    q: 'VNPIS cung cấp những loại vật tư nào cho máy in tampon và máy in lụa?',
    a: 'VNPIS là tổng kho vật tư in công nghiệp toàn diện tại Việt Nam, cung cấp đồng bộ: Cốc mực kín nhôm nam châm (Ø33mm - Ø247mm), Vòng sứ Zirconia, Vòng thép Tungsten Carbide, Dao gạt Thụy Điển, Tấm lót khay mực dùng 1 lần, Đầu in silicone R/Q-Series hơn 200 mã khuôn, Mực in tampon & in lụa chính hãng Dubuit, Henkey, Ruco, Khuôn in thép 10mm/0.5mm và hệ dung môi phụ gia (Thinner, Hardener, Retarder, Primer).'
  },
  {
    q: 'Sự khác biệt kỹ thuật giữa vòng sứ Zirconia và vòng thép Tungsten Carbide là gì?',
    a: 'Vòng sứ Zirconia có độ bóng bề mặt và độ phẳng vi mô cực cao, giúp gạt sạch mực 100% mà hoàn toàn không gây trầy xước khuôn in (kể cả bản polymer và bản thép mỏng), tuy nhiên vòng sứ dễ bị mẻ nếu va đập mạnh khi vệ sinh. Ngược lại, vòng thép Tungsten Carbide chế tác từ hợp kim Vonfram nguyên khối siêu cứng, chống va đập rơi rớt cực tốt, thích hợp nhất cho máy in tampon tốc độ cao chạy 3 ca liên tục kết hợp cùng khuôn thép dày 10mm.'
  },
  {
    q: 'VNPIS có hỗ trợ in test mẫu và pha màu chuẩn Pantone trước khi đặt hàng không?',
    a: 'Có. VNPIS hỗ trợ hoàn toàn MIỄN PHÍ dịch vụ in test mẫu trên sản phẩm thực tế của quý khách. Đội ngũ kỹ sư sẽ phân tích chất liệu bề mặt (nhựa ABS, PP, PE, kim loại, thủy tinh), pha màu chuẩn theo cây màu Pantone quốc tế và thực hiện test kiểm định độ bám dính (cross-cut tape test, chà xát cồn 99.5%) trước khi bàn giao công thức mực.'
  },
  {
    q: 'Làm thế nào để chọn đúng độ cứng (Shore A) của đầu in silicone cho sản phẩm có bề mặt lồi lõm?',
    a: 'Nguyên tắc chọn đầu in silicone: Với bề mặt sản phẩm cong nhẹ hoặc phẳng, nên chọn độ cứng tiêu chuẩn 44A - 48A (màu trắng hoặc xanh) để đường nét sắc sảo. Với sản phẩm có độ cong gắt, hình cầu sâu hoặc có gờ dốc cao, nên chọn silicone mềm 38A - 42A (màu đỏ) để cao su dễ biến dạng ôm sát bề mặt mà không làm biến dạng hình in. Với chi tiết tram siêu mảnh cần lực ép lớn, dùng silicone cứng 50A - 55A.'
  },
  {
    q: 'Khuôn in tampon thép mỏng 0.5mm và thép dày CNC 10mm có ưu nhược điểm gì?',
    a: 'Khuôn thép mỏng 0.5mm có giá thành rẻ, thời gian gia công nhanh, phù hợp cho đơn hàng số lượng vừa và nhỏ (dưới 50.000 - 100.000 lần in). Khuôn thép dày 10mm được làm từ thép công cụ tôi cứng 62-64 HRC, mài phẳng 2 mặt, tuổi thọ trên 1.000.000 lượt in, có thể mài lại bề mặt để khắc lại hình mới, là lựa chọn số 1 cho các xưởng gia công lớn.'
  },
  {
    q: 'Thời gian giao hàng vật tư in công nghiệp của VNPIS là bao lâu?',
    a: 'Các mặt hàng có sẵn như cốc mực tiêu chuẩn (Ø90mm, Ø120mm), vòng sứ, đầu in silicone thông dụng, mực in và dung môi được giao hỏa tốc trong 2 giờ tại nội thành TP.HCM, Bình Dương và Đồng Nai. Đối với các tỉnh thành khác trên toàn quốc, hàng được gửi chành xe hoặc chuyển phát nhanh trong vòng 24 - 48 giờ. Đối với đầu in đúc theo khuôn phi tiêu chuẩn hoặc khuôn thép khắc theo yêu cầu, thời gian sản xuất từ 1 - 3 ngày làm việc.'
  }
];

export default function ConsumablesPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Trang chủ',
            item: 'https://vnpis.com',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Sản phẩm',
            item: 'https://vnpis.com/products',
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: 'Vật Tư In Công Nghiệp',
            item: 'https://vnpis.com/products/consumables',
          },
        ],
      },
      {
        '@type': 'CollectionPage',
        name: 'Tổng Kho Vật Tư In Tampon & In Lụa Công Nghiệp VNPIS',
        description: 'Tổng kho phân phối vật tư, phụ kiện và hóa chất máy in pad, máy in lụa công nghiệp chính hãng tại Việt Nam.',
        url: 'https://vnpis.com/products/consumables',
        hasPart: CATEGORIES_DATA.map((cat, idx) => ({
          '@type': 'WebPage',
          position: idx + 1,
          name: cat.title,
          description: cat.desc,
          url: `https://vnpis.com${cat.url}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: FAQS_DATA.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.a,
          },
        })),
      },
      {
        '@type': 'LocalBusiness',
        name: 'Công ty TNHH VNPIS - Tổng Kho Vật Tư In Công Nghiệp',
        image: 'https://vnpis.com/icon.png',
        url: 'https://vnpis.com',
        telephone: '0987453866',
        email: 'info@vnpis.com',
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng',
          addressLocality: 'TP. Hồ Chí Minh',
          addressRegion: 'TP.HCM',
          postalCode: '700000',
          addressCountry: 'VN',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 10.7289,
          longitude: 106.6663,
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '08:00',
            closes: '18:00',
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ===================== HERO SECTION ===================== */}
      <section className="bg-slate-900 text-white pt-24 pb-16 lg:pb-20 relative overflow-hidden border-b border-slate-800">
        {/* Subtle Industrial Grid Background */}
        <div className="absolute inset-0 z-0 opacity-15 pointer-events-none bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px]"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs md:text-sm text-slate-400 mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-white transition-colors">Sản phẩm</Link>
            <span>/</span>
            <span className="text-white font-bold">Vật tư in công nghiệp</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-950/80 text-blue-300 rounded-full text-xs font-black uppercase tracking-wider mb-4 border border-blue-700/60 shadow-sm">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Tổng Kho Vật Tư In Tampon &amp; In Lụa TP.HCM • Đầy Đủ CO/CQ
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
                Tổng Kho Vật Tư In Tampon &amp; In Lụa Công Nghiệp
              </h1>

              <p className="text-base md:text-lg text-slate-300 leading-relaxed max-w-3xl">
                Cung cấp đồng bộ hơn 500+ quy cách vật tư &amp; phụ kiện máy in pad, máy in lụa chính hãng: <strong className="text-white">Cốc mực kín nam châm từ tính CNC</strong> chống bay hơi dung môi, <strong className="text-white">Vòng sứ gạt mực Zirconia</strong> siêu phẳng chống xước bản thép, <strong className="text-white">Vòng thép Tungsten Carbide</strong> chống mẻ vỡ va đập, <strong className="text-white">Đầu in silicone</strong> hơn 200 mã khuôn, <strong className="text-white">Mực in cao cấp Dubuit, Henkey, Ruco</strong> và hệ dung môi phụ gia chuyên dụng.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <a
                href="#tu-van-bao-gia"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-xl hover:shadow-blue-600/30 whitespace-nowrap text-base"
              >
                Nhận Báo Giá Tổng Kho <ArrowRight className="w-5 h-5 ml-2" />
              </a>
              <div className="flex items-center gap-2">
                <a
                  href="tel:0987453866"
                  className="inline-flex items-center justify-center px-4 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl font-bold transition-colors border border-slate-700 text-xs flex-1 whitespace-nowrap"
                >
                  <PhoneCall className="w-3.5 h-3.5 mr-1.5 text-emerald-400" /> 0987 453 866
                </a>
                <CopyLinkButton
                  itemTitle="Tổng Kho Vật Tư In Tampon & In Lụa VNPIS"
                  variant="compact"
                />
              </div>
            </div>
          </div>

          {/* 4 Core B2B Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl md:text-3xl font-black text-emerald-400">500+</span>
                <Settings className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Quy Cách Sẵn Kho</h4>
                <p className="text-xs text-slate-400 mt-1">Đầy đủ size Ø33 - Ø247mm, đầu in silicone tròn nón, mực các hệ.</p>
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl md:text-3xl font-black text-blue-400">100%</span>
                <Award className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Chính Hãng Có CO/CQ</h4>
                <p className="text-xs text-slate-400 mt-1">Nhập khẩu trực tiếp từ Pháp, Đức, Đài Loan, đạt chuẩn RoHS/REACH.</p>
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl md:text-3xl font-black text-amber-400">2 Giờ</span>
                <Truck className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Giao Hỏa Tốc Nội Thành</h4>
                <p className="text-xs text-slate-400 mt-1">Giao gấp trong 2H tại TP.HCM, Bình Dương, Đồng Nai; gửi xe liên tỉnh.</p>
              </div>
            </div>

            <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700/80 rounded-2xl p-4 md:p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl md:text-3xl font-black text-rose-400">0 Đồng</span>
                <FlaskConical className="w-5 h-5 text-slate-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Test Mẫu &amp; Pha Màu</h4>
                <p className="text-xs text-slate-400 mt-1">Hỗ trợ test độ bám dính trên sản phẩm thực tế và pha màu Pantone.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STICKY NAVIGATION BAR ===================== */}
      <ConsumablesQuickBar />

      <main className="container mx-auto px-4 mt-12 space-y-20">

        {/* ===================== 5 CORE PILLARS SHOWCASE ===================== */}
        <section aria-labelledby="section-categories">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-blue-600 mb-2">
                Danh Mục Vật Tư Mũi Nhọn
              </div>
              <h2 id="section-categories" className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight">
                5 Trụ Cột Vật Tư Phục Vụ Toàn Diện Xưởng In
              </h2>
            </div>
            <p className="text-sm text-slate-600 max-w-xl">
              Nhấn vào từng danh mục để xem thông số kỹ thuật chi tiết, kích thước quy chuẩn hoặc sao chép link nhanh để gửi nội bộ bộ phận thu mua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CATEGORIES_DATA.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.id}
                  className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden ${
                    idx === 0 ? 'md:col-span-2 lg:col-span-1 border-blue-200 bg-gradient-to-b from-white to-blue-50/20' : ''
                  }`}
                >
                  <div>
                    {/* Top Tag & Copy Button */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 group-hover:bg-blue-100 group-hover:text-blue-800 transition-colors">
                        {cat.badge}
                      </span>
                      <CopyLinkButton
                        urlPath={cat.url}
                        itemTitle={cat.title}
                        variant="compact"
                      />
                    </div>

                    {/* Image */}
                    <div className="w-full h-48 bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 mb-5 p-4 flex items-center justify-center relative">
                      <img
                        src={cat.image}
                        alt={cat.title}
                        loading="lazy"
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute bottom-3 left-3 p-2 bg-white/90 backdrop-blur-sm rounded-xl shadow-sm text-slate-800">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                      <Link href={cat.url}>{cat.title}</Link>
                    </h3>
                    <p className="text-xs font-bold text-blue-600 uppercase tracking-wide mb-3">
                      {cat.tagline}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed mb-5">
                      {cat.desc}
                    </p>

                    {/* Bullet Highlights */}
                    <ul className="space-y-2 mb-6">
                      {cat.highlights.map((h, hIdx) => (
                        <li key={hIdx} className="flex items-start text-xs font-medium text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 mr-2 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                    <Link
                      href={cat.url}
                      className="inline-flex items-center justify-center px-4 py-2.5 bg-slate-900 hover:bg-blue-600 text-white rounded-xl text-xs font-bold transition-colors shadow-sm flex-1"
                    >
                      Xem Toàn Bộ Catalog <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Link>
                    <a
                      href={`#${cat.id}`}
                      className="px-3 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors whitespace-nowrap"
                    >
                      Xem tóm tắt ↓
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ===================== SECTION 1: CỐC MỰC & VÒNG GẠT ===================== */}
        <section id="coc-muc-vong-gat" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-100 text-emerald-700 rounded-2xl">
                  <Settings className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-600">Phụ Kiện Máy In Tampon</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    Cốc Mực Kín, Vòng Sứ &amp; Vòng Thép Gạt Mực
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/consumables/coc-muc-vong-gat-muc"
                  className="inline-flex items-center px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Mở Catalog Cốc &amp; Vòng Gạt Chi Tiết <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton
                  urlPath="/products/consumables/coc-muc-vong-gat-muc"
                  itemTitle="Cốc Mực, Vòng Gạt Mực & Tấm Lót Khay"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accessoriesData.accessories.slice(0, 4).map((item: any) => (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-emerald-400 hover:shadow-md transition-all">
                  <div>
                    <div className="w-full h-36 bg-white rounded-xl p-3 mb-4 flex items-center justify-center border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-[11px] font-bold text-emerald-700 uppercase">{item.material || 'Chính hãng'}</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1 mb-2 line-clamp-1">{item.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-mono">#{item.id}</span>
                    <Link
                      href={`/products/consumables/coc-muc-vong-gat-muc#${item.id}`}
                      className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center"
                    >
                      Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-emerald-950 font-bold">
                ✓ Sẵn kho đầy đủ quy cách vòng gạt: Ø33mm, Ø45mm, Ø60mm, Ø70mm, Ø82mm, Ø90mm, Ø100mm, Ø110mm, Ø120mm, Ø130mm, Ø140mm, Ø150mm, Ø200mm, Ø247mm.
              </span>
              <Link
                href="/products/consumables/coc-muc-vong-gat-muc"
                className="font-black text-emerald-700 hover:underline shrink-0"
              >
                Xem toàn bộ 6 biên dạng dao gạt AP-1 ~ AP-6 →
              </Link>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 2: MỰC IN TAMPON & LỤA ===================== */}
        <section id="muc-in" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 text-blue-700 rounded-2xl">
                  <Droplet className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-blue-600">Mực In Công Nghiệp</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    Mực In Tampon &amp; In Lụa (Dubuit, Henkey, Ruco)
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/consumables/muc-in"
                  className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Mở Bảng Tra Cứu Mực In <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton
                  urlPath="/products/consumables/muc-in"
                  itemTitle="Mực In Tampon & In Lụa Công Nghiệp"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inksData.map((brand: any) => (
                <div key={brand.brand} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-blue-400 hover:shadow-md transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black text-blue-700 bg-blue-100 px-2.5 py-1 rounded-md">{brand.brand}</span>
                      <span className="text-xs text-slate-500 font-medium">{brand.country}</span>
                    </div>
                    <p className="text-xs text-slate-600 mb-4 line-clamp-2">{brand.desc}</p>
                    <div className="space-y-2 mb-4">
                      {brand.series.slice(0, 2).map((serie: any, sIdx: number) => (
                        <div key={sIdx} className="bg-white p-2.5 rounded-xl border border-slate-200">
                          <div className="font-bold text-xs text-slate-900">{serie.name}</div>
                          <div className="text-[11px] text-slate-500 truncate mt-0.5">Vật liệu: {serie.materials.join(', ')}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200">
                    <Link
                      href={`/products/consumables/muc-in`}
                      className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center justify-between"
                    >
                      <span>Xem các dòng {brand.brand}</span>
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 rounded-2xl bg-blue-50 border border-blue-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <span className="text-blue-950 font-bold">
                ✓ Phân phối chính hãng hệ mực 1 thành phần, 2 thành phần, sấy nhiệt &amp; sấy UV bám dính trên: PP, PE, ABS, PC, Acrylic, Nhôm, Thủy tinh, Gốm sứ.
              </span>
              <Link
                href="/products/consumables/muc-in"
                className="font-black text-blue-700 hover:underline shrink-0"
              >
                Tra cứu độ bám dính theo vật liệu →
              </Link>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 3: ĐẦU IN SILICONE ===================== */}
        <section id="dau-in-silicone" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-indigo-100 text-indigo-700 rounded-2xl">
                  <CircleDot className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-600">Silicone Rubber Pads</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    Đầu In Silicone (R-Series, Q-Series, Khuôn Đúc Theo Mẫu)
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/consumables/dau-in-silicone"
                  className="inline-flex items-center px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Mở Catalog 200+ Đầu In <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton
                  urlPath="/products/consumables/dau-in-silicone"
                  itemTitle="Đầu In Silicone Pad Printing"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold uppercase">R-Series Tròn Nón</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3 mb-2">Đầu In Hình Tròn Nón</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Thiết kế chóp nón góc vát 30° - 45° giúp đẩy toàn bộ bọt khí ra ngoài khi ép xuống bề mặt sản phẩm. Tối ưu cho in logo tròn, bề mặt cong lồi và mặt phẳng.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium mb-4">
                    <li>• Kích thước: Ø20mm đến Ø160mm</li>
                    <li>• Chân đế: Nhôm tiện ren hoặc gỗ công nghiệp</li>
                    <li>• Ứng dụng: Nắp chai, ly cốc, mặt đồng hồ</li>
                  </ul>
                </div>
                <Link href="/products/consumables/dau-in-silicone" className="text-xs font-bold text-indigo-600 hover:underline">
                  Xem bảng quy cách R-Series →
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold uppercase">Q-Series Chữ Nhật</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3 mb-2">Đầu In Hình Chữ Nhật &amp; Dải Dài</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Sống lưng sống cong đều theo chiều dài, giúp lăn đều mực từ một cạnh sang cạnh còn lại, không để lại vết nối mực.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium mb-4">
                    <li>• Kích thước: 30x60mm đến 80x250mm</li>
                    <li>• Phân bố lực in đều trên hành trình dài</li>
                    <li>• Ứng dụng: Thân bút bi, viền thước kẻ, bảng điều khiển</li>
                  </ul>
                </div>
                <Link href="/products/consumables/dau-in-silicone" className="text-xs font-bold text-indigo-600 hover:underline">
                  Xem bảng quy cách Q-Series →
                </Link>
              </div>

              <div className="p-6 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col justify-between">
                <div>
                  <span className="px-3 py-1 bg-indigo-600 text-white rounded-md text-xs font-bold uppercase">Custom Mold Design</span>
                  <h3 className="text-lg font-black text-slate-900 mt-3 mb-2">Đúc Silicone Theo Phôi Mẫu</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    Nhận gia công khuôn nhôm CNC và đúc đầu in silicone theo bản vẽ 3D hoặc phôi mẫu thực tế của các sản phẩm có bề mặt lồi lõm phức tạp.
                  </p>
                  <ul className="text-xs space-y-1.5 text-slate-700 font-medium mb-4">
                    <li>• Độ cứng tùy chọn: 38A - 55A</li>
                    <li>• Màu sắc: Đỏ mềm, Trắng trung bình, Xanh cứng</li>
                    <li>• Thời gian đúc mẫu: 2 - 3 ngày làm việc</li>
                  </ul>
                </div>
                <Link href="/contact" className="text-xs font-bold text-indigo-600 hover:underline">
                  Gửi mẫu đúc khuôn riêng →
                </Link>
              </div>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 4: KHUÔN IN CHẾ BẢN ===================== */}
        <section id="khuon-in" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-purple-100 text-purple-700 rounded-2xl">
                  <Layers className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-purple-600">Cliche &amp; Printing Plates</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    Khuôn In Chế Bản (Bản Thép Dày 10mm, Thép Mỏng 0.5mm, Bản Polymer)
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/consumables/khuon-in"
                  className="inline-flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Mở Báo Giá Khuôn In <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton
                  urlPath="/products/consumables/khuon-in"
                  itemTitle="Khuôn In Chế Bản Tampon"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {accessoriesData.plates.map((item: any) => (
                <div key={item.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-purple-400 hover:shadow-md transition-all">
                  <div>
                    <div className="w-full h-40 bg-white rounded-xl p-3 mb-4 flex items-center justify-center border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                    <h3 className="font-bold text-slate-900 text-lg mt-1 mb-2">{item.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{item.desc}</p>
                    <div className="space-y-1.5 mb-4">
                      {item.features.map((f: string, i: number) => (
                        <div key={i} className="text-[11px] font-semibold text-purple-900 bg-purple-50 p-2 rounded-lg border border-purple-100 flex items-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-purple-600 mr-1.5 shrink-0" /> {f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <Link
                      href={`/products/consumables/khuon-in#${item.id}`}
                      className="font-bold text-purple-600 hover:text-purple-700 flex items-center"
                    >
                      Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                    <Link href="/contact" className="font-bold text-slate-600 hover:text-slate-900">
                      Báo giá gia công
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ===================== SECTION 5: PHỤ GIA & DUNG MÔI ===================== */}
        <section id="phu-gia-dung-moi" className="scroll-mt-36">
          <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-amber-100 text-amber-700 rounded-2xl">
                  <Beaker className="w-7 h-7" />
                </div>
                <div>
                  <span className="text-xs font-black uppercase tracking-wider text-amber-600">Hóa Chất Ngành In</span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">
                    Phụ Gia, Dung Môi &amp; Hóa Chất Tăng Bám
                  </h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/products/consumables/phu-gia-dung-moi"
                  className="inline-flex items-center px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                >
                  Mở Danh Mục Phụ Gia <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
                </Link>
                <CopyLinkButton
                  urlPath="/products/consumables/phu-gia-dung-moi"
                  itemTitle="Phụ Gia & Dung Môi Hóa Chất"
                  variant="compact"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {accessoriesData.additives.map((item: any) => (
                <div key={item.id} className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between hover:border-amber-400 hover:shadow-md transition-all">
                  <div>
                    <div className="w-full h-36 bg-white rounded-xl p-3 mb-4 flex items-center justify-center border border-slate-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-400">#{item.id}</span>
                    <h3 className="font-bold text-slate-900 text-base mt-1 mb-2">{item.name}</h3>
                    <p className="text-xs text-slate-600 line-clamp-3 mb-4 leading-relaxed">{item.desc}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {item.sizes.map((s: string, i: number) => (
                        <span key={i} className="text-[10px] font-bold bg-white px-2 py-0.5 rounded border border-slate-200 text-slate-700">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <Link
                      href={`/products/consumables/phu-gia-dung-moi#${item.id}`}
                      className="font-bold text-amber-700 hover:text-amber-800 flex items-center"
                    >
                      Xem chi tiết <ArrowRight className="w-3 h-3 ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>


        {/* ===================== SECTION 6: CẨM NANG & BẢNG SO SÁNH KỸ THUẬT ===================== */}
        <section aria-labelledby="section-guide" className="bg-slate-900 text-white rounded-3xl p-6 md:p-12 shadow-xl border border-slate-800">
          <div className="max-w-4xl mb-10">
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-black uppercase tracking-wider mb-3 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5" /> Cẩm Nang Kỹ Thuật Chuyên Sâu
            </span>
            <h2 id="section-guide" className="text-2xl md:text-4xl font-black mb-4">
              Hướng Dẫn Chọn Vật Tư In Tampon Chuẩn Xác
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Những tiêu chí kỹ thuật cốt lõi giúp kỹ sư và quản lý xưởng in lựa chọn đúng phụ kiện, tối ưu hóa tuổi thọ thiết bị và giảm thiểu tỷ lệ phế phẩm trong ca sản xuất.
            </p>
          </div>

          <div className="space-y-8">
            {/* Table 1: Vòng sứ vs Vòng thép */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="p-4 md:p-6 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-black text-white">
                    Bảng 1: So Sánh Vòng Sứ Zirconia vs Vòng Thép Tungsten Carbide
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tiêu chí lựa chọn dao gạt cho cốc mực kín máy in tampon</p>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-950 px-3 py-1 rounded-lg border border-blue-800 hidden sm:inline-block">
                  Tiêu chuẩn quốc tế
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-700">
                    <tr>
                      <th className="p-4">Tiêu Chí Đánh Giá</th>
                      <th className="p-4 text-emerald-400">Vòng Sứ Gạt Mực (Zirconia Ceramic)</th>
                      <th className="p-4 text-blue-400">Vòng Thép Gạt Mực (Tungsten Carbide)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    <tr>
                      <td className="p-4 font-bold text-white">Độ phẳng lưỡi gạt &amp; sạch mực</td>
                      <td className="p-4 text-emerald-300">Xuất sắc (Độ bóng gương nanomet, gạt sạch 100% không để lại màng mực)</td>
                      <td className="p-4">Rất tốt (Gạt sạch trên bản thép dày)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Khả năng bảo vệ khuôn in</td>
                      <td className="p-4 text-emerald-300">Tuyệt đối không gây xước bản (kể cả bản polymer và thép mỏng)</td>
                      <td className="p-4">Cần căn chỉnh lực ép nam châm vừa phải để tránh xước</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Chịu va đập khi vệ sinh</td>
                      <td className="p-4 text-rose-300">Dễ mẻ vỡ nếu làm rơi xuống sàn hoặc va vào cạnh kim loại</td>
                      <td className="p-4 text-blue-300">Cực kỳ bền bỉ, chống nứt mẻ, thợ vệ sinh thoải mái không lo vỡ</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Tốc độ in tương thích</td>
                      <td className="p-4">Tốc độ vừa và cao (1.200 - 1.800 nhịp/h)</td>
                      <td className="p-4 text-blue-300">Tối ưu cho máy tự động tốc độ cao (2.000 - 3.000 nhịp/h)</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-white">Khuôn in khuyên dùng</td>
                      <td className="p-4">Bản Polymer UV, Bản Thép mỏng 0.5mm, Bản Thép 10mm</td>
                      <td className="p-4 text-blue-300">Bản Thép Dày CNC 10mm tôi cứng</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Table 2: Chọn độ cứng đầu in silicone */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden">
              <div className="p-4 md:p-6 bg-slate-800 border-b border-slate-700 flex items-center justify-between">
                <div>
                  <h3 className="text-base md:text-lg font-black text-white">
                    Bảng 2: Hướng Dẫn Chọn Độ Cứng Đầu In Silicone (Shore A)
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">Tùy biến độ cứng theo biên dạng hình học sản phẩm</p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs md:text-sm text-slate-300">
                  <thead className="bg-slate-900/60 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-700">
                    <tr>
                      <th className="p-4">Độ Cứng (Shore A)</th>
                      <th className="p-4">Màu Nhận Diện</th>
                      <th className="p-4">Đặc Tính Biến Dạng</th>
                      <th className="p-4">Biên Dạng Phù Hợp</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    <tr>
                      <td className="p-4 font-bold text-rose-400">38A - 42A (Mềm)</td>
                      <td className="p-4">Đỏ / Hồng</td>
                      <td className="p-4">Rất mềm, biến dạng dễ dàng với lực ép cực nhỏ</td>
                      <td className="p-4 text-white">Sản phẩm mỏng manh, bề mặt cong gắt, hình nón lõm sâu, đồ chơi gập ghềnh</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-emerald-400">44A - 48A (Chuẩn)</td>
                      <td className="p-4">Trắng ngà / Xanh nhạt</td>
                      <td className="p-4">Độ đàn hồi cân bằng hoàn hảo, nhả mực 98%</td>
                      <td className="p-4 text-white">80% nhu cầu in công nghiệp: Nắp chai, bề mặt phẳng, cong nhẹ, vỏ đồ gia dụng</td>
                    </tr>
                    <tr>
                      <td className="p-4 font-bold text-blue-400">50A - 55A (Cứng)</td>
                      <td className="p-4">Xanh dương / Đen</td>
                      <td className="p-4">Rất cứng, cần lực ép lớn, truyền nét siêu sắc nét</td>
                      <td className="p-4 text-white">Bề mặt phẳng tuyệt đối, chữ vi mô &lt; 0.5pt, tram phân giải cao, bàn phím máy tính</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 7: ỨNG DỤNG ĐA NGÀNH ===================== */}
        <section aria-labelledby="section-industries">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 mb-2 block">
              Lĩnh Vực Ứng Dụng
            </span>
            <h2 id="section-industries" className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
              Vật Tư In VNPIS Phục Vụ Đa Dạng Ngành Sản Xuất
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Đáp ứng đầy đủ các tiêu chuẩn kiểm định khắt khe của các nhà máy FDI, khu công nghiệp và xưởng gia công trên toàn quốc.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 mb-3">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Điện Tử &amp; Bán Dẫn</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Keycaps phím cơ, nút bấm, adapter, vi mạch, pin sạc dự phòng, củ sạc.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-emerald-50 text-emerald-600 mb-3">
                <FlaskConical className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Mỹ Phẩm &amp; Chai Lọ</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Hũ kem thủy tinh, nắp son môi, tuýp kem chống nắng, thân chai PET/HDPE.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600 mb-3">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Đồ Gia Dụng &amp; Đồ Chơi</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Bình giữ nhiệt, ly cốc nhựa PP, đồ chơi trẻ em đạt chuẩn an toàn EN71-3.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-rose-50 text-rose-600 mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Y Tế &amp; Dược Phẩm</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Ống nghiệm, thân xi lanh vạch định lượng, vỉ thuốc, vỏ máy đo huyết áp.</p>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center flex flex-col items-center">
              <div className="p-3 rounded-2xl bg-purple-50 text-purple-600 mb-3">
                <Settings className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm mb-1">Cơ Khí &amp; Ô Tô - Xe Máy</h3>
              <p className="text-xs text-slate-500 leading-relaxed">Mặt đồng hồ tốc độ, nút bấm taplo, logo nhôm phay xước, tay nắm cửa.</p>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 8: NĂNG LỰC CUNG ỨNG VNPIS ===================== */}
        <section aria-labelledby="section-trust" className="bg-gradient-to-br from-blue-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-4xl mx-auto text-center mb-10">
            <span className="inline-block px-3.5 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border border-blue-400/30">
              Quy Trình Đồng Hành Kỹ Thuật
            </span>
            <h2 id="section-trust" className="text-2xl md:text-4xl font-black mb-4">
              Cam Kết Dịch Vụ &amp; Hỗ Trợ Kỹ Thuật Tận Xưởng
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Không chỉ bán vật tư, đội ngũ kỹ sư VNPIS trực tiếp đồng hành cùng xưởng in để giải quyết triệt để các bài toán kỹ thuật hóc búa nhất.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-black text-blue-400 mb-2 block">01</span>
              <h3 className="font-bold text-white text-base mb-2">Phân Tích Bề Mặt</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Đo góc tiếp xúc và năng lượng bề mặt vật liệu bằng bút thử Dyne Test, xác định chính xác phương án xử lý (Flame/Corona) nếu cần.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-black text-emerald-400 mb-2 block">02</span>
              <h3 className="font-bold text-white text-base mb-2">In Test Mẫu Miễn Phí</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pha màu chuẩn theo cây màu Pantone quốc tế và in test thực tế trên sản phẩm gửi về xưởng VNPIS trước khi chốt đơn hàng.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-black text-amber-400 mb-2 block">03</span>
              <h3 className="font-bold text-white text-base mb-2">Kiểm Định Độ Bám</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Thực hiện kiểm tra bám dính băng keo 3M cross-hatch, ngâm nước, chà cồn 99.5% và chịu nhiệt độ lò sấy theo tiêu chuẩn nhà máy.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10">
              <span className="text-3xl font-black text-rose-400 mb-2 block">04</span>
              <h3 className="font-bold text-white text-base mb-2">Căn Chỉnh Tận Nơi</h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kỹ thuật viên VNPIS có mặt tại nhà máy để hỗ trợ thợ in căn chỉnh lực ép pad, góc dao gạt và tỷ lệ dung môi đạt hiệu suất tối ưu.
              </p>
            </div>
          </div>
        </section>


        {/* ===================== SECTION 9: CÂU HỎI THƯỜNG GẶP (FAQS) ===================== */}
        <section aria-labelledby="section-faqs" className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-black uppercase tracking-wider text-blue-600 mb-2 block">
              Giải Đáp Kỹ Thuật
            </span>
            <h2 id="section-faqs" className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight mb-2">
              Câu Hỏi Thường Gặp Về Vật Tư In Tampon &amp; In Lụa
            </h2>
            <p className="text-sm text-slate-600">
              Tổng hợp những thắc mắc phổ biến nhất từ bộ phận kỹ thuật và phòng thu mua các nhà máy in ấn.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FAQS_DATA.map((faq, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-colors">
                <h3 className="font-bold text-slate-900 text-sm md:text-base mb-2.5 flex items-start gap-2.5">
                  <span className="text-blue-600 font-black shrink-0">0{idx + 1}.</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>


        {/* ===================== SECTION 10: LIÊN HỆ & FORM TƯ VẤN ===================== */}
        <section id="tu-van-bao-gia" className="scroll-mt-32">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-800">
            <div className="max-w-3xl mx-auto text-center mb-10">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black uppercase tracking-wider mb-4 border border-blue-400/30">
                <PhoneCall className="w-3.5 h-3.5" /> Báo Giá Cạnh Tranh &amp; Tư Vấn Kỹ Thuật
              </span>
              <h2 className="text-2xl md:text-4xl font-black mb-3">
                Bạn Cần Báo Giá Hoặc Tư Vấn Cấu Hình Vật Tư Phù Hợp?
              </h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                Liên hệ trực tiếp đội ngũ kỹ sư VNPIS phụ trách từng mảng in ấn để được hỗ trợ báo giá nhanh trong 5 phút:
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
              {/* Mr. Tâm */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-300 uppercase">Kỹ Thuật In Tampon &amp; CIJ</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">Online</span>
                  </div>
                  <h3 className="text-xl font-black text-white">Mr. Tâm</h3>
                  <p className="text-xs text-slate-300 mt-1 mb-4">
                    Tư vấn chọn cốc mực, vòng sứ Zirconia, đầu in silicone &amp; mực bám dính PP/PE.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://zalo.me/0901836344"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-xs flex items-center justify-center transition-colors shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1 text-blue-600" /> Zalo Mr. Tâm
                  </a>
                  <a
                    href="tel:0901836344"
                    className="py-2.5 px-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-colors shadow-md whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1" /> 0901 836 344
                  </a>
                </div>
              </div>

              {/* Mr. Giang */}
              <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-300 uppercase">Kỹ Thuật In Lụa &amp; Khung Lưới</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500 text-white">Online</span>
                  </div>
                  <h3 className="text-xl font-black text-white">Mr. Giang</h3>
                  <p className="text-xs text-slate-300 mt-1 mb-4">
                    Tư vấn mực in lụa bao bì, túi giấy, màng nhựa, dao gạt cao su và hóa chất chế bản.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://zalo.me/0901826344"
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 py-2.5 px-3 bg-white text-blue-900 hover:bg-blue-50 font-bold rounded-xl text-xs flex items-center justify-center transition-colors shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1 text-blue-600" /> Zalo Mr. Giang
                  </a>
                  <a
                    href="tel:0901826344"
                    className="py-2.5 px-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center justify-center transition-colors shadow-md whitespace-nowrap"
                  >
                    <PhoneCall className="w-3.5 h-3.5 mr-1" /> 0901 826 344
                  </a>
                </div>
              </div>
            </div>

            {/* Fast Consultation Form */}
            <ConsultationForm
              title="Đăng Ký Nhận Bảng Giá Vật Tư & Test Mẫu"
              subtitle="Điền thông tin sản phẩm và nhu cầu in ấn, VNPIS sẽ gửi bảng giá chi tiết kèm mẫu thử nghiệm."
              pageTitle="Tổng Kho Vật Tư In Tampon & In Lụa"
            />
          </div>
        </section>

      </main>
    </div>
  );
}
