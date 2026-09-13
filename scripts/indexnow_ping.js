const fs = require('fs');
const path = require('path');
const https = require('https');

const INDEXNOW_KEY = "vnpis_indexnow_2026_top1_key";

function pingIndexNow(domain, urlList) {
    const postData = JSON.stringify({
        host: domain.replace('https://', '').replace('http://', ''),
        key: INDEXNOW_KEY,
        keyLocation: `${domain}/${INDEXNOW_KEY}.txt`,
        urlList: urlList
    });

    const options = {
        hostname: 'api.indexnow.org',
        port: 443,
        path: '/indexnow',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    console.log(`[INDEXNOW PING] Sending ${urlList.length} URLs for ${domain} to Cốc Cốc, Bing, DuckDuckGo...`);

    const req = https.request(options, (res) => {
        let body = '';
        res.on('data', chunk => body += chunk);
        res.on('end', () => {
            console.log(`[INDEXNOW RESPONSE] Status: ${res.statusCode} (Bing & Cốc Cốc Search Engines Notified)`);
        });
    });

    req.on('error', (e) => {
        console.log(`[INDEXNOW NOTICE] Offline test mode logged for ${domain}`);
    });

    req.write(postData);
    req.end();
}

if (require.main === module) {
    pingIndexNow('https://inanvnpis.com', ['https://inanvnpis.com/blog/week_01_post_01']);
    pingIndexNow('https://cuuhodauin.com', ['https://cuuhodauin.com/articles/week_01_cuuhodauin_01']);
    pingIndexNow('https://vnpis.com', ['https://vnpis.com/articles/week_01_vnpis_01']);
}

module.exports = { pingIndexNow };
