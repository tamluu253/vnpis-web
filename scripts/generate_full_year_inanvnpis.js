const fs = require('fs');
const path = require('path');
const { sendArticleNotification } = require('./send_article_email');

const outputDir = path.join(__dirname, '..', 'vnpis_marketing', 'posts');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Master Topics Matrix for 52 Weeks (3 articles per week = 156 articles)
const topics = [
    // Pillar 1: In Tampon & Linh Kiện
    { name: "In Tampon Phím Bấm Nhựa ABS", keywords: "in tampon phím bấm, gia công in phím bấm, in linh kiện nhựa" },
    { name: "In Tampon Logo Bình Giữ Nhiệt Kim Loại", keywords: "in tampon bình giữ nhiệt, in logo kim loại, gia công in logo quà tặng" },
    { name: "In Tampon Vỏ Thiết Bị Y Tế", keywords: "in linh kiện y tế, in tampon thiết bị y tế, mực in an toàn y tế" },
    { name: "In Tampon Mặt Đồng Hồ & Linh Kiện Chính Xác", keywords: "in mặt đồng hồ, in chi tiết siêu nhỏ, in tampon độ chính xác cao" },
    { name: "Mực In Tampon 2 Thành Phần Chịu Hóa Chất", keywords: "mực in tampon 2 thành phần, mực in chịu hóa chất, mực bám nhựa pe pp" },
    { name: "Kỹ Thuật Chế Tạo Bản Khắc Cliché Laser In Tampon", keywords: "bản khắc in tampon, cliche laser, kỹ thuật khắc bản in tampon" },
    { name: "Cách Chọn Đầu Tampon Silicon Chuẩn Theo Hình Dạng Phôi", keywords: "đầu in tampon silicon, chọn đầu in tampon, pad printing silicone" },
    { name: "Tối Ưu Tốc Độ Chuyền Máy In Tampon Tự Động", keywords: "máy in tampon tự động, năng suất in tampon, chuyền gia công in tampon" },

    // Pillar 2: In Lụa B2B & Công Nghiệp
    { name: "In Lụa Công Nghiệp Trên Bao Bì Màng PE/PP", keywords: "in lụa bao bì, in lụa màng pe, gia công in lụa b2b" },
    { name: "In Lụa Bán Tự Động Trên Thủy Tinh & Gốm Sứ", keywords: "in lụa chai thủy tinh, in lụa cốc gốm sứ, máy in lụa tròn" },
    { name: "Giải Pháp In Lụa Thảm Cao Su & Màng Silicone", keywords: "in lụa trên cao su, in màng silicone, mực in lụa bám cao su" },
    { name: "Xử Lý Lỗi In Lụa Bị Nhòe Màu & Lệch Khung", keywords: "khắc phục lỗi in lụa, mực in lụa lem màu, kỹ thuật căng khung in lụa" },
    { name: "So Sánh In Lụa vs In Tampon: Lựa Chọn Nào Cho Nhà Sản Xuất?", keywords: "so sánh in lụa và in tampon, lựa chọn công nghệ in b2b, gia công in ấn" },
    { name: "Mực In Lụa UV Sấy Khô Nhanh Tiết Kiệm Năng Lượng", keywords: "mực in lụa uv, mực sấy uv công nghiệp, quy trình in lụa uv" },
    { name: "Bảng Giá Gia Công In Lụa Số Lượng Lớn Cho Nhà Máy", keywords: "báo giá in lụa b2b, bảng giá gia công in lụa, xưởng in lụa tphcm" },

    // Pillar 3: In UV Phẳng Kỹ Thuật Số
    { name: "In UV Kỹ Thuật Số Trên Tấm Gỗ & Acrylic Nghệ Thuật", keywords: "in uv trên gỗ, in uv acrylic, in uv kỹ thuật số phẳng" },
    { name: "In UV Nổi 3D & Phủ Bóng Varnish Cao Cấp", keywords: "in uv nổi 3d, phủ bóng varnish, hiệu ứng in uv sang trọng" },
    { name: "Giải Pháp In UV Trên Vỏ Sạc Dự Phòng & Ốp Lưng", keywords: "in uv ốp lưng, in uv sạc dự phòng, in logo quà tặng công nghệ" },
    { name: "Kỹ Thuật In Lớp Mực Trắng White Ink Trên Vật Liệu Tối Màu", keywords: "in lót mực trắng, white ink uv printing, in uv trên vật liệu đen" },
    { name: "Cách Bảo Dưỡng Máy In UV Phẳng Không Bị Đóng Cặn Mực", keywords: "bảo dưỡng máy in uv, súc rửa máy in uv, bảo quản mực uv" },

    // Pillar 4: Gia Công In Trên Mọi Chất Liệu
    { name: "Gia Công In Logo Trên Chất Liệu Da & Giả Da PU/PVC", keywords: "in logo trên da, in giả da pu, gia công in đồ da cao cấp" },
    { name: "Giải Pháp In Ấn Trên Linh Kiện Nhôm Anod & Thép Không Gỉ", keywords: "in trên nhôm anod, in thép không gỉ, mực in bám kim loại" },
    { name: "Test Độ Bền Mực In Chuẩn ISO 2409 Tại Xưởng VNPIS", keywords: "test độ bền mực in, iso 2409 cross hatch, thử nghiệm bám dính mực" },
    { name: "Quy Trình QA Kiểm Soát 100% Sản Phẩm Trước Khi Giao Hàng", keywords: "quy trình qa in ấn, kiểm soát chất lượng b2b, uy tín xưởng in vnpis" }
];

let generatedCount = 0;
const startDate = new Date('2026-08-10');

console.log("Starting generation of 52 weeks (156 articles) for inanvnpis.com...");

for (let week = 1; week <= 52; week++) {
    for (let dayIndex = 0; dayIndex < 3; dayIndex++) {
        generatedCount++;
        const topicObj = topics[(generatedCount - 1) % topics.length];
        
        const daysToAdd = (week - 1) * 7 + (dayIndex * 2);
        const postDate = new Date(startDate);
        postDate.setDate(startDate.getDate() + daysToAdd);
        const dateStr = postDate.toISOString().split('T')[0];

        const dayName = dayIndex === 0 ? "Thứ 2" : dayIndex === 1 ? "Thứ 4" : "Thứ 6";
        const filename = `week_${String(week).padStart(2, '0')}_post_0${dayIndex + 1}.md`;
        const filePath = path.join(outputDir, filename);

        const title = `[Tuần ${week} - ${dayName}] ${topicObj.name} - Giải Pháp Gia Công B2B VNPIS Solutions`;

        const content = `---
title: "${title}"
keywords: "${topicObj.keywords}"
date: "${dateStr}"
author: "VNPIS Solutions Technical Team"
category: "Gia Công In Ấn B2B"
canonical: "https://inanvnpis.com/blog/${filename.replace('.md', '')}"
schema_type: "TechnicalArticle"
publisher_mst: "0318266611"
---

# ${title}

Trong bối cảnh cạnh tranh sản xuất công nghiệp năm 2026, **chất lượng in ấn logo, thông số kỹ thuật và nhãn hiệu trên sản phẩm** đóng vai trò quyết định đến uy tín thương hiệu của các doanh nghiệp B2B. **VNPIS Solutions (inanvnpis.com)** mang đến giải pháp **${topicObj.name}** chuyên nghiệp, đáp ứng các tiêu chuẩn kỹ thuật khắt khe nhất.

---

## 1. Phân Tích Bài Toán Kỹ Thuật & Nhu Cầu Thị Trường

Các sản phẩm công nghiệp hiện đại đòi hỏi chi tiết in ấn không chỉ đẹp về thẩm mỹ mà còn phải chịu được các điều kiện môi trường khắc nghiệt:
* **Độ bám dính cao:** Chống bong tróc khi va đập, ma sát hoặc tiếp xúc với hóa chất làm sạch.
* **Độ sắc nét vượt trội:** Thể hiện rõ ràng các đường nét logo, mã QR Code hoặc ký tự kỹ thuật siêu nhỏ.
* **Tiết kiệm chi phí vận hành:** Tối ưu hóa chi phí gia công trên từng đơn vị sản phẩm cho đơn hàng hàng loạt.

---

## 2. Giải Pháp Gia Công Chuyên Nghiệp Tại VNPIS Solutions

Với hệ thống nhà xưởng hiện đại trang bị máy in tampon 1-4 màu, máy in lụa xoay tròn bán tự động và máy in UV phẳng kỹ thuật số, VNPIS Solutions áp dụng quy trình gia công nghiêm ngặt:

1. **Khảo sát phôi thực tế & thử nghiệm mực:** Lựa chọn gốc mực công nghiệp sấy gia nhiệt hoặc UV LED sấy cứng tức thì.
2. **Chế tạo khuôn định vị Exact-Fit:** Đảm bảo độ chính xác vị trí in ấn hàng loạt không bị xê dịch.
3. **Đội ngũ kỹ sư tay nghề cao:** Hơn 10 năm kinh nghiệm xử lý các ca in trên bề mặt phức tạp, chất liệu khó bám.

---

## 3. Quy Trình Kiểm Tra Chất Lượng QA & Cam Kết B2B

Tất cả lô hàng gia công tại VNPIS đều phải trải qua các bài test độ bền mực trước khi bàn giao:
* **Thử nghiệm cào xước (Scratch Test):** Đạt độ cứng 2H-3H.
* **Thử nghiệm ngâm cồn/dung môi (Solvent Rub Test):** Chịu được hơn 100 lần chà xát cồn 99%.
* **Thử nghiệm bóc keo (Tape Test):** Đạt tiêu chuẩn ISO 2409 không tróc màng mực.

---

## 4. Liên Hệ Báo Giá & In Thử Mẫu Miễn Phí

Quý khách hàng doanh nghiệp đang cần tư vấn giải pháp **${topicObj.name}**, hãy liên hệ ngay với VNPIS Solutions:

> **CÔNG TY TNHH VNPIS - XƯỞNG GIA CÔNG IN ẤN** (MST: 0318266611)
> * 🏢 **Địa chỉ Xưởng Gia Công & Văn Phòng (Duy nhất):** 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh
> * 📞 **Hotline/Zalo Kỹ thuật 24/7:** 0987 453 866
> * ✉️ **Email tiếp nhận báo giá & gửi mẫu:** info@vnpis.com
> * 🌐 **Website chính thức:** [https://inanvnpis.com](https://inanvnpis.com)

---

## 📌 Liên Kết Chủ Đề & Dịch Vụ Liên Quan (Topic Cluster Hub)
* 🔗 **Xem chi tiết trang dịch vụ chính:** [Dịch vụ & Báo giá VNPIS Solutions](https://inanvnpis.com/pos)
* 🔗 **Hỗ trợ kỹ thuật & Tư vấn 24/7:** [Hotline / Zalo VNPIS: 0987 453 866](https://zalo.me/0987453866)
* 🔗 **Trang chủ chính thức:** [inanvnpis.com](https://inanvnpis.com)
`;

        fs.writeFileSync(filePath, content, 'utf-8');
        sendArticleNotification(filePath);
    }
}

console.log(`[COMPLETED] Successfully generated 156 articles for inanvnpis.com with single address!`);
