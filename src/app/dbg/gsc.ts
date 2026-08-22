import { google } from 'googleapis';

const siteUrlsToTry = [
  'sc-domain:vnpis.com',
  'https://vnpis.com/',
  'https://www.vnpis.com/',
  'http://vnpis.com/',
];

export async function getTopKeywords(periodDays: number = 30) {
  let clientEmail = process.env.GA_CLIENT_EMAIL?.trim();
  let privateKey = process.env.GA_PRIVATE_KEY?.trim();

  if (clientEmail?.startsWith('"') && clientEmail.endsWith('"')) {
    clientEmail = clientEmail.slice(1, -1);
  }
  if (privateKey?.startsWith('"') && privateKey.endsWith('"')) {
    privateKey = privateKey.slice(1, -1);
  }
  if (privateKey) {
    privateKey = privateKey.replace(/\\n/g, '\n');
  }

  if (!clientEmail || !privateKey) {
    return { error: 'Thiếu cấu hình GA_CLIENT_EMAIL hoặc GA_PRIVATE_KEY', rows: [] };
  }

  // GSC data has a 2 to 3 days latency
  const endDateObj = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
  const startDateObj = new Date(Date.now() - (periodDays + 3) * 24 * 60 * 60 * 1000);

  const endDate = endDateObj.toISOString().split('T')[0];
  const startDate = startDateObj.toISOString().split('T')[0];

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth });

    let lastError = '';

    for (const siteUrl of siteUrlsToTry) {
      try {
        const response = await searchconsole.searchanalytics.query({
          siteUrl,
          requestBody: {
            startDate,
            endDate,
            dimensions: ['query'],
            rowLimit: 50,
          },
        });

        if (response.data.rows && response.data.rows.length > 0) {
          const rows = response.data.rows.map((row, i) => ({
            rank: i + 1,
            query: row.keys?.[0] || 'Unknown',
            clicks: row.clicks || 0,
            impressions: row.impressions || 0,
            ctr: ((row.ctr || 0) * 100).toFixed(1) + '%',
            position: row.position ? row.position.toFixed(1) : '-',
          }));
          return { error: null, rows };
        }
      } catch (e: any) {
        lastError = e.message || String(e);
        if (e.message?.includes('Search Console API has not been used') || e.message?.includes('disabled')) {
          return {
            error: 'Google Search Console API chưa được Bật trong Google Cloud Console (Project 769443757499).',
            rows: [],
          };
        }
      }
    }

    if (lastError.includes('permission') || lastError.includes('403')) {
      return {
        error: `Chưa phân quyền cho Service Account: ${clientEmail} trong Google Search Console.`,
        rows: [],
      };
    }

    return { error: null, rows: [] };
  } catch (err: any) {
    return { error: err.message || 'Lỗi kết nối GSC', rows: [] };
  }
}
