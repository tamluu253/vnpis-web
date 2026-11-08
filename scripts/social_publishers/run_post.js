const { publishPost, updatePageInfo } = require('./facebook_auto_manager');

async function main() {
  const message = `🛑 KHÁCH CHỈ ĐẶT 50 CÁI ÁO / 100 CHIẾC MẪU MÀ PHẢI MUA CẢ HỘP 1KG MỰC?
👉 ĐỪNG LÃNG PHÍ NỮA – VNPIS NHẬN PHA MỰC CHUẨN PANTONE CHỈ TỪ 100G!

Có phải xưởng của bạn đang gặp cảnh:
❌ Nhận đơn hàng in mẫu hoặc đơn số lượng ít, nhưng đi mua mực chỗ nào cũng bắt lấy tối thiểu 1kg - 2kg? Mực dùng không hết để kho thì khô cứng, bỏ thì tiếc đứt ruột?
❌ Tự pha màu thủ công bằng mắt thì sáng nhìn một kiểu, trưa nhìn một kiểu, khách hàng khó tính soi đèn chuẩn là bắt đền vì lệch tông?
❌ Mỗi lần pha bổ sung là một lần… “hên xui”, lô in sau lệch màu hoàn toàn so với lô trước?

💡 GIẢI PHÁP ĐÃ CÓ TẠI VNPIS SOLUTIONS!
Với siêu phẩm máy quang phổ đo màu 3NH ST-700D Plus vừa cập bến xưởng, VNPIS chính thức triển khai:
🎨 DỊCH VỤ PHA MÀU MỰC THEO YÊU CẦU – NHẬN ĐƠN TỪ 100G!

✅ Đa dạng hệ mực chuyên sâu:
  - Mực in lụa: Plastisol, gốc nước, gốc dầu, cao su, silicone trên vải, dù, da simili.
  - Mực in Pad (Tampon): Mực 1 thành phần (1K), mực 2 thành phần (2K) bám dính siêu hạng trên nhựa ABS, PP, PE, kim loại, thủy tinh.
✅ Chuẩn mã Pantone 100%: Tích hợp trọn bộ thư viện Pantone quốc tế (Pantone C, Pantone U, FHI...) trên máy 3NH ST-700D Plus.
✅ Độ lệch màu ΔE < 0.5 (mắt thường không phân biệt được): Đảm bảo chuẩn xác tuyệt đối theo nhận diện thương hiệu của khách hàng khắt khe nhất.
✅ Lưu trữ công thức số hóa: Lưu recipe vĩnh viễn trên hệ thống, 100 lần pha sau màu vẫn đồng nhất như lần đầu.
💰 Chi phí tối ưu: Chỉ từ 350.000đ/100g (đã bao gồm quét quang phổ số hóa + công thức vi tính + mẫu in thử đối soát). Lô số lượng lớn chiết khấu sâu tận xưởng!

👉 Cần test màu mẫu? Cần 100g, 200g, 500g hay 10kg?
Chỉ cần gửi mã Pantone hoặc gửi mẫu vật liệu thực tế, việc còn lại cứ để VNPIS lo!

---
📞 Hotline/Zalo tư vấn: 0987.453.866
🌐 Chi tiết dịch vụ: https://vnpis.com/blog/dich-vu-pha-mau-muc-in-theo-yeu-cau-chuan-pantone-tu-100g
🏢 Địa chỉ xưởng VNPIS:
📍 Xưởng 1: Số 18, Đường Số 4, KDC Đại Phúc Green Villas, Xã Bình Hưng, Huyện Bình Chánh, TP.HCM
📍 Xưởng 2: 62 Trần Thị Nơi, Phường Chánh Hưng, TP.HCM

#VNPIS #PhaMauMucIn #InLua #InTampon #InPad #PantoneColor #3NHST700DPlus #PhaMucTu100g`;

  const link = 'https://vnpis.com/blog/dich-vu-pha-mau-muc-in-theo-yeu-cau-chuan-pantone-tu-100g';

  // 1. Post to VNPIS Solutions (Xưởng In Gia Công Toàn Diện - ID 1197966926731641)
  console.log('--- ĐĂNG BÀI LÊN FANPAGE VNPIS SOLUTIONS ---');
  const res1 = await publishPost('vnpis_solutions', message, link);

  // 2. Post to VNPIS May In & Muc In (ID 1043133472221893)
  console.log('--- ĐĂNG BÀI LÊN FANPAGE VNPIS MÁY IN & MỰC IN ---');
  const res2 = await publishPost('vnpis_machines', message, link);

  console.log('Hoàn tất:', { res1, res2 });
}

main();
