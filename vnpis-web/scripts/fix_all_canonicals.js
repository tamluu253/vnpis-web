const fs = require('fs');
const path = require('path');

const appDir = path.join(__dirname, '..', 'src', 'app');

function walk(dir) {
  let files = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  for (const item of list) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) files = files.concat(walk(full));
    else if (item.name.startsWith('page.')) files.push(full);
  }
  return files;
}

const pageFiles = walk(appDir);
let updatedCount = 0;

pageFiles.forEach(filePath => {
  const relPath = path.relative(appDir, filePath).replace(/\\/g, '/');
  
  // Skip dynamic route pages that handle metadata dynamically
  if (relPath.includes('[slug]')) return;
  
  let route = relPath.replace(/\/page\.(tsx|ts|jsx|js)$/, '').replace(/^page\.(tsx|ts|jsx|js)$/, '');
  const canonicalUrl = route === '' ? 'https://vnpis.com' : `https://vnpis.com/${route}`;

  let content = fs.readFileSync(filePath, 'utf8');

  // If page already has alternates with canonical matching canonicalUrl, skip
  if (content.includes(`canonical: '${canonicalUrl}'`) || content.includes(`canonical: "${canonicalUrl}"`)) {
    return;
  }

  // Case 1: Page exports metadata object
  if (content.includes('export const metadata') || content.includes('export const metadata: Metadata')) {
    // If metadata object already has alternates block, update canonical inside it or add alternates
    if (content.includes('alternates:')) {
      // replace existing alternates block with canonicalUrl
      content = content.replace(/alternates:\s*\{[^}]*\}/g, `alternates: {\n    canonical: '${canonicalUrl}',\n  }`);
    } else {
      // Add alternates block inside export const metadata = { ... }
      content = content.replace(/(export const metadata[^={]*=\s*\{)/, `$1\n  alternates: {\n    canonical: '${canonicalUrl}',\n  },`);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Updated metadata canonical for: ${route || '/'} -> ${canonicalUrl}`);
  } else {
    // Case 2: Page does not export metadata, let's inject export const metadata
    // Check if Metadata type is imported
    let header = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  alternates: {\n    canonical: '${canonicalUrl}',\n  },\n};\n\n`;
    content = header + content;
    fs.writeFileSync(filePath, content, 'utf8');
    updatedCount++;
    console.log(`Injected metadata canonical for: ${route || '/'} -> ${canonicalUrl}`);
  }
});

console.log(`Total pages updated with self-canonical: ${updatedCount}`);
