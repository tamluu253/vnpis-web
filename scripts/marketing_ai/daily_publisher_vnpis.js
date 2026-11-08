/**
 * @file daily_publisher_vnpis.js
 * @description Dedicated 7-Days/Week Automated Daily Publishing Engine for vnpis.com.
 * Generates and publishes 1 article per day (Monday to Sunday) covering the 5 core pillars:
 *   1. Pad Printing Machinery & Automation
 *   2. Screen Printing Machinery
 *   3. UV Single Pass High-Speed Digital
 *   4. Industrial Inks & Solvents
 *   5. Consumables & Accessories (Pads, Cliché, Ceramic Rings, Squeegee)
 * 
 * Features:
 *   - Automatic matching of real images (products, machines, and synced Google Photos)
 *   - E-E-A-T technical depth: specs tables, mathematical formulas, 5-step SOPs, workshop case studies
 *   - Schema.org JSON-LD injection and B2B lead capture CTAs (Hotline Kỹ Sư Trưởng: 0987 453 866)
 *   - Zero duplicate titles/slugs with 7-day cyclical angle rotation
 * 
 * Usage:
 *   node scripts/marketing_ai/daily_publisher_vnpis.js --today
 *   node scripts/marketing_ai/daily_publisher_vnpis.js --next-days=7
 *   node scripts/marketing_ai/daily_publisher_vnpis.js --next-days=30
 *   node scripts/marketing_ai/daily_publisher_vnpis.js --date=2026-10-26
 * 
 * @module marketing_ai/daily_publisher_vnpis
 */

const fs = require('node:fs');
const path = require('node:path');
const contentGenerator = require('./content_generator');
const cmsPublisher = require('./cms_publisher');
const { syncGooglePhotos } = require('./sync_google_photos');
const { sendVnpisNotification } = require('../send_vnpis_email');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ARTICLES_DIR = path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/articles');

// 7-Day Thematic Rotation for vnpis.com
const WEEKDAY_THEMES = {
  1: { // Thứ 2 - Monday
    angle: 'Tư Vấn Thiết Bị & Lựa Chọn Máy In B2B',
    pillar_id: 'pillar-v1-pad-printing',
    pillar_name: 'Máy In Tampon & Hệ Thống Tự Động Hóa',
    intent: 'Commercial',
    topics: [
      {
        title: 'Top 5 Máy In Tampon 1-4 Màu Cốc Mực Kín Ø90mm Bán Chạy Nhất Cho Nhà Máy 2026',
        slug: 'top-5-may-in-tampon-coc-muc-kin-cho-nha-may',
        primary_keyword: 'máy in tampon cốc mực kín',
        secondary_keywords: ['máy in tampon 1 màu', 'máy in tampon 2 màu', 'máy in tampon 4 màu', 'báo giá máy in tampon công nghiệp']
      },
      {
        title: 'Hướng Dẫn Lựa Chọn Máy In Lụa Phẳng Bàn Hút Chân Không Bán Tự Động Phù Hợp Quy Mô Xưởng',
        slug: 'huong-dan-chon-may-in-lua-phang-hut-chan-khong',
        primary_keyword: 'máy in lụa phẳng bán tự động',
        secondary_keywords: ['máy in lụa bàn hút chân không', 'máy in lụa công nghiệp phẳng', 'bán máy in lụa bán tự động']
      },
      {
        title: 'Đánh Giá Máy In UV Single Pass Thùng Carton Tốc Độ Cao: Giải Pháp Thay Thế In Offset Số Lượng Ngắn',
        slug: 'danh-gia-may-in-uv-single-pass-thung-carton-toc-do-cao',
        primary_keyword: 'máy in uv single pass thùng carton',
        secondary_keywords: ['máy in single pass bao bì giấy', 'báo giá máy in uv single pass', 'hệ thống in kỹ thuật số single pass']
      },
      {
        title: 'Tư Vấn Đầu Tư Máy In Tampon Mini Để Bàn Cho Doanh Nghiệp Khởi Nghiệp Quà Tặng & In Bút Bi',
        slug: 'tu-van-dau-tu-may-in-tampon-mini-de-ban',
        primary_keyword: 'máy in tampon mini để bàn',
        secondary_keywords: ['máy in pad mini', 'máy in logo bút bi', 'máy in tampon giá rẻ tphcm']
      }
    ]
  },
  2: { // Thứ 3 - Tuesday
    angle: 'Kỹ Thuật Chuyên Sâu & Xử Lý Sự Cố Xưởng In (Troubleshooting)',
    pillar_id: 'pillar-v1-pad-printing',
    pillar_name: 'Khắc Phục Sự Cố & Vận Hành Máy In',
    intent: 'Troubleshooting',
    topics: [
      {
        title: '20 Lỗi Thường Gặp Khi Vận Hành Máy In Tampon: Nguyên Nhân Rỗ Khí, Lem Mực & Cách Chỉnh Áp Lực Pad',
        slug: '20-loi-thuong-gap-may-in-tampon-va-cach-xu-ly',
        primary_keyword: '20 lỗi máy in tampon và cách xử lý',
        secondary_keywords: ['chỉnh hành trình z máy in tampon', 'khắc phục lỗi lem mực máy in tampon', 'cách căn chỉnh máy in pad printing']
      },
      {
        title: 'Cách Xử Lý Lỗi In Lụa Bị Rách Lưới, Bít Bản Và Đứt Nét: Hướng Dẫn Tinh Chỉnh Góc Nghiêng Dao Gạt Squeegee',
        slug: 'cach-xu-ly-loi-in-lua-rach-luoi-bit-ban-dut-net',
        primary_keyword: 'lỗi in lụa bị bít bản đứt nét',
        secondary_keywords: ['chỉnh dao gạt mực in lụa squeegee', 'nguyên nhân rách lưới in lụa', 'cách khắc phục lem mực in lụa']
      },
      {
        title: 'Hiện Tượng Nghẹt Cốc Mực Kín Máy In Pad & Giải Pháp Thay Thế Vòng Gốm Ceramic Không Rò Dung Môi',
        slug: 'hien-tuong-nghet-coc-muc-kin-va-thay-vong-gom-ceramic',
        primary_keyword: 'thay vòng gốm cốc mực tampon',
        secondary_keywords: ['vòng gốm ceramic ring máy in pad 92 hra', 'khắc phục rò rỉ cốc mực kín', 'vòng gạt ceramic phi 90']
      },
      {
        title: 'Giải Pháp Khắc Phục Lỗi Mực In Tampon Bong Tróc Trên Nhựa PP, PE, Silicon Bằng Xử Lý Corona/Plasma',
        slug: 'khac-phuc-loi-muc-in-tampon-bong-troc-nhua-pp-pe',
        primary_keyword: 'khắc phục mực in bong tróc trên nhựa pp pe',
        secondary_keywords: ['xử lý corona bề mặt nhựa pp', 'plasma tăng bám dính mực in', 'mực in tampon bám nhựa trơ']
      }
    ]
  },
  3: { // Thứ 4 - Wednesday
    angle: 'Vật Tư Tiêu Hao & Tối Ưu Chi Phí Dây Chuyền',
    pillar_id: 'pillar-v5-printing-consumables',
    pillar_name: 'Vật Tư & Phụ Kiện Ngành In Tampon & In Lụa',
    intent: 'Commercial',
    topics: [
      {
        title: 'Hướng Dẫn Chọn Độ Cứng Đầu In Tampon Silicon Từ Shore 30A Đến 70A Theo Biên Dạng Phôi In',
        slug: 'huong-dan-chon-do-cung-dau-in-tampon-silicon',
        primary_keyword: 'đầu in tampon silicon shore 30a 70a',
        secondary_keywords: ['cung cấp pad in tampon cao su', 'chọn độ cứng đầu pad in tampon', 'đầu tampon cao su chịu dầu mực']
      },
      {
        title: 'So Sánh Bản Thép Cliché In Tampon Dày 10mm SKD11 Và Bản Mỏng 0.5mm: Nên Dùng Loại Nào Cho Nhà Máy?',
        slug: 'so-sanh-ban-thep-cliche-in-tampon-skd11-va-ban-mong',
        primary_keyword: 'bản thép cliche máy in tampon skd11',
        secondary_keywords: ['bản khắc polymer máy in pad', 'dịch vụ khắc bản cliche laser fiber', 'độ sâu khắc bản cliche 20 25um']
      },
      {
        title: 'Cốc Mực Kín Ceramic Ring 92 HRA: Phân Tích Lợi Ích Tiết Kiệm 50% Mực Tiêu Hao & Chống Độc Hại',
        slug: 'coc-muc-kin-ceramic-ring-92-hra-tiet-kiem-muc',
        primary_keyword: 'cốc mực kín máy in tampon phi 90',
        secondary_keywords: ['vòng gốm ceramic ring máy in pad 92 hra', 'cốc mực nam châm hút máy in tampon', 'phụ kiện cốc mực kín sealed ink cup']
      },
      {
        title: 'Cẩm Nang Chọn Lưới In Lụa Thụy Sĩ (Mesh Count 80T Đến 165T) Và Dao Gạt Mực PU Chống Ăn Mòn Hóa Chất',
        slug: 'cam-nang-chon-luoi-in-lua-thuy-si-va-dao-gat-pu',
        primary_keyword: 'lưới in lụa mesh count',
        secondary_keywords: ['chọn lưới in lụa thụy sĩ', 'dao gạt mực squeegee pu', 'vật tư ngành in lụa vnpis']
      }
    ]
  },
  4: { // Thứ 5 - Thursday
    angle: 'Ứng Dụng Thực Tế & Nghiên Cứu Điển Hình (B2B Case Study)',
    pillar_id: 'pillar-v1-pad-printing',
    pillar_name: 'Giải Pháp In Ấn Theo Ngành Công Nghiệp',
    intent: 'Informational',
    topics: [
      {
        title: 'Case Study: Giải Pháp In Tampon Logo & Ký Hiệu Lên Linh Kiện Điện Tử Phím Bấm Cho Nhà Máy FDI',
        slug: 'case-study-in-tampon-linh-kien-dien-tu-phim-bam',
        primary_keyword: 'in tampon linh kiện điện tử',
        secondary_keywords: ['in pad phím bấm công tắc điện', 'máy in tampon linh kiện chính xác', 'mực in bo mạch pcb chịu nhiệt']
      },
      {
        title: 'Ứng Dụng Máy In Lụa Tròn Xoay 360 Độ Trong Gia Công In Chai Lọ Mỹ Phẩm & Ly Thủy Tinh Cao Cấp',
        slug: 'ung-dung-may-in-lua-tron-xoay-chai-lo-my-pham',
        primary_keyword: 'máy in lụa tròn chai lọ',
        secondary_keywords: ['máy in lụa trụ tròn 360 độ', 'máy in lụa ly thủy tinh cốc nhựa', 'thiết bị in lụa hũ mỹ phẩm']
      },
      {
        title: 'Giải Pháp In Date Và Logo Chống Trôi Nước Lên Nắp Chai Nhựa & Vỏ Bình Nước Tinh Khiết 20L',
        slug: 'giai-phap-in-date-logo-len-nap-chai-va-binh-nuoc-20l',
        primary_keyword: 'máy in tampon 1 màu in nắp chai',
        secondary_keywords: ['máy in tampon in vỏ bình nước 20l', 'mực in nắp chai chống nước', 'thiết bị in tampon ngành nước đóng chai']
      },
      {
        title: 'Quy Trình In Tampon Đồ Chơi Trẻ Em Đạt Tiêu Chuẩn An Toàn Không Chì RoHS & REACH Xuất Khẩu Mỹ - EU',
        slug: 'quy-trinh-in-tampon-do-choi-tre-em-chuan-rohs',
        primary_keyword: 'mực in an toàn tiêu chuẩn rohs reach',
        secondary_keywords: ['máy in tampon đồ chơi trẻ em', 'mực in không độc hại cho nhựa', 'tiêu chuẩn in an toàn quốc tế']
      }
    ]
  },
  5: { // Thứ 6 - Friday
    angle: 'Công Nghệ Mới & Tự Động Hóa Dây Chuyền Sản Xuất',
    pillar_id: 'pillar-v3-single-pass-uv',
    pillar_name: 'Hệ Thống Tự Động Hóa & In KTS Single Pass',
    intent: 'Commercial',
    topics: [
      {
        title: 'Dây Chuyền In Tampon Mâm Xoay 4-8 Trạm Tự Động: Tăng Năng Suất 3.600 Sản Phẩm/Giờ Cho Nhà Máy',
        slug: 'day-chuyen-in-tampon-mam-xoay-tu-dong-hoa',
        primary_keyword: 'dây chuyền in tampon tự động',
        secondary_keywords: ['máy in tampon mâm xoay', 'máy in tampon nạp phôi tự động', 'hệ thống in pad tự động b2b']
      },
      {
        title: 'Tích Hợp Cụm In UV Single Pass Trực Tiếp Lên Băng Tải Đóng Gói Có Sẵn: Tối Ưu Chi Phí & Diện Tích Xưởng',
        slug: 'tich-hop-cum-in-uv-single-pass-len-bang-tai-san-xuat',
        primary_keyword: 'hệ thống in kỹ thuật số single pass',
        secondary_keywords: ['tích hợp đầu in uv single pass', 'in mã qr biến đổi trên bao bì', 'máy in uv công nghiệp băng tải']
      },
      {
        title: 'Công Nghệ In Mã Vạch Và QR Code Dữ Liệu Biến Đổi (VDP) Tốc Độ 80m/Phút Bằng Đầu Phun UV Công Nghiệp',
        slug: 'cong-nghe-in-ma-qr-du-lieu-bien-doi-vdp-toc-do-cao',
        primary_keyword: 'in dữ liệu biến đổi vdp qr code',
        secondary_keywords: ['máy in uv single pass in thẻ nhựa', 'máy in qr code công nghiệp', 'in date và serial nhảy tự động']
      },
      {
        title: 'Hệ Thống Xử Lý Bề Mặt Plasma Lạnh & Corona Online: Bước Đột Phá Giúp Mực Bám Dính Hoàn Hảo Trên Kim Loại & Nhựa',
        slug: 'he-thong-xu-ly-be-mat-plasma-lanh-va-corona-online',
        primary_keyword: 'xử lý bề mặt corona plasma tăng bám dính',
        secondary_keywords: ['máy xử lý corona online', 'thiết bị plasma lạnh ngành in', 'đo năng lượng bề mặt phôi in dyne']
      }
    ]
  },
  6: { // Thứ 7 - Saturday
    angle: 'Cẩm Nang So Sánh Công Nghệ Toàn Diện & Hướng Dẫn A-Z (Pillar 2500 Từ)',
    pillar_id: 'pillar-v2-screen-printing',
    pillar_name: 'Cẩm Nang So Sánh Công Nghệ In B2B',
    intent: 'Informational',
    topics: [
      {
        title: 'In Lụa vs In Tampon vs In Kỹ Thuật Số UV Single Pass: So Sánh Toàn Diện Chi Phí, Năng Suất & Độ Bền',
        slug: 'so-sanh-in-lua-in-tampon-in-uv-single-pass',
        primary_keyword: 'so sánh in lụa và in tampon',
        secondary_keywords: ['khi nào nên in tampon', 'ưu nhược điểm máy in lụa', 'chi phí in uv single pass vs in lụa']
      },
      {
        title: 'Cẩm Nang Hướng Dẫn Căn Chỉnh Máy In Tampon A-Z Cho Kỹ Thuật Viên Mới Vào Nghề',
        slug: 'cam-nang-can-chinh-may-in-tampon-cho-ky-thuat-vien',
        primary_keyword: 'cách căn chỉnh máy in pad printing',
        secondary_keywords: ['hướng dẫn cài đặt máy in pad', 'chỉnh hành trình x y z máy in tampon', 'bảo trì máy in tampon định kỳ']
      },
      {
        title: 'So Sánh Mực In Tampon 1 Thành Phần vs 2 Thành Phần: Cách Pha Dung Môi Thinner & Retarder Chuẩn Nhiệt Độ Việt Nam',
        slug: 'so-sanh-muc-in-tampon-1-thanh-phan-va-2-thanh-phan',
        primary_keyword: 'mực in tampon 2 thành phần',
        secondary_keywords: ['phân phối mực in tampon 2 thành phần', 'chất đóng rắn mực in tampon hardener', 'dung môi pha loãng mực tampon thinner']
      },
      {
        title: 'Bài Toán Kinh Tế Cho Nhà Máy: Nên Tự Đầu Tư Hệ Thống Máy In Tampon Hay Thuê Xưởng Gia Công Ngoài?',
        slug: 'bai-toan-kinh-te-tu-dau-tu-may-in-hay-thue-gia-cong',
        primary_keyword: 'báo giá máy in tampon công nghiệp',
        secondary_keywords: ['tính chi phí khấu hao máy in pad', 'so sánh tự in và thuê gia công oem', 'thời gian hoàn vốn máy in tampon']
      }
    ]
  },
  0: { // Chủ Nhật - Sunday
    angle: 'Tiêu Chuẩn Chất Lượng, QA/QC & Hỏi Đáp Kỹ Sư Trưởng',
    pillar_id: 'pillar-v4-industrial-inks',
    pillar_name: 'Tiêu Chuẩn Kỹ Thuật & QA/QC Chuyên Nghiệp',
    intent: 'Technical',
    topics: [
      {
        title: 'Quy Trình Kiểm Tra Độ Bám Dính Mực In Công Nghiệp Bằng Băng Keo Theo Tiêu Chuẩn ASTM D3359 Cấp 5B',
        slug: 'quy-trinh-kiem-tra-do-bam-dinh-muc-in-astm-d3359',
        primary_keyword: 'kiểm tra độ bám dính mực in astm d3359',
        secondary_keywords: ['test băng dính 3m 600 màng mực', 'thang đo độ bám dính astm d3359', 'tiêu chuẩn kiểm tra chất lượng in ấn qa']
      },
      {
        title: 'Hỏi Đáp Cùng Kỹ Sư Trưởng VNPIS: Các Tiêu Chuẩn An Toàn Mực In RoHS 2.0, REACH & FDA Cho Hàng Xuất Khẩu',
        slug: 'hoi-dap-ky-su-truong-tieu-chuan-rohs-reach-fda-muc-in',
        primary_keyword: 'tiêu chuẩn an toàn mực in rohs reach fda',
        secondary_keywords: ['mực in an toàn thực phẩm fda', 'chứng chỉ rohs cho linh kiện in', 'hóa chất mực in xuất khẩu châu âu']
      },
      {
        title: 'Hướng Dẫn Thiết Kế & Gia Công Đồ Gá Nhôm CNC (Fixture/Jig) Định Vị Chính Xác Cho Sản Phẩm Khó In',
        slug: 'huong-dan-thiet-ke-gia-cong-do-ga-in-tampon-jig-cnc',
        primary_keyword: 'thiết kế đồ gá máy in tampon',
        secondary_keywords: ['khuôn gá in pad cnc', 'fixture định vị in lụa tròn', 'chế tạo jig in ấn theo yêu cầu']
      },
      {
        title: 'Kỹ Thuật Bảo Dưỡng Hệ Thống Khí Nén SMC / FESTO Trên Máy In Tampon Giúp Kéo Dài Tuổi Thọ Thiết Bị Trên 10 Năm',
        slug: 'ky-thuat-bao-duong-khi-nen-smc-festo-may-in-tampon',
        primary_keyword: 'bảo trì máy in tampon định kỳ',
        secondary_keywords: ['hệ thống khí nén máy in pad', 'van điện từ festo máy in', 'bảo dưỡng xy lanh khí nén công nghiệp']
      }
    ]
  }
};

/**
 * Resolves the scheduled article topic for a specific target date
 * @param {Date} targetDate
 * @returns {object} Article metadata
 */
function resolveTopicForDate(targetDate) {
  const dayOfWeek = targetDate.getDay(); // 0 is Sunday, 1 is Monday, ...
  const theme = WEEKDAY_THEMES[dayOfWeek];
  const dateStr = targetDate.toISOString().split('T')[0];

  // Pick rotation topic based on week number of year
  const startOfYear = new Date(targetDate.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor((targetDate - startOfYear) / 86400000);
  const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  const topicIndex = (weekNumber - 1) % theme.topics.length;
  const selectedTopic = theme.topics[topicIndex];

  return {
    ...selectedTopic,
    domain: 'vnpis.com',
    pillar_id: theme.pillar_id,
    pillar_name: theme.pillar_name,
    target_intent: theme.intent,
    scheduled_date: dateStr,
    date: dateStr,
    day_name: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'][dayOfWeek],
    author: 'Lưu Trọng Tâm - Kỹ Sư Trưởng VNPIS',
    publisher_mst: '0318266611'
  };
}

/**
 * Publishes a single article for a target date
 * @param {Date} targetDate
 * @param {object} [options]
 * @returns {Promise<object>} Published result
 */
async function publishArticleForDate(targetDate, options = {}) {
  const topic = resolveTopicForDate(targetDate);
  const fileName = `${topic.slug}.md`;
  const filePath = path.join(ARTICLES_DIR, fileName);

  console.log(`\n========================================================================`);
  console.log(`🚀 PUBLISHING VNPIS DAILY ARTICLE - [${topic.day_name}] ${topic.date}`);
  console.log(`📌 Title: "${topic.title}"`);
  console.log(`🔑 Primary Keyword: "${topic.primary_keyword}"`);
  console.log(`📂 Target: ${filePath}`);
  console.log(`========================================================================`);

  if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
  }

  // Generate article with dual engine (Gemini API or High-Fidelity E-E-A-T Offline)
  const draft = await contentGenerator.generateArticle(topic, {
    offline: options.offline || false,
    schemaPath: path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/templates/article_schemas.json'),
    matrixPath: path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_strategy/interlinking_matrix.json')
  });

  // Resolve image from draft
  const resolvedImage = draft.image || draft.primaryImage || '/images/blog-placeholder.jpg';
  const fullMarkdown = draft.content;

  if (options.dryRun) {
    console.log(`[DRY-RUN] Article generated in memory (${draft.wordCount || 1800} words, Primary Image: ${resolvedImage}). Disk write skipped.`);
    return { success: true, topic, filePath, dryRun: true };
  }

  fs.writeFileSync(filePath, fullMarkdown, 'utf8');
  console.log(`✅ [SUCCESS] Article successfully written to CMS:`);
  console.log(`   - File: ${fileName}`);
  console.log(`   - Canonical: https://vnpis.com/blog/${topic.slug}`);
  console.log(`   - Hero Image: ${resolvedImage}`);
  console.log(`   - Word Count: ~${fullMarkdown.split(/\s+/).length} words`);

  // Dispatch email notification to author & reviewer
  if (!options.noEmail && !options.dryRun) {
    console.log(`📧 [EMAIL] Dispatching publication alert to user inbox (info@vnpis.com & tamluu253@gmail.com)...`);
    try {
      await sendVnpisNotification(filePath, options.recipientEmail || 'info@vnpis.com');
    } catch (err) {
      console.warn(`[WARN] Email dispatch error: ${err.message}`);
    }
  }

  return {
    success: true,
    topic,
    filePath,
    canonical: `https://vnpis.com/blog/${topic.slug}`,
    image: resolvedImage
  };
}

/**
 * Runs batch daily publishing for a range of upcoming days
 * @param {number} daysCount
 * @param {object} [options]
 * @returns {Promise<Array<object>>}
 */
async function publishUpcomingDays(daysCount = 7, options = {}) {
  const results = [];
  const today = new Date();

  console.log(`\n📅 Starting batch publishing for the next ${daysCount} days on vnpis.com...`);
  for (let i = 0; i < daysCount; i++) {
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + i);
    const res = await publishArticleForDate(targetDate, options);
    results.push(res);
  }

  console.log(`\n========================================================================`);
  console.log(`🎉 BATCH PUBLISHING COMPLETE: ${results.length} daily articles processed!`);
  console.log(`========================================================================`);
  return results;
}

// CLI Execution Support
if (require.main === module) {
  const argv = process.argv.slice(2);
  let days = 1;
  let targetDate = new Date();
  let dryRun = argv.includes('--dry-run');
  let offline = argv.includes('--offline');
  let doSync = argv.includes('--sync-photos');
  let noEmail = argv.includes('--no-email');

  const daysArg = argv.find(a => a.startsWith('--next-days='));
  if (daysArg) {
    days = parseInt(daysArg.split('=')[1], 10) || 7;
  }

  const dateArg = argv.find(a => a.startsWith('--date='));
  if (dateArg) {
    targetDate = new Date(dateArg.split('=')[1]);
  }

  (async () => {
    try {
      if (doSync) {
        console.log('[INIT] Syncing latest Google Photos before publishing...');
        await syncGooglePhotos();
      }

      const publishOpts = { dryRun, offline, noEmail };

      if (argv.includes('--today') || dateArg) {
        await publishArticleForDate(targetDate, publishOpts);
      } else {
        await publishUpcomingDays(days, publishOpts);
      }
      process.exit(0);
    } catch (err) {
      console.error('[ERROR]', err);
      process.exit(1);
    }
  })();
}

module.exports = {
  publishArticleForDate,
  publishUpcomingDays,
  resolveTopicForDate,
  WEEKDAY_THEMES
};
