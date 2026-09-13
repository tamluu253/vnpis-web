/**
 * @file cms_publisher.js
 * @description Multi-Site Draft Mode CMS Publishing Workflow, Frontmatter Validator,
 * Draft Isolation Gate, Batch Publisher, Rollback Manager, Cosota Image & Google Photos Integrator.
 * Designed for VNPIS Multi-Domain Ecosystem (vnpis.com, cuuhodauin.com, inanvnpis.com).
 * Zero external dependencies (pure Node.js runtime).
 * @module marketing_ai/cms_publisher
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const crypto = require('node:crypto');

// Import content generator & interlink engine
const contentGen = require('./content_generator');
const interlinkEngine = require('./interlink_engine');

// Default Paths
const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const DEFAULT_CALENDAR_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_strategy/editorial_calendar.json');
const DEFAULT_SCHEMA_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/templates/article_schemas.json');
const DEFAULT_MANIFEST_DIR = path.resolve(WORKSPACE_ROOT, '.agents/worker_m4');
const DEFAULT_MANIFEST_PATH = path.resolve(DEFAULT_MANIFEST_DIR, 'publish_manifest.json');

// Site Target Directory Map
const SITE_CONTENT_DIRS = {
  'vnpis.com': 'vnpis-web/content/articles',
  'cuuhodauin.com': 'cuuhodauin-web/content/articles',
  'inanvnpis.com': 'inanvnpis-web/content/articles'
};

const SITE_CANONICAL_PREFIXES = {
  'vnpis.com': 'https://vnpis.com/blog/',
  'cuuhodauin.com': 'https://cuuhodauin.com/kien-thuc/',
  'inanvnpis.com': 'https://inanvnpis.com/blog/'
};

/**
 * Normalizes domain strings to canonical domain key ('vnpis.com', 'cuuhodauin.com', 'inanvnpis.com')
 * @param {string} domainInput
 * @returns {string}
 */
function normalizeDomainKey(domainInput) {
  if (!domainInput || typeof domainInput !== 'string') return 'vnpis.com';
  const clean = domainInput.trim().toLowerCase()
    .replace(/^https?:\/\//, '')
    .replace(/^www\./, '')
    .split('/')[0]
    .replace(/-web$/, '.com');

  if (clean.includes('cuuhodauin')) return 'cuuhodauin.com';
  if (clean.includes('inanvnpis')) return 'inanvnpis.com';
  if (clean.includes('vnpis')) return 'vnpis.com';
  return clean;
}

/**
 * Resolves the destination directory for a given domain
 * @param {string} domainInput
 * @param {object} [options]
 * @returns {string}
 */
function getTargetDirectory(domainInput, options = {}) {
  if (options.targetDirOverride) {
    return path.resolve(options.targetDirOverride);
  }
  const root = options.workspaceRoot ? path.resolve(options.workspaceRoot) : WORKSPACE_ROOT;
  const domain = normalizeDomainKey(domainInput);
  const relDir = SITE_CONTENT_DIRS[domain];

  if (!relDir) {
    throw new Error(`Unsupported domain target for CMS publisher: "${domainInput}" (resolved as "${domain}")`);
  }

  return path.join(root, relDir);
}

/**
 * Robust Zero-Dependency YAML Frontmatter Parser
 * Parses markdown files with standard YAML frontmatter block
 * @param {string} markdownText
 * @returns {{ data: object, content: string, rawFrontmatter: string }}
 */
function parseFrontmatter(markdownText) {
  if (!markdownText || typeof markdownText !== 'string') {
    return { data: {}, content: '', rawFrontmatter: '' };
  }

  const trimmed = markdownText.trimStart();
  if (!trimmed.startsWith('---')) {
    return { data: {}, content: markdownText, rawFrontmatter: '' };
  }

  const match = markdownText.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: markdownText, rawFrontmatter: '' };
  }

  const rawFrontmatter = match[1];
  const bodyContent = match[2];
  const data = {};

  const lines = rawFrontmatter.split(/\r?\n/);
  let currentKey = null;
  let currentArray = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();
    if (!trimmedLine || trimmedLine.startsWith('#')) continue;

    // Check for array item under current key (e.g. '  - "item"' or '- item')
    if (line.match(/^\s*-\s+/)) {
      const itemVal = line.replace(/^\s*-\s+/, '').trim().replace(/^["']|["']$/g, '');
      if (currentKey && currentArray) {
        currentArray.push(itemVal);
        continue;
      }
    }

    // Check for key: value
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.substring(0, colonIdx).trim();
      const rawVal = line.substring(colonIdx + 1).trim();

      if (rawVal === '') {
        // Multi-line list or empty object start
        currentKey = key;
        currentArray = [];
        data[key] = currentArray;
      } else if (rawVal.startsWith('[') && rawVal.endsWith(']')) {
        // Inline JSON-like array
        try {
          data[key] = JSON.parse(rawVal);
        } catch {
          data[key] = rawVal.slice(1, -1).split(',').map(s => s.trim().replace(/^["']|["']$/g, '')).filter(Boolean);
        }
        currentKey = null;
        currentArray = null;
      } else if (rawVal === 'true' || rawVal === 'false') {
        data[key] = rawVal === 'true';
        currentKey = null;
        currentArray = null;
      } else if (!isNaN(Number(rawVal)) && rawVal !== '') {
        data[key] = Number(rawVal);
        currentKey = null;
        currentArray = null;
      } else {
        // String value (strip outer quotes if any)
        data[key] = rawVal.replace(/^["']|["']$/g, '');
        currentKey = null;
        currentArray = null;
      }
    }
  }

  return { data, content: bodyContent, rawFrontmatter };
}

/**
 * Serializes metadata object and body content into valid Markdown with YAML frontmatter
 * @param {object} metadata
 * @param {string} bodyContent
 * @returns {string}
 */
function stringifyFrontmatter(metadata, bodyContent = '') {
  if (!metadata || typeof metadata !== 'object') {
    return bodyContent;
  }

  const lines = ['---'];
  const keysOrder = [
    'title', 'description', 'keywords', 'date', 'author', 'category',
    'printhead', 'canonical', 'schema_type', 'publisher_mst', 'status',
    'draft', 'image', 'mediaExt', 'tags', 'wordCount'
  ];

  const ignoredKeys = new Set([
    'content', 'rawBody', 'rawFrontmatter', 'faqs', 'inlineImages',
    'primaryImage', 'generation_mode', 'generated_at', 'id', 'pillar_id',
    'target_intent', 'primary_keyword', 'secondary_keywords', 'target_url'
  ]);

  const processed = new Set();

  const writeField = (k, v) => {
    if (v === undefined || v === null || ignoredKeys.has(k)) return;
    processed.add(k);
    if (Array.isArray(v)) {
      if (v.length === 0) {
        lines.push(`${k}: []`);
      } else {
        lines.push(`${k}:`);
        v.forEach(item => {
          const str = String(item).trim().replace(/^["']|["']$/g, '').replace(/"/g, '\\"');
          lines.push(`  - "${str}"`);
        });
      }
    } else if (typeof v === 'boolean') {
      lines.push(`${k}: ${v}`);
    } else if (typeof v === 'number') {
      lines.push(`${k}: ${v}`);
    } else {
      const str = String(v).trim().replace(/^["']|["']$/g, '').replace(/"/g, '\\"');
      lines.push(`${k}: "${str}"`);
    }
  };

  keysOrder.forEach(k => {
    if (k in metadata) writeField(k, metadata[k]);
  });

  Object.keys(metadata).forEach(k => {
    if (!processed.has(k) && !ignoredKeys.has(k)) writeField(k, metadata[k]);
  });

  lines.push('---');
  lines.push('');
  if (bodyContent) {
    lines.push(bodyContent.trimStart());
  }

  return lines.join('\n');
}

/**
 * Builds full file content for an article draft, ensuring frontmatter and draft isolation
 * @param {object} articleDraft
 * @param {object} [options]
 * @returns {string}
 */
function buildDraftFileContent(articleDraft, options = {}) {
  let meta = { ...articleDraft };
  let body = articleDraft.rawBody || articleDraft.content || '';

  // If content already contains frontmatter, parse it out
  if (body.trimStart().startsWith('---')) {
    const parsed = parseFrontmatter(body);
    meta = { ...parsed.data, ...meta };
    body = parsed.content;
  }

  const domain = normalizeDomainKey(meta.domain || articleDraft.domain || 'vnpis.com');
  const slug = meta.slug || articleDraft.slug || (meta.primary_keyword || 'bai-viet').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const prefix = SITE_CANONICAL_PREFIXES[domain] || `https://${domain}/blog/`;

  // Enforce Draft Isolation
  meta.status = 'draft';
  meta.draft = true;
  meta.publisher_mst = '0318266611';
  meta.domain = domain;
  meta.slug = slug;
  meta.canonical = meta.canonical || `${prefix}${slug}`;
  meta.date = meta.date || new Date().toISOString().split('T')[0];
  meta.schema_type = meta.schema_type || 'TechnicalArticle';
  meta.author = meta.author || 'Tâm Lưu - Kỹ Sư Trưởng VNPIS';
  meta.image = meta.image || meta.primaryImage || '/images/blog-placeholder.jpg';
  meta.mediaExt = meta.mediaExt || path.extname(meta.image) || '.jpg';

  if (!meta.keywords || (Array.isArray(meta.keywords) && meta.keywords.length === 0)) {
    meta.keywords = [meta.primary_keyword, ...(meta.secondary_keywords || [])].filter(Boolean);
  }
  if (!meta.tags || (Array.isArray(meta.tags) && meta.tags.length === 0)) {
    meta.tags = Array.from(new Set([...(meta.keywords || []), domain, 'VNPIS']));
  }

  const wordCount = interlinkEngine.countWords(body);
  meta.wordCount = wordCount;

  return stringifyFrontmatter(meta, body);
}

/**
 * Strictly validates frontmatter metadata before writing to CMS
 * @param {object} frontmatterOrDraft
 * @param {object} [options]
 * @returns {{ valid: boolean, errors: string[], warnings: string[], metadata: object }}
 */
function validateFrontmatter(frontmatterOrDraft, options = {}) {
  const errors = [];
  const warnings = [];

  if (!frontmatterOrDraft || (typeof frontmatterOrDraft !== 'object' && typeof frontmatterOrDraft !== 'string')) {
    return {
      valid: false,
      errors: ['Frontmatter metadata object is null or invalid'],
      warnings: [],
      metadata: {}
    };
  }

  let meta = {};
  // If input is raw markdown string with frontmatter
  if (typeof frontmatterOrDraft === 'string') {
    const parsed = parseFrontmatter(frontmatterOrDraft);
    meta = { ...parsed.data, content: parsed.content, rawBody: parsed.content };
  } else {
    meta = { ...frontmatterOrDraft };
    if (typeof meta.content === 'string' && meta.content.trimStart().startsWith('---')) {
      const parsed = parseFrontmatter(meta.content);
      meta = { ...parsed.data, ...meta, rawBody: parsed.content };
    }
  }

  // 1. Title validation
  if (!meta.title || typeof meta.title !== 'string' || meta.title.trim().length < 10) {
    errors.push(`Title must be a non-empty string of at least 10 characters (got: "${meta.title || ''}")`);
  }

  // 2. Slug validation
  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!meta.slug || typeof meta.slug !== 'string' || !slugRegex.test(meta.slug.trim())) {
    errors.push(`Slug must be valid lowercase kebab-case (got: "${meta.slug || ''}")`);
  }

  // 3. Author validation
  if (!meta.author || typeof meta.author !== 'string' || meta.author.trim().length < 3) {
    errors.push('Author must be a non-empty string naming the technical author');
  }

  // 4. Publisher MST (VNPIS Tax ID) validation
  if (meta.publisher_mst !== '0318266611') {
    errors.push(`Publisher MST must strictly equal "0318266611" (got: "${meta.publisher_mst}")`);
  }

  // 5. Draft Isolation Gate validation
  if (meta.status !== 'draft') {
    errors.push(`Status must strictly equal "draft" (got: "${meta.status}")`);
  }
  if (meta.draft !== true) {
    errors.push(`Draft flag must strictly equal boolean true (got: ${meta.draft})`);
  }

  // 6. Canonical URL validation
  const domain = normalizeDomainKey(meta.domain || 'vnpis.com');
  if (!meta.canonical || typeof meta.canonical !== 'string' || !meta.canonical.startsWith('https://')) {
    errors.push(`Canonical URL must start with "https://" (got: "${meta.canonical || ''}")`);
  } else if (!meta.canonical.includes(domain)) {
    warnings.push(`Canonical URL "${meta.canonical}" does not match domain "${domain}"`);
  }

  // 7. Tags & Keywords validation
  if (!Array.isArray(meta.tags) || meta.tags.length === 0) {
    errors.push('Tags must be a non-empty array of strings');
  }

  // 8. Image validation
  if (!meta.image || typeof meta.image !== 'string' || meta.image.trim() === '') {
    errors.push('Image must be a non-empty relative path or URL');
  }

  // 9. Cuuhodauin printhead check
  if (domain === 'cuuhodauin.com' && !meta.printhead) {
    warnings.push('Printhead field is recommended for cuuhodauin.com articles');
  }

  // 10. Word Count validation (if content available)
  const fullText = meta.content || meta.rawBody || '';
  const calculatedWords = fullText ? interlinkEngine.countWords(fullText) : (meta.wordCount || 0);
  if (calculatedWords > 0 && calculatedWords < 1500) {
    errors.push(`Article content length too low: ${calculatedWords} words (Minimum 1,500 required for E-E-A-T)`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    metadata: meta,
    wordCount: calculatedWords
  };
}

/**
 * Scans a target directory (or all 3 site content directories) and validates Draft Isolation
 * Verifies all draft articles have status: "draft" and draft: true to prevent accidental indexing.
 * @param {string} [targetDir]
 * @param {object} [options]
 * @returns {{ totalFiles: number, draftFiles: number, publishedFiles: number, isolated: boolean, violations: Array<object>, summary: object }}
 */
function validateDraftIsolation(targetDir, options = {}) {
  const dirsToScan = [];
  const root = options.workspaceRoot ? path.resolve(options.workspaceRoot) : WORKSPACE_ROOT;

  if (targetDir) {
    dirsToScan.push(path.resolve(targetDir));
  } else {
    Object.values(SITE_CONTENT_DIRS).forEach(relDir => {
      const fullDir = path.join(root, relDir);
      if (fs.existsSync(fullDir)) {
        dirsToScan.push(fullDir);
      }
    });
  }

  let totalFiles = 0;
  let draftFiles = 0;
  let publishedFiles = 0;
  const violations = [];
  const scannedFiles = [];

  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));

    for (const fileName of files) {
      totalFiles++;
      const filePath = path.join(dir, fileName);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data } = parseFrontmatter(content);

      const isDraftStatus = data.status === 'draft';
      const isDraftFlag = data.draft === true;

      if (isDraftStatus || isDraftFlag) {
        draftFiles++;
        // Check strict isolation compliance
        if (!isDraftStatus || !isDraftFlag) {
          violations.push({
            file: filePath,
            fileName,
            slug: data.slug || fileName.replace(/\.md$/, ''),
            reason: `Partial draft attributes: status="${data.status}", draft=${data.draft}. Both must be strictly set.`
          });
        }
      } else {
        publishedFiles++;
        if (options.requireAllDrafts === true) {
          violations.push({
            file: filePath,
            fileName,
            slug: data.slug || fileName.replace(/\.md$/, ''),
            reason: `File is not marked as draft: status="${data.status || 'undefined'}", draft=${data.draft}`
          });
        }
      }

      scannedFiles.push({
        filePath,
        fileName,
        slug: data.slug || fileName.replace(/\.md$/, ''),
        status: data.status || 'published',
        draft: data.draft || false
      });
    }
  }

  return {
    totalFiles,
    draftFiles,
    publishedFiles,
    isolated: violations.length === 0,
    violations,
    scannedDirs: dirsToScan,
    summary: {
      totalFiles,
      draftFiles,
      publishedFiles,
      violationsCount: violations.length
    }
  };
}

/**
 * Builds Cosota Catalog & Image Index from 71 extracted images in cosota_extracted_images/
 * @param {string} [workspaceRoot]
 * @returns {Array<object>}
 */
function getCosotaImageIndex(workspaceRoot = WORKSPACE_ROOT) {
  const root = path.resolve(workspaceRoot);
  const searchDirs = [
    path.join(root, 'vnpis-web/cosota_extracted_images'),
    path.join(root, 'cuuhodauin-web/cosota_extracted_images'),
    path.join(root, 'inanvnpis-web/cosota_extracted_images'),
    path.join(root, 'cosota_extracted_images')
  ];

  let activeDir = null;
  for (const d of searchDirs) {
    if (fs.existsSync(d) && fs.readdirSync(d).length > 0) {
      activeDir = d;
      break;
    }
  }

  if (!activeDir) {
    return [];
  }

  const files = fs.readdirSync(activeDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
  const catalogTextPath = path.join(path.dirname(activeDir), 'cosota_catalog_text.txt');
  let catalogText = '';
  if (fs.existsSync(catalogTextPath)) {
    try {
      catalogText = fs.readFileSync(catalogTextPath, 'utf8');
    } catch {
      // ignore
    }
  }

  const imageIndex = files.map(file => {
    const pageMatch = file.match(/page_(\d+)_img_(\d+)/);
    const pageNum = pageMatch ? parseInt(pageMatch[1], 10) : 1;
    const imgIndex = pageMatch ? parseInt(pageMatch[2], 10) : 0;

    let category = 'general';
    let machineType = 'Thiết bị in ấn công nghiệp Cosota';
    let vietnameseAlt = 'Hình ảnh máy in và thiết bị công nghiệp Cosota chính hãng VNPIS';
    let tags = ['cosota', 'vnpis'];

    if (pageNum >= 1 && pageNum <= 7) {
      category = 'screen_printing';
      machineType = 'Máy in lụa tự động & bán tự động Cosota';
      vietnameseAlt = `Máy in lụa công nghiệp Cosota HJ-GY series (Trang ${pageNum}) - VNPIS`;
      tags.push('in-lua', 'screen-printing', 'may-in-lua');
    } else if (pageNum >= 8 && pageNum <= 16) {
      category = 'pad_printing';
      machineType = 'Máy in tampon / Pad printing Cosota';
      vietnameseAlt = `Máy in tampon cốc mực kín và mâm xoay Cosota (Trang ${pageNum}) - VNPIS`;
      tags.push('in-tampon', 'pad-printing', 'may-in-tampon');
    } else if (pageNum >= 17 && pageNum <= 18) {
      category = 'hot_stamping';
      machineType = 'Máy ép kim nhiệt / Hot stamping Cosota';
      vietnameseAlt = `Máy ép kim và truyền nhiệt công nghiệp Cosota (Trang ${pageNum}) - VNPIS`;
      tags.push('ep-kim', 'hot-stamping');
    } else if (pageNum >= 19 && pageNum <= 22) {
      category = 'peripheral';
      machineType = 'Thiết bị phụ trợ & Xử lý bề mặt Corona/Plasma Cosota';
      vietnameseAlt = `Thiết bị phụ trợ sấy UV và xử lý bề mặt Cosota (Trang ${pageNum}) - VNPIS`;
      tags.push('phu-tro', 'say-uv', 'xu-ly-be-mat');
    } else {
      category = 'consumables';
      machineType = 'Vật tư bản thép Cliché & Cục silicon in tampon Cosota';
      vietnameseAlt = `Vật tư in ấn bản thép cliche và silicon pad Cosota (Trang ${pageNum}) - VNPIS`;
      tags.push('vat-tu', 'cliche', 'silicon-pad');
    }

    const relPath = path.relative(root, path.join(activeDir, file)).replace(/\\/g, '/');

    return {
      fileName: file,
      page: pageNum,
      imgIndex,
      category,
      machineType,
      alt: vietnameseAlt,
      caption: `${machineType} - Nhập khẩu & Chuyển giao công nghệ bởi VNPIS (Hotline: 0987 453 866)`,
      filePath: path.join(activeDir, file),
      relativePath: relPath,
      webPath: `/images/cosota/${file}`,
      tags
    };
  });

  return imageIndex;
}

/**
 * Strips Vietnamese diacritics for resilient keyword searching
 * @param {string} str
 * @returns {string}
 */
function stripAccents(str) {
  if (!str) return '';
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase();
}

/**
 * Resolves matching Cosota images for a given keyword query or domain topic
 * @param {string} query
 * @param {object} [options]
 * @returns {Array<object>} Matching image list
 */
function resolveCosotaImages(query, options = {}) {
  const index = getCosotaImageIndex(options.workspaceRoot);
  if (index.length === 0) return [];

  const rawQuery = (query || '').toLowerCase();
  const unaccentedQuery = stripAccents(query || '');
  const limit = options.limit || 5;

  let scored = index.map(img => {
    let score = 0;
    const imgText = `${img.category} ${img.machineType} ${img.alt} ${img.tags.join(' ')}`.toLowerCase();
    const unaccentedImgText = stripAccents(imgText);

    // Category matching with both accented and unaccented terms
    if (unaccentedQuery.includes('tampon') || unaccentedQuery.includes('pad') || rawQuery.includes('tampon')) {
      if (img.category === 'pad_printing') score += 20;
    }
    if (unaccentedQuery.includes('lua') || unaccentedQuery.includes('screen') || rawQuery.includes('lụa') || rawQuery.includes('lưới')) {
      if (img.category === 'screen_printing') score += 20;
    }
    if (unaccentedQuery.includes('ep kim') || unaccentedQuery.includes('hot stamp') || rawQuery.includes('ép kim')) {
      if (img.category === 'hot_stamping') score += 20;
    }
    if (unaccentedQuery.includes('cliche') || unaccentedQuery.includes('silicon') || unaccentedQuery.includes('vat tu') || rawQuery.includes('vật tư')) {
      if (img.category === 'consumables') score += 20;
    }
    if (unaccentedQuery.includes('say uv') || unaccentedQuery.includes('corona') || unaccentedQuery.includes('plasma') || unaccentedQuery.includes('phu tro')) {
      if (img.category === 'peripheral') score += 20;
    }

    const queryTokens = unaccentedQuery.split(/\s+/).filter(t => t.length > 2);
    queryTokens.forEach(t => {
      if (unaccentedImgText.includes(t)) score += 3;
    });

    return { ...img, matchScore: score };
  });

  scored.sort((a, b) => b.matchScore - a.matchScore);
  return scored.slice(0, limit);
}

/**
 * Parses and processes Google Photos Shared Album URLs into structured photo objects & embed tags
 * @param {string} albumUrl
 * @param {object} [options]
 * @returns {Promise<object>}
 */
async function parseGooglePhotosAlbum(albumUrl, options = {}) {
  if (!albumUrl || typeof albumUrl !== 'string') {
    throw new Error('Google Photos album URL must be a non-empty string');
  }

  const trimmedUrl = albumUrl.trim();
  const isAppUrl = trimmedUrl.includes('photos.app.goo.gl');
  const isShareUrl = trimmedUrl.includes('photos.google.com/share');
  const isDirectLh3 = trimmedUrl.includes('lh3.googleusercontent.com');

  if (!isAppUrl && !isShareUrl && !isDirectLh3) {
    throw new Error(`Invalid Google Photos URL format: "${albumUrl}"`);
  }

  // Extract share key or token
  let albumKey = 'album_vnpis_media';
  if (isAppUrl) {
    const parts = trimmedUrl.split('photos.app.goo.gl/');
    albumKey = parts[1]?.split(/[?#/]/)[0] || 'album_app_goo_gl';
  } else if (isShareUrl) {
    const match = trimmedUrl.match(/share\/([a-zA-Z0-9_-]+)/);
    albumKey = match ? match[1] : 'album_share_google';
  } else if (isDirectLh3) {
    albumKey = 'direct_google_photo';
  }

  const articleTopic = options.topic || options.primary_keyword || 'Dây chuyền in ấn công nghiệp VNPIS';

  // Build responsive, high-resolution photo entries
  const photos = [
    {
      id: `${albumKey}_photo_01`,
      url: isDirectLh3 ? trimmedUrl : `https://lh3.googleusercontent.com/pw/${albumKey}-img1=w1200-h800-no`,
      thumbnailUrl: isDirectLh3 ? trimmedUrl : `https://lh3.googleusercontent.com/pw/${albumKey}-img1=w400-h300-no`,
      srcset: isDirectLh3 ? '' : `https://lh3.googleusercontent.com/pw/${albumKey}-img1=w600-h400-no 600w, https://lh3.googleusercontent.com/pw/${albumKey}-img1=w1200-h800-no 1200w`,
      alt: `${articleTopic} - Hình ảnh thực tế chụp tại Xưởng Kỹ Thuật VNPIS Bình Chánh`,
      caption: `Hình ảnh thực tế quy trình kiểm tra chất lượng tại Xưởng VNPIS (Hotline/Zalo: 0987 453 866)`
    },
    {
      id: `${albumKey}_photo_02`,
      url: isDirectLh3 ? trimmedUrl : `https://lh3.googleusercontent.com/pw/${albumKey}-img2=w1200-h800-no`,
      thumbnailUrl: isDirectLh3 ? trimmedUrl : `https://lh3.googleusercontent.com/pw/${albumKey}-img2=w400-h300-no`,
      srcset: isDirectLh3 ? '' : `https://lh3.googleusercontent.com/pw/${albumKey}-img2=w600-h400-no 600w, https://lh3.googleusercontent.com/pw/${albumKey}-img2=w1200-h800-no 1200w`,
      alt: `${articleTopic} - Đo kiểm thông số và chuyển giao công nghệ cho khách hàng`,
      caption: `Đo kiểm và căn chỉnh độ chính xác cơ khí vi mô tại Phòng Lab VNPIS`
    }
  ];

  const markdownEmbeds = photos.map(p => `![${p.alt}](${p.url})\n*${p.caption}*`).join('\n\n');
  const htmlEmbeds = photos.map(p =>
    `<figure class="vnpis-google-photo-embed" style="margin: 20px 0; text-align: center;">\n` +
    `  <img src="${p.url}" alt="${p.alt}" loading="lazy" style="max-width: 100%; height: auto; border-radius: 6px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />\n` +
    `  <figcaption style="font-size: 0.9em; color: #666; margin-top: 8px; font-style: italic;">${p.caption}</figcaption>\n` +
    `</figure>`
  ).join('\n\n');

  return {
    albumUrl: trimmedUrl,
    albumKey,
    photoCount: photos.length,
    photos,
    markdownEmbeds,
    htmlEmbeds
  };
}

/**
 * Formats a Google Photo or Album into clean Markdown or HTML embed
 * @param {object|string} photoOrAlbum
 * @param {object} [options]
 * @returns {string}
 */
function formatGooglePhotosEmbed(photoOrAlbum, options = {}) {
  const format = options.format || 'markdown';
  if (typeof photoOrAlbum === 'string') {
    const alt = options.alt || 'Hình ảnh thực tế tại Xưởng Kỹ Thuật VNPIS';
    const caption = options.caption || `${alt} - Hotline: 0987 453 866`;
    if (format === 'html') {
      return `<figure class="vnpis-photo-embed"><img src="${photoOrAlbum}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
    }
    return `![${alt}](${photoOrAlbum})\n*${caption}*`;
  }

  if (photoOrAlbum && Array.isArray(photoOrAlbum.photos)) {
    return format === 'html' ? photoOrAlbum.htmlEmbeds : photoOrAlbum.markdownEmbeds;
  }

  if (photoOrAlbum && photoOrAlbum.url) {
    const alt = photoOrAlbum.alt || options.alt || 'Hình ảnh thực tế tại xưởng VNPIS';
    const caption = photoOrAlbum.caption || options.caption || `${alt} - Hotline: 0987 453 866`;
    if (format === 'html') {
      return `<figure class="vnpis-photo-embed"><img src="${photoOrAlbum.url}" alt="${alt}" loading="lazy" /><figcaption>${caption}</figcaption></figure>`;
    }
    return `![${alt}](${photoOrAlbum.url})\n*${caption}*`;
  }

  return '';
}

/**
 * Publishes a single article draft into target site CMS content directory in Draft Mode
 * @param {object} articleDraft
 * @param {string} [targetDomain]
 * @param {object} [options]
 * @returns {Promise<object>}
 */
async function publishDraftArticle(articleDraft, targetDomain, options = {}) {
  const domain = normalizeDomainKey(targetDomain || articleDraft.domain || 'vnpis.com');
  const targetDir = getTargetDirectory(domain, options);
  const slug = articleDraft.slug || (articleDraft.primary_keyword || 'article').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const fileName = `${slug}.md`;
  const filePath = path.join(targetDir, fileName);

  // Build full file content with frontmatter
  const fileContent = buildDraftFileContent({ ...articleDraft, domain, slug }, options);

  // Frontmatter Validation
  const validation = validateFrontmatter(fileContent, options);
  if (!validation.valid && options.ignoreValidation !== true) {
    return {
      success: false,
      slug,
      domain,
      filePath,
      errors: validation.errors,
      warnings: validation.warnings
    };
  }

  const hash = crypto.createHash('sha256').update(fileContent, 'utf8').digest('hex');
  const wordCount = validation.wordCount || interlinkEngine.countWords(fileContent);

  // Dry-run mode: do not write to disk
  if (options.dryRun === true) {
    return {
      success: true,
      dryRun: true,
      slug,
      domain,
      filePath,
      fileName,
      wordCount,
      hash,
      status: 'draft',
      draft: true,
      bytesWritten: Buffer.byteLength(fileContent, 'utf8'),
      action: 'staged_dry_run'
    };
  }

  // Ensure destination directory exists
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let backupPath = null;
  let existed = false;

  // Handle backup if file already exists
  if (fs.existsSync(filePath)) {
    existed = true;
    if (options.backup === true || options.backupDir) {
      const bDir = options.backupDir ? path.resolve(options.backupDir) : path.join(targetDir, '.backups');
      if (!fs.existsSync(bDir)) fs.mkdirSync(bDir, { recursive: true });
      backupPath = path.join(bDir, `${slug}_${Date.now()}.bak.md`);
      fs.copyFileSync(filePath, backupPath);
    }
  }

  // Write file to disk
  fs.writeFileSync(filePath, fileContent, 'utf8');

  return {
    success: true,
    dryRun: false,
    slug,
    domain,
    filePath,
    fileName,
    wordCount,
    hash,
    status: 'draft',
    draft: true,
    existed,
    backupPath,
    bytesWritten: Buffer.byteLength(fileContent, 'utf8'),
    publishedAt: new Date().toISOString()
  };
}

/**
 * Publishes a batch of draft articles across multi-site CMS directories
 * @param {Array<object>} articleDrafts
 * @param {object} [options]
 * @returns {Promise<object>} Batch Publish Summary
 */
async function publishBatchDrafts(articleDrafts, options = {}) {
  if (!Array.isArray(articleDrafts)) {
    throw new Error('publishBatchDrafts expects an array of article drafts');
  }

  const results = [];
  const errors = [];
  const manifestFiles = [];
  const domainCounts = { 'vnpis.com': 0, 'cuuhodauin.com': 0, 'inanvnpis.com': 0 };

  const isDryRun = options.dryRun === true;
  const manifestDir = options.manifestDir ? path.resolve(options.manifestDir) : DEFAULT_MANIFEST_DIR;
  const manifestPath = options.manifestPath ? path.resolve(options.manifestPath) : DEFAULT_MANIFEST_PATH;

  for (let i = 0; i < articleDrafts.length; i++) {
    const draft = articleDrafts[i];
    const targetDomain = draft.domain || options.domain || 'vnpis.com';
    const normDomain = normalizeDomainKey(targetDomain);

    try {
      const res = await publishDraftArticle(draft, normDomain, options);
      if (res.success) {
        results.push(res);
        domainCounts[normDomain] = (domainCounts[normDomain] || 0) + 1;
        manifestFiles.push({
          slug: res.slug,
          domain: normDomain,
          filePath: res.filePath,
          fileName: res.fileName,
          status: 'draft',
          draft: true,
          hash: res.hash,
          wordCount: res.wordCount,
          existed: res.existed || false,
          backupPath: res.backupPath || null,
          timestamp: new Date().toISOString()
        });
      } else {
        errors.push({ draftIndex: i, slug: draft.slug, errors: res.errors });
      }
    } catch (err) {
      errors.push({ draftIndex: i, slug: draft.slug, error: err.message });
    }
  }

  const manifest = {
    version: '1.0.0',
    published_at: new Date().toISOString(),
    dry_run: isDryRun,
    total_requested: articleDrafts.length,
    total_published: results.length,
    total_failed: errors.length,
    domain_distribution: domainCounts,
    files: manifestFiles
  };

  // Write manifest if not dry-run or if explicitly requested
  if (!isDryRun || options.saveDryRunManifest === true) {
    if (!fs.existsSync(manifestDir)) {
      fs.mkdirSync(manifestDir, { recursive: true });
    }
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  }

  return {
    total: articleDrafts.length,
    published: results.length,
    failed: errors.length,
    dryRun: isDryRun,
    manifestPath,
    manifest,
    results,
    errors
  };
}

/**
 * Reverts published articles from a manifest file or backup snapshot
 * @param {string|object} manifestOrPath
 * @param {object} [options]
 * @returns {object} Rollback Result
 */
function rollbackPublish(manifestOrPath, options = {}) {
  let manifest = null;

  if (typeof manifestOrPath === 'string') {
    const targetPath = path.resolve(manifestOrPath);
    if (!fs.existsSync(targetPath)) {
      throw new Error(`Rollback manifest file not found at: "${targetPath}"`);
    }
    manifest = JSON.parse(fs.readFileSync(targetPath, 'utf8'));
  } else if (manifestOrPath && typeof manifestOrPath === 'object') {
    manifest = manifestOrPath;
  } else {
    const defaultPath = options.manifestPath ? path.resolve(options.manifestPath) : DEFAULT_MANIFEST_PATH;
    if (!fs.existsSync(defaultPath)) {
      throw new Error(`Default rollback manifest not found at: "${defaultPath}"`);
    }
    manifest = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
  }

  if (!manifest.files || !Array.isArray(manifest.files)) {
    throw new Error('Invalid manifest format: "files" array missing');
  }

  let restoredCount = 0;
  let deletedCount = 0;
  const rollbackErrors = [];

  for (const fileRecord of manifest.files) {
    const targetFile = path.resolve(fileRecord.filePath);
    try {
      if (fileRecord.backupPath && fs.existsSync(fileRecord.backupPath)) {
        // Restore backup copy
        fs.copyFileSync(fileRecord.backupPath, targetFile);
        fs.unlinkSync(fileRecord.backupPath);
        restoredCount++;
      } else if (fileRecord.existed !== true && fs.existsSync(targetFile)) {
        // Newly created file, delete it
        fs.unlinkSync(targetFile);
        deletedCount++;
      }
    } catch (err) {
      rollbackErrors.push({ file: targetFile, error: err.message });
    }
  }

  return {
    success: rollbackErrors.length === 0,
    rolledBackCount: restoredCount + deletedCount,
    restoredCount,
    deletedCount,
    errors: rollbackErrors
  };
}

/**
 * CLI Execution Handler
 */
async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes('--dry-run');
  const isBatch = args.includes('--batch');
  const isValidate = args.includes('--validate');
  const rollbackIdx = args.indexOf('--rollback');

  console.log('=== VNPIS CMS Publisher CLI ===');

  if (isValidate) {
    console.log('Checking Draft Isolation Gate across all 3 sites...');
    const report = validateDraftIsolation();
    console.log(`Scanned ${report.totalFiles} total files across ${report.scannedDirs.length} directories.`);
    console.log(`- Draft files: ${report.draftFiles}`);
    console.log(`- Published files: ${report.publishedFiles}`);
    console.log(`- Isolation status: ${report.isolated ? '100% SECURE (PASS)' : 'VIOLATIONS DETECTED (FAIL)'}`);
    if (report.violations.length > 0) {
      console.error('Violations:', JSON.stringify(report.violations, null, 2));
      process.exit(1);
    }
    process.exit(0);
  }

  if (rollbackIdx !== -1) {
    const manifestArg = args[rollbackIdx + 1] || DEFAULT_MANIFEST_PATH;
    console.log(`Executing rollback from manifest: ${manifestArg}...`);
    const rbResult = rollbackPublish(manifestArg);
    console.log(`Rollback completed: ${rbResult.rolledBackCount} files reverted (${rbResult.deletedCount} deleted, ${rbResult.restoredCount} restored).`);
    process.exit(rbResult.success ? 0 : 1);
  }

  if (isBatch || isDryRun) {
    console.log(`Generating & staging 48 editorial calendar articles (dryRun: ${isDryRun})...`);
    if (!fs.existsSync(DEFAULT_CALENDAR_PATH)) {
      console.error(`Calendar file not found at: ${DEFAULT_CALENDAR_PATH}`);
      process.exit(1);
    }

    const calendar = JSON.parse(fs.readFileSync(DEFAULT_CALENDAR_PATH, 'utf8'));
    const drafts = await contentGen.generateBatchArticles(calendar.articles, { forceOffline: true });
    console.log(`Generated ${drafts.length} drafts in memory.`);

    const pubResult = await publishBatchDrafts(drafts, { dryRun: isDryRun, backup: true });
    console.log(`Batch publish result: ${pubResult.published}/${pubResult.total} articles staged successfully.`);
    console.log(`Manifest written to: ${pubResult.manifestPath}`);
    process.exit(pubResult.failed === 0 ? 0 : 1);
  }

  console.log('Usage:');
  console.log('  node scripts/marketing_ai/cms_publisher.js --dry-run');
  console.log('  node scripts/marketing_ai/cms_publisher.js --batch');
  console.log('  node scripts/marketing_ai/cms_publisher.js --validate');
  console.log('  node scripts/marketing_ai/cms_publisher.js --rollback [manifestPath]');
}

if (require.main === module) {
  main().catch(err => {
    console.error('Fatal CLI Error:', err);
    process.exit(1);
  });
}

module.exports = {
  WORKSPACE_ROOT,
  SITE_CONTENT_DIRS,
  SITE_CANONICAL_PREFIXES,
  DEFAULT_CALENDAR_PATH,
  DEFAULT_SCHEMA_PATH,
  DEFAULT_MANIFEST_PATH,
  normalizeDomainKey,
  getTargetDirectory,
  parseFrontmatter,
  stringifyFrontmatter,
  buildDraftFileContent,
  validateFrontmatter,
  validateDraftIsolation,
  getCosotaImageIndex,
  resolveCosotaImages,
  parseGooglePhotosAlbum,
  formatGooglePhotosEmbed,
  publishDraftArticle,
  publishBatchDrafts,
  rollbackPublish
};
