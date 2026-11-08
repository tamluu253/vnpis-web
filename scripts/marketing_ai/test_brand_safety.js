const fs = require('fs');
const https = require('https');
const path = require('path');

function getApiKey() {
  const env = fs.readFileSync(path.join(__dirname, '../../.env'), 'utf8');
  const m = env.match(/GEMINI_API_KEY=(.+)/);
  return m ? m[1].trim() : null;
}

const apiKey = getApiKey();
const imagePath = path.join(__dirname, '../../vnpis-web/public/images/real_photos/vnpis_workshop_photo_01.jpg');
const imageBase64 = fs.readFileSync(imagePath).toString('base64');

const prompt = `Bạn là chuyên gia kiểm duyệt hình ảnh và bảo mật NDA khách hàng cho Công ty In Ấn Công Nghiệp VNPIS.
Hãy kiểm tra xem bức ảnh này có chứa:
1. Logo thương hiệu của công ty khác / nhãn hàng nổi tiếng (ví dụ: Unilever, Samsung, Vinamilk, P&G, Apple, v.v.)?
2. Sản phẩm in gia công chứa thông tin độc quyền, nhãn mác thương hiệu của khách hàng cần bảo mật NDA?
3. Thông tin cá nhân nhạy cảm?

Trả về duy nhất JSON hợp lệ (không kèm markdown):
{
  "isSensitive": false,
  "brandDetected": null,
  "reason": "An toàn hoặc mô tả lý do nếu nhạy cảm"
}`;

const payload = JSON.stringify({
  contents: [{
    parts: [
      { text: prompt },
      { inlineData: { mimeType: 'image/jpeg', data: imageBase64 } }
    ]
  }]
});

const req = https.request('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=' + apiKey, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(payload)
  }
}, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      console.log('Gemini 3.8 Flash Response:');
      console.log(data.candidates[0].content.parts[0].text);
    } catch (e) {
      console.error('Error parsing response:', body);
    }
  });
});

req.on('error', e => console.error(e));
req.write(payload);
req.end();
