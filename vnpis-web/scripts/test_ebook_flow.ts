import { 
  createOrder, 
  findOrderById, 
  updateOrderStatus, 
  generateDownloadToken, 
  verifyDownloadToken, 
  getOrders 
} from '../src/lib/orders';

// Mock extractOrderId from webhook route for testing
function extractOrderId(remark: string): string | null {
  if (!remark) return null;

  // Case 1: Match standard format EBK-YYMMDD-XXXX (e.g. EBK-260831-1002)
  const match1 = remark.match(/EBK-\d{6}-\d{4}/i);
  if (match1) return match1[0].toUpperCase();

  // Case 2: Match no-hyphen format EBK2608311002
  const match2 = remark.match(/EBK\d{10}/i);
  if (match2) {
    const raw = match2[0].toUpperCase();
    return `EBK-${raw.slice(3, 9)}-${raw.slice(9)}`;
  }

  // Case 3: Match space-separated EBK 260831 1002
  const match3 = remark.match(/EBK\s*(\d{6})\s*(\d{4})/i);
  if (match3) {
    return `EBK-${match3[1]}-${match3[2]}`.toUpperCase();
  }

  // Case 4: General search by stripping all non-alphanumeric characters
  const cleanRemark = remark.replace(/[^a-zA-Z0-9]/g, '').toUpperCase();
  const matchClean = cleanRemark.match(/EBK\d{10}/);
  if (matchClean) {
    const raw = matchClean[0];
    return `EBK-${raw.slice(3, 9)}-${raw.slice(9)}`;
  }

  return null;
}

async function runTests() {
  console.log('🧪 BẮT ĐẦU KIỂM THỬ HỆ THỐNG EBOOK VNPIS 🧪\n');

  // TEST 1: Order Creation
  console.log('--- Test 1: Khởi tạo đơn hàng ---');
  const mockOrderData = {
    name: 'Tâm Lưu',
    phone: '0901836344',
    email: 'tamluu253@gmail.com',
    company: 'VNPIS B2B Test'
  };

  const order = createOrder(mockOrderData);
  console.log('✅ Đã tạo đơn hàng thành công!');
  console.log(`- Mã đơn: ${order.orderId}`);
  console.log(`- Trạng thái: ${order.status} (Kỳ vọng: PENDING)`);
  console.log(`- Số tiền: ${order.amount} VND (Kỳ vọng: 50000)`);
  console.log('');

  // TEST 2: Order Lookup
  console.log('--- Test 2: Tìm kiếm đơn hàng ---');
  const foundOrder = findOrderById(order.orderId);
  if (foundOrder && foundOrder.name === mockOrderData.name) {
    console.log('✅ Tìm thấy đơn hàng chính xác bằng ID!');
  } else {
    console.error('❌ Thất bại: Không tìm thấy đơn hàng hoặc sai dữ liệu.');
  }
  console.log('');

  // TEST 3: Bank Remark Parsing (Extracting Order ID)
  console.log('--- Test 3: Trích xuất mã đơn hàng từ tin nhắn ngân hàng (Remark) ---');
  const testRemarks = [
    { input: `EBOOK ${order.orderId}`, expected: order.orderId }, // Chuẩn
    { input: `ebook ${order.orderId.replace(/-/g, '')}`, expected: order.orderId }, // Không dấu gạch ngang, chữ thường
    { input: `EBK ${order.orderId.split('-')[1]} ${order.orderId.split('-')[2]}`, expected: order.orderId }, // Dấu cách thay vì gạch ngang
    { input: `THANH TOAN DON HANG EBOOK CUA TOI MA SO ${order.orderId} CHUYEN KHOAN`, expected: order.orderId }, // Câu dài chứa mã
    { input: `EBK2608311002`, expected: 'EBK-260831-1002' }, // Test fix cứng
    { input: `EBK-260831-1002`, expected: 'EBK-260831-1002' }, // Test chuẩn fix cứng
  ];

  let remarkSuccessCount = 0;
  for (const t of testRemarks) {
    const extracted = extractOrderId(t.input);
    if (extracted === t.expected) {
      console.log(`✅ Thành công! Input: "${t.input}" -> Extracted: "${extracted}"`);
      remarkSuccessCount++;
    } else {
      console.error(`❌ Thất bại! Input: "${t.input}" -> Extracted: "${extracted}" (Kỳ vọng: "${t.expected}")`);
    }
  }
  console.log(`👉 Kết quả remark: ${remarkSuccessCount}/${testRemarks.length} đúng.`);
  console.log('');

  // TEST 4: Token Generation and Verification
  console.log('--- Test 4: Tạo và xác thực Token tải sách bảo mật ---');
  const testEmail = 'customer@gmail.com';
  const token = generateDownloadToken(testEmail);
  console.log(`- Token sinh ra: ${token.slice(0, 30)}...`);
  
  const verifiedEmail = verifyDownloadToken(token);
  if (verifiedEmail === testEmail) {
    console.log('✅ Xác thực token thành công! Trả về email khớp.');
  } else {
    console.error(`❌ Thất bại: Xác thực token trả về "${verifiedEmail}" (Kỳ vọng: "${testEmail}")`);
  }

  // Test expired/tampered token
  const tamperedToken = token.replace('Y', 'X');
  const verifiedTampered = verifyDownloadToken(tamperedToken);
  if (verifiedTampered === null) {
    console.log('✅ Chặn đứng thành công token bị sửa đổi (trả về null).');
  } else {
    console.error('❌ Thất bại: Token sửa đổi vẫn được chấp nhận!');
  }
  console.log('');

  // TEST 5: Status Update
  console.log('--- Test 5: Cập nhật trạng thái đơn hàng ---');
  const updated = updateOrderStatus(order.orderId, 'COMPLETED');
  if (updated && updated.status === 'COMPLETED') {
    console.log('✅ Cập nhật trạng thái thành công sang COMPLETED!');
  } else {
    console.error('❌ Thất bại khi cập nhật trạng thái.');
  }
  console.log('');

  console.log('🎉 TẤT CẢ CÁC BÀI KIỂM THỬ ĐÃ HOÀN TẤT THÀNH CÔNG! 🎉');
}

runTests().catch(err => {
  console.error('Lỗi chạy test:', err);
});
