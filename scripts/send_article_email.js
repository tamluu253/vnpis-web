const fs = require('fs');
const path = require('path');
let nodemailer;
try {
    nodemailer = require('nodemailer');
} catch (e) {
    nodemailer = null;
}

async function sendArticleNotification(articleFilePath, recipientEmail = process.env.TARGET_EMAIL || "info@vnpis.com") {
    if (!fs.existsSync(articleFilePath)) {
        console.error(`[ERROR] File not found: ${articleFilePath}`);
        return false;
    }

    const content = fs.readFileSync(articleFilePath, 'utf-8');
    const lines = content.split('\n');
    
    let title = "Bài viết mới trên vnpis.com";
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }
        .container { max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .header { background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center; }
        .header h1 { margin: 0; font-size: 20px; color: #f59e0b; }
        .header p { margin: 5px 0 0 0; font-size: 13px; color: #94a3b8; }
        .content { padding: 24px; }
        .meta-box { background: #f1f5f9; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; }
        .meta-box p { margin: 4px 0; }
        .btn { display: inline-block; background-color: #f59e0b; color: #0f172a; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; text-align: center; }
        .footer { background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }
        .article-preview { white-space: pre-wrap; font-size: 14px; background: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 400px; overflow-y: auto; font-family: inherit; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>VNPIS SOLUTIONS - MARKETING SEO ALERT</h1>
            <p>Hệ thống thông báo duyệt bài tự động đến ${recipientEmail}</p>
        </div>
        <div class="content">
            <h2>📢 Bài viết mới xuất bản: ${title}</h2>
            <div class="meta-box">
                <p><strong>Tiêu đề bài viết:</strong> ${title}</p>
                <p><strong>Từ khóa SEO mục tiêu:</strong> ${keywords}</p>
                <p><strong>Ngày xuất bản:</strong> ${publishDate}</p>
                <p><strong>Đường dẫn bài viết:</strong> <a href="https://vnpis.com/blog" target="_blank">https://vnpis.com/blog</a></p>
            </div>
            <h3>Xem trước nội dung (Preview):</h3>
            <div class="article-preview">${bodyMd.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <a href="https://vnpis.com" class="btn" target="_blank">Truy cập Trang chủ VNPIS.com</a>
        </div>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} VNPIS Solutions. Công ty TNHH VNPIS - MST: 0318266611</p>
            <p>Email này được gửi tự động tới ${recipientEmail} để bạn duyệt bài viết SEO xuất bản định kỳ.</p>
        </div>
    </div>
</body>
</html>`;

    // Always save local HTML preview
    const previewDir = path.join(process.cwd(), 'vnpis_marketing', 'email_previews');
    if (!fs.existsSync(previewDir)) {
        fs.mkdirSync(previewDir, { recursive: true });
    }
    const filename = path.basename(articleFilePath).replace('.md', '.html');
    const previewPath = path.join(previewDir, filename);

    fs.writeFileSync(previewPath, htmlContent, 'utf-8');
    console.log(`[SUCCESS] Email HTML preview created at: ${previewPath}`);
    console.log(`[TARGET] Target recipient: ${recipientEmail}`);

    // Real SMTP Email Dispatch if credentials exist
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "587");
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (nodemailer && smtpUser && smtpPass) {
        console.log(`[SMTP] Attempting real SMTP email dispatch to ${recipientEmail}...`);
        try {
            const transporter = nodemailer.createTransport({
                host: smtpHost,
                port: smtpPort,
                secure: smtpPort === 465,
                auth: {
                    user: smtpUser,
                    pass: smtpPass
                }
            });

            const info = await transporter.sendMail({
                from: `"VNPIS Auto Publishing" <${smtpUser}>`,
                to: recipientEmail,
                subject: `[VNPIS Marketing Alert] Bài viết mới: ${title}`,
                html: htmlContent
            });

            console.log(`[SMTP SUCCESS] Email sent successfully! Message ID: ${info.messageId}`);
            return { previewPath, messageId: info.messageId, status: "sent" };
        } catch (err) {
            console.error(`[SMTP ERROR] Failed to send email via SMTP: ${err.message}`);
            return { previewPath, error: err.message, status: "failed_smtp" };
        }
    } else {
        console.log(`[NOTICE] SMTP credentials (SMTP_USER / SMTP_PASS) not set. Local preview generated successfully.`);
        return { previewPath, status: "preview_only" };
    }
}

if (require.main === module) {
    const targetFile = process.argv[2];
    if (targetFile) {
        sendArticleNotification(targetFile).then(() => process.exit(0));
    } else {
        console.log("Usage: node send_article_email.js <path_to_article.md>");
    }
}

module.exports = { sendArticleNotification };

