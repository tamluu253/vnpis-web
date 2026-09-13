const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load environment variables or service account JSON key if available
const KEY_FILE = path.join(__dirname, '../service_account.json');

async function submitUrlsToGoogleIndexingAPI(urls) {
  if (!fs.existsSync(KEY_FILE) && (!process.env.GA_CLIENT_EMAIL || !process.env.GA_PRIVATE_KEY)) {
    console.log('⚠️ Notice: Google Service Account Key not found at service_account.json');
    console.log('👉 To enable instant 1-click Google Indexing API submission:');
    console.log('   1. Create a Service Account in Google Cloud Console with Indexing API scope.');
    console.log('   2. Download service_account.json and place it at vnpis_projects/service_account.json.');
    console.log('   3. Add the Service Account email as owner in Google Search Console for inanvnpis.com, vnpis.com, cuuhodauin.com.');
    return;
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: fs.existsSync(KEY_FILE) ? KEY_FILE : undefined,
    credentials: !fs.existsSync(KEY_FILE) ? {
      client_email: process.env.GA_CLIENT_EMAIL,
      private_key: process.env.GA_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    } : undefined,
    scopes: ['https://www.googleapis.com/auth/indexing'],
  });

  const indexing = google.indexing({ version: 'v3', auth });

  console.log(`🚀 Submitting ${urls.length} URLs to Google Indexing API...`);
  let successCount = 0;

  for (const url of urls) {
    try {
      await indexing.urlNotifications.publish({
        requestBody: {
          url: url,
          type: 'URL_UPDATED',
        },
      });
      successCount++;
      console.log(`[Google Indexing API 200 OK] ${url}`);
    } catch (err) {
      console.error(`[Google Indexing API Error] ${url}:`, err.message);
    }
  }

  console.log(`✅ Successfully submitted ${successCount}/${urls.length} URLs to Google Indexing API!`);
}

// Load collected URLs manifest
const manifestPath = path.join(__dirname, '../all_indexing_urls.json');
if (fs.existsSync(manifestPath)) {
  const urls = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  submitUrlsToGoogleIndexingAPI(urls).catch(console.error);
} else {
  console.error('Run auto_submit_google_indexing.js first to generate URL manifest.');
}
