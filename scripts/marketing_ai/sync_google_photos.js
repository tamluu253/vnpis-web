/**
 * @file sync_google_photos.js
 * @description Syncs authentic photos from Google Photos Shared Albums into local media repository.
 * Supports multiple album URLs in .env (comma-separated).
 * Automatically de-duplicates, downloads, updates photo_manifest.json,
 * and injects/refreshes photos into all markdown articles.
 * @module marketing_ai/sync_google_photos
 */

const fs = require('node:fs');
const path = require('node:path');
const https = require('node:https');
const { injectPhotosIntoArticles } = require('./auto_inject_real_photos');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.resolve(WORKSPACE_ROOT, '.env');
const TARGET_DIR = path.resolve(WORKSPACE_ROOT, 'vnpis-web/public/images/real_photos');
const MANIFEST_PATH = path.resolve(TARGET_DIR, 'photo_manifest.json');

function loadEnvConfig(envPath = ENV_PATH) {
  const config = {};
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    for (const line of content.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        config[trimmed.substring(0, eqIdx).trim()] = trimmed.substring(eqIdx + 1).trim();
      }
    }
  }
  return config;
}

function fetchUrl(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects <= 0) return reject(new Error('Too many redirects'));
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          const parsed = new URL(url);
          redirectUrl = `${parsed.protocol}//${parsed.host}${redirectUrl}`;
        }
        return resolve(fetchUrl(redirectUrl, maxRedirects - 1));
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP status ${res.statusCode}`));
      }
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

function downloadImage(imageUrl, destPath) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 1000) {
      return resolve({ cached: true });
    }
    const file = fs.createWriteStream(destPath);
    https.get(imageUrl, (res) => {
      if (res.statusCode !== 200) {
        file.close();
        if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
        return reject(new Error(`Failed to download: status ${res.statusCode}`));
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve({ cached: false, size: fs.statSync(destPath).size });
      });
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(destPath)) fs.unlinkSync(destPath);
      reject(err);
    });
  });
}

async function syncGooglePhotos(options = {}) {
  const env = loadEnvConfig();
  const rawAlbums = options.albumUrl || env.GOOGLE_PHOTOS_ALBUM_URL;
  if (!rawAlbums) {
    console.error('[ERROR] No GOOGLE_PHOTOS_ALBUM_URL configured in .env');
    return [];
  }

  const albumUrls = rawAlbums.split(',').map(s => s.trim()).filter(Boolean);
  console.log(`[SYNC] Connecting to ${albumUrls.length} Google Photos album(s)...`);

  if (!fs.existsSync(TARGET_DIR)) {
    fs.mkdirSync(TARGET_DIR, { recursive: true });
  }

  let allMatches = [];
  for (const albumUrl of albumUrls) {
    try {
      console.log(`[SYNC] Fetching album: ${albumUrl}`);
      const html = await fetchUrl(albumUrl);
      const regex = /https:\/\/lh3\.googleusercontent\.com\/pw\/[a-zA-Z0-9_\-]+/g;
      const matches = html.match(regex) || [];
      console.log(`       Discovered ${matches.length} endpoints in this album.`);
      allMatches.push(...matches);
    } catch (e) {
      console.warn(`[WARN] Failed to fetch album ${albumUrl}: ${e.message}`);
    }
  }

  const uniqueUrls = [...new Set(allMatches)];
  console.log(`[SYNC] Total unique photo entries across all albums: ${uniqueUrls.length}`);

  const limit = options.limit || 80;
  const selectedUrls = uniqueUrls.slice(0, limit);

  const manifest = [];
  for (let i = 0; i < selectedUrls.length; i++) {
    const rawUrl = selectedUrls[i];
    const highResUrl = `${rawUrl}=w1200-h800-no`;
    const fileName = `vnpis_workshop_photo_${String(i + 1).padStart(2, '0')}.jpg`;
    const destPath = path.resolve(TARGET_DIR, fileName);

    try {
      const res = await downloadImage(highResUrl, destPath);
      manifest.push({
        id: `photo_${i + 1}`,
        fileName,
        webPath: `/images/real_photos/${fileName}`,
        rawUrl,
        alt: `Hình ảnh thực tế xưởng in và phòng Lab VNPIS Bình Chánh - Ảnh #${i + 1}`,
        caption: `Hình ảnh thực tế chụp tại Xưởng Kỹ Thuật VNPIS (Hotline: 0987 453 866)`
      });
      process.stdout.write(`\r[SYNC] Downloaded: ${i + 1}/${selectedUrls.length} (${res.cached ? 'cached' : 'new'})`);
    } catch (err) {
      console.warn(`\n[WARN] Failed photo #${i + 1}: ${err.message}`);
    }
  }

  console.log(`\n[SYNC] Successfully synced ${manifest.length} photos into ${TARGET_DIR}`);
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf8');
  console.log(`[SYNC] Manifest saved to: ${MANIFEST_PATH}`);

  // Automatically inject photos into all articles
  console.log('\n[SYNC] Auto-updating articles with newly synced photos...');
  injectPhotosIntoArticles();

  return manifest;
}

if (require.main === module) {
  syncGooglePhotos()
    .then(() => process.exit(0))
    .catch(err => {
      console.error('[ERROR]', err);
      process.exit(1);
    });
}

module.exports = { syncGooglePhotos, TARGET_DIR, MANIFEST_PATH };
