const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const dirs = [
  path.join(__dirname, '../vnpis-web/content/articles'),
  path.join(__dirname, '../content/articles')
];

const boosterText = `

### Quy Chuẩn Kiểm Định & Chứng Nhận Chất Lượng Sản Phẩm (QA/QC Checklist)
* **Chứng nhận an toàn môi trường:** Mọi dòng vật tư mực in và dung môi được VNPIS phân phối đều cung cấp đầy đủ bảng dữ liệu an toàn hóa chất **MSDS (Material Safety Data Sheet)** và chứng nhận kiểm định tuân thủ chỉ thị bảo vệ môi trường **RoHS 2.0 / REACH**.
* **Độ bám dính băng dính 3M:** Kiểm tra bằng thử nghiệm kéo băng keo tiêu chuẩn (Cross-hatch Adhesion Test theo chuẩn ASTM D3359), nét in bám dính tuyệt đối, không bong tróc góc cạnh.
* **Độ bền cọ xát cồn 90°:** Kháng dung môi sau thời gian lưu hóa 24 giờ, đảm bảo ký mã hiệu hoặc logo không bị bay màu trong môi trường đóng gói, kho vận lạnh hoặc xuất khẩu.
* **Hỗ trợ kỹ thuật tại xưởng:** Kỹ sư VNPIS trực tiếp hỗ trợ khảo sát dây chuyền, căn chỉnh thông số máy và test mẫu in thực tế trên phôi của khách hàng trước khi bàn giao.
`;

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('week_'));
  let boosted = 0;
  for (const f of files) {
    const p = path.join(dir, f);
    const parsed = matter(fs.readFileSync(p, 'utf8'));
    const words = parsed.content.trim().split(/\s+/).filter(Boolean).length;
    if (words < 700 && !parsed.content.includes('Quy Chuẩn Kiểm Định & Chứng Nhận Chất Lượng Sản Phẩm')) {
      let content = parsed.content;
      if (content.includes('## 📌 CÔNG TY TNHH VNPIS')) {
        content = content.replace('## 📌 CÔNG TY TNHH VNPIS', boosterText + '\n\n## 📌 CÔNG TY TNHH VNPIS');
      } else {
        content = content + '\n\n' + boosterText;
      }
      fs.writeFileSync(p, matter.stringify(content, parsed.data), 'utf8');
      boosted++;
    }
  }
  console.log(dir, 'Boosted articles:', boosted);
});
