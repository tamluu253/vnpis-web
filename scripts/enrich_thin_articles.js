const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const DIRS = [
  path.join(__dirname, '../vnpis-web/content/articles'),
  path.join(__dirname, '../content/articles')
];

function getCategoryType(slug, title, cat) {
  const s = (slug + ' ' + title + ' ' + (cat || '')).toLowerCase();
  if (s.includes('ricoh') || s.includes('brother') || s.includes('dau-in') || s.includes('kyocera') || s.includes('epson') || s.includes('printhead')) {
    return 'PRINTHEAD';
  }
  if (s.includes('tij') || s.includes('hp45') || s.includes('12.7mm')) {
    return 'TIJ';
  }
  if (s.includes('cij') || s.includes('mek') || s.includes('dung moi') || s.includes('in date')) {
    return 'CIJ';
  }
  if (s.includes('lua') || s.includes('screen') || s.includes('squeegee') || s.includes('dao gat') || s.includes('khung nhom') || s.includes('mesh')) {
    return 'SCREEN';
  }
  if (s.includes('tampon') || s.includes('pad') || s.includes('cliche') || s.includes('silicon') || s.includes('coc muc')) {
    return 'PAD';
  }
  return 'GENERAL';
}

function generateTechnicalSections(type, title, slug) {
  const cleanTitle = title.replace(/\s*-\s*VNPIS.*$/i, '').replace(/\s*\|.*$/i, '').trim();

  if (type === 'PAD') {
    return `

## 1. Tiêu Chuẩn Kỹ Thuật & Cấu Hình Cơ Khí Chuẩn Nhà Máy VNPIS

Đối với giải pháp **${cleanTitle}**, hiệu suất vận hành và độ chính xác của từng nhịp in phụ thuộc mật thiết vào thông số cấu hình phần cứng:

| Thông Số Kỹ Thuật | Tiêu Chuẩn Vận Hành VNPIS | Ghi Chú Kỹ Thuật |
| :--- | :--- | :--- |
| **Hệ thống cấp mực** | Cốc mực kín (Sealed Cup) Ø90mm - Ø140mm | Tiết kiệm 45% dung môi, ngăn ngừa mùi hôi xưởng |
| **Vòng gạt mực (Doctor Ring)** | Hợp kim gốm Zirconia Ceramic 92 HRA | Lưỡi kép sắc bén, độ mòn siêu thấp (<2µm/100.000 lượt) |
| **Độ cứng đầu in Silicon** | Shore 38A - 55A (Tùy biến hình học phôi) | Kháng dầu solvent, lực hồi biến dạng tiệm cận 0% |
| **Bản khắc thép Cliché** | Thép SKD11 Nhật Bản nhiệt luyện 60-62 HRC | Khắc Laser Fiber độ sâu kiểm soát 22 - 28µm |
| **Hành trình trục Z (Stroke)** | 50mm - 125mm (Điều chỉnh vô cấp) | Áp suất khí nén cấp ổn định 5.0 - 6.5 Bar SMC Nhật |
| **Tốc độ chu kỳ in** | 1.200 - 2.100 sản phẩm/giờ | Điều khiển bàn đạp Foot-switch hoặc tự động Sensor |

## 2. Quy Trình Căn Chỉnh Đồ Gá (Jig) & Kiểm Soát Độ Bám Dính QA/QC

Để đảm bảo nét in không bị biến dạng, nhòe cạnh hoặc bong tróc khi đưa vào dây chuyền đóng gói thương mại, đội ngũ kỹ thuật VNPIS tuân thủ nghiêm ngặt quy trình 4 bước:

1. **Xử lý hoạt hóa bề mặt phôi in (Pre-treatment):**
   * Đối với phôi nhựa khó bám như PP, PE, HDPE: Bắt buộc áp dụng ngọn lửa Plasma hoặc xử lý Corona đạt mức năng lượng bề mặt **≥ 42 Dynes/cm**.
   * Đối với phôi thủy tinh, kim loại sơn tĩnh điện: Lau sạch lớp dầu chống rỉ bằng cồn Isopropyl Alcohol (IPA) và bổ sung chất tăng bám (Primer/Silane Promoter) theo tỷ lệ 1-3%.
2. **Pha chế mực in 2 thành phần chuẩn tỷ lệ:**
   * Mực in chuyên dụng (Afford/Henkey/Ruco) + Chất đóng rắn Hardener tỷ lệ **10:1** (theo khối lượng).
   * Dung môi điều chỉnh độ nhớt (Thinner/Retarder) pha từ **10% - 15%** để đạt độ nhớt in chuẩn từ **120 - 180 cP**.
3. **Cân chỉnh góc nghiêng và lực ép hành trình Z:**
   * Đồ gá CNC được gá định vị vững chắc, dung sai không vượt quá **±0.05mm**. Đầu silicone tiếp xúc phôi theo góc thoát khí (chuyển động lăn nhẵn) để loại trừ bọt khí chân không.
4. **Quy chuẩn kiểm tra độ bám dính thành phẩm (Adhesion Test):**
   * **Test băng dính 3M 600/810:** Dán chặt băng keo lên vị trí in, miết mạnh và giật dứt khoát ở góc 90°. Nét in không được bong tróc (Grade 5B chuẩn ASTM D3359).
   * **Test cọ sát hóa chất:** Chà xát bông gòn tẩm cồn y tế 90° hoặc xăng thơm 50 chu kỳ với lực ép 1kg, bề mặt chữ in không bị nhòe mờ.

## 3. Khắc Phục 5 Sự Cố Vận Hành Thực Tế Thường Gặp Tại Xưởng

* **Hiện tượng xuất hiện chấm bọt khí (Pinholes):** Thường do đầu silicone bị khô dầu, mực pha quá đặc hoặc lực ép quá mạnh ép bẹp góc thoát khí. *Cách xử lý:* Thêm 3% dung môi chậm khô Retarder, lau sạch đầu pad bằng dung môi rửa nhẹ, giảm áp suất ép Z xuống 0.5 Bar.
* **Nét in bị răng cưa / Gai mực (Spider Webbing):** Xảy ra khi dung môi bay hơi quá nhanh do nhiệt độ phòng vượt 32°C. *Cách xử lý:* Chuyển sang dung môi sấy chậm chuyên dụng, kiểm tra độ kín của vòng ceramic cốc mực.
* **Mực in bị lột ngược lại đầu pad:** Do bề mặt phôi in chưa đạt độ căng bề mặt yêu cầu, hoặc thời gian chờ chuyển mực quá ngắn. *Cách xử lý:* Tăng ngọn lửa xử lý nhiệt bề mặt phôi và kéo dài thời gian nhấc trục Z thêm 0.2 giây.
* **Mờ chữ sau khi xuất xưởng:** Do thiếu chất đóng rắn hardener hoặc sấy chưa đủ thời gian phản ứng polyme hóa. *Cách xử lý:* Sấy nhiệt cưỡng bức 60°C - 80°C trong 15 - 30 phút hoặc để lưu kho tối thiểu 24 giờ trước khi test cọ xát.
* **Cốc mực bị rỉ mực ra bản thép:** Vòng gốm ceramic bị mẻ góc hoặc ốc siết lực ép cốc mực không đều. *Cách xử lý:* Xoay mặt vòng gốm hoặc thay mới vòng Zirconia Ring chính hãng VNPIS.

## 4. Hệ Thống Liên Kết Giải Pháp & Thiết Bị Liên Quan Tại VNPIS

* 🔗 Tham khảo giải pháp toàn diện: [Dịch vụ và máy in tampon công nghiệp VNPIS](https://vnpis.com/in-tampon)
* 🔗 Khám phá danh mục: [Vật tư ngành in tampon: Đầu silicon, bản thép, cốc mực](https://vnpis.com/products/consumables)
* 🔗 Báo giá gia công trọn gói: [Dịch vụ in gia công tampon & in lụa chuẩn xác tại TP.HCM](https://vnpis.com/dich-vu-in-gia-cong)
* 🔗 Tìm hiểu thêm thiết bị tự động: [Máy in Pad 1 đến 4 màu chính hãng bảo hành 24 tháng](https://vnpis.com/products/pad-printers)

## 5. Câu Hỏi Thường Gặp (FAQ) Kỹ Thuật

**Q1: Chi phí làm một bộ bản thép Cliché và đầu silicone in tampon khoảng bao nhiêu?**  
*Trả lời:* Tại VNPIS, bản thép khắc laser Fiber SKD11 có giá dao động từ 350.000đ - 650.000đ tùy kích thước (100x100mm đến 100x250mm). Đầu in silicone đúc khuôn công nghiệp giá từ 150.000đ - 380.000đ với tuổi thọ đạt từ 50.000 đến 100.000 nhịp in.

**Q2: Làm sao để in logo bền màu trên các chất liệu nhựa khó bám như PP hoặc nắp chai?**  
*Trả lời:* Cần áp dụng quy trình "bộ ba": Xử lý ngọn lửa khò/Plasma tăng Dynes bề mặt + Sử dụng mực in chuyên dụng gốc dung môi 2 thành phần có pha chất xúc tác đóng rắn Hardener + Sấy khô đúng kỹ thuật.

**Q3: VNPIS có hỗ trợ in mẫu thử nghiệm (Sample Proofing) trước khi ký hợp đồng không?**  
*Trả lời:* Có. VNPIS hỗ trợ căn chỉnh đồ gá và test mẫu in thực tế trực tiếp trên phôi của khách hàng tại xưởng kỹ thuật, kiểm tra đạt chuẩn độ bền 3M trước khi tiến hành nghiệm thu thiết bị hoặc sản xuất hàng loạt.
`;
  }

  if (type === 'SCREEN') {
    return `

## 1. Thông Số Tiêu Chuẩn Cơ Khí & Vật Tư Dây Chuyền In Lụa VNPIS

Đối với ứng dụng **${cleanTitle}**, chất lượng của từng lớp mực được bảo chứng bằng sự kết hợp chuẩn xác giữa cơ cấu máy và vật tư phụ trợ:

| Chỉ Tiêu Kỹ Thuật | Tiêu Chuẩn Khuyến Nghị VNPIS | Tác Động Vận Hành |
| :--- | :--- | :--- |
| **Mật độ sợi lưới (Mesh Count)** | 80T - 165T (Sợi Monofilament Thụy Sĩ) | Kiểm soát chính xác lượng thoát mực (Ink Deposit µm) |
| **Độ căng lưới (Tension)** | 18 - 25 N/cm (Đo bằng đồng hồ Newton chính xác) | Tránh hiện tượng xê dịch nét, chồng màu lệch tâm |
| **Lưỡi dao gạt mực (Squeegee)** | Polyurethane (PU) Pháp/Đức độ cứng 65 - 85 Shore A | Kháng trương nở dung môi dầu, cạnh vát lưỡi bén |
| **Góc nghiêng dao gạt** | 65° - 75° so với mặt phẳng bản in | Tối ưu lực ép truyền mực xuyên qua mắt lưới |
| **Khoảng cách nhấc hở (Off-contact)** | 1.5mm - 3.5mm tùy kích thước phôi | Giúp bản lưới nhấc tách tức thì khỏi bề mặt in, chống nhòe |
| **Áp suất bàn hút chân không** | -0.06 đến -0.08 MPa | Cố định chặt phôi tấm phẳng, decal, kính, bao bì giấy |

## 2. Quy Trình Chụp Bản & Căn Chỉnh Canh Nét Chuẩn Công Nghiệp

1. **Chuẩn bị và căng khung lụa:** Sử dụng khung nhôm định hình chống vặn xoắn. Căng lưới bằng máy kéo khí nén đa điểm, dán keo 2 thành phần chuyên dụng chịu hóa chất tẩy rửa.
2. **Quét keo cảm quang (Emulsion Coating):** Quét đều 2 mặt bằng máng vét chuyên dụng, sấy khô trong phòng tối ở nhiệt độ 38°C - 40°C.
3. **Phơi bản bằng nguồn sáng UV:** Chiếu sáng tia cực tím bước sóng 365nm với thời gian phơi chuẩn theo thước đo Stouffer 21 bước để đạt độ sắc nét góc cạnh tuyệt đối.
4. **Căn chỉnh độ hở Off-contact & Tốc độ gạt mực:**
   * Điều chỉnh song song tuyệt đối giữa lưỡi gạt và mặt bàn in phẳng hoặc trục lăn xoay tròn.
   * Lực gạt mực phân bổ đều 2 đầu xilanh khí nén, triệt tiêu hiện tượng dồn mực làm đậm nhạt không đồng đều.

## 3. Khắc Phục Sự Cố Kỹ Thuật Thường Gặp Trong In Lụa

* **Lỗi bít mắt lưới (Screen Clogging):** Do mực in khô quá nhanh trên khung lụa khi nhiệt độ xưởng cao. *Khắc phục:* Bổ sung 5-10% dung môi chậm khô chuyên dụng, dùng giẻ mềm tẩm chất tẩy nhẹ lau thông mắt lưới.
* **Lỗi lem chân chữ (Bleeding):** Dao gạt mực bị mòn cùn mép, góc gạt quá nghiêng hoặc khoảng cách off-contact quá thấp làm lưới dính sát phôi. *Khắc phục:* Mài lại lưỡi dao gạt PU bằng máy mài chuyên dụng, tăng khoảng cách nâng hở khung.
* **Lỗi nổi bọt bong bóng (Bubbles / Voids):** Tốc độ quét dao quá nhanh hoặc mực bị đánh nổi bọt khí khi pha trộn. *Khắc phục:* Để mực nghỉ 15 phút sau khi pha dung môi và giảm tốc độ kéo dao gạt.
* **Màu in không đồng đều giữa các mẻ:** Áp lực ép của công nhân không đều tay (đối với in thủ công). *Khắc phục:* Nâng cấp lên dây chuyền máy in lụa bán tự động VNPIS với xilanh khí nén kiểm soát lực chuẩn xác 100%.

## 4. Liên Kết Giải Pháp & Thiết Bị Cốt Lõi Tại VNPIS

* 🔗 Tìm hiểu giải pháp: [Máy in lụa phẳng và máy in lụa xoay tròn tự động VNPIS](https://vnpis.com/in-lua)
* 🔗 Danh mục thiết bị: [Máy in lụa công nghiệp chính hãng cho bao bì & chai lọ](https://vnpis.com/products/screen-printers)
* 🔗 Vật tư ngành in: [Lưới in lụa Thụy Sĩ, dao gạt PU và khung nhôm căng lưới](https://vnpis.com/products/consumables)
* 🔗 Tư vấn chuyển đổi: [Bài toán đầu tư máy in lụa tự động thay thế in thủ công](https://vnpis.com/blog/bai-toan-kinh-te-tu-dau-tu-may-in-hay-thue-gia-cong)

## 5. Câu Hỏi Thường Gặp (FAQ) Kỹ Thuật

**Q1: In lụa trên chai lọ tròn hoặc ly thủy tinh cần lưu ý gì để nét in không bị méo?**  
*Trả lời:* Cần sử dụng máy in lụa trụ tròn có cơ cấu con lăn đỡ phôi đồng bộ với chuyển động tịnh tiến của khung lưới. Đồ gá phải có vòng bi chống rung lắc và kiểm tra độ tròn đều của chai lọ trước khi in hàng loạt.

**Q2: Làm sao để mực in lụa bám tốt trên vải không bay màu khi giặt công nghiệp?**  
*Trả lời:* Cần sử dụng dòng mực chuyên dụng gốc dầu hoặc mực Plastisol/Silicone kết hợp phụ gia tăng bám, sau đó bắt buộc sấy nhiệt qua băng chuyền UV hoặc buồng sấy hồng ngoại ở nhiệt độ 130°C - 160°C trong 2 - 3 phút.
`;
  }

  if (type === 'CIJ' || type === 'TIJ') {
    return `

## 1. Tiêu Chuẩn Kỹ Thuật Hộp Mực & Dung Môi Công Nghiệp VNPIS

Đối với giải pháp **${cleanTitle}**, chất lượng tia mực và độ bền ký mã hiệu phụ thuộc vào tiêu chuẩn hóa chất và áp suất phun:

| Tiêu Chuẩn Kỹ Thuật | Giá Trị Đo Lường | Ứng Dụng Thực Tiễn |
| :--- | :--- | :--- |
| **Thời gian khô bề mặt (Dry Time)** | 0.8 - 2.5 giây ở nhiệt độ 25°C | Đáp ứng tốc độ băng chuyền lên tới 180 - 300 mét/phút |
| **Gốc dung môi hóa chất** | MEK (Methyl Ethyl Ketone) / Ethanol / Acetone | Kháng cồn, kháng dầu mỡ, chịu nhiệt cấp đông -25°C |
| **Kích thước hạt mực (Drop Size)** | 40 - 60 micron (Hạt mực siêu mịn) | Nét in ma trận Dot Matrix hoặc mã QR Code 2D siêu nét |
| **Độ nhớt chuẩn (Viscosity)** | 3.2 - 4.8 cP (Tại 20°C kiểm soát tự động) | Ngăn ngừa đóng cặn, nghẹt béc phun khi ngừng ca máy |
| **Chuẩn an toàn xuất khẩu** | Đạt RoHS 2.0, REACH, Halogen-Free | An toàn cho linh kiện vi mạch điện tử và bao bì thực phẩm |

## 2. Quy Trình Bảo Trì Ca Máy & Kiểm Soát Nét Mã Hóa Date/Barcode

1. **Khởi động và xả súc béc phun (Auto-Flush):** Kích hoạt chu trình vệ sinh béc phun bằng dung môi tinh khiết trước khi bật áp suất nén tia mực, loại bỏ tinh thể mực bám khô ở miệng nozzle.
2. **Kiểm tra độ hội tụ của tia mực (Ink Stream Alignment):** Quan sát qua kính lúp béc phun, tia mực phải bắn thẳng chính xác vào tâm lỗ máng thu hồi (Gutter). Nếu lệch tâm, máy sẽ báo lỗi áp suất và ngắt tia mực tự động.
3. **Cài đặt thông số quang điện (Sensor & Encoder):** Đồng bộ cảm biến phát hiện sản phẩm và bánh xe mã hóa vòng quay Encoder để khoảng cách ký tự không bị giãn nở khi băng chuyền tăng giảm tốc độ.
4. **Kiểm định chất lượng mã Barcode / QR Code:** Sử dụng máy quét công nghiệp chuẩn 2D để đo độ tương phản (Symbol Contrast) và độ điều biến (Modulation) đạt chuẩn ISO/IEC 15415 Grade A.

## 3. Khắc Phục Sự Cố Phổ Biến Của Máy In Date CIJ / TIJ

* **Lỗi lệch tia mực (Stream Misalignment):** Do cặn bẩn bám ở miệng kim béc phun làm tia mực bị chệch không vào máng thu hồi. *Xử lý:* Dùng dung môi súc rửa chuyên dụng xịt nhẹ vào đầu súng phun, không dùng kim loại chọc vào lỗ béc để tránh xước đầu kim.
* **Nét in bị nhòe mực hoặc mất nét:** Tốc độ bay hơi dung môi quá chậm khi gặp bề mặt màng trơn bóng ẩm ướt. *Xử lý:* Thay đổi dòng mực nhanh khô gốc MEK chuyên biệt cho dây chuyền ẩm ướt lạnh hoặc tăng khoảng cách sấy khí nóng.
* **Mã QR in ra không quét được bằng điện thoại:** Khoảng cách từ đầu phun tới sản phẩm quá xa (vượt quá 5mm đối với TIJ) khiến hạt mực bị tán xạ. *Xử lý:* Hạ thấp đầu phun cách bề mặt bao bì từ 1.5mm - 3mm.
* **Báo lỗi độ nhớt mực cao (High Viscosity Warning):** Do dung môi bổ sung bị thiếu hoặc hệ thống đo độ nhớt bằng bi rơi bị kẹt cặn. *Xử lý:* Châm thêm dung môi Make-up chính hãng và chạy chu trình kiểm tra áp suất bơm mực.

## 4. Liên Kết Giải Pháp Kỹ Mã Hiệu Toàn Diện Tại VNPIS

* 🔗 Giải pháp cung cấp: [Mực in phun công nghiệp CIJ & TIJ chính hãng](https://vnpis.com/muc-in-cij)
* 🔗 Tìm hiểu công nghệ: [Giải pháp in mã vạch QR Code và dữ liệu biến đổi tốc độ cao](https://vnpis.com/in-ky-thuat-so)
* 🔗 Thiết bị liên quan: [Đầu in phun và phụ tùng thay thế cho máy in công nghiệp](https://vnpis.com/products/printheads)
* 🔗 So sánh chi phí: [Toàn tập phân tích hộp mực TIJ 12.7mm HP45 cho nhà máy](https://vnpis.com/blog/toan-tap-muc-in-tij-12-7mm-hp45-in-date-va-qr-code)

## 5. Câu Hỏi Thường Gặp (FAQ) Kỹ Thuật

**Q1: Có thể sử dụng dung môi trôi nổi giá rẻ cho máy in phun CIJ được không?**  
*Trả lời:* Tuyệt đối không nên. Dung môi trôi nổi chứa tạp chất và hàm lượng nước cao sẽ phá hủy buồng sấy áp suất, làm rỉ sét van điện từ và tắc nghẹt béc phun micro. Chi phí thay thế một cụm đầu phun đắt gấp 20 lần tiền tiết kiệm dung môi.

**Q2: Hộp mực in Date nhiệt TIJ HP45 in được bao nhiêu ký tự?**  
*Trả lời:* Một hộp mực TIJ dung tích 42ml có thể in được từ 800.000 đến 1.500.000 bản in Date 2 dòng (khoảng 20 ký tự kích thước 2.5mm), mang lại chi phí cực kỳ tiết kiệm chỉ khoảng vài đồng cho mỗi sản phẩm.
`;
  }

  if (type === 'PRINTHEAD') {
    return `

## 1. Bảng Thông Số Điện Áp & Tần Số Xung Chuẩn Nhà Máy VNPIS

Đối với các hệ thống đầu phun công nghiệp như **${cleanTitle}**, độ bền và độ phân giải hình ảnh gắn liền với việc hiệu chuẩn Waveform điện áp:

| Thông Số Vận Hành | Tiêu Chuẩn Kỹ Thuật Nhà Máy | Yêu Cầu Bảo Quản |
| :--- | :--- | :--- |
| **Công nghệ truyền động** | Piezoelectric Drop-on-Demand (Gốm áp điện) | Điện áp xung điều khiển từ 14V - 28V (Waveform chuẩn) |
| **Thể tích giọt mực (Drop Volume)** | 3.5pl - 14pl (Công nghệ biến đổi hạt Greyscale) | Cho độ mịn hình ảnh lên tới 600 - 1.200 DPI thực |
| **Tần số đánh xung (Firing Frequency)** | 20 kHz - 50 kHz | Tương thích tốc độ in Single Pass từ 50 - 150 mét/phút |
| **Nhiệt độ hoạt động tối ưu** | 38°C - 45°C (Tích hợp bộ gia nhiệt Heater) | Ổn định độ nhớt mực UV / Mực dầu trong khoảng 8 - 12 cP |
| **Áp suất âm đường mực (Meniscus Vacuum)** | -1.5 đến -2.8 kPa | Ngăn mực nhỏ giọt rỉ béc và ngăn bọt khí lọt vào đầu phun |

## 2. Quy Trình Phục Hồi, Thông Tắc Béc Phun Bằng Sóng Siêu Âm Chuyên Dụng

1. **Kiểm tra đồ thị Nozzle Check:** In mẫu test lưới béc phun trên phôi phẳng để xác định vị trí các béc bị nghẹt mực hoặc lệch tia.
2. **Ngâm dung dịch tẩy rửa sinh học chuyên sâu (Flushing Solution):** Đặt đầu phun tiếp xúc với khăn vi sợi thấm đẫm dung dịch tẩy rửa trung tính trong 30 - 60 phút để làm mềm cặn mực UV khô cứng.
3. **Thông béc áp suất ngược tuần hoàn (Reverse Purging):** Kết nối đầu phun với máy súc rửa tuần hoàn áp suất vi điều khiển, hút ngược cặn bẩn ra khỏi màng lọc trong đầu phun với áp suất an toàn không quá 0.03 MPa.
4. **Hiệu chỉnh điện áp xung béc phun:** Đo kiểm trở kháng từng hàng gốm áp điện và cân chỉnh lại điện áp Driving Voltage để lực đẩy giọt mực đồng đều 100%.

## 3. Khắc Phục Sự Cố Phổ Biến Trên Đầu Phun Công Nghiệp

* **Hiện tượng bắn sương mực (Misting / Overspray):** Do điện áp xung quá cao làm giọt mực vỡ hạt hoặc khoảng cách từ đầu phun tới vật liệu quá xa. *Khắc phục:* Giảm điện áp Drive Voltage 0.5V, vệ sinh điện cực gạt tĩnh điện và hạ khoảng cách in xuống 1.5mm - 2mm.
* **Mất béc phun đột ngột khi in tốc độ cao:** Thường do áp suất âm bình mực phụ (Sub-tank) bị mất cân bằng làm mực cấp không kịp hoặc lọt bọt khí vào khoang áp điện. *Khắc phục:* Xả bọt khí tại van lọc đầu phun và kiểm tra cảm biến áp suất âm.
* **Trầy xước bề mặt màng béc (Plate Scratch):** Do va quẹt cơ học với phôi in cong vênh hoặc gạt mực bằng vật liệu thô cứng. *Khắc phục:* Lắp đặt cảm biến chống va đập tự động ngắt hành trình trục Z và chỉ sử dụng lưỡi gạt silicone mềm chuyên dụng.

## 4. Liên Hệ & Hỗ Trợ Kỹ Thuật Đầu Phun Chuyên Nghiệp

* 🔗 Tham khảo dịch vụ: [Khám chữa bệnh & phục hồi đầu phun công nghiệp VNPIS](https://vnpis.com/bao-tri-sua-chua-may-in)
* 🔗 Xem bảng giá: [Đầu phun Brother GTX, Ricoh Gen5/Gen6, Kyocera chính hãng](https://vnpis.com/products/printheads)
* 🔗 Tư vấn kỹ thuật: [Hướng dẫn bảo dưỡng phục hồi đầu in Brother GTX tại xưởng](https://vnpis.com/blog/huong-dan-bao-duong-phuc-hoi-dau-in-brother-gtx-gtxpro)
* 🔗 Hotline hỗ trợ kỹ thuật khẩn cấp 24/7: **Mr. Tâm: 0987 453 866**
`;
  }

  // GENERAL
  return `

## 1. Tiêu Chuẩn Kỹ Thuật & Đảm Bảo Chất Lượng Công Nghiệp VNPIS

Để giải pháp **${cleanTitle}** đạt hiệu năng cao nhất trong dây chuyền sản xuất thực tế, các chỉ tiêu kỹ thuật cần được định lượng chuẩn xác:

| Hạng Mục Đánh Giá | Quy Chuẩn Kỹ Thuật | Phương Pháp Đo Kiểm |
| :--- | :--- | :--- |
| **Độ bám dính bề mặt** | Đạt cấp độ 5B (ASTM D3359) | Thử nghiệm cắt ô vuông và kéo băng dính 3M |
| **Khả năng kháng hóa chất** | Chịu cồn y tế 90° và dung môi MEK | Thử cọ xát cơ học 50 - 100 lượt có tải trọng |
| **Dung sai định vị in** | Sai số cơ khí < ±0.05 mm | Đồ gá phay CNC và căn chỉnh quang học laser |
| **Khả năng chịu nhiệt độ** | Bền bỉ từ -20°C đến 120°C | Thử nghiệm sốc nhiệt trong buồng kiểm tra khí hậu |

## 2. Quy Trình Vận Hành Tiêu Chuẩn & Kiểm Soát Rủi Ro Tại Xưởng

1. **Khảo sát tính chất vật liệu phôi in:** Xác định rõ chủng loại nhựa (PP, PE, ABS, PC, PET), kim loại hay thủy tinh để chọn lựa gốc mực và phụ gia liên kết phù hợp.
2. **Hiệu chỉnh đồ gá định vị:** Thiết kế đồ gá ôm khít biên dạng phôi in, có đệm đàn hồi chống trầy xước sản phẩm xuất khẩu.
3. **Kiểm tra độ khô và độ bám dính trước khi đóng gói:** Tiến hành kiểm định ngẫu nhiên 5 sản phẩm trên mỗi lô 1.000 sản phẩm theo tiêu chuẩn AQL 1.5.

## 3. Hệ Thống Dịch Vụ & Thiết Bị Đồng Bộ Tại VNPIS

* 🔗 [Giải pháp máy in tampon và in lụa công nghiệp VNPIS](https://vnpis.com/in-tampon)
* 🔗 [Dịch vụ gia công in ấn phôi nhựa và bao bì chất lượng cao](https://vnpis.com/dich-vu-in-gia-cong)
* 🔗 [Vật tư phụ trợ ngành in: Mực, dung môi, cao su silicon, dao gạt](https://vnpis.com/products/consumables)
`;
}

function enrichDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md') && !f.startsWith('week_'));
  console.log(`\n📂 Scanning for thin articles in: ${dir} (${files.length} files)`);

  let enrichedCount = 0;

  for (const f of files) {
    const filePath = path.join(dir, f);
    const raw = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data || {};
    let content = parsed.content || '';
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    const slug = f.replace(/\.md$/, '');

    // If content is thin (< 600 words) and not already enriched with sections
    if (words < 600 && !content.includes('## 1. Tiêu Chuẩn Kỹ Thuật') && !content.includes('## 1. Thông Số Tiêu Chuẩn')) {
      const type = getCategoryType(slug, data.title || '', data.category || '');
      const addition = generateTechnicalSections(type, data.title || slug, slug);

      // Insert addition before contact info footer if present
      if (content.includes('## 📌 CÔNG TY TNHH VNPIS')) {
        content = content.replace('## 📌 CÔNG TY TNHH VNPIS', addition + '\n\n## 📌 CÔNG TY TNHH VNPIS');
      } else {
        content = content + '\n\n' + addition;
      }

      // Ensure proper meta description
      if (!data.description || data.description.length < 90) {
        data.description = `${data.title}. Cung cấp thông số kỹ thuật, quy trình vận hành và giải pháp tối ưu chi phí từ VNPIS. Hotline: 0987.453.866.`;
      }

      const newRaw = matter.stringify(content, data);
      fs.writeFileSync(filePath, newRaw, 'utf8');
      enrichedCount++;
    }
  }

  console.log(`✅ Successfully enriched ${enrichedCount} thin articles in ${dir}!`);
}

DIRS.forEach(enrichDirectory);
console.log('\n🎉 ALL THIN ARTICLES ENRICHED TO MASTER TECHNICAL GUIDES!');
