const fs = require('fs');
const path = require('path');

const BOLIJIE_ROOT = 'D:\\VNPIS\\###Suppliers\\2. Bolijie (Hong Kong)';
const TARGET_DIR = path.resolve(__dirname, '../../vnpis-web/public/images/bolijie');
const TEST_DEST = path.join(TARGET_DIR, 'tests');
const BOTTLE_DEST = path.join(TARGET_DIR, 'bottles');
const CATALOG_PATH = path.join(TARGET_DIR, 'bolijie_catalog.json');

[TEST_DEST, BOTTLE_DEST].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Semantic mapping for test folders
const FOLDER_MAP = {
  '1. 越南河内陶瓷测试': {
    tag: 'ceramic_hanoi',
    category: 'CIJ_SPECIAL_CERAMIC',
    caption: 'Kiểm tra thực tế độ bám dính của mực in phun CIJ trên bề mặt gốm sứ tráng men tại Hà Nội',
    alt: 'Mẫu test in phun mực CIJ chuyên dụng trên gốm sứ tráng men chống bong tróc'
  },
  '2. 越南胡志明编织袋铝瓶塑料瓶测试': {
    tag: 'packaging_aluminum_plastic_hcm',
    category: 'CIJ_PACKAGING',
    caption: 'Thử nghiệm độ bám dính mực in date CIJ trên bao dệt PP, chai nhôm và chai nhựa tại TP.HCM',
    alt: 'Test thực tế mực in date CIJ trên bề mặt bao dệt PP và chai nhôm công nghiệp'
  },
  '2025.8.20,黑色棉麻吸附性很好黑色底材打印的效果': {
    tag: 'textile_cotton_black',
    category: 'INK_TEXTILE',
    caption: 'Mẫu in thử nghiệm mực in bám dính cao trên nền sợi vải cotton và vải dệt tối màu',
    alt: 'Độ sắc nét và khả năng ngấm bám của mực in trên chất liệu vải cotton đay đen'
  },
  '25-5.29,T75蓝色高温墨水': {
    tag: 't75_blue_high_temp',
    category: 'CIJ_HIGH_TEMP',
    caption: 'Mực in phun CIJ xanh dương T75 chịu nhiệt độ cao chuyên dụng cho ngành đúc kim loại và nhiệt luyện',
    alt: 'Mực in CIJ xanh dương T75 chịu nhiệt độ cao không phai màu'
  },
  '25.11.8-防伪黑墨': {
    tag: 'security_anti_counterfeit_black',
    category: 'CIJ_SECURITY',
    caption: 'Mực in date bảo mật chống hàng giả, tích hợp hoạt chất chống sao chép quang học',
    alt: 'Thử nghiệm mực in date CIJ bảo mật chống làm giả trên bao bì cao cấp'
  },
  '25.8.16-TWAV高温硫化后耐碱水，酸水测试': {
    tag: 'twav_vulcanization_acid_alkali',
    category: 'CIJ_TIRE_RUBBER',
    caption: 'Mực trắng TWAV in lốp xe và cao su chịu nhiệt độ lưu hóa 200°C, kháng dung dịch axit và kiềm mạnh',
    alt: 'Mực in lốp xe cao su TWAV chịu nhiệt lưu hóa và kháng hóa chất axit kiềm'
  },
  '25.9.12-TW1灰色颜料墨水': {
    tag: 'tw1_grey_pigment',
    category: 'CIJ_CABLE_PIGMENT',
    caption: 'Mực pigment màu xám TW1 chuyên dụng in vạch mã định danh trên dây cáp điện và ống dẫn kỹ thuật',
    alt: 'Mực pigment CIJ màu xám TW1 in dây cáp điện tương phản cao'
  },
  '26.1.15-K1': {
    tag: 'k1_general_industry',
    category: 'CIJ_GENERAL',
    caption: 'Mực in phun CIJ công nghiệp đa năng K1 tương thích các dòng máy Videojet, Linx, Domino',
    alt: 'Hệ mực in date CIJ K1 nhanh khô bám dính tốt trên nhựa và kim loại'
  },
  '26.1.17-橙色PVC线缆颜料墨水': {
    tag: 'orange_pvc_cable',
    category: 'CIJ_CABLE_PIGMENT',
    caption: 'Mực in màu cam chuyên dụng cho dây cáp điện PVC, chống phai màu và chống trầy xước cơ học',
    alt: 'Mực in phun date màu cam trên vỏ dây cáp điện PVC chống lem trôi'
  },
  '26.1.22-T113C': {
    tag: 't113c_alcohol_resistant',
    category: 'CIJ_ALCOHOL_RESISTANT',
    caption: 'Mực in date T113C kháng cồn nồng độ cao (Ethanol / Isopropanol), dùng trong y tế và dược phẩm',
    alt: 'Mực in phun CIJ T113C kháng cồn 90 độ và dung dịch sát khuẩn y tế'
  },
  '26.1.31-TWHG白墨玻璃瓶': {
    tag: 'twhg_white_glass_bottle',
    category: 'CIJ_GLASS_BOTTLE',
    caption: 'Mực trắng TWHG in date trên chai lọ thủy tinh ướt lạnh, chống ngưng tụ hơi nước và ma sát',
    alt: 'Mực in date màu trắng TWHG bám dính siêu cường trên vỏ chai thủy tinh đồ uống'
  },
  '26.3.31-T77高温水煮后可擦除不留痕迹': {
    tag: 't77_removable_retort',
    category: 'CIJ_REMOVABLE_RETORT',
    caption: 'Mực in T77 chịu hấp nhiệt tiệt trùng trong sản xuất thực phẩm, có thể tẩy rửa sạch sau thanh trùng',
    alt: 'Mực in hấp nhiệt tiệt trùng T77 dễ tẩy rửa cho vỏ bình và chai thu hồi'
  },
  '6.14素材图片': {
    tag: 'date_coding_samples',
    category: 'CIJ_GENERAL',
    caption: 'Thành phẩm in date code và mã vạch QR code thực tế bằng công nghệ in phun công nghiệp',
    alt: 'Mẫu in date hạn sử dụng và mã số lô trên bao bì thành phẩm công nghiệp'
  },
  '6.3绿色隐形墨水': {
    tag: 'invisible_green_uv_security',
    category: 'CIJ_SECURITY',
    caption: 'Mực in tàng hình phát quang ánh sáng xanh lá dưới đèn cực tím UV (365nm) chống hàng giả',
    alt: 'Mực in date tàng hình bảo mật phát huỳnh quang xanh lục dưới đèn tia cực tím'
  },
  'K12抗高温蒸煮不迁移': {
    tag: 'k12_retort_sterilization_non_migrating',
    category: 'CIJ_RETORT_121C',
    caption: 'Mực in date K12 chịu nhiệt độ hấp tiệt trùng 121°C trong 60 phút, tuyệt đối không di chuyển hay lem màng bao bì',
    alt: 'Mực in CIJ K12 chịu nhiệt hấp tiệt trùng autoclave 121 độ C không phai'
  },
  'P8灰色墨水线缆测试': {
    tag: 'p8_grey_cable',
    category: 'CIJ_CABLE_PIGMENT',
    caption: 'Mực xám P8 in tốc độ cao trên dây cáp mạng viễn thông và cáp điện lực',
    alt: 'Thử nghiệm mực in date P8 in nét chữ rõ ràng trên dây cáp viễn thông'
  },
  'TIJ墨盒测试': {
    tag: 'tij_cartridge_online',
    category: 'TIJ_CARTRIDGE',
    caption: 'Hộp mực in date nhiệt TIJ 12.7mm công nghệ HP45 nhanh khô 1 giây trên mọi chất liệu màng tráng bóng',
    alt: 'Hộp mực in date nhiệt TIJ 12.7mm nhanh khô trên bao bì nhôm và nhựa'
  },
  'TY5黄墨测试': {
    tag: 'ty5_yellow_dark_substrates',
    category: 'CIJ_PIGMENT_YELLOW',
    caption: 'Mực vàng pigment TY5 có độ che phủ tuyệt đối trên các vật liệu tối màu (ống PE đen, cao su, kim loại)',
    alt: 'Mực vàng công nghiệp TY5 in nổi bật trên nền ống nhựa PE đen'
  },
  '塑料袋100度高温水煮90分钟测试': {
    tag: 'plastic_bag_boiling_100c_90min',
    category: 'CIJ_RETORT_121C',
    caption: 'Kiểm nghiệm độ bền mực in trên túi nhựa chịu luộc trong nước sôi 100°C liên tục suốt 90 phút',
    alt: 'Mực in date chịu luộc sôi 100 độ C trong 90 phút trên màng nhựa thực phẩm'
  },
  '大字符白墨': {
    tag: 'dod_large_character_white',
    category: 'DOD_LARGE_CHARACTER',
    caption: 'Mực in phun cỡ lớn DOD màu trắng in logo, thông số quy cách lên thùng carton, bao xi măng và ống cống',
    alt: 'Mực in phun hạt lớn DOD màu trắng in sắc nét trên bao bì công nghiệp cỡ lớn'
  },
  '实验室': {
    tag: 'lab_testing_facility',
    category: 'WORKSHOP_GENERAL',
    caption: 'Phòng Lab kiểm định hóa lý, độ nhớt và quang phổ mực in công nghiệp Bolijie & VNPIS',
    alt: 'Hệ thống thiết bị đo kiểm và phân tích mực in công nghiệp tại phòng Lab'
  },
  '工厂出货照片': {
    tag: 'factory_packaging_shipping',
    category: 'WORKSHOP_GENERAL',
    caption: 'Quy trình đóng gói pallet xuất xưởng các lô mực và dung môi công nghiệp đạt chuẩn RoHS / REACH',
    alt: 'Lô hàng mực in và dung môi công nghiệp đóng thùng sẵn sàng phân phối'
  },
  '无卤素、耐酒精擦拭、耐 200到 300℃': {
    tag: 'halogen_free_alcohol_heat_200_300c',
    category: 'CIJ_HALOGEN_FREE_HEAT',
    caption: 'Mực in vi mạch điện tử không halogen (Halogen-Free), chịu nhiệt độ sấy 200°C - 300°C và kháng cồn tuyệt đối',
    alt: 'Mực in mạch điện tử PCB không halogen chịu nhiệt độ hàn dán linh kiện 300 độ C'
  },
  '灰色墨水白色线缆打印效果': {
    tag: 'grey_ink_white_cable',
    category: 'CIJ_CABLE_PIGMENT',
    caption: 'Mực xám tương phản cao in trên vỏ dây cáp điện trắng, không bị nhòe nét khi cuộn cuốn tốc độ cao',
    alt: 'Mực in date màu xám in trên bề mặt vỏ nhựa dây điện trắng'
  },
  '玻璃瓶黄墨测试': {
    tag: 'yellow_ink_glass_bottle',
    category: 'CIJ_GLASS_BOTTLE',
    caption: 'Mực vàng pigment in date trên thân chai bia và nước ngọt thủy tinh tối màu chống trầy xước',
    alt: 'Mực vàng in date trên chai thủy tinh màu xanh lá và nâu hổ phách'
  }
};

function copyTestPhotos() {
  const srcRoot = path.join(BOLIJIE_ROOT, 'BLJINK Ink Test Video\\样品测试视频\\样品测试视频');
  const catalog = [];
  let id = 1;

  for (const [folderName, meta] of Object.entries(FOLDER_MAP)) {
    const folderPath = path.join(srcRoot, folderName);
    if (!fs.existsSync(folderPath)) continue;

    const files = fs.readdirSync(folderPath).filter(f => /\.(jpg|jpeg|png)$/i.test(f));
    files.forEach((f, idx) => {
      const srcFile = path.join(folderPath, f);
      const ext = path.extname(f).toLowerCase();
      const targetFileName = `bolijie_${meta.tag}_${String(idx + 1).padStart(2, '0')}${ext}`;
      const targetFile = path.join(TEST_DEST, targetFileName);

      fs.copyFileSync(srcFile, targetFile);

      catalog.push({
        id: `bolijie_${id++}`,
        fileName: targetFileName,
        webPath: `/images/bolijie/tests/${targetFileName}`,
        category: meta.category,
        tag: meta.tag,
        caption: meta.caption,
        alt: meta.alt
      });
    });
  }

  // Also copy authentic bottle shots from ink_photos
  const inkPhotosSrc = path.join(BOLIJIE_ROOT, '墨水-图片素材图 - photo');
  // Copy top clean bottle photos
  if (fs.existsSync(inkPhotosSrc)) {
    function walkFiles(dir) {
      let res = [];
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item);
        if (fs.statSync(full).isDirectory()) res = res.concat(walkFiles(full));
        else if (/\.(jpg|png)$/i.test(item)) res.push(full);
      }
      return res;
    }
    const bottles = walkFiles(inkPhotosSrc);
    bottles.slice(0, 30).forEach((b, idx) => {
      const ext = path.extname(b).toLowerCase();
      const base = path.basename(b, ext).toLowerCase().replace(/[^\w\d]/g, '_').slice(0, 20);
      const targetName = `bolijie_bottle_${base}_${String(idx + 1).padStart(2, '0')}${ext}`;
      const targetPath = path.join(BOTTLE_DEST, targetName);
      fs.copyFileSync(b, targetPath);

      catalog.push({
        id: `bolijie_${id++}`,
        fileName: targetName,
        webPath: `/images/bolijie/bottles/${targetName}`,
        category: 'CIJ_BOTTLE_CONSUMABLES',
        tag: 'bottle_packaging',
        caption: `Bình mực in phun công nghiệp Bolijie & VNPIS tiêu chuẩn xuất khẩu quốc tế (Can 1 Lít / Chai 500ml)`,
        alt: `Bình mực in date CIJ công nghiệp chính hãng Bolijie đóng can kín`
      });
    });
  }

  fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
  console.log(`[BOLIJIE] Successfully cataloged ${catalog.length} authentic ink images to ${CATALOG_PATH}`);
  return catalog;
}

if (require.main === module) {
  copyTestPhotos();
}

module.exports = { copyTestPhotos, FOLDER_MAP };
