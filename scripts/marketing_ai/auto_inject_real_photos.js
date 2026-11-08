const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const MANIFEST_PATH = path.join(__dirname, '../../vnpis-web/public/images/real_photos/photo_manifest.json');
const DIRS = [
  path.join(__dirname, '../../vnpis-web/content/articles'),
  path.join(__dirname, '../../content/articles')
];

function getPhotoList() {
  if (fs.existsSync(MANIFEST_PATH)) {
    try {
      const list = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
      if (Array.isArray(list) && list.length > 0) return list;
    } catch (e) {}
  }

  // Fallback: scan directory directly
  const dir = path.join(__dirname, '../../vnpis-web/public/images/real_photos');
  if (fs.existsSync(dir)) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg') || f.endsWith('.png'));
    return files.map((f, i) => ({
      id: `photo_${i + 1}`,
      fileName: f,
      webPath: `/images/real_photos/${f}`,
      alt: `Hình ảnh thực tế xưởng kỹ thuật và máy in công nghiệp VNPIS - Ảnh #${i + 1}`,
      caption: `Hình ảnh thực tế ghi nhận tại xưởng sản xuất VNPIS`
    }));
  }
  return [];
}

function injectPhotosIntoArticles() {
  const photos = getPhotoList();
  if (photos.length === 0) {
    console.log('[IMAGE INJECTOR] No real photos found.');
    return;
  }

  console.log(`[IMAGE INJECTOR] Found ${photos.length} real photos in repository.`);

  DIRS.forEach(dir => {
    if (!fs.existsSync(dir)) return;
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    let updatedCount = 0;

    files.forEach((f, index) => {
      const filePath = path.join(dir, f);
      const raw = fs.readFileSync(filePath, 'utf8');
      const parsed = matter(raw);
      let content = parsed.content;
      const data = parsed.data || {};
      const title = data.title || f.replace(/\.md$/, '');

      // Pick a photo cyclically based on index to ensure full diverse coverage
      const photo = photos[index % photos.length];
      const customAlt = `Hình ảnh thực tế kiểm tra kỹ thuật ${title} tại xưởng VNPIS`;
      const imageMarkdown = `\n\n![${customAlt}](${photo.webPath})\n*Hình ảnh thực tế quy trình kiểm định và vận hành tại hệ thống xưởng VNPIS (Hotline/Zalo kỹ thuật: 0987.453.866)*\n`;

      // Check if article already has a real photo
      if (!content.includes('/images/real_photos/')) {
        // Find best insertion point (under section 1 or section 2, or after first heading)
        if (content.includes('## 2. Quy Trình')) {
          content = content.replace('## 2. Quy Trình', `${imageMarkdown}\n## 2. Quy Trình`);
        } else if (content.includes('## 1. Tiêu Chuẩn')) {
          content = content.replace('## 1. Tiêu Chuẩn', `## 1. Tiêu Chuẩn${imageMarkdown}`);
        } else if (content.includes('## 1. Thông Số')) {
          content = content.replace('## 1. Thông Số', `## 1. Thông Số${imageMarkdown}`);
        } else {
          // Insert after first paragraph
          const parts = content.split('\n\n');
          if (parts.length > 2) {
            parts.splice(2, 0, imageMarkdown.trim());
            content = parts.join('\n\n');
          } else {
            content += imageMarkdown;
          }
        }

        // Also set metadata image for rich share / Open Graph if missing
        if (!data.image) {
          data.image = photo.webPath;
        }

        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
        updatedCount++;
      }
    });

    console.log(`[IMAGE INJECTOR] Injected real photos into ${updatedCount} articles in ${dir}`);
  });
}

if (require.main === module) {
  injectPhotosIntoArticles();
}

module.exports = { injectPhotosIntoArticles };
