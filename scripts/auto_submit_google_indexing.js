const fs = require('fs');
const path = require('path');
const https = require('https');

// Define targets for all 3 domains
const SITES = [
  {
    domain: 'https://inanvnpis.com',
    sitemapUrl: 'https://inanvnpis.com/sitemap.xml',
    localDir: path.join(__dirname, '../inanvnpis-web/content/articles'),
    slugPrefix: '/blog/'
  },
  {
    domain: 'https://vnpis.com',
    sitemapUrl: 'https://vnpis.com/sitemap.xml',
    localDir: path.join(__dirname, '../vnpis-web/content/articles'),
    slugPrefix: '/blog/'
  },
  {
    domain: 'https://cuuhodauin.com',
    sitemapUrl: 'https://cuuhodauin.com/sitemap.xml',
    localDir: path.join(__dirname, '../cuuhodauin-web/content/articles'),
    slugPrefix: '/kien-thuc/'
  }
];

function pingGoogleSitemap(sitemapUrl) {
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
  return new Promise((resolve) => {
    https.get(pingUrl, (res) => {
      console.log(`[Google Ping] ${sitemapUrl} -> Status: ${res.statusCode}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.error(`[Google Ping Error] ${sitemapUrl}:`, err.message);
      resolve(null);
    });
  });
}

async function main() {
  console.log('====================================================');
  console.log('🤖 GOOGLE & SEARCH ENGINE AUTO-INDEXING AUDIT TOOL');
  console.log('====================================================\n');

  let allUrls = [];

  for (const site of SITES) {
    console.log(`📡 Auditing Domain: ${site.domain}`);
    
    // Read local article files to collect exact URLs
    let siteUrls = [];
    if (fs.existsSync(site.localDir)) {
      const files = fs.readdirSync(site.localDir);
      files.forEach(file => {
        if (file.endsWith('.md')) {
          const slug = file.replace(/\.md$/, '');
          siteUrls.push(`${site.domain}${site.slugPrefix}${slug}`);
        }
      });
    }

    console.log(`   - Collected ${siteUrls.length} article URLs`);
    allUrls = allUrls.concat(siteUrls);

    // Trigger Google Sitemap Ping
    await pingGoogleSitemap(site.sitemapUrl);
    console.log('');
  }

  // Save all URLs to JSON manifest for Google Indexing API submission
  const outputFile = path.join(__dirname, '../all_indexing_urls.json');
  fs.writeFileSync(outputFile, JSON.stringify(allUrls, null, 2), 'utf8');

  console.log('====================================================');
  console.log(`✅ TOTAL INDEXABLE URLS COLLECTED: ${allUrls.length}`);
  console.log(`📁 Saved URL manifest to: ${outputFile}`);
  console.log('====================================================\n');
}

main().catch(console.error);
