const fs = require('fs');
const path = require('path');

// Configuration
const PAGE_CONFIGS = {
  vnpis_solutions: {
    id: '1197966926731641',
    token: 'EAANFPuPtVywBS2xn4frTQzJfIeZCVJnz7bOADNqLeKkWS60nA18agnGvQ7is3lownN0gMWGAbc8KtOdZCYgOp9Kb8hfQnnU0DSEDHCVZAkUpf76soz9ECHSN6Wy0YHroZC2Vm0070FXBRVLYpg5VCPLleZCFRZCAAbYiZC1zuz0E1k4m36odYCTdG6Wbapxd1l7JQUdTtMQ7z6nv9vGMID4WoZBh8jYZCBk2EJaPulHZAJkwLZC',
    name: 'VNPIS Solutions - Xưởng In Gia Công Toàn Diện'
  },
  vnpis_machines: {
    id: '1043133472221893',
    token: 'EAANFPuPtVywBS21wtuQD1iwnRzhfzWPownvk3WhQIhNDaZCpyHr3GcM7IQULIiwb7DyYfSIZBIDBlxL3VkZCoCakjM0AYq7qzjVr8fbAaQDAYkMMzR6MOoXKvWDstwrRBY4ZBZA3R6ItwwRAbGKUJrqtlIIdD1TPH4ffPXlOrNXVGGtjqvxtxuHoVFyy2gubXkOZAVZAmyXIAj8n56cwPUtyEzONW68dfx9s3VFGprASUdK',
    name: 'VNPIS Máy in Mực in Công Nghiệp & Giải Pháp Mã Hoá'
  }
};

async function publishPost(targetKey, message, link) {
  const target = PAGE_CONFIGS[targetKey];
  if (!target) {
    console.error('Target not found:', targetKey);
    return;
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
      console.error(`[FB ERROR] Failed:`, result);
      return result;
    }
  } catch (err) {
    console.error(`[FB EXCEPTION]`, err);
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

module.exports = { PAGE_CONFIGS, publishPost, updatePageInfo };
