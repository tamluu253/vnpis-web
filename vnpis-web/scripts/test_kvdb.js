const crypto = require('crypto');

// Helper to generate a secure private bucket ID based on the Casso Secret Key
function getBucketId() {
  const secret = process.env.CASSO_SECRET_KEY || 'vnpis-fallback-secret-key-12345';
  return crypto.createHmac('sha256', secret).update('vnpis-ebook-bucket').digest('hex').substring(0, 16);
}

async function testKvdb() {
  console.log('🚀 Đang kết nối tới secure Cloud KV Database...');
  
  const bucketId = getBucketId();
  const testOrderId = 'EBK-TEST-' + Math.floor(Math.random() * 10000);
  const testOrder = {
    orderId: testOrderId,
    name: 'Tâm Lưu Test KV',
    email: 'tamluu253@gmail.com',
    amount: 50000,
    status: 'PENDING',
    createdAt: new Date().toISOString()
  };

  const url = `https://kvdb.io/${bucketId}/${testOrderId}`;
  console.log(`- Bucket ID: ${bucketId}`);
  console.log(`- Target URL: ${url}`);

  try {
    // 1. Write order
    console.log('📝 Đang ghi đơn hàng thử nghiệm lên Cloud...');
    const writeResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(testOrder),
      headers: { 'Content-Type': 'application/json' }
    });

    if (!writeResponse.ok) {
      throw new Error(`Write failed with status ${writeResponse.status}`);
    }
    console.log('✅ Ghi đơn hàng thành công!');

    // 2. Read order
    console.log('📖 Đang đọc lại đơn hàng từ Cloud...');
    const readResponse = await fetch(url);
    if (!readResponse.ok) {
      throw new Error(`Read failed with status ${readResponse.status}`);
    }
    const data = await readResponse.json();
    console.log('✅ Đọc thành công! Chi tiết đơn hàng:', data);

    // 3. Update order status
    console.log('🔄 Đang cập nhật trạng thái đơn hàng thành COMPLETED...');
    data.status = 'COMPLETED';
    data.updatedAt = new Date().toISOString();

    const updateResponse = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' }
    });
    if (!updateResponse.ok) {
      throw new Error(`Update failed with status ${updateResponse.status}`);
    }

    // 4. Verify update
    const verifyResponse = await fetch(url);
    const verifiedData = await verifyResponse.json();
    console.log('✅ Trạng thái sau cập nhật:', verifiedData.status);
    
    if (verifiedData.status === 'COMPLETED') {
      console.log('\n🎉 KIỂM THỬ CLOUD KEY-VALUE STORE THÀNH CÔNG 100%! 🎉');
    } else {
      console.log('❌ Lỗi: Trạng thái không khớp!');
    }

  } catch (err) {
    console.error('❌ Lỗi kiểm thử Cloud KV:', err.message);
  }
}

testKvdb();
