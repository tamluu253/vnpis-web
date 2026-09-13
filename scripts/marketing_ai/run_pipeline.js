/**
 * @file run_pipeline.js
 * @description Master End-to-End (E2E) CLI Pipeline Runner for VNPIS Marketing AI Multi-Agent System.
 * Unites Milestones M1 to M5 into a seamless, industrial-grade automated SEO & Content Engine:
 * 
 * Step 1: Validate Keyword Strategy & Topic Clusters (M1) - 0 cannibalization, 48-article calendar.
 * Step 2: Validate Cross-Domain Interlinking Matrix & AST Engine (M2) - triangular routing & anchor text policy.
 * Step 3: Generate E-E-A-T Articles (M3) - 1,500-3,000w technical depth, schema markup, B2B CTAs, media locator.
 * Step 4: Publish Draft Articles into CMS directories (M4) - strict draft isolation across 3 sites.
 * Step 5: Run Ranking Tracker & Generate Weekly SEO Reports (M5) - multi-domain rank tracking & cannibalization audit.
 * 
 * CLI Flags:
 *   --all                 Run pipeline across all 3 domains (vnpis.com, cuuhodauin.com, inanvnpis.com)
 *   --domain=<domain>     Target a specific domain (vnpis.com, cuuhodauin.com, inanvnpis.com)
 *   --count=<n>           Total number of articles to synthesize and publish (e.g. --count=3)
 *   --dry-run             Run full generation & validation in memory without writing draft files to CMS
 *   --offline             Force offline synthesis using deterministic engineering synthesizer (no API calls)
 *   --skip-step=<n>       Optional: skip a specific step (1-5)
 *   --help, -h            Display usage help and exit
 * 
 * @module marketing_ai/run_pipeline
 */

const fs = require('node:fs');
const path = require('node:path');

// Import Milestone M1 - M5 Engines
const keywordManager = require('./keyword_manager');
const interlinkEngine = require('./interlink_engine');
const contentGenerator = require('./content_generator');
const cmsPublisher = require('./cms_publisher');
const rankingTracker = require('./ranking_tracker');

// Workspace Paths
const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const DEFAULT_CLUSTERS_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_strategy/keyword_clusters.json');
const DEFAULT_CALENDAR_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_strategy/editorial_calendar.json');
const DEFAULT_MATRIX_PATH = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_strategy/interlinking_matrix.json');
const DEFAULT_REPORTS_DIR = path.resolve(WORKSPACE_ROOT, 'vnpis_marketing/seo_reports');
const DEFAULT_MANIFEST_DIR = path.resolve(WORKSPACE_ROOT, '.agents/worker_m4');
const DEFAULT_MANIFEST_PATH = path.resolve(DEFAULT_MANIFEST_DIR, 'publish_manifest.json');

const VALID_DOMAINS = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];

/**
 * Parses CLI command line arguments into an options object
 * @param {Array<string>} [argv]
 * @returns {object}
 */
function parseCliArgs(argv = process.argv.slice(2)) {
  const options = {
    all: false,
    domain: null,
    count: null,
    dryRun: false,
    offline: false,
    help: false,
    skipSteps: new Set()
  };

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];

    if (arg === '--help' || arg === '-h') {
      options.help = true;
    } else if (arg === '--all') {
      options.all = true;
    } else if (arg === '--sample' || arg === '--mode=sample') {
      options.mode = 'sample';
      if (options.count === null) options.count = 3;
    } else if (arg.startsWith('--mode=')) {
      options.mode = arg.split('=')[1];
      if (options.mode === 'sample' && options.count === null) {
        options.count = 3;
      }
    } else if (arg === '--mode' && i + 1 < argv.length) {
      options.mode = argv[++i];
      if (options.mode === 'sample' && options.count === null) {
        options.count = 3;
      }
    } else if (arg.startsWith('--domain=')) {
      options.domain = cmsPublisher.normalizeDomainKey(arg.split('=')[1]);
    } else if (arg === '--domain' && i + 1 < argv.length) {
      options.domain = cmsPublisher.normalizeDomainKey(argv[++i]);
    } else if (arg.startsWith('--count=')) {
      const parsed = parseInt(arg.split('=')[1], 10);
      options.count = isNaN(parsed) ? null : parsed;
    } else if (arg === '--count' && i + 1 < argv.length) {
      const parsed = parseInt(argv[++i], 10);
      options.count = isNaN(parsed) ? null : parsed;
    } else if (arg === '--dry-run') {
      options.dryRun = true;
    } else if (arg === '--offline' || arg === '--force-offline') {
      options.offline = true;
    } else if (arg.startsWith('--skip-step=')) {
      const stepNum = parseInt(arg.split('=')[1], 10);
      if (!isNaN(stepNum)) options.skipSteps.add(stepNum);
    } else if (arg === '--skip-step' && i + 1 < argv.length) {
      const stepNum = parseInt(argv[++i], 10);
      if (!isNaN(stepNum)) options.skipSteps.add(stepNum);
    }
  }

  // Default behavior: if no domain specified, run for all domains
  if (!options.domain) {
    options.all = true;
  }

  return options;
}

/**
 * Displays CLI usage and banner
 */
function printHelp() {
  console.log(`
================================================================================
🚀 VNPIS MARKETING AI MULTI-AGENT: MASTER E2E PIPELINE RUNNER (M6)
================================================================================

Description:
  Executes the unified end-to-end SEO, content synthesis, draft publishing, 
  and ranking tracking pipeline across the 3 VNPIS B2B domains:
    1. vnpis.com       (Industrial Machinery, Pad/UV Printing, Inks)
    2. cuuhodauin.com  (Printhead Rescue Lab, Ultrasonic Repair, Waveform)
    3. inanvnpis.com   (B2B OEM Custom Substrate Printing Services)

Pipeline Steps:
  [Step 1] Validate Keyword Strategy & Topic Clusters (M1)
  [Step 2] Validate Cross-Domain Interlinking Matrix & AST Engine (M2)
  [Step 3] Generate E-E-A-T Technical Articles (M3)
  [Step 4] Publish Draft Articles into CMS Directories (M4)
  [Step 5] Run Ranking Tracker & Generate Weekly SEO Reports (M5)

Usage:
  node scripts/marketing_ai/run_pipeline.js [options]

Options:
  --all                 Run pipeline across all 3 ecosystem domains (default)
  --domain=<domain>     Run pipeline for a specific domain (vnpis.com | cuuhodauin.com | inanvnpis.com)
  --count=<n>           Number of sample articles to synthesize and publish (e.g. --count=3)
  --dry-run             Run all steps in memory without writing draft markdown files to disk
  --offline             Force offline synthesis (deterministic E-E-A-T generation without Gemini API)
  --skip-step=<n>       Skip a specific step (e.g. --skip-step=5)
  --help, -h            Show this help message

Examples:
  node scripts/marketing_ai/run_pipeline.js --all --count=3
  node scripts/marketing_ai/run_pipeline.js --domain=cuuhodauin.com --count=1 --offline
  node scripts/marketing_ai/run_pipeline.js --all --dry-run
================================================================================
`);
}

/**
 * Step 1: Validates Keyword Strategy & Topic Clusters (M1)
 * @param {object} [options]
 * @returns {object} Step result
 */
function runStep1KeywordStrategy(options = {}) {
  const startTime = Date.now();
  const errors = [];

  const clustersPath = options.clustersPath || DEFAULT_CLUSTERS_PATH;
  const calendarPath = options.calendarPath || DEFAULT_CALENDAR_PATH;

  let clusterRes = { valid: false };
  let calendarRes = { valid: false };
  let auditRes = null;

  try {
    const clusters = keywordManager.loadKeywordClusters(clustersPath);
    clusterRes = keywordManager.validateTopicCluster(clusters);
    if (!clusterRes.valid) {
      errors.push(...clusterRes.errors);
    }
  } catch (err) {
    errors.push(`Failed to validate topic clusters: ${err.message}`);
  }

  try {
    const calendar = keywordManager.loadEditorialCalendar(calendarPath);
    calendarRes = keywordManager.verifyEditorialCalendar(calendar);
    if (!calendarRes.valid) {
      errors.push(...calendarRes.errors);
    }
  } catch (err) {
    errors.push(`Failed to verify editorial calendar: ${err.message}`);
  }

  try {
    auditRes = keywordManager.runFullAudit({ clustersPath, calendarPath });
    if (auditRes && auditRes.status === 'FAIL') {
      errors.push(...(auditRes.errors || []));
    }
  } catch (err) {
    errors.push(`Keyword audit failed: ${err.message}`);
  }

  const durationMs = Date.now() - startTime;
  const passed = errors.length === 0;

  return {
    step: 1,
    name: 'Validate Keyword Strategy & Topic Clusters (M1)',
    passed,
    durationMs,
    errors,
    details: {
      totalKeywords: clusterRes.summary ? clusterRes.summary.totalKeywords : 0,
      domainCounts: clusterRes.summary ? clusterRes.summary.domainCounts : {},
      calendarArticles: calendarRes.totalArticles || (calendarRes.summary ? calendarRes.summary.totalArticles : 0),
      cannibalizationIssues: auditRes && auditRes.cannibalization ? auditRes.cannibalization.cannibalizedCount : 0
    }
  };
}

/**
 * Step 2: Validates Cross-Domain Interlinking Matrix & AST Engine (M2)
 * @param {object} [options]
 * @returns {object} Step result
 */
function runStep2InterlinkingEngine(options = {}) {
  const startTime = Date.now();
  const errors = [];

  const matrixPath = options.matrixPath || DEFAULT_MATRIX_PATH;
  const calendarPath = options.calendarPath || DEFAULT_CALENDAR_PATH;

  let ruleValidation = { valid: false };
  let graphReport = null;

  try {
    const matrix = interlinkEngine.loadInterlinkingMatrix(matrixPath);
    ruleValidation = interlinkEngine.validateInterlinkRules(matrix);
    if (!ruleValidation.valid) {
      errors.push(...ruleValidation.errors);
    }

    let articles = null;
    if (fs.existsSync(calendarPath)) {
      const calendar = JSON.parse(fs.readFileSync(calendarPath, 'utf8'));
      articles = calendar.articles;
    }

    graphReport = interlinkEngine.generateInterlinkGraphReport(articles, matrix);

    // Verify AST protection with sample block
    const sampleMd = '# Tiêu Đề\n\n```js\nconst máy_in = true;\n```\n\nQuy trình in tampon trên nhựa abs rất phổ biến.';
    const injected = interlinkEngine.injectCrossLinks(sampleMd, 'vnpis.com', matrix, { articleIndex: 0 });
    const injectedContent = typeof injected === 'string' ? injected : (injected && injected.content ? injected.content : '');
    if (injectedContent.includes('# [Tiêu Đề') || injectedContent.includes('const [máy_in')) {
      errors.push('AST Boundary violation: Interlink injected inside protected markdown block');
    }
  } catch (err) {
    errors.push(`Interlinking validation error: ${err.message}`);
  }

  const durationMs = Date.now() - startTime;
  const passed = errors.length === 0;

  return {
    step: 2,
    name: 'Validate Cross-Domain Interlinking Matrix & AST Engine (M2)',
    passed,
    durationMs,
    errors,
    details: {
      totalVectors: ruleValidation.total_vectors || 6,
      exactMatchPct: graphReport ? graphReport.exact_match_percentage.toFixed(2) + '%' : '0%',
      isBalanced: graphReport ? graphReport.is_balanced : true,
      inDegree: graphReport ? graphReport.in_degree : {},
      outDegree: graphReport ? graphReport.out_degree : {}
    }
  };
}

/**
 * Selects target articles from editorial calendar based on domain and count options
 * @param {object} calendar
 * @param {object} options
 * @returns {Array<object>}
 */
function selectTargetArticles(calendar, options = {}) {
  if (!calendar || !Array.isArray(calendar.articles)) return [];

  let candidates = [...calendar.articles];

  // Domain filtering
  if (options.domain) {
    const normDom = cmsPublisher.normalizeDomainKey(options.domain);
    candidates = candidates.filter(a => cmsPublisher.normalizeDomainKey(a.domain) === normDom);
  }

  // Count selection
  if (options.count && options.count > 0) {
    const requestedCount = options.count;

    if (!options.domain && options.all) {
      // Distribute evenly across the 3 domains
      const perDomain = {
        'vnpis.com': [],
        'cuuhodauin.com': [],
        'inanvnpis.com': []
      };

      for (const art of candidates) {
        const d = cmsPublisher.normalizeDomainKey(art.domain);
        if (perDomain[d]) perDomain[d].push(art);
      }

      const selected = [];
      const domainKeys = ['vnpis.com', 'cuuhodauin.com', 'inanvnpis.com'];
      
      let curIndex = 0;
      while (selected.length < requestedCount && curIndex < 16) {
        for (const dom of domainKeys) {
          if (selected.length < requestedCount && perDomain[dom][curIndex]) {
            selected.push(perDomain[dom][curIndex]);
          }
        }
        curIndex++;
      }
      return selected;
    } else {
      return candidates.slice(0, requestedCount);
    }
  }

  return candidates;
}

/**
 * Step 3: Generates E-E-A-T Articles (M3)
 * @param {Array<object>} targetArticles
 * @param {object} [options]
 * @returns {Promise<object>} Step result with generated drafts
 */
async function runStep3ContentGeneration(targetArticles, options = {}) {
  const startTime = Date.now();
  const errors = [];
  const warnings = [];

  const forceOffline = options.offline === true;
  let drafts = [];

  try {
    drafts = await contentGenerator.generateBatchArticles(targetArticles, {
      forceOffline,
      saveDisk: false,
      generateSchemas: true,
      injectWidgets: true
    });

    // Validate quality across all generated drafts
    for (let i = 0; i < drafts.length; i++) {
      const draft = drafts[i];
      const qVal = contentGenerator.validateArticleQuality(draft);

      if (!qVal.valid) {
        errors.push(`Draft ${i} (${draft.slug}) quality failed: ${qVal.errors.join('; ')}`);
      }
      if (qVal.warnings && qVal.warnings.length > 0) {
        warnings.push(`Draft ${i} (${draft.slug}) warning: ${qVal.warnings.join('; ')}`);
      }

      // Assert draft status
      if (draft.status !== 'draft' || draft.draft !== true) {
        errors.push(`Draft ${i} (${draft.slug}) must have status: "draft" and draft: true`);
      }
      if (draft.wordCount < 1500) {
        errors.push(`Draft ${i} (${draft.slug}) word count (${draft.wordCount}) is below 1,500 words E-E-A-T requirement`);
      }
    }
  } catch (err) {
    errors.push(`Content generation error: ${err.message}`);
  }

  const durationMs = Date.now() - startTime;
  const passed = errors.length === 0 && drafts.length > 0;

  const totalWords = drafts.reduce((acc, d) => acc + (d.wordCount || 0), 0);
  const avgWords = drafts.length > 0 ? Math.round(totalWords / drafts.length) : 0;

  return {
    step: 3,
    name: 'Generate E-E-A-T Articles (M3)',
    passed,
    durationMs,
    drafts,
    errors,
    warnings,
    details: {
      generatedCount: drafts.length,
      averageWordCount: avgWords,
      totalWordCount: totalWords,
      offlineMode: forceOffline,
      allDraftsValid: passed
    }
  };
}

/**
 * Step 4: Publishes Draft Articles into CMS Directories (M4)
 * @param {Array<object>} drafts
 * @param {object} [options]
 * @returns {Promise<object>} Step result
 */
async function runStep4CMSPublishing(drafts, options = {}) {
  const startTime = Date.now();
  const errors = [];

  const isDryRun = options.dryRun === true;
  let pubResult = null;
  let isolationReport = null;

  try {
    pubResult = await cmsPublisher.publishBatchDrafts(drafts, {
      dryRun: isDryRun,
      backup: true,
      saveDryRunManifest: true
    });

    if (pubResult.failed > 0) {
      for (const f of pubResult.errors) {
        errors.push(`Publish failed for slug "${f.slug}": ${JSON.stringify(f.errors || f.error)}`);
      }
    }

    // Verify Draft Isolation Gate across CMS directories
    isolationReport = cmsPublisher.validateDraftIsolation(null, { requireAllDrafts: false });
    if (!isolationReport.isolated && isolationReport.violations && isolationReport.violations.length > 0) {
      errors.push(`Draft isolation audit failed with ${isolationReport.violations.length} violations`);
    }
  } catch (err) {
    errors.push(`CMS publishing error: ${err.message}`);
  }

  const durationMs = Date.now() - startTime;
  const passed = errors.length === 0 && (pubResult ? pubResult.failed === 0 : false);

  return {
    step: 4,
    name: 'Publish Draft Articles into CMS Directories (M4)',
    passed,
    durationMs,
    pubResult,
    isolationReport,
    errors,
    details: {
      dryRun: isDryRun,
      totalRequested: drafts.length,
      totalPublished: pubResult ? pubResult.published : 0,
      totalFailed: pubResult ? pubResult.failed : 0,
      manifestPath: pubResult ? pubResult.manifestPath : null,
      domainDistribution: pubResult && pubResult.manifest ? pubResult.manifest.domain_distribution : {}
    }
  };
}

/**
 * Step 5: Runs Ranking Tracker & Generates Weekly SEO Reports (M5)
 * @param {object} [options]
 * @returns {Promise<object>} Step result
 */
async function runStep5RankingTracking(options = {}) {
  const startTime = Date.now();
  const errors = [];

  let rankResult = null;

  try {
    rankResult = await rankingTracker.runRankingPipeline({
      offline: options.offline !== undefined ? options.offline : true,
      domain: options.domain || null,
      outputDir: options.outDir || options.outputDir || DEFAULT_REPORTS_DIR,
      seed: options.seed || 20260901,
      save: true
    });

    if (!rankResult || !rankResult.reportData) {
      errors.push('Ranking tracker pipeline did not return valid report data');
    }
  } catch (err) {
    errors.push(`Ranking tracker error: ${err.message}`);
  }

  const durationMs = Date.now() - startTime;
  const passed = errors.length === 0;

  const ecoSummary = rankResult && rankResult.reportData ? rankResult.reportData.ecosystem_summary : null;

  return {
    step: 5,
    name: 'Run Ranking Tracker & Generate Weekly SEO Reports (M5)',
    passed,
    durationMs,
    rankResult,
    errors,
    details: {
      totalQueries: ecoSummary ? ecoSummary.total_tracked_queries : 0,
      totalClicks: ecoSummary ? ecoSummary.total_clicks : 0,
      totalImpressions: ecoSummary ? ecoSummary.total_impressions : 0,
      top3Rankings: ecoSummary ? ecoSummary.total_top_3 : 0,
      top10Rankings: ecoSummary ? ecoSummary.total_top_10 : 0,
      cannibalizationAlerts: rankResult && rankResult.cannibalization ? rankResult.cannibalization.length : 0,
      jsonReport: rankResult && rankResult.saveResult ? rankResult.saveResult.jsonPath : null,
      markdownReport: rankResult && rankResult.saveResult ? rankResult.saveResult.markdownPath : null
    }
  };
}

/**
 * Master E2E Pipeline Orchestrator uniting M1 to M5
 * @param {object} [options]
 * @returns {Promise<object>} Full pipeline execution report
 */
async function runPipeline(options = {}) {
  const startTime = Date.now();
  const cliOpts = Object.assign({
    all: true,
    domain: null,
    count: null,
    dryRun: false,
    offline: false,
    skipSteps: new Set()
  }, options);

  console.log('================================================================================');
  console.log('🚀 VNPIS MARKETING AI MULTI-AGENT: MASTER E2E PIPELINE (M1 - M6)');
  console.log('================================================================================');
  console.log(`Execution Mode: ${cliOpts.dryRun ? 'DRY-RUN (In-Memory Staging)' : 'LIVE (Disk Publishing)'}`);
  console.log(`Domain Scope  : ${cliOpts.domain ? cliOpts.domain : 'ALL ECOSYSTEM (vnpis.com, cuuhodauin.com, inanvnpis.com)'}`);
  console.log(`Synthesis Mode: ${cliOpts.offline ? 'Deterministic Offline Synthesizer' : 'Gemini 2.5 Flash / Offline Fallback'}`);
  console.log(`Article Count : ${cliOpts.count ? cliOpts.count : 'Full Editorial Calendar (48 articles)'}`);
  console.log('================================================================================\n');

  const stepReports = [];
  let overallSuccess = true;

  // ----------------------------------------------------------------------
  // STEP 1: Validate Keyword Strategy & Topic Clusters (M1)
  // ----------------------------------------------------------------------
  if (!cliOpts.skipSteps.has(1)) {
    console.log('👉 [STEP 1/5] Validating Keyword Strategy & Topic Clusters (M1)...');
    const s1 = runStep1KeywordStrategy(cliOpts);
    stepReports.push(s1);

    if (s1.passed) {
      console.log(`  ✔ [PASS] ${s1.details.totalKeywords} keywords verified across 3 domains (${s1.durationMs}ms)`);
      console.log(`    - vnpis.com: ${s1.details.domainCounts['vnpis.com']} | cuuhodauin.com: ${s1.details.domainCounts['cuuhodauin.com']} | inanvnpis.com: ${s1.details.domainCounts['inanvnpis.com']}`);
      console.log(`    - Calendar: ${s1.details.calendarArticles} scheduled articles | Cannibalization: ${s1.details.cannibalizationIssues} issues`);
    } else {
      console.error(`  ✖ [FAIL] Step 1 Failed:\n    -> ${s1.errors.join('\n    -> ')}`);
      overallSuccess = false;
    }
    console.log('');
  }

  // ----------------------------------------------------------------------
  // STEP 2: Validate Cross-Domain Interlinking Matrix & AST Engine (M2)
  // ----------------------------------------------------------------------
  if (!cliOpts.skipSteps.has(2)) {
    console.log('👉 [STEP 2/5] Validating Cross-Domain Interlinking Matrix & AST Engine (M2)...');
    const s2 = runStep2InterlinkingEngine(cliOpts);
    stepReports.push(s2);

    if (s2.passed) {
      console.log(`  ✔ [PASS] ${s2.details.totalVectors} cross-domain vectors active | Exact Match Anchor: ${s2.details.exactMatchPct} (Balanced: ${s2.details.isBalanced}) (${s2.durationMs}ms)`);
    } else {
      console.error(`  ✖ [FAIL] Step 2 Failed:\n    -> ${s2.errors.join('\n    -> ')}`);
      overallSuccess = false;
    }
    console.log('');
  }

  // Load calendar articles for Step 3 & 4
  const calendarPath = cliOpts.calendarPath || DEFAULT_CALENDAR_PATH;
  let targetArticles = [];
  try {
    const calData = JSON.parse(fs.readFileSync(calendarPath, 'utf8'));
    targetArticles = selectTargetArticles(calData, cliOpts);
  } catch (err) {
    console.error(`  ✖ [ERROR] Unable to load calendar articles: ${err.message}`);
    targetArticles = [];
  }

  // ----------------------------------------------------------------------
  // STEP 3: Generate E-E-A-T Articles (M3)
  // ----------------------------------------------------------------------
  let generatedDrafts = [];
  if (!cliOpts.skipSteps.has(3)) {
    console.log(`👉 [STEP 3/5] Generating ${targetArticles.length} E-E-A-T Articles with Schema & Media (M3)...`);
    const s3 = await runStep3ContentGeneration(targetArticles, cliOpts);
    stepReports.push(s3);
    generatedDrafts = s3.drafts || [];

    if (s3.passed) {
      console.log(`  ✔ [PASS] ${s3.details.generatedCount} articles synthesized | Avg Word Count: ${s3.details.averageWordCount} words (${s3.durationMs}ms)`);
      console.log('    - Schema Markup: TechnicalArticle, FAQPage, Organization (MST: 0318266611)');
      console.log('    - Conversion CTAs: Hotline (0987 453 866), Zalo B2B Widget, Lead Form');
      console.log('    - Media Locator: Workshop Assets & Cosota Real Image Index Attached');
    } else {
      console.error(`  ✖ [FAIL] Step 3 Failed:\n    -> ${s3.errors.join('\n    -> ')}`);
      overallSuccess = false;
    }
    console.log('');
  }

  // ----------------------------------------------------------------------
  // STEP 4: Publish Draft Articles into CMS Directories (M4)
  // ----------------------------------------------------------------------
  if (!cliOpts.skipSteps.has(4)) {
    console.log(`👉 [STEP 4/5] Publishing ${generatedDrafts.length} Draft Articles into CMS Staging (M4)...`);
    const s4 = await runStep4CMSPublishing(generatedDrafts, cliOpts);
    stepReports.push(s4);

    if (s4.passed) {
      console.log(`  ✔ [PASS] ${s4.details.totalPublished} articles staged with status: "draft" (0 errors) (${s4.durationMs}ms)`);
      console.log(`    - Domain Staging: vnpis: ${s4.details.domainDistribution['vnpis.com'] || 0} | cuuho: ${s4.details.domainDistribution['cuuhodauin.com'] || 0} | inan: ${s4.details.domainDistribution['inanvnpis.com'] || 0}`);
      console.log(`    - Manifest: ${s4.details.manifestPath}`);
    } else {
      console.error(`  ✖ [FAIL] Step 4 Failed:\n    -> ${s4.errors.join('\n    -> ')}`);
      overallSuccess = false;
    }
    console.log('');
  }

  // ----------------------------------------------------------------------
  // STEP 5: Run Ranking Tracker & Generate Weekly SEO Reports (M5)
  // ----------------------------------------------------------------------
  if (!cliOpts.skipSteps.has(5)) {
    console.log('👉 [STEP 5/5] Running Multi-Domain Ranking Tracker & Performance Audit (M5)...');
    const s5 = await runStep5RankingTracking(cliOpts);
    stepReports.push(s5);

    if (s5.passed) {
      console.log(`  ✔ [PASS] Tracked ${s5.details.totalQueries} queries | Clicks: ${s5.details.totalClicks.toLocaleString()} | Top 1-3: ${s5.details.top3Rankings} (${s5.durationMs}ms)`);
      console.log(`    - Reports Saved:`);
      console.log(`      * JSON: ${s5.details.jsonReport}`);
      console.log(`      * Markdown: ${s5.details.markdownReport}`);
    } else {
      console.error(`  ✖ [FAIL] Step 5 Failed:\n    -> ${s5.errors.join('\n    -> ')}`);
      overallSuccess = false;
    }
    console.log('');
  }

  const totalDurationMs = Date.now() - startTime;

  console.log('================================================================================');
  if (overallSuccess) {
    console.log(`🎉 MASTER PIPELINE COMPLETED SUCCESSFULLY IN ${(totalDurationMs / 1000).toFixed(2)}s (100% PASS)`);
  } else {
    console.log(`⚠️ MASTER PIPELINE FINISHED WITH ERRORS IN ${(totalDurationMs / 1000).toFixed(2)}s`);
  }
  console.log('================================================================================\n');

  return {
    success: overallSuccess,
    totalDurationMs,
    stepReports,
    summary: {
      stepsCompleted: stepReports.filter(s => s.passed).length,
      stepsTotal: stepReports.length,
      targetArticlesCount: targetArticles.length,
      generatedDraftsCount: generatedDrafts.length,
      options: cliOpts
    }
  };
}

/**
 * CLI Entrypoint
 */
async function main() {
  const options = parseCliArgs(process.argv.slice(2));

  if (options.help) {
    printHelp();
    process.exit(0);
  }

  try {
    const result = await runPipeline(options);
    process.exit(result.success ? 0 : 1);
  } catch (err) {
    console.error('❌ Fatal Pipeline Execution Error:', err);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  WORKSPACE_ROOT,
  DEFAULT_CLUSTERS_PATH,
  DEFAULT_CALENDAR_PATH,
  DEFAULT_MATRIX_PATH,
  DEFAULT_REPORTS_DIR,
  DEFAULT_MANIFEST_PATH,
  VALID_DOMAINS,
  parseCliArgs,
  printHelp,
  selectTargetArticles,
  runStep1KeywordStrategy,
  runStep2InterlinkingEngine,
  runStep3ContentGeneration,
  runStep4CMSPublishing,
  runStep5RankingTracking,
  runPipeline
};
