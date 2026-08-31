const fs = require('fs');
const path = require('path');

const BASE_URL = 'https://vnpis.com';

function getAllAppRoutes(dir, baseRoute = '') {
  let routes = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    if (item.isDirectory()) {
      if (item.name.startsWith('(') && item.name.endsWith(')')) {
        routes = routes.concat(getAllAppRoutes(path.join(dir, item.name), baseRoute));
      } else {
        const nextRoute = `${baseRoute}/${item.name}`;
        routes = routes.concat(getAllAppRoutes(path.join(dir, item.name), nextRoute));
      }
    } else if (item.name === 'page.tsx' || item.name === 'route.ts') {
      routes.push(baseRoute || '/');
    }
  }
  return [...new Set(routes)];
}

const appDir = path.join(__dirname, 'src', 'app');
const definedRoutes = getAllAppRoutes(appDir);

// Extract all Link hrefs from src
function extractHrefs(dir) {
  let hrefs = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      hrefs = hrefs.concat(extractHrefs(fullPath));
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const matches = content.matchAll(/href=["'](\/[^"']*)["']/g);
      for (const match of matches) {
        hrefs.push(match[1]);
      }
    }
  }
  return [...new Set(hrefs)];
}

const linkedHrefs = extractHrefs(path.join(__dirname, 'src'));
const allPathsToTest = [...new Set([...definedRoutes, ...linkedHrefs])].filter(p => !p.includes('[') && !p.startsWith('/api'));

console.log(`Testing ${allPathsToTest.length} paths on ${BASE_URL}...`);

async function testPaths() {
  const results = { ok: [], redirect: [], notFound: [], error: [] };
  for (const p of allPathsToTest) {
    try {
      const res = await fetch(`${BASE_URL}${p}`, { redirect: 'manual' });
      if (res.status === 200) {
        results.ok.push(p);
      } else if (res.status === 301 || res.status === 302 || res.status === 307 || res.status === 308) {
        results.redirect.push({ path: p, status: res.status, location: res.headers.get('location') });
      } else if (res.status === 404) {
        results.notFound.push(p);
      } else {
        results.error.push({ path: p, status: res.status });
      }
    } catch (e) {
      results.error.push({ path: p, error: e.message });
    }
  }
  console.log('\n=== AUDIT RESULTS ===');
  console.log(`200 OK (${results.ok.length}):`, results.ok);
  console.log(`Redirects (${results.redirect.length}):`, results.redirect);
  console.log(`404 NOT FOUND (${results.notFound.length}):`, results.notFound);
  console.log(`Errors (${results.error.length}):`, results.error);
}

testPaths();
