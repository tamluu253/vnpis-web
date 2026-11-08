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
  return [];
}

function injectPhotosIntoArticles() {
  const photos = getPhotoList();
  if (photos.length === 0) {
    console.log('[IMAGE INJECTOR] No real photos found.');
    return;
  }

  console.log(`[IMAGE INJECTOR] Refreshing and distributing ${photos.length} real photos across articles...`);

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

      // Primary photo for machine/workshop
      const primaryPhoto = photos[index % photos.length];
      // Secondary photo for QA/QC and finished samples (offset by halfway)
      const secondaryPhoto = photos[(index + Math.floor(photos.length / 2)) % photos.length];

      const primaryAlt = `Hình ảnh thực tế vận hành và thiết bị ${title} tại xưởng VNPIS`;
      const secondaryAlt = `Hình ảnh thực tế kiểm tra chất lượng in và thành phẩm ${title} tại phòng Lab VNPIS`;

      const primaryImageMd = `![${primaryAlt}](${primaryPhoto.webPath})\n*Hình ảnh thực tế kiểm tra thiết bị tại xưởng VNPIS (Hotline/Zalo kỹ thuật: 0987.453.866)*`;
      const secondaryImageMd = `![${secondaryAlt}](${secondaryPhoto.webPath})\n*Hình ảnh thực tế mẫu sản phẩm hoàn thiện và kiểm tra độ bám dính tại VNPIS*`;

      let changed = false;

      // Clean existing real photo embeds if any to re-distribute cleanly
      if (content.includes('/images/real_photos/')) {
        content = content.replace(/\n*!\[Hình ảnh thực tế[^\]]*\]\(\/images\/real_photos\/[^\)]+\)\n*\*Hình ảnh thực tế[^*\n]*\*\n*/g, '\n');
        changed = true;
      }

      // 1. Insert primary photo after Section 1
      if (content.includes('## 2. Quy Trình')) {
        content = content.replace('## 2. Quy Trình', `\n${primaryImageMd}\n\n## 2. Quy Trình`);
        changed = true;
      } else if (content.includes('## 1. Tiêu Chuẩn')) {
        content = content.replace('## 1. Tiêu Chuẩn', `## 1. Tiêu Chuẩn\n\n${primaryImageMd}`);
        changed = true;
      }

      // 2. Insert secondary photo under QA/QC or Section 3
      if (content.includes('## 3. Khắc Phục') && !content.includes(secondaryPhoto.webPath)) {
        content = content.replace('## 3. Khắc Phục', `\n${secondaryImageMd}\n\n## 3. Khắc Phục`);
        changed = true;
      }

      // Set main metadata image
      data.image = primaryPhoto.webPath;

      if (changed) {
        fs.writeFileSync(filePath, matter.stringify(content, data), 'utf8');
        updatedCount++;
      }
    });

    console.log(`[IMAGE INJECTOR] Successfully refreshed photos in ${updatedCount} articles in ${dir}`);
  });
}

if (require.main === module) {
  injectPhotosIntoArticles();
}

module.exports = { injectPhotosIntoArticles };
