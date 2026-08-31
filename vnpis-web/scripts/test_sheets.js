const { google } = require('googleapis');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const GA_CLIENT_EMAIL = process.env.GA_CLIENT_EMAIL;
const GA_PRIVATE_KEY = process.env.GA_PRIVATE_KEY;

if (!GA_CLIENT_EMAIL || !GA_PRIVATE_KEY) {
  console.error('❌ LỖI: Thiếu thông tin Google Service Account trong .env.local');
  process.exit(1);
}

console.log('Client Email:', GA_CLIENT_EMAIL);
console.log('Private Key length:', GA_PRIVATE_KEY ? GA_PRIVATE_KEY.length : 0);

// Format the private key
const privateKey = GA_PRIVATE_KEY.replace(/\\n/g, '\n');

const auth = new google.auth.JWT({
  email: GA_CLIENT_EMAIL,
  key: privateKey,
  scopes: ['https://www.googleapis.com/auth/spreadsheets', 'https://www.googleapis.com/auth/drive']
});

async function testSheets() {
  console.log('🚀 Đang kiểm tra xác thực Google Sheets API...');
  
  try {
    await auth.authorize();
    console.log('✅ Xác thực thành công!');

    const sheets = google.sheets({ version: 'v4', auth });

    console.log('🆕 Đang khởi tạo Sheet mới thử nghiệm...');
    const spreadsheet = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: 'VNPIS_Ebook_Orders_Test_Sheet'
        }
      }
    });
    
    const spreadsheetId = spreadsheet.data.spreadsheetId;
    console.log(`✅ Đã tạo Sheet mới thành công! ID: ${spreadsheetId}`);

    // Set headers
    console.log('📝 Đang ghi dữ liệu thử nghiệm...');
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: {
        values: [[
          'orderId', 'name', 'phone', 'email', 'status'
        ], [
          'EBK-TEST-1001', 'Test User', '0987654321', 'test@gmail.com', 'COMPLETED'
        ]]
      }
    });
    console.log('✅ Ghi dữ liệu hoàn tất!');

    // Read values back
    console.log('📖 Đang đọc dữ liệu kiểm chứng...');
    const readResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sheet1!A1:E2'
    });
    console.log('Dữ liệu đọc được:', readResponse.data.values);

    console.log('\n🎉 TẤT CẢ KIỂM THỬ GOOGLE SHEETS THÀNH CÔNG RỰC RỠ! 🎉');

  } catch (err) {
    console.error('❌ Lỗi kiểm thử Google Sheets:', err.message);
  }
}

testSheets();
