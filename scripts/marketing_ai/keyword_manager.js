/**
 * @file keyword_manager.js
 * @description Core Keyword Management, Topic Cluster Validation, and Anti-Cannibalization Engine for VNPIS Multi-Domain Marketing AI.
 * @module marketing_ai/keyword_manager
 */

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_CLUSTERS_PATH = path.resolve(__dirname, '../../vnpis_marketing/seo_strategy/keyword_clusters.json');
const DEFAULT_CALENDAR_PATH = path.resolve(__dirname, '../../vnpis_marketing/seo_strategy/editorial_calendar.json');

/**
 * Domain Boundary Rules for Anti-Cannibalization
 */
const DOMAIN_BOUNDARY_RULES = {
  'vnpis.com': {
    domain: 'vnpis.com',
    positioning: 'B2B Industrial Printing Machinery, Equipment & Consumables',
    requiredAny: [
      'máy in', 'thiết bị in', 'dây chuyền in', 'bán máy', 'mua máy', 'cung cấp máy',
      'mực in', 'dung môi', 'vật tư in', 'đầu in tampon silicon', 'bản thép cliche',
      'vòng gốm ceramic', 'dao gạt squeegee', 'khung in lụa', 'hộp mực', 'cartridge',
      'tủ sấy', 'máy căng khung', 'máy chụp bản', 'cốc mực kín'
    ],
    forbiddenAny: [
      'gia công in', 'dịch vụ in', 'nhận in', 'xưởng in gia công', 'in gia công', 'nhận in gia công',
      'cứu hộ đầu in', 'sửa đầu in', 'phục hồi đầu in', 'súc rửa đầu in', 'thông vách', 'đứt tia',
      'lệch tia', 'khắc phục lỗi đầu in', 'waveform', 'piezo'
    ]
  },
  'cuuhodauin.com': {
    domain: 'cuuhodauin.com',
    positioning: 'Printhead Rescue Lab, Ultrasonic Cleaning & Diagnostics',
    requiredAny: [
      'cứu hộ', 'phục hồi', 'sửa đầu in', 'súc rửa', 'vệ sinh đầu in', 'thông nghẹt',
      'đứt tia', 'lệch tia', 'thông vách', 'siêu âm', 'waveform', 'trở kháng piezo',
      'drive voltage', 'khắc phục lỗi đầu in', 'no cure no pay', 'béc phun', 'flush solution', 'vi mạch'
    ],
    forbiddenAny: [
      'bán máy in', 'mua máy in', 'giá máy in', 'bán máy', 'cung cấp máy in', 'nhận in',
      'dịch vụ in', 'in logo', 'nhận in logo', 'in gia công', 'gia công in', 'gia công in tampon',
      'dịch vụ in gia công', 'xưởng in gia công', 'in ấn b2b'
    ]
  },
  'inanvnpis.com': {
    domain: 'inanvnpis.com',
    positioning: 'B2B OEM Custom Printing Services',
    requiredAny: [
      'gia công in', 'dịch vụ in', 'nhận in', 'xưởng in gia công', 'in lên linh kiện',
      'in logo', 'in trên bề mặt', 'in theo yêu cầu', 'in oem', 'báo giá gia công in',
      'xử lý bề mặt phôi', 'in test mẫu', 'in gia công', 'in ấn b2b', 'in uv quà tặng', 'in tem nhãn', 'in tagless'
    ],
    forbiddenAny: [
      'bán máy in', 'mua máy', 'mua máy in', 'giá máy in', 'bán máy', 'cung cấp máy in', 'cung cấp máy',
      'phân phối máy in', 'phân phối mực in', 'cứu hộ đầu in', 'sửa đầu in', 'sửa đầu in ricoh',
      'sửa đầu in epson', 'súc rửa đầu in', 'thông vách', 'đứt tia', 'thay đầu in'
    ]
  }
};

/**
 * Normalizes keyword string for comparison (Unicode NFC normalization, trim, lowercase, remove consecutive spaces)
 * @param {string} str
 * @returns {string}
 */
function normalizeKeyword(str) {
  if (!str || typeof str !== 'string') return '';
  return str.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Loads and parses Keyword Clusters JSON
 * @param {string} [filePath]
 * @returns {object}
 */
function loadKeywordClusters(filePath = DEFAULT_CLUSTERS_PATH) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Keyword clusters file not found at: ${resolvedPath}`);
  }
  const raw = fs.readFileSync(resolvedPath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Loads and parses Editorial Calendar JSON
 * @param {string} [filePath]
 * @returns {object}
 */
function loadEditorialCalendar(filePath = DEFAULT_CALENDAR_PATH) {
  const resolvedPath = path.resolve(filePath);
  if (!fs.existsSync(resolvedPath)) {
    throw new Error(`Editorial calendar file not found at: ${resolvedPath}`);
  }
  const raw = fs.readFileSync(resolvedPath, 'utf8');
  return JSON.parse(raw);
}

/**
 * Returns domain boundary rules
 * @returns {object}
 */
function getDomainRules() {
  return DOMAIN_BOUNDARY_RULES;
}

/**
 * Extracts all primary and secondary keywords per domain into a dictionary of Sets
 * Uses memoization to avoid re-traversing cluster tree on repetitive calls.
 * @param {object} clusterData
 * @returns {object} Map of domain -> Set of normalized keywords
 */
function extractAllDomainKeywords(clusterData) {
  if (!clusterData || typeof clusterData !== 'object') {
    return {
      'vnpis.com': new Set(),
      'cuuhodauin.com': new Set(),
      'inanvnpis.com': new Set()
    };
  }

  if (clusterData.__domainKeywordMap) {
    return clusterData.__domainKeywordMap;
  }

  const clusters = clusterData.domains ? clusterData.domains : clusterData;
  if (clusters && clusters.__domainKeywordMap) {
    return clusters.__domainKeywordMap;
  }

  const result = {
    'vnpis.com': new Set(),
    'cuuhodauin.com': new Set(),
    'inanvnpis.com': new Set()
  };

  for (const [domainName, domainObj] of Object.entries(clusters || {})) {
    if (!result[domainName]) {
      result[domainName] = new Set();
    }
    if (domainObj && Array.isArray(domainObj.pillars)) {
      for (const pillar of domainObj.pillars) {
        if (Array.isArray(pillar.sub_clusters)) {
          for (const sub of pillar.sub_clusters) {
            if (Array.isArray(sub.primary_keywords)) {
              for (const kw of sub.primary_keywords) {
                const norm = normalizeKeyword(kw);
                if (norm) result[domainName].add(norm);
              }
            }
            if (Array.isArray(sub.secondary_keywords)) {
              for (const kw of sub.secondary_keywords) {
                const norm = normalizeKeyword(kw);
                if (norm) result[domainName].add(norm);
              }
            }
          }
        }
      }
    }
  }

  try {
    clusterData.__domainKeywordMap = result;
    if (clusterData.domains && typeof clusterData.domains === 'object') {
      clusterData.domains.__domainKeywordMap = result;
    }
  } catch {
    // Non-fatal if object is frozen
  }

  return result;
}

const RESCUE_PATTERNS = [
  'cứu hộ', 'phục hồi', 'phục hồi đầu in', 'sửa đầu in', 'súc rửa', 'vệ sinh đầu in',
  'thông vách', 'đứt tia', 'lệch tia', 'waveform', 'piezo', 'drive voltage',
  'no cure no pay', 'béc phun', 'flush solution', 'thông nghẹt', 'khắc phục lỗi đầu in', 'thay đầu in'
];

const SERVICE_PATTERNS = [
  'gia công in', 'dịch vụ in', 'nhận in', 'xưởng in gia công', 'in lên',
  'in logo', 'nhận in logo', 'in theo yêu cầu', 'in oem', 'báo giá gia công', 'xử lý bề mặt',
  'in test mẫu', 'in b2b', 'in ấn b2b', 'in quà tặng', 'in tem nhãn', 'in tagless', 'in 360 độ',
  'nhận in gia công', 'in gia công'
];

/**
 * Classifies which domain a keyword belongs to based on semantic rules
 * @param {string} keyword
 * @returns {string} One of 'vnpis.com' | 'cuuhodauin.com' | 'inanvnpis.com'
 */
function classifyKeywordDomain(keyword) {
  const norm = normalizeKeyword(keyword);
  if (!norm) return 'vnpis.com';

  // cuuhodauin indicators
  for (let i = 0; i < RESCUE_PATTERNS.length; i++) {
    if (norm.includes(RESCUE_PATTERNS[i])) {
      return 'cuuhodauin.com';
    }
  }

  // inanvnpis indicators
  for (let i = 0; i < SERVICE_PATTERNS.length; i++) {
    if (norm.includes(SERVICE_PATTERNS[i])) {
      return 'inanvnpis.com';
    }
  }

  // default / machinery / consumables -> vnpis.com
  return 'vnpis.com';
}

/**
 * Checks whether a proposed keyword triggers cannibalization or violates domain boundary rules
 * @param {string} keyword
 * @param {string} proposedDomain
 * @param {object} [options]
 * @param {object} [options.clusters] Optional loaded clusters
 * @returns {object} { isCannibalized: boolean, reason: string|null, conflictingDomain: string|null, matchedForbiddenTerms: string[] }
 */
function checkCannibalization(keyword, proposedDomain, options = {}) {
  const norm = normalizeKeyword(keyword);
  if (!norm) {
    return {
      isCannibalized: false,
      reason: 'Empty keyword',
      conflictingDomain: null,
      matchedForbiddenTerms: []
    };
  }

  const validDomains = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];
  if (!validDomains.includes(proposedDomain)) {
    return {
      isCannibalized: true,
      reason: `Invalid proposed domain: "${proposedDomain}". Valid domains are ${validDomains.join(', ')}`,
      conflictingDomain: null,
      matchedForbiddenTerms: []
    };
  }

  const domainRule = DOMAIN_BOUNDARY_RULES[proposedDomain];
  const matchedForbiddenTerms = [];

  // Check forbidden terms for proposedDomain
  if (domainRule && Array.isArray(domainRule.forbiddenAny)) {
    const forbiddenNorms = domainRule._normalizedForbidden || (domainRule._normalizedForbidden = domainRule.forbiddenAny.map(normalizeKeyword));
    for (let i = 0; i < forbiddenNorms.length; i++) {
      if (norm.includes(forbiddenNorms[i])) {
        matchedForbiddenTerms.push(domainRule.forbiddenAny[i]);
      }
    }
  }

  if (matchedForbiddenTerms.length > 0) {
    let conflicting = classifyKeywordDomain(norm);
    
    // Ensure conflictingDomain is strictly one of the OTHER domains, not proposedDomain itself
    if (conflicting === proposedDomain || !validDomains.includes(conflicting)) {
      const otherDomains = validDomains.filter(d => d !== proposedDomain);
      
      // Try classifying each matched forbidden term
      let foundOther = null;
      for (const term of matchedForbiddenTerms) {
        const termClass = classifyKeywordDomain(term);
        if (termClass && termClass !== proposedDomain && validDomains.includes(termClass)) {
          foundOther = termClass;
          break;
        }
      }
      
      if (foundOther) {
        conflicting = foundOther;
      } else {
        // Domain-specific fallback based on semantics of forbidden terms
        if (proposedDomain === 'vnpis.com') {
          const rescueHints = ['đầu in', 'cứu hộ', 'sửa', 'súc rửa', 'phục hồi', 'tia', 'waveform', 'piezo', 'vách', 'khắc phục'];
          const isRescue = matchedForbiddenTerms.some(t => rescueHints.some(h => t.includes(h)));
          conflicting = isRescue ? 'cuuhodauin.com' : 'inanvnpis.com';
        } else if (proposedDomain === 'cuuhodauin.com') {
          const serviceHints = ['in', 'gia công', 'logo', 'dịch vụ', 'xưởng', 'b2b'];
          const isService = matchedForbiddenTerms.some(t => serviceHints.some(h => t.includes(h)));
          conflicting = isService ? 'inanvnpis.com' : 'vnpis.com';
        } else if (proposedDomain === 'inanvnpis.com') {
          const rescueHints = ['đầu in', 'cứu hộ', 'sửa', 'súc rửa', 'phục hồi', 'tia', 'vách', 'thay'];
          const isRescue = matchedForbiddenTerms.some(t => rescueHints.some(h => t.includes(h)));
          conflicting = isRescue ? 'cuuhodauin.com' : 'vnpis.com';
        } else {
          conflicting = otherDomains[0];
        }
      }
    }

    return {
      isCannibalized: true,
      reason: `Keyword "${keyword}" contains forbidden terms for ${proposedDomain}: [${matchedForbiddenTerms.join(', ')}]`,
      conflictingDomain: conflicting,
      matchedForbiddenTerms
    };
  }

  // Check if keyword is already explicitly registered in another domain's clusters
  let clusters = options.clusters;
  if (!clusters) {
    try {
      clusters = loadKeywordClusters();
    } catch {
      // If clusters cannot be loaded, rely on boundary checks
      clusters = null;
    }
  }

  if (clusters) {
    const domainKeywordMap = extractAllDomainKeywords(clusters);
    for (const [dom, kwSet] of Object.entries(domainKeywordMap)) {
      if (dom !== proposedDomain && kwSet.has(norm)) {
        return {
          isCannibalized: true,
          reason: `Keyword "${keyword}" is already registered in cluster of domain "${dom}"`,
          conflictingDomain: dom,
          matchedForbiddenTerms: []
        };
      }
    }
  }

  return {
    isCannibalized: false,
    reason: null,
    conflictingDomain: null,
    matchedForbiddenTerms: []
  };
}

/**
 * Validates the full Topic Cluster dataset structure, schema, and cross-domain exclusivity
 * @param {object} [clusterData] If not provided, loads from default path
 * @returns {object} { valid: boolean, errors: string[], summary: object }
 */
function validateTopicCluster(clusterData) {
  const errors = [];
  let data = clusterData;

  if (!data) {
    try {
      data = loadKeywordClusters();
    } catch (err) {
      return { valid: false, errors: [err.message], summary: null };
    }
  }

  if (!data || typeof data !== 'object') {
    return { valid: false, errors: ['Cluster data must be an object'], summary: null };
  }

  const domainsObj = data.domains || data;
  const requiredDomains = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];

  for (const domain of requiredDomains) {
    if (!domainsObj[domain]) {
      errors.push(`Missing required domain in clusters: "${domain}"`);
    }
  }

  const domainKeywords = {};
  const pillarCounts = {};
  const subClusterCounts = {};
  let totalKeywords = 0;

  for (const domain of requiredDomains) {
    domainKeywords[domain] = new Set();
    pillarCounts[domain] = 0;
    subClusterCounts[domain] = 0;

    const domainData = domainsObj[domain];
    if (!domainData) continue;

    if (!Array.isArray(domainData.pillars) || domainData.pillars.length < 5) {
      errors.push(`Domain "${domain}" must have at least 5 pillars (found ${domainData.pillars ? domainData.pillars.length : 0})`);
    }

    if (Array.isArray(domainData.pillars)) {
      pillarCounts[domain] = domainData.pillars.length;

      for (const pillar of domainData.pillars) {
        if (!pillar.id || !pillar.name || !pillar.slug) {
          errors.push(`Pillar in "${domain}" is missing required fields (id, name, slug): ${JSON.stringify(pillar)}`);
        }

        if (!Array.isArray(pillar.sub_clusters) || pillar.sub_clusters.length === 0) {
          errors.push(`Pillar "${pillar.id}" in "${domain}" has no sub_clusters`);
          continue;
        }

        subClusterCounts[domain] += pillar.sub_clusters.length;

        for (const sub of pillar.sub_clusters) {
          if (!sub.name || !sub.target_intent || !sub.target_url_pattern) {
            errors.push(`Sub-cluster in pillar "${pillar.id}" is missing name, target_intent, or target_url_pattern`);
          }

          const primary = Array.isArray(sub.primary_keywords) ? sub.primary_keywords : [];
          const secondary = Array.isArray(sub.secondary_keywords) ? sub.secondary_keywords : [];

          if (primary.length === 0) {
            errors.push(`Sub-cluster "${sub.name}" in "${domain}" has empty primary_keywords`);
          }

          // Collect keywords and verify domain boundaries
          for (const kw of [...primary, ...secondary]) {
            const norm = normalizeKeyword(kw);
            if (!norm) continue;

            totalKeywords++;
            domainKeywords[domain].add(norm);

            // Check forbidden terms
            const rule = DOMAIN_BOUNDARY_RULES[domain];
            if (rule && Array.isArray(rule.forbiddenAny)) {
              for (const forbidden of rule.forbiddenAny) {
                if (norm.includes(normalizeKeyword(forbidden))) {
                  errors.push(`Cannibalization violation: Keyword "${kw}" in domain "${domain}" contains forbidden term "${forbidden}"`);
                }
              }
            }
          }
        }
      }
    }
  }

  // Cross-Domain Pairwise Intersection (Must be exactly 0)
  const domainPairs = [
    ['vnpis.com', 'cuuhodauin.com'],
    ['vnpis.com', 'inanvnpis.com'],
    ['cuuhodauin.com', 'inanvnpis.com']
  ];

  for (const [domA, domB] of domainPairs) {
    const setA = domainKeywords[domA] || new Set();
    const setB = domainKeywords[domB] || new Set();
    const overlap = [];

    for (const kw of setA) {
      if (setB.has(kw)) {
        overlap.push(kw);
      }
    }

    if (overlap.length > 0) {
      errors.push(`Keyword Cannibalization detected between "${domA}" and "${domB}" (${overlap.length} overlapping keywords): [${overlap.join(', ')}]`);
    }
  }

  const summary = {
    valid: errors.length === 0,
    totalKeywords,
    domainCounts: {
      'vnpis.com': domainKeywords['vnpis.com'] ? domainKeywords['vnpis.com'].size : 0,
      'cuuhodauin.com': domainKeywords['cuuhodauin.com'] ? domainKeywords['cuuhodauin.com'].size : 0,
      'inanvnpis.com': domainKeywords['inanvnpis.com'] ? domainKeywords['inanvnpis.com'].size : 0
    },
    pillarCounts,
    subClusterCounts
  };

  return {
    valid: errors.length === 0,
    errors,
    summary
  };
}

/**
 * Suggests relevant keywords for a given domain and topic while enforcing domain boundary rules
 * @param {string} domain One of 'vnpis.com' | 'cuuhodauin.com' | 'inanvnpis.com'
 * @param {string} topic Search topic or category
 * @param {object} [options]
 * @returns {Array<object>} List of suggested keywords with metadata
 */
function suggestKeywordsForTopic(domain, topic, options = {}) {
  const validDomains = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];
  if (!validDomains.includes(domain)) {
    throw new Error(`Invalid domain "${domain}". Expected one of: ${validDomains.join(', ')}`);
  }

  const clusters = options.clusters || loadKeywordClusters();
  const domainData = (clusters.domains || clusters)[domain];
  if (!domainData || !Array.isArray(domainData.pillars)) {
    return [];
  }

  const normTopic = normalizeKeyword(topic || '');
  const suggestions = [];
  const seen = new Set();

  for (let pIdx = 0; pIdx < domainData.pillars.length; pIdx++) {
    const pillar = domainData.pillars[pIdx];
    const pNameNorm = pillar.__normName || (pillar.__normName = normalizeKeyword(pillar.name));
    const pSlugNorm = pillar.__normSlug || (pillar.__normSlug = normalizeKeyword(pillar.slug));
    const pillarMatch = !normTopic || pNameNorm.includes(normTopic) || pSlugNorm.includes(normTopic);

    if (Array.isArray(pillar.sub_clusters)) {
      for (let sIdx = 0; sIdx < pillar.sub_clusters.length; sIdx++) {
        const sub = pillar.sub_clusters[sIdx];
        const sNameNorm = sub.__normName || (sub.__normName = normalizeKeyword(sub.name));
        const subMatch = !normTopic || sNameNorm.includes(normTopic);

        if (pillarMatch || subMatch) {
          if (Array.isArray(sub.primary_keywords)) {
            for (let kIdx = 0; kIdx < sub.primary_keywords.length; kIdx++) {
              const kw = sub.primary_keywords[kIdx];
              const normKw = normalizeKeyword(kw);
              if (normKw && !seen.has(normKw)) {
                const check = checkCannibalization(kw, domain, { clusters });
                if (!check.isCannibalized) {
                  seen.add(normKw);
                  suggestions.push({
                    keyword: kw,
                    type: 'primary',
                    pillar_id: pillar.id,
                    pillar_name: pillar.name,
                    sub_cluster: sub.name,
                    target_intent: sub.target_intent
                  });
                }
              }
            }
          }
          if (Array.isArray(sub.secondary_keywords)) {
            for (let kIdx = 0; kIdx < sub.secondary_keywords.length; kIdx++) {
              const kw = sub.secondary_keywords[kIdx];
              const normKw = normalizeKeyword(kw);
              if (normKw && !seen.has(normKw)) {
                const check = checkCannibalization(kw, domain, { clusters });
                if (!check.isCannibalized) {
                  seen.add(normKw);
                  suggestions.push({
                    keyword: kw,
                    type: 'secondary',
                    pillar_id: pillar.id,
                    pillar_name: pillar.name,
                    sub_cluster: sub.name,
                    target_intent: sub.target_intent
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  return suggestions;
}

/**
 * Verifies that the Editorial Calendar satisfies all business, SEO, and anti-cannibalization rules
 * @param {object} [calendarData]
 * @param {object} [clustersData]
 * @returns {object} { valid: boolean, errors: string[], totalArticles: number, domainBreakdown: object }
 */
function verifyEditorialCalendar(calendarData, clustersData) {
  const errors = [];
  let calendar = calendarData;
  let clusters = clustersData;

  if (!calendar) {
    try {
      calendar = loadEditorialCalendar();
    } catch (err) {
      return { valid: false, errors: [err.message] };
    }
  }

  if (!clusters) {
    try {
      clusters = loadKeywordClusters();
    } catch (err) {
      return { valid: false, errors: [err.message] };
    }
  }

  const articles = calendar.articles || [];
  if (!Array.isArray(articles)) {
    return { valid: false, errors: ['Calendar articles property must be an array'] };
  }

  if (articles.length !== 48) {
    errors.push(`Editorial calendar must contain exactly 48 articles (found ${articles.length})`);
  }

  const domainCounts = { 'vnpis.com': 0, 'cuuhodauin.com': 0, 'inanvnpis.com': 0 };
  const weeklyCounts = { W1: 0, W2: 0, W3: 0, W4: 0 };
  const slugsByDomain = { 'vnpis.com': new Set(), 'cuuhodauin.com': new Set(), 'inanvnpis.com': new Set() };
  const primaryKeywordsSeen = new Map();
  const validPillars = new Set();

  const domainObj = clusters.domains || clusters;
  for (const [dom, dData] of Object.entries(domainObj)) {
    if (Array.isArray(dData.pillars)) {
      for (const p of dData.pillars) {
        validPillars.add(`${dom}::${p.id}`);
      }
    }
  }

  for (let i = 0; i < articles.length; i++) {
    const art = articles[i];
    const prefix = `Article #${i + 1} (${art.id || 'unnamed'}):`;

    if (!art.id || !art.title || !art.slug || !art.domain || !art.pillar_id || !art.primary_keyword || !art.target_url) {
      errors.push(`${prefix} Missing required metadata fields`);
    }

    if (!['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'].includes(art.domain)) {
      errors.push(`${prefix} Invalid domain "${art.domain}"`);
    } else {
      domainCounts[art.domain] = (domainCounts[art.domain] || 0) + 1;

      // Check slug uniqueness per domain
      if (slugsByDomain[art.domain]) {
        if (slugsByDomain[art.domain].has(art.slug)) {
          errors.push(`${prefix} Duplicate slug "${art.slug}" on domain "${art.domain}"`);
        }
        slugsByDomain[art.domain].add(art.slug);
      }

      // Check primary keyword uniqueness across calendar
      const normPK = normalizeKeyword(art.primary_keyword);
      if (normPK) {
        if (primaryKeywordsSeen.has(normPK)) {
          errors.push(`${prefix} Duplicate primary keyword "${art.primary_keyword}" already used in article "${primaryKeywordsSeen.get(normPK)}"`);
        } else {
          primaryKeywordsSeen.set(normPK, art.id);
        }
      }

      // Check pillar existence
      const pillarKey = `${art.domain}::${art.pillar_id}`;
      if (!validPillars.has(pillarKey)) {
        errors.push(`${prefix} Pillar "${art.pillar_id}" does not exist in cluster for domain "${art.domain}"`);
      }

      // Check URL structure
      if (art.domain === 'cuuhodauin.com') {
        if (!art.target_url.startsWith('https://cuuhodauin.com/kien-thuc/')) {
          errors.push(`${prefix} cuuhodauin.com URL must follow pattern https://cuuhodauin.com/kien-thuc/{slug}`);
        }
      } else {
        if (!art.target_url.startsWith(`https://${art.domain}/blog/`)) {
          errors.push(`${prefix} ${art.domain} URL must follow pattern https://${art.domain}/blog/{slug}`);
        }
      }

      // Check Anti-Cannibalization on primary keyword
      const check = checkCannibalization(art.primary_keyword, art.domain, { clusters });
      if (check.isCannibalized) {
        errors.push(`${prefix} Primary keyword "${art.primary_keyword}" violates anti-cannibalization rule: ${check.reason}`);
      }
    }

    if (art.week) {
      weeklyCounts[art.week] = (weeklyCounts[art.week] || 0) + 1;
    }
  }

  // Check 16 articles per domain requirement
  for (const [dom, count] of Object.entries(domainCounts)) {
    if (count !== 16) {
      errors.push(`Domain "${dom}" must have exactly 16 scheduled articles (found ${count})`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    totalArticles: articles.length,
    domainBreakdown: domainCounts,
    weeklyBreakdown: weeklyCounts
  };
}

/**
 * Runs a full audit on keyword clusters and editorial calendar
 * @returns {object}
 */
function runFullAudit() {
  const clusters = loadKeywordClusters();
  const calendar = loadEditorialCalendar();

  const clusterValidation = validateTopicCluster(clusters);
  const calendarValidation = verifyEditorialCalendar(calendar, clusters);

  const allErrors = [...clusterValidation.errors, ...calendarValidation.errors];

  return {
    status: allErrors.length === 0 ? 'SUCCESS' : 'FAILED',
    cannibalization_conflicts: allErrors.filter(e => e.toLowerCase().includes('cannibalization')).length,
    total_keywords: clusterValidation.summary ? clusterValidation.summary.totalKeywords : 0,
    total_calendar_articles: calendarValidation.totalArticles || 0,
    errors: allErrors,
    summary: {
      clusters: clusterValidation.summary,
      calendar: {
        domainBreakdown: calendarValidation.domainBreakdown,
        weeklyBreakdown: calendarValidation.weeklyBreakdown
      }
    }
  };
}

module.exports = {
  loadKeywordClusters,
  loadEditorialCalendar,
  getDomainRules,
  extractAllDomainKeywords,
  classifyKeywordDomain,
  checkCannibalization,
  validateTopicCluster,
  suggestKeywordsForTopic,
  verifyEditorialCalendar,
  runFullAudit,
  normalizeKeyword,
  DEFAULT_CLUSTERS_PATH,
  DEFAULT_CALENDAR_PATH,
  DOMAIN_BOUNDARY_RULES
};
