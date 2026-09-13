const fs = require('fs');
const path = require('path');

const projects = [
    {
        name: 'inanvnpis.com',
        dir: path.join(__dirname, '..', 'vnpis_marketing', 'posts'),
        hubUrl: 'https://inanvnpis.com/pos',
        domain: 'https://inanvnpis.com',
        orgName: 'VNPIS Solutions (inanvnpis.com)',
        addressBlock: `> **CÔNG TY TNHH VNPIS - XƯỞNG GIA CÔNG IN ẤN** (MST: 0318266611)
> * 🏢 **Địa chỉ Xưởng Gia Công & Văn Phòng:** 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh
> * 📞 **Hotline/Zalo Kỹ thuật 24/7:** 0987 453 866
> * ✉️ **Email tiếp nhận báo giá & gửi mẫu:** info@vnpis.com
> * 🌐 **Website chính thức:** [https://inanvnpis.com](https://inanvnpis.com)`
    },
    {
        name: 'cuuhodauin.com',
        dir: path.join(__dirname, '..', 'cuuhodauin-web', 'content', 'articles'),
        hubUrl: 'https://cuuhodauin.com/articles',
        domain: 'https://cuuhodauin.com',
        orgName: 'VNPIS Lab (cuuhodauin.com)',
        addressBlock: `> **TRUNG TÂM CỨU HỘ ĐẦU IN KỸ THUẬT SỐ VNPIS LAB** (MST: 0318266611)
> * 🔬 **Lab Center 1 (Phòng Siêu Âm Cứu Hộ):** 62 Trần Thị Nơi, Phường Chánh Hưng (P.4, Q.8), TP. Hồ Chí Minh
> * 🏢 **Trụ sở chính:** Tầng 1, 202 Lê Lai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
> * 📞 **Hotline/Zalo Cứu hộ 24/7:** 0987 453 866
> * ✉️ **Email tiếp nhận sự cố:** info@vnpis.com
> * 🌐 **Website chính thức:** [https://cuuhodauin.com](https://cuuhodauin.com)`
    },
    {
        name: 'vnpis.com',
        dir: path.join(__dirname, '..', 'vnpis-web', 'content', 'articles'),
        hubUrl: 'https://vnpis.com/articles',
        domain: 'https://vnpis.com',
        orgName: 'Công Ty TNHH VNPIS (vnpis.com)',
        addressBlock: `> **CÔNG TY TNHH VNPIS - THIẾT BỊ & GIẢI PHÁP MÃ HÓA** (MST: 0318266611)
> * 🏢 **Trụ sở chính:** Tầng 1, 202 Lê Lai, Phường Bến Thành, Quận 1, TP. Hồ Chí Minh
> * 🔬 **Lab Center 1 (Phòng Siêu Âm Cứu Hộ):** 62 Trần Thị Nơi, Phường Chánh Hưng (P.4, Q.8), TP. Hồ Chí Minh
> * 🏭 **Địa điểm Kinh doanh 2:** 18 Đường số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, TP. Hồ Chí Minh
> * 📞 **Hotline/Zalo Tư vấn B2B 24/7:** 0987 453 866
> * ✉️ **Email tiếp nhận báo giá:** info@vnpis.com
> * 🌐 **Website chính thức:** [https://vnpis.com](https://vnpis.com)`
    }
];

let totalEnhanced = 0;

console.log("Updating exact addresses for all 3 domains (inanvnpis: 1 address, cuuhodauin: 2 addresses, vnpis.com: 3 addresses)...");

projects.forEach(project => {
    if (!fs.existsSync(project.dir)) return;

    const files = fs.readdirSync(project.dir).filter(f => f.endsWith('.md'));

    files.forEach(file => {
        const filePath = path.join(project.dir, file);
        let content = fs.readFileSync(filePath, 'utf-8');

        // Replace or append exact address block at the end
        if (content.includes('## 4. Liên Hệ') || content.includes('## 4. Liên hệ')) {
            const parts = content.split(/## 4\. Liên [Hh]ệ/);
            content = parts[0] + `## 4. Liên Hệ & Thông Tin Chi Nhánh\n\n${project.addressBlock}\n`;
        }

        // Add Internal Links section if not present
        if (!content.includes('## 📌 Liên Kết Chủ Đề & Dịch Vụ Liên Quan')) {
            const internalLinkSection = `
---

## 📌 Liên Kết Chủ Đề & Dịch Vụ Liên Quan (Topic Cluster Hub)
* 🔗 **Xem chi tiết trang dịch vụ chính:** [Dịch vụ & Báo giá ${project.orgName}](${project.hubUrl})
* 🔗 **Hỗ trợ kỹ thuật & Tư vấn 24/7:** [Hotline / Zalo VNPIS: 0987 453 866](https://zalo.me/0987453866)
* 🔗 **Trang chủ chính thức:** [${project.name}](${project.domain})
`;
            content += internalLinkSection;
        }

        fs.writeFileSync(filePath, content, 'utf-8');
        totalEnhanced++;
    });

    console.log(`[ADDRESS UPDATED] ${files.length} articles updated for ${project.name}`);
});

console.log(`[COMPLETED] Successfully updated address requirements across all ${totalEnhanced} articles!`);
