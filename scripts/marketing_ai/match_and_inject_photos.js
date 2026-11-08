const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const CATALOG_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public/images/real_photos/photo_catalog.json');
const DIRS = [
  path.resolve(WORKSPACE_ROOT, 'vnpis-web/content/articles'),
  path.resolve(WORKSPACE_ROOT, 'content/articles')
];

// Topic classification dictionary with weighted terms
const TOPIC_RULES = {
  PAD_PRINTING: {
    strong: [
      'in tampon', 'pad printing', 'đầu in silicone', 'đầu silicon', 'chén mực', 'cốc mực',
      'cliché', 'cliche', 'bản in thép', 'máy in tampon', 'máy in pad', 'silicone pad'
    ],
    medium: ['in lõm', 'bề mặt cong', 'in phím bấm', 'in đồ gá tampon']
  },
  SCREEN_PRINTING: {
    strong: [
      'in lụa', 'in lua', 'screen printing', 'lưới in lụa', 'lưới lụa', 'lưới thụy sĩ',
      'khung nhôm in lụa', 'khung lụa', 'dao gạt pu', 'dao gạt mực', 'squeegee',
      'máy in lụa', 'chụp bản lụa', 'căng khung lụa', 'bàn in lụa'
    ],
    medium: ['in lưới', 'keo chụp bản', 'máng gạt keo']
  },
  PRINTHEAD_INDUSTRIAL: {
    strong: [
      'đầu in phun', 'đầu in công nghiệp', 'ricoh gen5', 'ricoh gen6', 'epson i3200', 'epson xp600',
      'kyocera', 'konica minolta', 'xaar', 'brother gtx', 'thông đầu in', 'súc rửa đầu in',
      'phục hồi đầu in', 'cứu hộ đầu in', 'bồn siêu âm', 'lệch tia', 'đứt tia', 'nghẹt béc', 'piezo'
    ],
    medium: ['đầu phun uv', 'bộ giảm áp', 'damper', 'capping']
  },
  CIJ_TIJ_CODING: {
    strong: [
      'in date', 'máy in date', 'cij', 'tij', 'date code', 'hạn sử dụng', 'máy in phun date',
      'máy in cầm tay tij', 'băng tải date code', 'hộp mực tij'
    ],
    medium: ['in mã vạch date', 'in số lô']
  },
  INK_SOLVENT: {
    strong: [
      'mực in công nghiệp', 'mực in lụa', 'mực in tampon', 'dung môi', 'thinner', 'retarder',
      'dung môi chậm khô', 'chất đóng rắn', 'hardener', 'độ bám dính mực', 'độ nhớt mực',
      'cốc đo độ nhớt', 'xử lý corona', 'khò lửa', 'flame treatment'
    ],
    medium: ['chất phụ gia mực', 'pha mực', 'hóa chất tẩy bản']
  },
  FINISHED_PRODUCTS: {
    strong: [
      'mẫu in nắp chai', 'mẫu in ly', 'mẫu in cốc', 'in thân bút', 'in vỏ điện tử',
      'thành phẩm in', 'mẫu in hoàn thiện'
    ],
    medium: ['in gia công trên nhựa', 'in trên kim loại', 'in trên thủy tinh']
  }
};

function classifyArticle(title, content, categories = [], tags = []) {
  const fullText = `${title} ${categories.join(' ')} ${tags.join(' ')} ${content.slice(0, 1500)}`.toLowerCase();
  
  const scores = {};
  for (const [topic, rule] of Object.entries(TOPIC_RULES)) {
    let score = 0;
    for (const kw of rule.strong) {
      const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'gi');
      const matches = fullText.match(regex);
      if (matches) score += matches.length * 3;
    }
    for (const kw of rule.medium) {
      const regex = new RegExp(`\\b${kw.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')}`, 'gi');
      const matches = fullText.match(regex);
      if (matches) score += matches.length * 1;
    }
    scores[topic] = score;
  }

  let bestTopic = null;
  let maxScore = 0;
  for (const [topic, score] of Object.entries(scores)) {
    if (score > maxScore) {
      maxScore = score;
      bestTopic = topic;
    }
  }

  // Threshold: must have a decisive score of at least 4
  if (maxScore < 4) {
    return { topic: 'UNCOVERED', score: maxScore, scores };
  }
  return { topic: bestTopic, score: maxScore, scores };
}

function cleanExistingRealPhotos(content) {
  // Strips all previous injected real photos and captions
  let cleaned = content.replace(/\n*!\[[^\]]*\]\(\/images\/real_photos\/[^\)]+\)\n*(\*[^*\n]+\*\n*)?/g, '\n');
  return cleaned;
}

function getCatalogPools() {
  if (!fs.existsSync(CATALOG_PATH)) {
    throw new Error('Photo catalog not found at ' + CATALOG_PATH);
  }
  const catalog = JSON.parse(fs.readFileSync(CATALOG_PATH, 'utf8'));
  const pools = {
    PAD_PRINTING: [],
    SCREEN_PRINTING: [],
    PRINTHEAD_INDUSTRIAL: [],
    INK_SOLVENT: [],
    CIJ_TIJ_CODING: [],
    FINISHED_PRODUCTS: [],
    WORKSHOP_GENERAL: []
  };

  let totalBrandExcluded = 0;

  for (const [fileName, item] of Object.entries(catalog)) {
    // Brand safety & NDA filter
    if (item.has_third_party_brand === true || item.brand_detected) {
      totalBrandExcluded++;
      continue;
    }

    if (item.category && pools[item.category]) {
      pools[item.category].push(item);
    }
  }

  console.log(`[MATCHER] Quarantined/Excluded ${totalBrandExcluded} photos containing third-party client logos (NDA compliant).`);
  return { catalog, pools };
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function runMatchingAndInjection() {
  console.log('[MATCHER] Loading photo catalog and pools...');
  const { catalog, pools } = getCatalogPools();
  
  console.log('[MATCHER] Verified Safe Real Photo Pools:');
  for (const [cat, list] of Object.entries(pools)) {
    console.log(`   - ${cat}: ${list.length} approved photos`);
  }

  const auditReport = {
    totalArticles: 0,
    matchedArticles: 0,
    blankArticles: 0,
    byCategory: {}
  };

  DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    console.log(`\n[MATCHER] Processing ${files.length} articles in ${path.basename(dir)}...`);

    files.forEach(f => {
      const filePath = path.join(dir, f);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      let content = parsed.content;
      const data = parsed.data || {};
      const title = data.title || f.replace(/\.md$/, '');
      const categories = Array.isArray(data.categories) ? data.categories : [];
      const tags = Array.isArray(data.tags) ? data.tags : [];

      auditReport.totalArticles++;

      // 1. Remove all old real_photos embeds
      content = cleanExistingRealPhotos(content);

      // 2. Classify article topic
      const { topic, score } = classifyArticle(title, content, categories, tags);
      const availablePhotos = pools[topic] || [];

      if (topic === 'UNCOVERED' || availablePhotos.length === 0) {
        // NO MATCH OR NO AUTHENTIC PHOTO: LEAVE COMPLETELY BLANK
        auditReport.blankArticles++;
        if (data.image && data.image.includes('/images/real_photos/')) {
          delete data.image;
        }
        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
      } else {
        // MATCH FOUND: Assign photo deterministically from the matching category pool
        auditReport.matchedArticles++;
        auditReport.byCategory[topic] = (auditReport.byCategory[topic] || 0) + 1;

        const photoIndex = hashString(f) % availablePhotos.length;
        const selectedPhoto = availablePhotos[photoIndex];

        // Use inspected caption and alt text
        const imageMarkdown = `\n\n![${selectedPhoto.alt}](${selectedPhoto.webPath})\n*${selectedPhoto.caption}*\n\n`;

        // Inject cleanly after introductory section
        if (content.includes('## 1.')) {
          if (content.includes('## 2.')) {
            content = content.replace('## 2.', `${imageMarkdown}## 2.`);
          } else {
            content = content.replace('## 1.', `## 1.\n${imageMarkdown}`);
          }
        } else if (content.includes('## ')) {
          const firstH2Idx = content.indexOf('## ');
          const nextH2Idx = content.indexOf('## ', firstH2Idx + 3);
          if (nextH2Idx !== -1) {
            content = content.slice(0, nextH2Idx) + imageMarkdown + content.slice(nextH2Idx);
          } else {
            content += imageMarkdown;
          }
        } else {
          content += imageMarkdown;
        }

        // Set frontmatter image
        data.image = selectedPhoto.webPath;

        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
      }
    });
  });

  const uniqueArticles = auditReport.totalArticles / DIRS.length;
  const uniqueMatched = auditReport.matchedArticles / DIRS.length;
  const uniqueBlank = auditReport.blankArticles / DIRS.length;

  console.log('\n================ AUDIT & MATCHING REPORT ================');
  console.log(`Total Articles Processed: ${uniqueArticles} unique articles`);
  console.log(`Articles with Genuine Matching Photos: ${uniqueMatched} (${Math.round(uniqueMatched / uniqueArticles * 100)}%)`);
  console.log(`Articles Left Blank (No Relevant Photo): ${uniqueBlank} (${Math.round(uniqueBlank / uniqueArticles * 100)}%)`);
  console.log('Breakdown by Topic Category:');
  for (const [cat, count] of Object.entries(auditReport.byCategory)) {
    console.log(`   - ${cat}: ${count / DIRS.length} articles`);
  }
  console.log('=========================================================\n');
}

if (require.main === module) {
  runMatchingAndInjection();
}

module.exports = { runMatchingAndInjection, classifyArticle, TOPIC_RULES };
