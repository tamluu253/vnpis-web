/**
 * @file interlink_engine.js
 * @description Master Cross-Domain Interlinking Engine & Dynamic Anchor Injector for VNPIS Multi-Domain Marketing AI.
 * Handles triangular cross-domain link routing, anchor diversity distribution, markdown AST protection, and link equity audits.
 * @module marketing_ai/interlink_engine
 */

const fs = require('node:fs');
const path = require('node:path');

const DEFAULT_MATRIX_PATH = path.resolve(__dirname, '../../vnpis_marketing/seo_strategy/interlinking_matrix.json');
const DEFAULT_CALENDAR_PATH = path.resolve(__dirname, '../../vnpis_marketing/seo_strategy/editorial_calendar.json');

const ANCHOR_CATEGORIES = ['partial_match', 'brand_context', 'conversational_cta', 'exact_match'];

/**
 * Normalizes keyword string for comparison (NFC Unicode, lowercase, trimmed, unified whitespace)
 * @param {string} str
 * @returns {string}
 */
function normalizeString(str) {
  if (!str || typeof str !== 'string') return '';
  return str.normalize('NFC').trim().toLowerCase().replace(/\s+/g, ' ');
}

/**
 * Extracts the base domain name from a URL or domain string
 * @param {string} urlOrDomain
 * @returns {string}
 */
function extractDomainName(urlOrDomain) {
  if (!urlOrDomain) return '';
  try {
    if (urlOrDomain.startsWith('http://') || urlOrDomain.startsWith('https://')) {
      const parsed = new URL(urlOrDomain);
      return parsed.hostname.replace(/^www\./, '');
    }
  } catch {
    // fallback to string manipulation
  }
  return urlOrDomain.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0].trim();
}

/**
 * Counts words in a string accurately (handles Vietnamese and Latin whitespace)
 * @param {string} text
 * @returns {number}
 */
function countWords(text) {
  if (!text || typeof text !== 'string') return 0;
  // Remove markdown formatting symbols for accurate word count
  const clean = text
    .replace(/^---[\s\S]*?---/m, '') // strip frontmatter
    .replace(/```[\s\S]*?```/g, '')   // strip code blocks
    .replace(/`.*?`/g, '')             // strip inline code
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // strip links
    .replace(/[#*_\->`~|]/g, ' ')
    .trim();
  const words = clean.split(/\s+/).filter(Boolean);
  return words.length;
}

/**
 * Loads and parses the interlinking matrix JSON file
 * @param {string} [filePath]
 * @returns {object}
 */
function loadInterlinkingMatrix(filePath = DEFAULT_MATRIX_PATH) {
  const targetPath = path.resolve(filePath);
  if (!fs.existsSync(targetPath)) {
    throw new Error(`Interlinking matrix file not found at path: ${targetPath}`);
  }
  const content = fs.readFileSync(targetPath, 'utf8');
  try {
    return JSON.parse(content);
  } catch (err) {
    throw new Error(`Failed to parse interlinking matrix JSON: ${err.message}`);
  }
}

/**
 * Returns all cross-domain vectors from matrix
 * @param {object} [matrix]
 * @returns {Array<object>}
 */
function getCrossDomainVectors(matrix = null) {
  const mat = matrix || loadInterlinkingMatrix();
  return mat.cross_domain_vectors || [];
}

/**
 * Returns internal linking rules for a given domain
 * @param {string} domain
 * @param {object} [matrix]
 * @returns {object|null}
 */
function getInternalRules(domain, matrix = null) {
  const mat = matrix || loadInterlinkingMatrix();
  const domKey = extractDomainName(domain);
  if (mat.internal_linking_rules && mat.internal_linking_rules[domKey]) {
    return mat.internal_linking_rules[domKey];
  }
  return null;
}

/**
 * Validates the full structure and integrity of the interlinking matrix
 * @param {object} [matrix]
 * @returns {{ valid: boolean, errors: string[], vectorCount: number }}
 */
function validateInterlinkRules(matrix = null) {
  const mat = matrix || loadInterlinkingMatrix();
  const errors = [];

  if (!mat.version) errors.push('Matrix missing "version" field.');
  if (!mat.updated_at) errors.push('Matrix missing "updated_at" field.');
  if (!mat.organization || !mat.organization.mst) errors.push('Matrix missing organization MST.');
  if (!mat.domains || Object.keys(mat.domains).length < 3) {
    errors.push('Matrix must configure all 3 domains: vnpis.com, cuuhodauin.com, inanvnpis.com.');
  }

  const vectors = mat.cross_domain_vectors || [];
  if (vectors.length !== 6) {
    errors.push(`Expected exactly 6 cross-domain vectors, found ${vectors.length}.`);
  }

  const expectedPairs = [
    ['vnpis.com', 'cuuhodauin.com'],
    ['vnpis.com', 'inanvnpis.com'],
    ['cuuhodauin.com', 'vnpis.com'],
    ['cuuhodauin.com', 'inanvnpis.com'],
    ['inanvnpis.com', 'vnpis.com'],
    ['inanvnpis.com', 'cuuhodauin.com']
  ];

  const foundPairs = new Set();

  for (const vec of vectors) {
    if (!vec.vector_id) errors.push(`Vector missing vector_id: ${JSON.stringify(vec)}`);
    const src = extractDomainName(vec.source_domain);
    const tgt = extractDomainName(vec.target_domain);

    if (src === tgt) {
      errors.push(`Self-linking vector detected: ${vec.vector_id} (${src} -> ${tgt})`);
    }

    const pairKey = `${src}->${tgt}`;
    foundPairs.add(pairKey);

    if (!Array.isArray(vec.routes) || vec.routes.length < 3) {
      errors.push(`Vector ${vec.vector_id} must have at least 3 routes, found ${vec.routes ? vec.routes.length : 0}`);
    }

    if (Array.isArray(vec.routes)) {
      for (const route of vec.routes) {
        if (!route.route_id) errors.push(`Route in vector ${vec.vector_id} missing route_id`);
        if (!route.target_url) errors.push(`Route ${route.route_id} missing target_url`);
        if (!Array.isArray(route.trigger_keywords) || route.trigger_keywords.length === 0) {
          errors.push(`Route ${route.route_id} must have at least 1 trigger keyword`);
        }

        const anchors = route.anchors || {};
        for (const cat of ANCHOR_CATEGORIES) {
          if (!Array.isArray(anchors[cat]) || anchors[cat].length === 0) {
            errors.push(`Route ${route.route_id} missing anchor category: ${cat}`);
          }
        }
      }
    }
  }

  for (const [src, tgt] of expectedPairs) {
    const pairKey = `${src}->${tgt}`;
    if (!foundPairs.has(pairKey)) {
      errors.push(`Missing directed vector: ${pairKey}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    vectorCount: vectors.length
  };
}

/**
 * Finds cross domain target URL and route for a trigger keyword
 * @param {string} sourceDomain
 * @param {string} triggerKeyword
 * @param {object} [options]
 * @returns {object|null}
 */
function getCrossDomainTarget(sourceDomain, triggerKeyword, options = {}) {
  const matrix = options.matrix || loadInterlinkingMatrix();
  const src = extractDomainName(sourceDomain);
  const normKw = normalizeString(triggerKeyword);
  if (!normKw) return null;

  const vectors = (matrix.cross_domain_vectors || []).filter(v => extractDomainName(v.source_domain) === src);

  for (const vec of vectors) {
    for (const route of vec.routes || []) {
      for (const kw of route.trigger_keywords || []) {
        const normRouteKw = normalizeString(kw);
        if (normKw.includes(normRouteKw) || normRouteKw.includes(normKw)) {
          return {
            vector_id: vec.vector_id,
            source_domain: vec.source_domain,
            target_domain: vec.target_domain,
            route_id: route.route_id,
            matched_keyword: kw,
            target_url: route.target_url,
            anchors: route.anchors,
            conversion_objective: vec.conversion_objective
          };
        }
      }
    }
  }

  return null;
}

/**
 * Selects an anchor text from a route according to diversity policies
 * @param {object} route - Route object containing `anchors`
 * @param {number} [articleIndex=0] - Article sequence index for deterministic rotation
 * @param {string} [typePreference] - Optional anchor category preference
 * @returns {{ text: string, category: string }}
 */
function selectDiverseAnchor(route, articleIndex = 0, typePreference = null) {
  if (!route || !route.anchors) {
    return { text: 'Tìm hiểu thêm', category: 'conversational_cta' };
  }

  const safeIndex = Math.floor(Math.abs(Number(articleIndex) || 0));

  let selectedCategory = typePreference;

  if (!selectedCategory || !ANCHOR_CATEGORIES.includes(selectedCategory)) {
    // Deterministic distribution cycle:
    // 0, 1, 2, 3: partial_match (40%)
    // 4, 5, 6: brand_context (30%)
    // 7, 8: conversational_cta (20%)
    // 9: exact_match (10% capped)
    const cycle = safeIndex % 10;
    if (cycle <= 3) {
      selectedCategory = 'partial_match'; // 40%
    } else if (cycle <= 6) {
      selectedCategory = 'brand_context'; // 30%
    } else if (cycle <= 8) {
      selectedCategory = 'conversational_cta'; // 20%
    } else {
      selectedCategory = 'exact_match'; // 10%
    }
  }

  const pool = route.anchors[selectedCategory] || [];
  if (pool.length === 0) {
    // fallback to first available pool
    for (const cat of ANCHOR_CATEGORIES) {
      if (Array.isArray(route.anchors[cat]) && route.anchors[cat].length > 0) {
        selectedCategory = cat;
        break;
      }
    }
  }

  const activePool = route.anchors[selectedCategory] || ['Xem chi tiết dịch vụ VNPIS'];
  const poolIndex = safeIndex % activePool.length;
  const text = activePool[poolIndex];

  return {
    text,
    category: selectedCategory
  };
}

/**
 * Scans markdown content and identifies cross-domain linking opportunities
 * @param {string} content
 * @param {string} currentDomain
 * @param {object} [options]
 * @returns {Array<object>}
 */
function findCrossLinkOpportunities(content, currentDomain, options = {}) {
  const matrix = options.matrix || loadInterlinkingMatrix();
  const src = extractDomainName(currentDomain);
  const vectors = (matrix.cross_domain_vectors || []).filter(v => extractDomainName(v.source_domain) === src);
  const normContent = normalizeString(content);

  const opportunities = [];
  const seenRoutes = new Set();

  for (const vec of vectors) {
    for (const route of vec.routes || []) {
      if (seenRoutes.has(route.route_id)) continue;

      let matchedKw = null;
      for (const kw of route.trigger_keywords || []) {
        const normKw = normalizeString(kw);
        if (normKw && normContent.includes(normKw)) {
          matchedKw = kw;
          break;
        }
      }

      if (matchedKw) {
        seenRoutes.add(route.route_id);
        opportunities.push({
          vector_id: vec.vector_id,
          source_domain: vec.source_domain,
          target_domain: vec.target_domain,
          route_id: route.route_id,
          matched_keyword: matchedKw,
          target_url: route.target_url,
          anchors: route.anchors,
          conversion_objective: vec.conversion_objective
        });
      }
    }
  }

  return opportunities;
}

// Alias for findCrossLinkOpportunities
const matchInterlinkOpportunities = findCrossLinkOpportunities;

/**
 * Verifies that an array of links does not contain self-linking to the current domain
 * @param {Array<{target_url: string}|string>} links
 * @param {string} currentDomain
 * @returns {{ valid: boolean, violations: string[] }}
 */
function verifyNoSelfLinking(links, currentDomain) {
  const currentDom = extractDomainName(currentDomain);
  const violations = [];

  if (!Array.isArray(links)) return { valid: true, violations: [] };

  for (const item of links) {
    const url = typeof item === 'string' ? item : (item.target_url || item.url || '');
    const linkDom = extractDomainName(url);
    if (linkDom === currentDom) {
      violations.push(`Self-link violation detected: URL "${url}" matches current domain "${currentDom}"`);
    }
  }

  return {
    valid: violations.length === 0,
    violations
  };
}

/**
 * Parses markdown into structured lines / blocks with AST boundary flags
 * @param {string} markdown
 * @returns {Array<object>}
 */
function parseMarkdownBlocks(markdown) {
  const lines = markdown.split(/\r?\n/);
  const blocks = [];
  let inFrontmatter = false;
  let inCodeBlock = false;
  let frontmatterCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Check Frontmatter boundaries
    if (trimmed === '---') {
      if (i === 0 || frontmatterCount === 1) {
        inFrontmatter = !inFrontmatter;
        frontmatterCount++;
        blocks.push({
          type: 'frontmatter',
          lineIndex: i,
          raw: line,
          protect: true
        });
        continue;
      }
    }

    if (inFrontmatter) {
      blocks.push({
        type: 'frontmatter',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    // Check Fenced Code Block boundaries
    if (trimmed.startsWith('```')) {
      inCodeBlock = !inCodeBlock;
      blocks.push({
        type: 'code_fence',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    if (inCodeBlock) {
      blocks.push({
        type: 'code',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    // Check Headings (#, ##, ###, ####, #####, ######)
    if (/^#{1,6}\s+/.test(trimmed)) {
      blocks.push({
        type: 'heading',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    // Check Markdown Table rows (| col1 | col2 | or |---|---| or col1 | col2 |)
    if (trimmed.startsWith('|') || (trimmed.includes('|') && (trimmed.endsWith('|') || trimmed.split('|').length >= 3))) {
      blocks.push({
        type: 'table',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    // Check Blank lines
    if (trimmed === '') {
      blocks.push({
        type: 'blank',
        lineIndex: i,
        raw: line,
        protect: true
      });
      continue;
    }

    // Regular Content Paragraph / List / Quote
    blocks.push({
      type: 'paragraph',
      lineIndex: i,
      raw: line,
      protect: false
    });
  }

  return blocks;
}

/**
 * Injects cross-domain interlinks safely into markdown content
 * @param {string} markdownContent
 * @param {string} currentDomain
 * @param {object} [options]
 * @returns {{ content: string, injectedLinks: Array<object>, stats: object }}
 */
function injectCrossLinks(markdownContent, currentDomain, options = {}) {
  const matrix = options.matrix || loadInterlinkingMatrix();
  const maxLinks = options.maxLinks ?? (matrix.diversity_policy?.max_cross_links_per_article || 3);
  const minWordDistance = options.minWordDistance ?? (matrix.diversity_policy?.min_word_distance_between_links || 300);
  const introWordBuffer = options.introWordBuffer ?? (matrix.diversity_policy?.forbidden_in_first_n_words || 200);
  const format = options.format || 'markdown'; // 'markdown' | 'html'
  const articleIndex = options.articleIndex || 0;

  const currentDom = extractDomainName(currentDomain);
  const opportunities = findCrossLinkOpportunities(markdownContent, currentDomain, { matrix });

  if (opportunities.length === 0) {
    return {
      content: markdownContent,
      injectedLinks: [],
      stats: { totalInjected: 0, reason: 'No matching trigger opportunities found' }
    };
  }

  const blocks = parseMarkdownBlocks(markdownContent);
  const injectedLinks = [];
  const usedTargetUrls = new Set();
  const usedTargetDomains = new Map();

  // Global pre-scan for existing links in document to prevent duplicate destination URLs
  const existingLinkRegex = /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const existingHtmlRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>/gi;

  let scanMatch;
  while ((scanMatch = existingLinkRegex.exec(markdownContent)) !== null) {
    const rawUrl = scanMatch[2].trim();
    usedTargetUrls.add(rawUrl);
    if (rawUrl.endsWith('/')) usedTargetUrls.add(rawUrl.slice(0, -1));
    else usedTargetUrls.add(rawUrl + '/');
    const linkDom = extractDomainName(rawUrl);
    if (linkDom) {
      usedTargetDomains.set(linkDom, (usedTargetDomains.get(linkDom) || 0) + 1);
    }
  }

  while ((scanMatch = existingHtmlRegex.exec(markdownContent)) !== null) {
    const rawUrl = scanMatch[1].trim();
    usedTargetUrls.add(rawUrl);
    if (rawUrl.endsWith('/')) usedTargetUrls.add(rawUrl.slice(0, -1));
    else usedTargetUrls.add(rawUrl + '/');
    const linkDom = extractDomainName(rawUrl);
    if (linkDom) {
      usedTargetDomains.set(linkDom, (usedTargetDomains.get(linkDom) || 0) + 1);
    }
  }

  let accumulatedWords = 0;
  let lastInjectedWordCount = -9999;

  // Process blocks
  for (let bIdx = 0; bIdx < blocks.length; bIdx++) {
    const block = blocks[bIdx];

    if (block.protect) {
      accumulatedWords += countWords(block.raw);
      continue;
    }

    const blockWords = countWords(block.raw);
    const currentWordPos = accumulatedWords;
    accumulatedWords += blockWords;

    // Check intro exclusion buffer
    if (currentWordPos < introWordBuffer) {
      continue;
    }

    // Check minimum distance from last injection
    if (currentWordPos - lastInjectedWordCount < minWordDistance) {
      continue;
    }

    // Check maximum link cap
    if (injectedLinks.length >= maxLinks) {
      break;
    }

    // Try to find a matching opportunity for this paragraph
    const normLine = normalizeString(block.raw);

    for (let oppIdx = 0; oppIdx < opportunities.length; oppIdx++) {
      const opp = opportunities[oppIdx];
      const targetDom = extractDomainName(opp.target_domain);

      // Verify no self link
      if (targetDom === currentDom) continue;

      // Check duplicate URL
      if (usedTargetUrls.has(opp.target_url)) continue;

      // Limit max 2 links to same target domain per article
      const domainLinkCount = usedTargetDomains.get(targetDom) || 0;
      if (domainLinkCount >= 2) continue;

      const normTrigger = normalizeString(opp.matched_keyword);

      if (normLine.includes(normTrigger)) {
        // Select diverse anchor
        const anchor = selectDiverseAnchor(opp, articleIndex + injectedLinks.length);

        let linkFormatted = '';
        if (format === 'html') {
          linkFormatted = `<a href="${opp.target_url}" target="_blank" rel="noopener">${anchor.text}</a>`;
        } else {
          linkFormatted = `[${anchor.text}](${opp.target_url})`;
        }

        let modifiedLine = block.raw;

        // Check if line already contains a markdown link with same URL
        if (modifiedLine.includes(opp.target_url)) {
          usedTargetUrls.add(opp.target_url);
          continue;
        }

        // Contextual insertion: Append a natural transition sentence to paragraph
        const bridgeSentence = ` Quý khách có thể tham khảo thêm ${linkFormatted} để tối ưu hóa hiệu quả vận hành.`;
        
        modifiedLine = modifiedLine.trimEnd() + bridgeSentence;

        block.raw = modifiedLine;
        usedTargetUrls.add(opp.target_url);
        usedTargetDomains.set(targetDom, domainLinkCount + 1);
        lastInjectedWordCount = currentWordPos;

        injectedLinks.push({
          vector_id: opp.vector_id,
          source_domain: currentDomain,
          target_domain: opp.target_domain,
          target_url: opp.target_url,
          matched_keyword: opp.matched_keyword,
          anchor_text: anchor.text,
          anchor_category: anchor.category,
          word_position: currentWordPos,
          line_index: block.lineIndex
        });

        break; // one link per paragraph block
      }
    }
  }

  // Reassemble markdown content
  const reassembledContent = blocks.map(b => b.raw).join('\n');

  return {
    content: reassembledContent,
    injectedLinks,
    stats: {
      totalInjected: injectedLinks.length,
      maxAllowed: maxLinks,
      usedUrls: Array.from(usedTargetUrls),
      wordCount: countWords(reassembledContent)
    }
  };
}

// Alias for injectCrossLinks
const injectInterlinks = injectCrossLinks;

/**
 * Validates compliance of an article's interlinks against SEO policies
 * @param {object} articleDraft - Article metadata or object
 * @param {string} markdownContent - Full markdown content
 * @param {object} [options]
 * @returns {{ compliant: boolean, violations: string[], linkDetails: Array<object> }}
 */
function validateInterlinkingCompliance(articleDraft, markdownContent, options = {}) {
  const violations = [];
  const currentDomain = extractDomainName(articleDraft.domain || articleDraft.canonical || 'vnpis.com');
  const blocks = parseMarkdownBlocks(markdownContent);

  // Extract all markdown links and HTML links (ignoring image embeds ![alt](url))
  const linkRegex = /(?<!\!)\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
  const htmlLinkRegex = /<a\s+(?:[^>]*?\s+)?href="([^"]*)"[^>]*>(.*?)<\/a>/gi;

  const foundLinks = [];

  for (const block of blocks) {
    let match;
    // Check Markdown links
    while ((match = linkRegex.exec(block.raw)) !== null) {
      foundLinks.push({
        text: match[1],
        url: match[2],
        blockType: block.type,
        lineIndex: block.lineIndex
      });
    }
    // Check HTML links
    while ((match = htmlLinkRegex.exec(block.raw)) !== null) {
      foundLinks.push({
        text: match[2].replace(/<[^>]+>/g, ''),
        url: match[1],
        blockType: block.type,
        lineIndex: block.lineIndex
      });
    }
  }

  // Rule 1: No links inside headings or code blocks
  for (const link of foundLinks) {
    if (link.blockType === 'heading') {
      violations.push(`Link "[${link.text}](${link.url})" is illegally placed inside a Markdown Heading at line ${link.lineIndex + 1}`);
    }
    if (link.blockType === 'code' || link.blockType === 'code_fence') {
      violations.push(`Link "[${link.text}](${link.url})" is illegally placed inside a Code Block at line ${link.lineIndex + 1}`);
    }
  }

  // Rule 2: Cross-domain self linking forbidden
  const crossLinks = foundLinks.filter(l => {
    const linkDom = extractDomainName(l.url);
    return ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'].includes(linkDom);
  });

  const selfCheck = verifyNoSelfLinking(crossLinks, currentDomain);
  if (!selfCheck.valid) {
    violations.push(...selfCheck.violations);
  }

  // Rule 3: Max cross links per article
  if (crossLinks.length > 4) {
    violations.push(`Cross-domain link count (${crossLinks.length}) exceeds maximum allowable threshold.`);
  }

  return {
    compliant: violations.length === 0,
    violations,
    linkDetails: foundLinks,
    crossLinkCount: crossLinks.length
  };
}

/**
 * Generates an interlinking graph network report across a collection of articles
 * @param {Array<object>} [articles] - Array of articles (defaults to editorial_calendar.json)
 * @param {object} [matrix]
 * @returns {object}
 */
function generateInterlinkGraphReport(articles = null, matrix = null) {
  const mat = matrix || loadInterlinkingMatrix();
  let articleList = articles;

  if (!articleList && fs.existsSync(DEFAULT_CALENDAR_PATH)) {
    try {
      const cal = JSON.parse(fs.readFileSync(DEFAULT_CALENDAR_PATH, 'utf8'));
      articleList = cal.articles || [];
    } catch {
      articleList = [];
    }
  }

  const domains = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];
  const inDegree = { 'vnpis.com': 0, 'cuuhodauin.com': 0, 'inanvnpis.com': 0 };
  const outDegree = { 'vnpis.com': 0, 'cuuhodauin.com': 0, 'inanvnpis.com': 0 };
  const vectorFlows = {};
  const anchorBreakdown = {
    partial_match: 0,
    brand_context: 0,
    conversational_cta: 0,
    exact_match: 0
  };

  for (const vec of mat.cross_domain_vectors || []) {
    vectorFlows[vec.vector_id] = 0;
  }

  // Simulate routing across the article list
  if (Array.isArray(articleList)) {
    articleList.forEach((art, idx) => {
      const srcDom = extractDomainName(art.domain);
      const textToScan = `${art.title || ''} ${art.pillar_name || ''} ${art.primary_keyword || ''} ${(art.secondary_keywords || []).join(' ')}`;
      const opps = findCrossLinkOpportunities(textToScan, srcDom, { matrix: mat });

      if (opps.length > 0) {
        const targetDomsUsed = new Set();
        for (const opp of opps) {
          const tgtDom = extractDomainName(opp.target_domain);
          if (targetDomsUsed.has(tgtDom)) continue;
          targetDomsUsed.add(tgtDom);

          if (outDegree[srcDom] !== undefined) outDegree[srcDom]++;
          if (inDegree[tgtDom] !== undefined) inDegree[tgtDom]++;
          if (vectorFlows[opp.vector_id] !== undefined) vectorFlows[opp.vector_id]++;

          const anchor = selectDiverseAnchor(opp, idx + targetDomsUsed.size);
          if (anchorBreakdown[anchor.category] !== undefined) {
            anchorBreakdown[anchor.category]++;
          }
          if (targetDomsUsed.size >= 2) break;
        }
      }
    });
  }

  const totalSimulatedLinks = Object.values(anchorBreakdown).reduce((a, b) => a + b, 0);
  const exactMatchPct = totalSimulatedLinks > 0 ? (anchorBreakdown.exact_match / totalSimulatedLinks) * 100 : 0;

  return {
    timestamp: new Date().toISOString(),
    total_articles: articleList ? articleList.length : 0,
    total_simulated_links: totalSimulatedLinks,
    in_degree: inDegree,
    out_degree: outDegree,
    vector_flows: vectorFlows,
    anchor_distribution: anchorBreakdown,
    exact_match_percentage: exactMatchPct,
    is_balanced: exactMatchPct <= 15
  };
}

/**
 * Runs a comprehensive cross-domain interlink audit
 * @param {object} [options]
 * @returns {object}
 */
function runInterlinkAudit(options = {}) {
  const matrixPath = options.matrixPath || DEFAULT_MATRIX_PATH;
  const matrix = loadInterlinkingMatrix(matrixPath);
  const ruleCheck = validateInterlinkRules(matrix);
  const graphReport = generateInterlinkGraphReport(options.articles, matrix);

  return {
    status: ruleCheck.valid ? 'PASS' : 'FAIL',
    matrix_path: matrixPath,
    rule_validation: ruleCheck,
    graph_report: graphReport,
    timestamp: new Date().toISOString()
  };
}

module.exports = {
  DEFAULT_MATRIX_PATH,
  DEFAULT_CALENDAR_PATH,
  ANCHOR_CATEGORIES,
  normalizeString,
  extractDomainName,
  countWords,
  loadInterlinkingMatrix,
  getCrossDomainVectors,
  getInternalRules,
  validateInterlinkRules,
  getCrossDomainTarget,
  selectDiverseAnchor,
  findCrossLinkOpportunities,
  matchInterlinkOpportunities,
  verifyNoSelfLinking,
  parseMarkdownBlocks,
  injectCrossLinks,
  injectInterlinks,
  validateInterlinkingCompliance,
  generateInterlinkGraphReport,
  runInterlinkAudit
};
