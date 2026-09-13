const fs = require('fs');
const path = require('path');
let nodemailer;
try {
  nodemailer = require('nodemailer');
} catch (e) {
  nodemailer = require('c:/Users/TL/.gemini/antigravity/scratch/vnpis_projects/vnpis-web/node_modules/nodemailer');
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@vnpis.com',
    pass: 'lejochkwtxpxrefu',
  },
});

async function sendCuuHoDauInNotification(articleFilePath, recipientEmail = "info@vnpis.com") {
    if (!fs.existsSync(articleFilePath)) {
        console.error(`[ERROR] File not found: ${articleFilePath}`);
        return false;
    }

    const content = fs.readFileSync(articleFilePath, 'utf-8');
    const lines = content.split('\n');
    
    let title = "Bài viết Cứu Hộ Đầu In mới trên cuuhodauin.com";
    let keywords = "N/A";
    let publishDate = new Date().toISOString().split('T')[0];
    
    const bodyLines = [];
    let inFrontmatter = false;

    for (const line of lines) {
        if (line.trim() === '---') {
            inFrontmatter = !inFrontmatter;
            continue;
        }
        if (inFrontmatter) {
            if (line.startsWith('title:')) {
                title = line.replace('title:', '').trim().replace(/^"|"$/g, '');
            } else if (line.startsWith('keywords:')) {
                keywords = line.replace('keywords:', '').trim().replace(/^"|"$/g, '');
            } else if (line.startsWith('date:')) {
                publishDate = line.replace('date:', '').trim().replace(/^"|"$/g, '');
            }
        } else {
            bodyLines.push(line);
        }
    }

    const bodyMd = bodyLines.join('\n').trim();

    const htmlContent = `<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a; background-color: #f1f5f9; margin: 0; padding: 20px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }
        .header { background-color: #0284c7; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #ffffff; text-transform: uppercase; letter-spacing: 0.5px; }
        .header p { margin: 5px 0 0 0; font-size: 13px; color: #e0f2fe; }
        .content { padding: 24px; }
        .meta-box { background: #f0f9ff; border-left: 4px solid #0284c7; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; }
        .meta-box p { margin: 4px 0; }
        .btn { display: inline-block; background-color: #0284c7; color: #ffffff; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; text-align: center; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
        .article-preview { white-space: pre-wrap; font-size: 14px; background: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 400px; overflow-y: auto; font-family: inherit; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>CUUHODAUIN.COM — VNPIS LAB ALERT</h1>
            <p>Hệ thống tự động thông báo bài viết Cứu Hộ Đầu In mới đến ${recipientEmail} và tamluu253@gmail.com</p>
        </div>
        <div class="content">
            <h2>📢 Bài viết mới vừa lên trang cuuhodauin.com</h2>
            <div class="meta-box">
                <p><strong>Tiêu đề bài viết:</strong> ${title}</p>
                <p><strong>Từ khóa SEO mục tiêu:</strong> ${keywords}</p>
                <p><strong>Ngày xuất bản:</strong> ${publishDate}</p>
                <p><strong>Đường dẫn bài viết:</strong> <a href="https://cuuhodauin.com/kien-thuc" target="_blank">https://cuuhodauin.com/kien-thuc</a></p>
            </div>
            <h3>Xem trước nội dung (Preview):</h3>
            <div class="article-preview">${bodyMd.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <a href="https://cuuhodauin.com/kien-thuc" class="btn" target="_blank">Truy cập CuuHoDauIn.com</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} VNPIS Lab. Trung Tâm Cứu Hộ Đầu In Kỹ Thuật Số Số 1 Việt Nam</p>
            <p>Email này được gửi tự động tới ${recipientEmail} và tamluu253@gmail.com.</p>
        </div>
    </div>
</body>
</html>`;

    try {
        const info = await transporter.sendMail({
            from: '"VNPIS Lab Notification" <info@vnpis.com>',
            to: recipientEmail,
            cc: 'tamluu253@gmail.com',
            subject: `[CUUHODAUIN.COM] Bài Viết Mới: ${title}`,
            html: htmlContent
        });
        console.log(`[SUCCESS] Email sent to ${recipientEmail} and tamluu253@gmail.com! MessageId: ${info.messageId}`);
        return true;
    } catch (err) {
        console.error(`[ERROR] Failed to send email via SMTP:`, err);
        return false;
    }
}

if (require.main === module) {
    const targetFile = process.argv[2];
    if (targetFile) {
        sendCuuHoDauInNotification(targetFile);
    } else {
        console.log("Usage: node send_cuuhodauin_email.js <path_to_article.md>");
    }
}

module.exports = { sendCuuHoDauInNotification };
