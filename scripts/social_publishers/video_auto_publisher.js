const fs = require('fs');
const path = require('path');

const WORKSPACE_ROOT = path.resolve(__dirname, '../../');
const ENV_PATH = path.join(WORKSPACE_ROOT, '.env');
const VIDEO_QUEUE_PATH = path.join(WORKSPACE_ROOT, 'vnpis_marketing', 'video_pending_retry_queue.json');

function loadLocalEnv() {
  const envVars = {};
  if (fs.existsSync(ENV_PATH)) {
    const lines = fs.readFileSync(ENV_PATH, 'utf8').split(/\r?\n/);
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx !== -1) {
        envVars[trimmed.slice(0, idx).trim()] = trimmed.slice(idx + 1).trim();
      }
    }
  }
  return envVars;
}

function updateEnvVar(key, value) {
  let content = fs.existsSync(ENV_PATH) ? fs.readFileSync(ENV_PATH, 'utf8') : '';
  const regex = new RegExp(`^${key}=.*$`, 'm');
  if (regex.test(content)) {
    content = content.replace(regex, `${key}=${value}`);
  } else {
    content += `\n${key}=${value}\n`;
  }
  fs.writeFileSync(ENV_PATH, content, 'utf8');
}

// Defaults (loaded from process.env or local .env)
const VIDEO_CREDENTIALS = {
  youtube: {
    clientId: process.env.YOUTUBE_CLIENT_ID || '',
    clientSecret: process.env.YOUTUBE_CLIENT_SECRET || '',
    refreshToken: process.env.YOUTUBE_REFRESH_TOKEN || ''
  },
  tiktok: {
    clientKey: process.env.TIKTOK_CLIENT_KEY || '',
    clientSecret: process.env.TIKTOK_CLIENT_SECRET || '',
    accessToken: process.env.TIKTOK_ACCESS_TOKEN || '',
    refreshToken: process.env.TIKTOK_REFRESH_TOKEN || ''
  }
};

function getCredentials() {
  const env = loadLocalEnv();
  return {
    youtube: {
      clientId: process.env.YOUTUBE_CLIENT_ID || env.YOUTUBE_CLIENT_ID || VIDEO_CREDENTIALS.youtube.clientId,
      clientSecret: process.env.YOUTUBE_CLIENT_SECRET || env.YOUTUBE_CLIENT_SECRET || VIDEO_CREDENTIALS.youtube.clientSecret,
      refreshToken: process.env.YOUTUBE_REFRESH_TOKEN || env.YOUTUBE_REFRESH_TOKEN || VIDEO_CREDENTIALS.youtube.refreshToken
    },
    tiktok: {
      clientKey: process.env.TIKTOK_CLIENT_KEY || env.TIKTOK_CLIENT_KEY || VIDEO_CREDENTIALS.tiktok.clientKey,
      clientSecret: process.env.TIKTOK_CLIENT_SECRET || env.TIKTOK_CLIENT_SECRET || VIDEO_CREDENTIALS.tiktok.clientSecret,
      accessToken: process.env.TIKTOK_ACCESS_TOKEN || env.TIKTOK_ACCESS_TOKEN || VIDEO_CREDENTIALS.tiktok.accessToken,
      refreshToken: process.env.TIKTOK_REFRESH_TOKEN || env.TIKTOK_REFRESH_TOKEN || VIDEO_CREDENTIALS.tiktok.refreshToken
    }
  };
}

function queuePendingVideo(entry) {
  let queue = [];
  if (fs.existsSync(VIDEO_QUEUE_PATH)) {
    try {
      queue = JSON.parse(fs.readFileSync(VIDEO_QUEUE_PATH, 'utf8'));
    } catch (e) {
      queue = [];
    }
  }
  const existingIdx = queue.findIndex((x) => x.slotKey === entry.slotKey);
  if (existingIdx === -1) {
    queue.push({
      ...entry,
      ytPublished: false,
      ttPublished: false,
      queuedAt: new Date().toISOString()
    });
  } else {
    queue[existingIdx] = { ...queue[existingIdx], ...entry };
  }
  fs.mkdirSync(path.dirname(VIDEO_QUEUE_PATH), { recursive: true });
  fs.writeFileSync(VIDEO_QUEUE_PATH, JSON.stringify(queue, null, 2), 'utf8');
  return queue.length;
}

/**
 * 1. YOUTUBE SHORTS AUTO-UPLOADER (YouTube Data API v3 Resumable Upload)
 */
async function getYouTubeAccessToken(ytCreds) {
  if (!ytCreds.clientId || !ytCreds.clientSecret || !ytCreds.refreshToken) {
    return null;
  }
  const params = new URLSearchParams({
    client_id: ytCreds.clientId,
    client_secret: ytCreds.clientSecret,
    refresh_token: ytCreds.refreshToken,
    grant_type: 'refresh_token'
  });
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  const data = await res.json();
  if (data && data.access_token) {
    return data.access_token;
  }
  console.warn('[YOUTUBE AUTH WARN] Failed to refresh token:', data);
  return null;
}

async function uploadToYouTubeShorts(videoFilePath, title, description) {
  const creds = getCredentials().youtube;
  const absPath = path.isAbsolute(videoFilePath) ? videoFilePath : path.join(WORKSPACE_ROOT, videoFilePath);

  if (!fs.existsSync(absPath)) {
    return { status: 'error', reason: `File not found: ${videoFilePath}` };
  }

  const accessToken = await getYouTubeAccessToken(creds);
  if (!accessToken) {
    return {
      status: 'pending_token',
      reason: 'Chờ cấp YOUTUBE_CLIENT_ID, YOUTUBE_CLIENT_SECRET & YOUTUBE_REFRESH_TOKEN'
    };
  }

  console.log(`[YOUTUBE SHORTS] Uploading ${path.basename(absPath)}...`);
  const videoBuffer = fs.readFileSync(absPath);
  const cleanTitle = (title.includes('#Shorts') ? title : `${title} #Shorts #VNPIS`)
    .replace(/[<>]/g, '')
    .slice(0, 100);
  const cleanDescription = (description || '').replace(/</g, '≤').replace(/>/g, '≥');

  const metadata = {
    snippet: {
      title: cleanTitle,
      description: cleanDescription,
      tags: ['VNPIS', 'InTampon', 'InLua', 'MayInCongNghiep', 'PhaMucPantone', 'MayInDate', 'Shorts'],
      categoryId: '28'
    },
    status: {
      privacyStatus: 'public',
      selfDeclaredMadeForKids: false
    }
  };

  // Step 1: Initialize Resumable Upload Session
  const initRes = await fetch(
    'https://www.googleapis.com/upload/youtube/v3/videos?uploadType=resumable&part=snippet,status',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8',
        'X-Upload-Content-Length': String(videoBuffer.length),
        'X-Upload-Content-Type': 'video/mp4'
      },
      body: JSON.stringify(metadata)
    }
  );

  if (!initRes.ok) {
    const errText = await initRes.text();
    console.error('[YOUTUBE INIT ERROR]', errText);
    return { status: 'error', reason: errText };
  }

  const uploadUrl = initRes.headers.get('location');
  if (!uploadUrl) {
    return { status: 'error', reason: 'Missing resumable upload location header' };
  }

  // Step 2: Upload MP4 Binary
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Length': String(videoBuffer.length),
      'Content-Type': 'video/mp4'
    },
    body: videoBuffer
  });

  const result = await uploadRes.json();
  if (result && result.id) {
    const url = `https://www.youtube.com/shorts/${result.id}`;
    console.log(`✅ [YOUTUBE SHORTS SUCCESS] Published: ${url}`);
    return { status: 'published', id: result.id, url };
  }

  console.error('[YOUTUBE UPLOAD ERROR]', result);
  return { status: 'error', reason: JSON.stringify(result) };
}

/**
 * 2. TIKTOK CONTENT POSTING API V2 AUTO-UPLOADER
 */
async function getTikTokAccessToken(ttCreds) {
  if (ttCreds.clientKey && ttCreds.clientSecret && ttCreds.refreshToken) {
    try {
      const params = new URLSearchParams({
        client_key: ttCreds.clientKey,
        client_secret: ttCreds.clientSecret,
        grant_type: 'refresh_token',
        refresh_token: ttCreds.refreshToken
      });
      const res = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params
      });
      const data = await res.json();
      if (data && data.access_token) {
        updateEnvVar('TIKTOK_ACCESS_TOKEN', data.access_token);
        if (data.refresh_token) updateEnvVar('TIKTOK_REFRESH_TOKEN', data.refresh_token);
        return data.access_token;
      }
    } catch (e) {
      // Fallback to direct accessToken
    }
  }
  return ttCreds.accessToken || null;
}

async function uploadToTikTok(videoFilePath, caption) {
  const creds = getCredentials().tiktok;
  const absPath = path.isAbsolute(videoFilePath) ? videoFilePath : path.join(WORKSPACE_ROOT, videoFilePath);

  if (!fs.existsSync(absPath)) {
    return { status: 'error', reason: `File not found: ${videoFilePath}` };
  }

  const accessToken = await getTikTokAccessToken(creds);
  if (!accessToken) {
    return {
      status: 'pending_token',
      reason: 'Chờ cấp TIKTOK_ACCESS_TOKEN (hoặc TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET & TIKTOK_REFRESH_TOKEN)'
    };
  }

  console.log(`[TIKTOK API] Uploading ${path.basename(absPath)}...`);
  const videoBuffer = fs.readFileSync(absPath);
  const videoSize = videoBuffer.length;

  // Try Direct Post first; if app is unaudited, automatically fallback to Inbox Upload (1-tap publish in TikTok App)
  let initData = null;
  let mode = 'DIRECT_POST';

  const directPayload = {
    post_info: {
      title: caption.slice(0, 2100),
      privacy_level: 'PUBLIC_TO_EVERYONE',
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false
    },
    source_info: {
      source: 'FILE_UPLOAD',
      video_size: videoSize,
      chunk_size: videoSize,
      total_chunk_count: 1
    }
  };

  let initRes = await fetch('https://open.tiktokapis.com/v2/post/publish/video/init/', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(directPayload)
  });
  initData = await initRes.json();

  if (!initData?.data?.upload_url) {
    // Fallback to Inbox Video Init (works immediately without TikTok App Audit)
    mode = 'INBOX_DRAFT';
    const inboxPayload = {
      source_info: {
        source: 'FILE_UPLOAD',
        video_size: videoSize,
        chunk_size: videoSize,
        total_chunk_count: 1
      }
    };
    initRes = await fetch('https://open.tiktokapis.com/v2/post/publish/inbox/video/init/', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(inboxPayload)
    });
    initData = await initRes.json();
  }

  const uploadUrl = initData?.data?.upload_url;
  const publishId = initData?.data?.publish_id;
  if (!uploadUrl) {
    console.warn('[TIKTOK INIT NOTICE]', initData);
    return { status: 'error', reason: JSON.stringify(initData?.error || initData) };
  }

  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'video/mp4',
      'Content-Length': String(videoSize),
      'Content-Range': `bytes 0-${videoSize - 1}/${videoSize}`
    },
    body: videoBuffer
  });

  if (putRes.ok || putRes.status === 201 || putRes.status === 200) {
    console.log(`✅ [TIKTOK SUCCESS] Uploaded (${mode})! Publish ID: ${publishId}`);
    return { status: 'published', mode, publishId };
  }

  const errText = await putRes.text();
  return { status: 'error', reason: errText };
}

/**
 * Publishes to both YouTube Shorts & TikTok, queuing any platform awaiting credentials
 */
async function publishShortVideoEverywhere({ slotKey, videoFile, ytTitle, caption, articleUrl }) {
  const ytRes = await uploadToYouTubeShorts(videoFile, ytTitle, caption);
  const ttRes = await uploadToTikTok(videoFile, caption);

  if (ytRes.status !== 'published' || ttRes.status !== 'published') {
    queuePendingVideo({
      slotKey,
      videoFile,
      ytTitle,
      caption,
      articleUrl,
      ytPublished: ytRes.status === 'published',
      ytUrl: ytRes.url || null,
      ttPublished: ttRes.status === 'published',
      ttPublishId: ttRes.publishId || null
    });
  }

  return { youtube: ytRes, tiktok: ttRes };
}

async function flushPendingVideoQueue() {
  if (!fs.existsSync(VIDEO_QUEUE_PATH)) {
    console.log('[VIDEO QUEUE] No pending videos in queue.');
    return { ytPublished: 0, ttPublished: 0, remaining: 0 };
  }

  const queue = JSON.parse(fs.readFileSync(VIDEO_QUEUE_PATH, 'utf8'));
  const remaining = [];
  let ytCount = 0;
  let ttCount = 0;

  for (const item of queue) {
    if (!item.ytPublished) {
      const ytRes = await uploadToYouTubeShorts(item.videoFile, item.ytTitle, item.caption);
      if (ytRes.status === 'published') {
        item.ytPublished = true;
        item.ytUrl = ytRes.url;
        ytCount++;
      }
    }
    if (!item.ttPublished) {
      const ttRes = await uploadToTikTok(item.videoFile, item.caption);
      if (ttRes.status === 'published') {
        item.ttPublished = true;
        item.ttPublishId = ttRes.publishId;
        ttCount++;
      }
    }
    if (!item.ytPublished || !item.ttPublished) {
      remaining.push(item);
    }
  }

  fs.writeFileSync(VIDEO_QUEUE_PATH, JSON.stringify(remaining, null, 2), 'utf8');
  console.log(`[VIDEO QUEUE FLUSHED] YouTube Shorts: ${ytCount} | TikTok: ${ttCount} | Remaining in queue: ${remaining.length}`);
  return { ytPublished: ytCount, ttPublished: ttCount, remaining: remaining.length };
}

function seedWeek14And15VideoQueue() {
  const packs = [
    {
      slotKey: 'week_14_01',
      videoFile: 'vnpis-web/public/media/blog/muc-bam-dinh-sieu-cuong-k15-khong-halogen.mp4',
      ytTitle: 'Test Độ Bám Dính Siêu Cường Khi In Lên Nhựa Kỹ Thuật ABS, PP, PE Tại Xưởng VNPIS! #Shorts #VNPIS',
      articleUrl: 'https://vnpis.com/blog/gia-cong-in-tampon-linh-kien-nhua-abs',
      caption: `💪 TEST THỰC TẾ ĐỘ BÁM DÍNH MỰC IN CÔNG NGHIỆP VNPIS TRÊN LINH KIỆN NHỰA KỸ THUẬT!\n\n✅ Vượt qua 100% bài test băng keo 3M Cross-hatch (ASTM D3359), test cào vật lý và ngâm cồn 90°.\n✅ Gia công đồ gá (Jig) CNC chuẩn xác từng milimet, nhận in gia công số lượng lớn.\n\n📞 Hotline / Zalo gửi mẫu test miễn phí: 0987.453.866 (Mr. Tâm)\n🌐 Xem quy trình kỹ thuật: https://vnpis.com/blog/gia-cong-in-tampon-linh-kien-nhua-abs\n\n#VNPIS #GiaCongInTampon #InTrenNhuaABS #InTrenNhuaPP #MucInBamDinhCao #Shorts`
    },
    {
      slotKey: 'week_14_02',
      videoFile: 'vnpis-web/public/media/machines/hj-4color.mp4',
      ytTitle: 'Cận Cảnh Máy In Tampon Cốc Mực Kín Vòng Gốm Ceramic: Tiết Kiệm 50% Mực & Dung Môi! #Shorts #VNPIS',
      articleUrl: 'https://vnpis.com/blog/top-5-may-in-tampon-coc-muc-kin',
      caption: `⚙️ MÁY IN TAMPON CỐC MỰC KÍN Ø90MM VNPIS: GIẢI PHÁP TIẾT KIỆM 50% MỰC & DUNG MÔI CHO NHÀ MÁY!\n\n✅ Ngăn bay hơi dung môi 95%, giữ độ nhớt mực ổn định suốt ca 8 tiếng.\n✅ Vòng dao gốm (Ceramic Ring) siêu bén: Gạt sạch 100% mực thừa trên bản thép Cliche.\n\n📞 Hotline / Zalo báo giá máy & vật tư: 0987.453.866 (Mr. Tâm)\n🌐 Xem Top 5 dòng máy bán chạy nhất: https://vnpis.com/blog/top-5-may-in-tampon-coc-muc-kin\n\n#VNPIS #MayInTampon #CocMucKin #InTampon4Mau #MayInPad #Shorts`
    },
    {
      slotKey: 'week_14_03',
      videoFile: 'vnpis-web/public/media/machines/sj/sj-ss250-3-lipstick.mp4',
      ytTitle: 'Bí Quyết Chọn Độ Cứng Đầu In Tampon Silicon (Shore 30A - 70A) Không Bao Giờ Nhòe Nét #Shorts #VNPIS',
      articleUrl: 'https://vnpis.com/blog/huong-dan-chon-do-cung-dau-tampon-silicon',
      caption: `🎯 TẠI SAO IN TAMPON LÊN NẮP CHAI, VỎ SON, THÂN BÚT BỊ BIẾN DẠNG CHỮ HOẶC ĐỨT NÉT?\n\n✅ Độ cứng mềm (30A - 40A): Chuyên trị bề mặt cong gắt, hốc lõm sâu.\n✅ Độ cứng tiêu chuẩn (45A - 55A): Tối ưu cho 80% linh kiện nhựa phẳng, nắp chai, vỏ mỹ phẩm.\n✅ Độ cứng cao (60A - 70A): Truyền mực cực đanh nét cho phôi phẳng cứng.\n\n📞 Hotline / Zalo tư vấn chọn Pad: 0987.453.866 (Mr. Tâm)\n🌐 Bảng tra cứu độ cứng Silicon: https://vnpis.com/blog/huong-dan-chon-do-cung-dau-tampon-silicon\n\n#VNPIS #DauInSilicon #InTampon #PadPrinting #VatTuInTampon #Shorts`
    },
    {
      slotKey: 'week_15_01',
      videoFile: 'vnpis-web/public/media/blog/muc-khang-con-alcohol-resistant-ink.mp4',
      ytTitle: 'Pha Màu Mực In Lụa & Tampon Chuẩn Pantone Chỉ Từ 100g Bằng Máy Quang Phổ! #Shorts #VNPIS',
      articleUrl: 'https://vnpis.com/blog/dich-vu-pha-mau-muc-in-theo-yeu-cau-chuan-pantone-tu-100g',
      caption: `🛑 ĐƠN HÀNG ÍT MÀ PHẢI MUA CẢ HỘP 1KG MỰC? VNPIS NHẬN PHA MÀU MỰC IN CHUẨN PANTONE CHỈ TỪ 100G!\n\n✅ Đo màu bằng máy quang phổ 3NH ST-700D Plus, độ lệch màu ΔE < 0.5.\n✅ Đầy đủ hệ mực: Mực in Tampon (1K, 2K) & Mực in Lụa.\n✅ Lưu công thức số hóa vĩnh viễn!\n\n📞 Hotline / Zalo đặt pha màu lấy liền: 0987.453.866 (Mr. Tâm)\n🌐 Chi tiết dịch vụ: https://vnpis.com/blog/dich-vu-pha-mau-muc-in-theo-yeu-cau-chuan-pantone-tu-100g\n\n#VNPIS #PhaMauMucIn #MucInPantone #3NHST700DPlus #MucInTampon #Shorts`
    },
    {
      slotKey: 'week_15_02',
      videoFile: 'vnpis-web/public/media/machines/hj-screen-printer.mp4',
      ytTitle: 'Máy In Lụa Phẳng Bán Tự Động Bàn Hút Chân Không: Tăng Năng Suất Gấp 3 Lần! #Shorts #VNPIS',
      articleUrl: 'https://vnpis.com/blog/may-in-lua-phang-ban-tu-dong',
      caption: `🔥 KÉO LỤA THỦ CÔNG MỎI TAY MÀ VẪN TRỄ ĐƠN? ĐẾN LÚC LÊN ĐỜI MÁY IN LỤA BÁN TỰ ĐỘNG VNPIS!\n\n✅ Tốc độ in ổn định 800 – 1.200 sản phẩm/giờ, tăng năng suất gấp 3 lần so với kéo tay.\n✅ Bàn hút chân không định vị phôi phẳng tuyệt đối.\n\n📞 Hotline / Zalo Kỹ Sư Trưởng: 0987.453.866 (Mr. Tâm)\n🌐 Xem chi tiết thông số kỹ thuật: https://vnpis.com/blog/may-in-lua-phang-ban-tu-dong\n\n#VNPIS #MayInLua #InLuaBanTuDong #InLuaCongNghiep #XuongInLua #Shorts`
    }
  ];

  for (const pack of packs) {
    queuePendingVideo(pack);
  }
  console.log(`✅ [VIDEO QUEUE] Seeded 5 videos (Week 14 & Week 15) into ${VIDEO_QUEUE_PATH}`);
}

if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.includes('--seed')) {
    seedWeek14And15VideoQueue();
  } else if (args.includes('--flush')) {
    flushPendingVideoQueue().catch(console.error);
  } else {
    seedWeek14And15VideoQueue();
    flushPendingVideoQueue().catch(console.error);
  }
}

module.exports = {
  uploadToYouTubeShorts,
  uploadToTikTok,
  publishShortVideoEverywhere,
  flushPendingVideoQueue,
  seedWeek14And15VideoQueue,
  VIDEO_QUEUE_PATH
};
