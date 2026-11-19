const fs = require('fs');
const path = require('path');
const { flushPendingVideoQueue } = require('./video_auto_publisher');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.join(WORKSPACE_ROOT, '.env');
const VIDEO_PUB_PATH = path.join(__dirname, 'video_auto_publisher.js');

function loadEnv() {
  const env = {};
  if (fs.existsSync(ENV_PATH)) {
    for (const line of fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/)) {
      const idx = line.indexOf('=');
      if (idx !== -1 && !line.trim().startsWith('#')) {
        env[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
      }
    }
  }
  return env;
}
const localEnv = loadEnv();
const YT_CLIENT_ID = process.env.YOUTUBE_CLIENT_ID || localEnv.YOUTUBE_CLIENT_ID || '';
const YT_CLIENT_SECRET = process.env.YOUTUBE_CLIENT_SECRET || localEnv.YOUTUBE_CLIENT_SECRET || '';
const TT_CLIENT_KEY = process.env.TIKTOK_CLIENT_KEY || localEnv.TIKTOK_CLIENT_KEY || '';
const TT_CLIENT_SECRET = process.env.TIKTOK_CLIENT_SECRET || localEnv.TIKTOK_CLIENT_SECRET || '';

function saveTokenToFiles(envKey, tokenValue) {
  let envContent = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';
  const re = new RegExp(`^${envKey}=.*$`, 'm');
  if (re.test(envContent)) {
    envContent = envContent.replace(re, `${envKey}=${tokenValue}`);
  } else {
    envContent += `\n${envKey}=${tokenValue}\n`;
  }
  fs.writeFileSync(ENV_PATH, envContent, 'utf8');

  let pubContent = fs.readFileSync(VIDEO_PUB_PATH, 'utf8');
  pubContent = pubContent.replace(
    new RegExp(`(process\\.env\\.${envKey} \\|\\| ')[^']*(')`),
    `$1${tokenValue}$2`
  );
  fs.writeFileSync(VIDEO_PUB_PATH, pubContent, 'utf8');
}

async function exchangeYouTubeCode(codeOrRefreshToken, redirectUri = 'https://developers.google.com/oauthplayground') {
  if (codeOrRefreshToken.startsWith('1//')) {
    console.log('✅ Detected direct YouTube Refresh Token. Saving...');
    saveTokenToFiles('YOUTUBE_REFRESH_TOKEN', codeOrRefreshToken.trim());
    return true;
  }

  console.log('[YOUTUBE] Exchanging authorization code for permanent Refresh Token...');
  const params = new URLSearchParams({
    code: codeOrRefreshToken.trim(),
    client_id: YT_CLIENT_ID,
    client_secret: YT_CLIENT_SECRET,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code'
  });

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  const data = await res.json();
  if (data && data.refresh_token) {
    console.log('✅ [YOUTUBE] Obtained permanent Refresh Token!');
    saveTokenToFiles('YOUTUBE_REFRESH_TOKEN', data.refresh_token);
    return true;
  }
  console.error('❌ [YOUTUBE EXCHANGE ERROR]', data);
  return false;
}

async function exchangeTikTokCode(codeOrToken, redirectUri = 'https://vnpis.com/') {
  let cleanCode = codeOrToken.trim();
  if (cleanCode.includes('code=')) {
    const u = new URL(cleanCode);
    cleanCode = u.searchParams.get('code') || cleanCode;
  }

  console.log('[TIKTOK] Exchanging authorization code for Access & Refresh Token...');
  const params = new URLSearchParams({
    client_key: TT_CLIENT_KEY,
    client_secret: TT_CLIENT_SECRET,
    code: cleanCode,
    grant_type: 'authorization_code',
    redirect_uri: redirectUri
  });

  const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  const data = await res.json();
  if (data && data.access_token) {
    console.log('✅ [TIKTOK] Obtained TikTok Access Token & Refresh Token!');
    saveTokenToFiles('TIKTOK_ACCESS_TOKEN', data.access_token);
    if (data.refresh_token) {
      saveTokenToFiles('TIKTOK_REFRESH_TOKEN', data.refresh_token);
    }
    return true;
  }
  console.error('❌ [TIKTOK EXCHANGE ERROR]', data);
  return false;
}

async function main() {
  const args = process.argv.slice(2);
  const ytArg = args.find((a) => a.startsWith('--yt='))?.slice(5);
  const ttArg = args.find((a) => a.startsWith('--tt='))?.slice(5);

  if (ytArg) {
    await exchangeYouTubeCode(ytArg);
  }
  if (ttArg) {
    await exchangeTikTokCode(ttArg);
  }

  if (ytArg || ttArg) {
    await flushPendingVideoQueue();
  }
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { exchangeYouTubeCode, exchangeTikTokCode, saveTokenToFiles };
