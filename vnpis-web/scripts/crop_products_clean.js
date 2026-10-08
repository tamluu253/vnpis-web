const sharp = require('sharp');
const path = require('path');

async function cropAll() {
  const srcDir = 'public/images/products/accessories/sunny_rings';
  const destDir = 'public/images/products/accessories';

  const crops = [
    // 1. Ceramic Rings
    {
      page: 'page_4.webp',
      extract: { left: 60, top: 250, width: 1140, height: 1330 },
      out: 'ceramic-ring.webp'
    },
    // 2. Tungsten Rings
    {
      page: 'page_3.webp',
      extract: { left: 60, top: 240, width: 1140, height: 1330 },
      out: 'tungsten-ring.webp'
    },
    // 3. Carbide & Ceramic pair
    {
      page: 'page_5.webp',
      extract: { left: 70, top: 220, width: 1160, height: 1350 },
      out: 'carbide-ceramic-pair.webp'
    },
    // 4. Blade edges schematic
    {
      page: 'page_5.webp',
      extract: { left: 1420, top: 230, width: 1000, height: 1430 },
      out: 'blade-edges.webp'
    },
    // 5. Hero Ink cups (60-150mm) - clean without top text
    {
      page: 'page_8.webp',
      extract: { left: 60, top: 280, width: 1140, height: 1300 },
      out: 'ink-cups.webp'
    },
    // 6. 90x82 Ink cup - clean
    {
      page: 'page_6.webp',
      extract: { left: 60, top: 280, width: 1140, height: 1300 },
      out: 'ink-cup-90x82.webp'
    },
    // 7. 100x90 Ink cup - clean
    {
      page: 'page_7.webp',
      extract: { left: 60, top: 280, width: 1140, height: 1300 },
      out: 'ink-cup-100x90.webp'
    },
    // 8. Embedded ceramic ink cup
    {
      page: 'page_9.webp',
      extract: { left: 60, top: 250, width: 1140, height: 1300 },
      out: 'ink-cup-embedded.webp'
    },
    // 9. U-seal ring ink cup (Wing Long)
    {
      page: 'page_10.webp',
      extract: { left: 60, top: 240, width: 1150, height: 1300 },
      out: 'ink-cup-u-seal.webp'
    },
    // 10. Ink cup variants grid (60-150)
    {
      page: 'page_8.webp',
      extract: { left: 1320, top: 150, width: 1100, height: 1480 },
      out: 'ink-cup-variants-grid.webp'
    },
    // 11. Embedded cup technical drawing
    {
      page: 'page_9.webp',
      extract: { left: 1320, top: 150, width: 1100, height: 1480 },
      out: 'ink-cup-embedded-specs.webp'
    }
  ];

  for (const c of crops) {
    const inPath = path.join(srcDir, c.page);
    const outPath = path.join(destDir, c.out);
    await sharp(inPath)
      .extract(c.extract)
      .resize(1000, 1100, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .webp({ quality: 92 })
      .toFile(outPath);
    console.log(`Saved ${outPath}`);
  }
}

cropAll().catch(console.error);
