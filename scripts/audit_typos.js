const fs = require('fs');
const path = require('path');

const dirs = [
  'vnpis-web/content/articles',
  'cuuhodauin-web/content/articles',
  'inanvnpis-web/content/articles'
];

let totalTyposFixed = 0;

dirs.forEach(dir => {
  const fullDir = path.resolve(__dirname, '..', dir);
  if (!fs.existsSync(fullDir)) return;

  const files = fs.readdirSync(fullDir).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const filePath = path.join(fullDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Check for "sút rửa" or "xúc rửa" and replace with "súc rửa"
    let updated = false;
    
    if (content.includes('sút rửa')) {
      content = content.replace(/sút rửa/g, 'súc rửa');
      updated = true;
      console.log(`[TYPO FIXED] "sút rửa" -> "súc rửa" in: ${dir}/${file}`);
    }
    if (content.includes('Sút rửa')) {
      content = content.replace(/Sút rửa/g, 'Súc rửa');
      updated = true;
      console.log(`[TYPO FIXED] "Sút rửa" -> "Súc rửa" in: ${dir}/${file}`);
    }
    if (content.includes('sút trượt')) {
      // ignore football terms if any, but in printing it's probably typos
    }

    if (updated) {
      fs.writeFileSync(filePath, content, 'utf-8');
      totalTyposFixed++;
    }
  });
});

console.log(`[COMPLETED] Total files audited and fixed: ${totalTyposFixed}`);
