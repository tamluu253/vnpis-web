const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DIRS = [
  path.join(__dirname, '../vnpis-web/content/articles'),
  path.join(__dirname, '../content/articles')
];

function cleanTitle(title) {
  if (!title) return '';
  return title
    .replace(/\s*-\s*VNPIS Equipment & Full Combo Vật Tư \(vnpis\.com\)/gi, '')
    .replace(/\s*\|\s*VNPIS.*$/gi, '')
    .replace(/\s*-\s*VNPIS.*$/gi, '')
    .trim();
}

function generateDescription(title, content, keywords) {
  // Strip markdown formatting from content
  const cleanContent = content
    .replace(/^#+\s+.*$/gm, '') // headings
    .replace(/!\[.*?\]\(.*?\)/g, '') // images
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // link text
    .replace(/[`*_{}\[\]()#+\-.!>]/g, ' ') // markdown symbols
    .replace(/\s+/g, ' ')
    .trim();

  // If keywords exist, incorporate them
  const kwList = Array.isArray(keywords) ? keywords : (typeof keywords === 'string' ? keywords.split(',') : []);
  const topKw = kwList.length > 0 ? kwList[0].trim() : '';

  // Look for first sentence or strong summary from content
  const sentences = cleanContent.split(/(?<=[.?!])\s+/).filter(s => s.length > 30);
  let baseText = '';
  
  if (sentences.length > 0) {
    baseText = sentences[0];
    if (baseText.length < 90 && sentences.length > 1) {
      baseText += ' ' + sentences[1];
    }
  }

  if (baseText.length < 80) {
    baseText = `${cleanTitle(title)}. Hướng dẫn kỹ thuật chuyên sâu, giải pháp vật tư và tiêu chuẩn vận hành chính hãng từ VNPIS.`;
  }

  // Trim to 135 - 155 characters
  if (baseText.length > 155) {
    baseText = baseText.slice(0, 150).replace(/\s+\S*$/, '') + '...';
  } else if (baseText.length < 110) {
    baseText += ' Liên hệ VNPIS tư vấn kỹ thuật và báo giá nhanh.';
    if (baseText.length > 155) {
      baseText = baseText.slice(0, 150).replace(/\s+\S*$/, '') + '...';
    }
  }

  return baseText.trim();
}

function optimizeDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  console.log(`\n📂 Processing: ${dir} (${files.length} files)`);

  let updatedCount = 0;

  for (const file of files) {
    const filePath = path.join(dir, file);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    const content = parsed.content || '';
    const slug = file.replace(/\.md$/, '');

    let changed = false;

    // 1. Clean Title if redundant
    const originalTitle = data.title || '';
    const cleanedTitle = cleanTitle(originalTitle);
    if (cleanedTitle && cleanedTitle !== originalTitle) {
      data.title = cleanedTitle;
      changed = true;
    }

    // 2. Add / Fix Meta Description
    const currentDesc = (data.description || '').trim();
    if (!currentDesc || currentDesc.length < 80 || currentDesc.length > 220) {
      const newDesc = generateDescription(data.title, content, data.keywords);
      data.description = newDesc;
      changed = true;
    }

    // 3. Ensure Canonical
    if (!data.canonical) {
      data.canonical = `https://vnpis.com/blog/${slug}`;
      changed = true;
    }

    // 4. Ensure Author
    if (!data.author) {
      data.author = 'VNPIS Engineering Team';
      changed = true;
    }

    if (changed) {
      const newFileContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newFileContent, 'utf8');
      updatedCount++;
    }
  }

  console.log(`✅ Optimized ${updatedCount} / ${files.length} files in ${dir}`);
}

DIRS.forEach(optimizeDirectory);
console.log('\n🎉 SEO Optimization Pass Completed Successfully!');
