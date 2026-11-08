const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

async function composeCover(bgImagePath, outputPath) {
  const WIDTH = 1640;
  const HEIGHT = 624;

  console.log(`[COMPOSE] Loading background image: ${bgImagePath}...`);
  // 1. Resize background image to exact 1640x624
  const bgBuffer = await sharp(bgImagePath)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'center' })
    .toBuffer();

  // 2. Prepare Logo: circular without outer ring, size ~140x140
  const rawLogoPath = 'vnpis_marketing/images/vnpis_clean_logo.png';
  const logoSize = 140;
  
  // Create circular mask for clean logo
  const circleMask = Buffer.from(
    `<svg width="${logoSize}" height="${logoSize}">
      <circle cx="${logoSize / 2}" cy="${logoSize / 2}" r="${logoSize / 2 - 2}" fill="#fff"/>
    </svg>`
  );

  const cleanLogoCircle = await sharp(rawLogoPath)
    .resize(logoSize, logoSize, { fit: 'cover' })
    .composite([{ input: circleMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Create SVG Vector Overlay for razor-sharp typography and cards
  // Safe zone: Top >= 30px, Bottom >= 30px, Left >= 40px
  const svgOverlay = Buffer.from(`
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0F2042" stop-opacity="0.92"/>
          <stop offset="100%" stop-color="#0A1428" stop-opacity="0.95"/>
        </linearGradient>
        <linearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#38BDF8"/>
          <stop offset="100%" stop-color="#FFFFFF"/>
        </linearGradient>
        <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.6"/>
        </filter>
      </defs>

      <!-- Semi-transparent dark vignette on the left to ensure maximum text readability -->
      <rect x="0" y="0" width="850" height="${HEIGHT}" fill="url(#cardGrad)" opacity="0.65" />

      <!-- Brand Header Text (Next to logo) -->
      <g filter="url(#shadow)">
        <text x="210" y="70" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="28" font-weight="900" fill="url(#headerGrad)" letter-spacing="1.5">
          VNPIS SOLUTIONS
        </text>
        <text x="210" y="105" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="700" fill="#E2E8F0" letter-spacing="0.5">
          HỆ SINH THÁI GIẢI PHÁP &amp; THIẾT BỊ IN ẤN CÔNG NGHIỆP
        </text>
        <text x="210" y="130" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="13" font-weight="600" fill="#38BDF8" letter-spacing="1">
          PAD PRINTING • SCREEN PRINTING • INDUSTRIAL INKJET
        </text>
      </g>

      <!-- Core Pillar 1: THIẾT BỊ MÁY IN -->
      <g filter="url(#shadow)" transform="translate(50, 165)">
        <rect width="660" height="98" rx="10" fill="url(#cardGrad)" stroke="#0284C7" stroke-width="1.8" />
        <!-- Cyan badge indicator -->
        <rect x="18" y="16" width="6" height="24" rx="3" fill="#38BDF8" />
        <text x="34" y="34" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="800" fill="#38BDF8" letter-spacing="0.5">
          1. THIẾT BỊ &amp; MÁY IN CÔNG NGHIỆP
        </text>
        <text x="34" y="60" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#F8FAFC">
          • Máy In Pad (Tampon) 1-4 màu • Máy In Lụa phẳng &amp; xoay tròn
        </text>
        <text x="34" y="82" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">
          • Máy In Phun Date KTS (CIJ • TIJ • UV Single Pass tốc độ cao)
        </text>
      </g>

      <!-- Core Pillar 2: VẬT TƯ & PHỤ TÙNG -->
      <g filter="url(#shadow)" transform="translate(50, 275)">
        <rect width="660" height="98" rx="10" fill="url(#cardGrad)" stroke="#0284C7" stroke-width="1.8" />
        <rect x="18" y="16" width="6" height="24" rx="3" fill="#F59E0B" />
        <text x="34" y="34" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="800" fill="#FBBF24" letter-spacing="0.5">
          2. TRỌN GÓI VẬT TƯ &amp; PHỤ TÙNG NGÀNH IN
        </text>
        <text x="34" y="60" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#F8FAFC">
          • Đầu Silicon, Cốc Mực Kín Vòng Sứ Ceramic, Bản Thép Cliché CNC
        </text>
        <text x="34" y="82" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">
          • Khung Lưới In Lụa, Dao Gạt PU, Dung Môi &amp; Mực In Nhập Khẩu Bền Bỉ
        </text>
      </g>

      <!-- Core Pillar 3: DỊCH VỤ KỸ THUẬT -->
      <g filter="url(#shadow)" transform="translate(50, 385)">
        <rect width="660" height="98" rx="10" fill="url(#cardGrad)" stroke="#0284C7" stroke-width="1.8" />
        <rect x="18" y="16" width="6" height="24" rx="3" fill="#10B981" />
        <text x="34" y="34" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="18" font-weight="800" fill="#34D399" letter-spacing="0.5">
          3. DỊCH VỤ KỸ THUẬT CHUYÊN SÂU
        </text>
        <text x="34" y="60" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="15" font-weight="600" fill="#F8FAFC">
          • Lắp Đặt Mới • Sửa Chữa • Bảo Dưỡng • Chuyển Giao Công Nghệ A-Z
        </text>
        <text x="34" y="82" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="500" fill="#94A3B8">
          • Cứu Hộ &amp; Phục Hồi Đầu In Công Nghiệp (Brother, Konica, Ricoh, Epson)
        </text>
      </g>

      <!-- Bottom Contact Bar (Wide & Clear) -->
      <g filter="url(#shadow)" transform="translate(50, 500)">
        <rect width="1540" height="92" rx="12" fill="#0B132B" stroke="#38BDF8" stroke-width="2" />
        
        <!-- Left Side: Hotline & Website -->
        <text x="35" y="40" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="21" font-weight="900" fill="#FBBF24">
          📞 Hotline / Zalo: 0987.453.866 - Mr. Tâm
        </text>
        <text x="560" y="40" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="20" font-weight="800" fill="#38BDF8">
          🌐 Website: vnpis.com
        </text>

        <!-- Address Line -->
        <text x="35" y="72" font-family="'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="14" font-weight="600" fill="#CBD5E1">
          📍 Xưởng 1: 62 Trần Thị Nơi, Phường Chánh Hưng, TP.HCM  |  📍 Xưởng 2: Số 18 Đường Số 4, KDC Đại Phúc, Bình Hưng, Bình Chánh
        </text>
      </g>
    </svg>
  `);

  // 4. Composite Logo and SVG overlay onto Background
  console.log('[COMPOSE] Assembling layers with sharp...');
  const finalImage = await sharp(bgBuffer)
    .composite([
      { input: svgOverlay, top: 0, left: 0 },
      { input: cleanLogoCircle, top: 20, left: 50 } // Logo placed at (50, 20) with size 140x140
    ])
    .jpeg({ quality: 96 })
    .toFile(outputPath);

  console.log(`[COMPOSE SUCCESS] Created ${outputPath} (${WIDTH}x${HEIGHT})!`);
  return outputPath;
}

module.exports = { composeCover };
