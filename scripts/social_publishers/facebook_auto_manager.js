const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.join(WORKSPACE_ROOT, '.env');
const RETRY_QUEUE_PATH = path.join(WORKSPACE_ROOT, 'vnpis_marketing', 'facebook_pending_retry_queue.json');

function loadLocalEnv() {
  const envVars = {};
  if (fs.existsSync(ENV_PATH)) {
    const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim();
        envVars[key] = val;
      }
    }
  }
  return envVars;
}

const localEnv = loadLocalEnv();

// Configuration
const PAGE_CONFIGS = {
  vnpis_solutions: {
    id: process.env.FB_PAGE_SOLUTIONS_ID || localEnv.FB_PAGE_SOLUTIONS_ID || '1197966926731641',
    token: process.env.FB_PAGE_SOLUTIONS_TOKEN || localEnv.FB_PAGE_SOLUTIONS_TOKEN || 'EAANFPuPtVywBTCN1R0ZCrn6f4Ji3CEkzDhMbvaUmpMrEE3a7mdr7n2sFpAZBofUA6sA5gTQbvsEwjZBgxjGOt29o2Yzmr3VEKGTAufZB5x2fZBA69G8j3qmp28bswjMpPIs4oBF4BJZA5DYEsQ7TjfYsTmYGMsMXNwmEyjUkiTz4ZCIS3vlflFUFCy4htDZAFrBWyirJH44T',
    name: 'VNPIS Solutions - Xưởng In Gia Công Toàn Diện'
  },
  vnpis_machines: {
    id: process.env.FB_PAGE_MACHINES_ID || localEnv.FB_PAGE_MACHINES_ID || '1043133472221893',
    token: process.env.FB_PAGE_MACHINES_TOKEN || localEnv.FB_PAGE_MACHINES_TOKEN || 'EAANFPuPtVywBTBc9KfjNfdXZCOO6yYLTsZCSZCHQleFMkv5gXMJZBOKdViKyT2ZCOZAkOQXfCo86MJnq8Var9wsCf0ZBX1zA5ZCI4A4Gp2QSHulvFZB5R8OprBWBHZCNCMCWI7ZBZC0k750XWJqikXMnS2y3oFnc2KXEZAnhPmH5VZAWzX6SCpxOVNw4a8CfjY03fD7ZBdUz6c9ut9A',
    name: 'VNPIS Máy in Mực in Công Nghiệp & Giải Pháp Mã Hoá'
  }
};

function queueFailedFacebookPost(entry) {
  let queue = [];
  if (fs.existsSync(RETRY_QUEUE_PATH)) {
    try {
      queue = JSON.parse(fs.readFileSync(RETRY_QUEUE_PATH, 'utf8'));
    } catch (e) {
      queue = [];
    }
  }
  const exists = queue.some(
    (item) => item.slotKey === entry.slotKey || (item.targetKey === entry.targetKey && item.link === entry.link)
  );
  if (!exists) {
    queue.push({
      ...entry,
      queuedAt: new Date().toISOString()
    });
    fs.mkdirSync(path.dirname(RETRY_QUEUE_PATH), { recursive: true });
    fs.writeFileSync(RETRY_QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf8');
  }
  return queue.length;
}

async function publishPost(targetKey, message, link, metadata = {}) {
  const target = PAGE_CONFIGS[targetKey];
  if (!target) {
    console.error('Target not found:', targetKey);
    return { error: { message: `Target ${targetKey} not found` } };
  }

  console.log(`[FB PUBLISH] Posting to: ${target.name} (${target.id})...`);
  const params = new URLSearchParams();
  params.append('message', message);
  if (link) {
    params.append('link', link);
  }
  params.append('access_token', target.token);

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${target.id}/feed`, {
      method: 'POST',
      body: params
    });
    const result = await res.json();
    if (result.id) {
      console.log(`[FB SUCCESS] Published successfully! Post ID: ${result.id}`);
      return result;
    } else {
      console.warn(`[FB NOTICE] Could not publish live to Facebook:`, result.error ? result.error.message : result);
      const isTokenExpired = result.error && (result.error.code === 190 || result.error.error_subcode === 463);
      if (isTokenExpired) {
        const queuedCount = queueFailedFacebookPost({
          slotKey: metadata.slotKey || `${new Date().toISOString().slice(0, 10)}_${targetKey}`,
          targetKey,
          pageName: target.name,
          topic: metadata.topic || '',
          message,
          link
        });
        result.queuedForRetry = true;
        result.queuedCount = queuedCount;
      }
      return result;
    }
  } catch (err) {
    console.error(`[FB EXCEPTION]`, err);
    return { error: { message: err.message } };
  }
}

async function updatePageInfo(targetKey, fields) {
  const target = PAGE_CONFIGS[targetKey];
  console.log(`[FB UPDATE] Updating page info for: ${target.name}...`);
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(fields)) {
    params.append(key, value);
  }
  params.append('access_token', target.token);

  try {
    const res = await fetch(`https://graph.facebook.com/v19.0/${target.id}`, {
      method: 'POST',
      body: params
    });
    const result = await res.json();
    console.log(`[FB UPDATE RESULT]`, result);
    return result;
  } catch (err) {
    console.error(`[FB UPDATE ERROR]`, err);
  }
}

async function flushPendingFacebookQueue() {
  if (!fs.existsSync(RETRY_QUEUE_PATH)) {
    console.log('[FB QUEUE] No pending posts in retry queue.');
    return { published: 0, remaining: 0 };
  }
  let queue = [];
  try {
    queue = JSON.parse(fs.readFileSync(RETRY_QUEUE_PATH, 'utf8'));
  } catch (e) {
    return { published: 0, remaining: 0 };
  }

  if (queue.length === 0) {
    console.log('[FB QUEUE] Retry queue is empty.');
    return { published: 0, remaining: 0 };
  }

  console.log(`[FB QUEUE] Attempting to publish ${queue.length} queued Facebook posts...`);
  const remaining = [];
  let published = 0;

  for (const item of queue) {
    const res = await publishPost(item.targetKey, item.message, item.link, {
      slotKey: item.slotKey,
      topic: item.topic
    });
    if (res && res.id) {
      published++;
      console.log(`  ✅ Re-published queued slot [${item.slotKey}] -> Post ID: ${res.id}`);
    } else {
      remaining.push(item);
      console.log(`  ⚠️ Still pending [${item.slotKey}]: ${res?.error?.message || 'Token expired'}`);
    }
  }

  fs.writeFileSync(RETRY_QUEUE_PATH, JSON.stringify(remaining, null, 2), 'utf8');
  return { published, remaining: remaining.length };
}

module.exports = {
  PAGE_CONFIGS,
  RETRY_QUEUE_PATH,
  publishPost,
  updatePageInfo,
  queueFailedFacebookPost,
  flushPendingFacebookQueue
};
