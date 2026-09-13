const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', 'inanvnpis-web', '.env.local');

function printEasySetupGuide() {
    console.log("==========================================================================");
    console.log("🔑 HƯỚNG DẪN LẤY API TOKEN ĐĂNG BÀI TỰ ĐỘNG 3 MẠNG XÃ HỘI (SIÊU NHANH)");
    console.log("==========================================================================");

    console.log(`\n📌 [BƯỚC 1: LẤY FACEBOOK ACCESS TOKEN - 1 PHÚT]`);
    console.log(`1. Truy cập link: https://developers.facebook.com/tools/explorer/`);
    console.log(`2. Tại mục "User or Page", chọn Fanpage VNPIS của bạn.`);
    console.log(`3. Nhấn nút "Generate Access Token" -> Copy đoạn mã token ngắn và gửi cho AI.`);

    console.log(`\n📌 [BƯỚC 2: YOUTUBE SHORTS AUTHORIZATION - 1 PHÚT]`);
    console.log(`1. Truy cập Google OAuth Playground: https://developers.google.com/oauthplayground/`);
    console.log(`2. Chọn scope: "YouTube Data API v3" -> Chọn "https://www.googleapis.com/auth/youtube.upload"`);
    console.log(`3. Nhấn "Authorize APIs", đăng nhập kênh YouTube VNPIS -> Nhấn "Exchange authorization code for tokens".`);
    console.log(`4. Copy Refresh Token và gửi cho AI.`);

    console.log(`\n📌 [BƯỚC 3: TIKTOK DEVELOPER ACCESS - 1 PHÚT]`);
    console.log(`1. Đăng nhập TikTok Studio Web: https://www.tiktok.com/creator-center`);
    console.log(`2. Cho phép kết nối đăng video tự động.`);

    console.log("\n==========================================================================");
    console.log("💡 MẸO: Bạn chỉ cần gửi 3 đoạn mã Token cho AI trong ô chat, AI sẽ tự điền vào mã nguồn!");
    console.log("==========================================================================");
}

if (require.main === module) {
    printEasySetupGuide();
}
