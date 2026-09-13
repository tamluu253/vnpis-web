const fs = require('fs');
const path = require('path');
const { sendVnpisNotification } = require('./send_vnpis_email');

const outputDir = path.join(__dirname, '..', 'vnpis-web', 'content', 'articles');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Master Topics Matrix for 52 Weeks vnpis.com (Targeting: Máy in Pad, Máy in Lụa, Single Pass, Full Combo Vật Tư In Tampon & In Lụa, Vật tư TIJ/CIJ)
const topics = [
    // Pillar 1: Full Combo Vật Tư In Tampon (Pad Printing Supplies)
    { name: "Full Combo Vật Tư In Tampon: Đầu Silicon, Bản Thép Cliché & Cốc Mực Kín VNPIS", keywords: "combo vật tư in tampon, đầu in tampon silicon, bản khắc cliche pad printing, cốc mực kín ceramic" },
    { name: "Trọn Bộ Mực In Tampon 2 Thành Phần & Dung Môi Retarder VNPIS", keywords: "mực in tampon 2 thành phần, dung môi pha mực tampon, chất đóng rắn hardener tampon, vật tư in tampon tphcm" },
    { name: "Giải Pháp Lưỡi Gạt Mực Ceramic Ring & Vòng Gốm Cốc Mực Kín Máy In Pad", keywords: "vòng gốm ceramic ring, lưỡi gạt cốc mực kín, phụ kiện máy in pad, vật tư in tampon vnpis" },
    { name: "Bảng Chọn Độ Cứng Đầu Tampon Silicon (Shore 30A - 60A) Theo Phôi In", keywords: "độ cứng đầu in tampon, silicone rubber pad, tư vấn chọn vật tư in tampon" },

    // Pillar 2: Full Combo Vật Tư In Lụa (Screen Printing Supplies)
    { name: "Full Combo Vật Tư In Lụa Công Nghiệp: Khung Nhôm Lụa, Dao Gạt PU & Keo Chụp Bản", keywords: "combo vật tư in lụa, khung in lụa nhôm, dao gạt mực in lụa squeegee, keo chụp bản lụa" },
    { name: "Trọn Bộ Mực In Lụa Dầu Solvent, Mực UV & Dung Dịch Tẩy Rửa Khung VNPIS", keywords: "mực in lụa solvent, mực in lụa uv, dung dịch lau khung lụa, vật tư ngành in lụa vnpis" },
    { name: "Hướng Dẫn Chọn Lưới Lụa Thụy Sĩ (Mesh Count 80T - 165T) Chuẩn Nhà Máy", keywords: "lưới in lụa mesh count, chọn lưới in lụa, vải lụa căng khung, vật tư in lụa b2b" },
    { name: "Dao Gạt Mực Squeegee Chống Ăn Mòn Hóa Chất Độ Cứng 65-85 Shore A", keywords: "dao gạt mực in lụa, lưỡi cao su gạt mực, squeegee rubber strip, vật tư in lụa tphcm" },

    // Pillar 3: Máy In Pad & Máy In Lụa
    { name: "Giải Pháp Máy In Pad 1-4 Màu Công Nghiệp Độ Chính Xác Siêu Nhỏ", keywords: "máy in pad, máy in tampon công nghiệp, máy in pad 4 màu, thiết bị in pad vnpis" },
    { name: "Máy In Lụa Xoay Tròn Bán Tự Động Cho Chai Thủy Tinh & Cốc Nhựa", keywords: "máy in lụa tròn, máy in lụa bán tự động, máy in lụa chai thủy tinh" },
    { name: "Hệ Thống Máy In Lụa Phẳng Công Nghiệp Tốc Độ Cao", keywords: "máy in lụa phẳng công nghiệp, máy in lụa bao bì, thiết bị in lụa vnpis" },

    // Pillar 4: Máy In KTS Single Pass
    { name: "Giải Pháp Máy In KTS Single Pass Tốc Độ Cao Cho Bao Bì Thùng Carton", keywords: "máy in kts single pass, máy in phun single pass công nghiệp, máy in bao bì single pass" },
    { name: "Ứng Dụng Máy In Single Pass Trong Sản Xuất Túi Giấy & Khay Giấy Bán Hàng", keywords: "máy in single pass túi giấy, in kts single pass nhanh, thiết bị in single pass vnpis" },

    // Pillar 5: Vật Tư In TIJ & CIJ
    { name: "Hộp Mực Cartridge TIJ 12.7mm Độ Bám Dính Cao Trên Nhựa PE/PP", keywords: "vật tư mực in tij, cartridge tij 12.7mm, hộp mực tij bám dính nhựa" },
    { name: "Dung Môi Solvent MEK / Ethanol Chính Hãng Cho Mực In CIJ", keywords: "vật tư dung môi cij, solvent mek cij, dung môi pha mực cij vnpis" },
    { name: "Dung Dịch Rửa & Ngâm Đầu Phun TIJ / CIJ VNPIS Flush Solution", keywords: "dung dịch rửa mực tij cij, vnpis flush solution, vật tư bảo dưỡng máy in date" }
];

let generatedCount = 0;
const startDate = new Date('2026-08-10');

console.log("Starting generation of 52 weeks (156 articles) for vnpis.com including Full Combo Supplies...");

for (let week = 1; week <= 52; week++) {
    for (let dayIndex = 0; dayIndex < 3; dayIndex++) {
        generatedCount++;
        const topicObj = topics[(generatedCount - 1) % topics.length];
        
        const daysToAdd = (week - 1) * 7 + (dayIndex * 2);
        const postDate = new Date(startDate);
        postDate.setDate(startDate.getDate() + daysToAdd);
        const dateStr = postDate.toISOString().split('T')[0];

        const dayName = dayIndex === 0 ? "Thứ 2" : dayIndex === 1 ? "Thứ 4" : "Thứ 6";
        const filename = `week_${String(week).padStart(2, '0')}_vnpis_0${dayIndex + 1}.md`;
        const filePath = path.join(outputDir, filename);

        const title = `[Tuần ${week} - ${dayName}] ${topicObj.name} - VNPIS Equipment & Full Combo Vật Tư (vnpis.com)`;

        const content = `---
title: "${title}"
keywords: "${topicObj.keywords}"
date: "${dateStr}"
author: "VNPIS Equipment Engineering Team"
category: "Full Combo Vật Tư In Tampon & In Lụa, Máy In Pad, Single Pass, Vật Tư TIJ/CIJ"
canonical: "https://vnpis.com/blog/${filename.replace('.md', '')}"
schema_type: "TechnicalArticle"
publisher_mst: "0318266611"
---

# ${title}

Trong ngành sản xuất và gia công in ấn công nghiệp 2026, bên cạnh thiết bị máy móc hiện đại, việc trang bị **Trọn bộ Combo Vật tư in Tampon (Pad Printing) và Vật tư in Lụa (Screen Printing)** chính hãng, đồng bộ đóng vai trò quyết định đến 90% chất lượng sản phẩm in và độ bền của dây chuyền.

**Công ty TNHH VNPIS (vnpis.com)** tự hào là nhà phân phối trọn gói thiết bị & giải pháp **${topicObj.name}** hàng đầu tại Việt Nam.

---

## 1. Trọn Bộ Full Combo Vật Tư Ngành In Tại VNPIS

### A. Full Combo Vật Tư In Tampon (Pad Printing Supplies):
1. **Đầu in Tampon Silicon:** Đa dạng độ cứng từ Shore 30A đến 60A, kiểu dáng nón, chữ nhật, oval chuyên dụng cho mọi hình dạng phôi.
2. **Bản khắc Cliché & Dịch vụ khắc Laser Fiber:** Bản thép dày 0.5mm và bản mỏng polymer, khắc độ sâu chuẩn $20-25\,\mu\text{m}$.
3. **Cốc mực kín (Sealed Ink Cup) & Vòng gốm Ceramic Ring:** Đường kính $\varnothing 60\text{mm}, \varnothing 90\text{mm}, \varnothing 120\text{mm}$ chống ăn mòn hóa chất.
4. **Mực in Tampon 2 thành phần & Phụ gia:** Mực bám dính nhựa ABS/PE/PP/Kim loại + Chất đóng rắn Catalyst + Dung môi pha sấy nhanh Thinner / sấy chậm Retarder.

### B. Full Combo Vật Tư In Lụa (Screen Printing Supplies):
1. **Khung in lụa nhôm định hình cao cấp:** Căng sẵn lưới lụa Thụy Sĩ (Mesh count 80T - 165T) lực căng chuẩn $\ge 18\text{ N/cm}$.
2. **Dao gạt mực Squeegee PU:** Độ cứng 65, 75, 85 Shore A chống nở khi tiếp xúc với mực Solvent và UV.
3. **Keo chụp bản Photopolymer & Bột nhạy sáng Diazo:** Độ phân giải cực cao, bóc tách bản dễ dàng với dung dịch tẩy keo VNPIS.
4. **Mực in lụa công nghiệp & Dung dịch rửa khung:** Mực lụa Solvent, UV, Mực Plastisol và nước lau khung siêu sạch.

---

## 2. Ưu Thế Khi Sử Dụng Full Combo Vật Tư Nhập Khẩu VNPIS

* **Tính đồng bộ 100%:** Tránh hiện tượng phản ứng hóa học gây đông tụ mực hoặc nứt mặt thạch anh/màng lụa khi dùng vật tư trôi nổi.
* **Tối ưu chi phí sản xuất:** Mua trọn bộ Combo giúp tiết kiệm $15\% - 25\%$ chi phí so với mua lẻ.
* **Giao hàng siêu tốc trong ngày:** Hàng luôn sẵn kho tại TP. Hồ Chí Minh.

---

## 3. Liên Hệ Đặt Hàng Full Combo Vật Tư & Thiết Bị VNPIS

Quý khách hàng xưởng in và nhà máy cần báo giá **${topicObj.name}**, xin vui lòng liên hệ trực tiếp:

> **CÔNG TY TNHH VNPIS - THIẾT BỊ & GIẢI PHÁP MÃ HÓA** (MST: 0318266611)
> * 🏢 **Trụ sở chính:** Tầng 1, 202 Lê Lai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
> * 🔬 **Lab Center 1 (Phòng Siêu Âm Cứu Hộ):** 62 Trần Thị Nơi, Phường Chánh Hưng (P.4, Q.8), TP. Hồ Chí Minh
> * 🏭 **Địa điểm Kinh doanh 2:** 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh
> * 📞 **Hotline/Zalo Tư vấn B2B 24/7:** 0987 453 866
> * ✉️ **Email tiếp nhận báo giá:** info@vnpis.com
> * 🌐 **Website chính thức:** [https://vnpis.com](https://vnpis.com)

---

## 📌 Liên Kết Chủ Đề & Dịch Vụ Liên Quan (Topic Cluster Hub)
* 🔗 **Xem chi tiết trang dịch vụ chính:** [Dịch vụ & Thiết bị VNPIS (vnpis.com)](https://vnpis.com/articles)
* 🔗 **Hỗ trợ kỹ thuật & Tư vấn 24/7:** [Hotline / Zalo VNPIS: 0987 453 866](https://zalo.me/0987453866)
* 🔗 **Trang chủ chính thức:** [vnpis.com](https://vnpis.com)
`;

        fs.writeFileSync(filePath, content, 'utf-8');
        sendVnpisNotification(filePath);
    }
}

console.log(`[COMPLETED] Successfully regenerated 156 articles for vnpis.com including Full Combo Pad & Screen Supplies!`);
