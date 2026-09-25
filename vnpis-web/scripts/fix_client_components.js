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
let fixedCount = 0;

pageFiles.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');
  const relPath = path.relative(appDir, filePath).replace(/\\/g, '/');
  
  if (content.includes('"use client"') || content.includes("'use client'")) {
    console.log('Fixing Client Component page:', relPath);
    
    // Extract metadata canonical URL if present
    const canonicalMatch = content.match(/canonical:\s*['"]([^'"]+)['"]/);
    const canonicalUrl = canonicalMatch ? canonicalMatch[1] : null;

    // Remove any injected Metadata import and export const metadata from client component
    content = content.replace(/import\s*\{\s*Metadata\s*\}\s*from\s*['"]next['"];?\n*/g, '');
    content = content.replace(/export\s+const\s+metadata[^=]*=\s*\{[\s\S]*?\};\n*/g, '');

    // Ensure 'use client' is at top of file
    content = content.replace(/['"]use client['"];?\s*/g, '');
    content = `'use client';\n` + content.trimStart();

    fs.writeFileSync(filePath, content, 'utf8');

    // Create a sibling layout.tsx for this client component route if canonicalUrl exists and route is not root
    if (canonicalUrl && relPath !== 'page.tsx') {
      const routeDir = path.dirname(filePath);
      const layoutPath = path.join(routeDir, 'layout.tsx');
      const layoutContent = `import { Metadata } from 'next';\n\nexport const metadata: Metadata = {\n  alternates: {\n    canonical: '${canonicalUrl}',\n  },\n};\n\nexport default function Layout({ children }: { children: React.ReactNode }) {\n  return <>{children}</>;\n}\n`;
      fs.writeFileSync(layoutPath, layoutContent, 'utf8');
      console.log('  Created route layout.tsx for canonical:', canonicalUrl);
    }
    fixedCount++;
  }
});

console.log('Fixed client component pages:', fixedCount);
