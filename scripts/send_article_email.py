import os
import sys
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

def send_article_notification(article_file_path, recipient_email="info@vnpis.com"):
    """
    Reads a markdown article file, extracts frontmatter & content, formats an HTML email notification,
    and sends it via SMTP if configured, or saves an HTML preview for local review.
    """
    if not os.path.exists(article_file_path):
        print(f"[ERROR] Article file not found: {article_file_path}")
        return False

    with open(article_file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Simple frontmatter parsing
    title = "Bài viết mới trên inanvnpis.com"
    keywords = "N/A"
    publish_date = datetime.now().strftime("%Y-%m-%d")
    
    lines = content.splitlines()
    body_lines = []
    in_frontmatter = False
    
    for line in lines:
        if line.strip() == "---":
            in_frontmatter = not in_frontmatter
            continue
        if in_frontmatter:
            if line.startswith("title:"):
                title = line.replace("title:", "").strip().strip('"')
            elif line.startswith("keywords:"):
                keywords = line.replace("keywords:", "").strip().strip('"')
            elif line.startswith("date:"):
                publish_date = line.replace("date:", "").strip().strip('"')
        else:
            body_lines.append(line)

    body_md = "\n".join(body_lines).strip()
    
    # Format HTML Email
    html_content = f"""
    <!DOCTYPE html>
    <html lang="vi">
    <head>
        <meta charset="UTF-8">
        <style>
            body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #1e293b; background-color: #f8fafc; margin: 0; padding: 20px; }}
            .container {{ max-width: 680px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px rgba(0,0,0,0.05); }}
            .header {{ background-color: #0f172a; color: #ffffff; padding: 24px; text-align: center; }}
            .header h1 {{ margin: 0; font-size: 20px; color: #f59e0b; }}
            .header p {{ margin: 5px 0 0 0; font-size: 13px; color: #94a3b8; }}
            .content {{ padding: 24px; }}
            .meta-box {{ background: #f1f5f9; border-left: 4px solid #f59e0b; padding: 12px 16px; border-radius: 4px; margin-bottom: 20px; font-size: 14px; }}
            .meta-box p {{ margin: 4px 0; }}
            .btn {{ display: inline-block; background-color: #f59e0b; color: #0f172a; font-weight: bold; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin-top: 20px; text-align: center; }}
            .footer {{ background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #64748b; }}
            .article-preview {{ white-space: pre-wrap; font-size: 14px; background: #fafafa; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; max-height: 400px; overflow-y: auto; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>VNPIS SOLUTIONS - MARKETING SEO ALERT</h1>
                <p>Hệ thống thông báo duyệt bài tự động đến info@vnpis.com</p>
            </div>
            <div class="content">
                <h2>📢 Bài viết mới đã được tạo cho website inanvnpis.com</h2>
                <div class="meta-box">
                    <p><strong>Tiêu đề bài viết:</strong> {title}</p>
                    <p><strong>Từ khóa SEO mục tiêu:</strong> {keywords}</p>
                    <p><strong>Ngày dự kiến đăng:</strong> {publish_date}</p>
                    <p><strong>Đường dẫn bài viết:</strong> <a href="https://inanvnpis.com/blog" target="_blank">https://inanvnpis.com/blog</a></p>
                </div>
                <h3>Xem trước nội dung (Preview):</h3>
                <div class="article-preview">
{body_md}
                </div>
                <a href="https://inanvnpis.com" class="btn" target="_blank">Truy cập Trang chủ InAnVNPIS.com</a>
            </div>
            <div class="footer">
                <p>&copy; {datetime.now().year} VNPIS Solutions. Công ty TNHH VNPIS - MST: 0318266611</p>
                <p>Email này được gửi tự động tới {recipient_email} để bạn xem và kiểm tra nội dung bài viết SEO.</p>
            </div>
        </div>
    </body>
    </html>
    """

    # Check for SMTP Environment variables
    smtp_host = os.environ.get("SMTP_HOST")
    smtp_port = int(os.environ.get("SMTP_PORT", 587))
    smtp_user = os.environ.get("SMTP_USER")
    smtp_pass = os.environ.get("SMTP_PASS")

    if smtp_host and smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart("alternative")
            msg["Subject"] = f"[VNPIS SEO Alert] Bài viết mới: {title}"
            msg["From"] = smtp_user
            msg["To"] = recipient_email

            part_html = MIMEText(html_content, "html", "utf-8")
            msg.attach(part_html)

            with smtplib.SMTP(smtp_host, smtp_port) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.sendmail(smtp_user, recipient_email, msg.as_string())
            print(f"[SUCCESS] Email sent successfully to {recipient_email} via SMTP!")
            return True
        except Exception as e:
            print(f"[WARNING] Failed to send email via SMTP: {e}")

    # Fallback / Local HTML Preview mode
    preview_dir = os.path.join(os.path.dirname(article_file_path), "..", "email_previews")
    os.makedirs(preview_dir, exist_ok=True)
    filename = os.path.basename(article_file_path).replace(".md", ".html")
    preview_path = os.path.join(preview_dir, filename)

    with open(preview_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    print(f"[PREVIEW READY] Email HTML preview saved to: {preview_path}")
    print(f"[INFO] SMTP credentials not set in .env.local. Email preview generated for {recipient_email}.")
    return True

if __name__ == "__main__":
    if len(sys.argv) > 1:
        file_path = sys.argv[1]
        send_article_notification(file_path)
    else:
        print("Usage: python send_article_email.py <path_to_article.md>")
