const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const DIRS = [
  path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/articles'),
  path.resolve(WORKSPACE_ROOT, 'content/articles')
];

const WORKSHOP_CATALOG_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public/images/real_photos/photo_catalog.json');
const BOLIJIE_CATALOG_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public/images/bolijie/bolijie_catalog.json');

function loadCatalogs() {
  const workshop = fs.existsSync(WORKSHOP_CATALOG_PATH) ? JSON.parse(fs.readFileSync(WORKSHOP_CATALOG_PATH, 'utf8')) : {};
  const bolijie = fs.existsSync(BOLIJIE_CATALOG_PATH) ? JSON.parse(fs.readFileSync(BOLIJIE_CATALOG_PATH, 'utf8')) : [];

  const workshopPools = {
    PAD_PRINTING: [],
    SCREEN_PRINTING: [],
    INK_SOLVENT: []
  };

  for (const item of Object.values(workshop)) {
    if (item.has_third_party_brand || item.category === 'IRRELEVANT') continue;
    if (workshopPools[item.category]) {
      workshopPools[item.category].push(item);
    }
  }

  const bolijiePools = {
    CIJ_RETORT_121C: [],
    CIJ_SECURITY: [],
    CIJ_ALCOHOL_RESISTANT: [],
    CIJ_TIRE_RUBBER: [],
    CIJ_GLASS_BOTTLE: [],
    CIJ_CABLE_PIGMENT: [],
    CIJ_HALOGEN_FREE_HEAT: [],
    CIJ_PIGMENT_YELLOW: [],
    CIJ_SPECIAL_CERAMIC: [],
    CIJ_PACKAGING: [],
    TIJ_CARTRIDGE: [],
    DOD_LARGE_CHARACTER: [],
    CIJ_GENERAL: [],
    CIJ_BOTTLE_CONSUMABLES: []
  };

  for (const item of bolijie) {
    if (bolijiePools[item.category]) {
      bolijiePools[item.category].push(item);
    }
  }

  return { workshopPools, bolijiePools };
}

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return Math.abs(hash);
}

function resolveArticleMedia(slug, title, pools) {
  const { workshopPools, bolijiePools } = pools;
  const t = `${slug} ${title}`.toLowerCase();

  // 1. EXPLICIT BLANK TOPICS (No authentic photos exist yet)
  // UV Single Pass
  if (t.includes('single-pass') || t.includes('single pass') || t.includes('carton')) {
    return { source: 'NONE', photo: null, reason: 'UV Single Pass: Chưa có ảnh thực tế (Để trống)' };
  }
  // Printheads & Restoration
  if (t.includes('dau-in') || t.includes('đầu in') || t.includes('ricoh') || t.includes('epson') || t.includes('kyocera') || t.includes('brother-gtx') || t.includes('brother gtx') || t.includes('cuu-ho') || t.includes('cứu hộ') || t.includes('thong-dau-in') || t.includes('thông đầu in')) {
    return { source: 'NONE', photo: null, reason: 'Đầu in phun công nghiệp: Chưa có ảnh thực tế (Để trống)' };
  }
  // Business, ROI, Legal, Startup
  if (t.includes('bai-toan-kinh-te') || t.includes('khoi-nghiep') || t.includes('tu-dau-tu') || t.includes('thue-gia-cong') || t.includes('bang-gia')) {
    // If it's general business without specific equipment
    if (!t.includes('tampon') && !t.includes('in lụa') && !t.includes('cij') && !t.includes('tij')) {
      return { source: 'NONE', photo: null, reason: 'Chủ đề quản trị / kinh tế: Không chèn ảnh' };
    }
  }

  // 2. IN TAMPON / PAD PRINTING (Primary priority if mentioned in title)
  if (t.includes('tampon') || t.includes('pad printing') || t.includes('pad-printing') || t.includes('đầu silicon') || t.includes('cliché') || t.includes('cliche') || t.includes('cốc mực') || t.includes('chén mực') || t.includes('máy in tampon') || t.includes('máy in pad') || t.includes('cuc-silicone')) {
    const list = workshopPools.PAD_PRINTING;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'WORKSHOP_PAD', photo: list[idx], reason: 'In Tampon: Ảnh thực tế máy móc & đầu in silicone tại xưởng VNPIS' };
    }
  }

  // 3. IN LỤA / SCREEN PRINTING (Primary priority if mentioned in title)
  if (t.includes('in lụa') || t.includes('in lua') || t.includes('lưới in lụa') || t.includes('lưới lụa') || t.includes('dao gạt pu') || t.includes('squeegee') || t.includes('khung nhôm') || t.includes('khung lụa') || t.includes('máy in lụa') || t.includes('chụp bản lụa') || t.includes('căng khung')) {
    const list = workshopPools.SCREEN_PRINTING;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'WORKSHOP_SCREEN', photo: list[idx], reason: 'In Lụa: Ảnh thực tế máng tráng keo & khung lụa tại xưởng VNPIS' };
    }
  }

  // 4. PHA MÀU MỰC & ĐO ĐỘ NHỚT
  if (t.includes('pha-mau') || t.includes('pha màu') || t.includes('pantone') || t.includes('độ nhớt') || t.includes('hardener') || t.includes('chất đóng rắn')) {
    const list = workshopPools.INK_SOLVENT;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'WORKSHOP_INK', photo: list[idx], reason: 'Pha Mực: Ảnh thực tế đo độ nhớt & so màu Pantone tại xưởng VNPIS' };
    }
  }

  // 5. BOLIJIE CIJ / TIJ / MỰC ĐẶC BIỆT
  // Retort / luộc sôi 121°C / đồ hộp
  if (t.includes('k12') || t.includes('121') || t.includes('luoc-soi') || t.includes('luộc sôi') || t.includes('do-hop') || t.includes('đồ hộp') || t.includes('tieu-chuan-fda') || t.includes('fda')) {
    const list = bolijiePools.CIJ_RETORT_121C;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực CIJ K12 chịu nhiệt hấp tiệt trùng 121°C đồ hộp (Bolijie)' };
  }

  // Chống hàng giả / tàng hình UV
  if (t.includes('tang-hinh') || t.includes('tàng hình') || t.includes('t03') || t.includes('chong-hang-gia') || t.includes('chống hàng giả') || t.includes('phat-quang') || t.includes('bao-mat')) {
    const list = bolijiePools.CIJ_SECURITY;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực CIJ tàng hình phát quang UV chống hàng giả (Bolijie)' };
  }

  // Kháng cồn / Alcohol
  if (t.includes('khang-con') || t.includes('kháng cồn') || t.includes('alcohol') || t.includes('t113')) {
    const list = bolijiePools.CIJ_ALCOHOL_RESISTANT;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực CIJ T113C kháng cồn Ethanol y tế (Bolijie)' };
  }

  // Lốp xe / cao su lưu hóa
  if (t.includes('lop-xe') || t.includes('lốp xe') || t.includes('dzwav') || t.includes('luu-hoa') || t.includes('lưu hóa')) {
    const list = bolijiePools.CIJ_TIRE_RUBBER;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực CIJ DZWAV in lốp xe cao su chịu nhiệt lưu hóa (Bolijie)' };
  }

  // Chai thủy tinh ướt lạnh / chai bia
  if (t.includes('chai-thuy-tinh') || t.includes('thủy tinh') || t.includes('uot-lanh') || t.includes('ướt lạnh') || t.includes('chai-bia')) {
    const list = bolijiePools.CIJ_GLASS_BOTTLE;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'BOLIJIE', photo: list[idx], reason: 'Mực in date chai thủy tinh ướt lạnh TWHG (Bolijie)' };
    }
  }

  // Dây cáp điện / ống nhựa PE, PVC
  if (t.includes('day-cap') || t.includes('dây cáp') || t.includes('cable') || t.includes('ong-pe') || t.includes('ống pe') || t.includes('pvc-vang') || t.includes('linx-videojet')) {
    const list = bolijiePools.CIJ_CABLE_PIGMENT;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'BOLIJIE', photo: list[idx], reason: 'Mực pigment in dây cáp điện PVC & ống nhựa (Bolijie)' };
    }
  }

  // Vi mạch PCB chịu nhiệt 260C không halogen
  if (t.includes('mach-pcb') || t.includes('vi mạch') || t.includes('260c') || t.includes('khong-halogen') || t.includes('t68cf')) {
    const list = bolijiePools.CIJ_HALOGEN_FREE_HEAT;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực in mạch điện tử không halogen chịu nhiệt 300°C (Bolijie)' };
  }

  // Mực in trứng gia cầm
  if (t.includes('trung-ga') || t.includes('trứng gà') || t.includes('vo-trung') || t.includes('vỏ trứng') || t.includes('ke01') || t.includes('he01')) {
    const list = bolijiePools.CIJ_PACKAGING;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực in date vỏ trứng an toàn thực phẩm (Bolijie)' };
  }

  // Hộp mực TIJ
  if (t.includes('tij') || t.includes('hp45') || t.includes('cartridge')) {
    const list = bolijiePools.TIJ_CARTRIDGE;
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'BOLIJIE', photo: list[idx], reason: 'Hộp mực in date nhiệt TIJ 12.7mm HP45 (Bolijie)' };
    }
  }

  // Mực in phun cỡ lớn DOD
  if (t.includes('dod') || t.includes('vat-lieu-xay-dung')) {
    const list = bolijiePools.DOD_LARGE_CHARACTER;
    if (list.length > 0) return { source: 'BOLIJIE', photo: list[0], reason: 'Mực in phun cỡ lớn DOD cho bao bì xi măng & carton (Bolijie)' };
  }

  // Mực CIJ chung / Dung môi MEK / Máy in date
  if (t.includes('cij') || t.includes('in date') || t.includes('in-date') || t.includes('dung-moi') || t.includes('mek') || t.includes('thinner') || t.includes('nuoc-rua')) {
    const list = bolijiePools.CIJ_GENERAL.concat(bolijiePools.CIJ_PACKAGING);
    if (list.length > 0) {
      const idx = hashStr(slug) % list.length;
      return { source: 'BOLIJIE', photo: list[idx], reason: 'Mực in date CIJ công nghiệp & dung môi kiểm định (Bolijie)' };
    }
  }

  // Otherwise: leave blank
  return { source: 'NONE', photo: null, reason: 'Chủ đề khác: Chưa có ảnh thực tế (Để trống)' };
}

function cleanAllEmbeddedImages(content) {
  // Strip all markdown image embeds and accompanying italic captions
  return content.replace(/\n*!\[[^\]]*\]\([^\)]+\)\n*(\*[^*\n]+\*\n*)?/g, '\n');
}

function runAuditAndInject() {
  console.log('[AUDIT ENGINE] Loading photo catalogs...');
  const pools = loadCatalogs();

  const auditLog = [];

  DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort();

    files.forEach(f => {
      const filePath = path.join(dir, f);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      let content = parsed.content;
      const data = parsed.data || {};
      const slug = data.slug || f.replace(/\.md$/, '');
      const title = data.title || slug;

      // 1. Strip all previously inserted images
      content = cleanAllEmbeddedImages(content);

      // 2. Resolve media strictly based on title
      const res = resolveArticleMedia(slug, title, pools);

      if (res.source === 'NONE' || !res.photo) {
        delete data.image;
        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
        if (dir.includes('vnpis-web')) {
          auditLog.push({ file: f, title, status: 'BLANK', reason: res.reason, image: null });
        }
      } else {
        const photo = res.photo;
        const imageMarkdown = `\n\n![${photo.alt}](${photo.webPath})\n*${photo.caption}*\n\n`;

        if (content.includes('## 1.')) {
          if (content.includes('## 2.')) {
            content = content.replace('## 2.', `${imageMarkdown}## 2.`);
          } else {
            content = content.replace('## 1.', `## 1.\n${imageMarkdown}`);
          }
        } else if (content.includes('## ')) {
          const firstH2 = content.indexOf('## ');
          const nextH2 = content.indexOf('## ', firstH2 + 3);
          if (nextH2 !== -1) {
            content = content.slice(0, nextH2) + imageMarkdown + content.slice(nextH2);
          } else {
            content += imageMarkdown;
          }
        } else {
          content += imageMarkdown;
        }

        data.image = photo.webPath;
        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');

        if (dir.includes('vnpis-web')) {
          auditLog.push({ file: f, title, status: res.source, reason: res.reason, image: photo.webPath });
        }
      }
    });
  });

  return auditLog;
}

if (require.main === module) {
  const log = runAuditAndInject();
  console.log(`\nAudit finished for ${log.length} articles.`);
  const byStatus = {};
  log.forEach(a => {
    byStatus[a.status] = (byStatus[a.status] || 0) + 1;
  });
  console.log('Status Breakdown:', byStatus);
}

module.exports = { runAuditAndInject, resolveArticleMedia };
