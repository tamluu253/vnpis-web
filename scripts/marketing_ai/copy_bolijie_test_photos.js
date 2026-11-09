const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\VNPIS\\###Suppliers\\2. Bolijie (Hong Kong)\\BLJINK Ink Test Video\\样品测试视频\\样品测试视频';
const destDir = path.resolve(__dirname, '../../vnpis-web/public/images/bolijie/test_samples');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(full));
    } else {
      results.push(full);
    }
  });
  return results;
}

if (fs.existsSync(srcDir)) {
  const allFiles = walk(srcDir).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
  console.log(`Found ${allFiles.length} test photos.`);

  let copied = 0;
  allFiles.forEach(f => {
    const parentFolder = path.basename(path.dirname(f));
    const ext = path.extname(f);
    const baseName = path.basename(f, ext);
    // Create clean safe ascii filename
    const cleanParent = parentFolder.replace(/[^\w\d\-_\.]/g, '_').replace(/_+/g, '_').slice(0, 40);
    const cleanBase = baseName.replace(/[^\w\d\-_\.]/g, '_').replace(/_+/g, '_').slice(0, 30);
    const destName = `bolijie_test_${cleanParent}_${cleanBase}${ext}`.toLowerCase();
    const destPath = path.join(destDir, destName);

    fs.copyFileSync(f, destPath);
    copied++;
  });

  console.log(`Successfully copied ${copied} test photos to ${destDir}`);
} else {
  console.error(`Source directory not found: ${srcDir}`);
}
