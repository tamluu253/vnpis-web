const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const DIRS = [
  path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/articles'),
  path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/pillars'),
  path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/case-studies'),
  path.resolve(WORKSPACE_ROOT, 'content/articles')
];

const PUBLIC_DIR = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public');
const WORKSHOP_CATALOG_PATH = path.resolve(PUBLIC_DIR, 'images/real_photos/photo_catalog.json');
const BOLIJIE_CATALOG_PATH = path.resolve(PUBLIC_DIR, 'images/bolijie/bolijie_catalog.json');

function fileExists(webPath) {
  if (!webPath || !webPath.startsWith('/')) return false;
  return fs.existsSync(path.join(PUBLIC_DIR, webPath));
}

function loadCatalogs() {
  const workshop = fs.existsSync(WORKSHOP_CATALOG_PATH) ? JSON.parse(fs.readFileSync(WORKSHOP_CATALOG_PATH, 'utf8')) : {};
  const bolijie = fs.existsSync(BOLIJIE_CATALOG_PATH) ? JSON.parse(fs.readFileSync(BOLIJIE_CATALOG_PATH, 'utf8')) : [];

  const workshopPools = {
    PAD_MACHINE: [],
    PAD_SILICONE: [],
    PAD_CLICHE: [],
    PAD_INKCUP: [],
    SCREEN_FRAME: [],
    SCREEN_COATER: [],
    SCREEN_SQUEEGEE: [],
    SPECTRO_PANTONE: [],
    INK_UV: [],
    INK_SOLVENT_BOTTLE: [],
    INK_TEXTILE_SAMPLE: [],
    CIJ_CONVEYOR: [],
    FINISHED_PRODUCTS: []
  };

  for (const item of Object.values(workshop)) {
    if (item.has_third_party_brand || item.category === 'IRRELEVANT') continue;
    if ((item.confidence || 0) < 0.7) continue;
    if (!fileExists(item.webPath)) continue;

    const c = `${item.caption || ''} ${(item.specific_items || []).join(' ')}`.toLowerCase();

    if (item.category === 'PAD_PRINTING') {
      if (c.includes('cốc mực') || c.includes('chén mực')) {
        workshopPools.PAD_INKCUP.push(item);
      } else if (c.includes('cliché') || c.includes('cliche') || c.includes('bản in thép') || c.includes('đồ gá')) {
        workshopPools.PAD_CLICHE.push(item);
      } else if ((c.includes('silicone') || c.includes('đầu in')) && !c.includes('máy in')) {
        workshopPools.PAD_SILICONE.push(item);
      } else {
        workshopPools.PAD_MACHINE.push(item);
      }
    } else if (item.category === 'SCREEN_PRINTING') {
      if (c.includes('dao gạt') || c.includes('squeegee')) workshopPools.SCREEN_SQUEEGEE.push(item);
      else if (c.includes('máng tráng keo')) workshopPools.SCREEN_COATER.push(item);
      else workshopPools.SCREEN_FRAME.push(item);
    } else if (item.category === 'INK_SOLVENT') {
      if (c.includes('quang phổ') || c.includes('pantone') || c.includes('so màu') || c.includes('bảng màu')) {
        workshopPools.SPECTRO_PANTONE.push(item);
      } else if (c.includes('mực in uv') || c.includes('ucdr')) {
        workshopPools.INK_UV.push(item);
      } else if (c.includes('mẫu vải')) {
        workshopPools.INK_TEXTILE_SAMPLE.push(item);
      } else {
        workshopPools.INK_SOLVENT_BOTTLE.push(item);
      }
    } else if (item.category === 'CIJ_TIJ_CODING') {
      workshopPools.CIJ_CONVEYOR.push(item);
    } else if (item.category === 'FINISHED_PRODUCTS') {
      workshopPools.FINISHED_PRODUCTS.push(item);
    } else if (item.category === 'WORKSHOP_GENERAL' && c.includes('quang phổ')) {
      workshopPools.SPECTRO_PANTONE.push(item);
    }
  }

  const bolijiePools = {};
  for (const item of bolijie) {
    if (!fileExists(item.webPath)) continue;
    if (!bolijiePools[item.category]) bolijiePools[item.category] = [];
    bolijiePools[item.category].push(item);
  }

  return { workshopPools, bolijiePools };
}

function hashStr(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) hash = (hash << 5) - hash + str.charCodeAt(i);
  return Math.abs(hash);
}

function pick(list, slug, reason, source) {
  if (!list || list.length === 0) return null;
  const idx = hashStr(slug) % list.length;
  return { source, photo: list[idx], reason };
}

function asset(webPath, alt, caption) {
  return { webPath, alt, caption };
}

function resolveArticleMedia(slug, title, pools) {
  const { workshopPools, bolijiePools } = pools;
  const t = `${slug} ${title}`.toLowerCase();

  // 1. PRINTHEADS & DTG PRINTHEAD RECOVERY (No non-NDA authentic printhead photo available yet -> keep blank)
  if (
    !t.includes('tampon') && (
      t.includes('dau-in') || t.includes('đầu in') ||
      t.includes('ricoh') || t.includes('kyocera') ||
      t.includes('brother-dtg') || t.includes('brother-gtx') || t.includes('brother gtx') ||
      t.includes('cuu-ho') || t.includes('cứu hộ') || t.includes('thong-dau-in')
    )
  ) {
    return { source: 'NONE', photo: null, reason: 'Đầu in phun công nghiệp: Chưa có ảnh thực tế không dính NDA (Để trống)' };
  }

  // 2. EGGSHELL INK (No eggshell printing photo available -> keep blank rather than wrong packaging photo)
  if (t.includes('trung-ga') || t.includes('trứng gà') || t.includes('vo-trung') || t.includes('vỏ trứng') || t.includes('ke01') || t.includes('he01')) {
    return { source: 'NONE', photo: null, reason: 'Mực in vỏ trứng: Chưa có ảnh chụp thực tế trên trứng (Để trống)' };
  }

  // 3. UV SINGLE PASS & VARIABLE DATA CARTON
  if (t.includes('single-pass') || t.includes('single pass')) {
    const uvAssets = [
      asset('/images/machinery/industrial-uv-single-pass-corrugated-vnpis.jpg', 'Hệ thống máy in phun UV Single Pass công nghiệp cho thùng carton VNPIS', 'Hệ thống máy in UV Single Pass tốc độ cao in trực tiếp trên thùng carton và bao bì tại VNPIS'),
      asset('/images/products/uv-x1.webp', 'Máy in phun UV Single Pass công nghiệp X1 tốc độ cao', 'Dòng máy in UV Single Pass công nghiệp VNPIS chuyên in thùng carton và bao bì'),
      asset('/images/products/uv-sheet-feeder.webp', 'Hệ thống cấp phôi tự động cho máy in UV Single Pass', 'Module cấp phôi tự động tốc độ cao tích hợp dây chuyền in UV Single Pass')
    ].filter(a => fileExists(a.webPath));
    if (uvAssets.length > 0) return pick(uvAssets, slug, 'UV Single Pass: Ảnh máy in UV Single Pass thực tế', 'MACHINERY_UV');
  }
  if (t.includes('variable-data') || t.includes('du-lieu-bien-doi')) {
    if (workshopPools.CIJ_CONVEYOR.length > 0) {
      return pick(workshopPools.CIJ_CONVEYOR, slug, 'In dữ liệu biến đổi trên băng tải carton', 'WORKSHOP_CIJ');
    }
  }

  // 4. SPECTROPHOTOMETER / PANTONE COLOR MATCHING
  if (t.includes('pha-mau') || t.includes('pha màu') || t.includes('pantone') || t.includes('quang-pho') || t.includes('3nh')) {
    const res = pick(workshopPools.SPECTRO_PANTONE, slug, 'Pha màu Pantone & đo quang phổ 3NH tại xưởng VNPIS', 'WORKSHOP_SPECTRO');
    if (res) return res;
  }

  // 5. SURFACE TREATMENT (CORONA / PLASMA / PRIMER)
  if (t.includes('corona') || t.includes('plasma') || t.includes('nuoc-xu-ly-be-mat') || t.includes('xử lý bề mặt') || t.includes('bong-troc-nhua-pp-pe')) {
    const primerAssets = [
      asset('/images/products/additives/primer.webp', 'Hóa chất xử lý bề mặt Primer tăng bám dính nhựa PP PE kim loại VNPIS', 'Dung dịch xử lý bề mặt Primer chuyên dụng cho nhựa PP, PE, EVA và kim loại'),
      ...workshopPools.INK_SOLVENT_BOTTLE.filter(p => (p.caption || '').toLowerCase().includes('pp'))
    ].filter(a => fileExists(a.webPath));
    if (primerAssets.length > 0) return pick(primerAssets, slug, 'Xử lý bề mặt & Primer tăng bám dính nhựa PP/PE', 'ADDITIVES_PRIMER');
  }

  // 6. SCREEN PRINTING (IN LỤA) — matched by sub-topic!
  if (t.includes('in-lua') || t.includes('in lụa') || t.includes('luoi-in-lua') || t.includes('dao-gat-muc') || t.includes('squeegee') || t.includes('khung-lua') || t.includes('may-in-lua')) {
    if (t.includes('dao-gat') || t.includes('squeegee')) {
      const sqAssets = [
        ...workshopPools.SCREEN_SQUEEGEE,
        asset('/images/products/accessories/doctor-blade.webp', 'Dao gạt mực PU in lụa và in tampon chống ăn mòn hóa chất', 'Dao gạt mực Squeegee PU độ cứng 65-85 Shore A chuyên dụng ngành in công nghiệp')
      ].filter(a => fileExists(a.webPath));
      if (sqAssets.length > 0) return pick(sqAssets, slug, 'Dao gạt mực Squeegee PU in lụa', 'SCREEN_SQUEEGEE');
    }
    if (t.includes('luoi-in-lua') || t.includes('mesh-count') || t.includes('khung-lua')) {
      const frameAssets = [
        ...workshopPools.SCREEN_FRAME,
        ...workshopPools.SCREEN_COATER
      ];
      if (frameAssets.length > 0) return pick(frameAssets, slug, 'Khung lụa, lưới in lụa Thụy Sĩ & máng tráng keo tại xưởng VNPIS', 'SCREEN_FRAME');
    }
    if (t.includes('tru-tron') || t.includes('chai-lo') || t.includes('thuy-tinh')) {
      const roundScreen = [
        asset('/images/screen-printers/sj/b9_ss_250_3.webp', 'Máy in lụa trụ tròn bán tự động in chai lọ thủy tinh SS-250-3', 'Máy in lụa trụ tròn chuyên in chai lọ thủy tinh, ly cốc công nghiệp'),
        asset('/images/screen-printers/sj/b11_ss_500_3.webp', 'Máy in lụa trụ tròn công nghiệp đường kính lớn SS-500-3', 'Hệ thống máy in lụa tròn bán tự động cho chai lọ và ống trụ')
      ].filter(a => fileExists(a.webPath));
      if (roundScreen.length > 0) return pick(roundScreen, slug, 'Máy in lụa trụ tròn chai lọ', 'SCREEN_MACHINE');
    }
    const flatScreen = [
      asset('/images/machinery/flatbed-vacuum-screen-printer-vnpis.jpg', 'Máy in lụa phẳng bàn hút chân không công nghiệp VNPIS', 'Máy in lụa phẳng bàn hút chân không chuyên dụng cho PCB, bao bì và tem nhãn'),
      asset('/images/screen-printers/sj/b13_mn800.webp', 'Máy in lụa phẳng công nghiệp khổ lớn MN-800', 'Máy in lụa phẳng bán tự động độ chính xác cao cho xưởng sản xuất'),
      asset('/images/screen-printers/sj/b14_mn1000.webp', 'Máy in lụa phẳng bàn hút chân không MN-1000', 'Hệ thống máy in lụa phẳng công nghiệp tích hợp bàn hút chân không')
    ].filter(a => fileExists(a.webPath));
    if (flatScreen.length > 0) return pick(flatScreen, slug, 'Máy in lụa công nghiệp phẳng/bán tự động', 'SCREEN_MACHINE');
  }

  // 7. PAD PRINTING SUB-TOPICS (IN TAMPON)
  if (t.includes('cliche') || t.includes('cliché') || t.includes('ban-thep') || t.includes('bản thép')) {
    const clicheAssets = [
      ...workshopPools.PAD_CLICHE,
      asset('/images/products/plates/plate-steel-thin.webp', 'Bản thép mỏng in tampon (Cliché plate) khắc laser fiber', 'Bản thép khắc laser độ sâu 20-25µm cho máy in tampon cốc mực kín'),
      asset('/images/products/plates/plate-steel-thick.webp', 'Bản thép dày SKD11 in tampon độ bền cao', 'Bản thép dày SKD11 chịu mài mòn cao dùng cho sản xuất công nghiệp'),
      asset('/images/products/plates/plate-polymer.webp', 'Bản polymer in tampon rửa cồn/nước', 'Bản in tampon polymer dễ chế bản nhanh tại xưởng')
    ].filter(a => fileExists(a.webPath));
    if (clicheAssets.length > 0) return pick(clicheAssets, slug, 'Bản thép cliché in tampon & khắc laser fiber', 'PAD_CLICHE');
  }

  if (t.includes('coc-muc') || t.includes('cốc mực') || t.includes('vong-gom') || t.includes('ceramic')) {
    const cupAssets = [
      ...workshopPools.PAD_INKCUP,
      asset('/images/products/accessories/ink-cups.webp', 'Cốc mực kín từ tính cho máy in tampon VNPIS', 'Bộ cốc mực kín từ tính kèm vòng gạt ceramic chống bay hơi dung môi'),
      asset('/images/products/accessories/ceramic-ring.webp', 'Vòng gạt mực gốm Ceramic Zirconia siêu bền cho cốc mực kín', 'Vòng gốm Ceramic chống mài mòn cho cốc mực kín máy in tampon'),
      asset('/images/products/accessories/tungsten-ring.webp', 'Vòng gạt mực hợp kim Vonfram (Tungsten) máy in tampon', 'Vòng hợp kim Tungsten độ cứng cao cho cốc mực máy in tampon')
    ].filter(a => fileExists(a.webPath));
    if (cupAssets.length > 0) return pick(cupAssets, slug, 'Cốc mực kín & vòng gạt gốm ceramic máy in tampon', 'PAD_INKCUP');
  }

  if (t.includes('cuc-silicone') || t.includes('dau-tampon-silicon') || t.includes('do-cung-dau-tampon') || t.includes('đầu silicon')) {
    if (workshopPools.PAD_SILICONE.length > 0) {
      return pick(workshopPools.PAD_SILICONE, slug, 'Đầu in silicone tampon đa dạng độ cứng Shore A tại xưởng VNPIS', 'PAD_SILICONE');
    }
  }

  // 8. TEXTILE / TAGLESS INK (AFFORD KT1 / TL4 / ZDHC) — check before generic tampon machine fallback
  if (t.includes('tagless') || t.includes('afford-kt1') || t.includes('muc-in-vai') || t.includes('in-vai') || t.includes('vai-da') || t.includes('zdhc')) {
    const textileAssets = [
      ...workshopPools.INK_TEXTILE_SAMPLE,
      ...(bolijiePools.INK_TEXTILE || [])
    ];
    if (textileAssets.length > 0) return pick(textileAssets, slug, 'Mực in tagless & thử nghiệm trên vải', 'INK_TEXTILE');
  }

  // 9. SOLVENTS / ADDITIVES / PLASTIC INKS / INDUSTRIAL INKS — check before generic tampon machine fallback
  if (t.includes('dung-moi') || t.includes('mek') || t.includes('ethanol') || t.includes('retarder') || t.includes('hardener')) {
    const solventAssets = [
      asset('/images/products/additives/solvent.webp', 'Dung môi pha mực công nghiệp MEK / Thinner VNPIS', 'Dung môi tinh khiết chuyên dụng điều chỉnh độ nhớt mực in công nghiệp'),
      asset('/images/products/additives/hardener.webp', 'Chất đóng rắn tăng bám Hardener 2 thành phần cho mực in công nghiệp', 'Phụ gia đóng rắn Hardener tăng độ bám dính và kháng dung môi cho mực in'),
      asset('/images/products/additives/retarder.webp', 'Dung môi chậm khô Retarder cho mực in tampon và in lụa', 'Phụ gia chậm khô Retarder giúp chống khô mực trên bản in và lưới lụa'),
      ...workshopPools.INK_SOLVENT_BOTTLE
    ].filter(a => fileExists(a.webPath));
    if (solventAssets.length > 0) return pick(solventAssets, slug, 'Dung môi & phụ gia mực in công nghiệp', 'INK_SOLVENT');
  }

  if (t.includes('muc-in-uv') || t.includes('uv-lua') || t.includes('uv-tampon')) {
    if (workshopPools.INK_UV.length > 0) return pick(workshopPools.INK_UV, slug, 'Mực in UV công nghiệp tại kho VNPIS', 'INK_UV');
  }

  if (t.includes('henkey') || t.includes('ruco') || t.includes('sericom') || t.includes('dubuit') || t.includes('muc-in-nhua') || t.includes('muc-in-tampon')) {
    const inkAssets = [
      asset('/images/consumables/henkey-industrial-inks-tij-cartridges.jpg', 'Mực in công nghiệp Henkey chính hãng phân phối bởi VNPIS', 'Hệ thống mực in công nghiệp chuyên dụng bám dính cao trên nhựa và kim loại'),
      ...workshopPools.INK_SOLVENT_BOTTLE
    ].filter(a => fileExists(a.webPath));
    if (inkAssets.length > 0) return pick(inkAssets, slug, 'Mực in công nghiệp chuyên dụng VNPIS', 'INK_INDUSTRIAL');
  }

  if (t.includes('tampon') || t.includes('pad-printing') || t.includes('in-pad') || t.includes('may-in-pad')) {
    // If article is about finished products (ly nhựa, linh kiện ABS, đồ chơi, gia công)
    if ((t.includes('gia-cong') || t.includes('do-choi') || t.includes('linh-kien')) && workshopPools.FINISHED_PRODUCTS.length > 0) {
      return pick(workshopPools.FINISHED_PRODUCTS, slug, 'Sản phẩm gia công in tampon hoàn thiện tại xưởng VNPIS', 'FINISHED_PRODUCTS');
    }
    const padMachines = [
      asset('/images/machinery/pad-printer-se-125b-closed-cup-vnpis.jpg', 'Máy in tampon cốc mực kín SE-125B công nghiệp VNPIS', 'Máy in tampon cốc mực kín độ chính xác cao tại xưởng VNPIS'),
      ...workshopPools.PAD_MACHINE
    ].filter(a => fileExists(a.webPath));
    if (padMachines.length > 0) return pick(padMachines, slug, 'Máy in tampon công nghiệp thực tế tại xưởng VNPIS', 'PAD_MACHINE');
  }

  // 10. TIJ / HP45 CARTRIDGES
  if (t.includes('tij') || t.includes('hp45') || t.includes('cartridge')) {
    if (bolijiePools.TIJ_CARTRIDGE) return pick(bolijiePools.TIJ_CARTRIDGE, slug, 'Hộp mực in date nhiệt TIJ 12.7mm HP45', 'BOLIJIE_TIJ');
  }

  // 11. DOD LARGE CHARACTER (ONLY when title/slug is actually about DOD)
  if (t.includes('dod')) {
    if (bolijiePools.DOD_LARGE_CHARACTER) return pick(bolijiePools.DOD_LARGE_CHARACTER, slug, 'Mực in phun hạt lớn DOD cho bao bì carton & công nghiệp nặng', 'BOLIJIE_DOD');
  }

  // 12. CIJ SPECIALTY INKS (Strict substrate matching!)
  if (t.includes('k12') || t.includes('121') || t.includes('luoc-soi') || t.includes('luộc sôi') || t.includes('do-hop')) {
    if (bolijiePools.CIJ_RETORT_121C) return pick(bolijiePools.CIJ_RETORT_121C, slug, 'Mực CIJ K12 chịu nhiệt hấp tiệt trùng 121°C', 'BOLIJIE_CIJ');
  }
  if (t.includes('tang-hinh') || t.includes('t03') || t.includes('chong-hang-gia') || t.includes('phat-quang') || t.includes('qr-code')) {
    if (bolijiePools.CIJ_SECURITY) return pick(bolijiePools.CIJ_SECURITY, slug, 'Mực CIJ bảo mật phát quang UV chống hàng giả', 'BOLIJIE_CIJ');
  }
  if (t.includes('khang-con') || t.includes('alcohol') || t.includes('t113')) {
    if (bolijiePools.CIJ_ALCOHOL_RESISTANT) return pick(bolijiePools.CIJ_ALCOHOL_RESISTANT, slug, 'Mực CIJ T113C kháng cồn Ethanol y tế', 'BOLIJIE_CIJ');
  }
  if (t.includes('lop-xe') || t.includes('dzwav') || t.includes('twav') || t.includes('luu-hoa')) {
    if (bolijiePools.CIJ_TIRE_RUBBER) return pick(bolijiePools.CIJ_TIRE_RUBBER, slug, 'Mực CIJ DZWAV/TWAV in lốp xe cao su chịu lưu hóa', 'BOLIJIE_CIJ');
  }
  if (t.includes('thuy-tinh') || t.includes('wet-glass') || t.includes('uot-lanh') || t.includes('chai-bia')) {
    if (bolijiePools.CIJ_GLASS_BOTTLE) return pick(bolijiePools.CIJ_GLASS_BOTTLE, slug, 'Mực in date chai thủy tinh ướt lạnh TWHG', 'BOLIJIE_CIJ');
  }
  if (t.includes('day-cap') || t.includes('cable') || t.includes('ong-pe') || t.includes('ong-nhua') || t.includes('pvc') || t.includes('linx-videojet')) {
    if (bolijiePools.CIJ_CABLE_PIGMENT) return pick(bolijiePools.CIJ_CABLE_PIGMENT, slug, 'Mực pigment in dây cáp điện & ống nhựa PE/PVC', 'BOLIJIE_CIJ');
  }
  if (t.includes('pcb') || t.includes('vi-mach') || t.includes('260c') || t.includes('khong-halogen') || t.includes('k15')) {
    if (bolijiePools.CIJ_HALOGEN_FREE_HEAT) return pick(bolijiePools.CIJ_HALOGEN_FREE_HEAT, slug, 'Mực in mạch điện tử không halogen chịu nhiệt', 'BOLIJIE_CIJ');
  }
  if (t.includes('xanh-la') || t.includes('green-ink') || t.includes('muc-do-cij') || t.includes('reda')) {
    const colorCij = [...(bolijiePools.CIJ_HIGH_TEMP || []), ...(bolijiePools.CIJ_PIGMENT_YELLOW || []), ...(bolijiePools.CIJ_GENERAL || [])];
    if (colorCij.length > 0) return pick(colorCij, slug, 'Mực in date CIJ màu công nghiệp', 'BOLIJIE_CIJ');
  }
  if (t.includes('cij') || t.includes('in-date') || t.includes('khang-dau') || t.includes('t09') || t.includes('muc-bam-dinh')) {
    const genCij = [...(bolijiePools.CIJ_GENERAL || []), ...(bolijiePools.CIJ_PACKAGING || [])];
    if (genCij.length > 0) return pick(genCij, slug, 'Mực in date CIJ công nghiệp trên nhựa, kim loại và bao bì', 'BOLIJIE_CIJ');
  }

  // 13. PILLARS / GENERAL SERVICES
  if (t.includes('cho-thue-may-in') || t.includes('dich-vu-in-gia-cong') || t.includes('bao-tri-sua-chua')) {
    const showcase = asset('/images/machinery/vnpis-industrial-printing-solutions-showcase.jpg', 'Giải pháp máy in công nghiệp và dịch vụ kỹ thuật VNPIS', 'Hệ thống thiết bị in công nghiệp và dịch vụ kỹ thuật tại xưởng VNPIS');
    if (fileExists(showcase.webPath)) return { source: 'MACHINERY_SHOWCASE', photo: showcase, reason: 'Giải pháp & dịch vụ công nghiệp VNPIS' };
  }
  if (t.includes('vat-tu-in-cong-nghiep')) {
    const cup = asset('/images/products/accessories/ink-cups.webp', 'Vật tư tiêu hao ngành in công nghiệp VNPIS', 'Cung cấp trọn bộ vật tư tiêu hao ngành in tampon, in lụa và in phun');
    if (fileExists(cup.webPath)) return { source: 'ACCESSORIES', photo: cup, reason: 'Vật tư in công nghiệp VNPIS' };
  }

  return { source: 'NONE', photo: null, reason: 'Chủ đề chưa có ảnh thực tế phù hợp (Để trống)' };
}

function cleanAllEmbeddedImages(content) {
  return content.replace(/\n*!\[[^\]]*\]\([^\)]+\)\n*(\*[^*\n]+\*\n*)?/g, '\n');
}

function runAuditAndInject() {
  console.log('[AUDIT ENGINE] Loading verified media catalogs...');
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

      // Fix broken mediaExt (e.g. 'null', '.jpg', or missing file in /media/blog/)
      if (data.mediaExt !== undefined) {
        const ext = String(data.mediaExt).trim();
        const mediaPath = `/media/blog/${slug}.${ext}`;
        if (!ext || ext === 'null' || ext.startsWith('.') || !fileExists(mediaPath)) {
          delete data.mediaExt;
        }
      }

      content = cleanAllEmbeddedImages(content);
      const res = resolveArticleMedia(slug, title, pools);

      if (res.source === 'NONE' || !res.photo) {
        delete data.image;
        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
        if (dir.includes('vnpis-web')) {
          auditLog.push({ dir: path.basename(dir), file: f, title, status: 'BLANK', reason: res.reason, image: null });
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
          auditLog.push({ dir: path.basename(dir), file: f, title, status: res.source, reason: res.reason, image: photo.webPath });
        }
      }
    });
  });

  return auditLog;
}

if (require.main === module) {
  const log = runAuditAndInject();
  console.log(`\nAudit finished for ${log.length} vnpis-web documents.`);
  const byStatus = {};
  log.forEach(a => { byStatus[a.status] = (byStatus[a.status] || 0) + 1; });
  console.log('Status Breakdown:', byStatus);
  fs.writeFileSync(path.resolve(WORKSPACE_ROOT, 'scratch/audit_report.json'), JSON.stringify(log, null, 2));
}

module.exports = { runAuditAndInject, resolveArticleMedia };
