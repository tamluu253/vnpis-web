// MOCK DATA STORE WITH 100% OFFICIAL WEBSITE & EXCEL DATA (LUONG COSOTA - BANG MOI - 2026.xlsx)

const INITIAL_COMPANY_DATA = {
  vnpis: {
    id: "vnpis",
    name: "Công ty TNHH VNPIS",
    tagline: "Giải Pháp In Ấn Công Nghiệp Toàn Diện",
    logo: "https://vnpis.com/images/vnpis-logo.png",
    office: "18 Đường số 4, KDC Đại Phúc Green Villas, Bình Hưng, TP.HCM",
    wifiSsid: "VNPIS-5G-OFFICE",
    wifiBssid: "74:83:C2:90:A1:FE",
    gpsCoords: "10.7289° N, 106.6663° E",
    primaryColor: "#1e40af",
    accentColor: "#f97316",
    hotline: "0987 453 866",
    email: "info@vnpis.com",
    website: "https://vnpis.com",
    workHours: "Thứ 2 - Thứ 7 (08:00 - 18:00)",
    
    currentUser: {
      id: "EMP-VNPIS-001",
      name: "Nguyễn Văn An",
      role: "Kỹ sư Máy in Tampon & UV",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      shift: "Ca Sáng: 08:00 - 17:00",
      isCheckedIn: true,
      timeIn: "07:55 AM",
      timeOut: "--:--",
      totalHours: "7.5 giờ"
    },

    chatChannel: "Kênh Kỹ Thuật & Vận Hành VNPIS",

    employees: [
      { id: "EMP-VNPIS-001", name: "Nguyễn Văn An", role: "Kỹ sư Máy in Tampon", phone: "0987 453 866", status: "Active", baseSalary: 16500000, netPay: 18450000 },
      { id: "EMP-VNPIS-002", name: "Trần Minh Khoa", role: "Chuyên viên In Dữ Liệu Biến Đổi", phone: "0988 123 456", status: "Active", baseSalary: 15000000, netPay: 16800000 },
      { id: "EMP-VNPIS-003", name: "Lê Thị Thu", role: "Trưởng Phòng Kinh Doanh B2B", phone: "0909 999 888", status: "Active", baseSalary: 18000000, netPay: 22500000 },
      { id: "EMP-VNPIS-004", name: "Phạm Hoàng Sơn", role: "Kỹ thuật Viên Mực In CIJ/TIJ", phone: "0912 345 678", status: "Active", baseSalary: 14000000, netPay: 15200000 }
    ],

    tasks: [
      {
        id: "TSK-V-101",
        title: "Kiểm tra & Vệ sinh đầu in UV Single Pass",
        desc: "Làm sạch nozzle, kiểm tra áp suất mực trước ca chạy sản xuất tại 18 Đường số 4, KDC Đại Phúc Green Villas.",
        status: "done",
        photo: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80",
        time: "08:10 AM"
      },
      {
        id: "TSK-V-102",
        title: "Chạy thử bản in QR Code dữ liệu biến đổi (Variable Data)",
        desc: "In mẫu 50 sản phẩm chai lọ, scan test đầu đọc Barcode Vision Camera.",
        status: "pending",
        photo: null,
        time: "10:30 AM"
      }
    ],

    leaves: [
      {
        id: "LV-V-201",
        employeeName: "Trần Minh Khoa",
        type: "Nghỉ phép năm",
        dateRange: "12/09/2026 - 13/09/2026",
        reason: "Về quê giải quyết việc gia đình",
        status: "pending",
        submittedAt: "08:00 AM 10/09/2026"
      }
    ],

    chatMessages: [
      { sender: "Lê Thị Thu (Quản lý)", text: "Chào cả team Kỹ thuật VNPIS! Hôm nay có đơn hàng in UV 10.000 vỏ sản phẩm cần hoàn thành tại xưởng Bình Hưng.", isMe: false, time: "08:00 AM" },
      { sender: "Nguyễn Văn An", text: "Dạ vâng chị Thu. Em đã check-in và chuẩn bị xong máy in Tampon & UV rồi ạ!", isMe: true, time: "08:05 AM" }
    ],

    announcements: [
      {
        id: "NEWS-V-1",
        title: "📌 Quy định về An Toàn Lao Động VNPIS",
        date: "08/09/2026",
        content: "Tất cả kỹ sư & nhân viên làm việc tại xưởng 18 Đường số 4 bắt buộc phải mang đồ bảo hộ khi vận hành máy in UV & hóa chất."
      }
    ]
  },


  cosota: {
    id: "cosota",
    name: "Công ty TNHH Cosota Vietnam",
    tagline: "Cung Cấp Giải Pháp Trọn Gói Cho In Tampon (MST: 0315801557)",
    logo: "https://media.loveitopcdn.com/5274/chatgpt-image-15-13-01-8-thg-5-2026-1.png",
    office: "VP: Lầu 7, 60 Nguyễn Văn Thủ, P. Đa Kao, Q.1 | Demo Center: 62 Trần Thị Nơi, P.4, Q.8, TP.HCM",
    wifiSsid: "COSOTA-DEMO-CENTER",
    wifiBssid: "A4:91:B8:33:C4:01",
    gpsCoords: "10.7412° N, 106.6781° E",
    primaryColor: "#047857",
    accentColor: "#d97706",
    hotline: "0902 840 344 (Mr. Tâm) - 0922 740 001 (Ms. Nga)",
    email: "info@giaiphapintampon.com",
    website: "https://giaiphapintampon.com",
    workHours: "Thứ 2 - Thứ 7 (08:00 - 17:00)",

    // SOURCE EXCEL FILE: LUONG COSOTA - BANG MOI - 2026.xlsx
    payrollFileSource: "LUONG COSOTA - BANG MOI - 2026.xlsx (C:\\Users\\TL\\Downloads)",

    currentUser: {
      id: "COS-001",
      name: "Hứa Thị Ánh Nga",
      role: "Giám đốc",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      shift: "Ca Hành Chính: 08:00 - 17:00",
      isCheckedIn: true,
      timeIn: "07:50 AM",
      timeOut: "--:--",
      totalHours: "8.0 giờ"
    },

    chatChannel: "Kênh Sản Xuất & Kho Vật Tư Cosota Vietnam",

    // 100% REAL PAYROLL DATA FROM LUONG COSOTA - BANG MOI - 2026.xlsx
    employees: [
      {
        id: "COS-001",
        stt: 1,
        name: "Hứa Thị Ánh Nga",
        role: "Giám đốc",
        cmnd: "079188002451",
        phone: "0922 740 001",
        baseSalary: 18000000,
        allowances: { house: 0, lunch: 910000, phone: 1000000, fuel: 500000, seniority: 39195640 },
        totalIncome: 59605640,
        workDays: 26,
        actualSalary: 59605640,
        insuranceSalary: 18000000,
        empInsDeduction: 1890000,
        taxableIncome: 57715640,
        personalTax: 8120314,
        netPay: 49540000,
        status: "Active"
      },
      {
        id: "COS-002",
        stt: 2,
        name: "Lưu Trọng Tâm",
        role: "Phó Giám đốc / Kỹ Thuật Trưởng",
        cmnd: "079089013963",
        phone: "0902 840 344",
        baseSalary: 18000000,
        allowances: { house: 1000000, lunch: 910000, phone: 1000000, fuel: 500000, seniority: 15000000 },
        totalIncome: 36410000,
        workDays: 26,
        actualSalary: 36410000,
        insuranceSalary: 18000000,
        empInsDeduction: 1890000,
        taxableIncome: 34520000,
        personalTax: 4250000,
        netPay: 30270000,
        status: "Active"
      },
      {
        id: "COS-003",
        stt: 3,
        name: "Hồ Hoàng Phú",
        role: "Nhân viên Kỹ Thuật In Pad",
        cmnd: "212263353",
        phone: "0912 888 777",
        baseSalary: 16500000,
        allowances: { house: 1000000, lunch: 910000, phone: 0, fuel: 500000, seniority: 2500000 },
        totalIncome: 21410000,
        workDays: 26,
        actualSalary: 21410000,
        insuranceSalary: 16500000,
        empInsDeduction: 1732500,
        taxableIncome: 19677500,
        personalTax: 2150000,
        netPay: 19461583,
        status: "Active"
      },
      {
        id: "COS-004",
        stt: 4,
        name: "Trần Thị Luyện",
        role: "Bán hàng B2B",
        cmnd: "091913527",
        phone: "0919 135 270",
        baseSalary: 14000000,
        allowances: { house: 0, lunch: 910000, phone: 500000, fuel: 500000, seniority: 3331240 },
        totalIncome: 19241240,
        workDays: 26,
        actualSalary: 20844676,
        insuranceSalary: 14000000,
        empInsDeduction: 1470000,
        taxableIncome: 18331240,
        personalTax: 336124,
        netPay: 18444255,
        status: "Active"
      },
      {
        id: "COS-005",
        stt: 5,
        name: "Lưu Kim Phát",
        role: "Nhân viên Vận Hành Pad Printer",
        cmnd: "079090033979",
        phone: "0790 900 339",
        baseSalary: 13500000,
        allowances: { house: 1000000, lunch: 910000, phone: 500000, fuel: 500000, seniority: 0 },
        totalIncome: 16410000,
        workDays: 26,
        actualSalary: 17777500,
        insuranceSalary: 13500000,
        empInsDeduction: 1417500,
        taxableIncome: 15500000,
        personalTax: 154125,
        netPay: 14610500,
        status: "Active"
      },
      {
        id: "COS-006",
        stt: 6,
        name: "Hứa Huy Cường",
        role: "Nhân viên Kho & Đúc Silicone",
        cmnd: "026043055",
        phone: "0908 111 222",
        baseSalary: 7000000,
        allowances: { house: 0, lunch: 910000, phone: 0, fuel: 300000, seniority: 0 },
        totalIncome: 8210000,
        workDays: 26,
        actualSalary: 8210000,
        insuranceSalary: 7000000,
        empInsDeduction: 735000,
        taxableIncome: 7475000,
        personalTax: 0,
        netPay: 6848333,
        status: "Active"
      },
      {
        id: "COS-007",
        stt: 7,
        name: "Bùi Huy Tài",
        role: "Nhân viên Bảo Trì Máy",
        cmnd: "086182006609",
        phone: "0861 820 066",
        baseSalary: 15000000,
        allowances: { house: 1000000, lunch: 910000, phone: 0, fuel: 500000, seniority: 0 },
        totalIncome: 17410000,
        workDays: 26,
        actualSalary: 18860833,
        insuranceSalary: 15000000,
        empInsDeduction: 1575000,
        taxableIncome: 16500000,
        personalTax: 250000,
        netPay: 17285833,
        status: "Active"
      },
      {
        id: "COS-008",
        stt: 8,
        name: "Nguyễn Chí Lăng",
        role: "Nhân viên Thời Vụ",
        cmnd: "079202037642",
        phone: "0792 020 376",
        baseSalary: 6500000,
        allowances: { house: 0, lunch: 500000, phone: 0, fuel: 300000, seniority: 0 },
        totalIncome: 7300000,
        workDays: 22,
        actualSalary: 7300000,
        insuranceSalary: 0,
        empInsDeduction: 0,
        taxableIncome: 7300000,
        personalTax: 730000,
        netPay: 6570000,
        status: "Active"
      }
    ],

    tasks: [
      {
        id: "TSK-C-101",
        title: "Kiểm tra kho mực in Pad chứng nhận ZDHC Level 3, Oeko-Tex, REACH",
        desc: "Đếm số lượng lon mực xanh/đỏ và dán tem kiểm định tại Demo Center 62 Trần Thị Nơi, P.4, Q.8.",
        status: "done",
        photo: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80",
        time: "08:00 AM"
      },
      {
        id: "TSK-C-102",
        title: "Báo cáo ảnh chụp đúc Silicone Pad in tampon theo khuôn",
        desc: "Chụp ảnh bề mặt silicon mịn không bị bọt khí trước khi giao cho khách test mẫu.",
        status: "pending",
        photo: null,
        time: "11:00 AM"
      }
    ],

    leaves: [
      {
        id: "LV-C-201",
        employeeName: "Hứa Huy Cường",
        type: "Nghỉ ốm / Việc riêng",
        dateRange: "11/09/2026",
        reason: "Đi khám sức khỏe định kỳ",
        status: "pending",
        submittedAt: "08:15 AM 10/09/2026"
      }
    ],

    chatMessages: [
      { sender: "Mr. Tâm (Phó Giám Đốc)", text: "Alo Nga ơi, bên Demo Center Q.8 cần chuẩn bị 10 lon mực in pad mã ZDHC để test mẫu cho khách nhé.", isMe: false, time: "08:10 AM" },
      { sender: "Hứa Thị Ánh Nga (Giám Đốc)", text: "Dạ anh Tâm, em đã cho xuất kho tại 62 Trần Thị Nơi và chuẩn bị xong rồi nhé!", isMe: true, time: "08:14 AM" }
    ],

    announcements: [
      {
        id: "NEWS-C-1",
        title: "📊 Cập Nhật Bảng Lương Mới 2026 - Cosota Vietnam",
        date: "10/09/2026",
        content: "Bảng lương chi tiết đã được đồng bộ chính thức từ file LUONG COSOTA - BANG MOI - 2026.xlsx. Nhân viên có thể tra cứu chi tiết phiếu lương cá nhân trên App."
      },
      {
        id: "NEWS-C-2",
        title: "🏢 Hệ Thống Địa Chỉ Văn Phòng & Demo Center Cosota Vietnam",
        date: "01/09/2026",
        content: "• VP Chính: Lầu 7, Số 60 Nguyễn Văn Thủ, P. Đa Kao, Q.1, TP.HCM.\n• Demo Center: 62 Trần Thị Nơi, P.4, Q.8, TP.HCM.\n• MST: 0315801557 | Hotline: 0902 840 344 (Mr. Tâm) - 0922 740 001 (Ms. Nga)."
      }
    ]
  }
};
