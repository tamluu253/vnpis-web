const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const m = await import('../node_modules/pdfjs-dist/image_decoders/pdf.image_decoders.mjs');
  const wasmPath = path.resolve(__dirname, '../node_modules/pdfjs-dist/wasm') + '/';
  const wasmUrl = 'file:///' + wasmPath.replace(/\\/g, '/');
  
  m.JpxImage.setOptions({
    useWasm: false,
    useWorkerFetch: false,
    wasmUrl: wasmUrl
  });

  const outDir = 'public/images/products/accessories/sunny_rings';
  const width = 2515;
  const height = 1719;

  for (let p = 1; p <= 10; p++) {
    const jp2File = path.join(outDir, `page_${p}.jp2`);
    if (!fs.existsSync(jp2File)) continue;
    console.log(`Decoding page ${p}...`);
    const bytes = fs.readFileSync(jp2File);
    const rawPixels = await m.JpxImage.decode(bytes, { numComponents: 3 });
    const u8 = new Uint8Array(rawPixels);
    const outFile = path.join(outDir, `page_${p}.webp`);
    await sharp(Buffer.from(u8.buffer, u8.byteOffset, u8.byteLength), {
      raw: {
        width,
        height,
        channels: 3
      }
    })
    .webp({ quality: 92 })
    .toFile(outFile);
    console.log(`Saved ${outFile}`);
  }
}

main().catch(console.error);
