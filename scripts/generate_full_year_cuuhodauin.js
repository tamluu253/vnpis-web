const fs = require('fs');
const path = require('path');
const { sendCuuHoDauInNotification } = require('./send_cuuhodauin_email');

const outputDir = path.join(__dirname, '..', 'cuuhodauin-web', 'content', 'articles');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Master Topics Matrix for 52 Weeks cuuhodauin.com (156 articles)
const topics = [
    // Pillar 1: Cứu Hộ Đầu In UV Công Nghiệp
    { name: "Cứu Hộ Đầu In Ricoh Gen5 Nghẹt Tia UV", keywords: "cứu hộ đầu in Ricoh Gen5, phục hồi đầu in ricoh, súc rửa đầu in uv" },
    { name: "Phục Hồi Đầu In Ricoh Gen6 (MH5320/MH5340) Lệch Tia", keywords: "phục hồi đầu in Ricoh Gen6, thông nghẹt đầu in ricoh gen6, sửa đầu in uv công nghiệp" },
    { name: "Sút Rửa Siêu Âm Tần Số Kép Cho Đầu In Konica 1024i", keywords: "cứu hộ đầu in Konica 1024i, rửa đầu in konica siêu âm, thông nghẹt konica 1024i" },
    { name: "Xử Lý Đầu In Kyocera KJ4A / KJ4B Bị Mất Kênh Kỹ Thuật Số", keywords: "cứu hộ đầu in Kyocera, phục hồi đầu in kyocera kj4a, thông nghẹt kyocera kj4b" },
    { name: "Phục Hồi Đầu In Seiko SPT 510/1020 Cho Máy In Bạt Khổ Lớn", keywords: "sửa đầu in Seiko 510, cứu hộ đầu in seiko 1024, thông nghẹt đầu in seiko" },

    // Pillar 2: Cứu Hộ Đầu In Epson
    { name: "Xử Lý Đầu In Epson i3200 Bị Thông Kênh Màng Ngăn", keywords: "đầu in epson i3200 thông kênh, sửa đầu in epson i3200, phục hồi i3200 a1 e1 u1" },
    { name: "Phục Hồi Đầu In XP600 (FA09050) Máy In Quảng Cáo Mini", keywords: "thông nghẹt đầu in XP600, phục hồi đầu in xp600, sửa đầu in máy in decal" },
    { name: "Phương Pháp Thông Nghẹt Đầu In Epson DX5 / DX7 Máy In Chuyển Nhiệt", keywords: "thông nghẹt đầu in epson dx5, phục hồi đầu in dx7, sửa đầu in chuyển nhiệt" },
    { name: "Cứu Hộ Đầu In Epson TX800 / F1080 Cho Máy In UV Mini", keywords: "sửa đầu in tx800, thông nghẹt đầu in f1080, cứu hộ đầu in epson mini" },

    // Pillar 3: Kỹ Thuật Bảo Dưỡng Phòng Ngừa
    { name: "Cách Dùng Dung Dịch VNPIS Flush Solution Ngâm Đầu In An Toàn", keywords: "dung dịch ngâm đầu in, dung dịch rửa đầu in vnpis, ngâm bảo dưỡng đầu in" },
    { name: "Cân Chỉnh Điện Áp Drive Voltage Tránh Làm Cháy Thạch Anh Đầu In", keywords: "điện áp đầu in drive voltage, cân chỉnh điện áp máy in uv, tránh cháy đầu in" },
    { name: "Quy Trình Xả Mực & Bảo Quản Đầu In Khi Nghỉ Tết / Nghỉ Lễ Dài Ngày", keywords: "quy trình bảo quản đầu in nghỉ tết, xả mực đầu in công nghiệp, dung dịch ngâm dài hạn" },
    { name: "Kiểm Soát Nhiệt Độ Khay Mực Tránh Đông Tụ Mực UV", keywords: "nhiệt độ đầu in uv, kiểm soát sub-tank temp, bảo quản mực uv" },

    // Pillar 4: Case Studies & Báo Cáo Kỹ Thuật VNPIS Lab
    { name: "Báo Cáo Ca Phục Hồi Đầu In Ricoh Gen5 Tiết Kiệm 30 Triệu Đồng", keywords: "ca cứu hộ đầu in ricoh gen5, tiết kiệm chi phí thay đầu in, vnpis lab case study" },
    { name: "Khôi Phục 95% Số Tia Cho Đầu In Epson i3200 Tưởng Chừng Phải Bỏ Đi", keywords: "phục hồi đầu in i3200 thành công, vnpis lab uy tín, sửa đầu in tphcm" },
    { name: "Quy Trình Kiểm Tra Kính Hiển Vi Kỹ Thuật Số 500x Tại VNPIS Lab", keywords: "kính hiển vi kiểm tra đầu in, quy trình vnpis lab, chẩn đoán lỗi đầu in" }
];

let generatedCount = 0;
const startDate = new Date('2026-08-10');

console.log("Starting generation of 52 weeks (156 articles) for cuuhodauin.com...");

for (let week = 1; week <= 52; week++) {
    for (let dayIndex = 0; dayIndex < 3; dayIndex++) {
        generatedCount++;
        const topicObj = topics[(generatedCount - 1) % topics.length];
        
        const daysToAdd = (week - 1) * 7 + (dayIndex * 2);
        const postDate = new Date(startDate);
        postDate.setDate(startDate.getDate() + daysToAdd);
        const dateStr = postDate.toISOString().split('T')[0];

        const dayName = dayIndex === 0 ? "Thứ 2" : dayIndex === 1 ? "Thứ 4" : "Thứ 6";
        const filename = `week_${String(week).padStart(2, '0')}_cuuhodauin_0${dayIndex + 1}.md`;
        const filePath = path.join(outputDir, filename);

        const title = `[Tuần ${week} - ${dayName}] ${topicObj.name} - Chuyên Đề VNPIS Lab (cuuhodauin.com)`;

        const content = `---
title: "${title}"
keywords: "${topicObj.keywords}"
date: "${dateStr}"
author: "VNPIS Lab Technical Team"
category: "Cứu Hộ & Phục Hồi Đầu In"
---

# ${title}

Đầu in phun kỹ thuật số (Ricoh, Epson, Konica, Kyocera, Seiko) là bộ phận có giá trị cao nhất trong các hệ thống máy in công nghiệp. Việc đầu in bị **nghẹt tia, lệch tia, thông kênh hoặc mất màu** nếu không được xử lý đúng kỹ thuật sẽ gây thiệt hại hàng chục triệu đồng và làm ngắt quãng tiến độ sản xuất của xưởng.

**VNPIS Lab (cuuhodauin.com)** – Trung tâm Cứu hộ Đầu in Kỹ thuật số Số 1 Việt Nam mang đến giải pháp **${topicObj.name}** chuyên sâu với cam kết **No Cure - No Pay (Không phục hồi thành công, Không tính phí)**.

---

## 1. Phân Tích Nguyên Nhân Sự Cố & Chẩn Đoán Tại Lab

Các ca sự cố đầu in thường xuất phát từ 3 nguyên nhân kỹ thuật cốt lõi:
1. **Tắc nghẽn cơ học/Hóa cứng cặn mực:** Mực in UV hoặc Solvent bị đóng rắn trong các lỗ phun đường kính siêu nhỏ ($15-30\,\mu\text{m}$).
2. **Sai lầm khi súc rửa thủ công:** Dùng dung dịch rửa không phù hợp hoặc dùng xi-lanh bơm áp lực quá mạnh làm rách màng ngăn thạch anh piezo.
3. **Lão hóa mạch điện & Nhiễm dung môi:** Cáp dẫn mực bị rò rỉ dung môi làm chập cháy chân pin mạch điều khiển đầu in.

---

## 2. Quy Trình Phục Hồi Đầu In Độc Quyền Tại VNPIS Lab

Tại VNPIS Lab, chúng tôi áp dụng quy trình cứu hộ 5 bước được chuẩn hóa:

1. **Chẩn đoán kính hiển vi 500x:** Xác định vị trí nứt vỡ hoặc cặn bám.
2. **Rửa siêu âm tần số kép (Dual-Frequency Ultrasonic):** Sử dụng sóng siêu âm 40kHz / 80kHz biên độ nhỏ, bóc tách cặn mực mà không gây tổn hại cho thạch anh áp điện.
3. **Dung dịch rửa sinh học VNPIS Flush:** Làm tan cặn mực polymer hóa mà hoàn toàn bảo vệ màng ngăn silicone.
4. **Máy test chuyên dụng:** Đầu in được test trực tiếp bảng màu trên máy test công nghiệp trước khi nghiệm thu bàn giao.

---

## 3. Quyền Lợi & Cam Kết Của Khách Hàng Khi Sử Dụng Dịch Vụ VNPIS Lab

* **Cam kết No Cure - No Pay:** Khảo sát và súc rửa thử nghiệm miễn phí. Nếu tỷ lệ phục hồi tia < 75%, khách hàng hoàn toàn không tốn bất kỳ chi phí nào.
* **Tiết kiệm 70% - 85% chi phí:** So với việc phải chi 20 - 45 triệu đồng mua đầu in mới.
* **Thời gian xử lý siêu tốc:** Hoàn thành cứu hộ trong vòng 24h - 48h để xưởng in nhanh chóng hoạt động trở lại.

---

## 4. Liên Hệ Trung Tâm Cứu Hộ Đầu In VNPIS Lab

Nếu đầu in máy in UV, máy in bạt hay máy in vải của bạn đang gặp sự cố, hãy liên hệ ngay với VNPIS Lab để được tư vấn cứu hộ:

> **TRUNG TÂM CỨU HỘ ĐẦU IN VNPIS LAB**
> * **Lab Center 1:** 62 Trần Thị Nơi, Phường Chánh Hưng (P.4, Q.8), TP. Hồ Chí Minh
> * **Hotline/Zalo Cứu hộ 24/7:** 0987 453 866
> * **Email tiếp nhận sự cố:** info@vnpis.com
> * **Website chính thức:** [https://cuuhodauin.com](https://cuuhodauin.com)
`;

        fs.writeFileSync(filePath, content, 'utf-8');
        sendCuuHoDauInNotification(filePath);
    }
}

console.log(`[COMPLETED] Successfully generated 156 articles & email alerts for cuuhodauin.com!`);
