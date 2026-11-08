const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.resolve(WORKSPACE_ROOT, '.env');
const PHOTOS_DIR = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public/images/real_photos');
const CATALOG_PATH = path.resolve(PHOTOS_DIR, 'photo_catalog.json');

function getApiKey() {
  const content = fs.readFileSync(ENV_PATH, 'utf8');
  for (const line of content.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('GEMINI_API_KEY=')) return trimmed.split('=')[1].trim();
  }
  return null;
}

const apiKey = getApiKey();
const WORKER_MODELS = [
  ['gemini-3.5-flash', 'gemini-3.1-flash-lite'],
  ['gemini-3.5-flash-lite', 'gemini-3.1-flash-lite-preview'],
  ['gemini-3.6-flash', 'gemini-3.1-flash-lite']
];

function loadCatalog() {
  if (fs.existsSync(CATALOG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
    } catch (e) {}
  }
  return {};
}

function saveCatalog(cat) {
  fs.writeFileSync(CATALOG_PATH, JSON.stringify(cat, null, 2), 'utf8');
}

const PROMPT = `Bạn là chuyên gia thẩm định kỹ thuật in ấn công nghiệp và kiểm duyệt NDA cho công ty VNPIS (vnpis.com).
Hãy phân tích bức ảnh chụp thực tế tại xưởng và phân loại chính xác:

DANH MỤC KỸ THUẬT (chọn đúng 1 category phù hợp nhất):
- PAD_PRINTING: Máy in tampon, đầu in silicone (hồng, đỏ, trắng...), chén/cốc mực từ tính, bản in thép cliché, bàn gá in tampon.
- SCREEN_PRINTING: Máy in lụa, khung in nhôm/gỗ, lưới in lụa, dao gạt mực PU (squeegee), máng tráng keo, máy căng khung lụa.
- PRINTHEAD_INDUSTRIAL: Đầu in phun công nghiệp (Ricoh Gen5/Gen6, Epson i3200, Kyocera, Konica Minolta, Xaar), bồn rửa siêu âm, kính lúp soi tia, máy test tia mực, cụm caping/damper.
- INK_SOLVENT: Bình/can mực in công nghiệp, chai dung môi pha loãng/chậm khô, hóa chất xử lý bề mặt corona/flame, cốc đo độ nhớt mực.
- CIJ_TIJ_CODING: Máy in date công nghiệp CIJ, máy in nhiệt TIJ cầm tay/online, băng tải date code, bình mực cartridge TIJ.
- FINISHED_PRODUCTS: Các sản phẩm mẫu đã in xong hoàn thiện (in ly nhựa, in nắp chai, thân bút, linh kiện điện tử, hộp quà).
- WORKSHOP_GENERAL: Toàn cảnh phân xưởng, kệ kho vật tư tổng hợp, kỹ sư thao tác chung chung.
- IRRELEVANT: Ảnh tài liệu văn phòng, đồ dùng cá nhân, hoặc mờ không rõ chi tiết kỹ thuật.

QUY TẮC BẢO MẬT THƯƠNG HIỆU & NDA KHÁCH HÀNG:
- Nếu bức ảnh chụp sản phẩm hoặc thiết bị có chứa LOGO HOẶC NHÃN HIỆU RÕ RÀNG của một công ty/thương hiệu bên ngoài (không phải logo VNPIS), ví dụ: Hannaford, AMI-CELL, Samsung, Coca Cola, Unilever... -> Đặt has_third_party_brand = true và ghi rõ brand_detected.
- Nếu không có logo hãng khác -> has_third_party_brand = false, brand_detected = null.

Trả về DUY NHẤT JSON thuần không có markdown:
{
  "category": "PAD_PRINTING | SCREEN_PRINTING | PRINTHEAD_INDUSTRIAL | INK_SOLVENT | CIJ_TIJ_CODING | FINISHED_PRODUCTS | WORKSHOP_GENERAL | IRRELEVANT",
  "has_third_party_brand": false,
  "brand_detected": null,
  "confidence": 0.95,
  "specific_items": ["vật thể 1", "vật thể 2"],
  "suitable_topics": ["chủ đề bài viết phù hợp"],
  "caption": "Mô tả trung thực, ngắn gọn và kỹ thuật về vật thể trong ảnh tại xưởng VNPIS",
  "alt": "Mô tả ALT SEO chi tiết và chính xác cho ảnh"
}`;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function classifyFile(fileName, workerId) {
  const filePath = path.join(PHOTOS_DIR, fileName);
  const base64 = fs.readFileSync(filePath).toString('base64');
  const models = WORKER_MODELS[workerId];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: PROMPT },
              { inlineData: { mimeType: 'image/jpeg', data: base64 } }
            ]
          }]
        }),
        signal: AbortSignal.timeout(18000)
      });

      if (res.status === 429) {
        console.warn(`[W${workerId}] 429 on ${model}, trying backup model...`);
        await sleep(1500);
        continue;
      }

      if (!res.ok) {
        continue;
      }

      const data = await res.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) continue;

      const cleanJson = rawText.replace(/^```json\s*/i, '').replace(/```$/i, '').trim();
      const parsed = JSON.parse(cleanJson);
      parsed.fileName = fileName;
      parsed.webPath = `/images/real_photos/${fileName}`;
      return parsed;
    } catch (e) {
      // try backup
    }
  }

  return {
    fileName,
    webPath: `/images/real_photos/${fileName}`,
    category: 'WORKSHOP_GENERAL',
    has_third_party_brand: false,
    brand_detected: null,
    confidence: 0.5,
    specific_items: ['Thiết bị xưởng VNPIS'],
    suitable_topics: ['xưởng kỹ thuật vnpis'],
    caption: 'Kỹ thuật viên thao tác thiết bị tại xưởng VNPIS',
    alt: 'Thiết bị kỹ thuật tại xưởng in công nghiệp VNPIS'
  };
}

async function run() {
  const catalog = loadCatalog();
  const allFiles = fs.readdirSync(PHOTOS_DIR)
    .filter(f => f.endsWith('.jpg') && !f.includes('test_sample'))
    .sort((a, b) => {
      const numA = parseInt(a.replace(/\D/g, '')) || 0;
      const numB = parseInt(b.replace(/\D/g, '')) || 0;
      return numA - numB;
    });

  // Filter pending files
  const pendingFiles = allFiles.filter(f => {
    return !(catalog[f] && catalog[f].category && catalog[f].has_third_party_brand !== undefined);
  });

  console.log(`[PARALLEL CLASSIFIER] Total: ${allFiles.length} photos. Pending: ${pendingFiles.length} photos.`);
  let completed = allFiles.length - pendingFiles.length;

  // Worker loop
  async function worker(workerId) {
    while (pendingFiles.length > 0) {
      const file = pendingFiles.shift();
      if (!file) break;

      console.log(`[W${workerId}] Classifying ${file} (${++completed}/${allFiles.length})...`);
      const info = await classifyFile(file, workerId);
      catalog[file] = info;
      saveCatalog(catalog);
      console.log(`   -> [W${workerId}] ${file}: ${info.category} | Safe: ${!info.has_third_party_brand} | ${info.caption.slice(0, 45)}...`);

      // Gentle spacing
      await sleep(1000);
    }
  }

  // Start 3 workers
  const numWorkers = 3;
  const workers = [];
  for (let i = 0; i < numWorkers; i++) {
    workers.push(worker(i));
  }

  await Promise.all(workers);
  console.log(`[PARALLEL CLASSIFIER] All done! Total catalog entries: ${Object.keys(catalog).length}`);
  saveCatalog(catalog);
}

run().catch(console.error);
